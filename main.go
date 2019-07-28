package main

import (
	"bytes"
	"context"
	"errors"
	"flag"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	uuid "github.com/satori/go.uuid"
	"github.com/tencentyun/cos-go-sdk-v5"
	"github.com/tencentyun/cos-go-sdk-v5/debug"
)

type cosClient struct {
	c         *cos.Client
	cosBucket string
}

func newCosClient(cosBucket, secretID, secretKey string) (*cosClient, error) {
	if secretID == "" || secretKey == "" {
		return nil, errors.New("should set COS_SECRETID and COS_SECRETKEY first")
	}

	u, _ := url.Parse(cosBucket)
	b := &cos.BaseURL{
		BucketURL: u,
	}
	c := cos.NewClient(b, &http.Client{
		Transport: &cos.AuthorizationTransport{
			SecretID:  secretID,
			SecretKey: secretKey,
			Transport: &debug.DebugRequestTransport{
				RequestHeader:  false,
				RequestBody:    false,
				ResponseHeader: false,
				ResponseBody:   false,
			},
		},
	})

	return &cosClient{
		c:         c,
		cosBucket: cosBucket,
	}, nil
}

func requestImage(url string) ([]byte, error) {
	c := &http.Client{Timeout: 10 * time.Second}

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36")
	req.Header.Set("Accept-Encoding", "gzip, deflate, br")
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3")

	resp, err := c.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("download image error")
	}

	return ioutil.ReadAll(resp.Body)
}

func (c cosClient) UploadWithHTTPSource(data []byte) (name string, err error) {
	filename := uuid.NewV4().String()

	opt := &cos.ObjectPutOptions{
		ObjectPutHeaderOptions: &cos.ObjectPutHeaderOptions{
			ContentType: http.DetectContentType(data),
		},
		ACLHeaderOptions: &cos.ACLHeaderOptions{
			XCosACL: "public-read",
		},
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	resp, err := c.c.Object.Put(ctx, filename, bytes.NewReader(data), opt)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", errors.New("upload image to tencent cos failed")
	}

	return c.cosBucket + "/" + filename, nil
}

func main() {
	imageSrc := flag.String("http", "", "http address of image")
	imageFile := flag.String("file", "", "upload image from local file")
	flag.Parse()

	if *imageSrc == "" && *imageFile == "" {
		log.Fatalf("image source error: flag http or file is empty")
	}

	var imageData []byte
	var err error
	if *imageSrc != "" {
		imageData, err = requestImage(*imageSrc)
		if err != nil {
			log.Fatalf("request image data error: %v", err)
		}
	}

	if *imageFile != "" {
		imageData, err = ioutil.ReadFile(*imageFile)
		if err != nil {
			log.Fatalf("read image file error: %v", err)
		}
	}

	cosBucket := os.Getenv("COS_BUCKET")
	secretID := os.Getenv("COS_SECRETID")
	secretKey := os.Getenv("COS_SECRETKEY")

	c, err := newCosClient(cosBucket, secretID, secretKey)
	if err != nil {
		log.Fatalf("new client for cos failed: %v", err)
	}

	fileURL, err := c.UploadWithHTTPSource(imageData)
	if err != nil {
		log.Fatalf("upload http image error: %v", err)
	}
	log.Println("upload file url: ", fileURL)
}
