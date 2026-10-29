using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Laakelista.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddMedicinePackageStatuses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrescriptionStatus",
                table: "Medicines");

            migrationBuilder.AddColumn<bool>(
                name: "HasOverTheCounterPackages",
                table: "Medicines",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasPrescriptionPackages",
                table: "Medicines",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasOverTheCounterPackages",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "HasPrescriptionPackages",
                table: "Medicines");

            migrationBuilder.AddColumn<string>(
                name: "PrescriptionStatus",
                table: "Medicines",
                type: "TEXT",
                nullable: true);
        }
    }
}
