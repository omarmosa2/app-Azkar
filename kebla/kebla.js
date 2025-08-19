// إحداثيات الكعبة في مكة المكرمة
const kaabaLatitude = 21.4225;
const kaabaLongitude = 39.8262;

// دالة للحصول على الموقع الجغرافي للمستخدم
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("الجهاز لا يدعم تحديد الموقع.");
    }
}

// دالة لعرض الموقع الجغرافي
function showPosition(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    // حساب زاوية القبلة باستخدام معادلة حسابية
    const qiblaAngle = calculateQiblaAngle(userLatitude, userLongitude, kaabaLatitude, kaabaLongitude);
    
    // تحديث البوصلة والاتجاه
    updateCompass(qiblaAngle);
    document.getElementById("direction").innerText = `اتجاه القبلة: ${qiblaAngle.toFixed(2)} درجة`;
}

// دالة لحساب زاوية القبلة
function calculateQiblaAngle(lat1, lon1, lat2, lon2) {
    const radian = Math.PI / 180; // تحويل الدرجات إلى راديان
    const deltaLon = (lon2 - lon1) * radian;

    const lat1Rad = lat1 * radian;
    const lat2Rad = lat2 * radian;

    const y = Math.sin(deltaLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLon);
    const angle = Math.atan2(y, x) / radian;

    return (angle + 360) % 360; // إعادة الزاوية لتكون بين 0 و 360 درجة
}

// دالة لتحديث اتجاه البوصلة
function updateCompass(angle) {
    const needle = document.getElementById("needle");
    needle.style.transform = `rotate(${angle}deg)`;
}

// دالة للتعامل مع الأخطاء عند تحديد الموقع
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("لم يتم السماح بالوصول إلى الموقع.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("الموقع غير متاح.");
            break;
        case error.TIMEOUT:
            alert("انتهت مهلة الوصول إلى الموقع.");
            break;
        default:
            alert("حدث خطأ غير معروف.");
    }
}
