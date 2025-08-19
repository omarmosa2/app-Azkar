const prayerTimesContainer = document.getElementById("prayerTimesContainer");

// دالة لتحويل الوقت إلى تنسيق 12 ساعة مع إضافة فرق التوقيت لتوقيت سوريا
function convertTo12HourFormatWithOffset(time24, offset = 3) {
    let [hours, minutes] = time24.split(":").map(Number);
    hours = (hours + offset) % 24;

    const period = hours >= 12 ? "م" : "ص";
    const hours12 = (hours % 12) || 12;
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

// دالة لجلب مواقيت الصلاة باستخدام API
function fetchPrayerTimes() {
    const apiUrl = "https://api.aladhan.com/v1/timingsByCity?city=Damascus&country=Syria&method=4";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const timings = data.data.timings;
            displayPrayerTimes(timings);
        })
        .catch(error => {
            prayerTimesContainer.innerHTML = "<p>فشل في تحميل مواقيت الصلاة</p>";
            console.error("Error fetching prayer times:", error);
        });
}

// دالة لعرض مواقيت الصلاة في الصفحة مع التحويل إلى توقيت سوريا
function displayPrayerTimes(timings) {
    const offset = 0; // فرق التوقيت لتوقيت سوريا (GMT+3)
    prayerTimesContainer.innerHTML = `
        <p>الفجر: ${convertTo12HourFormatWithOffset(timings.Fajr, offset)}</p>
        <p>الشروق: ${convertTo12HourFormatWithOffset(timings.Sunrise, offset)}</p>
        <p>الظهر: ${convertTo12HourFormatWithOffset(timings.Dhuhr, offset)}</p>
        <p>العصر: ${convertTo12HourFormatWithOffset(timings.Asr, offset)}</p>
        <p>المغرب: ${convertTo12HourFormatWithOffset(timings.Maghrib, offset)}</p>
        <p>العشاء: ${convertTo12HourFormatWithOffset(timings.Isha, offset)}</p>
    `;
}

// جلب مواقيت الصلاة عند تحميل الصفحة
fetchPrayerTimes();
