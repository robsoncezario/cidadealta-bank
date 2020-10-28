using System;
using System.ComponentModel.DataAnnotations;
using CidadeAlta.Models;

namespace CidadeAlta.MinModels
{
    public class BalanceMin
    {
         [Key]
        public int Id { get; set; }

        public int Type { get; set; }

        [Required]
        public int Amount { get; set; }

        public User? Target { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}