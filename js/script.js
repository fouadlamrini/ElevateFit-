// JS for Single product detail


// var ProductImg = document.getElementById("product-img");//larger image
// var SmallImg = document.getElementsByClassName("small-img");//it returns list of 4 images having index 0,1,2,3 as we have 4 images with class name "small0-img" 

// SmallImg[0].onclick = function ()//when user click on first image or images at 0 index, it will display as ProdcutImg.src replace with clicked or SmallImg[0], so we get smallimg[0] in bigger form, similarly when click on smallimg[1], it will display in bigger picture and so on 
// {
//     ProductImg.src = SmallImg[0].src;
// }

// SmallImg[1].onclick = function () {
//     ProductImg.src = SmallImg[1].src;
// }

// SmallImg[2].onclick = function () {
//     ProductImg.src = SmallImg[2].src;
// }

// SmallImg[3].onclick = function () {
//     ProductImg.src = SmallImg[3].src;
// }

let show_bar = document.getElementById("show_bar");
show_bar.ad dEventListener("click", display_non);

function display_non() {
    
    let bar_column = document.getElementById("bar_column");
    if (bar_column.style.display == "none") { bar_column.style.display = "block"; }
    else { bar_column.style.display = "none"; }
   
    

}




const priceRange = document.querySelector("#priceRange");


const products = document.querySelectorAll(".product");


priceRange.addEventListener("input", function() {
    
    const maxPrice = parseInt(priceRange.value);

    
    products.forEach(function(product) {
        
        const productPrice = parseInt(product.getAttribute("data-price"));

       
        if (productPrice <= maxPrice) {
            
            product.style.display = "block";
        } else {
           
            product.style.display = "none";
        }
    });
});


const filterSelect = document.getElementById("product-filter");


filterSelect.addEventListener("change", function() {
    const selectedCategory = filterSelect.value;

    
    document.querySelectorAll(" .product").forEach(product => {
        if (selectedCategory === "all" || product.getAttribute("data-category") === selectedCategory) {
            product.style.display = "block"; 
        } else {
            product.style.display = "none"; 
        }
    });
});

const panier=document.querySelectorAll(.panier);
panier.addEventListener("click",function (){



})


