export interface ISanitizationRule {
  shouldSanitize(field: string, value: unknown): boolean;
  sanitize(value: unknown): unknown;
}
