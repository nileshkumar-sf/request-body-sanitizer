import {IMetadataProvider, ISanitizationRule} from '../core';

export class RequestBodySanitizer<T extends object> {
  constructor(
    private rule: ISanitizationRule,
    private metadataProvider: IMetadataProvider
  ) {}

  sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = this.rule.shouldSanitize(key, value)
        ? this.rule.sanitize(value)
        : value;
    }

    return sanitized;
  }

  getRequestBodyIndex(
    target: object,
    methodName: string | symbol,
    metadataKey: string
  ): number | undefined {
    return this.metadataProvider.getRequestBodyIndex(
      target,
      methodName,
      metadataKey
    );
  }
}
