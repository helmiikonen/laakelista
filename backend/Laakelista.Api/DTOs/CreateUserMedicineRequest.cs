namespace Laakelista.Api.DTOs;

public class CreateUserMedicineRequest
{
    public int MedicineId { get; set; }

    public string Purpose { get; set; } = string.Empty;

    public string Dosage { get; set; } = string.Empty;

    public bool RegularMedicine { get; set; } = true;

    public string? Notes { get; set; }
}