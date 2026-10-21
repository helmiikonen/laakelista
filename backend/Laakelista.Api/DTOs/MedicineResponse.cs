namespace Laakelista.Api.DTOs;

public class MedicineResponse
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? ActiveIngredient { get; set; } = string.Empty;

    public string? Strength { get; set; }

    public string? DosageForm { get; set; }
}