$(document).on('ready turbolinks:load', function() {
  var show_error, stripeResponseHandler, submitHandler;
  var submitting = false;

  submitHandler = function(event) {
    var $form = $(event.target);

    if (submitting) {
      event.preventDefault();
      return false;
    }

    submitting = true;
    $form.find("input[type=submit]").prop("disabled", true);

    // If Stripe was initialized correctly this will create a token using the credit card info
    if (Stripe) {
      Stripe.card.createToken($form, stripeResponseHandler);
    } else {
      show_error("Failed to load credit card processing functionality. Please reload this page in your browser.");
      submitting = false;
      $form.find("input[type=submit]").prop("disabled", false);
    }

    event.preventDefault();
    return false;
  };

  $(".cc-form").off('submit').on('submit', submitHandler);

  stripeResponseHandler = function(status, response) {
    var token, $form;

    $form = $('.cc-form');

    if (response.error) {
      show_error(response.error.message);
      submitting = false;
      $form.find("input[type=submit]").prop("disabled", false);
    } else {
      token = response.id;
      $form.append($("<input type=\"hidden\" name=\"payment[token]\" />").val(token));
      $("[data-stripe=number]").remove();
      $("[data-stripe=cvc]").remove();
      $("[data-stripe=exp-year]").remove();
      $("[data-stripe=exp-month]").remove();
      $("[data-stripe=label]").remove();
      $form.off('submit'); // prevent handler running again on native submit
      $form.get(0).submit();
    }

    return false;
  };

  show_error = function(message) {
    var $container = $('.container').first();
    if ($("#flash-messages").length === 0) {
      $container.prepend("<div id='flash-messages'></div>");
    }

    $("#flash-messages").html('<div class="alert alert-warning"><a class="close" data-dismiss="alert">×</a><div id="flash_alert">' + message + '</div></div>');
    $('.alert').delay(5000).fadeOut(3000);

    return false;
  };
});
