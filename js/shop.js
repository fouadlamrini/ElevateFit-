let cartTotal=0;
window.onload=function(){
const buttons=document.querySelectorAll(".panier");
buttons.forEach(function(button){
button.addEventListener("click",function(){
const price=parseFloat(button.getAttribute("data-price"));
addToCart(price);
});
});
};
function addToCart(price){
    cartTotal=cartTotal+price;
    document.getElementById("cart-total").innerText=cartTotal;
}