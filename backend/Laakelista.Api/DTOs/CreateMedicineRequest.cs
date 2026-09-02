namespace Laakelista.Api.DTOs;

public class CreateMedicineRequest
{
    public string Name { get; set; } = string.Empty;
    
    public string ActiveIngredient { get; set; } = string.Empty;
}