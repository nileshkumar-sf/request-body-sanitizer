import {ISanitizationStrategy} from '../core';

export class CustomSanitizationStrategy implements ISanitizationStrategy {
  constructor(private sanitizer: (value: string) => string) {}

  sanitize(value: unknown): unknown {
    if (typeof value !== 'string') return value;
    return this.sanitizer(value);
  }
}
