document.addEventListener('DOMContentLoaded', () => {
    let textEl = document.querySelectorAll('.banner-content h1, .banner-content p');

    let delay = 10;

    textEl.forEach(element => {
        let textContent = element.textContent;
        element.innerHTML = '';

        for (let i = 0; i < textContent.length; i++) {
            let charSpan = document.createElement('span'); // 創建一個新的<span>元素
            charSpan.classList.add('char');
            charSpan.textContent = textContent[i];
            element.appendChild(charSpan); // 將<span>添加到當前元素中

            // 使用setTimeout為每個字元設置動畫延遲
            setTimeout(() => {
                charSpan.style.opacity = '1';
            }, delay);
            delay += 100; // 每次遞增延遲時間，控制動畫速度。這個值越小，動畫越快。
        }
    });
});

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
});
