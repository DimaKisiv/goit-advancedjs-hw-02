import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';
const refs = {
  buttonStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  picker: document.querySelector('#datetime-picker')
};

let timer = null;
let userSelectedDate = null;

let picker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    flarpickrClosed(selectedDates);
  },
});

refs.buttonStart.addEventListener('click', function () {
  if (timer) clearInterval(timer);
  updateTimer();
  timer = setInterval(updateTimer, 1000);
  refs.buttonStart.disabled = true;
  refs.picker.disabled = true;
});

function flarpickrClosed(selectedDates) {
  let date = new Date(selectedDates[0]);
  if (date <= Date.now()) {
    iziFutureDateError();
    refs.buttonStart.disabled = true;
    clearInterval(timer);
    setTimerDisplay(0, 0, 0, 0);
  } else {
    userSelectedDate = date;
    refs.buttonStart.disabled = false;
  }
}

function updateTimer() {
  const timeLeft = userSelectedDate - Date.now();
  if (timeLeft <= 0) {
    clearInterval(timer);
    refs.buttonStart.disabled = true;
    setTimerDisplay(0, 0, 0, 0);
    refs.picker.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  setTimerDisplay(days, hours, minutes, seconds);
}

function setTimerDisplay(days, hours, minutes, seconds) {
  refs.days.textContent = String(days).padStart(2, '0');
  refs.hours.textContent = String(hours).padStart(2, '0');
  refs.minutes.textContent = String(minutes).padStart(2, '0');
  refs.seconds.textContent = String(seconds).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function iziFutureDateError() {
  iziToast.error({
    title: '💀 Wrong Date!',
    message: 'Please choose a date in the future',
    theme: 'dark',
    position: 'topRight',
    timeout: 5000,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutUp',
    progressBarColor: 'red',
    backgroundColor: 'black',
    titleColor: 'red',
    messageColor: 'white',
    iconColor: 'red',
    close: true,
  });
}
