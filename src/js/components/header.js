// script modal login
function modalLogin() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  // !toggle password
  passwordInputs.forEach(passwordInput => {
    const togglePasswordIcons = passwordInput.parentNode.querySelectorAll('.password-toggle-icon');


    togglePasswordIcons.forEach(icon => {
      icon.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
        } else {
          passwordInput.type = 'password';
        }
        togglePasswordIcons.forEach(toggleIcon => {
          toggleIcon.classList.toggle('active');
        });
      });
    });
  });
}
function authForm() {
  // modal
  const logInButton = document.querySelector('.menu__buttons--login');
  const authModalButtonClose = document.querySelector('.login-modal--close-button');
  const loginModal = document.querySelector('.login-modal');


  // * change form buttons
  const signUpChangeFormButton = document.getElementById('sign-up-change-form');
  const logInChangeFormButton = document.getElementById('auth-change-form');
  const forgotPassChangeFormButton = document.getElementById('forgot-pass-change-form');
  const forgotPassSentEmailButton = document.getElementById('forgot-pass-sent-email');
  const resendEmailButton = document.getElementById('resend-email');

  // * form box
  const logInFormBox = document.getElementById('auth-form');
  const signUpFormBox = document.getElementById('sign-up-form');
  const forgotPassFormBox = document.getElementById('forgot-pass-form');

  const forgotSentEmail = document.getElementById('forgot-send-email');
  const forgotResendEmail = document.getElementById('forgot-resend-email');
  const newPasswordForm = document.getElementById('new-password-form');
  // other
  const emailInputLogIn = document.getElementById('emailLogin');
  const continueButtonLogIn = document.getElementById('log-in-continue');


  //  ! auth log in form add pass
  continueButtonLogIn.addEventListener('click', function() {
    if (emailInputLogIn.value.trim() !== '') {
      logInFormBox.classList.add('is-hidden');
    }
  });

  // Key click handler "Login"
  logInChangeFormButton.addEventListener('click', function() {
    logInFormBox.classList.add('active');
    signUpFormBox.classList.remove('active');
    forgotPassFormBox.classList.remove('active');
  });

  // Key click handler "Sign Up"
  signUpChangeFormButton.addEventListener('click', function() {
    signUpFormBox.classList.add('active');
    logInFormBox.classList.remove('active');
    forgotPassFormBox.classList.remove('active');
  });

  // Key click handler "Forgot Password"
  forgotPassChangeFormButton.addEventListener('click', function() {
    forgotPassFormBox.classList.add('active');
    logInFormBox.classList.remove('active');
    signUpFormBox.classList.remove('active');
  });

  // !  forgot pass
  forgotPassSentEmailButton.addEventListener('click', function() {
    forgotSentEmail.classList.add('is-hidden');
    forgotResendEmail.classList.remove('is-hidden');
  });

  //   change resend email to new-password
  resendEmailButton.addEventListener('click', function() {
    newPasswordForm.classList.add('active');
    forgotPassFormBox.classList.remove('active');
  });

  function toggleModalMenu() {

  }
  //  toggle modal
  //!  toggle modal auth
  function toggleModal() {
    loginModal.classList.toggle('is-hidden');

    forgotSentEmail.classList.remove('is-hidden');
    logInFormBox.classList.remove('is-hidden');

    newPasswordForm.classList.remove('active');
    forgotPassFormBox.classList.remove('active');
    signUpFormBox.classList.remove('active');

    forgotResendEmail.classList.add('is-hidden');
    logInFormBox.classList.add('active');

    const body = document.querySelector('body');


    body.classList.remove('modal-open');
    const isHiddenWrapper = loginModal.classList.contains('is-hidden');
    if (!isHiddenWrapper){
      body.classList.remove('modal-open');
    }else {
      body.classList.add('modal-open');
    }

  }

  logInButton.addEventListener('click', toggleModal);
  authModalButtonClose.addEventListener('click', toggleModal);
}
// TODO: HeaderMenu open modal nav
function headerToggleModalMeni (){
  function toggleModalMenu() {
    const burgerButton = document.querySelector('[data-action="openModal"]');
    const headerWrapper = document.querySelector('[data-action="header-wrapper"]');
    const header = document.querySelector('header'); // Предполагается, что у вас есть элемент header
    const body = document.querySelector('body');

    // Функция для получения ширины скроллбара
    function getScrollbarWidth() {
      const scrollDiv = document.createElement('div');
      scrollDiv.style.width = '100px';
      scrollDiv.style.height = '100px';
      scrollDiv.style.overflow = 'scroll';
      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      document.body.appendChild(scrollDiv);

      const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);

      return scrollbarWidth;
    }

    const scrollbarWidth = getScrollbarWidth();

    burgerButton.addEventListener('click', function() {
      headerWrapper.classList.toggle('show-modal');
      const isHiddenWrapper = headerWrapper.classList.contains('show-modal');

      if (isHiddenWrapper) {
        body.style.marginRight = `${scrollbarWidth }px`;

        body.classList.add('modal-open');
      } else {
        body.style.marginRight = '';
        body.classList.remove('modal-open');
      }
    });
  }
  // !  toggle dropdown menu
  function toggleDropdownMenu() {
    const links = document.querySelectorAll('.header__menu-list-item--link > span');
    links.forEach(function(span) {
      span.addEventListener('click', function(event) {
        event.preventDefault();

        const listItem = this.closest('.header__menu-list-item');
        const isShown = listItem.classList.contains('is-shown');
        const allListItems = document.querySelectorAll('.header__menu-list-item');
        allListItems.forEach(function(item) {
          item.classList.remove('is-shown');
        });
        if (isShown) {
          listItem.classList.remove('is-shown');
        } else {
          listItem.classList.add('is-shown');
        }
      });
    });
  }
  // ! addScrollClass
  function addScrollClass() {
    const header = document.querySelector('[data-action="header-wrapper"]');
    const heroSection = document.getElementById('hero');
    const headerBlock = document.querySelector('.header');
    let lastScrollTop = 0;

    if(heroSection){
    function handleScroll() {
      const heroRect = heroSection.getBoundingClientRect();
      const heroBlockScroll = headerBlock.getBoundingClientRect();
      const heroBottom = heroRect.bottom + window.scrollY - 80;
      const heroShow = heroBlockScroll.bottom + 10;
      const scrollTop = window.scrollY;
      if (scrollTop > heroShow) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }

      if (scrollTop > heroBottom / 2) {
        header.style.zIndex = '9997';
        header.style.position = 'fixed';
      }else {
        header.style.zIndex = '9999';
        header.style.position = 'absolute';
      }

      if (scrollTop > heroBottom) {
        header.classList.add('scroll');
      } else {
        header.classList.remove('scroll');
      }

      lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll);
    }
  }

  toggleDropdownMenu()
  toggleModalMenu()
  addScrollClass()
}

function ctaHeaderShow() {
  let lastScrollTop = 0;
  const ctaHeader = document.querySelector('.cta-header');
  const ctaHeaderScroll = document.querySelector('.cta-header-scroll');

  if (!ctaHeader || !ctaHeaderScroll ){
    return
  }
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      ctaHeader.style.transform = 'translateY(-100%)';
      ctaHeaderScroll.style.transform = 'translateY(0)';
    } else {
      ctaHeader.style.transform = 'translateY(0)';
      ctaHeaderScroll.style.transform = 'translateY(-100%)';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}


export const Header = ()=>{
  modalLogin()
  authForm()
  headerToggleModalMeni()
  ctaHeaderShow()
}