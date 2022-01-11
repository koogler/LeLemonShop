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
