import { menuArray } from "/data.js"

const mainEl = document.querySelector("main")
let cartArray = []

document.addEventListener('click', (e) => {
    if(e.target.dataset.addid){
        handleAddBtn(e.target.dataset.addid)
    }
    else if(e.target.dataset.removeid){
        handleRemoveBtn(e.target.dataset.removeid)
    }
    else if(e.target.id === 'purchase-btn'){
        handlePurchaseBtn()
    }
    else if(e.target.id === 'pay-btn'){
        handlePayBtn(e)
    }
})

function handleAddBtn(buttonId){
    const targetMenuObj = menuArray.filter((item) => {
        return JSON.parse(buttonId) === item.id
    })[0]
    cartArray.push(targetMenuObj)
    render()
}

function handleRemoveBtn(buttonId){
    cartArray.filter((item, index) => {
        if(item.id === JSON.parse(buttonId)){
            cartArray.splice(index, 1)
        }
    })
    render()
}

function handlePurchaseBtn(){
    document.getElementById('payment-modal').classList.remove('hidden')
}

function handlePayBtn(e){
    e.preventDefault()
    document.getElementById('payment-modal').classList.add('hidden')
    cartArray = []
    render()
    document.getElementById('order-complete').classList.remove('hidden')
}

function getMain(){
    let mainHtml = ``
    let isHiddenClassCheckout = ""
    let cartContainerEl = ``
    let totalPrice = 0
    document.getElementById('order-complete').classList.add('hidden')

    if(cartArray.length > 0){
        isHiddenClassCheckout = ""
        cartArray.forEach((item) => {
            cartContainerEl += `
            <div class="cart-item">
                <div class="flex-title">
                    <h2>${item.name}</h2>
                    <button class="remove-item-btn" data-removeid="${item.id}">remove</button>
                </div>
                <div>
                    <h3>$${item.price}</h3>
                </div>
            </div>`
            totalPrice += item.price
        })
    }
    else{
        isHiddenClassCheckout = "hidden"
    }

    menuArray.forEach((item, index) => {

        let ingredientsHtml = ``
        item.ingredients.forEach((ingredient) => {
            ingredientsHtml += ingredient + ","
        })

        mainHtml += `
        <div class="item">
            <div class="item-inner">
                <p class="item-emoji">${item.emoji}</p>
                <div>
                    <h2>${item.name}</h2>
                    <p class="item-ingredients">${ingredientsHtml}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
            </div>
            <div>
                <button class="add-btn" data-addid="${item.id}">+</button>
            </div>
        </div>`

        if(index === menuArray.length - 1){
            mainHtml += `
            <div class="checkout-section ${isHiddenClassCheckout}">
                <h2>Your order</h2>
                <div class="cart-container" id="cart-container">
                    ${cartContainerEl}
                </div>
                <div class="total-price-section">
                    <h2>Total Price:</h2>
                    <h3>$${totalPrice}</h3>
                </div>
                <button class="purchase-btn" id="purchase-btn">Complete order</button>
            </div>`
        }
    })

    return mainHtml
}

function render(){
    mainEl.innerHTML = getMain()
}

render()