(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
      $(".navbar").addClass("sticky-top shadow-sm");
    } else {
      $(".navbar").removeClass("sticky-top shadow-sm");
    }
  });

  // Smooth scrolling on the navbar links
  $(".navbar-nav a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();

      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top - 45,
        },
        1500,
        "easeInOutExpo"
      );

      if ($(this).parents(".navbar-nav").length) {
        $(".navbar-nav .active").removeClass("active");
        $(this).closest("a").addClass("active");
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Screenshot carousel
  $(".screenshot-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    loop: true,
    dots: true,
    items: 1,
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    loop: true,
    center: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("myModal");
  var termsBtn = document.getElementById("openTermsBtn");
  var conditionsBtn = document.getElementById("openConditionsBtn");
  var span = document.getElementsByClassName("close")[0];
  var popupContent = document.getElementById("popupContent");

  termsBtn.onclick = function () {
    loadContent("text/termos.html");
  };

  conditionsBtn.onclick = function () {
    loadContent("text/condicoes.html");
  };

  function loadContent(url) {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        popupContent.innerHTML = data;
        modal.style.display = "block";
      })
      .catch((error) => {
        console.error("Erro ao carregar o arquivo HTML:", error);
      });
  }

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const thankYouMessage = document.getElementById("thankYouMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio normal do formulário

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          form.reset(); // Limpa o formulário
          thankYouMessage.style.display = "block"; // Exibe a mensagem de agradecimento
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              alert(data["errors"].map((error) => error["message"]).join(", "));
            } else {
              alert(
                "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde."
              );
            }
          });
        }
      })
      .catch((error) => {
        alert(
          "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde."
        );
      });
  });
});
