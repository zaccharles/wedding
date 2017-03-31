(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var countries = document.querySelectorAll(".country");
    for (var i = 0; i < countries.length; ++i) {
      var country = countries[i];
      country.addEventListener("click", handleCountryClick);
    }
  });

  function handleCountryClick() {
    var href = this.getAttribute("data-href");
    window.location = href;
  }
})();