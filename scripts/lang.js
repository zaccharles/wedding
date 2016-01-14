(function () {
  document.addEventListener("DOMContentLoaded", function() { 
    var langs = document.querySelectorAll('.language-bar li');
    for (var i = 0; i < langs.length; ++i) {
      var lang = langs[i];
      lang.addEventListener('click', handleLangClick);
    }

    window.addEventListener("storage", changeLang);
    changeLang();
  });

  function handleLangClick() {
    var code = this.getAttribute("data-code");
    window.localStorage.setItem("lang", code);
    changeLang();
  }

  function changeLang() {
    var currentCode = window.localStorage.getItem("lang") || "eng";
    document.querySelector('html').className = currentCode;
    var title = document.querySelector('title');
    title.innerText = title.getAttribute('data-' + currentCode);
  }
})();