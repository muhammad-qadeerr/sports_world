using Microsoft.AspNetCore.Mvc;
using SportsAPI.Interfaces;
using SportsAPI.Models;

namespace SportsAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AthleteController : ControllerBase
{
    private readonly IAthleteService _service;
    private readonly IWebHostEnvironment _env;

    public AthleteController(IAthleteService service, IWebHostEnvironment env)
    {
        _service = service;
        _env = env;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Athlete>>> Get()
    {
        try
        {
            var list = await _service.GetAllAsync();
            return Ok(list);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while retrieving athletes.");
        }
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Athlete>> GetById(int id)
    {
        try
        {
            var ath = await _service.GetByIdAsync(id);
            if (ath == null) return NotFound();
            return Ok(ath);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while retrieving the athlete.");
        }
    }
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Athlete>>> Search([FromQuery] string name)
    {
        try
        {
            var res = await _service.SearchByNameAsync(name);
            return Ok(res);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while searching athletes.");
        }
    }

    [HttpGet("unpurchased")]
    public async Task<ActionResult<IEnumerable<Athlete>>> GetUnpurchased()
    {
        try
        {
            var res = await _service.GetUnpurchasedAsync();
            return Ok(res);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while retrieving unpurchased athletes.");
        }
    }

    [HttpPost]
    [DisableRequestSizeLimit]
    public async Task<ActionResult<Athlete>> Post([FromForm] Athlete athlete, IFormFile? image)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (image != null && image.Length >0)
            {
                var imagesPath = Path.Combine(_env.WebRootPath ?? "wwwroot", "images", "athletes");
                if (!Directory.Exists(imagesPath)) Directory.CreateDirectory(imagesPath);

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(image.FileName)}";
                var filePath = Path.Combine(imagesPath, fileName);

                await using var stream = System.IO.File.Create(filePath);
                await image.CopyToAsync(stream);

                athlete.Image = Path.Combine("images", "athletes", fileName).Replace("\\", "/");
            }

            var created = await _service.CreateAsync(athlete);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while creating the athlete.");
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Put(int id, [FromBody] Athlete updated)
    {
        try
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != updated.Id) return BadRequest();
            await _service.UpdateAsync(updated);
            return NoContent();
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while updating the athlete.");
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NotFound();
            await _service.DeleteAsync(id);
            return Ok();
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while deleting the athlete.");
        }
    }

    [HttpPost("{id:int}/purchase")]
    public async Task<IActionResult> Purchase(int id)
    {
        try
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NotFound();
            if (existing.PurchaseStatus) return BadRequest("Athlete already purchased.");

            var ok = await _service.PurchaseAsync(id);
            if (!ok) return StatusCode(500, "Purchase failed.");

            var updated = await _service.GetByIdAsync(id);
            return Ok(updated);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while purchasing the athlete.");
        }
    }
}