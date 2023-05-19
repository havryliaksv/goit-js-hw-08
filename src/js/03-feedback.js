import throttle from 'lodash.throttle';

const STORAGE_KEY_FORMDATA = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input[name = "email"]'),
  message: document.querySelector('textarea[name = "message"]'),
};

savedDataForm();
refs.form.addEventListener('input', throttle(onChahgeFormInput, 500));
refs.form.addEventListener('submit', onSubmitForm);

function onChahgeFormInput() {
  const currentData = new FormData(refs.form);
  const currentDataOut = {};
  currentData.forEach((value, name) => {
    currentDataOut[name] = value;
  });
  localStorage.setItem(STORAGE_KEY_FORMDATA, JSON.stringify(currentDataOut));
}

function savedDataForm() {
  if (localStorage.getItem(STORAGE_KEY_FORMDATA)) {
    refs.email.value = JSON.parse(
      localStorage.getItem(STORAGE_KEY_FORMDATA)
    ).email;
    refs.message.value = JSON.parse(
      localStorage.getItem(STORAGE_KEY_FORMDATA)
    ).message;
  }
}

function onSubmitForm(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const formDataOut = {};
  formData.forEach((value, name) => {
    formDataOut[name] = value;
  });
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY_FORMDATA);
  console.log(formDataOut);
}
