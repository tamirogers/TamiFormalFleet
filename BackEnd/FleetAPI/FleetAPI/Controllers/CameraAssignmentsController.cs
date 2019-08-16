using System;
using System.Linq;
using System.Threading.Tasks;
using FleetAPI.Data;
using FleetAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FleetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CameraAssignmentsController : ControllerBase
    {
        private readonly FleetDbContext _db;

        public CameraAssignmentsController(FleetDbContext db)
        {
            _db = db;
        }

        // All Methods

        [HttpGet]
        public IActionResult GetCameraAssignments()
        {
            return Ok(_db.CameraAssignments.ToList());
        }



        [HttpGet("GetOneForEdit/{id}")]
        public async Task<IActionResult> GetOneForEdit([FromRoute] int id)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var objCameraAssignment = await _db.CameraAssignments.SingleOrDefaultAsync(m => m.Id == id);

            if (objCameraAssignment == null)
            {
                return NotFound();
            }

            return Ok(objCameraAssignment);

        }




        // First checks if Vehicle is Active, then Camera
        [HttpPost]
        public IActionResult AddCameraAssignment([FromBody] CameraAssignment objCameraAssignment)
        {
            var noCar = _db.CameraAssignments

                .Where(t => t.VehicleId == objCameraAssignment.VehicleId && t.Deleted == false).FirstOrDefault();

            if (noCar != null)
            {
                return Conflict(ModelState);
            }

            var noCamera = _db.CameraAssignments
                .Where(c => c.CameraId == objCameraAssignment.CameraId && c.Deleted == false).FirstOrDefault();

            if (noCamera != null)
            {
                return Conflict(ModelState);
            }

            _db.CameraAssignments.Add(objCameraAssignment);
            _db.SaveChanges();
            return Ok();
        }





        // post for search results
        [HttpPost("SearchForm")]
        public async Task<IActionResult> SearchForm([FromBody] UserSearch userSearch)
        {
            var searchAssignments = await _db.CameraAssignments
             .Where(a => a.VehicleId == userSearch.searchVehicleId || a.CameraId == userSearch.searchCameraId).ToListAsync();

            return Ok(searchAssignments);
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCameraAssignment([FromRoute] int id, [FromBody] CameraAssignment objCameraAssignment)
        {
            if (objCameraAssignment == null || id != objCameraAssignment.Id)
            {
                return NotFound();
            }

            var noCar = _db.CameraAssignments

                .Where(t => t.VehicleId == objCameraAssignment.VehicleId && t.Deleted == false).FirstOrDefault();

            if (noCar != null)
            {
                return Conflict(ModelState);
            }

            var noCamera = _db.CameraAssignments
                .Where(c => c.CameraId == objCameraAssignment.CameraId && c.Deleted == false).FirstOrDefault();

            if (noCamera != null)
            {
                return Conflict(ModelState);
            }


            else
            {
                _db.CameraAssignments.Update(objCameraAssignment);
                await _db.SaveChangesAsync();
                return new JsonResult("Assignment Was Updated Successfully");
            }
        }




        [HttpPut("UpdateForDelete/{id}")]
        public async Task<IActionResult> UpdateForDelete([FromRoute] int id, [FromBody] CameraAssignment objCameraAssignment)
        {
            if (objCameraAssignment == null || id != objCameraAssignment.Id)
            {
                return NotFound();
            }


            else
            {
                _db.CameraAssignments.Update(objCameraAssignment);
                await _db.SaveChangesAsync();
                return new JsonResult("Assignment Was Updated Successfully");
            }
        }






        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCameraAssignment([FromRoute] int id)
        {
            var findCameraAssignment = await _db.CameraAssignments.FindAsync(id);
            if (findCameraAssignment == null)
            {
                return NotFound();
            }
            else
            {
                _db.CameraAssignments.Remove(findCameraAssignment);
                await _db.SaveChangesAsync();
                return new JsonResult("Assignment Was Deleted Successfully");
            }
        }





    }
}
