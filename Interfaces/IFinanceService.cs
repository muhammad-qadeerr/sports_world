using SportsAPI.Models;

namespace SportsAPI.Interfaces;

public interface IFinanceService : ICrudService<Finance>
{
    /// <summary>
    /// Returns the single finance record for the company (or null if missing).
    /// </summary>
    Task<Finance?> GetSingleAsync();
}
