using Microsoft.EntityFrameworkCore;
using SportsAPI.Data;
using SportsAPI.Interfaces;
using SportsAPI.Models;

namespace SportsAPI.Services;

public class AthleteService : IAthleteService
{
    private readonly SportsWorldContext _context;
    public AthleteService(SportsWorldContext context) { _context = context; }

    public async Task<Athlete> CreateAsync(Athlete entity)
    {
        try
        {
            _context.Athletes.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
        catch (Exception) { throw; }
    }

    public async Task DeleteAsync(int id)
    {
        try
        {
            var existing = await _context.Athletes.FindAsync(id);
            if (existing is null) return;
            _context.Athletes.Remove(existing);
            await _context.SaveChangesAsync();
        }
        catch (Exception) { throw; }
    }

    public async Task<IEnumerable<Athlete>> GetAllAsync()
    {
        try
        {
            return await _context.Athletes.ToListAsync();
        }
        catch (Exception) { throw; }
    }

    public async Task<Athlete?> GetByIdAsync(int id)
    {
        try
        {
            return await _context.Athletes.FindAsync(id);
        }
        catch (Exception) { throw; }
    }

    public async Task<IEnumerable<Athlete>> SearchByNameAsync(string name)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(name)) return Enumerable.Empty<Athlete>();
            var pattern = $"%{name}%";
            return await _context.Athletes
                .Where(a => EF.Functions.Like(a.Name, pattern))
                .ToListAsync();
        }
        catch (Exception) { throw; }
    }

    public async Task UpdateAsync(Athlete entity)
    {
        try
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        catch (Exception) { throw; }
    }

    public async Task<IEnumerable<Athlete>> GetUnpurchasedAsync()
    {
        try
        {
            return await _context.Athletes.Where(a => !a.PurchaseStatus).ToListAsync();
        }
        catch (Exception) { throw; }
    }

    public async Task<bool> PurchaseAsync(int id)
    {
        using var tx = await _context.Database.BeginTransactionAsync();
        try
        {
            var athlete = await _context.Athletes.FindAsync(id);
            if (athlete == null) return false;
            if (athlete.PurchaseStatus) return false; // already purchased

            // Mark purchased
            athlete.PurchaseStatus = true;
            _context.Athletes.Update(athlete);

            // Update finance record if exists
            var finance = await _context.Finances.FirstOrDefaultAsync();
            if (finance != null)
            {
                finance.MoneyLeft -= athlete.Price;
                finance.NumberOfPurchases += 1;
                finance.MoneySpent += athlete.Price;
                _context.Finances.Update(finance);
            }

            await _context.SaveChangesAsync();
            await tx.CommitAsync();
            return true;
        }
        catch (Exception) { await tx.RollbackAsync(); throw; }
    }
}