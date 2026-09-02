using Laakelista.Api.Data;
using Laakelista.Api.DTOs;
using Laakelista.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Laakelista.Api.Services;

public class UserService
{
    private readonly LaakelistaDbContext _context;

    public UserService(LaakelistaDbContext context)
    {
        _context = context;
    }

    public async Task<List<UserResponse>> GetAllAsync()
    {
        var users = await _context.Users
            .OrderBy(user => user.Name)
            .ToListAsync();

        return users.Select(user => new UserResponse
        {
            Id = user.Id,
            Name = user.Name
        }).ToList();
    }

    public async Task<UserResponse?> GetByIdAsync(int id)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(user => user.Id == id);

        if (user is null)
        {
            return null;
        }

        return new UserResponse
        {
            Id = user.Id,
            Name = user.Name
        };
    }

    public async Task<UserResponse> CreateAsync(
        CreateUserRequest request)
    {
        var user = new User
        {
            Name = request.Name
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new UserResponse
        {
            Id = user.Id,
            Name = user.Name
        };
    }
}