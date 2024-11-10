import { http, HttpResponse } from 'msw';
import { authenticate, networkDelay, AUTH_COOKIE, requireAuth } from '../utils';

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    await networkDelay();
    interface LoginRequestBody {
      username: string;
      password: string;
    }

    const { username, password } = (await request.json()) as LoginRequestBody;

    try {
      const { user, jwt } = authenticate({ username, password });

      const response = HttpResponse.json(
        { user },
        {
          status: 200,
          headers: {
            'Set-Cookie': `${AUTH_COOKIE}=${jwt}; Path=/; HttpOnly; SameSite=Lax`,
          },
        },
      );

      return response;
    } catch (error) {
      return new HttpResponse('Invalid credentials', { status: 401 });
    }
  }),

  http.post('/auth/logout', async ({ cookies }) => {
    await networkDelay();

    const response = new HttpResponse('Logged out', {
      status: 200,
      headers: {
        'Set-Cookie': `${AUTH_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      },
    });

    return response;
  }),

  http.get(`/auth/me`, async ({ cookies }) => {
    await networkDelay();

    try {
      const { user } = requireAuth(cookies);
      return HttpResponse.json({ data: user });
    } catch (error: any) {
      return HttpResponse.json({ message: error?.message || 'Server Error' }, { status: 500 });
    }
  }),
];
