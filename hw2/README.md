# Web Programming HW#1
按照老師的readme來做
### 1. install dependencies
使用yarn安裝(前端也要因為有使用lint)

    cd backend
    yarn
和
    cd frontend
    yarn
### 2. Setting environment
在`\backend`中建立`.env`檔
`.env`檔中請照下方的格式設定

    PORT=8000
    MONGO_URL = 
### 3. run the server
有時連線會有問題，如果出現`ETIMEOUT`，請多試幾次`yarn start`

    cd backend
    yarn start
### 4. open frontend

    cd frontend
    yarn dev

### 5. lint 檢查
使用`yarn lint`

    cd backend
    yarn lint
和

    cd frontend
    yarn lint

如果發生錯誤，也可以照老師的readme來設定lint
，大部分的功能應該都有實作，因為全部都是自己手刻，所以實在無法跟老師的一樣確保不會出錯，有些小問題或功能可能出錯，希望您可以高抬貴手，辛苦了，謝謝。
## 完美要求
1. 如果沒有輸入標題、名稱等會出現提示
2. 資料庫中如果已經有該首歌或該播放清單，會出現提示
