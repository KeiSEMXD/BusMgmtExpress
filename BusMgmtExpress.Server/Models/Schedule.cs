namespace BusMgmtExpress.Server.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public int BusId { get; set; }
        public int RouteId { get; set; }
        public DateTime DepartureTime { get; set; }

        // Opcional: navegación
        public Bus Bus { get; set; }
        public Route Route { get; set; }
    }
}
