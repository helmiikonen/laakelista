using Laakelista.Api.DTOs;
using Laakelista.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Laakelista.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserMedicinesController : ControllerBase
{
    private readonly UserMedicineService _userMedicineService;

    public UserMedicinesController(UserMedicineService userMedicineService)
    {
        _userMedicineService = userMedicineService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserMedicineResponse>>> GetUserMedicines()
    {
        var userMedicines = await _userMedicineService.GetAllAsync();

        return Ok(userMedicines);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserMedicineResponse>> GetUserMedicine(int id)
    {
        var userMedicine = await _userMedicineService.GetByIdAsync(id);

        if (userMedicine is null)
        {
            return NotFound();
        }

        return Ok(userMedicine);
    }

    [HttpPost]
    public async Task<ActionResult<UserMedicineResponse>> CreateUserMedicine(
        CreateUserMedicineRequest request)
    {
        var userMedicine = await _userMedicineService.CreateAsync(request);

        if (userMedicine is null)
        {
            return NotFound("Medicine not found.");
        }

        return CreatedAtAction(
            nameof(GetUserMedicine),
            new { id = userMedicine.Id },
            userMedicine);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUserMedicine(
        int id,
        UpdateUserMedicineRequest request)
    {
        var updated = await _userMedicineService.UpdateAsync(id, request);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserMedicine(int id)
    {
        var deleted = await _userMedicineService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}