import {IOptions} from 'sanitize-html';

/**
 * Configuration options for HTML sanitization of request body fields
 * @typeParam T - Type of the request body object
 */
export interface ISanitizeRequestBodyOptions<T extends object = any> {
  /**
   * Specific fields to sanitize. If empty, all string fields will be sanitized
   * @example ['bio', 'description']
   */
  fields?: Array<keyof T>;

  /**
   * HTML tags to allow in the content. Empty array means no tags allowed
   * @example ['b', 'i', 'u']
   * @default []
   */
  allowedTags?: string[];

  /**
   * HTML attributes to allow for specific tags
   * @example { a: ['href', 'title'], img: ['src', 'alt'] }
   * @default {}
   */
  allowedAttributes?: IOptions['allowedAttributes'];

  /**
   * Custom sanitization function to override default HTML sanitization
   * @param value - The string value to sanitize
   * @returns The sanitized string
   */
  sanitizer?: (value: string) => string;

  /**
   * Metadata key used to identify request body parameter
   * @example 'loopback:openapi-v3:request-body'
   * @default 'loopback:openapi-v3:request-body'
   */
  metadataKey?: string;
}
