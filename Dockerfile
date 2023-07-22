# 使用 Node.js 官方镜像作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制其他项目文件到工作目录
COPY . .

# 设置环境变量
ENV PORT 8080

# 暴露容器端口
EXPOSE 8080

# 运行 Gulp watch 任务
CMD ["npm", "run", "watch"]
