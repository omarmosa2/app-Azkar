let count = 0;
const counter = document.getElementById("counter");
const incrementButton = document.getElementById("incrementButton");
const decrementButton = document.getElementById("decrementButton");
const resetButton = document.getElementById("resetButton");

// تحميل العداد المحفوظ
window.addEventListener('load', () => {
    const savedCount = localStorage.getItem('azkarCounter');
    if (savedCount) {
        count = parseInt(savedCount);
        updateCounter();
    }
});

// دالة تحديث العداد
function updateCounter() {
    counter.textContent = count;
    // حفظ العداد في التخزين المحلي
    localStorage.setItem('azkarCounter', count);

    // إضافة تأثير بصري
    counter.style.transform = 'scale(1.1)';
    setTimeout(() => {
        counter.style.transform = 'scale(1)';
    }, 150);
}

// زر الإضافة
incrementButton.addEventListener("click", () => {
    count++;
    updateCounter();

    // تأثير صوتي (اختياري)
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
});

// زر التقليل
decrementButton.addEventListener("click", () => {
    if (count > 0) {
        count--;
        updateCounter();
    }
});

// زر إعادة التعيين
resetButton.addEventListener("click", () => {
    if (confirm('هل أنت متأكد من إعادة تعيين العداد؟')) {
        count = 0;
        updateCounter();
    }
});

// اختصارات لوحة المفاتيح
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case ' ':
        case 'Enter':
            event.preventDefault();
            incrementButton.click();
            break;
        case 'Backspace':
            event.preventDefault();
            decrementButton.click();
            break;
        case 'r':
        case 'R':
            if (event.ctrlKey) {
                event.preventDefault();
                resetButton.click();
            }
            break;
    }
});
