FROM node:22-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Command to run the development server with host set to 0.0.0.0 to allow external connections
CMD ["npm", "run", "dev", "--", "--host"]
