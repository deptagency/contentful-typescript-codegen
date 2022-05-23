/** renders helper types for --localization flag */
export default function renderLocalizedTypes(localization: boolean) {
  if (!localization) return null

  return `
    export type DefaultLocalizedField<T> = Record<CONTENTFUL_DEFAULT_LOCALE_CODE, T>
    export type LocalizedField<T> = DefaultLocalizedField<T> & Partial<Record<LOCALE_CODE, T>>

    // We have to use our own localized version of Asset because of a bug in contentful https://github.com/contentful/contentful.js/issues/208
    export interface Asset {
      sys: Sys
      fields: {
        title: LocalizedField<string>
        description: LocalizedField<string>
        file: LocalizedField<{
          url: string
          details: {
            size: number
            image?: {
              width: number
              height: number
            }
          }
          fileName: string
          contentType: string
        }>
      }
      toPlainObject(): object
    }

    // When you specify a locale in contentful \`client.getEntries\`, the shape of the
    // return value is different. This adapter class unwraps LocalizedField<T> and
    // DefaultLocalizedField<T> to just T. There are also versions for ISomethingFields
    // and Entry<ISomethingFields>
    export type SpecificLocaleField<T> = T extends LocalizedField<infer F>
      ? SpecificLocaleMaybeEntry<F>
      : T extends DefaultLocalizedField<infer F>
      ? SpecificLocaleMaybeEntry<F>
      : T;

    export type SpecificLocaleFields<T> = {
      [k in keyof T]: SpecificLocaleField<T[k]>;
    };

    // when a content type refers to another content type with nested
    // entries or a reference field, we need to unwrap the nested
    // locales too.
    type SpecificLocaleMaybeEntry<T> = T extends Entry<infer E>
      ? SpecificLocale<Entry<E>>
      : T extends Entry<infer E>
      ? SpecificLocale<Entry<E>>
      : T extends Array<Entry<infer E>>
      ? Array<SpecificLocale<Entry<E>>>
      : T extends Asset
      ? SpecificLocale<Asset>
      : T extends Array<Asset>
      ? Array<SpecificLocale<Asset>>
      : T;

    export type SpecificLocale<T extends { fields: any }> = Omit<T, "fields"> & {
      fields: SpecificLocaleFields<T["fields"]>;
    };
  `
}
