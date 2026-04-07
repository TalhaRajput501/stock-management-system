FROM node:18-alpine AS build

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /frontend/dist /usr/share/nginx/html

# Default to production config (for Azure)
COPY nginx.conf.production /etc/nginx/conf.d/default.conf

# This config will make sure app doesn't break when user refreshes the page or 
# tries to access a route directly. It will redirect all requests to index.html, 
# allowing the Vue Router to handle the routing on the client side.
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 