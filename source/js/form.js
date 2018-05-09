(function() {
  var form          = document.querySelector('.review__form');
  var successModal  = document.querySelector('.modal--success');
  var errorModal    = document.querySelector('.modal--error');
  var errorButton   = document.querySelector('.modal__button--error');
  var successButton = document.querySelector('.modal__button--success');

  var name       = document.querySelector('#name');
  var surname    = document.querySelector('#surname');
  var phone      = document.querySelector('#phone');
  var email      = document.querySelector('#email');
  var patronymic = document.querySelector('#patronymic');

  var checkInput = function(input) {
    if (input.value == '') {
      input.style.borderColor = 'red';
      return true;
    } else {
      input.style.borderColor = '#f2f2f2';
      return false;
    }
  };

  var refreshInput = function(input) {
    input.value = '';
  };

  var checkAllRequiredFields = function() {
    if (checkInput(name) || checkInput(surname) || checkInput(phone) || checkInput(email) || checkInput(patronymic)) {
      return false;
    }
    return true;
  };


  var showModal = function(modal) {
    modal.classList.remove('modal--hidden');
  };

  var formOnSubmit = function(evt) {
    evt.preventDefault();
    if (checkAllRequiredFields()) {
      var xhr = new XMLHttpRequest();
      var body = 'name=' + encodeURIComponent(name)
                + '&surname=' + encodeURIComponent(surname)
                + '&patronymic=' + encodeURIComponent(patronymic)
                + '&phone=' + encodeURIComponent(phone)
                + '&email=' + encodeURIComponent(email);

      xhr.open('POST', 'https://echo.htmlacademy.ru', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
          refreshInput(name);
          refreshInput(surname);
          refreshInput(patronymic);
          refreshInput(phone);
          refreshInput(email);
        }
      };
      xhr.send(body);

      showModal(successModal);
    } else {
      showModal(errorModal);
    }
  };

  window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      successModal.classList.add('modal--hidden');
      errorModal.classList.add('modal--hidden');
    }
  });
  errorButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    errorModal.classList.add('modal--hidden');
  });
  successButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    successModal.classList.add('modal--hidden');
  });
  form.addEventListener('submit', formOnSubmit);
})();
