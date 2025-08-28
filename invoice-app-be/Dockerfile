# Stage 1: Build dependencies
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# Stage 2: Run app
FROM node:22
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env ./.env
COPY --from=build /app/database.sqlite ./database.sqlite
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/package-lock.json ./package-lock.json
EXPOSE 3002
CMD ["npm", "run", "start"]
