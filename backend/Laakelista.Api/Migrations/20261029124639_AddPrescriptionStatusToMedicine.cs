using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Laakelista.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPrescriptionStatusToMedicine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PrescriptionStatus",
                table: "Medicines",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrescriptionStatus",
                table: "Medicines");
        }
    }
}
