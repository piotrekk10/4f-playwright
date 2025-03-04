import { CheckoutCartPage, LoginPage, ProductPage } from "../../pages";
import { GeoBottomPanel, MiniCart } from "../../pages/panels";
import { TREKKING_SHOES } from "../../fixtures/data/products";
import { test as _test } from "../../fixtures/beforeEach";

type TestProps = {
  checkoutCartPage: CheckoutCartPage;
  geoBottomPanel: GeoBottomPanel;
  loginPage: LoginPage;
  miniCartWithSingleItem: MiniCart;
  miniCartWithMultipleItems: MiniCart;
  productRunningShoes: ProductPage;
  productTrekkingShoes: ProductPage;
};
const test = _test.extend<TestProps>({
  checkoutCartPage: async ({ page }, use) => {
    const checkoutCartPage = new CheckoutCartPage(page);
    await use(checkoutCartPage);
  },
  geoBottomPanel: async ({ page }, use) => {
    const geoBottomPanel = new GeoBottomPanel(page);
    await use(geoBottomPanel);
  },
  miniCartWithSingleItem: async ({ page }, use) => {
    const miniCart = new MiniCart(page, [TREKKING_SHOES]);
    await use(miniCart);
  },
  productTrekkingShoes: async ({ page }, use) => {
    const product = new ProductPage(page, TREKKING_SHOES);
    await use(product);
  },
});

test.describe(`Not logged user`, () => {
  test(`should be able to add product to cart and verify if it shows up in minicart`, async ({
    geoBottomPanel,
    isMobile,
    miniCartWithSingleItem,
    productTrekkingShoes,
  }) => {
    await productTrekkingShoes.goto();
    if (isMobile) {
      await geoBottomPanel.assertGeoBottomPanel({ visible: true });
      await geoBottomPanel.closeButton.click();
      await geoBottomPanel.assertGeoBottomPanel({ visible: false });
    }
    await productTrekkingShoes.assertProductPage();
    await productTrekkingShoes.size.click();
    await productTrekkingShoes.addToCartButton.click();
    await miniCartWithSingleItem.assertToastMessage();
    await miniCartWithSingleItem.assertMiniCart();
  });
});

test(`should be able to add products to cart, go to checkout, increase quantity and verify it`, async ({
  checkoutCartPage,
  geoBottomPanel,
  isMobile,
  miniCartWithSingleItem,
  productTrekkingShoes,
}) => {
  await productTrekkingShoes.goto();
  await geoBottomPanel.assertGeoBottomPanel({ visible: true });
  await geoBottomPanel.closeButton.click();
  await geoBottomPanel.assertGeoBottomPanel({ visible: false });

  await productTrekkingShoes.assertProductPage();
  await productTrekkingShoes.size.click();
  await productTrekkingShoes.addToCartButton.click();
  await miniCartWithSingleItem.assertToastMessage();

  await miniCartWithSingleItem.assertMiniCart();
  await miniCartWithSingleItem.checkoutCartButton.click();
  await checkoutCartPage.assertCheckoutCart({
    mobile: isMobile,
    productData: [TREKKING_SHOES],
  });
  await checkoutCartPage.clickIncreaseProductQuantity({
    product: TREKKING_SHOES,
    mobile: isMobile,
  });
  await checkoutCartPage.clickUpdateCart({
    product: TREKKING_SHOES,
    mobile: isMobile,
  });
  await checkoutCartPage.assertCheckoutCart({
    mobile: isMobile,
    productData: [TREKKING_SHOES, TREKKING_SHOES],
  });
});
