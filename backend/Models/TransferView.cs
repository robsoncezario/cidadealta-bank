using System;
using System.ComponentModel.DataAnnotations;

namespace CidadeAlta.ViewModels
{
    public class TransferViewModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public int TargetId { get; set; }

        [Required]
        public int Amount { get; set; }
    }
}