# Use an official Node.js runtime as a parent image

# FROM node:20

# WORKDIR /usr/src/app

# RUN apt-get update && apt-get install -y --no-install-recommends alien postgresql-client postgresql nano vim libaio1 wget 

# ENV LD_LIBRARY_PATH="/usr/lib/oracle/18.5/client64/lib:${LD_LIBRARY_PATH}"

# COPY ./tnsnames.ora /usr/lib/oracle/18.5/client64/lib/network/admin/tnsnames.ora

# COPY package*.json ./

# RUN npm install

# COPY . .

# ENV NODE_ENV production

# CMD ["node", "Server.cjs"]



# FROM node:18

# WORKDIR /app

# COPY . /app

# RUN npm ci

# RUN npm run build

# EXPOSE 3000

# CMD ["npx", "serve", "-s", "dist"]


FROM node:20

# ตั้งค่าสถานที่ทำงาน
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# คัดลอกไฟล์แอปพลิเคชัน
COPY . .

# รันแอปพลิเคชัน Node.js
CMD ["node", "Server.cjs"]
