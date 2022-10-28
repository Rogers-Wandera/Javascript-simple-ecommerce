
class Wrapper {
    constructor() {
        this.productsDisplay = document.getElementById("products");
        this.model = document.getElementById("model")
        this.cartItems = [];
        this.products = [
            {
                productId : 1,
                productName: "Mac book pro",
                productDesc: "A perfect combination of beauty and performance, the stylish X407M is powered by a latest Intel® Pentium Quad Core processor with 4GB RAM. X407 also features a  large capacity 500GB HDD. It’s the ideal laptop for daily computing and entertainment.",
                productPrice: "600000",
                productThumbnail: './imgs/mac pro.jpg',
                productStatus: "available"
            },
            {
                productId : 2,
                productName: "Mac book",
                productDesc: "A perfect combination of beauty and performance, the stylish X407M is powered by a latest Intel® Pentium Quad Core processor with 4GB RAM. X407 also features a  large capacity 500GB HDD. It’s the ideal laptop for daily computing and entertainment.",
                productPrice: "500000",
                productThumbnail: './imgs/mac book.jpg',
                productStatus: "available"
            },
            {
                productId : 3,
                productName: "Asus",
                productDesc: "The Asus X407M provides large storage capacity of a 500GB HDD*. Install apps and use the HDD to house large files such as movies, music libraries and photo albums.",
                productPrice: "400000",
                productThumbnail: './imgs/asus.jpg',
                productStatus: "out of stock"
            },
            {
                productId : 4,
                productName: "Dell Ear Pods",
                productDesc: "The Asus X407M provides large storage capacity of a 500GB HDD*. Install apps and use the HDD to house large files such as movies, music libraries and photo albums.",
                productPrice: "50000",
                productThumbnail: './imgs/ear pods.jpg',
                productStatus: "out of stock"
            },
            {
                productId : 5,
                productName: "Men Sneakers",
                productDesc: "The Asus X407M provides large storage capacity of a 500GB HDD*. Install apps and use the HDD to house large files such as movies, music libraries and photo albums.",
                productPrice: "80000",
                productThumbnail: './imgs/sneakers.jpg',
                productStatus: "2 items left"
            },
            {
                productId : 6,
                productName: "Smart Dell Tv",
                productDesc: "The Asus X407M provides large storage capacity of a 500GB HDD*. Install apps and use the HDD to house large files such as movies, music libraries and photo albums.",
                productPrice: "800000",
                productThumbnail: './imgs/smart.jpg',
                productStatus: "available"
            },
            {
                productId : 7,
                productName: "Pixel Smart Tv",
                productDesc: "The Asus X407M provides large storage capacity of a 500GB HDD*. Install apps and use the HDD to house large files such as movies, music libraries and photo albums.",
                productPrice: "700000",
                productThumbnail: './imgs/pixel.jpg',
                productStatus: "out of stock"
            },
        
        ]
    }
    displayProducts(product){
        let div = document.createElement("div")
        div.classList.add("product-cont")
        div.innerHTML = 
            ` 
            <h4 id="productName">${product.productName}</h4>
            <img id="productThumbnail" src="${product.productThumbnail}" alt="${product.productName}">
            <p id="productDesc">${product.productDesc}</p>
            <div class="mid-sec">
                <small id="productPrice">shs. ${product.productPrice}</small>
                <span id="productStatus">${product.productStatus}</span> <br />
                <button id="button-cart" data-id="${product.productId}">Add to Cart </button>
            </div>
                
            `
        this.productsDisplay.appendChild(div)
    }


    ProductsObject() {
        this.products.map((product) => {
            // console.log(product)
            let obj = {...product}
            this.displayProducts(obj)
            return obj
        })
    }

    addProductToCart() {
       let btn = document.querySelectorAll("#button-cart");
       let gotCartItems = [];
    //    let productName = document.getElementById("productName")
       let products = [...this.products]
       let ids = products.map((prod) => prod.productId)
       console.log(ids)
       let product = products.map((prod) => prod)
       console.log(product)
       let nodeArray = [...btn]
       nodeArray.find((node) => {
        node.addEventListener("click", function(e) {
            if(ids.includes(parseInt(e.target.dataset.id))) {
                product.find((prod) => {
                    const {productId, productName, productPrice, productThumbnail} = prod;
                    if(prod.productId === parseInt(e.target.dataset.id)) {
                        let quantity = 0;
                        let obj = {
                            productId,
                            productName,
                            productPrice,
                            productThumbnail,
                            Quantity: quantity + 1
                        }
                        gotCartItems.push(obj);
                        localStorage.setItem("cart", JSON.stringify(gotCartItems))
                        // location.reload()
                        
                    }
                })

            } else {
                console.log(parseInt(e.target.dataset.id))
                console.log(`${parseInt(e.target.dataset.id)} is not 1`)
            }
        }
        )
       })

    }

    displayCartItems() {
        let display = document.getElementById("cartItems")
        let getItems = JSON.parse(localStorage.getItem("cart"))

        const newArray = getItems.map((m) => [m.productId, m])
        const newMap = new Map(newArray).values()
        const arrayCartItems = [...newMap]
        this.cartItems = arrayCartItems
        let div = document.createElement("div")
        div.classList.add("cartData")
        if(this.cartItems) {
            div.innerHTML = this.cartItems.map((cart) => {
                const {
                    productId,
                    productName,
                    productPrice,
                    productThumbnail,
                    Quantity
                } = cart
                return (
                    `
                       <div>
                       <h6>${productName}</h6> 
                       <small>shs. ${productPrice}</small> <br />
                       <img src="${productThumbnail}" alt="${productName}" > <br />
                       <p>Quantity: ${Quantity} </p>
                       <span id="increase" data-set="${productId}"> <+> </span> 
                       <span data-set="${productId}"> <-> </span>
                       </div>
                    `
                )
            }).join("")
            // display.style.display = "block"
        } else {
            display.innerHTML = "No cart Items"
        }
        display.appendChild(div)
    }

    handleModel () {
        let display = document.getElementById("cartItems")
        this.model.addEventListener("click", function() {
            if(display.style.display = "none") {
                display.style.display = "block"
            }
        })
    }

    
}
function addProducts(){
    const  wrapper = new Wrapper()
    wrapper.ProductsObject()
    wrapper.addProductToCart()
    if(wrapper.cartItems) {
        wrapper.displayCartItems()
    }
    console.log(wrapper.cartItems)
    wrapper.handleModel()
}

document.addEventListener("DOMContentLoaded", function() {
    addProducts()

  })


