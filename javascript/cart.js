document.addEventListener('DOMContentLoaded', function () {
    let productItem = document.querySelectorAll('.cartitem');
    //單品金額加減
    productItem.forEach(function (item) {
        let quantityBlock = item.querySelector('.quantity-input')
        let unitPriceEl = item.querySelector('.unit-price');
        let itemTatolEl = item.querySelector('.item-total');
        let input = quantityBlock.querySelector('.qty-input');

        if (quantityBlock && unitPriceEl && itemTatolEl && input) {
            quantityControl(quantityBlock);

            let unitPrice = parseFloat(unitPriceEl.textContent.replace(/[^0-9.]/g, ''));
            input.addEventListener('quantityUpdated', function (event) {
                let newQuantity = event.detail.newQuantity;
                let total = unitPrice * newQuantity;

                itemTatolEl.textContent = total.toLocaleString();

                updatedTotal();
            });
        }
    });

    let priceTotalEl = document.querySelector('.product-total');
    let shippingEl = document.querySelector('.shipping');
    let grandTotalEl = document.querySelector('.grand-total');
    //購物車加總
    function updatedTotal() {
        let totalItem = 0;

        productItem.forEach(function (item) {
            let itemTotalEl = item.querySelector('.item-total');
            if (itemTotalEl) {
                let itemTotal = parseFloat(itemTotalEl.textContent.replace(/[^0-9.]/g, ''));

                totalItem += itemTotal;
            }
        });

        if (priceTotalEl) {
            priceTotalEl.textContent = totalItem.toLocaleString();
        }
        let sumTotal = 0;

        if (grandTotalEl) {
            let shipping = parseFloat(shippingEl.textContent.replace(/[^0-9.]/g, ''));
            sumTotal += totalItem + shipping;

            grandTotalEl.textContent = sumTotal.toLocaleString();
        }
    }
    updatedTotal();
});


