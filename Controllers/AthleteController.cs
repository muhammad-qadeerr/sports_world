using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsAPI.Data;
using SportsAPI.Models;

namespace SportsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AthleteController : ControllerBase
{
    private readonly SportsWorldContext context;
    public AthleteController(SportsWorldContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Athlete>>> Get()
    {
        try
        {
            var obj = new Athlete();
            var list = await context.Athletes.ToListAsync();
            return Ok(list);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Athlete>> GetById(int id)
    {
        var ath = await context.Athletes.FindAsync(id);
        if (ath == null) return NotFound();
        return Ok(ath);
    }

    [HttpGet("search/{name}")]
    public async Task<ActionResult<List<Athlete>>> Search(string name)
    {
        var res = await context.Athletes
            .Where(a => a.Name.ToLower().Contains(name.ToLower()))
            .ToListAsync();
        return Ok(res);
    }

    [HttpPost]
    public async Task<ActionResult<Athlete>> Post(Athlete athlete)
    {
        if (athlete == null) return BadRequest();
        context.Athletes.Add(athlete);
        await context.SaveChangesAsync();
        return Created("", athlete);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Athlete updated)
    {
        if (id != updated.Id) return BadRequest();
        context.Entry(updated).State = EntityState.Modified;
        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ath = await context.Athletes.FindAsync(id);
        if (ath == null) return NotFound();
        context.Athletes.Remove(ath);
        await context.SaveChangesAsync();
        return NoContent();
    }
}