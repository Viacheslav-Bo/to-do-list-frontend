import { Page, expect } from "@playwright/test";

/**
 * Registers a brand-new account with a unique email (timestamp + random
 * suffix), so every test run works with a clean user and doesn't collide
 * with data from previous runs. Leaves the browser logged in and on /tasks.
 */
export async function registerNewUser(page: Page) {
  const unique = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const email = `e2e-${unique}@example.com`;
  const password = "password123";
  const name = `E2E Tester ${unique}`;

  await page.goto("/auth/register");
  await page.getByLabel("Name").fill(name);
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password", { exact: true }).fill(password);
  await page.getByRole("button", { name: /register|sign up/i }).click();

  await expect(page).toHaveURL(/\/tasks/, { timeout: 15_000 });

  return { email, password, name };
}

/** Creates a task via the "+ New task" modal, using only the required title field. */
export async function createTask(page: Page, title: string) {
  await page.getByRole("button", { name: /new task/i }).click();
  await page.getByPlaceholder(/task title/i).fill(title);
  await page.getByRole("button", { name: /add task/i }).click();
  await expect(page.getByText(title)).toBeVisible({ timeout: 10_000 });
}
