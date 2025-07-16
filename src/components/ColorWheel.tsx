import { useState } from 'react';
import './ColorWheel.css';

// 定義所有顏色，包含名稱和色碼
const colors = [
  { name: '紅', code: '#ff595e' },
  { name: '粉', code: '#ffa8d9' },
  { name: '橘', code: '#ff924c' },
  { name: '黃', code: '#ffda33' },
  { name: '綠', code: '#8ac926' },
  { name: '藍', code: '#1982c4' },
  { name: '紫', code: '#b28dff' },
  { name: '褐', code: '#b58463' },
  { name: '白', code: '#ffffff' },
  { name: '灰', code: '#aaaaaa' },
  { name: '黑', code: '#1c1c1c' },
];

// 計算扇形路徑的函數
const calculateArcPath = (startAngle: number, endAngle: number, radius: number) => {
  // 將角度轉換為弧度
  const start = (startAngle - 90) * Math.PI / 180;
  const end = (endAngle - 90) * Math.PI / 180;
  
  // 計算起點和終點座標
  const startX = 200 + radius * Math.cos(start);
  const startY = 200 + radius * Math.sin(start);
  const endX = 200 + radius * Math.cos(end);
  const endY = 200 + radius * Math.sin(end);
  
  // 判斷是否需要畫大弧
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  
  // 返回 SVG 路徑
  return `M 200 200 L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
};

// 轉盤組件：整個轉盤的主要功能
const ColorWheel: React.FC = () => {
  // 使用 React 的 state 來記錄轉盤的旋轉角度
  const [rotation, setRotation] = useState(0);
  // 記錄轉盤是否正在旋轉中
  const [isSpinning, setIsSpinning] = useState(false);

  // 處理點擊轉盤時的旋轉功能
  const spinWheel = () => {
    // 如果正在旋轉中，不做任何事
    if (isSpinning) return;
    
    // 設定轉盤為旋轉狀態
    setIsSpinning(true);
    // 產生隨機旋轉角度（至少轉 4 圈）
    const randomRotation = Math.floor(Math.random() * 360) + 1440;
    // 更新轉盤的旋轉角度
    setRotation(prevRotation => prevRotation + randomRotation);
    
    // 3 秒後停止旋轉
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  };

  const segmentAngle = 360 / colors.length;

  return (
    <div className="wheel-container">
      {/* 整個轉盤區域 */}
      <div 
        className={`color-wheel ${isSpinning ? 'spinning' : ''}`} 
        style={{ transform: `rotate(${rotation}deg)` }}
        onClick={spinWheel}
      >
        <svg width="400" height="400" viewBox="0 0 400 400">
          {colors.map((color, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            return (
              <path
                key={color.name}
                d={calculateArcPath(startAngle, endAngle, 200)}
                fill={color.code}
              />
            );
          })}
        </svg>
      </div>
      {/* 指向當前選中顏色的指針 */}
      <div className="pointer" />
    </div>
  );
};

export default ColorWheel; 