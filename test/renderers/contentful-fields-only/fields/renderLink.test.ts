import renderLink from "../../../../src/renderers/contentful-fields-only/fields/renderLink"
import { ContentFields } from "contentful-management"

describe("renderLink()", () => {
  it("renders a simple entry link", () => {
    const simpleEntryLink: ContentFields = {
      id: "validatedEntryLink",
      name: "Entry Link",
      type: "Link",
      localized: false,
      required: false,
      validations: [],
      disabled: false,
      omitted: false,
      linkType: "Entry",
    }

    expect(renderLink(simpleEntryLink)).toMatchInlineSnapshot(`"unknown"`)
  })

  it("renders a link with validations", () => {
    const validatedEntryLink: ContentFields = {
      id: "validatedEntryLink",
      name: "Entry Link",
      type: "Link",
      localized: false,
      required: false,
      validations: [{ linkContentType: ["linkToOtherThing"] }],
      disabled: false,
      omitted: false,
      linkType: "Entry",
    }

    expect(renderLink(validatedEntryLink)).toMatchInlineSnapshot(`"ILinkToOtherThing"`)
  })

  it("renders an asset link", () => {
    const assetLink: ContentFields = {
      id: "assetLink",
      name: "Asset Link",
      type: "Link",
      linkType: "Asset",
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    }

    expect(renderLink(assetLink)).toMatchInlineSnapshot(`"any"`)
  })

  it("handles mysteries", () => {
    const mysteryLink: ContentFields = {
      id: "mysteryLink",
      name: "Mystery Link",
      type: "Link",
      linkType: "Idk",
      localized: false,
      required: true,
      validations: [],
      disabled: false,
      omitted: false,
    }

    expect(renderLink(mysteryLink)).toMatchInlineSnapshot(`"unknown"`)
  })
})
