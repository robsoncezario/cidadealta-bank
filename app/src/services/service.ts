import { DateRange } from "@material-ui/pickers/src/DateRangePicker/RangeTypes";

export class BankService {
  static getDetails = async (userId: number) => {
    const response = await fetch(`http://localhost:5000/fivem/users/${userId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    });

    const result = await response.json();

    return result;
  }

  static deposit = async (userId: number, amount: number) => {
    const response = await fetch('http://localhost:5000/fivem/users/deposit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        Id: userId,
        Amount: amount
      })
    });

    const result = await response.json();
    return result;
  }

  static withdraw = async (userId: number, amount: number) => {
    const response = await fetch('http://localhost:5000/fivem/users/withdraw', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        Id: userId,
        Amount: amount
      })
    });

    const result = await response.json();
    return result;
  }

  static transfer = async (userId: number, targetId: number, amount: number) => {
    const response = await fetch('http://localhost:5000/fivem/users/transfer', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        Id: userId,
        TargetId: targetId,
        Amount: amount
      })
    });

    const result = await response.json();
    return result;
  }

  static getBalance = async (userId: number, page: number, pageSize: number = 10, selectedDate?: DateRange) => {
    const startAt = selectedDate && selectedDate[0] && Math.floor(selectedDate[0]!.getTime() / 1000);
    const endAt = selectedDate && selectedDate[1] && Math.floor(selectedDate[1]!.getTime() / 1000);

    const response = await fetch('http://localhost:5000/fivem/users/balance', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        Id: userId,
        CurrentPage: page,
        PageSize: pageSize,
        StartAt: startAt,
        EndAt: endAt
      })
    });
    const result = await response.json();

    return result;
  }
}