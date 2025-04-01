# EasyAuth Backend

NestJS backend API for the EasyAuth authentication system.

## Tech Stack

- NestJS 11
- TypeScript
- MongoDB with Mongoose
- JWT authentication
- Swagger/OpenAPI documentation
- Pino logger

## API Documentation

When running, Swagger documentation is available at `/api`.

### Key Endpoints

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login existing user
- `GET /auth/refresh` - Refresh JWT token
- `GET /` - Protected home endpoint (requires authentication)

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up MongoDB:

   - You can use a local MongoDB instance or Docker:

     ```bash
     docker run -d -p 27017:27017 --name mongodb \
       -e MONGO_INITDB_ROOT_USERNAME=user \
       -e MONGO_INITDB_ROOT_PASSWORD=password \
       mongo:6.0
     ```

3. Set environment variables (create a `.env` file):

   ```env
   JWT_SECRET=your_jwt_secret
   MONGO_URI=mongodb://user:password@localhost:27017/easy-gen-auth?authSource=admin
   PORT=3000
   ```

4. Start the development server:

   ```bash
   npm run start:dev
   ```

5. Access the API at <http://localhost:3000>

## Available Scripts

- `npm run start:dev` - Start in development mode (with hot reloading)
- `npm run build` - Build for production
- `npm run start:prod` - Run production build
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests

## Docker Development

You can also run the backend in a Docker container:

```bash
docker build -t easy-auth-backend .
docker run -p 3000:3000 \
  -e JWT_SECRET=secret \
  -e MONGO_URI=mongodb://user:password@host.docker.internal:27017/easy-gen-auth?authSource=admin \
  easy-auth-backend
```

## Testing

### End-to-End Tests

The project includes comprehensive end-to-end tests that verify the complete authentication flow and API functionality:

- Authentication tests (register, login, token refresh)
- Protected endpoint access validation
- User data retrieval

To run the e2e tests:

```bash
npm run test:e2e
```

## Dependencies

See [package.json](./package.json) for a complete list of dependencies.

## Related

For more information about the full application, see the [root README](../README.md).
