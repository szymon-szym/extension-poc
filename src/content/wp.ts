import { LogsType, postAddsLogs } from "./postLogs";
import { replaceEl } from "./replaceEl";

export const clearWP = (document: Document) => {
    const selectorsToReplace = [
      "#app-content > div > div > div > div > div > a > div > div > img",
      "#app-content > div > div > div > div > div > a > div > div > div > img",
      "#app-content > div > div > div > div > div > a > div > div > div > div > img",
      "#app-content > div > div > div > div > div > a > div > div > div > div > div > img",
      "#app-content > div > div > div > div > div > div > a > div > div > img",
      "#glonews > div > div > div > div > div > div > a > div > div > div > div > div > img",
      "#glonews > div > div > div > div > div > div > a > div > div > div > div > img",
      "#glonews > div > div > div > div > div > div > a > div > div > div > img",
      "#glonews > div > div > div > div > div > div > a > div > div > img",
    ];
  
    selectorsToReplace.forEach((sel) => {
      let adImg = document.querySelectorAll(sel);
      if (adImg.length) {
        postAddsLogs(adImg.length, LogsType.INSERT);
      }
      adImg.forEach((x) => {
        console.log(`replacing divs on wp`);
        replaceEl(document, x);
      });
    });
  };
  