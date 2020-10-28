using System;
using System.ComponentModel.DataAnnotations;

namespace CidadeAlta.ViewModels
{
    public class WithdrawViewModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int Amount { get; set; }
    }
}