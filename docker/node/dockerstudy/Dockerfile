# 镜像描述文件
# 依赖于node的7.9版本
FROM daocloud.io/library/node:7.9-wheezy
# 创建目录
RUN mkdir -p /usr/src/nodejs/
WORKDIR /usr/src/nodejs/
COPY package.json  /usr/src/nodejs/package.json
RUN cd /usr/src/nodejs/
# 安装 配置环境
RUN npm i 

COPY . /usr/src/nodejs/
# 向外输出端口
EXPOSE 1234
CMD yarn start