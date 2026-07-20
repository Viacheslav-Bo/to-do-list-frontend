import { test, expect } from "@playwright/test";
import { registerNewUser } from "./helpers";

test.describe("Authentication", () => {
  test("register redirects to /tasks and shows an empty task list", async ({
    page,
  }) => {
    await registerNewUser(page);

    await expect(page).toHaveURL(/\/tasks/);
    await expect(
      page.getByRole("heading", { name: /all tasks/i }),
    ).toBeVisible();
  });

  test("logout redirects to the home page and blocks access to /tasks", async ({
    page,
  }) => {
    await registerNewUser(page);

    // Logout button lives inside MiniProfile — open the burger menu on
    // mobile viewports, or the sidebar directly on desktop.
    await page.getByRole("button", { name: /log out/i }).click();

    await expect(page).toHaveURL("/", { timeout: 10_000 });

    // A logged-out user navigating straight to /tasks should be bounced
    // back to the login page by the client-side RequireAuth guard.
    await page.goto("/tasks");
    await expect(page).toHaveURL(/\/auth\/login/, { timeout: 10_000 });
  });

  test("login with a freshly registered account works", async ({ page }) => {
    const { email, password } = await registerNewUser(page);

    await page.getByRole("button", { name: /log out/i }).click();
    await expect(page).toHaveURL("/");

    await page.goto("/auth/login");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill(password);
    await page.getByRole("button", { name: /log in/i }).click();

    await expect(page).toHaveURL(/\/tasks/, { timeout: 15_000 });
  });

  test("login shows an inline error for wrong credentials", async ({
    page,
  }) => {
    await page.goto("/auth/login");
    await page.getByLabel("Email").fill("nobody@example.com");
    await page.getByLabel("Password", { exact: true }).fill("wrongpassword");
    await page.getByRole("button", { name: /log in/i }).click();

    await expect(page.getByText(/invalid credentials/i)).toBeVisible({
      timeout: 10_000,
    });
    // Should NOT navigate away from the login page on failure.
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
