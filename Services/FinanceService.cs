using Microsoft.EntityFrameworkCore;
using SportsAPI.Data;
using SportsAPI.Interfaces;
using SportsAPI.Models;

namespace SportsAPI.Services;

public class FinanceService : IFinanceService
{
    private readonly SportsWorldContext _context;

    public FinanceService(SportsWorldContext context)
    {
        _context = context;
    }

    public async Task<Finance> CreateAsync(Finance entity)
    {
        _context.Finances.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(int id)
    {
        var existing = await _context.Finances.FindAsync(id);
        if (existing is null) return;
        _context.Finances.Remove(existing);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Finance>> GetAllAsync()
    {
        return await _context.Finances.ToListAsync();
    }

    public async Task<Finance?> GetByIdAsync(int id)
    {
        return await _context.Finances.FindAsync(id);
    }

    public async Task<Finance?> GetSingleAsync()
    {
        return await _context.Finances.FirstOrDefaultAsync();
    }

    public Task<IEnumerable<Finance>> SearchByNameAsync(string name)
    {
        // Finance has no "Name" column. Return empty list to satisfy interface.
        return Task.FromResult(Enumerable.Empty<Finance>());
    }

    public async Task UpdateAsync(Finance entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}