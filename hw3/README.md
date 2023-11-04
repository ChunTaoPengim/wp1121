# Web Programming HW#2
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

如果發生錯誤，也可以照老師的readme來設定lint，yarn的時候可能會等蠻久的，請見諒。
大部分的功能應該都有實作，因為全部都是自己手刻，所以實在無法跟老師的一樣確保不會出錯，有些小問題或功能可能出錯，希望您可以高抬貴手，辛苦了，謝謝。
## 完美要求
1. 如果沒有輸入標題、名稱等會出現提示
2. 資料庫中如果已經有該首歌或該播放清單，會出現提示
