'use strict';
/** @var {NodeListOf<HTMLDivElement>} products*/
const products = document.querySelectorAll('.product');

/** @var {NodeListOf<HTMLDivElement>} fromInput*/
const fromInput = document.getElementById('from');
fromInput.addEventListener('change', changedPriceHandler);

/** @var {NodeListOf<HTMLDivElement>} toInput*/
const toInput = document.getElementById('to');
toInput.addEventListener('change', changedPriceHandler);


function changedPriceHandler() {
    const fromPrice = Number(fromInput.value);
    const toPrice = Number(toInput.value);

    if (fromPrice === "" && toPrice === "") {
        reset();
    } else if (fromPrice != "" && toPrice === "") {
        showProductsWithFromPrice();
    } else if (fromPrice === "" && toPrice != "") {
        showProductsWithToPrice();
    } else if (fromPrice != "" && toPrice != "") {
        showProductsWithBothPrice();
    }

}

/**
 * показывает скрытые элементы
 */
function reset() {
    products.forEach(function (product) {
        if (isProductHidden(product)) {
            showProduct(product);
        }
    });
}

/**
 * показывает продукты с диапазоном цен "от"
 */
function showProductsWithFromPrice() {
    const fromPrice = Number(fromInput.value);
    products.forEach(function (product) {
        const productPrice = Number(product.querySelector('.price').textContent.trim());
        if (productPrice < fromPrice) {
            hideProduct(product);
        } else {
            showProduct(product);
        }
    });
}

/**
 * показывает продукты с диапазоном цен "до"
 */
function showProductsWithToPrice() {
    const toInput = Number(toInput.value);
    products.forEach(function (product) {
        const productPrice = Number(product.querySelector('.price').textContent.trim());
        if (productPrice > toInput) {
            hideProduct(product);
        } else {
            showProduct(product);
        }
    });
    
}

/**
 * показывает продукты с диапазоном цен "от" и "до"
 */
function showProductsWithBothPrice() {
    const fromPrice = Number(toInput.value);
    const toInput = Number(toInput.value);
    if (fromPrice > toInput) {
        alert("не может быть такого");
        return;
    } else {
        products.forEach(function (product) {
            const productPrice = Number(product.querySelector('.price').textContent.trim());
            if (productPrice >= fromPrice && productPrice <= fromPrice) {
                showProduct(product);
            } else {
                hideProduct(product);
            }
        });
    }

}

/** @param {HTMLDivElement} product*/
function hideProduct(product) {
    product.style.opacity = "0.3";
}

/** @param {HTMLDivElement} product*/
function showProduct(product) {
    product.style.opacity = "1";
}

/** @param {HTMLDivElement} product*/
function isProductHidden(product) {
    return product.style.opacity === "0.3";
}
