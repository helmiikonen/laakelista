using Laakelista.Api.Data;
using Laakelista.Api.Models;
using Laakelista.Api.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Laakelista.Api.Services;

public class MedicineService
{
    private readonly LaakelistaDbContext _context;

    public MedicineService(LaakelistaDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<MedicineResponse>> GetAllAsync(
      int page, 
      int pageSize)
    {
        var query = _context.Medicines.OrderBy(medicine => medicine.Id);

        var totalCount = await query.CountAsync();

        var medicines = await query
          .Skip((page - 1) * pageSize)
          .Take(pageSize)
          .ToListAsync();
        
        var items = medicines.Select(medicine => new MedicineResponse
        {
            Id = medicine.Id,
            Name = medicine.Name,
            ActiveIngredient = medicine.ActiveIngredient,
            Strength = medicine.Strength
        }).ToList();

        return new PagedResult<MedicineResponse>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
        
    }

    public async Task<PagedResult<MedicineResponse>> SearchAsync(
        string searchTerm,
        int page,
        int pageSize)
    {
        var query = _context.Medicines
            .Where(medicine =>
                medicine.Name.ToLower().Contains(searchTerm) ||
                (medicine.ActiveIngredient != null &&
                medicine.ActiveIngredient.ToLower().Contains(searchTerm)));

        var totalCount = await query.CountAsync();

        var medicines = await query
            .OrderBy(medicine => medicine.Name)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var items = medicines.Select(medicine => new MedicineResponse
        {
            Id = medicine.Id,
            Name = medicine.Name,
            ActiveIngredient = medicine.ActiveIngredient,
            Strength = medicine.Strength,
            DosageForm = medicine.DosageForm
        }).ToList();

        return new PagedResult<MedicineResponse>
        {
            Items = items,
            Page = page,
            PageSize = pageSize,
            TotalCount = totalCount
        };
    }

    public async Task<MedicineResponse?> GetByIdAsync(int id)
    {
        var medicine = await _context.Medicines.FindAsync(id);

        if (medicine is null)
        {
            return null;
        }

        return new MedicineResponse
        {
            Id = medicine.Id,
            Name = medicine.Name,
            ActiveIngredient = medicine.ActiveIngredient,
            Strength = medicine.Strength,
            DosageForm = medicine.DosageForm
        };
    }

    public async Task<Medicine> CreateAsync(CreateMedicineRequest request)
    {
        var medicine = new Medicine
        {
            Name = request.Name,
            ActiveIngredient = request.ActiveIngredient
        };

        _context.Medicines.Add(medicine);

        await _context.SaveChangesAsync();

        return medicine;
    }

    public async Task<bool> UpdateAsync(
      int id,
      UpdateMedicineRequest request)
    {
        var existingMedicine = await _context.Medicines.FindAsync(id);

        if (existingMedicine is null)
        {
            return false;
        }

        existingMedicine.Name = request.Name;
        existingMedicine.ActiveIngredient = request.ActiveIngredient;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var medicine = await _context.Medicines.FindAsync(id);

        if (medicine is null)
        {
            return false;
        }

        _context.Medicines.Remove(medicine);

        await _context.SaveChangesAsync();

        return true;
    }
}