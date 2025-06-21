document.addEventListener('DOMContentLoaded', () => {
    const hoverItem = document.getElementById('hover-item');
    const originalLine = document.getElementById('original-line');
    const extensionParts = document.querySelectorAll('.extension-part');

    // 用於儲存動畫計時器的陣列，以便在需要時清除
    let enterTimeouts = [];
    let leaveTimeouts = [];

    // 定義每個線段動畫開始的延遲時間（毫秒）
    const delayTime = 50;

    // 偵測螢幕寬度的 Media Query
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    // 函數：處理滑鼠進入事件
    function handleMouseEnter() {
        leaveTimeouts.forEach(clearTimeout);
        leaveTimeouts = [];

        extensionParts.forEach((part, index) => {
            const timeoutId = setTimeout(() => {
                part.style.strokeDashoffset = '0';
                part.style.opacity = '1';
            }, index * delayTime);
            enterTimeouts.push(timeoutId);
        });
    }

    // 函數：處理滑鼠離開事件
    function handleMouseLeave() {
        enterTimeouts.forEach(clearTimeout);
        enterTimeouts = [];

        Array.from(extensionParts).reverse().forEach((part, index) => {
            const partLength = part.getTotalLength();
            const timeoutId = setTimeout(() => {
                part.style.strokeDashoffset = partLength;
                part.style.opacity = '0';
            }, index * delayTime);
            leaveTimeouts.push(timeoutId);
        });
    }

    // 函數：初始化延伸部分的狀態 (僅在需要 hover 效果時才隱藏)
    function initializeExtensionPartsState(enableHover) {
        extensionParts.forEach(part => {
            const partLength = part.getTotalLength();
            part.style.strokeDasharray = partLength; // dasharray 總是設為總長度

            if (enableHover) {
                // 在需要 hover 效果時（大螢幕），初始隱藏
                part.style.strokeDashoffset = partLength;
                part.style.opacity = '0';
            } else {
                // 在不需要 hover 效果時（小螢幕），直接顯示
                part.style.strokeDashoffset = '0';
                part.style.opacity = '1';
            }
            part.style.stroke = '#2B333E'; // 始終保持預設顏色
        });

        if (originalLine) {
            originalLine.style.stroke = '#2B333E'; // 始終保持預設顏色
        }
    }

    // 函數：根據螢幕大小啟用或禁用 hover 效果
    function toggleHoverEffects() {
        if (mediaQuery.matches) { // 當螢幕寬度 >= 1024px
            // 啟用事件監聽器
            hoverItem.addEventListener('mouseenter', handleMouseEnter);
            hoverItem.addEventListener('mouseleave', handleMouseLeave);

            // 初始化為「等待 hover 觸發」狀態
            initializeExtensionPartsState(true);
        } else { // 當螢幕寬度 < 1024px
            // 禁用事件監聽器
            hoverItem.removeEventListener('mouseenter', handleMouseEnter);
            hoverItem.removeEventListener('mouseleave', handleMouseLeave);

            // 清除任何可能正在執行的動畫計時器
            enterTimeouts.forEach(clearTimeout);
            leaveTimeouts.forEach(clearTimeout);
            enterTimeouts = [];
            leaveTimeouts = [];

            // 初始化為「始終顯示」狀態
            initializeExtensionPartsState(false);
        }
    }

    // 首次加載時檢查螢幕大小並設定效果
    toggleHoverEffects();

    // 監聽螢幕尺寸變化，當符合 media query 條件時重新設定效果
    mediaQuery.addListener(toggleHoverEffects);




    // // 初始化每個延伸部分的線條：設定 stroke-dasharray 和 stroke-dashoffset 使其隱藏
    // extensionParts.forEach(part => {
    //     const partLength = part.getTotalLength();
    //     part.style.strokeDasharray = partLength;
    //     part.style.strokeDashoffset = partLength; // 初始完全隱藏
    //     part.style.opacity = '0'; // 確保初始不可見
    // });

    // // 監聽 hoverItem 的 mouseenter 事件 (鼠標進入時)
    // hoverItem.addEventListener('mouseenter', () => {
    //     // 清除任何尚未執行的離開動畫計時器
    //     leaveTimeouts.forEach(clearTimeout);
    //     leaveTimeouts = [];

    //     // 依序動畫每個延伸部分
    //     extensionParts.forEach((part, index) => {
    //         const timeoutId = setTimeout(() => {
    //             part.style.strokeDashoffset = '0'; // 從頭開始繪製
    //             part.style.opacity = '1';         // 顯示
    //         }, index * delayTime); // 根據索引增加延遲
    //         enterTimeouts.push(timeoutId); // 儲存計時器 ID
    //     });
    // });

    // // 監聽 hoverItem 的 mouseleave 事件 (鼠標離開時)
    // hoverItem.addEventListener('mouseleave', () => {
    //     // 清除任何尚未執行的進入動畫計時器
    //     enterTimeouts.forEach(clearTimeout);
    //     enterTimeouts = [];

    //     // 依序逆向動畫每個延伸部分，使其依序縮回
    //     // 將 NodeList 轉換為陣列，然後反轉，以便從最後一個部分開始隱藏
    //     Array.from(extensionParts).reverse().forEach((part, index) => {
    //         const partLength = part.getTotalLength(); // 重新獲取長度以防萬一
    //         const timeoutId = setTimeout(() => {
    //             part.style.strokeDashoffset = partLength; // 縮回
    //             part.style.opacity = '0';                 // 隱藏
    //         }, index * delayTime); // 延遲基於逆向索引
    //         leaveTimeouts.push(timeoutId); // 儲存計時器 ID
    //     });
    // });
});
