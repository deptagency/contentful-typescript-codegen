import renderRichText from "../../../../src/renderers/contentful/fields/renderRichText"
import { ContentFields } from "contentful-management"

describe("renderRichText()", () => {
  const simpleRichText: ContentFields = {
    type: "Object",
    id: "fieldId",
    name: "Field Name",
    validations: [],
    omitted: false,
    required: true,
    disabled: false,
    linkType: undefined,
    localized: false,
  }

  it("works", () => {
    expect(renderRichText(simpleRichText).trim()).toMatchInlineSnapshot(`"Document"`)
  })
})
