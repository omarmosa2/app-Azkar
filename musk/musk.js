function markAsDone(buttonId) {
    const button = document.getElementById(`btn${buttonId}`);
    button.innerText = "تم";
    button.style.backgroundColor = "#4CAF50"; // تغيير اللون إلى الأخضر
    button.disabled = true; // تعطيل الزر بعد الضغط عليه
}