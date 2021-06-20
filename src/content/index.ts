/* eslint-disable */
import { initialReplacements } from "./initialReplacements";
import { mutationReplacementsBuilder } from "./mutationReplacements";



console.log("[content] content script running");

const fullBlockList = ["onet.pl", "wp.pl", "o2.pl"];

const doc = document

initialReplacements(fullBlockList, doc);

/// ***** OBSERVER *****
// for observer
const iframesIdsToReplace = ["google_ads_"];
const divsIdsToReplace = ["adsense", "ad_unit"];
const iframesSrcToReplace = ["ads", "Ads", "ad", "adv"];
// const iframeToLeave = ["/riemann.pl/adserver"]

let isFullBlocked = false;
fullBlockList.forEach((x) => {
  if (window.location.toString().includes(x)) {
    console.log(`full block mode`);
    isFullBlocked = true;
  }
});

export const observer = new MutationObserver(
  mutationReplacementsBuilder(
    iframesIdsToReplace,
    divsIdsToReplace,
    iframesSrcToReplace,
    fullBlockList
  )
);

// naive state implementation
// turn on blocking
// turn off blocking

let initialReplacementsFlags = true;

const startReplacing = () => {
  // turn on observer

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  });
  // turn on initial load replacements
  initialReplacementsFlags = true;
};

const stopReplacing = () => {
  // turn off observer
  observer.disconnect();
  // turn off initial load replacements
  initialReplacementsFlags = false;
};

// handle messages from popup
chrome.runtime.onMessage.addListener(function(request: any) {
  switch (request.message) {
    case "stop":
      console.log(`[content] stop`);
      stopReplacing();
      break;
    case "good":
      console.log(`[content] good`);
      startReplacing();
      initialReplacements(fullBlockList, doc);
      break;
    case "money":
      console.log(`[content] money`);
      startReplacing();
      initialReplacements(fullBlockList, doc);
      break;
    case "block":
      console.log(`[content] block`);
      startReplacing();
      initialReplacements(fullBlockList, doc);
      break;
    default:
      console.log(`[content] not button msg`);
  }
});

// initialize: read state from store and then decide if block
chrome.storage.local.get(["catblocker"], function(result) {
  let currState = result.catblocker === undefined ? "money" : result.catblocker;
  console.log(`[content] at init current state is ${currState}`);
  if (currState === "money" || currState === "good" || currState === "block") {
    console.log(`[content] blocking adds on start`);
    initialReplacements(fullBlockList, doc);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  } else {
    console.log(`[content] blocking adds on start STOPPED`);
  }
});
