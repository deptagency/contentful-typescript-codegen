import renderContentType from "../../../src/renderers/contentful-fields-only/renderContentType"
import { ContentType } from "contentful-management"
import format from "../../support/format"

describe("renderContentType()", () => {
  const contentType = {
    sys: {
      id: "myContentType",
    },
    fields: [
      {
        id: "symbolField",
        name: "Symbol Field™",
        required: false,
        validations: [],
        disabled: false,
        omitted: false,
        localized: false,
        type: "Symbol",
      },
      {
        id: "arrayField",
        name: "Array field",
        required: true,
        validations: [{}],
        items: {
          type: "Symbol",
          validations: [
            {
              in: ["one", "of", "the", "above"],
            },
          ],
        },
        disabled: false,
        omitted: false,
        localized: false,
        type: "Array",
      },
    ],
    description: "",
    displayField: "",
    name: "",
  } as ContentType

  it("works with miscellaneous field types", () => {
    expect(format(renderContentType(contentType))).toMatchInlineSnapshot(`
      "export interface IMyContentType {
        fields: {
          /** Symbol Field™ */
          symbolField?: string | undefined,

          /** Array field */
          arrayField: (\\"one\\" | \\"of\\" | \\"the\\" | \\"above\\")[]
        };
        [otherKeys: string]: any;
      }"
    `)
  })
})
