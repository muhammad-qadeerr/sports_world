using Microsoft.EntityFrameworkCore;
using SportsAPI.Models;

namespace SportsAPI.Data;

public class SportsWorldContext : DbContext
{
    public SportsWorldContext(DbContextOptions<SportsWorldContext> options) : base(options)
    {

    }
    public DbSet<Athlete> Athletes { get; set; }
    //public DbSet<Finance> Finances { get; set; }
}
