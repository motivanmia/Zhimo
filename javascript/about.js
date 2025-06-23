document.addEventListener('DOMContentLoaded', () => {
    let textEl = document.querySelectorAll('.content p');

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
            delay += 30; // 每次遞增延遲時間，控制動畫速度。這個值越小，動畫越快。
        }
    });
});