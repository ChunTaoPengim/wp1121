# Web Programming HW#4
按照老師的readme來做
### 1. install dependencies
使用yarn安裝

    cd hw3
    yarn
    
### 2. Setting environment
在`\hw3`中建立`.env.local`檔
`.env.local`檔中請照下方的格式設定

    POSTGRES_URL = postgres://postgres:postgres@localhost:5432/hw4
    PUSHER_ID=
    NEXT_PUBLIC_PUSHER_KEY=
    PUSHER_SECRET=
    NEXT_PUBLIC_PUSHER_CLUSTER=

    AUTH_SECRET=<this can be any random string>
    AUTH_GITHUB_ID=
    AUTH_GITHUB_SECRET=
### 3. run the server(請確認docker desktop已開啟)

    docker compose up -d
    yarn migrate
### 4. open frontend

    yarn dev

### 5. lint 檢查
使用`yarn lint`

    yarn lint

如果發生錯誤，也可以照老師的readme來設定，yarn的時候可能會等蠻久的，請見諒。
大部分的功能應該都有實作，搜尋使用者是用成在首頁會有一欄代表除了自己之外的使用者，點擊加號就可建立與該使用者的聊天室，如果該聊天室已建立，就會回到剛開始沒有進入聊天室的樣子。收回只有做從資料庫刪除。

pass的條件是有一個理由pass就pass，下學期真的課業壓力比較重，希望可以高抬貴手。
## 完美要求
無