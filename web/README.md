# EasyAuth Frontend

React frontend for the EasyAuth authentication system.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Formik & Yup (form validation)
- Axios (API requests)
- SCSS (styling)

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set environment variables (create a `.env` file):

   ```env
   VITE_BACKEND_URL=http://localhost:3000
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser to <http://localhost:5173>

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Docker Development

You can also run the frontend in a Docker container:

```bash
docker build -t easy-auth-frontend -f Dockerfile.dev .
docker run -p 5173:5173 -v $(pwd):/app -e VITE_BACKEND_URL=http://localhost:3000 easy-auth-frontend
```

## Dependencies

See [package.json](./package.json) for a complete list of dependencies.

## Related

For more information about the full application, see the [root README](../README.md).
