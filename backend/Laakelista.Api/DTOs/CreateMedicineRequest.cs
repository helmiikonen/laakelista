namespace Laakelista.Api.DTOs;

public class CreateUserMedicineRequest
{
    public string UserId { get; set; } = string.Empty;
    public int MedicineId { get; set; }
    public string Purpose { get; set; } = string.Empty;
    public string Dosage { get; set; } = string.Empty;
    public string? Notes { get; set; }
}