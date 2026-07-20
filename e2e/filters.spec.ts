import { test, expect } from "@playwright/test";
import { registerNewUser, createTask } from "./helpers";

test.describe("Search, filter and sort", () => {
  test.beforeEach(async ({ page }) => {
    await registerNewUser(page);
    await createTask(page, "Apple picking trip");
    await createTask(page, "Banana bread recipe");
  });

  test("search narrows the list down to matching titles only", async ({
    page,
  }) => {
    await page.getByPlaceholder(/search by title/i).fill("Apple");

    await expect(page.getByText("Apple picking trip")).toBeVisible();
    await expect(page.getByText("Banana bread recipe")).not.toBeVisible({
      timeout: 10_000,
    });
  });

  test("reset button clears the search filter", async ({ page }) => {
    await page.getByPlaceholder(/search by title/i).fill("Apple");
    await expect(page.getByText("Banana bread recipe")).not.toBeVisible();

    await page.getByTitle(/reset all filters/i).click();

    await expect(page.getByText("Apple picking trip")).toBeVisible();
    await expect(page.getByText("Banana bread recipe")).toBeVisible();
  });

  test("marking a task complete moves it into the Completed view", async ({
    page,
  }) => {
    const taskRow = page.locator("li", { hasText: "Apple picking trip" });
    await taskRow.getByRole("checkbox").click();

    await page.getByRole("button", { name: /completed/i }).click();

    await expect(page.getByText("Apple picking trip")).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText("Banana bread recipe")).not.toBeVisible();
  });
});
