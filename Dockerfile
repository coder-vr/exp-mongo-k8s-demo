# ---- Builder Stage ----
    FROM node:22.13.1 AS builder

    # Set the working directory inside the container
    WORKDIR /app
    
    # Copy package.json and package-lock.json to install dependencies
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install --only=production
    
    # Copy the entire application
    COPY . .
    
    # ---- Runner Stage ----
    FROM node:22.13.1-alpine AS runner
    
    # Set the working directory
    WORKDIR /app
    
    # Copy only the necessary files from the builder stage
    COPY --from=builder /app /app
    
    # Expose the application port
    EXPOSE 8080
    
    # Set the command to start the application
    CMD ["node", "index.js"]
    