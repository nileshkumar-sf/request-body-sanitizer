import {ISanitizeRequestBodyOptions} from '../core';

export const DEFAULT_METADATA_KEY = 'loopback:openapi-v3:request-body';
export const EMPTY_ARRAY: never[] = [];

/**
 * Default sanitization options when none are provided
 * @internal
 */
export const defaultOptions: Required<
  Omit<ISanitizeRequestBodyOptions, 'fields' | 'sanitizer'>
> = {
  allowedTags: EMPTY_ARRAY,
  allowedAttributes: {},
  metadataKey: DEFAULT_METADATA_KEY,
} as const;
