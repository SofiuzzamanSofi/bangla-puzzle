let shopingBag = [];
let amountTotal = 0;
const shopingBagDiv = document.getElementById("shoping-bag");
const bagItemCount = document.querySelectorAll(".bag-item-count");
const allTotalAmount = document.getElementById("all-total-amount");

//
const itemIncrement = (id, name, quantity, price, totalPrice) => {
    const itemIndex = shopingBag.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        const updatedItem = { ...shopingBag[itemIndex] };
        updatedItem.quantity++;
        updatedItem.totalPrice = updatedItem.quantity * updatedItem.price;

        shopingBag[itemIndex] = updatedItem;

        amountTotal += updatedItem.price;
        allTotalAmount.innerText = amountTotal;

        // Update the cart display
        bagCartShow(shopingBag);
    }
};

const itemDecrement = (id, name, quantity, price, totalPrice) => {
    if (quantity === 1) return;
    const itemIndex = shopingBag.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        const updatedItem = { ...shopingBag[itemIndex] };

        if (updatedItem.quantity > 1) {
            updatedItem.quantity--;
            updatedItem.totalPrice = updatedItem.quantity * updatedItem.price;

            shopingBag[itemIndex] = updatedItem;

            amountTotal -= updatedItem.price;
            allTotalAmount.innerText = amountTotal;

            // Update the cart display
            bagCartShow(shopingBag);
        }
    }
};


// bag cart show 
const bagCartShow = (items) => {
    shopingBagDiv.innerHTML = items.map(item => (
        `
        <div class="relative rounded-md border-2 p-2 flex justify-between items-center gap-2">
            <div class="">
                <img src=${item.image} alt="Lionel-Messi" class="rounded-md h-28 w-16 object-cover" />
            </div>
            <div class="">
                <div class="my-2">
                    <h1 class="font-semibold text-sm ">${item.name}</h1>
                    <p class="text-xs">${item.price}$/each</p>
                </div>
                <div>
                    <button class="bg-slate-100 text-black px-[6px] py-1 rounded-l" 
                    onclick="itemDecrement('${item.id}', '${item.name}', ${item.quantity}, ${item.price}, ${item.totalPrice})"
                    >
                    -
                    </button>
                    <button class="bg-white text-black px-4 mx-[-5px] hover:cursor-auto">${item.quantity}</button>
                    <button class="bg-slate-100 text-black px-1 py-1 rounded-r"
                    onclick="itemIncrement('${item.id}', '${item.name}', ${item.quantity}, ${item.price}, ${item.totalPrice})">
                    +
                    </button>
                </div>
            </div>
            <div class=" mt-[5.5rem]">
                <p class="font-semibold text-sm"><span>${item.totalPrice}</span><span>$</span></p>
            </div>
            <div>
                <button
                class="fa-solid fa-trash text-red-500 bg-white p-[6px] rounded-md absolute right-[-8px] top-[-8px]"
                onclick="removeFromCart('${item.id}', '${item.name}', ${item.quantity}, ${item.price}, ${item.totalPrice})">
                </button>
            </div>
        </div>
        `
    )).join('');
};

function addToCart(button) {
    button.disabled = true;
    button.classList.add('bg-slate-500');

    // Get information from the parent container
    const cardContainer = button.parentNode.parentNode;

    // return console.log('cardContainer:', cardContainer);
    const name = cardContainer.querySelector('.text-xl').innerText;
    const image = cardContainer.querySelector('img').src;

    // Use the correct selector for the price
    const priceText = cardContainer.querySelector('.my-3 p').innerText;
    const price = parseFloat(priceText.replace('$', ''));

    // Create the cardItem object
    let cardItem = {
        id: cardContainer.id,
        name: name,
        image: image,
        quantity: 1,
        price: price,
        totalPrice: price,
    };

    shopingBag.push(cardItem);
    amountTotal = amountTotal + cardItem.totalPrice

    //
    bagCartShow(shopingBag);

    bagItemCount[0].innerText = shopingBag.length;
    bagItemCount[1].innerText = shopingBag.length;
    allTotalAmount.innerText = amountTotal
};

function removeFromCart(id, name, quantity, price, totalPrice) {

    const restItems = shopingBag.filter(item => item.id !== id);
    shopingBag = restItems;

    amountTotal = amountTotal - totalPrice;
    bagItemCount[0].innerText = shopingBag.length;
    bagItemCount[1].innerText = shopingBag.length;
    allTotalAmount.innerText = amountTotal

    const cartComponent = document.getElementById(id);
    const addToCartButton = cartComponent.querySelector('.bg-red-500.text-white.px-8.rounded-md.py-2.w-full.font-semibold');

    // enable and color change
    addToCartButton.classList.remove('bg-slate-500');
    addToCartButton.disabled = false;

    if (!shopingBag.length) {
        shopingBagDiv.innerHTML = "";
    }
    else {
        //
        bagCartShow(shopingBag);
    }
};
