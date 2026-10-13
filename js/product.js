(() => {
  "use strict";

  const packages = {
    100: { label: "100 г", sku: "01306", price: 32640, oldPrice: 34920 },
    500: { label: "500 г", sku: "01307", price: 143200, oldPrice: 164600 },
    1000: { label: "1000 г", sku: "01308", price: 206400, oldPrice: 259200 },
    5000: { label: "5000 г", sku: "01309", price: 632000, oldPrice: 871000 },
  };

  const form = document.getElementById("product-form");
  const weight = document.getElementById("selected-weight");
  const sku = document.getElementById("product-sku");
  const price = document.getElementById("product-price");
  const oldPrice = document.getElementById("product-old-price");
  const cartStatus = document.getElementById("cart-status");
  const cartButton = document.getElementById("cart-button");
  const notification = document.getElementById("cart-notification");
  const notificationTitle = document.getElementById("notification-title");
  const notificationMessage = document.getElementById("notification-message");
  const notificationClose = document.getElementById("notification-close");
  const notificationCheckout = document.getElementById("notification-checkout");

  function closeNotification() {
    const focusInside = notification.contains(document.activeElement);
    notification.hidden = true;
    cartStatus.textContent = "";
    if (focusInside) cartButton.focus();
  }

  function selectedPackage() {
    const radio = form.querySelector('input[name="package"]:checked');
    return packages[radio ? radio.value : "100"];
  }

  function formatPrice(amount) {
    return (amount / 100).toFixed(2);
  }

  function updateProduct() {
    const selected = selectedPackage();

    weight.textContent = selected.label;
    sku.textContent = selected.sku;
    price.textContent = formatPrice(selected.price);
    oldPrice.textContent = formatPrice(selected.oldPrice);
    closeNotification();
  }

  form.addEventListener("change", (event) => {
    if (event.target.matches('input[name="package"]')) {
      updateProduct();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = selectedPackage();
    notificationTitle.textContent = `Ананасовый улун, ${selected.label}`;
    notificationMessage.textContent = "Товар добавлен в корзину";
    notification.hidden = false;
    cartStatus.textContent =
      `Ананасовый улун, ${selected.label}, арт. ${selected.sku}. ` +
      "Товар добавлен в корзину. Демонстрационный режим.";
  });

  notificationClose.addEventListener("click", closeNotification);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !notification.hidden) {
      closeNotification();
    }
  });

  notificationCheckout.addEventListener("click", () => {
    const message = "Демонстрация: оформление заказа не подключено.";
    notificationMessage.textContent = message;
    cartStatus.textContent = message;
  });

  updateProduct();

  window.addEventListener("pageshow", updateProduct);
})();
