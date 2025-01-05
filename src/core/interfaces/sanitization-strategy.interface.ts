export interface ISanitizationStrategy {
  sanitize(value: unknown): unknown;
}
