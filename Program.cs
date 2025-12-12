using Microsoft.EntityFrameworkCore;
using SportsAPI.Data;
using SportsAPI.Interfaces;
using SportsAPI.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext
builder.Services.AddDbContext<SportsWorldContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register services
builder.Services.AddScoped<IAthleteService, AthleteService>();
builder.Services.AddScoped<IFinanceService, FinanceService>();
builder.Services.AddScoped<IVenueService, VenueService>();

// Add controllers
builder.Services.AddControllers();

// Add Swagger/OpenAPI
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

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();

// Enable Swagger only in Development (optional)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SportsAPI v1");
        c.RoutePrefix = string.Empty; // Swagger UI at root
    });
}

// Enable static files
app.UseStaticFiles();

app.UseCors("AllowAll");
app.MapControllers();

app.Run();