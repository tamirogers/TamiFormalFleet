using System;
using System.Linq;
using FleetAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace FleetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CameraController : ControllerBase
    {
        private readonly FleetDbContext _db;

        public CameraController(FleetDbContext db)
        {
            _db = db;
        }

        // Method

        [HttpGet]
        public IActionResult GetCameras()
        {
            return Ok(_db.Cameras.ToList());
        }


    }
}
