using Laakelista.Api.Fimea;
using Microsoft.AspNetCore.Mvc;

namespace Laakelista.Api.Controllers;

[ApiController]
[Route("api/fimea")]
public class FimeaController : ControllerBase
{
    private readonly FimeaImportService _importService;

    public FimeaController(FimeaImportService importService)
    {
        _importService = importService;
    }

    [HttpPost("import")]
    public async Task<IActionResult> Import()
    {
        var filePath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "FimeaData",
            "perusrekisteri.xml");

        if (!System.IO.File.Exists(filePath))
        {
            return NotFound("Fimea XML -tiedostoa ei löytynyt.");
        }

        var importedCount =
            await _importService.ImportAsync(filePath);

        return Ok(new
        {
            imported = importedCount
        });
    }
}