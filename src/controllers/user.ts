import { Context } from 'koa';
import UserService from 'src/services/user';
import User from 'src/models/user';

export default class UserController {
  userService: UserService = new UserService();

  constructor() {
    this.login = this.login.bind(this);
    this.getUserById = this.getUserById.bind(this);
  }

  async login(ctx: Context): Promise<void> {
    const { username, password } = ctx.request.body;

    ctx.body = await this.userService.login(username, password);
  }

  async getUserById(ctx: Context): Promise<void> {
    const { id } = ctx.params;
    const user: User = await this.userService.findById(id);

    if (!user) {
      ctx.throw(404, `Could not found user with id ${id}`);
    }

    ctx.body = user;
  }
}
