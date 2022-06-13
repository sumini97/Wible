\***\*⚙️ Install and Usage\*\***

---

### 환경

- OS (AWS EC2): Ubuntu 20.04.4 LTS (GNU/Linux 5.4.0-1018-aws x86_64)

### 시스템 구성

- Docker version 20.10.13, build a224086

- maven 3.6.3

- nginx 1.18.0 (Ubuntu)

- Java

  openjdk version "1.8.0_312"
  OpenJDK Runtime Environment (build 1.8.0_312-8u312-b07-0ubuntu1~20.04-b07)
  OpenJDK 64-Bit Server VM (build 25.312-b07, mixed mode)

### **Ubuntu 버전 업 및 기본 설치**

`sudo apt-get update sudo apt-get install nodejs sudo apt-get install npm`

\***\*docker 설치\*\***

```
# 필수 패키지 설치
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
# GPG Key 인증
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# docker repository 등록
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
# 도커 설치
sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io
# 시스템 부팅시 도커 시작
sudo systemctl enable docker && service docker start
# 도커 확인
sudo service docker status
```

\***\*mysql 실행 \*\***

docker run -d -p 3306:3306 -name mysql -e MYSQL_ROOT_PASSWORD=<password> -d mysql:8.0

\***\*frontend 빌드 \*\***

cd /git/S06P22A303/front
npm run build

\***\*backend 빌드 및 실행\*\***

cd /git/S06P22A303/backend
sudo mvn package
cd target
nohup java -jar backend-0.0.1-SNAPSHOT.jar &

### nginx

```jsx
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html;

        index index.html index.htm index.nginx-debian.html

        server_name j6a303.p.ssafy.io;

        location / {

            root            /git/S06P22A303/front/build;
            index           index.html;
            try_files       $uri /index.html;

            location /api {
                proxy_pass http://localhost:8080;
            }
        }
}
```

### IDE

Spring Tool Suite 3

- Version: 3.9.14.RELEASE
- Build Id: 202009151235
- Platform: Eclipse 2020-03 (4.15.0)

Visual Studio Code

- version: 1.66
- node.js: 16.13.0
