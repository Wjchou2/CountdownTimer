let countdownEndDate = new Date("September 30, 2025 21:24:00");

const sec1 = document.getElementById("sec1");
const sec2 = document.getElementById("sec2");
let now, millisecondsLeft, totalSeconds, days, hours, minutes, seconds;
function calculateTime() {
    now = new Date();
    millisecondsLeft = countdownEndDate - now;
    totalSeconds = Math.floor(millisecondsLeft / 1000);
    days = Math.floor(totalSeconds / (3600 * 24));
    months = Math.floor(days / 30);
    days = days - months * 30;
    hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = totalSeconds % 60;
    seconds = seconds.toString().padStart(2, "0");
}
setInterval(() => {
    calculateTime();

    flipAndChangeNumber(sec1, seconds.charAt(1));
    sec1.innerHTML = seconds.charAt(1);
    sec2.innerHTML = seconds.charAt(0);

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
    thingToFlip.style.transition = "transform 0.25s linear";
    thingToFlip.style.transform = "rotateY(90deg)";
    setTimeout(() => {
        // instantly jump to backside
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
