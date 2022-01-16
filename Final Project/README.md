# Teamder --台大組員媒合系統
![GITHUB](https://i.imgur.com/6L9QzMm.png)
這是一個幫助台大學生找到組員的網站。我們一開始設想了DB的架構，如圖顯示
![GITHUB](https://i.imgur.com/bbdZ2pF.png)

## 功能簡介
#### 1. 帳號註冊
提供個人資訊，方便組員找到對方
#### 2. 建立徵詢組員貼文
需求人數，目前人數，與已申請人士（尚未實作)，以及課號，課名等等，以供搜尋
#### 3. 搜尋貼文 (尚有bug)
透過條件搜尋貼文
#### 4. 查看自己的發文紀錄
可以看見自己發過的文章
#### 5. 留言功能 (有bug，無法顯示)
可以在貼文下方留言
#### 6. 查看別人的個人頁面(尚缺UI)
常看別人的個人資訊
#### 7. 編輯自己的個人頁面
可以編輯個人的頁面
#### 8. 申請加入一個隊伍 （尚未實作）
發文者可以查看有誰申請 並同意他人加入

## How to run it (localhost)
### 1. clone the repository
### 2. cd to your local directory
### 3. execute the folloing on your command line tool (npm if you want ;))
    yarn install
### Notice: the command should be excuted both in frontend/ and backend/
### 4. run 'yarn start' in Teamder/
    yarn start
### 5. run 'yarn server' in Teamder/
    yarn server
### 6. Done! you can now see the website on localhost:3000

## 各組員之負責項目：
#### B09705016陳瑾叡
Deploy（前後端分離）, Model Schema, Comment,Request後端實作,前後端連接支援
#### B09705049張天瑋
前端頁面刻畫(SignIn SignUp PersonalPage RequestPage CreateNewRequest)，排版美化與RWD，註冊登入系統，User Schema前後端功能實作(歷史貼文、個人資料)
#### B09502144郭力權
前端頁面刻畫，排版，search功能實作，PPT，錄影片報告

## Deployed repositories 
### Frontend:
    https://github.com/kogby/Teamder_frontend
### Backend:
    https://github.com/kogby/Teamder_backend
## Deployed Websites
    https://teamder-ntu.herokuapp.com/

## 心得
整體而言，這次專題我們對於一個功能導向的網站有了明確的設計與架構，曾經看到NTU Rating，覺得這樣實用的網站非常有助於人們，但很可惜的是，我們礙於期限將至，而且諸多技術都是頭一次完全實作，無法將全部功能實作完成，且有許多功能是已經做到一半的，因此我們未來將繼續去修改網站，並改良．不過，在製作的過程中，也很明確的瞭解到了一個網站的運作，以及我們彼此之間合作的步調與git的協作，都是一次難得的經驗．

