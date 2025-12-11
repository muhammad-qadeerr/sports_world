
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using SportsAPI.Data;
//using SportsAPI.Models;

//namespace SportsAPI.Controllers;

//[ApiController]
//[Route("api/[controller]")]
//public class FinanceController(SportsWorldContext context) : ControllerBase
//{
//    [HttpGet]
//    public async Task<ActionResult<Finance>> Get()
//    {
//        var f = await context.Finances.FirstOrDefaultAsync();
//        if (f == null) return NotFound();
//        return Ok(f);
//    }

//    [HttpPost("loan")]
//    public async Task<ActionResult<Finance>> Loan([FromBody] decimal amount)
//    {
//        var f = await context.Finances.FirstOrDefaultAsync();
//        if (f == null) return NotFound();
//        f.MoneyLeft += amount;
//        await context.SaveChangesAsync();
//        return Ok(f);
//    }

//    [HttpPut]
//    public async Task<IActionResult> Put(Finance updated)
//    {
//        context.Entry(updated).State = EntityState.Modified;
//        await context.SaveChangesAsync();
//        return NoContent();
//    }
//}
