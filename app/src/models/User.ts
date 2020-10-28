export class User {
  public id?: number;
  public name?: string;
  public money?: number;
  public bankMoney?: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(
    id?: number,
    name?: string,
    money?: number,
    bankMoney?: number,
    createdAt?: Date | string,
    updatedAt?: Date | string
  ) {
    this.id = id;
    this.name = name;
    this.money = money;
    this.bankMoney = bankMoney;
    this.createdAt = Object.prototype.toString.call(createdAt) === '[object String]' ? new Date(createdAt as string) : createdAt as Date;
    this.updatedAt = Object.prototype.toString.call(updatedAt) === '[object String]' ? new Date(updatedAt as string) : updatedAt as Date;
  }

  toJson() {
    return {
      id : this.id,
      name : this.name,
      money : this.money,
      bankMoney : this.bankMoney,
      createdAt : this.createdAt?.toISOString(),
      updatedAt : this.updatedAt?.toISOString()
    }
  }

  static fromJson(data: any) : Object {
    return new User(
      data.id,
      data.name,
      data.money,
      data.bankMoney,
      data.createdAt,
      data.updatedAt
    )
  }
}