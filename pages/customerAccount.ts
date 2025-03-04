import { expect, Locator, Page } from "@playwright/test";

export class CustomerAccountPage {
  readonly page: Page;
  readonly customerAccountDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.customerAccountDetails = page.locator(
      "section[class^='account-root-']"
    );
  }

  async assertCustomerAccountDetails({
    login,
    name,
  }: {
    login: string;
    name: string;
  }) {
    const title = this.customerAccountDetails.locator(
      "[class^='pageHeading-root-']"
    );
    const accountDetails = this.customerAccountDetails.locator(
      "div[data-cux-exclude]"
    );
    await expect(title).toBeVisible();
    await expect(title).toHaveText("Dane konta:");
    await expect(
      accountDetails.locator(`div:has-text("${login}")`)
    ).toBeVisible();
    await expect(
      accountDetails.locator(`div:has-text("${name}")`)
    ).toBeVisible();
  }
}
