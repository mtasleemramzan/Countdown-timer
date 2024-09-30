// script.js

// Get DOM elements
const countdownForm = document.getElementById('countdown-form');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');
const countdownDisplay = document.getElementById('countdown-display');
const message = document.getElementById('message');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const resetButton = document.getElementById('reset-button');

let countdownInterval;

// Function to calculate and display the countdown
function startCountdown(targetDate) {
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

    // If the countdown is over
    if (distance < 0) {
      clearInterval(countdownInterval);
      countdownDisplay.classList.add('d-none');
      message.classList.remove('d-none');
      message.textContent = "🎉 The countdown has ended!";
    }
  }, 1000);
}

// Event listener for form submission
countdownForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Combine date and time inputs
  const dateValue = dateInput.value;
  const timeValue = timeInput.value;

  if (!dateValue || !timeValue) {
    message.classList.remove('d-none');
    message.textContent = "Please select both date and time.";
    return;
  }

  const targetDate = new Date(`${dateValue}T${timeValue}:00`).getTime();
  const now = new Date().getTime();

  // Validate the selected date
  if (isNaN(targetDate) || targetDate <= now) {
    message.classList.remove('d-none');
    message.textContent = "Please select a valid date and time in the future.";
    return;
  }

  // Hide any previous messages
  message.classList.add('d-none');

  // Show the countdown display
  countdownDisplay.classList.remove('d-none');

  // Clear any existing countdown
  clearInterval(countdownInterval);

  // Start the countdown
  startCountdown(targetDate);
});

// Event listener for reset button
resetButton.addEventListener('click', () => {
  // Clear the countdown
  clearInterval(countdownInterval);

  // Hide the countdown display
  countdownDisplay.classList.add('d-none');

  // Reset the form
  countdownForm.reset();

  // Hide any messages
  message.classList.add('d-none');
});
