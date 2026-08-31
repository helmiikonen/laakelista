using System.Dynamic;
using System.Reflection.Metadata;
using Laakelista.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Laakelista.Api.Data;

public class LaakelistaDbContext : DbContext
{
    public LaakelistaDbContext(DbContextOptions<LaakelistaDbContext> options)
        : base(options)
    {
    }

    public DbSet<Medicine> Medicines => Set<Medicine>();
    public DbSet<UserMedicine> UserMedicines => Set<UserMedicine>();
    public DbSet<User> Users => Set<User>();

    // Määritellään tietokantataulujen välinen suhde
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
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