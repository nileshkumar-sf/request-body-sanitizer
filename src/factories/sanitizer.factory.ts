import {ISanitizeRequestBodyOptions} from '../core';
import {ReflectMetadataProvider} from '../providers';
import {FieldSanitizationRule} from '../rules';
import {RequestBodySanitizer} from '../services';
import {
  CustomSanitizationStrategy,
  HtmlSanitizationStrategy,
} from '../strategies';

export class SanitizerFactory {
  static createSanitizer<T extends object>(
    options: ISanitizeRequestBodyOptions<T>
  ): RequestBodySanitizer<T> {
    const strategy = options.sanitizer
      ? new CustomSanitizationStrategy(options.sanitizer)
      : new HtmlSanitizationStrategy({
          allowedTags: options.allowedTags,
          allowedAttributes: options.allowedAttributes,
        });

    const rule = new FieldSanitizationRule<T>(options.fields, strategy);
    const metadataProvider = new ReflectMetadataProvider();

    return new RequestBodySanitizer<T>(rule, metadataProvider);
  }
}
