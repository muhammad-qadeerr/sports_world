using SportsAPI.Models;

namespace SportsAPI.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(SportsWorldContext context)
    {
        await context.Database.EnsureDeletedAsync();
        await context.Database.EnsureCreatedAsync();

        var finance = new Finance
        {
            MoneyLeft = 100000m,
            NumberOfPurchases = 0,
            MoneySpent = 0m
        };

        var athletes = new List<Athlete>
        {
            new Athlete { Name = "Lionel Messi", Gender = "Male", Price =50000m, Image = "/images/athletes/6339357d-2883-49f6-9d1d-15084ad67475.jpg", PurchaseStatus = false },
            new Athlete { Name = "Cristiano Ronaldo", Gender = "Male", Price =48000m, Image = "/images/athletes/8653dd96-a380-4b7a-967e-d8cb021aa2f1.jpg", PurchaseStatus = false },
            new Athlete { Name = "Neymar Jr", Gender = "Male", Price =42000m, Image = "/images/athletes/1bc4e174-5130-4b4d-a319-7ce95e486bf7.jpg", PurchaseStatus = false },
            new Athlete { Name = "Kylian Mbappé", Gender = "Male", Price =45000m, Image = "/images/athletes/b89f955c-0e6c-4705-9d46-0dea08649a12.jpg", PurchaseStatus = false },
            new Athlete { Name = "Alex Morgan", Gender = "Female", Price =15000m, Image = "/images/athletes/982327bc-d071-4f3c-8207-b1bf9cb30dce.jpg", PurchaseStatus = false },
            new Athlete { Name = "Serena Williams", Gender = "Female", Price =20000m, Image = "/images/athletes/7cc9b4dd-036c-414f-a993-09e795660872.jpg", PurchaseStatus = false },
            new Athlete { Name = "LeBron James", Gender = "Male", Price =60000m, Image = "/images/athletes/ace05419-e520-4565-b42c-d0de8dfeae17.jpg", PurchaseStatus = false },
            new Athlete { Name = "Stephen Curry", Gender = "Male", Price =55000m, Image = "/images/athletes/8d307613-a8b9-472b-bd1d-2a7e1b950981.png", PurchaseStatus = false }
        };

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

        context.Finances.Add(finance);
        await context.Athletes.AddRangeAsync(athletes);
        await context.Venues.AddRangeAsync(venues);
        await context.SaveChangesAsync();
    }
}
