using Laakelista.Api.Models;
using Laakelista.Api.Services;
using Laakelista.Api.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Laakelista.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MedicinesController : ControllerBase
{
  private readonly MedicineService _medicineService;

  public MedicinesController(MedicineService medicineService)
  {
    _medicineService = medicineService;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<MedicineResponse>>> GetMedicines(
    int page = 1,
    int pageSize = 20 )
  {
    if (page < 1)
    {
      return BadRequest("Page must be greater than 0.");
    }

    if (pageSize < 1 || pageSize > 100)
    {
      return BadRequest("Page size must be between 1 and 100.");
    }

    var medicines = await _medicineService.GetAllAsync(page, pageSize);

    return Ok(medicines);
  }

  [HttpGet("search")]
  public async Task<ActionResult<PagedResult<MedicineResponse>>> Search(
    string query,
    int page = 1,
    int pageSize = 10)
  {
    if (page < 1)
    {
      return BadRequest("Page must be at least 1.");
    }

    if (pageSize < 1 || pageSize > 100)
    {
      return BadRequest("Page size must be between 1 and 100.");
    }

    var result = await _medicineService.SearchAsync(
      query,
      page,
      pageSize);

    return Ok(result);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<MedicineResponse>> GetMedicine(int id)
  {
      var medicine = await _medicineService.GetByIdAsync(id);

      if (medicine is null)
      {
          return NotFound();
      }

      return Ok(medicine);
  }

  [HttpPost]
  public async Task<ActionResult<MedicineResponse>> CreateMedicine(
    CreateMedicineRequest request)
  {
      var medicine = await _medicineService.CreateAsync(request);

      var response = new MedicineResponse
      {
          Id = medicine.Id,
          Name = medicine.Name,
          ActiveIngredient = medicine.ActiveIngredient
      };

      return CreatedAtAction(
          nameof(GetMedicine),
          new { id = medicine.Id },
          response);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateMedicine(
      int id,
      UpdateMedicineRequest request)
  {
      var updated = await _medicineService.UpdateAsync(id, request);

      if (!updated)
      {
          return NotFound();
      }

      return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteMedicine(int id)
  {
    var deleted = await _medicineService.DeleteAsync(id);

    if (!deleted)
    {
        return NotFound();
    }

    return NoContent();
  }

}