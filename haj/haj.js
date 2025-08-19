
function incrementCount(dhikrType) {
    const countElement = document.getElementById(`${dhikrType}-count`);
    let currentCount = parseInt(countElement.innerText);
    countElement.innerText = currentCount + 1;
}
