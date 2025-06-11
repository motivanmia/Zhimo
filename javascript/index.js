document.addEventListener('DOMContentLoaded', () => {
    const hoverItem = document.getElementById('hover-item');
    const originalLine = document.getElementById('original-line');
    const extensionParts = document.querySelectorAll('.extension-part');

    // 用於儲存動畫計時器的陣列，以便在需要時清除
    let enterTimeouts = [];
    let leaveTimeouts = [];

    // 定義每個線段動畫開始的延遲時間（毫秒）
    const delayTime = 50;

    // 初始化每個延伸部分的線條：設定 stroke-dasharray 和 stroke-dashoffset 使其隱藏
    extensionParts.forEach(part => {
        const partLength = part.getTotalLength();
        part.style.strokeDasharray = partLength;
        part.style.strokeDashoffset = partLength; // 初始完全隱藏
        part.style.opacity = '0'; // 確保初始不可見
    });

    // 監聽 hoverItem 的 mouseenter 事件 (鼠標進入時)
    hoverItem.addEventListener('mouseenter', () => {
        // 清除任何尚未執行的離開動畫計時器
        leaveTimeouts.forEach(clearTimeout);
        leaveTimeouts = [];

        // 依序動畫每個延伸部分
        extensionParts.forEach((part, index) => {
            const timeoutId = setTimeout(() => {
                part.style.strokeDashoffset = '0'; // 從頭開始繪製
                part.style.opacity = '1';         // 顯示
            }, index * delayTime); // 根據索引增加延遲
            enterTimeouts.push(timeoutId); // 儲存計時器 ID
        });
    });

    // 監聽 hoverItem 的 mouseleave 事件 (鼠標離開時)
    hoverItem.addEventListener('mouseleave', () => {
        // 清除任何尚未執行的進入動畫計時器
        enterTimeouts.forEach(clearTimeout);
        enterTimeouts = [];

        // 依序逆向動畫每個延伸部分，使其依序縮回
        // 將 NodeList 轉換為陣列，然後反轉，以便從最後一個部分開始隱藏
        Array.from(extensionParts).reverse().forEach((part, index) => {
            const partLength = part.getTotalLength(); // 重新獲取長度以防萬一
            const timeoutId = setTimeout(() => {
                part.style.strokeDashoffset = partLength; // 縮回
                part.style.opacity = '0';                 // 隱藏
            }, index * delayTime); // 延遲基於逆向索引
            leaveTimeouts.push(timeoutId); // 儲存計時器 ID
        });
    });
});