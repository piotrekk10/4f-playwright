import { expect, Locator, Page } from "@playwright/test";
import { ProductDataType } from "../fixtures/data/products";

export class ProductPage {
  readonly page: Page;
  readonly productData: ProductDataType;
  readonly size: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page, productData: ProductDataType) {
    this.page = page;
    this.productData = productData;
    this.size = this.page.locator(
      `[class^='tile-root-']:has-text('${this.productData.size}')`
    );
    this.addToCartButton = page.locator(
      "[class^='addToCartActions-buttonContainer-']"
    );
  }

  async goto() {
    await this.page.goto(this.productData.url);
  }

  async assertProductPage() {
    const name = this.page.locator("[class^='productName-root-']");
    const price = this.page.locator(
      "[class^='productFullPrice-normalPrice-']>span"
    );
    const size = this.page.locator(
      `[class^='tile-root-']:has-text('${this.productData.size}')`
    );
    await expect(name).toBeVisible();
    await expect(name).toHaveText(this.productData.name);
    await expect(price).toBeVisible();
    await expect(price).toHaveText(
      `${this.productData.price.toString().replace(".", ",")} PLN`
    );
    await expect(size).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toHaveText("Dodaj do koszyka");
  }
}
