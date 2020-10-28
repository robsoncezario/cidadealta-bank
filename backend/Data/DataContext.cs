using Microsoft.EntityFrameworkCore;
using CidadeAlta.Models;

namespace CidadeAlta.Data 
{
  public class DataContext: DbContext
  {
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
      this.Database.EnsureCreated();
    }

    public DbSet<User> Users { get; set; }
    
    public DbSet<Deposit> Deposits { get; set; }

    public DbSet<Withdraw> Withdraws { get; set; }

    public DbSet<Transfer> Transfers { get; set; }
  }
}