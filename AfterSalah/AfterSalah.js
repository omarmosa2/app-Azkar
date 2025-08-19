document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let count = parseInt(button.getAttribute("data-count"));

            // عندما يكون العدد أكبر من 1 نبدأ العد التنازلي
            if (count > 1) {
                button.textContent = count - 1;
                button.setAttribute("data-count", count - 1); // تحديث العدد داخل الزر
            } else {
                // عند الوصول للعدد 1، نعرض "تم" ونعطل الزر
                button.textContent = "تم";
                button.disabled = true;
                button.style.backgroundColor = "#27ae60"; // اللون الأخضر
                button.style.cursor = "default"; // تعطيل المؤشر
            }
        });
    });
});
