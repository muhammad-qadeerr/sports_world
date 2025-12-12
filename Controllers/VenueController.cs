using Microsoft.AspNetCore.Mvc;
using SportsAPI.Interfaces;
using SportsAPI.Models;

namespace SportsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VenueController : ControllerBase
{
    private readonly IVenueService _service;
    public VenueController(IVenueService service) { _service = service; }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Venue>>> Get()
    {
        var list = await _service.GetAllAsync();
        return Ok(list);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Venue>> GetById(int id)
    {
        var venue = await _service.GetByIdAsync(id);
        if (venue == null) return NotFound();
        return Ok(venue);
    }

    [HttpGet("search/{name}")]
    public async Task<ActionResult<IEnumerable<Venue>>> Search(string name)
    {
        var res = await _service.SearchByNameAsync(name);
        return Ok(res);
    }

    [HttpPost]
    public async Task<ActionResult<Venue>> Post([FromBody] Venue venue)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var created = await _service.CreateAsync(venue);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] Venue updated)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        if (id != updated.Id) return BadRequest();
        await _service.UpdateAsync(updated);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _service.GetByIdAsync(id);
        if (existing == null) return NotFound();
        await _service.DeleteAsync(id);
        return NoContent();
    }
}