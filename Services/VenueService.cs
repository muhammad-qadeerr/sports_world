using Microsoft.EntityFrameworkCore;
using SportsAPI.Data;
using SportsAPI.Interfaces;
using SportsAPI.Models;

namespace SportsAPI.Services;

public class VenueService : IVenueService
{
    private readonly SportsWorldContext _context;

    public VenueService(SportsWorldContext context)
    {
        _context = context;
    }

    public async Task<Venue> CreateAsync(Venue entity)
    {
        _context.Venues.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(int id)
    {
        var existing = await _context.Venues.FindAsync(id);
        if (existing is null) return;
        _context.Venues.Remove(existing);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Venue>> GetAllAsync()
    {
        return await _context.Venues.ToListAsync();
    }

    public async Task<Venue?> GetByIdAsync(int id)
    {
        return await _context.Venues.FindAsync(id);
    }

    public async Task<IEnumerable<Venue>> SearchByNameAsync(string name)
    {
        if (string.IsNullOrWhiteSpace(name)) return Enumerable.Empty<Venue>();
        var pattern = $"%{name}%";
        return await _context.Venues
            .Where(v => EF.Functions.Like(v.Name, pattern))
            .ToListAsync();
    }

    public async Task UpdateAsync(Venue entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}
