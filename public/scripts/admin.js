$(() => {

  $(".prep-info").submit(function (event) {
    const orderIdElement = $(this).parents().siblings(".orderID");
    const orderId = orderIdElement.val();

    event.preventDefault();
    const value = $(this).serializeArray();
    const timeNow = new Date();
    $.ajax('/api/twilio/prep-time', {
      method: 'POST',
      dataType: 'TEXT',
      data: {
        value,
        orderId,
        timeNow: timeNow.getTime()
      },
      success: (data) => {
      },
      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });

  $(".pick-up-alert").submit(function (event) {
    event.preventDefault();
    const customerName = $(".customerName").attr('value');
    const phoneNumber = $(this).siblings(".prep-info").find(".phone").val();
    const orderId = $('#finished').val();

    $.ajax('/api/twilio/pickup-alert', {
      method: 'POST',
      dataType: 'TEXT',
      data: {
        orderId,
        customerName,
        phoneNumber
      },
      success: (data) => {
        console.log(data);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });

});
