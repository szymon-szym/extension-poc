export const enum LogsType {
  INSERT,
  CLICK,
}

export const postAddsLogs = async (quantity: Number, type: LogsType):Promise<void> => {
  // get users email

  try {
    // if (type === LogsType.INSERT) {
    //   // to be done - store inserts in local store
    // } else {
    //   const tokensObj: {
    //     tokens: { AccessToken: string };
    //   } = await browser.storage.sync.get("tokens");
    //   const userEmail = await browser.storage.sync.get("userEmail");

    //   // console.log(`[content] ${Object.keys(tokensObj) === 0}, ${Object.keys(userEmail) === 0}`)

    //   if (
    //     Object.keys(tokensObj).length === 0 ||
    //     Object.keys(userEmail).length === 0
    //   ) {
    //     console.log(
    //       "[content] there is no token or user data in local store - skip updating db"
    //     );
    //     return;
    //   }

    //   const authToken = tokensObj?.tokens?.AccessToken || "";
    //   // console.log(`access token: ${authToken}`)
    //   console.log("uploading to db");

    //   await fetch(
    //     "https://6i6f1oj436.execute-api.eu-central-1.amazonaws.com/prod/user-reports/",
    //     {
    //       method: "POST",
    //       mode: "cors",
    //       headers: {
    //         Authorization: authToken,
    //       },
    //       body: JSON.stringify({ quantity: quantity, type: "click" }),
    //     }
    //   );
    //   return 
    // }
  } catch (e) {
    console.debug(`[content] error: ${e}`);
  }
};
