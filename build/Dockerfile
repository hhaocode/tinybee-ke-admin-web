FROM nginx:1.16.1
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /etc/nginx/html/