# HTML Sanitizer

A TypeScript decorator for sanitizing HTML content in request bodies.

<!-- ## Installation

```bash
npm install html-sanitizer
``` -->

## Usage

```typescript
import { sanitizeRequestBody } from 'html-sanitizer';

class UserController {
  @sanitizeRequestBody()
  async createUser(@requestBody() user: UserDTO) {
    return this.userService.create(user);
  }
}
```

## Documentation

See the [docs](./docs) directory for detailed documentation.

## Contributing

Please read [contributing.md](./docs/contributing.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
