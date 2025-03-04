import { Locator, Page, expect } from "@playwright/test";
import { ProductDataType } from "../../fixtures/data/products";
import { REGEXPS } from "../../fixtures/data/regexps";

export class MiniCart {
  readonly productData: ProductDataType[];
  readonly miniCart: Locator;
  readonly toastMessage: Locator;
  readonly headerTitle: Locator;
  readonly miniCartProduct: Locator;
  readonly footer: Locator;
  readonly checkoutCartButton: Locator;

  constructor(page: Page, productData: ProductDataType[]) {
    this.productData = productData;
    this.miniCart = page.locator("[class^='miniCart-root_']");
    this.toastMessage = page.locator("[class^='miniCart-miniCartMessage-']");
    this.headerTitle = this.miniCart.locator(
      "[class^='miniCart-headerTitle-']"
    );
    this.miniCartProduct = this.miniCart.locator(`[class^='item-root-']`);
    this.footer = this.miniCart.locator(`[class^='miniCart-footer-']`);
    this.checkoutCartButton = this.footer.locator("a");
  }

  async assertMiniCart() {
    const totalPrice = this.footer.locator("[class^='miniCart-priceValue-']");
    const totalPriceValue = this.productData.reduce(
      (sum, item) => sum + item.price,
      0
    );
    await expect(this.miniCart).toBeVisible();
    await expect(this.headerTitle).toBeVisible();
    await expect(this.headerTitle).toHaveText(/Zawartość koszyka \(\d{1,3}\)/);

    await expect(totalPrice).toBeVisible();
    await expect(totalPrice).toHaveText(
      `${totalPriceValue.toString().replace(".", ",")} PLN`
    );
    await expect(this.checkoutCartButton).toBeVisible();
    await expect(this.checkoutCartButton).toHaveText("Pokaż koszyk");
    await expect(this.checkoutCartButton).toHaveAttribute(
      "href",
      REGEXPS.WEB_CHECKOUT_CART
    );
    for (const product of this.productData) {
      await this.assertMiniCartItems(product);
    }
  }

  async assertMiniCartItems(product: ProductDataType) {
    const item = this.miniCartProduct.locator(
      `div:has-text("${product.name}")`
    );
    const name = item.locator(
      `[class^='item-name-']:has-text("${product.name}")`
    );
    const quantity = item.locator("[class^='item-quantity-']");
    await expect(name).toBeVisible();
    await expect(name).toHaveAttribute("href", product.url);
    await expect(
      item.locator(`[class^='item-options-']:has-text("${product.size}")`)
    ).toBeVisible();
    await expect(quantity).toBeVisible();
    await expect(quantity).toHaveText(/Razem: \d{1,3}/);
    await expect(
      item.locator(
        `[class^='item-price-']:has-text("${product.price
          .toString()
          .replace(".", ",")} PLN")`
      )
    ).toBeVisible();
  }

  async assertToastMessage() {
    await expect(this.toastMessage).toBeVisible();
    await expect(this.toastMessage).toHaveText("Dodano do koszyka");
    await expect(this.toastMessage).not.toBeVisible();
  }
}
