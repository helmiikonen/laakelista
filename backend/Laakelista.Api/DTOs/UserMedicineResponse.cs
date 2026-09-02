namespace Laakelista.Api.DTOs;

public class UserMedicineResponse
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int MedicineId { get; set; }

    public string MedicineName { get; set; } = string.Empty;

    public string MedicineStrength { get; set; } = string.Empty;

    public string Purpose { get; set; } = string.Empty;

    public string Dosage { get; set; } = string.Empty;

    public string? Notes { get; set; }
}