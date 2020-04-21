import { Context } from 'koa';
import { createMockContext } from '@shopify/jest-koa-mocks';
import LoginController from 'src/controllers/login';
import loginSchema from 'tests/schemas/login';
import loginServiceMock from 'tests/mocks/services/login';
import errorSchema from 'tests/schemas/error';

describe('login controller', (): void => {
  let spy: jest.SpyInstance;

  afterAll((): void => {
    spy.mockRestore();
  });

  it('should set ctx.body with login information', async (): Promise<void> => {
    spy = loginServiceMock.getSpy();

    const loginController: LoginController = new LoginController();
    const ctx: Context = createMockContext();

    ctx.request.body = {
      username: 'john.doe',
      password: 'secretpassword',
    };

    await loginController.login(ctx);

    expect(ctx.body).toMatchObject(loginSchema);
    expect(ctx.body.username).toEqual(ctx.request.body.username);
  });

  it('should set ctx.body with an error object and ctx.status with a 404 code when credentials are invalid', async (): Promise<
    void
  > => {
    spy = loginServiceMock.getSpy({ simulateUserNotFound: true });

    const loginController: LoginController = new LoginController();
    const ctx: Context = createMockContext();

    ctx.request.body = {
      username: 'john.doe',
      password: 'secretpassword',
    };

    await loginController.login(ctx);

    expect(ctx.status).toEqual(404);
    expect(ctx.body).toMatchObject(errorSchema);
  });
});