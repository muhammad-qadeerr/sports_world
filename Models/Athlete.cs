using SportsAPI.Interfaces;

namespace SportsAPI.Models;

public class Athlete
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Image { get; set; } = string.Empty;
    public bool PurchaseStatus { get; set; } = false;
}