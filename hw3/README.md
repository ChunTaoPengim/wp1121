# Web Programming HW#3
按照老師的readme來做
### 1. install dependencies
使用yarn安裝

    cd hw3
    yarn
    
### 2. Setting environment
在`\hw3`中建立`.env.local`檔
`.env.local`檔中請照下方的格式設定

    POSTGRES_URL = postgres://postgres:postgres@localhost:5432/hw3
### 3. run the server(請確認docker desktop已開啟)

    docker compose up -d
    yarn migrate
### 4. open frontend

    yarn dev

### 5. lint 檢查
使用`yarn lint`

    yarn lint

如果發生錯誤，也可以照老師的readme來設定，yarn的時候可能會等蠻久的，請見諒。
我把參加退出的功能實作在主葉面，另外切換使用者的時候如果是新增(handle改變)，請重新整理頁面才會是該使用者的參加/未參加，如果handle不變就不用刷新，但有問題的話最好還是重新整理
大部分的功能應該都有實作，有些小問題或功能可能出錯，希望您可以高抬貴手，辛苦了，謝謝。
## 完美要求
無
