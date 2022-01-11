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
