using Microsoft.EntityFrameworkCore;
using SportsAPI.Data;
using SportsAPI.Interfaces;
using SportsAPI.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<SportsWorldContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IAthleteService, AthleteService>();
builder.Services.AddScoped<IFinanceService, FinanceService>();
builder.Services.AddScoped<IVenueService, VenueService>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "SportsWorldAPIs",
        Version = "v1",
        Description = "API for managing Athletes, Finance and Venues"
    });
});

// Add CORS policy allowing the frontend dev server origin (adjust or add origins as needed)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

var app = builder.Build();
var seed = Environment.GetEnvironmentVariable("SEED_DB")?.ToLower() == "true" || args.Contains("--seed");
if (seed)
{
    using var scope = app.Services.CreateScope();
    var ctx = scope.ServiceProvider.GetRequiredService<SportsWorldContext>();
    await DbInitializer.SeedAsync(ctx);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SportsWorldAPI v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseStaticFiles();

// Use CORS before routing to controllers
app.UseCors("AllowAll");
app.MapControllers();   
app.Run();