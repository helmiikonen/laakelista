using System.Xml.Serialization;
using Laakelista.Api.Data;
using Laakelista.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Laakelista.Api.Fimea;

public class FimeaImportService
{
    private readonly LaakelistaDbContext _context;

    public FimeaImportService(LaakelistaDbContext context)
    {
        _context = context;
    }

    public async Task<int> ImportAsync(string filePath)
    {
        var serializer = new XmlSerializer(typeof(FimeaData));

        await using var stream = File.OpenRead(filePath);

        var data = (FimeaData?)serializer.Deserialize(stream);

        if (data == null)
        {
            throw new InvalidOperationException(
                "Fimea XML -tiedoston lukeminen epäonnistui.");
        }

        var importedCount = 0;

        foreach (var fimeaMedicine in data.Medicines)
        {
            // Otetaan toistaiseksi vain ihmisille tarkoitetut valmisteet.
            if (fimeaMedicine.Hum != 1)
            {
                continue;
            }

            // Otetaan vain myyntiluvalliset valmisteet.
            if (fimeaMedicine.MarketingAuthorisation?.Status?.Id != "5")
            {
                continue;
            }

            // Etsitään lääkevalmisteeseen liittyvä pakkaus.
            var package = data.Packages
                .FirstOrDefault(p =>
                    p.MedicineReference == fimeaMedicine.FimeaId);

            // Selvitetään pakkauksen kautta Laakeaine.
            var substance = package?.SubstanceReference?.SubstanceReferenceId != null
                ? data.Substances.FirstOrDefault(
                    s => s.FimeaId ==
                         package.SubstanceReference.SubstanceReferenceId)
                : null;

            // Kerätään kaikki vaikuttavat aineet yhteen merkkijonoon.
            var activeIngredients = substance?.ActiveIngredients
                .Where(a => a.Substance?.Value != null)
                .Select(a => a.Substance!.Value!)
                .ToList()
                ?? new List<string>();

            var activeIngredientText =
                string.Join("; ", activeIngredients);

            // Etsitään löytyykö lääke jo tietokannasta.
            var existingMedicine = await _context.Medicines
                .FirstOrDefaultAsync(medicine =>
                    medicine.FimeaId == fimeaMedicine.FimeaId);

            if (existingMedicine != null)
            {
                // Lääke löytyy jo → päivitetään sen tiedot.
                existingMedicine.Name = fimeaMedicine.Name;
                existingMedicine.ActiveIngredient = activeIngredientText;
                existingMedicine.Strength = fimeaMedicine.Strength;
                existingMedicine.AtcCode = fimeaMedicine.AtcCode?.Id;
                existingMedicine.AtcName = fimeaMedicine.AtcCode?.Value;
                existingMedicine.DosageForm =
                    fimeaMedicine.DosageForm?.Value;
                existingMedicine.RouteOfAdministration =
                    fimeaMedicine.RouteOfAdministration?.Value;
                existingMedicine.MarketingAuthorisationHolder =
                    fimeaMedicine.MarketingAuthorisation?.Holder;
                existingMedicine.AuthorisationNumber =
                    fimeaMedicine.MarketingAuthorisation?.AuthorisationNumber;
                existingMedicine.AuthorisationStatus =
                    fimeaMedicine.MarketingAuthorisation?.Status?.Value;
                existingMedicine.IsHumanMedicine = true;
            }
            else
            {
                // Lääkettä ei löydy → lisätään uusi.
                var medicine = new Medicine
                {
                    FimeaId = fimeaMedicine.FimeaId,
                    Name = fimeaMedicine.Name,
                    ActiveIngredient = activeIngredientText,
                    Strength = fimeaMedicine.Strength,
                    AtcCode = fimeaMedicine.AtcCode?.Id,
                    AtcName = fimeaMedicine.AtcCode?.Value,
                    DosageForm = fimeaMedicine.DosageForm?.Value,
                    RouteOfAdministration =
                        fimeaMedicine.RouteOfAdministration?.Value,
                    MarketingAuthorisationHolder =
                        fimeaMedicine.MarketingAuthorisation?.Holder,
                    AuthorisationNumber =
                        fimeaMedicine.MarketingAuthorisation?.AuthorisationNumber,
                    AuthorisationStatus =
                        fimeaMedicine.MarketingAuthorisation?.Status?.Value,
                    IsHumanMedicine = true
                };

                _context.Medicines.Add(medicine);
                importedCount++;
            }
        }

        await _context.SaveChangesAsync();

        return importedCount;
    }
}