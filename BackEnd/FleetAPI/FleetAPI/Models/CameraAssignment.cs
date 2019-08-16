using System;
namespace FleetAPI.Models
{
    public class CameraAssignment
    {
        public int Id { get; set; }
        public int CameraId { get; set; }
        public int VehicleId { get; set; }
        public DateTime DateCreated { get; set; }
        public bool Deleted { get; set; }
    }
}
