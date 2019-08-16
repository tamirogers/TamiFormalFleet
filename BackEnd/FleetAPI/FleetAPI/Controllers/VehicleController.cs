using System;
using System.Linq;
using System.Threading.Tasks;
using FleetAPI.Data;
using FleetAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace FleetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly FleetDbContext _db;

        public VehicleController(FleetDbContext db)
        {
            _db = db;
        }

        // Methods needed for project scope

        [HttpGet]
        public IActionResult GetVehicles()
        {
            return Ok(_db.Vehicles.ToList());
        }



        [HttpPost]
        public async Task<IActionResult> AddVehicle([FromBody] Vehicle objVehicle)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult("Error While Creating New Vehicle");
            }
            _db.Vehicles.Add(objVehicle);
            await _db.SaveChangesAsync();

            return new JsonResult("Vehicle Created Successfully");

        }





    }
}
