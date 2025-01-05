import {ISanitizationRule, ISanitizationStrategy} from '../core';

export class FieldSanitizationRule<T> implements ISanitizationRule {
  constructor(
    private fields: Array<keyof T> | undefined,
    private strategy: ISanitizationStrategy
  ) {}

  shouldSanitize(field: string): boolean {
    return !this.fields || this.fields.includes(field as keyof T);
  }

  sanitize(value: unknown): unknown {
    return this.strategy.sanitize(value);
  }
}
