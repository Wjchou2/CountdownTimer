// const { json } = require("express/lib/response");

let countdownEndDate = new Date("September 30, 2027 21:24:00");

const setButton = document.getElementById("setButton");
const dateInput = document.getElementById("datetime");
setButton.addEventListener("click", function () {
    countdownEndDate = new Date(dateInput.value);
    localStorage.setItem("savedDate", JSON.stringify(countdownEndDate));
    hidePopup();
});
getStoredDate();
const sec1 = document.getElementById("sec1");
const sec2 = document.getElementById("sec2");
const min1 = document.getElementById("min1");
const min2 = document.getElementById("min2");
const hour1 = document.getElementById("hour1");
const hour2 = document.getElementById("hour2");
const day1 = document.getElementById("day1");
const day2 = document.getElementById("day2");
const month1 = document.getElementById("month1");
const month2 = document.getElementById("month2");
const year1 = document.getElementById("year1");
const year2 = document.getElementById("year2");
let years, months, days, hours, minutes, seconds;
function hidePopup() {
    document.getElementById("overlay").style.opacity = 1;
    setTimeout(() => {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("popup").style.display = "none";
        document.getElementById("overlay").style.opacity = 0;
    }, 100);
}
function showPopup() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay").style.opacity = 1;
    setTimeout(() => {
        document.getElementById("popup").style.display = "block";
    }, 10);
}

function getStoredDate() {
    if (localStorage.getItem("savedDate") != null) {
        countdownEndDate = new Date(
            JSON.parse(localStorage.getItem("savedDate"))
        );
        dateInput.value = countdownEndDate;
    } else {
        dateInput.value = new Date();
    }
}
function calculateTime() {
    const now = new Date();

    years = countdownEndDate.getFullYear() - now.getFullYear();
    months = countdownEndDate.getMonth() - now.getMonth();
    days = countdownEndDate.getDate() - now.getDate();
    hours = countdownEndDate.getHours() - now.getHours();
    minutes = countdownEndDate.getMinutes() - now.getMinutes();
    seconds = countdownEndDate.getSeconds() - now.getSeconds();

    // Adjust negatives
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const prevMonth = new Date(
            countdownEndDate.getFullYear(),
            countdownEndDate.getMonth(),
            0
        ).getDate();
        days += prevMonth;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    seconds = seconds.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");

    hours = hours.toString().padStart(2, "0");
    days = days.toString().padStart(2, "0");
    months = months.toString().padStart(2, "0");
    years = years.toString().padStart(2, "0");
}
setInterval(() => {
    calculateTime();
    flipAndChangeNumber(sec1, seconds.charAt(1));
    flipAndChangeNumber(sec2, seconds.charAt(0));
    flipAndChangeNumber(min1, minutes.charAt(1));
    flipAndChangeNumber(min2, minutes.charAt(0));
    flipAndChangeNumber(hour1, hours.charAt(1));
    flipAndChangeNumber(hour2, hours.charAt(0));
    flipAndChangeNumber(day1, days.charAt(1));
    flipAndChangeNumber(day2, days.charAt(0));
    flipAndChangeNumber(month1, months.charAt(1));
    flipAndChangeNumber(month2, months.charAt(0));
    flipAndChangeNumber(year1, years.charAt(1));
    flipAndChangeNumber(year2, years.charAt(0));

    // sec1.innerHTML = seconds.charAt(1);
    // sec2.innerHTML = seconds.charAt(0);

    // sec2.style.transform = "rotateY(90deg)";
    // textLabel.innerHTML = `${months} Months, ${days} Days, ${hours
    //     .toString()
    //     .padStart(2, "0")} Hours, ${minutes
    //     .toString()
    //     .padStart(2, "0")} Minutes, ${seconds
    //     .toString()
    //     .padStart(2, "0")} Seconds`;
}, 1000);

function flipAndChangeNumber(thingToFlip, newNum) {
    if (newNum == thingToFlip.innerText) {
        return;
    }
    requestAnimationFrame(() => {
        thingToFlip.style.transition = "none";
        thingToFlip.style.transform = "rotateY(0deg)";
    });
    requestAnimationFrame(() => {
        thingToFlip.style.transition = "transform 0.25s linear";
        thingToFlip.style.transform = "rotateY(90deg)";
    });
    setTimeout(() => {
        requestAnimationFrame(() => {
            thingToFlip.style.transition = "none";
            thingToFlip.style.transform = "rotateY(270deg)";
        });
        thingToFlip.innerHTML = newNum;

        requestAnimationFrame(() => {
            setTimeout(() => {
                thingToFlip.style.transition = "transform 0.25s linear";
                thingToFlip.style.transform = "rotateY(360deg)";
            }, 0);
        });
        setTimeout(() => {
            requestAnimationFrame(() => {
                thingToFlip.style.transition = "none";
                thingToFlip.style.transform = "rotateY(0deg)";
            });
        }, 250); // half duration of first animation
    }, 250); // half duration of first animation
}
