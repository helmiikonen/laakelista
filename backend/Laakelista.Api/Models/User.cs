namespace Laakelista.Api.Models;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public ICollection<UserMedicine> UserMedicines { get; set; }
        = new List<UserMedicine>();
}