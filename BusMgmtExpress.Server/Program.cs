using BusMgmtExpress.Server.Data;
using BusMgmtExpress.Server.Models;
using Microsoft.EntityFrameworkCore;

using Schedule = BusMgmtExpress.Server.Models.Schedule;
using ModelRoute = BusMgmtExpress.Server.Models.Route;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddDbContext<BusContext>(options =>
            options.UseSqlServer(
                builder.Configuration.GetConnectionString("DefaultConnection")));

        // Add services to the container.



        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();


        app.UseDefaultFiles();
        app.UseStaticFiles();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();
        app.MapGet("/api/buses", async (BusContext db) =>
            await db.Buses.ToListAsync());

        // GET: obtener un solo bus por ID
        app.MapGet("/api/buses/{id}", async (int id, BusContext db) =>
        {
            var bus = await db.Buses.FindAsync(id);
            return bus is not null ? Results.Ok(bus) : Results.NotFound();
        });

        // POST: crear un nuevo bus
        app.MapPost("/api/buses", async (Bus bus, BusContext db) =>
        {
            db.Buses.Add(bus);
            await db.SaveChangesAsync();
            return Results.Created($"/api/buses/{bus.Id}", bus);
        });

        // PUT: actualizar un bus existente
        app.MapPut("/api/buses/{id}", async (int id, Bus updatedBus, BusContext db) =>
        {
            var bus = await db.Buses.FindAsync(id);
            if (bus is null) return Results.NotFound();
            bus.Plate = updatedBus.Plate;
            bus.Model = updatedBus.Model;
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        // DELETE: borrar un bus
        app.MapDelete("/api/buses/{id}", async (int id, BusContext db) =>
        {
            var bus = await db.Buses.FindAsync(id);
            if (bus is null) return Results.NotFound();
            db.Buses.Remove(bus);
            await db.SaveChangesAsync();
            return Results.Ok(bus);
        });

        // GET all routes
        app.MapGet("/api/routes", async (BusContext db) =>
            await db.Routes.ToListAsync());

        // GET route by id
        app.MapGet("/api/routes/{id}", async (int id, BusContext db) =>
            await db.Routes.FindAsync(id) is ModelRoute route
                ? Results.Ok(route)
                : Results.NotFound());

        // POST new route
        app.MapPost("/api/routes", async (ModelRoute route, BusContext db) =>
        {
            db.Routes.Add(route);
            await db.SaveChangesAsync();
            return Results.Created($"/api/routes/{route.Id}", route);
        });

        // PUT update route
        app.MapPut("/api/routes/{id}", async (int id, ModelRoute updatedRoute, BusContext db) =>
        {
            var route = await db.Routes.FindAsync(id);
            if (route is null) return Results.NotFound();
            route.Origin = updatedRoute.Origin;
            route.Destination = updatedRoute.Destination;
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        // DELETE route
        app.MapDelete("/api/routes/{id}", async (int id, BusContext db) =>
        {
            var route = await db.Routes.FindAsync(id);
            if (route is null) return Results.NotFound();
            db.Routes.Remove(route);
            await db.SaveChangesAsync();
            return Results.Ok(route);
        });


// GET: todos los horarios
app.MapGet("/api/schedules", async (BusContext db) =>
    await db.Schedules.ToListAsync());

        // GET: un solo horario por id
        app.MapGet("/api/schedules/{id}", async (int id, BusContext db) =>
            await db.Schedules.FindAsync(id) is Schedule sch
                ? Results.Ok(sch)
                : Results.NotFound());

        // POST: crear horario
        app.MapPost("/api/schedules", async (Schedule schedule, BusContext db) =>
        {
            db.Schedules.Add(schedule);
            await db.SaveChangesAsync();
            return Results.Created($"/api/schedules/{schedule.Id}", schedule);
        });

        // PUT: actualizar horario
        app.MapPut("/api/schedules/{id}", async (int id, Schedule updatedSchedule, BusContext db) =>
        {
            var schedule = await db.Schedules.FindAsync(id);
            if (schedule is null) return Results.NotFound();
            schedule.BusId = updatedSchedule.BusId;
            schedule.RouteId = updatedSchedule.RouteId;
            schedule.DepartureTime = updatedSchedule.DepartureTime;
            await db.SaveChangesAsync();
            return Results.NoContent();
        });

        // DELETE: borrar horario
        app.MapDelete("/api/schedules/{id}", async (int id, BusContext db) =>
        {
            var schedule = await db.Schedules.FindAsync(id);
            if (schedule is null) return Results.NotFound();
            db.Schedules.Remove(schedule);
            await db.SaveChangesAsync();
            return Results.Ok(schedule);
        });

        app.MapFallbackToFile("/index.html");


        app.Run();
    }
}