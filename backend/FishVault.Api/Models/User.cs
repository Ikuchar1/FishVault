namespace FishVault.Api.Models;

using System.ComponentModel.DataAnnotations;
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public List<Catch> Catches { get; set; } = new();

        
    }
