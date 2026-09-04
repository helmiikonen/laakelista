namespace Laakelista.Api.DTOs;

public class UserMedicineCreateResult
{
    public UserMedicineResponse? UserMedicine { get; set; }
    public bool AlreadyExists { get; set; }
}