import {defaultOptions} from '../config';
import {ISanitizeRequestBodyOptions} from '../core';
import {SanitizerFactory} from '../factories';
import {isPlainObject} from '../utils';

/**
 * Method decorator that sanitizes HTML content in request body fields.
 * Provides protection against XSS attacks by removing unsafe HTML content.
 *
 * Features:
 * - Selective field sanitization
 * - Configurable allowed HTML tags and attributes
 * - Custom sanitization function support
 * - Configurable metadata key for request body parameter
 * - TypeScript type safety with generics
 *
 * @param options - Configuration options for sanitization
 * @returns Method decorator function
 *
 * @example
 * Simple usage with default options (strips all HTML):
 * ```typescript
 * class UserController {
 *   @sanitizeRequestBody()
 *   async createUser(@requestBody() user: UserDTO) {
 *     return this.userService.create(user);
 *   }
 * }
 * ```
 *
 * @example
 * Advanced usage with custom metadata key and specific fields:
 * ```typescript
 * interface BlogPost {
 *   title: string;
 *   content: string;
 *   tags: string[];
 * }
 *
 * class BlogController {
 *   @sanitizeRequestBody<BlogPost>({
 *     fields: ['content'],
 *     allowedTags: ['p', 'b', 'i'],
 *     allowedAttributes: {
 *       p: ['class'],
 *       a: ['href', 'title']
 *     },
 *     metadataKey: 'custom:request-body'
 *   })
 *   async createPost(@requestBody() post: BlogPost) {
 *     return this.blogService.create(post);
 *   }
 * }
 * ```
 *
 * @example
 * Custom sanitization function:
 * ```typescript
 * @sanitizeRequestBody({
 *   fields: ['description'],
 *   sanitizer: (value) => value.replace(/[^a-zA-Z0-9\s]/g, '')
 * })
 * ```
 */
export function sanitizeRequestBody<T extends object = any>(
  options: ISanitizeRequestBodyOptions<T> = {}
): MethodDecorator {
  return function (
    target: object,
    methodName: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> {
    const sanitizeConfig = {
      ...defaultOptions,
      ...options,
    };
    const originalMethod = descriptor.value;
    const sanitizer = SanitizerFactory.createSanitizer<T>(sanitizeConfig);
    const metadataKey =
      options.metadataKey ?? 'loopback:openapi-v3:request-body';

    descriptor.value = async function (...args: any[]) {
      try {
        const requestBodyIndex = sanitizer.getRequestBodyIndex(
          target,
          methodName,
          metadataKey
        );

        if (
          requestBodyIndex === undefined ||
          requestBodyIndex >= args.length ||
          !isPlainObject(args[requestBodyIndex])
        ) {
          return originalMethod.apply(this, args);
        }

        args[requestBodyIndex] = sanitizer.sanitizeObject(
          args[requestBodyIndex]
        );
        return originalMethod.apply(this, args);
      } catch (error) {
        console.error('Error in sanitizeRequestBody decorator:', error);
        return originalMethod.apply(this, args);
      }
    };

    return descriptor;
  };
}
