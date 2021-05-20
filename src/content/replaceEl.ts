import { ImageElement } from "@slack/types";
import { disconnect } from "process";
import { fetchElement } from "./content_svc";
import { LogsType, postAddsLogs } from "./postLogs";

export const replaceEl = (
  document: Document,
  el: Element,
  color: string = "blue"
) => {
  console.log(
    `[content, size] replacing el, height: ${el.clientHeight}, width: ${el.clientWidth}`
  );

  //! to refactor

  //check size
  if (el.clientHeight <= 250 && el.clientWidth <= 300) {
    console.log(
      `[content][size] small el: ${el.clientHeight}, width: ${el.clientWidth}`
    );
  } else if (el.clientHeight <= 250 && el.clientWidth > 300) {
    console.log(
      `[content][size] wide el: ${el.clientHeight}, width: ${el.clientWidth}`
    );
  } else if (el.clientHeight > 250 && el.clientWidth <= 300) {
    console.log(
      `[content][size] tall el: ${el.clientHeight}, width: ${el.clientWidth}`
    );
  } else {
    console.log(
      `[content][size] default el: ${el.clientHeight}, width: ${el.clientWidth}`
    );
  }

  const div = document.createElement("div");

  div.setAttribute(
    "style",
    `border: solid ${color};height: ${el.clientHeight || 250}px; width: ${
      el.clientWidth
    }px; display:flex; justify-content:center; align-items:center;`
  );

  div.setAttribute(
    "data-height-wigth",
    `height: ${el.clientHeight}, width: ${el.clientWidth || 300}`
  );


  div.setAttribute("data-blocker-ignore", `true`);

  const iframe = document.createElement('iframe')
  iframe.src = "https://affectionate-johnson-2cb41c.netlify.app/"
  iframe.setAttribute("style", "height: 100%; width: 100%; overflow: hidden; border: none;");

  div.appendChild(iframe)

  div.addEventListener("click", () => {
    postAddsLogs(1, LogsType.CLICK);
  });

  el.replaceWith(div);
  postAddsLogs(1, LogsType.INSERT);
};
