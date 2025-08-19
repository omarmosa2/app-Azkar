// دالة لتحديد الضغط على الذكر
function markAzkar(buttonId) {
    // الحصول على الزر وحالة الذكر
    const button = document.getElementById(buttonId);
    const status = document.getElementById('status' + buttonId.charAt(buttonId.length - 1));

    // التأكد من أن الضغط يكون مرة واحدة فقط
    if (button.innerText !== 'تم') {
        // تغيير النص إلى "تم" وتغيير لون الزر إلى الأخضر
        button.innerText = 'تم';
        button.style.backgroundColor = '#4CAF50';
        status.innerText = 'تم قراءة هذا الذكر';
    }
}
