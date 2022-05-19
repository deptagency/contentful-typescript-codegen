import { ContentFields } from "contentful-management"
import renderInterfaceProperty from "../typescript/renderInterfaceProperty"

export default function renderField(
  field: ContentFields,
  type: string,
  localization: boolean = false,
): string {
  return renderInterfaceProperty(
    field.id,
    type,
    field.required,
    localization,
    field.localized,
    field.name,
  )
}
