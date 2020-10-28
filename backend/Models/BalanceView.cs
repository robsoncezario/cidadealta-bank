using System;
using System.ComponentModel.DataAnnotations;

namespace CidadeAlta.ViewModels
{
    public class BalanceView
    {
        [Required]
        public int Id { get; set; }

        public int? StartAt { get; set; }

        public int? EndAt { get; set; }

        [Required]
        public int CurrentPage { get; set; }

        public int PageSize { get; set; }
    }
}