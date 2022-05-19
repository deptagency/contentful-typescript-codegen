import { FieldType } from "contentful"

import renderInterface from "../typescript/renderInterface"
import renderField from "../contentful/renderField"
import renderContentTypeId from "../contentful/renderContentTypeId"

import renderArray from "../contentful-fields-only/fields/renderArray"
import renderLink from "../contentful-fields-only/fields/renderLink"
import renderRichText from "../contentful-fields-only/fields/renderRichText"

import renderBoolean from "../contentful/fields/renderBoolean"
import renderLocation from "../contentful/fields/renderLocation"
import renderNumber from "../contentful/fields/renderNumber"
import renderObject from "../contentful/fields/renderObject"
import renderSymbol from "../contentful/fields/renderSymbol"
import { ContentType, ContentFields } from "contentful-management"

export default function renderContentType(contentType: ContentType): string {
  const name = renderContentTypeId(contentType.sys.id)
  const fields = renderContentTypeFields(contentType.fields)

  return renderInterface({
    name,
    fields: `
      fields: { ${fields} };
      [otherKeys: string]: any;
    `,
  })
}

function renderContentTypeFields(fields: ContentFields[]): string {
  return fields
    .filter(field => !field.omitted)
    .map<string>(field => {
      const functionMap: Record<FieldType, (field: ContentFields) => string> = {
        Array: renderArray,
        Boolean: renderBoolean,
        Date: renderSymbol,
        Integer: renderNumber,
        Link: renderLink,
        Location: renderLocation,
        Number: renderNumber,
        Object: renderObject,
        RichText: renderRichText,
        Symbol: renderSymbol,
        Text: renderSymbol,
      }

      return renderField(field, functionMap[field.type as FieldType](field))
    })
    .join("\n\n")
}
