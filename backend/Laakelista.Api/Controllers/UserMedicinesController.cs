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
    public async Task<ActionResult<IEnumerable<UserMedicineResponse>>> GetUserMedicines(int userId)
    {
        var userMedicines = await _userMedicineService.GetAllAsync(userId);

        return Ok(userMedicines);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserMedicineResponse>> GetUserMedicine(int id, int userId)
    {
        var userMedicine = await _userMedicineService.GetByIdAsync(id, userId);

        if (userMedicine is null)
        {
            return NotFound();
        }

        return Ok(userMedicine);
    }

    [HttpPost]
    public async Task<ActionResult<UserMedicineCreateResult>> CreateUserMedicine(
        CreateUserMedicineRequest request)
    {
        var result = await _userMedicineService.CreateAsync(request);

        if (result is null)
        {
            return NotFound("Medicine not found.");
        }

        if (result.AlreadyExists)
        {
            return Conflict(new
            {
                message = "Tämä lääke on jo lääkityslistallasi."
            });
        }

        return CreatedAtAction(
            nameof(GetUserMedicine),
            new { id = result.UserMedicine!.Id, userId = request.UserId },
            result);
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
    public async Task<IActionResult> DeleteUserMedicine(int id, int userId)
    {
        var deleted = await _userMedicineService.DeleteAsync(id, userId);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}