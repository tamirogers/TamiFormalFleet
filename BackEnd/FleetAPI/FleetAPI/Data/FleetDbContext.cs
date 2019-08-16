using System;
using FleetAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FleetAPI.Data
{
    public class FleetDbContext : DbContext
    {
        public FleetDbContext(DbContextOptions<FleetDbContext> options) : base(options)
        {

        }

        public DbSet<Camera> Cameras { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<CameraAssignment> CameraAssignments { get; set; }

    }
}
