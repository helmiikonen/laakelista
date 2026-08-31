namespace Laakelista.Api.Models;

public class UserMedicine
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int MedicineId { get; set; }

    public string Purpose { get; set; } = string.Empty;

    public string Dosage { get; set; } = string.Empty;

    public string? Notes { get; set; }

    public User User { get; set; } = null!;

    public Medicine Medicine { get; set; } = null!;
}