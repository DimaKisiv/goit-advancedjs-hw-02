import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = parseInt(form.elements.delay.value);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise
      .then(delay => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          theme: 'dark',
          position: 'topRight',
          timeout: 5000,
          transitionIn: 'fadeInDown',
          transitionOut: 'fadeOutUp',
          progressBarColor: 'green',
          backgroundColor: 'black',
          titleColor: 'green',
          messageColor: 'white',
          iconColor: 'red',
          close: true,
        });
      })
      .catch(delay => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          position: 'topRight',
          theme: 'light',
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
      });
  });
});
