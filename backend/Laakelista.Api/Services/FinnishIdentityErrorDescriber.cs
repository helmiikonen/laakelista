using Microsoft.AspNetCore.Identity;

namespace Laakelista.Api.Services;

public class FinnishIdentityErrorDescriber : IdentityErrorDescriber
{
    public override IdentityError PasswordMismatch()
    {
        return new IdentityError
        {
            Code = nameof(PasswordMismatch),
            Description = "Nykyinen salasana on väärä."
        };
    }

    public override IdentityError PasswordTooShort(int length)
    {
        return new IdentityError
        {
            Code = nameof(PasswordTooShort),
            Description = $"Salasanan tulee olla vähintään {length} merkkiä pitkä."
        };
    }

    public override IdentityError PasswordRequiresDigit()
    {
        return new IdentityError
        {
            Code = nameof(PasswordRequiresDigit),
            Description = "Salasanan tulee sisältää vähintään yksi numero (0–9)."
        };
    }

    public override IdentityError PasswordRequiresLower()
    {
        return new IdentityError
        {
            Code = nameof(PasswordRequiresLower),
            Description = "Salasanan tulee sisältää vähintään yksi pieni kirjain (a–z)."
        };
    }

    public override IdentityError PasswordRequiresUpper()
    {
        return new IdentityError
        {
            Code = nameof(PasswordRequiresUpper),
            Description = "Salasanan tulee sisältää vähintään yksi iso kirjain (A–Z)."
        };
    }

    public override IdentityError PasswordRequiresNonAlphanumeric()
    {
        return new IdentityError
        {
            Code = nameof(PasswordRequiresNonAlphanumeric),
            Description = "Salasanan tulee sisältää vähintään yksi erikoismerkki, esimerkiksi !, # tai ?."
        };
    }
}