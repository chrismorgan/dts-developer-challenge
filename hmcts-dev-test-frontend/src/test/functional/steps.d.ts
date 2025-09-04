/// <reference types='codeceptjs' />

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
  }
  interface Methods extends Playwright {}
  interface I extends WithTranslation<Methods> {
    amOnPage(url: string): void;
    waitInUrl(url: string): void;
    waitForText(text: string): void;
  }
  namespace Translation {
    interface Actions {}
  }
}