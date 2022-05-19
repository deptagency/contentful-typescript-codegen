import renderBoolean from "../../../../src/renderers/contentful/fields/renderBoolean"
import { ContentFields } from "contentful-management"

describe("renderSymbol()", () => {
  const simpleBoolean: ContentFields = {
    type: "Boolean",
    id: "fieldId",
    name: "Field Name",
    validations: [],
    omitted: false,
    required: true,
    disabled: false,
    linkType: undefined,
    localized: false,
  }

  it("works with simple booleans", () => {
    expect(renderBoolean(simpleBoolean).trim()).toMatchInlineSnapshot(`"boolean"`)
  })
})
