using Laakelista.Api.DTOs;
using Laakelista.Api.Services;
using Laakelista.Api.Models;
using Laakelista.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Laakelista.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserMedicinesController : ControllerBase
{
    private readonly UserMedicineService _userMedicineService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly LaakelistaDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public UserMedicinesController(
        UserMedicineService userMedicineService,
        UserManager<ApplicationUser> userManager,
        LaakelistaDbContext context,
        IWebHostEnvironment environment)
    {
        _userMedicineService = userMedicineService;
        _userManager = userManager;
        _context = context;
        _environment = environment;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserMedicineResponse>>> GetUserMedicines()
    {
        var user = await _userManager.GetUserAsync(User);

        if (user is null)
        {
            return Unauthorized();
        }

        var userMedicines = await _userMedicineService.GetAllAsync(user.Id);

        return Ok(userMedicines);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserMedicineResponse>> GetUserMedicine(int id)
    {
        var user = await _userManager.GetUserAsync(User);

        if (user is null)
        {
            return Unauthorized();
        }

        var userMedicine = await _userMedicineService.GetByIdAsync(id, user.Id);

        if (userMedicine is null)
        {
            return NotFound();
        }

        return Ok(userMedicine);
    }

    // vain kehityskäyttö; hae kaikkien käyttäjien tallennetut lääkkeet
    [AllowAnonymous]
    [HttpGet("all")]
    public async Task<IActionResult> GetAllUserMedicines()
    {
        if (!_environment.IsDevelopment())
        {
            return NotFound();
        }

        var medicines = await _context.UserMedicines
            .Select(userMedicine => new
            {
                userMedicine.Id,
                userMedicine.UserId,
                userMedicine.MedicineId,
                MedicineName = userMedicine.Medicine.Name,
                userMedicine.Purpose,
                userMedicine.Dosage,
                userMedicine.RegularMedicine,
                userMedicine.Notes
            })
            .ToListAsync();

        return Ok(medicines);
    }

    [HttpPost]
    public async Task<ActionResult<UserMedicineCreateResult>> CreateUserMedicine(
        CreateUserMedicineRequest request)
    {
        var user = await _userManager.GetUserAsync(User);

        if (user is null)
        {
            return Unauthorized();
        }

        var result = await _userMedicineService.CreateAsync(request, user.Id);

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
            new { id = result.UserMedicine!.Id },
            result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUserMedicine(
        int id,
        UpdateUserMedicineRequest request)
    {
        var user = await _userManager.GetUserAsync(User);

        if (user is null)
        {
            return Unauthorized();
        }

        var updated = await _userMedicineService.UpdateAsync(
            id,
            request,
            user.Id);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserMedicine(int id)
    {
        var user = await _userManager.GetUserAsync(User);

        if (user is null)
        {
            return Unauthorized();
        }

        var deleted = await _userMedicineService.DeleteAsync(id, user.Id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

}