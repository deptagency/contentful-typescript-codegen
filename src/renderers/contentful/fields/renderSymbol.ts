import { ContentFields } from "contentful-management"
import { renderUnionValues } from "../../typescript/renderUnion"
import { escapeSingleQuotes } from "../../utils"

export default function renderSymbol(field: ContentFields) {
  const inValidation = field.validations && field.validations.find(validation => !!validation.in)

  if (inValidation) {
    return renderUnionValues(
      inValidation.in!.map(value => `'${escapeSingleQuotes(value.toString())}'`),
    )
  } else {
    return "string"
  }
}
