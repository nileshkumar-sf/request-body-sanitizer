import sanitizeHtml from 'sanitize-html';
import {ISanitizationStrategy, ISanitizeRequestBodyOptions} from '../core';

export class HtmlSanitizationStrategy implements ISanitizationStrategy {
  constructor(private options: ISanitizeRequestBodyOptions) {}

  sanitize(value: unknown): unknown {
    if (typeof value !== 'string') return value;
    return sanitizeHtml(value, {
      allowedTags: this.options.allowedTags ?? [],
      allowedAttributes: this.options.allowedAttributes ?? {},
    }).trim();
  }
}
