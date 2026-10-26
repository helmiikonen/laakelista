namespace Laakelista.Api.Models;

public class UserMedicine
{
    public int Id { get; set; }

    public Guid UserId { get; set; }

    public int MedicineId { get; set; }

    public string Purpose { get; set; } = string.Empty;

    public string Dosage { get; set; } = string.Empty;

    public bool RegularMedicine { get; set; } = true;

    public string? Notes { get; set; }

    public Medicine Medicine { get; set; } = null!;

    public ApplicationUser User { get; set; } = null!;
}