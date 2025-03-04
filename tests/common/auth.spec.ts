import { CustomerAccountPage } from "../../pages/customerAccount";
import { LoginPage, MainPage } from "../../pages";
import { BottomNavBar, GeoBottomPanel, Header } from "../../pages/panels";
import { USERS } from "../../fixtures/data/user";
import { test as _test } from "../../fixtures/beforeEach";

type TestProps = {
  bottomNavBar: BottomNavBar;
  customerAccountPage: CustomerAccountPage;
  geoBottomPanel: GeoBottomPanel;
  header: Header;
  loginPage: LoginPage;
  mainPage: MainPage;
};
const test = _test.extend<TestProps>({
  bottomNavBar: async ({ page }, use) => {
    const bottomNavBar = new BottomNavBar(page);
    await use(bottomNavBar);
  },
  customerAccountPage: async ({ page }, use) => {
    const customerAccountPage = new CustomerAccountPage(page);
    await use(customerAccountPage);
  },
  geoBottomPanel: async ({ page }, use) => {
    const geoBottomPanel = new GeoBottomPanel(page);
    await use(geoBottomPanel);
  },
  header: async ({ page }, use) => {
    const header = new Header(page);
    await use(header);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  mainPage: async ({ page }, use) => {
    const mainPage = new MainPage(page);
    await use(mainPage);
  },
});

USERS.forEach((user) => {
  test(`It should login as ${user.login} and check if got redirected to account page`, async ({
    bottomNavBar,
    customerAccountPage,
    geoBottomPanel,
    header,
    isMobile,
    loginPage,
    mainPage,
  }) => {
    await mainPage.goto();
    await header.assertAccountTrigger({ mobile: isMobile });
    if (isMobile) {
      await geoBottomPanel.assertGeoBottomPanel({ visible: true });
      await geoBottomPanel.closeButton.click();
      await geoBottomPanel.assertGeoBottomPanel({ visible: false });
      await bottomNavBar.assertBottomNavBar();
      await bottomNavBar.accountTrigger.click();
    } else {
      await header.accountTrigger.click();
    }
    await loginPage.assertLoginPage({ mobile: isMobile });
    await loginPage.emailInput.fill(user.login);
    await loginPage.passwordInput.fill(user.password);
    await loginPage.signInButton.click();
    await customerAccountPage.assertCustomerAccountDetails({
      login: user.login,
      name: user.name,
    });
  });
});
