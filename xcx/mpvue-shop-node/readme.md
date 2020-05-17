# 小程序后端项目
- koa2语言
- node作用：定义接口，操作数据库，打通前后端逻辑

# mysql
- 安装步骤
    - 下载mysql安装包，解压
    - 设置环境变量，添加mysql的解压路径
    - 配置MySql的配置文件my.ini
    [mysql]
    default-character-set=utf8
    
    [mysqld]
    port = 3306
    basedir=F:\mysql-8.0.17-winx64
    datadir=F:\mysql-8.0.17-winx64\data
    character-set-server=utf8
    default-storage-engine=INNODB
    - 管理员身份打开 cmd命令行工具
        - 切换目录 cd F:\mysql-8.0.17-winx64\bin
        - 安装MySql mysqld install
        - 初始化命令 mysqld --initialize-insecure --user=mysql
        - 启动输入命令 net start mysql
    - 重置密码
        - 登录MySQL  mysql -u root -p
        - 修改root密码 
        use mysql；
        ALTER user 'root'@'localhost' IDENTIFIED BY '1234';
        FLUSH PRIVILEGES;
        - 查看端口号 show global variables like 'port';

- mysql数据操作
    - create database 数据库名;  创建数据库
    - show databases;  查看所有数据库
    - use 数据库名;  切换到该数据库
    - drop database 数据库名; 删除给数据库
    - source 导入文件所在的绝对路径名;  导入文件