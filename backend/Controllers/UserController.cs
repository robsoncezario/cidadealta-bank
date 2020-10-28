using System;
using static System.Math;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using CidadeAlta.Models;
using CidadeAlta.Data;
using CidadeAlta.ViewModels;
using CidadeAlta.MinModels;

namespace CidadeAlta.Controllers 
{
  [ApiController]
  [Route("fivem")]
  public class UserController: ControllerBase 
  {
    [HttpGet]
    [Route("users/{id:int}")]
    public async Task<ActionResult<User>> Get(
        [FromServices] DataContext context, int id)
    {
        var user = await context.Users
        .AsNoTracking()
        .FirstOrDefaultAsync(u => u.Id == id);

        return user;
    }

    [HttpPost("users/withdraw")]
    [AllowAnonymous]
    public async Task<ActionResult<User>> Post(
      [FromServices] DataContext context, 
      [FromBody] WithdrawViewModel data)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }
          
      var user = await context.Users
          .AsNoTracking()
          .FirstOrDefaultAsync(u => u.Id == data.Id);

      if(user == null || 
        user.BankMoney < data.Amount || 
        data.Amount < 1)
      {
        return BadRequest();
      }

      user.BankMoney -= data.Amount;
      user.Money += data.Amount;
      context.Users.Update(user);

      var withdraw = new Withdraw 
      {
        Amount = data.Amount,
        UserId = data.Id
      };

      context.Withdraws.Add(withdraw);
      await context.SaveChangesAsync();

      return Ok(user); 
    }

    [HttpPost("users/deposit")]
    [AllowAnonymous]
    public async Task<ActionResult<User>> Post(
      [FromServices] DataContext context, 
      [FromBody] DepositViewModel data)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }
          
      var user = await context.Users
          .AsNoTracking()
          .FirstOrDefaultAsync(u => u.Id == data.Id);

      if(user == null || 
        user.Money < data.Amount || 
        data.Amount < 1)
      {
        return BadRequest();
      }

      user.Money -= data.Amount;
      user.BankMoney += data.Amount;
      context.Users.Update(user);

      var deposit = new Deposit
      {
        Amount = data.Amount,
        UserId = data.Id
      };

      context.Deposits.Add(deposit);
      await context.SaveChangesAsync();

      return Ok(user); 
    }

    [HttpPost("users/transfer")]
    [AllowAnonymous]
    public async Task<ActionResult<User>> Post(
      [FromServices] DataContext context, 
      [FromBody] TransferViewModel data)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }
          
      var user = await context.Users
          .AsNoTracking()
          .FirstOrDefaultAsync(u => u.Id == data.Id);

      var target = await context.Users
          .AsNoTracking()
          .FirstOrDefaultAsync(u => u.Id == data.TargetId);

      if(user == null || 
          target == null ||
          user.BankMoney < data.Amount || 
          data.Amount < 1)
      {
        return BadRequest();
      }

      target.BankMoney += data.Amount;
      user.BankMoney -= data.Amount;

      context.Users.Update(user);
      context.Users.Update(target);

      var transfer = new Transfer
      {
        Amount = data.Amount,
        SenderId = data.Id,
        UserId = data.TargetId
      };

      context.Transfers.Add(transfer);
      await context.SaveChangesAsync();

      return Ok(user); 
    }

    [HttpPost("users/balance")]
    [AllowAnonymous]
    public async Task<ActionResult<Pagination>> Post(
      [FromServices] DataContext context, 
      [FromBody] BalanceView data)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }
          
      DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0);

      var user = await context.Users
          .FirstOrDefaultAsync(u => u.Id == data.Id); 
      int pageSize = Math.Min(100, data.PageSize);
      int skip = data.CurrentPage * pageSize;

      var theList = new List<BalanceMin>();

      if(data.StartAt is int) {
        DateTime startDate = origin.AddSeconds((int)data.StartAt);
        DateTime endDate = origin.AddSeconds((int)data.EndAt);

        theList = context.Deposits  
          .Where(d => d.UserId == user.Id && d.CreatedAt >= startDate && d.CreatedAt <= endDate)
          .Select(d => new BalanceMin
          {
            Id = d.Id,
            Type = 1,
            Amount = d.Amount,
            Target = (User)null,
            CreatedAt = d.CreatedAt
          })
          .ToList()
          .Union(context.Withdraws
            .Where(w => w.UserId == user.Id && w.CreatedAt >= startDate && w.CreatedAt <= endDate)
            .Select(w => new BalanceMin
            {
                Id = w.Id,
                Type = 2,
                Amount = w.Amount,
                Target = (User)null,
                CreatedAt = w.CreatedAt,
            })
          )
          .ToList()
          .Union(context.Transfers
            .Where(t => (t.UserId == user.Id || t.SenderId == user.Id) && t.CreatedAt >= startDate && t.CreatedAt <= endDate)
            .Include(t => t.User)
            .Include(t => t.Sender)
            .Select(t => new BalanceMin
            {
                Id = t.Id,
                Type = t.SenderId == user.Id ? 3 : 4,
                Amount = t.Amount,
                Target = t.SenderId == user.Id ? (t.User) : t.Sender,
                CreatedAt = t.CreatedAt
            })
          ).ToList();
      } else {
        theList = context.Deposits  
          .Where(d => d.UserId == user.Id)
          .Select(d => new BalanceMin
          {
            Id = d.Id,
            Type = 1,
            Amount = d.Amount,
            Target = (User)null,
            CreatedAt = d.CreatedAt
          })
          .ToList()
          .Union(context.Withdraws
            .Where(w => w.UserId == user.Id)
            .Select(w => new BalanceMin
            {
                Id = w.Id,
                Type = 2,
                Amount = w.Amount,
                Target = (User)null,
                CreatedAt = w.CreatedAt
            })
          )
          .ToList()
          .Union(context.Transfers
            .Where(t => (t.UserId == user.Id || t.SenderId == user.Id))
            .Include(t => t.User)
            .Include(t => t.Sender)
            .Select(t => new BalanceMin
            {
                Id = t.Id,
                Type = t.SenderId == user.Id ? 3 : 4,
                Amount = t.Amount,
                Target = t.SenderId == user.Id ? (t.User) : t.Sender,
                CreatedAt = t.CreatedAt
            })
          )
          .ToList();
      }

      var count = theList.Count();
      var pagination = new Pagination
      {
        CurrentPage = data.CurrentPage,
        TotalItems = count,
        TotalPages = Math.Max(1, count / pageSize),
        PageSize = pageSize,
        ItemList = theList
          .OrderByDescending(d => d.CreatedAt)
          .Skip(skip)
          .Take((pageSize + skip) > count ? ((pageSize + skip) - count) : pageSize)
          .ToList()
      }; 

      return Ok(pagination);
    }
  }
}