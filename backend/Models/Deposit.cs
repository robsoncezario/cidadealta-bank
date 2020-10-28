using System;
using System.ComponentModel.DataAnnotations;

namespace CidadeAlta.Models
{
    public class Deposit
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Amount { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}