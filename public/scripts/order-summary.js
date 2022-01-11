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
