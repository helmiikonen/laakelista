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

    public async Task<List<UserMedicineResponse>> GetAllAsync(Guid userId)
    {
        var userMedicines = await _context.UserMedicines
            .Include(userMedicine => userMedicine.Medicine)
            .Where(userMedicine => userMedicine.UserId == userId)
            .ToListAsync();

        return userMedicines.Select(userMedicine => new UserMedicineResponse
        {
            Id = userMedicine.Id,
            UserId = userMedicine.UserId,
            MedicineId = userMedicine.MedicineId,
            MedicineName = userMedicine.Medicine.Name,
            MedicineStrength = userMedicine.Medicine.Strength,
            MedicineDosageForm = userMedicine.Medicine.DosageForm,
            ActiveIngredient = userMedicine.Medicine.ActiveIngredient,
            Purpose = userMedicine.Purpose,
            Dosage = userMedicine.Dosage,
            Notes = userMedicine.Notes
        }).ToList();
    }

    public async Task<UserMedicineResponse?> GetByIdAsync(
        int id,
        Guid userId)
    {
        var userMedicine = await _context.UserMedicines
            .Include(userMedicine => userMedicine.Medicine)
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
            UserId = userMedicine.UserId,
            MedicineId = userMedicine.MedicineId,
            MedicineName = userMedicine.Medicine.Name,
            MedicineStrength = userMedicine.Medicine.Strength,
            MedicineDosageForm = userMedicine.Medicine.DosageForm,
            ActiveIngredient = userMedicine.Medicine.ActiveIngredient,
            Purpose = userMedicine.Purpose,
            Dosage = userMedicine.Dosage,
            Notes = userMedicine.Notes
        };
    }

    public async Task<UserMedicineCreateResult?> CreateAsync(
        CreateUserMedicineRequest request,
        Guid userId)
    {
        var medicine = await _context.Medicines
            .FirstOrDefaultAsync(medicine => medicine.Id == request.MedicineId);

        if (medicine is null)
        {
            return null;
        }

        var alreadyExists = await _context.UserMedicines
            .AnyAsync(userMedicine =>
                userMedicine.UserId == userId &&
                userMedicine.MedicineId == request.MedicineId);

        if (alreadyExists)
        {
            return new UserMedicineCreateResult
            {
                AlreadyExists = true
            };
        }

        var userMedicine = new UserMedicine
        {
            UserId = userId,
            MedicineId = request.MedicineId,
            Purpose = request.Purpose,
            Dosage = request.Dosage,
            Notes = request.Notes
        };

        _context.UserMedicines.Add(userMedicine);

        await _context.SaveChangesAsync();

        return new UserMedicineCreateResult
        {
            UserMedicine = new UserMedicineResponse
            {
                Id = userMedicine.Id,
                UserId = userMedicine.UserId,
                MedicineId = userMedicine.MedicineId,
                MedicineName = medicine.Name,
                ActiveIngredient = medicine.ActiveIngredient,
                MedicineStrength = medicine.Strength,
                MedicineDosageForm = medicine.DosageForm,
                Purpose = userMedicine.Purpose,
                Dosage = userMedicine.Dosage,
                Notes = userMedicine.Notes
            },
            AlreadyExists = false
        };
    }

    public async Task<bool> UpdateAsync(
        int id,
        UpdateUserMedicineRequest request,
        Guid userId)
    {
        var userMedicine = await _context.UserMedicines
            .FirstOrDefaultAsync(userMedicine =>
                userMedicine.Id == id &&
                userMedicine.UserId == userId);

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

        userMedicine.MedicineId = request.MedicineId;
        userMedicine.Purpose = request.Purpose;
        userMedicine.Dosage = request.Dosage;
        userMedicine.Notes = request.Notes;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id, Guid userId)
    {
        var userMedicine = await _context.UserMedicines
            .FirstOrDefaultAsync(userMedicine =>
                userMedicine.Id == id &&
                userMedicine.UserId == userId);

        if (userMedicine is null)
        {
            return false;
        }

        _context.UserMedicines.Remove(userMedicine);

        await _context.SaveChangesAsync();

        return true;
    }
}