import { Locale } from "contentful-management"
import format from "../../support/format"
import renderDefaultLocale from "../../../src/renderers/contentful/renderDefaultLocale"

describe("renderSymbol()", () => {
  const locales = [
    {
      name: "English (US)",
      fallbackCode: null,
      code: "en-US",
      default: true,
      sys: {} as Locale["sys"],
    },
    {
      name: "Brazilian Portuguese",
      fallbackCode: "en-US",
      code: "pt-BR",
      default: false,
      sys: {} as Locale["sys"],
    },
  ] as Locale[]

  it("works with a list of locales", () => {
    expect(format(renderDefaultLocale(locales))).toMatchInlineSnapshot(
      `"export type CONTENTFUL_DEFAULT_LOCALE_CODE = \\"en-US\\";"`,
    )
  })

  const localesWithNoDefault: Locale[] = [
    {
      name: "English (US)",
      fallbackCode: null,
      code: "en-US",
      default: false,
      sys: {} as Locale["sys"],
    },
  ] as Locale[]

  it("throws an error when there is no default", () => {
    expect(() => {
      renderDefaultLocale(localesWithNoDefault)
    }).toThrow()
  })
})
