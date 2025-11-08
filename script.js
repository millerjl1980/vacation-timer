// --- CUSTOMIZE THESE TWO VALUES! ---
const VACATION_DATE = "2026-05-31T09:00:00"; // The date and time of the vacation
const SECRET_PASSWORD = "boystrip2026";          // The password to access the timer
// ---------------------------------


// --- HTML Elements ---
const loginPage = document.getElementById('login-page');
const timerPage = document.getElementById('timer-page');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');

// --- Timer Display Elements ---
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// --- Login Functionality ---
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from reloading the page

    const enteredPassword = passwordInput.value;

    if (enteredPassword === SECRET_PASSWORD) {
        // Success! Hide login, show timer
        loginPage.classList.add('hidden');
        timerPage.classList.remove('hidden');
    } else {
        // Failure! Show error message
        errorMessage.style.display = 'block';
        passwordInput.value = ''; // Clear the input field
    }
});

// --- Countdown Timer Functionality ---
function updateCountdown() {
    const vacationTime = new Date(VACATION_DATE).getTime();
    const currentTime = new Date().getTime();
    const difference = vacationTime - currentTime;

    if (difference > 0) {
        // Time is still counting down
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Add leading zeros for a clean look (e.g., 09 instead of 9)
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    } else {
        // The countdown has finished!
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        
        // Optional: Change the text when the timer hits zero
        document.getElementById('timer-subtitle').textContent = "TIME FOR VACATION! YAY!";
        
        // Stop the timer from running into the negatives
        clearInterval(countdownInterval);
    }
}

// --- Start the Timer ---
// Run the function once immediately, then every 1000ms (1 second)
updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);