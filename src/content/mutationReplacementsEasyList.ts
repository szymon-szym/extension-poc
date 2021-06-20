import { postAddsLogs, LogsType } from "./postLogs";
import { replaceEl } from "./replaceEl";
import { clearWP } from "./wp";

export const mutationReplacementsBuilder = (
  iframesIdsToReplace: string[],
  divsIdsToReplace: string[],
  iframesSrcToReplace: string[],
  fullBlockList: string[]
) => {
  return (mutations: MutationRecord[]): void => {
    const isFullBlocked =
      fullBlockList.filter((x) => window.location.toString().includes(x))
        .length > 0;
    mutations.forEach((mutation) => {
      if (mutation.addedNodes) {
        if (window.location.toString().includes("google.com")) {
          return;
        } else {
        }
        if (window.location.toString().includes("wp.pl")) {
          clearWP(document);
        } else {
        }
        mutation.addedNodes.forEach((currNode) => {
          const node = currNode;

          if (node.nodeName === "IFRAME") {
            if (isFullBlocked) {
              console.log("[content] blocking all iframes");
              if ((node as Element).clientHeight == 0) {
                console.log(`removing 0 px height iframes`);
                (node as Element).remove();
              }
              replaceEl(document, node as Element, "red");

              postAddsLogs(1, LogsType.INSERT);
              return;
            } else {
            }
            // regular flow
            iframesIdsToReplace.forEach((x) => {
              if ((node as HTMLIFrameElement).id.includes(x)) {
                console.log(
                  `[content] iframe to replace by id ${(node as HTMLIFrameElement).id}`
                );
                replaceEl(document, node as HTMLIFrameElement, "green");

                postAddsLogs(1, LogsType.INSERT);
                return;
              }
            });
            iframesSrcToReplace.forEach((x) => {
              if (
                (node as HTMLIFrameElement).src.includes(x) &&
                !(node as HTMLIFrameElement).src.includes(
                  "/riemann.pl/adserver"
                )
              ) {
                console.log(
                  `[content] iframe to replace by src ${(node as HTMLIFrameElement).src}`
                );
                replaceEl(document, node as HTMLIFrameElement, "green");
                postAddsLogs(1, LogsType.INSERT);
                return;
              }
            });

            // refresh tvn blocker
            const tvnAdsDiv = document.querySelectorAll(
              "div[class*='tvn-adv']"
            );
            console.log(`[content] tvn adds in divs found ${tvnAdsDiv.length}`);
            if (tvnAdsDiv.length) {
              postAddsLogs(tvnAdsDiv.length, LogsType.INSERT);
            }
            tvnAdsDiv.forEach((x) => {
              replaceEl(document, x);
            });
          } else if (node.nodeName === "DIV") {
            divsIdsToReplace.forEach((classToBeChecked) => {
              if (
                (node as HTMLDivElement).className.includes(classToBeChecked)
              ) {
                console.log(
                  `[content] div to be changed: ${
                    (node as HTMLDivElement).className
                  }`
                );
              }
            });
          }
        });
      } else {
        console.log(`[content] other mutation - ${mutation.type}`);
      }
    });
  };
};
