import { ContentFields } from "contentful-management"
import renderContentTypeId from "../../contentful/renderContentTypeId"
import { renderUnionValues } from "../../typescript/renderUnion"

export default function renderLink(field: ContentFields): string {
  if (field.linkType === "Asset") {
    return "any"
  }

  if (field.linkType === "Entry") {
    const contentTypeValidation =
      field.validations && field.validations.find(validation => !!validation.linkContentType)

    if (contentTypeValidation) {
      return renderUnionValues(contentTypeValidation.linkContentType!.map(renderContentTypeId))
    } else {
      return "unknown"
    }
  }

  return "unknown"
}
