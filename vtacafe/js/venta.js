
const priceElement = document.getElementById("price");
const numberElement = document.getElementById("number");
const purchases = [];

function add() {
  const price = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);

  if (isNaN(price) || isNaN(number) || price <= 0 || number <= 0) {
    alert("Por favor, ingrese números válidos para el precio y la cantidad.");
    return;
  }

  const index = purchases.findIndex(item => item.price === price);
  if (index === -1) {
    purchases.push({ price, number });
  } else {
    purchases[index].number += number;
  }

  alert(`${display()}\nSubtotal: ${subtotal()} yen`);
  clearInputFields();
}

function subtotal() {
  return purchases.reduce((prev, purchase) => prev + purchase.price * purchase.number, 0);
}

function display() {
  return purchases.map(purchase => `${purchase.price} yen: ${purchase.number} items`).join("\n");
}

function calcPostageFromPurchase(sum) {
  if (sum === 0 || sum >= 3000) {
    return 0;
  } else if (sum < 1000) {
    return 500;
  } else {
    return 250;
  }
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  alert(`Subtotal: ${sum} yen, Gasto de envio: ${postage} yen, Total: ${sum + postage} yen`);
  clearInputFields();
  purchases.length = 0;
}

function clearInputFields() {
  priceElement.value = "";
  numberElement.value = "";
}

