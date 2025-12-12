using SportsAPI.Models;

namespace SportsAPI.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(SportsWorldContext context)
    {

        await context.Database.EnsureCreatedAsync();

        if (!context.Finances.Any())
        {
            var finance = new Finance
            {
                MoneyLeft = 100000m,
                NumberOfPurchases = 0,
                MoneySpent = 0m
            };
            context.Finances.Add(finance);
            await context.SaveChangesAsync();
        }

        if (!context.Athletes.Any())
        {
            var athletes = new List<Athlete>
         {
             new Athlete { Name = "Lionel Messi", Gender = "Male", Price =50000m, Image = "images/athletes/messi.jpg", PurchaseStatus = false },
             new Athlete { Name = "Cristiano Ronaldo", Gender = "Male", Price =48000m, Image = "images/athletes/ronaldo.jpg", PurchaseStatus = false },
             new Athlete { Name = "Neymar Jr", Gender = "Male", Price =42000m, Image = "images/athletes/neymar.jpg", PurchaseStatus = false },
             new Athlete { Name = "Kylian Mbappé", Gender = "Male", Price =45000m, Image = "images/athletes/mbappe.jpg", PurchaseStatus = false },
             new Athlete { Name = "Alex Morgan", Gender = "Female", Price =15000m, Image = "images/athletes/morgan.jpg", PurchaseStatus = false },
             new Athlete { Name = "Serena Williams", Gender = "Female", Price =20000m, Image = "images/athletes/serena.jpg", PurchaseStatus = false },
             new Athlete { Name = "LeBron James", Gender = "Male", Price =60000m, Image = "images/athletes/lebron.jpg", PurchaseStatus = false },
             new Athlete { Name = "Stephen Curry", Gender = "Male", Price =55000m, Image = "images/athletes/curry.jpg", PurchaseStatus = false }
         };

            await context.Athletes.AddRangeAsync(athletes);
            await context.SaveChangesAsync();
        }

        if (!context.Venues.Any())
        {
            var venues = new List<Venue>
             {
                 new Venue { Name = "Olympic Stadium", Capacity =80000 },
                 new Venue { Name = "National Arena", Capacity =60000 },
                 new Venue { Name = "City Stadium", Capacity =40000 },
                 new Venue { Name = "Downtown Arena", Capacity =20000 },
                 new Venue { Name = "Riverfront Court", Capacity =15000 },
                 new Venue { Name = "Grand Coliseum", Capacity =90000 },
                 new Venue { Name = "Eastside Field", Capacity =25000 },
                 new Venue { Name = "West End Ground", Capacity =30000 }
             };
            await context.Venues.AddRangeAsync(venues);
            await context.SaveChangesAsync();
        }
    }
}
