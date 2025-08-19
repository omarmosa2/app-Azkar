const quranContainer = document.getElementById("quranContainer");

// دالة لجلب القرآن الكريم باستخدام API
function fetchQuran() {
    const apiUrl = "https://api.alquran.cloud/v1/quran/quran-uthmani";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK") {
                displaySurahNames(data.data.surahs);
            } else {
                quranContainer.innerHTML = "<p>فشل في تحميل القرآن الكريم</p>";
            }
        })
        .catch(error => {
            quranContainer.innerHTML = "<p>فشل في تحميل القرآن الكريم</p>";
            console.error("Error fetching Quran:", error);
        });
}

// دالة لعرض أسماء السور فقط
function displaySurahNames(surahs) {
    quranContainer.innerHTML = ""; // مسح المحتوى السابق
    surahs.forEach(surah => {
        const surahElement = document.createElement("div");
        surahElement.classList.add("surah");

        const surahTitle = document.createElement("h3");
        surahTitle.textContent = `${surah.englishName} - ${surah.name}`;
        surahTitle.classList.add("surah-title");
        
        // إضافة حدث النقر لعرض الآيات الخاصة بالسورة
        surahTitle.addEventListener("click", () => toggleAyahsDisplay(surah, surahElement));

        surahElement.appendChild(surahTitle);
        quranContainer.appendChild(surahElement);
    });
}

// دالة لعرض جميع الآيات كنص واحد عند النقر على السورة
function toggleAyahsDisplay(surah, surahElement) {
    let ayahsContainer = surahElement.querySelector(".ayahs-container");

    if (ayahsContainer) {
        // إذا كانت الآيات موجودة، قم بإزالتها (إخفاء الآيات)
        ayahsContainer.remove();
    } else {
        // إذا لم تكن موجودة، قم بإنشائها وإضافتها (عرض الآيات)
        ayahsContainer = document.createElement("div");
        ayahsContainer.classList.add("ayahs-container");

        // دمج جميع الآيات في نص واحد
        const allAyahsText = surah.ayahs.map(ayah => ayah.text).join(" ");

        const ayahsTextElement = document.createElement("p");
        ayahsTextElement.textContent = allAyahsText;
        ayahsTextElement.classList.add("ayahs-text");

        ayahsContainer.appendChild(ayahsTextElement);
        surahElement.appendChild(ayahsContainer);
    }
}

// جلب أسماء السور عند تحميل الصفحة
fetchQuran();
