import renderArray from "../../../../src/renderers/contentful/fields/renderArray"
import { ContentFields } from "contentful-management"

describe("renderArray()", () => {
  it("renders an array of symbols", () => {
    const arrayOfSymbols: ContentFields = {
      type: "Array",
      id: "fieldId",
      name: "Field Name",
      validations: [],
      omitted: false,
      required: true,
      disabled: false,
      linkType: undefined,
      localized: false,
      items: {
        type: "Symbol",
        validations: [],
      },
    }

    expect(renderArray(arrayOfSymbols)).toMatchInlineSnapshot(`"(string)[]"`)
  })

  it("renders an array of symbols with validations", () => {
    const arrayOfValidatedSymbols: ContentFields = {
      type: "Array",
      id: "fieldId",
      name: "Field Name",
      validations: [],
      omitted: false,
      required: true,
      disabled: false,
      linkType: undefined,
      localized: false,
      items: {
        type: "Symbol",
        validations: [{ in: ["one", "of", "these"] }],
      },
    }

    expect(renderArray(arrayOfValidatedSymbols)).toMatchInlineSnapshot(
      `"('one' | 'of' | 'these')[]"`,
    )
  })

  it("renders an array of links of a particular type", () => {
    const arrayOfValidatedSymbols: ContentFields = {
      type: "Array",
      id: "fieldId",
      name: "Field Name",
      validations: [],
      omitted: false,
      required: true,
      disabled: false,
      linkType: undefined,
      localized: false,
      items: {
        type: "Link",
        linkType: "Entry",
        validations: [{ linkContentType: ["contentType1", "contentType2"] }],
      },
    }

    expect(renderArray(arrayOfValidatedSymbols)).toMatchInlineSnapshot(
      `"(IContentType1 | IContentType2)[]"`,
    )
  })
})
