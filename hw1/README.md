# Web Programming HW#1
按照老師的readme來做
1. ### install dependencies
使用yarn安裝(前端也要因為有使用lint)

    cd backend
    yarn
和
    cd frontend
    yarn
### 2. install dependencies
在`\backend`中建立`.env`檔
`.env`檔中請照下方的格式設定

    PORT=8000
    MONGO_URL = 
3. ### run the server
有時連線會有問題，如果出現`ETIMEOUT`，請多試幾次`yarn start`

    cd backend
    yarn start
4. ### open frontend
請在`frontend`資料夾中找到`index.html`並點擊兩次打開

5. ### lint 檢查
使用`yarn lint`

    cd backend
    yarn lint
和

    cd frontend
    yarn lint
如果發生錯誤，也可以照老師的readme來設定lint

## 完美要求
1. 畫面右上方會出現篩選字樣的按鈕，按下去即可就各類別進行篩選，None表示不篩選
2. 新增的方式是透過選擇一張日期表的方式，因此不會有非法的輸入，如果不輸入日期，系統也不會產生新的diary
