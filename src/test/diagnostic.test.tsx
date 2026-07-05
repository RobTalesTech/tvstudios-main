import { describe, it } from "vitest";
import React from "react";
import ReactDOMServer from "react-dom/server";
import TVIntro from "../components/TVIntro";

describe("TVIntro SSR Render Diagnostic", () => {
  it("should import and render to string successfully", () => {
    try {
      const html = ReactDOMServer.renderToString(<TVIntro onEnter={() => {}} />);
      console.log("DIAGNOSTIC: Rendered HTML length is " + html.length);
    } catch (e: any) {
      console.error("DIAGNOSTIC CRASH DETECTED:");
      console.error(e.message);
      console.error(e.stack);
      throw e;
    }
  });
});
