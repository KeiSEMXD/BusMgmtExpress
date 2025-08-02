using BusMgmtExpress.Server.Models;
using Microsoft.EntityFrameworkCore;
using ModelRoute = BusMgmtExpress.Server.Models.Route;

namespace BusMgmtExpress.Server.Data
{
    public class BusContext : DbContext
    {
        public BusContext(DbContextOptions<BusContext> options)
            : base(options) { }

        public DbSet<Bus> Buses { get; set; }
        public DbSet<ModelRoute> Routes { get; set; }
        public DbSet<Schedule> Schedules { get; set; }

    }
}
