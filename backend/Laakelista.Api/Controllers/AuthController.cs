using Laakelista.Api.DTOs;
using Laakelista.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Laakelista.Api.Controllers;

public class DeleteAccountRequest
{
      public string Password { get; set; } = string.Empty;
}

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    private readonly SignInManager<ApplicationUser> _signInManager;

    private readonly IWebHostEnvironment _environment;

    private static bool IsValidUsername(string? username)
    {
        return username is not null
            && username.Length >= 3
            && username.Length <= 20
            && username.All(c =>
                c is >= 'a' and <= 'z'
                or >= 'A' and <= 'Z'
                or >= '0' and <= '9'
                or '_' or '-' or '.');
    }

    private static bool ContainsForbiddenPasswordLetters(string password)
    {
        return password.Any(c =>
            char.IsLetter(c) &&
            !(c is >= 'a' and <= 'z' or >= 'A' and <= 'Z'));
    }

    public AuthController(
      UserManager<ApplicationUser> userManager,
      SignInManager<ApplicationUser> signInManager,
      IWebHostEnvironment environment)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _environment = environment;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        if (!IsValidUsername(request.Username))
        {
            return BadRequest(new
            {
                message = "Käyttäjätunnuksen tulee olla 3–20 merkkiä pitkä. Sallitut merkit ovat a–z, A–Z, 0–9, alaviiva (_), yhdysmerkki (-) ja piste (.)."
            });
        }

        if (ContainsForbiddenPasswordLetters(request.Password))
        {
            return BadRequest(new
            {
                message = "Salasana sisältää kiellettyjä kirjaimia. Käytä vain englannin aakkosia (A–Z, a–z), numeroita ja erikoismerkkejä."
            });
        }

        var user = new ApplicationUser
        {
            UserName = request.Username
        };

        var result = await _userManager.CreateAsync(
            user,
            request.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new
        {
            user.Id,
            user.UserName
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await _signInManager.PasswordSignInAsync(
            request.Username,
            request.Password,
            isPersistent: false,
            lockoutOnFailure: true);

        if (!result.Succeeded)
        {
            return Unauthorized(new
            {
                message = "Virheellinen käyttäjätunnus tai salasana."
            });
        }

        return Ok(new
        {
            message = "Kirjautuminen onnistui."
        });
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var user = await _userManager.GetUserAsync(User);

        if (user is null)
        {
            return Unauthorized();
        }

        return Ok(new
        {
            user.Id,
            user.UserName
        });
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();

        return Ok(new
        {
            message = "Uloskirjautuminen onnistui."
        });
    }

    [Authorize]
    [HttpPut("username")]
    public async Task<IActionResult> ChangeUsername(
        [FromBody] ChangeUsernameRequest request)
    {
        var user = await _userManager.GetUserAsync(User);

        if (user is null)
        {
            return Unauthorized();
        }

        var newUsername = request.NewUsername.Trim();

        if (!IsValidUsername(newUsername))
        {
            return BadRequest(new
            {
                message = "Käyttäjätunnuksen tulee olla 3–20 merkkiä pitkä. Sallitut merkit ovat a–z, A–Z ja 0–9."
            });
        }

        var result = await _userManager.SetUserNameAsync(user, newUsername);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors.Select(error => new
            {
                error.Code,
                error.Description
            }));
        }

        await _signInManager.RefreshSignInAsync(user);

        return Ok(new { message = "Käyttäjätunnus vaihdettu onnistuneesti." });
    }


    [Authorize]
    [HttpPut("password")]
    public async Task<IActionResult> ChangePassword(
        [FromBody] ChangePasswordRequest request)
    {
        var user = await _userManager.GetUserAsync(User);

        if (user is null)
        {
            return Unauthorized();
        }

        if (ContainsForbiddenPasswordLetters(request.NewPassword))
        {
            return BadRequest(new
            {
                message = "Annettu salasana sisältää kiellettyjä merkkejä."
            });
        }

        var result = await _userManager.ChangePasswordAsync(
            user,
            request.CurrentPassword,
            request.NewPassword);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors.Select(error => new
            {
                error.Code,
                error.Description
            }));
        }

        await _signInManager.RefreshSignInAsync(user);

        return Ok(new { message = "Salasana vaihdettu onnistuneesti." });
    }


    [Authorize]
    [HttpDelete("account")]
    public async Task<IActionResult> DeleteAccount(
        DeleteAccountRequest request)
    {
        var user = await _userManager.GetUserAsync(User);

        if (user is null)
        {
            return Unauthorized();
        }

        var passwordValid = await _userManager.CheckPasswordAsync(
            user,
            request.Password
        );

        if (!passwordValid)
        {
            return BadRequest(new
            {
                message = "Salasana on virheellinen."
            });
        }

        var result = await _userManager.DeleteAsync(user);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors.Select(error => new
            {
                error.Code,
                error.Description
            }));
        }

        await _signInManager.SignOutAsync();

        return Ok(new
        {
            message = "Käyttäjätili poistettu onnistuneesti."
        });
    }

    // tämä vain kehityskäytössä; palauttaa kaikki rekisteröityneet käyttäjät
    [HttpGet("users")]
    public IActionResult GetUsers()
    {
        if (!_environment.IsDevelopment())
        {
            return NotFound();
        }
        var users = _userManager.Users
            .Select(user => new
            {
                user.Id,
                user.UserName
            })
            .ToList();

        return Ok(users);
    }

    // vain kehityskäyttö; poistaa valitun käyttäjän
    [HttpDelete("users/{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        if (!_environment.IsDevelopment())
        {
            return NotFound();
        }

        var user = await _userManager.FindByIdAsync(id.ToString());

        if (user is null)
        {
            return NotFound(new
            {
                message = "Käyttäjää ei löytynyt."
            });
        }

        var result = await _userManager.DeleteAsync(user);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors.Select(error => new
            {
                error.Code,
                error.Description
            }));
        }

        return Ok(new
        {
            message = "Käyttäjä poistettu onnistuneesti."
        });
    }

}