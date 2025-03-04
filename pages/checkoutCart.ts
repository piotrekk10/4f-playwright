import { expect, Locator, Page } from "@playwright/test";
import { ProductDataType } from "../fixtures/data/products";

export class CheckoutCartPage {
  readonly page: Page;
  readonly cartProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartProduct = page.locator(`[class^='responsiveTable-borderBottom-']`);
  }

  async assertCheckoutCart({
    mobile,
    productData,
  }: {
    mobile: boolean;
    productData: ProductDataType[];
  }) {
    const productCounts = new Map<string, number>();

    for (const product of productData) {
      productCounts.set(
        product.name,
        (productCounts.get(product.name) || 0) + 1
      );
    }

    for (const [productName, count] of productCounts.entries()) {
      const product = productData.find((p) => p.name === productName)!;
      await this.assertCheckoutCartItems({ product, mobile, quantity: count });
    }

    const totalPriceValue = productData.reduce(
      (sum, item) => sum + item.price,
      0
    );
    const summaryAmount = this.page.locator(
      "[class^='summary-row-']:has-text('Wartość produktów') [class^='summary-amount-']"
    );
    const summaryAmountWithTax = this.page.locator(
      "[class^='summary-row-']:has-text('Razem z podatkiem') [class^='summary-amount-']"
    );

    await expect(summaryAmount).toBeVisible();
    await expect(summaryAmount).toHaveText(
      `${totalPriceValue.toString().replace(".", ",")} PLN`
    );
    await expect(summaryAmountWithTax).toBeVisible();
    await expect(summaryAmountWithTax).toHaveText(
      new RegExp(`${totalPriceValue.toString().replace(".", ",")}.PLN.*`)
    );
  }

  async assertCheckoutCartItems({
    product,
    mobile,
    quantity,
  }: {
    product: ProductDataType;
    mobile: boolean;
    quantity: number;
  }) {
    const item = this.page.locator(
      `${mobile ? "[class^='productListItem-root-']" : "tr"}:has-text("${
        product.name
      }")`
    );
    const name = item.locator("[classes^='product-productLink-']");
    const quantityInput = item.locator("input[class^='quantity-input-']");

    await expect(name).toBeVisible();
    await expect(name).toHaveText(product.name);
    await expect(name).toHaveAttribute("href", product.url);

    await expect(
      item.locator(
        `div[class*='product-price-']:has-text("${product.price
          .toString()
          .replace(".", ",")} PLN")`
      )
    ).toBeVisible();
    await expect(quantityInput).toBeVisible();
    await expect(quantityInput).toHaveAttribute("value", quantity.toString());

    await expect(
      item.locator(
        `div[class*='total-price-']:has-text("${(product.price * quantity)
          .toString()
          .replace(".", ",")} PLN")`
      )
    ).toBeVisible();
  }

  async clickIncreaseProductQuantity({
    product,
    mobile,
  }: {
    product: ProductDataType;
    mobile: boolean;
  }) {
    await this.page
      .locator(
        `${mobile ? "[class^='productListItem-root-']" : "tr"}:has-text("${
          product.name
        }") button[class*='quantity-plus-']`
      )
      .click();
  }

  async clickUpdateCart({
    product,
    mobile,
  }: {
    product: ProductDataType;
    mobile: boolean;
  }) {
    await this.page
      .locator(
        `${mobile ? "[class^='productListItem-root-']" : "tr"}:has-text("${
          product.name
        }") button[class*='quantity-confirmButton-']`
      )
      .click();
  }
}
