import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginPage: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = page.locator("[class^='loginPage-login-']");
    this.emailInput = this.loginPage.locator(
      "span[class^='fieldIcons-input-']>input[name*='email']"
    );
    this.passwordInput = this.loginPage.locator(
      "span[class^='fieldIcons-input-']>input[name*='password']"
    );
    this.signInButton = this.loginPage.locator("button:has-text('Zaloguj')");
  }

  async assertLoginPage({ mobile }: { mobile: boolean }) {
    await expect(this.loginPage).toBeVisible();
    if (mobile) {
      await this.loginPage.locator("button").click();
    }
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }
}
