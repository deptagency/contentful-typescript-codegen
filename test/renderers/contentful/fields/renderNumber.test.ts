import renderNumber from "../../../../src/renderers/contentful/fields/renderNumber"
import { ContentFields } from "contentful-management"

describe("renderNumber()", () => {
  const simpleNumber: ContentFields = {
    type: "Number",
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
    expect(renderNumber(simpleNumber).trim()).toMatchInlineSnapshot(`"number"`)
  })
})
