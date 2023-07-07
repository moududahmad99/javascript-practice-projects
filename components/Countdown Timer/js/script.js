setInterval(function () {

    const targetTime = new Date('2024-01-01 12:00:00 AM').getTime();
    const currentTime = new Date().getTime();
    const remainingTime = targetTime - currentTime

    const years = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 30.42) % 12);
    const days = Math.floor((remainingTime / (1000 * 60 * 60 * 24)) % 30.42);
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);


    const timerElement = document.getElementById('timer')
    timerElement.innerHTML = years + 'y ' + months + 'm ' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

    if (remainingTime <= 0) {
        clearInterval(timer)
        timer.innerHTML = 'Countdown Finished!'
    }

    
    
}, 1000)

function goBack() {
    history.back()
}