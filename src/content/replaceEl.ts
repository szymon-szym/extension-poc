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

  enum AddSize {
    small,
    wide,
    skye
  }

  let currenSize = AddSize.small
  //check size
  if (el.clientHeight <= 250 && el.clientWidth <= 300) {
    console.log(
      `[content][size] small el: ${el.clientHeight}, width: ${el.clientWidth}`
    );
  } else if (el.clientHeight <= 250 && el.clientWidth > 300) {
    console.log(
      `[content][size] wide el: ${el.clientHeight}, width: ${el.clientWidth}`
    );
    currenSize = AddSize.wide
  } else if (el.clientHeight > 250 && el.clientWidth <= 160) {
    console.log(
      `[content][size] tall el: ${el.clientHeight}, width: ${el.clientWidth}`
    );
    currenSize = AddSize.skye
  } else {
    console.log(
      `[content][size] default el: ${el.clientHeight}, width: ${el.clientWidth}`
    );
  }

  const div = document.createElement("div");

  
  const divSize = currenSize === AddSize.skye
  ? "height: 160px; width: 600px;"
  : currenSize === AddSize.wide
    ? "height: 200px; width: 750px;"
    : "height: 250px; width: 300px;"
  
  div.setAttribute(
    "style",
    `border: solid ${color};${divSize}`
  );

  // div.setAttribute(
  //   "data-height-wigth",
  //   `height: ${el.clientHeight}, width: ${el.clientWidth || 300}`
  // );

  div.setAttribute("data-blocker-ignore", `true`);

  const iframe = document.createElement("iframe");
  const src = currenSize === AddSize.skye
  ? "skyscrapper"
  : currenSize === AddSize.wide
    ? "wide"
    : "small"
  console.log(`[debug] curr src = ${src}`)
  iframe.src = `https://affectionate-johnson-2cb41c.netlify.app/${src}`;
  iframe.setAttribute("frameborder", "0")
  iframe.setAttribute("scrolling", "no")
  iframe.setAttribute("marginheight", "0")
  iframe.setAttribute("marginwidth", "0")
  iframe.setAttribute("allowfullscreen", "true")
  // iframe.setAttribute("style", "position:absolute;top:0px;width:100%;height:100vh;")
  iframe.setAttribute("style", "width:100%;height:100%;")

  div.appendChild(iframe);

  div.addEventListener("click", () => {
    postAddsLogs(1, LogsType.CLICK);
  });

  el.replaceWith(div);
  postAddsLogs(1, LogsType.INSERT);
};
