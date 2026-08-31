using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Laakelista.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddFimeaMedicineFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ActiveIngredient",
                table: "Medicines",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "AtcCode",
                table: "Medicines",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AtcName",
                table: "Medicines",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AuthorisationNumber",
                table: "Medicines",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AuthorisationStatus",
                table: "Medicines",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DosageForm",
                table: "Medicines",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FimeaId",
                table: "Medicines",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsHumanMedicine",
                table: "Medicines",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "MarketingAuthorisationHolder",
                table: "Medicines",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RouteOfAdministration",
                table: "Medicines",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AtcCode",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "AtcName",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "AuthorisationNumber",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "AuthorisationStatus",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "DosageForm",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "FimeaId",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "IsHumanMedicine",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "MarketingAuthorisationHolder",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "RouteOfAdministration",
                table: "Medicines");

            migrationBuilder.AlterColumn<string>(
                name: "ActiveIngredient",
                table: "Medicines",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
