import { replaceEl } from "./replaceEl";

export const initialReplacements = (fullBlockList: string[], document: Document) => {
  // iframes are being added dynamically,
  // so it does not make sense to replace them on document load

  // in general we can't hijack all iframes, because it would block pages functionalities
  // but on some pages there are no usefull functionalities, so we can use all iframes there

  const isFullBlocked =
    fullBlockList.filter((x) => window.location.toString().includes(x)).length >
    0;
  //block iframes
  if (isFullBlocked) {
    // const allIframes = document.querySelectorAll("iframe");
    replaceBySelector("iframe", document);
  } else {
    // const googleAds = document.querySelectorAll("iframe[id*='google_ads']");
    replaceBySelector("iframe[id*='google_ads']", document);

    // const otherAds = document.querySelectorAll("iframe[src*='ads']");
    replaceBySelector("iframe[src*='ads']", document);

    // const otherAdsCase = document.querySelectorAll("iframe[src*='Ads']");
    replaceBySelector("iframe[src*='Ads']", document);
  }
  //block divs
  
  //   const googleAdsDiv = document.querySelectorAll("div[id*='google_ads']");
  replaceBySelector("div[id*='google_ads']", document);

  const tvnAdsDiv = document.querySelectorAll("div[class*='tvn-adv']");
  replaceBySelector("div[class*='tvn-adv']", document);
};

export const replaceBySelector = (
  selector: string,
  document: Document
): void => {
  const ads = document.querySelectorAll(selector);
  console.log(
    `[content] found adds for selector [${selector}]:  ${ads.length}`
  );
  ads.forEach((x) => {
    replaceEl(document, x);
  });
};
