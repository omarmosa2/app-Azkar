document.addEventListener("DOMContentLoaded", () => {
    // تحديد جميع أزرار العداد
    const buttons = document.querySelectorAll(".azkar-counter, .btn");

    // تحميل الحالة المحفوظة
    loadSavedState();

    buttons.forEach(button => {
        // إضافة العدد الأصلي كخاصية
        if (!button.hasAttribute('data-original-count')) {
            const originalCount = button.getAttribute('data-count') || button.textContent;
            button.setAttribute('data-original-count', originalCount);
        }

        button.addEventListener("click", () => {
            handleButtonClick(button);
        });
    });

    // إضافة زر إعادة تعيين عام
    addResetButton();
});

function handleButtonClick(button) {
    let count = parseInt(button.textContent);
    const buttonId = button.id || `btn_${Array.from(button.parentNode.children).indexOf(button)}`;

    if (isNaN(count)) {
        // إذا كان النص "تم" أو "قراءة"، لا نفعل شيئاً
        return;
    }

    if (count > 1) {
        count--;
        button.textContent = count;

        // تأثير بصري
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);

    } else {
        // إنهاء الذكر
        button.textContent = "تم ✓";
        button.classList.remove('btn-primary');
        button.classList.add('btn-success');
        button.disabled = true;

        // تأثير بصري للإنجاز
        button.style.transform = 'scale(1.05)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);

        // تأثير اهتزاز (إذا كان متاحاً)
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    // حفظ الحالة
    saveButtonState(buttonId, button.textContent, button.disabled);
}

function saveButtonState(buttonId, text, disabled) {
    const state = {
        text: text,
        disabled: disabled,
        timestamp: Date.now()
    };
    localStorage.setItem(`azkar_${buttonId}`, JSON.stringify(state));
}

function loadSavedState() {
    const buttons = document.querySelectorAll(".azkar-counter, .btn");

    buttons.forEach(button => {
        const buttonId = button.id || `btn_${Array.from(button.parentNode.children).indexOf(button)}`;
        const savedState = localStorage.getItem(`azkar_${buttonId}`);

        if (savedState) {
            const state = JSON.parse(savedState);
            const now = Date.now();
            const oneDay = 24 * 60 * 60 * 1000; // 24 ساعة بالميلي ثانية

            // إعادة تعيين الحالة إذا مر أكثر من يوم
            if (now - state.timestamp > oneDay) {
                localStorage.removeItem(`azkar_${buttonId}`);
                return;
            }

            button.textContent = state.text;
            button.disabled = state.disabled;

            if (state.disabled) {
                button.classList.remove('btn-primary');
                button.classList.add('btn-success');
            }
        }
    });
}

function addResetButton() {
    // التحقق من وجود أزرار مكتملة
    const completedButtons = document.querySelectorAll(".azkar-counter:disabled, .btn:disabled");

    if (completedButtons.length > 0) {
        const container = document.querySelector('.azkar-container, .container');
        if (container && !document.getElementById('resetAllButton')) {
            const resetButton = document.createElement('button');
            resetButton.id = 'resetAllButton';
            resetButton.className = 'btn btn-outline-warning btn-sm mt-3';
            resetButton.textContent = '🔄 إعادة تعيين جميع الأذكار';
            resetButton.style.position = 'fixed';
            resetButton.style.bottom = '20px';
            resetButton.style.left = '20px';
            resetButton.style.zIndex = '1000';

            resetButton.addEventListener('click', () => {
                if (confirm('هل أنت متأكد من إعادة تعيين جميع الأذكار؟')) {
                    resetAllAzkar();
                }
            });

            document.body.appendChild(resetButton);
        }
    }
}

function resetAllAzkar() {
    const buttons = document.querySelectorAll(".azkar-counter, .btn");

    buttons.forEach(button => {
        const originalCount = button.getAttribute('data-original-count');
        const buttonId = button.id || `btn_${Array.from(button.parentNode.children).indexOf(button)}`;

        if (originalCount) {
            button.textContent = originalCount;
            button.disabled = false;
            button.classList.remove('btn-success');
            button.classList.add('btn-primary');

            // حذف الحالة المحفوظة
            localStorage.removeItem(`azkar_${buttonId}`);
        }
    });

    // إزالة زر إعادة التعيين
    const resetButton = document.getElementById('resetAllButton');
    if (resetButton) {
        resetButton.remove();
    }

    // إعادة إضافة زر إعادة التعيين إذا لزم الأمر
    setTimeout(addResetButton, 100);
}

// إضافة دعم لاختصارات لوحة المفاتيح
document.addEventListener('keydown', (event) => {
    if (event.key === 'r' && event.ctrlKey) {
        event.preventDefault();
        const resetButton = document.getElementById('resetAllButton');
        if (resetButton) {
            resetButton.click();
        }
    }
});

// تحديث زر إعادة التعيين عند تغيير الحالة
setInterval(() => {
    const resetButton = document.getElementById('resetAllButton');
    const completedButtons = document.querySelectorAll(".azkar-counter:disabled, .btn:disabled");

    if (completedButtons.length > 0 && !resetButton) {
        addResetButton();
    } else if (completedButtons.length === 0 && resetButton) {
        resetButton.remove();
    }
}, 1000);

