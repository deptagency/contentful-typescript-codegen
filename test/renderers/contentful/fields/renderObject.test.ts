import renderObject from "../../../../src/renderers/contentful/fields/renderObject"
import { ContentFields } from "contentful-management"

describe("renderObject()", () => {
  const simpleObject: ContentFields = {
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
    expect(renderObject(simpleObject).trim()).toMatchInlineSnapshot(`"Record<string, any>"`)
  })
})
