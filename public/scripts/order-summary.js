$(() => {

  $('#clear-cart').hide();

  const $itemContainer = $('#selected-items-container');
  const $sumOrder = $('#sum-order');

  let totalPlusTax = 0;

  const orderList = {
    items: []
  };


  const emptyCart = () => {
    orderList.items = [];
    totalPlusTax = 0;
    $('#clear-cart').hide();
  };

  // Adds row to the order summary table
  const addNewItem = (itemName, itemQuantity, itemPrice) => {
    const $selectedItem = $('<tr>').addClass('order-item');
    const $itemName = $('<td>').addClass('order-item-name').text(itemName);
    const $quantity = $('<td>').addClass('order-quantity').text(itemQuantity);
    const $price = $('<td>').addClass('order-price').text(Number.parseFloat(itemPrice).toFixed(2));

    $selectedItem.append($itemName, $quantity, $price);

    return $selectedItem;
  };


  const refreshSumOrder = (total) => {
    const tax = Math.round(total * 15) / 100;

    $sumOrder.empty();

    const $markup = `
      <tr class="order-item">
        <td class="order-item-name">---</td>
        <td class="order-quantity"></td>
        <td class="order-price"></td>
      </tr>
      <tr class="order-item">
        <td class="order-item-name">Subtotal</td>
        <td class="order-quantity"></td>
        <td class="order-price">${Number.parseFloat(total).toFixed(2)}</td>
      </tr>
      <tr class="order-item">
        <td class="order-item-name">Total Tax (15%)</td>
        <td class="order-quantity"></td>
        <td class="order-price">${tax}</td>
      </tr>

      <tr class="order-item">
        <td class="order-item-name"><strong>Total</strong></td>
        <td class="order-quantity"></td>
        <td class="order-price"><strong>${Math.round((total + tax) * 100) / 100}</strong></td>
      </tr>
      `
    $sumOrder.append($markup);
    return $sumOrder;
  };


  const renderItems = () => {
    $itemContainer.empty();
    let $selectedItem;
    for (const item of orderList.items) {
      $selectedItem = addNewItem(item.name, item.quantity, item.price);
      $itemContainer.append($selectedItem);
    }
  };

  //Calling function to populate items when object has content
  renderItems();



  // Checks if the item is in cart for changeCart() function)
  const isInCart = (itemId) => {
    const itemsInCart = [];
    for(const item of orderList.items) {
      itemsInCart.push(item.item_id);
    }
    if (itemsInCart.includes(itemId)) {
      return true;
    }
    return false;
  };


  const updateItem = (itemId, itemPrice) => {
    for(const item of orderList.items) {
      if (item.item_id === itemId) {
        item.quantity++;
        item.price += itemPrice;
      }
    }
  };


  // Makes changes in the cart, for the .ajax post
  const changeCart = (itemId, itemName, itemPrice) => {
    if (isInCart(itemId)) {
      return updateItem(itemId, itemPrice);
    } else {
      return orderList.items.push({
        item_id: itemId,
        name: itemName,
        quantity: 1,
        price: itemPrice
      });
    }
  };


  // When client clicks on the add-to-cart button
  $(document).on("click", ".add-to-cart", function(event) {
    event.preventDefault();

    $('.message-to-customer').hide();
    $('#clear-cart').show();


    $.ajax('/api/add-to-cart', {
      method: 'POST',
      dataType: 'JSON',
      data: {
        id: event.target.value
      },
      success: (data) => {
        const itemId = data.item[0].id;
        const itemName = data.item[0].name;
        const itemPrice = data.item[0].price;
        totalPlusTax += itemPrice;
        refreshSumOrder(totalPlusTax);
        changeCart(itemId, itemName, itemPrice)
        renderItems();
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
  });


  $(document).on("click", "#clear-cart", function(event) {
    event.preventDefault();

    $itemContainer.empty();
    $sumOrder.empty();
    emptyCart();
  });


  // Order is triggered
  $(document).on("click", ".order-button", function(event) {
    event.preventDefault();

    //Clears order-summary and displays message
    $itemContainer.empty();
    $sumOrder.empty();
    $('.message-to-customer').text('Thank you for your order! You will receive our confirmation shortly.');
    $('.message-to-customer').show();

    $.ajax('/api/orders', {
      method: 'POST',
      dataType: 'JSON',
      data: orderList,
      success: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });

    //AJAX request to /api/twilio
    $.ajax('/api/twilio', {
      method: 'POST',
      dataType: 'JSON',
      data: orderList,
      success: (data) => {
        console.log("Minutes:", data);
      },

      error: (err) => {
        console.log(`Error details: ${err}`);
      }
    });
    emptyCart();
  });

});
