import {User} from './User';

export class Balance {
  public id?: number;
  public type?: number;
  public name?: string;
  public amount?: number;
  public target?: User;
}