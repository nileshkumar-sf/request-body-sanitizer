import {IMetadataProvider} from '../core';
import 'reflect-metadata';

export class ReflectMetadataProvider implements IMetadataProvider {
  getRequestBodyIndex(
    target: object,
    methodName: string | symbol,
    metadataKey: string
  ): number | undefined {
    const metadata: any[] = Reflect.getMetadata(metadataKey, target)[
      methodName
    ];
    if (!Array.isArray(metadata)) return undefined;
    return metadata.findIndex((meta) => Boolean(meta));
  }
}
