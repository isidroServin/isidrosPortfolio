(function ($) {
  "use strict"; // Start of use strict
  // Inicializar botones de colapso
  $(".nav-item").on("click", function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $(".sidebar .collapse").collapse("hide");
    }
  });

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $(".sidebar .collapse").collapse("hide");
    }
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function () {
    if ($(window).width() < 768) {
      $(".sidebar .collapse").collapse("hide");
    }

    // Toggle the side navigation when window is resized below 480px
    if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
      $("body").addClass("sidebar-toggled");
      $(".sidebar").addClass("toggled");
      $(".sidebar .collapse").collapse("hide");
    }
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $("body.fixed-nav .sidebar").on(
    "mousewheel DOMMouseScroll wheel",
    function (e) {
      if ($(window).width() > 768) {
        var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
      }
    }
  );

  // Scroll to top button appear
  $(document).on("scroll", function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });

  $("#sendForm").submit(function (e) {
    e.preventDefault(); // Evita que se envíe el formulario de forma tradicional

    // Obtiene los datos del formulario
    const formData = {
      email: $("#email").val(),
      fname: $("#fname").val(),
      subject: $("#subject").val(),
      message: $("#message").val(),
      // Agrega aquí los demás campos del formulario
    };

    // Envía los datos mediante AJAX
    $.ajax({
      type: "POST",
      url: "http://192.168.0.48:3000/sendMessage", // Cambia 'tu_script.php' por la URL de tu script de procesamiento
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        // Mostrar modal de éxito
        Swal.fire({
          title: "All done!",
          text: "Thanks for your message!",
          icon: "success",
          confirmButtonText: "Cool!",
        });
      },
      error: function () {
        // Mostrar modal de error
        Swal.fire({
          title: "Ooops!",
          text: "Seems that something gone worng,  please try again later!",
          icon: "error",
          confirmButtonText: "Got it!",
        });
      },
    });
    $("#email").val("");
    $("#fname").val("");
    $("#subject").val("");
    $("#message").val("");
  });

  // Smooth scrolling using jQuery easing
})(jQuery); // End of use strict
