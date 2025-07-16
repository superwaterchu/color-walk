// 引入必要的程式碼
import ColorWheel from './components/ColorWheel'
import './App.css'

// App 組件：這是整個應用的主要組件
function App() {
  return (
    // 最外層的容器，使用 'app' 這個 CSS class 來設定樣式
    <div className="app">
      {/* 網頁標題：你可以修改這裡的文字來改變標題 */}
      <h1>Let's Color Walk</h1>

      {/* 說明文字：你可以修改這裡的文字來改變使用說明 */}
      <p>今天想拍什麼顏色呢</p>

      {/* 轉盤組件：這會顯示顏色轉盤 */}
      <ColorWheel />
    </div>
  )
}

// 導出 App 組件，讓其他檔案可以使用它
export default App
