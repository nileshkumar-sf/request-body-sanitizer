export interface IMetadataProvider {
  getRequestBodyIndex(
    target: object,
    methodName: string | symbol,
    metadataKey: string
  ): number | undefined;
}
