# Production stage
FROM node:20-alpine

WORKDIR /apps/react-app

# Install only production dependencies - uncomment line below if not using volumes
# COPY /apps/node_modules ./node_modules

# Copy built assets from builder
COPY apps/react-app/dist .

# Expose port
EXPOSE 3000

# Serve the React app
CMD ["npx", "serve", "-s", ".", "-l", "3000"]
