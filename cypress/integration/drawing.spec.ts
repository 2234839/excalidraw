import {
  baseDrawingRegion as region,
  artistDrawingConfig,
} from "../support/utils";

describe("Drawing", () => {
  it("should change canvas background color", () => {
    // just capture an empty square on the center of the viewport
    cy.get("#canvas").matchImageSnapshot("beforeBg", { clip: region });
    cy.get('input[aria-label="Canvas background"]')
      .clear()
      .type("#ffeeee");
    cy.get("#canvas").matchImageSnapshot("afterBg", { clip: region });
    // restore background
    cy.get('input[aria-label="Canvas background"]')
      .clear()
      .type("#ffffff");
  });
  it("should draw a rectangle", () => {
    // just capture an empty square on the center of the viewport
    cy.get('[title^="Rectangle"]').click();
    cy.get("#canvas").drag(
      { x: region.x + 10, y: region.y + 10 },
      { x: region.x + 50, y: region.y + 50 },
    );
    cy.get("#canvas").click(region.x - 50, region.y - 50); // deselect
    // we add some tolerance threshold due to rough.js randomness
    cy.get("#canvas").matchImageSnapshot("rectangleArtist", {
      clip: region,
      ...artistDrawingConfig,
    });
    cy.get("#canvas").click(region.x + 10, region.y + 10); // select
    // for catching any mistake we also compare architect sloppiness
    cy.contains("Architect").click();
    cy.get("#canvas").click(region.x - 50, region.y - 50); // deselect
    cy.get("#canvas").matchImageSnapshot("rectangleArchitect", {
      clip: region,
    });
  });
  it.only("should write text using text tool", () => {
    // just capture an empty square on the center of the viewport
    cy.get('[title^="Text"]').click();
    cy.get("#canvas").trigger("pointerdown", {
      button: 0,
      x: region.x,
      y: region.y,
    });
    cy.get('[contenteditable="plaintext-only"]')
      .type("Hello world!")
      .blur();
    // shift screenshot region due to text being shifted while typing
    const screenshotRegion = {
      x: region.x - 100,
      y: region.y - 50,
      width: 200,
      height: 100,
    };
    cy.get("#canvas").click(region.x - 100, region.y - 50); // deselect
    cy.get("#canvas").matchImageSnapshot("textTool", {
      clip: screenshotRegion,
    });
  });
  it("should write text by double clicking", () => {
    // just capture an empty square on the center of the viewport
    cy.get("#canvas").trigger("dblclick", region.x, region.y);
    cy.get('[contenteditable="plaintext-only"]')
      .type("Hello world!")
      .blur();
    // shift screenshot region due to text being shifted while typing
    const screenshotRegion = {
      x: region.x - 100,
      y: region.y - 50,
      width: 200,
      height: 100,
    };
    cy.get("#canvas").click(region.x - 100, region.y - 50); // deselect
    cy.get("#canvas").matchImageSnapshot("textDblClick", {
      clip: screenshotRegion,
    });
  });
  it("should draw a diamond", () => {
    // just capture an empty square on the center of the viewport
    cy.get('[title^="Diamond"]').click();
    cy.get("#canvas").drag(
      { x: region.x + 10, y: region.y + 10 },
      { x: region.x + 50, y: region.y + 50 },
    );
    cy.contains("Architect").click();
    cy.get("#canvas").click(region.x - 50, region.y - 50); // deselect
    cy.get("#canvas").matchImageSnapshot("diamondArchitect", {
      clip: region,
    });
  });
  it("should draw a arrow pointing south-east", () => {
    // just capture an empty square on the center of the viewport
    cy.get('[title^="Arrow"]').click();
    cy.get("#canvas").drag(
      { x: region.x + 10, y: region.y + 10 },
      { x: region.x + 50, y: region.y + 50 },
    );
    cy.contains("Architect").click();
    cy.get("#canvas").click(region.x - 50, region.y - 100); // deselect
    cy.get("#canvas").matchImageSnapshot("arrowSEArchitect", {
      clip: region,
    });
  });
  it("should draw a arrow pointing north-west", () => {
    // just capture an empty square on the center of the viewport
    cy.get('[title^="Arrow"]').click();
    cy.get("#canvas").drag(
      { x: region.x + 50, y: region.y + 50 },
      { x: region.x + 10, y: region.y + 10 },
    );
    cy.contains("Architect").click();
    cy.get("#canvas").click(region.x - 50, region.y - 100); // deselect
    cy.get("#canvas").matchImageSnapshot("arrowNWArchitect", {
      clip: region,
    });
  });
  it("should draw a arrow pointing north-east", () => {
    // just capture an empty square on the center of the viewport
    cy.get('[title^="Arrow"]').click();
    cy.get("#canvas").drag(
      { x: region.x + 10, y: region.y + 50 },
      { x: region.x + 50, y: region.y + 10 },
    );
    cy.contains("Architect").click();
    cy.get("#canvas").click(region.x - 50, region.y - 100); // deselect
    cy.get("#canvas").matchImageSnapshot("arrowNEArchitect", {
      clip: region,
    });
  });
  it("should draw a arrow pointing south-west", () => {
    // just capture an empty square on the center of the viewport
    cy.get('[title^="Arrow"]').click();
    cy.get("#canvas").drag(
      { x: region.x + 50, y: region.y + 10 },
      { x: region.x + 10, y: region.y + 50 },
    );
    cy.contains("Architect").click();
    cy.get("#canvas").click(region.x - 50, region.y - 100); // deselect
    cy.get("#canvas").matchImageSnapshot("arrowSWArchitect", {
      clip: region,
    });
  });
});
