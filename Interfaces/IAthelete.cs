namespace SportsAPI.Interfaces;

public interface IAthelete
{
    int Id { get; set; }
    string Name { get; set; }
    string Gender { get; set; }
    decimal Price { get; set; }
    string Image { get; set; }
    bool PurchaseStatus { get; set; }
}
