using System.Xml.Serialization;

namespace Laakelista.Api.Fimea;

[XmlRoot("Perusrekisteri")]
public class FimeaData
{
    [XmlElement("Laakevalmiste")]
    public List<FimeaMedicine> Medicines { get; set; } = new();

    [XmlElement("Pakkaus")]
    public List<FimeaPackage> Packages { get; set; } = new();

    [XmlElement("Laakeaine")]
    public List<FimeaSubstance> Substances { get; set; } = new();
}

public class FimeaMedicine
{
    [XmlAttribute("id")]
    public string FimeaId { get; set; } = string.Empty;

    [XmlElement("Kauppanimi")]
    public string Name { get; set; } = string.Empty;

    [XmlElement("ATC-koodi")]
    public FimeaCodeValue? AtcCode { get; set; }

    [XmlElement("Laakemuoto")]
    public FimeaCodeValue? DosageForm { get; set; }

    [XmlElement("Antoreitti")]
    public FimeaCodeValue? RouteOfAdministration { get; set; }

    [XmlElement("HUM")]
    public int Hum { get; set; }

    [XmlElement("VET")]
    public int Vet { get; set; }

    [XmlElement("Myyntilupa")]
    public FimeaMarketingAuthorisation? MarketingAuthorisation { get; set; }
}

public class FimeaPackage
{
    [XmlAttribute("Laakevalmiste-ref")]
    public string? MedicineReference { get; set; }

    [XmlElement("Pakkaustunnus")]
    public string? PackageId { get; set; }

    [XmlElement("VNR-numero")]
    public string? VnrNumber { get; set; }

    [XmlElement("Pakkauskokoteksti")]
    public string? PackageSizeText { get; set; }

    [XmlElement("Reseptistatus")]
    public FimeaCodeValue? PrescriptionStatus { get; set; }

    [XmlElement("Pakkaus_Laakeaine")]
    public FimeaPackageSubstance? SubstanceReference { get; set; }

    [XmlElement("Kaupanolo")]
    public FimeaAvailability? Availability { get; set; }
}

public class FimeaPackageSubstance
{
    [XmlAttribute("Laakeaine-ref")]
    public string? SubstanceReferenceId { get; set; }
}

public class FimeaSubstance
{
    [XmlAttribute("id")]
    public string FimeaId { get; set; } = string.Empty;

    [XmlElement("VaikuttavaAine")]
    public List<FimeaActiveIngredient> ActiveIngredients { get; set; } = new();
}

public class FimeaActiveIngredient
{
    [XmlElement("Aine")]
    public FimeaCodeValue? Substance { get; set; }
}

public class FimeaCodeValue
{
    [XmlAttribute("id")]
    public string? Id { get; set; }

    [XmlAttribute("value")]
    public string? Value { get; set; }
}

public class FimeaMarketingAuthorisation
{
    [XmlElement("Haltija")]
    public string? Holder { get; set; }

    [XmlElement("Lupanumero")]
    public string? AuthorisationNumber { get; set; }

    [XmlElement("Tila")]
    public FimeaCodeValue? Status { get; set; }
}

public class FimeaAvailability
{
    [XmlElement("Kaupan")]
    public int InTrade { get; set; }
}