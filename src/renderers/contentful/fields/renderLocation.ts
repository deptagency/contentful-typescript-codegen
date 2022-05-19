import { ContentFields } from "contentful-management"

export default function renderLocation(field: ContentFields): string {
  return "{ lat: number, lon: number }"
}
