import { Locator, Page, expect } from "@playwright/test";
import { REGEXPS } from "../../fixtures/data/regexps";

export class Header {
  readonly header: Locator;
  readonly accountTrigger: Locator;

  constructor(page: Page) {
    this.header = page.locator("#header-main");
    this.accountTrigger = this.header.locator(
      "[class^='accountTrigger-root-']>a"
    );
  }

  async assertAccountTrigger({ mobile }: { mobile: boolean }) {
    if (mobile) {
      await expect(this.accountTrigger).not.toBeVisible();
    } else {
      await expect(this.accountTrigger).toBeVisible();
      await expect(this.accountTrigger).toHaveAttribute(
        "href",
        REGEXPS.WEB_LOGIN_PAGE
      );
    }
  }
}
