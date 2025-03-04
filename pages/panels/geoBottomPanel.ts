import { Locator, Page, expect } from "@playwright/test";

export class GeoBottomPanel {
  readonly geoBottomPanel: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.geoBottomPanel = page.locator("[class^='betterMaskFit-root-']");
    this.closeButton = this.geoBottomPanel = page.locator(
      "[class^='betterMaskFit-closeButton-']"
    );
  }

  async assertGeoBottomPanel({ visible }: { visible: boolean }) {
    if (visible) {
      await expect(this.geoBottomPanel).toBeVisible();
      await expect(this.closeButton).toBeVisible();
    } else {
      await expect(this.geoBottomPanel).not.toBeVisible();
    }
  }
}
