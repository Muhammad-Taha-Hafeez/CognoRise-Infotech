document.addEventListener('DOMContentLoaded', () => {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const targetTimeInput = document.getElementById('target-time');
    const setTargetButton = document.getElementById('set-target');

    let countdownInterval;
    let targetDate;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            daysElement.innerHTML = '0';
            hoursElement.innerHTML = '0';
            minutesElement.innerHTML = '0';
            secondsElement.innerHTML = '0';
            alert('Countdown finished');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.innerHTML = days;
        hoursElement.innerHTML = hours;
        minutesElement.innerHTML = minutes;
        secondsElement.innerHTML = seconds;
    }

    function startCountdown() {
        clearInterval(countdownInterval);
        countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    setTargetButton.addEventListener('click', () => {
        const targetTime = targetTimeInput.value;
        if (targetTime) {
            targetDate = new Date(targetTime).getTime();
            startCountdown();
        } else {
            alert('Please set a valid date and time.');
        }
    });
});
