using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using CidadeAlta.MinModels;

namespace CidadeAlta.Models
{
    public class Pagination
    {
        public int CurrentPage { get; set; }

        public int PageSize { get; set; }

        public int TotalPages { get; set; }

        public int TotalItems { get; set; }

        public List<BalanceMin> ItemList { get; set; }
    }
}
