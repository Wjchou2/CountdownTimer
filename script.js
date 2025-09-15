let countdownEndDate = new Date("September 30, 2025 21:24:00");

const textLabel = document.getElementById("countdown");
setInterval(() => {
    let now = new Date();

    let millisecondsLeft = countdownEndDate - now; // milliseconds remaining

    const totalSeconds = Math.floor(millisecondsLeft / 1000);

    let days = Math.floor(totalSeconds / (3600 * 24));
    const months = Math.floor(days / 30);
    days = days - months * 30;

    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    textLabel.innerHTML = `${months} Months, ${days} Days, ${hours
        .toString()
        .padStart(2, "0")} Hours, ${minutes
        .toString()
        .padStart(2, "0")} Minutes, ${seconds
        .toString()
        .padStart(2, "0")} Seconds, Until <br/> ${countdownEndDate}`;
}, 1);
