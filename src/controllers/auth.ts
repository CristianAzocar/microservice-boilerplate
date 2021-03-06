import { Context } from 'koa';
import AuthService from 'src/services/auth';

export default class AuthController {
  private authService: AuthService = new AuthService();

  constructor() {
    this.login = this.login.bind(this);
  }

  async login(ctx: Context): Promise<void> {
    const { username, password } = ctx.request.body;

    ctx.body = await this.authService.login(username, password);
  }
}
