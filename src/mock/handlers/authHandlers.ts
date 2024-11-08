import { http, HttpResponse } from "msw";
import { authenticate, networkDelay, AUTH_COOKIE } from "../utils";

export const authHandlers = [
  http.post("/login", async ({ request }) => {
    await networkDelay();
    const { username, password } = await request.json();

    try {
      const { user, jwt } = authenticate({ username, password });

      const response = HttpResponse.json(
        { user },
        {
          status: 200,
          headers: {
            "Set-Cookie": `${AUTH_COOKIE}=${jwt}; Path=/; HttpOnly; SameSite=Lax`,
          },
        },
      );

      return response;
    } catch (error) {
      return new HttpResponse("Invalid credentials", { status: 401 });
    }
  }),

  http.post("/logout", async ({ cookies }) => {
    await networkDelay();

    const response = new HttpResponse("Logged out", {
      status: 200,
      headers: {
        "Set-Cookie": `${AUTH_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      },
    });

    return response;
  }),
];
