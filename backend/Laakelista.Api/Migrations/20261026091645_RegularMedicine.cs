using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Laakelista.Api.Migrations
{
    /// <inheritdoc />
    public partial class RegularMedicine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "RegularMedicine",
                table: "UserMedicines",
                type: "INTEGER",
                nullable: false,
                defaultValue: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RegularMedicine",
                table: "UserMedicines");
        }
    }
}
