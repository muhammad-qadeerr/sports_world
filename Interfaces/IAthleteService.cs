using SportsAPI.Models;

namespace SportsAPI.Interfaces;

public interface IAthleteService : ICrudService<Athlete>
{
    Task<IEnumerable<Athlete>> GetUnpurchasedAsync();
    Task<(bool Success, string? Message)> PurchaseAsync(int id);
}
