const data = [
    {
        id: 1,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 11,
        name: "Invicta Men's Pro Diver 2",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 2,
        name: "Timex Men's Expedition Scout ",
        img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
        price: 40,
        cat: "Sport",
    },
    {
        id: 3,
        name: "Breitling Superocean Heritage",
        img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
        price: 200,
        cat: "Luxury",
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap ",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        cat: "Sport",
    },
    {
        id: 5,
        name: "Garmin Venu Smartwatch ",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 74,
        cat: "Casual",
    },
];

//DOM elements reference for rendering and user interaction

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");


//create a function to display the products
const displayProducts = (filterProducts) => {
    productsContainer.innerHTML = filterProducts.map(product =>
        `
         <div class="product">
                 <img src=${product.img} alt="">
                 <span class="name">${product.name}</span>
                 <span class="priceText">${product.price}</span>
         </div>
        `
    ).join("")
};

displayProducts(data);

//add event listener for the search to filter the products based on user input

searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();

    if (value) {

        displayProducts(data.filter(item.name.toLowerCase().indexOf(value) !== -1))
    } else {
        displayProducts(data);
    }
});

//Display catergories as clickable span tags

//function to display all the categories 

const setCategories = () => {

    const allCats = data.map(item => item.cat); //new array of all categories
    const categories = [
        "All",//add all as the first category for display all products
        ...allCats.filter((item, i) => { //...is a spreader that combines arrays
            return allCats.indexOf(item) === i;
        })
    ]
//Display  categories as clickable span tags
categoriesContainer.innerHTML = categories.map(cat =>
    `
    <span class="cat">${cat}</span>        
    `
).join("");

//Event listener for categories filtering
categoriesContainer.addEventListener("click", (e) =>{
    const selectedCat = e.target.textContent;

    if(selectedCat === "All"){
        displayProducts(data)
    } else {
        //filter products based on the selected catergory
        displayProducts(data.filter(item =>
            item.cat === selectedCat
        ))
    }
})

}

//create a function to set up price range filter

const setPrice = () => {
//extract price values from data
    const priceList = data.map(item => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);

    //configure the range slider
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "$" + maxPrice;

    //add an event listener to filter product based on price range
    priceRange.addEventListener("input", (e) =>{
        priceValue.textContent = "$" + e.target.value //update displayed price value
        displayProducts(data.filter(item => item.price <= e.target.value))

    })


}



setPrice();
setCategories();