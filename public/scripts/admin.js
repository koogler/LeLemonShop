$(() => {

  $(".prep-info").submit(function(event) {
    const orderIdElement = $(this).parents().siblings(".orderID");
    const orderId = orderIdElement.val();

    event.preventDefault();
    const value = $(this).serializeArray();
    const timeNow = new Date();
    $.ajax('/api/twilio/prep-time-alert', {
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


});
