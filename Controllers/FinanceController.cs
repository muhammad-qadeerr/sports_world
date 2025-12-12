using Microsoft.AspNetCore.Mvc;
using SportsAPI.Interfaces;
using SportsAPI.Models;

namespace SportsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FinanceController : ControllerBase
{
    private readonly IFinanceService _service;

    public FinanceController(IFinanceService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<Finance>> Get()
    {
        var f = await _service.GetSingleAsync();
        if (f == null) return NotFound();
        return Ok(f);
    }

    [HttpPost]
    public async Task<ActionResult<Finance>> Post([FromBody] Finance finance)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var created = await _service.CreateAsync(finance);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    [HttpPost("loan")]
    public async Task<ActionResult<Finance>> Loan([FromBody] decimal amount)
    {
        var f = await _service.GetSingleAsync();
        if (f == null) return NotFound();
        f.MoneyLeft += amount;
        await _service.UpdateAsync(f);
        return Ok(f);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] Finance updated)
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