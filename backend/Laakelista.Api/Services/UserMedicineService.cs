using Laakelista.Api.Data;
using Laakelista.Api.DTOs;
using Laakelista.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Laakelista.Api.Services;

public class UserMedicineService
{
    private readonly LaakelistaDbContext _context;

    public UserMedicineService(LaakelistaDbContext context)
    {
        _context = context;
    }

    public async Task<List<UserMedicineResponse>> GetAllAsync(string userId)
    {
        var userMedicines = await _context.UserMedicines
            .Where(userMedicine => userMedicine.UserId == userId)
            .ToListAsync();

        return userMedicines.Select(userMedicine => new UserMedicineResponse
        {
            Id = userMedicine.Id,
            MedicineId = userMedicine.MedicineId,
            Purpose = userMedicine.Purpose,
            Dosage = userMedicine.Dosage,
            Notes = userMedicine.Notes
        }).ToList();
    }

    public async Task<UserMedicineResponse?> GetByIdAsync(
        int id,
        string userId)
    {
        var userMedicine = await _context.UserMedicines
            .FirstOrDefaultAsync(userMedicine =>
                userMedicine.Id == id &&
                userMedicine.UserId == userId);

        if (userMedicine is null)
        {
            return null;
        }

        return new UserMedicineResponse
        {
            Id = userMedicine.Id,
            MedicineId = userMedicine.MedicineId,
            Purpose = userMedicine.Purpose,
            Dosage = userMedicine.Dosage,
            Notes = userMedicine.Notes
        };
    }

    public async Task<UserMedicineResponse?> CreateAsync(
        CreateUserMedicineRequest request)
    {
        var medicineExists = await _context.Medicines
            .AnyAsync(medicine => medicine.Id == request.MedicineId);

        if (!medicineExists)
        {
            return null;
        }

        var userMedicine = new UserMedicine
        {
            UserId = request.UserId,
            MedicineId = request.MedicineId,
            Purpose = request.Purpose,
            Dosage = request.Dosage,
            Notes = request.Notes
        };

        _context.UserMedicines.Add(userMedicine);

        await _context.SaveChangesAsync();

        return new UserMedicineResponse
        {
            Id = userMedicine.Id,
            MedicineId = userMedicine.MedicineId,
            Purpose = userMedicine.Purpose,
            Dosage = userMedicine.Dosage,
            Notes = userMedicine.Notes
        };
    }

    public async Task<bool> UpdateAsync(
        int id,
        UpdateUserMedicineRequest request)
    {
        var userMedicine = await _context.UserMedicines.FindAsync(id);

        if (userMedicine is null)
        {
            return false;
        }

        var medicineExists = await _context.Medicines
            .AnyAsync(medicine => medicine.Id == request.MedicineId);

        if (!medicineExists)
        {
            return false;
        }

        userMedicine.UserId = request.UserId;
        userMedicine.MedicineId = request.MedicineId;
        userMedicine.Purpose = request.Purpose;
        userMedicine.Dosage = request.Dosage;
        userMedicine.Notes = request.Notes;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var userMedicine = await _context.UserMedicines.FindAsync(id);

        if (userMedicine is null)
        {
            return false;
        }

        _context.UserMedicines.Remove(userMedicine);

        await _context.SaveChangesAsync();

        return true;
    }
}