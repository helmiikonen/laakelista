using Microsoft.AspNetCore.Identity;

namespace Laakelista.Api.Models;

public class ApplicationUser : IdentityUser<Guid>
{
    public ICollection<UserMedicine> UserMedicines { get; set; }
        = new List<UserMedicine>();
}