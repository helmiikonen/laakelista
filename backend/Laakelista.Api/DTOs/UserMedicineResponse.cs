namespace Laakelista.Api.DTOs;

public class UserMedicineResponse
{
    public int Id { get; set; }

    public Guid UserId { get; set; }

    public int MedicineId { get; set; }

    public string MedicineName { get; set; } = string.Empty;

    public string? MedicineStrength { get; set; } = string.Empty;

    public string? MedicineDosageForm { get; set; } = string.Empty;

    public string? ActiveIngredient { get; set; } = string.Empty;

    public string Purpose { get; set; } = string.Empty;

    public string Dosage { get; set; } = string.Empty;

    public bool RegularMedicine { get; set; } = true;

    public string? PrescriptionStatus { get; set; }

    public string? Notes { get; set; }
}