# my-image-gallery

利用腾讯云（COS）+Golang自制免费图床。

1. 备份图片数据
2. 不需要担心原始图片丢失、盗链等
3. 自带CDN加速🚀


**示例**

![upload demo](https://zyblog-1255449766.cos.ap-beijing.myqcloud.com/74df47a1-687c-44a9-b663-998cfb5333f1)


**编译**

```bash
git clone git@github.com:xpzouying/my-image-gallery.git

cd my-image-gallery/upload-images-cos/

go build -o upload .
```


**配置腾讯云对象存储**

1. 点击[创建新的存储桶](https://console.cloud.tencent.com/cos5/bucket)
2. 配置权限，选择共有读，私有写



![](https://zyblog-1255449766.cos.ap-beijing.myqcloud.com/a5ae7bd3-7f1b-49b2-b9d9-99e82f474ade)



**使用**

启动参数，二选一：

* -http：指定远程图片地址

* -file：指定本地文件路径

```bash
# export environment for cos
export COS_BUCKET="you-bucket"
export COS_SECRETID="you-secret-id"
export COS_SECRETKEY="you-secret-key"

# upload http image file
./upload -http http://localhost:8080/image1.jpg

# or upload local file
./upload -file /tmp/1.jpg
```

