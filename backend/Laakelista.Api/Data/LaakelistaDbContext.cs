using Laakelista.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Laakelista.Api.Data;

public class LaakelistaDbContext
    : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public LaakelistaDbContext(
        DbContextOptions<LaakelistaDbContext> options)
        : base(options)
    {
    }

    public DbSet<Medicine> Medicines => Set<Medicine>();

    public DbSet<UserMedicine> UserMedicines => Set<UserMedicine>();

    protected override void OnModelCreating(
        ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserMedicine>()
            .HasOne(userMedicine => userMedicine.Medicine)
            .WithMany(medicine => medicine.UserMedicines)
            .HasForeignKey(userMedicine => userMedicine.MedicineId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<UserMedicine>()
            .HasOne(userMedicine => userMedicine.User)
            .WithMany(user => user.UserMedicines)
            .HasForeignKey(userMedicine => userMedicine.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}