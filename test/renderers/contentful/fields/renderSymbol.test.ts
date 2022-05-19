import renderSymbol from "../../../../src/renderers/contentful/fields/renderSymbol"
import { ContentFields } from "contentful-management"

describe("renderSymbol()", () => {
  const simpleString: ContentFields = {
    type: "Symbol",
    validations: [],
    id: "fieldId",
    name: "Field Name",
    omitted: false,
    required: true,
    disabled: false,
    linkType: undefined,
    localized: false,
  }

  const stringWithValidations: ContentFields = {
    type: "Symbol",
    validations: [{ in: ["one", "or", "the", "other"] }],
    id: "fieldId",
    name: "Field Name",
    omitted: false,
    required: true,
    disabled: false,
    linkType: undefined,
    localized: false,
  }

  it("works with simple strings", () => {
    expect(renderSymbol(simpleString).trim()).toMatchInlineSnapshot(`"string"`)
  })

  it("works with strings with validations", () => {
    expect(renderSymbol(stringWithValidations).trim()).toMatchInlineSnapshot(
      `"'one' | 'or' | 'the' | 'other'"`,
    )
  })
})
