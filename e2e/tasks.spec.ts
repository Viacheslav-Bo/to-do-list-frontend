import { test, expect } from "@playwright/test";
import { registerNewUser, createTask } from "./helpers";

test.describe("Task CRUD", () => {
  // Each test registers its own fresh user, so tasks created in one test
  // never leak into another.
  test.beforeEach(async ({ page }) => {
    await registerNewUser(page);
  });

  test("creates a new task and it appears in the list", async ({ page }) => {
    const title = `Buy groceries ${Date.now()}`;
    await createTask(page, title);

    await expect(page.getByText(title)).toBeVisible();
  });

  test("marks a task as complete and it gets struck through", async ({
    page,
  }) => {
    const title = `Finish report ${Date.now()}`;
    await createTask(page, title);

    const taskRow = page.getByText(title).locator("..").locator("..");
    const checkbox = taskRow.getByRole("checkbox");
    await checkbox.click();

    // The title gets a line-through style when isCompleted is true.
    await expect(page.getByText(title)).toHaveCSS(
      "text-decoration-line",
      "line-through",
      { timeout: 10_000 },
    );
  });

  test("edits a task's title", async ({ page }) => {
    const originalTitle = `Old title ${Date.now()}`;
    const newTitle = `Updated title ${Date.now()}`;
    await createTask(page, originalTitle);

    // Open the task's edit modal (the "⋮" button) and change the title.
    const taskCard = page.locator("li", { hasText: originalTitle });
    await taskCard.getByRole("button", { name: /edit task/i }).click();

    const titleInput = page.getByPlaceholder("Title", { exact: true });
    await titleInput.fill(newTitle);
    await page.getByRole("button", { name: /^save$/i }).click();

    await expect(page.getByText(newTitle)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText(originalTitle)).not.toBeVisible();
  });

  test("deletes a task", async ({ page }) => {
    const title = `Task to delete ${Date.now()}`;
    await createTask(page, title);

    const taskCard = page.locator("li", { hasText: title });
    await taskCard.getByRole("button", { name: /edit task/i }).click();

    // First click: closes the edit modal and opens the delete-confirmation
    // modal (TaskItem does both in one handler).
    await page.getByRole("button", { name: /^delete$/i }).click();

    // Second click: confirms deletion inside that confirmation modal —
    // it's the only "Delete" button left on screen at this point.
    await page.getByRole("button", { name: /^delete$/i }).click();

    await expect(page.getByRole("heading", { name: title })).not.toBeVisible({
      timeout: 10_000,
    });
  });
});
