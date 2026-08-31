namespace Laakelista.Api.Models;

public class Medicine
{
    public int Id { get; set; }

    public string FimeaId { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string? ActiveIngredient { get; set; }

    public string? AtcCode { get; set; }

    public string? AtcName { get; set; }

    public string? DosageForm { get; set; }

    public string? RouteOfAdministration { get; set; }

    public string? MarketingAuthorisationHolder { get; set; }

    public string? AuthorisationNumber { get; set; }

    public string? AuthorisationStatus { get; set; }

    public bool IsHumanMedicine { get; set; }

    public ICollection<UserMedicine> UserMedicines { get; set; }
        = new List<UserMedicine>();
}