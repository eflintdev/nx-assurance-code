# Production stage
FROM node:20-alpine

WORKDIR /apps/angular-app

# Install only production dependencies
COPY /apps/node_modules ./node_modules


# Copy Depedencies from Base Service
COPY apps/angular-app/dist/apps/angular-app/browser .

# Expose port
EXPOSE 4200

# Serve the Angular app
CMD ["npx", "serve", "-s", ".", "-l", "4200"]
