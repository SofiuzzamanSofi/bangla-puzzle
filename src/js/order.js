let shopingBag = [];
const shopingBagDiv = document.getElementById("shoping-bag");
console.log('shopingBagDiv:', shopingBagDiv);

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
        name: name,
        image: image,
        price: price,
        totalPrice: price,
    };

    shopingBag.push(cardItem);
    console.log('Added to Cart:', shopingBag);

    shopingBagDiv.innerHTML = shopingBag.map(item => (
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
                    <button class="bg-slate-100 text-black px-[6px] py-1 rounded-l">-</button>
                    <button class="bg-white text-black px-4 mx-[-5px] hover:cursor-auto">1</button>
                    <button class="bg-slate-100 text-black px-1 py-1 rounded-r">+</button>
                </div>
            </div>
            <div class=" mt-[5.5rem]">
                <p class="font-semibold text-sm"><span>${item.totalPrice}</span><span>$</span></p>
            </div>
            <div>
                <i
                    class="fa-solid fa-trash text-red-500 bg-white p-[6px] rounded-md absolute right-[-8px] top-[-8px]"></i>
            </div>
        </div>
        `
    )).join('');

};

function removeFromCart(button) {
    console.log('Remove from button clicked:', button);
}
