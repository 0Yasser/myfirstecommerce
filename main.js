let initialCost = 0;
let deliveryCost = 50;
let myCart_local = []

class Item {
  constructor(id, name, url, price, details) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.price = price;
    this.details = details;
  }
  change_name(new_name) {
    this.name = new_name;
  }
  change_url(new_url) {
    this.url = new_url;
  }
  change_price(new_price) {
    this.price = new_price;
  }
  change_details(new_details) {
    this.details = new_details;
  }
}

function add(item) {
  myCart_local.push(item);
}
function delivery(cost) {}

// const item1 = new Item(
//   0,
//   "iPhone 12",
//   "https://m.media-amazon.com/images/I/51d9d8sNarL._AC_SL1200_.jpg",
//   4800,
//   "unreasonably expensive phone with poor specs"
// );
// add(item1);
// const item2 = new Item(
//   0,
//   "Dell XPS13",
//   "https://m.media-amazon.com/images/I/51d9d8sNarL._AC_SL1200_.jpg",
//   5000,
//   "Best ultrabook option"
// );
// add(item2);
// localStorage.setItem("myCart_vanilla", JSON.stringify(myCart_vanilla));

//const item3 = new Item(myCart.length,"Anker 10000mA","https://m.media-amazon.com/images/I/51d9d8sNarL._AC_SL1200_.jpg",150,"lasts for years");
//myCart.add(item3);
//const item4 = new Item(myCart.length,"UltraSonic monitor","https://m.media-amazon.com/images/I/51d9d8sNarL._AC_SL1200_.jpg",2000,"2k 1rt");
//myCart.add(item4);
//let myCart = new Cart( [item1,item2,item3] , item1.price+item2.price+item3.price+item4.price );
//myCart.add(item4);

function addToCart(num) {
  let item_id = myCart_local.length == undefined ? 0 : myCart_local.length,
    item_name = num.parentElement.parentElement.children[0].innerHTML,
    item_url = num.parentElement.parentElement.parentElement.children[0].src,
    item_price = num.parentElement.children[0].children[0].innerHTML,
    item_details = " --- --- --- ";
  let new_item = new Item(
    item_id,
    item_name,
    item_url,
    item_price,
    item_details
  );
  if (num.innerHTML != "added! Press again to view the cart") {
    localStorage.setItem(
      `Item${localStorage.length}`,
      JSON.stringify(new_item)
    );
  }
  num.disabled = "true";
  num.innerHTML = "added! Press again to view the cart";
  setTimeout(function () {
    num.href = "cart.html";
  }, 500);
}

function removeFromCart(num) {
  console.log(num);
  num.disabled = "true";
  num.innerHTML = "will get removed soon!";
  setTimeout(function () {
    num.href = "cart.html";
  }, 500);
}
function emptyCart() {
  localStorage.clear();
  window.location.reload();
}

function moveToProductScreen(num, item_name, item_url, item_price) {
  localStorage.setItem("item_name", item_name);
  localStorage.setItem("item_url", item_url);
  localStorage.setItem("item_price", item_price);
  num.href = "product.html";
  console.log("Product name: ");
  console.log(localStorage.getItem("item_name"));
}
function fillProduct(){
    document.getElementById('product').innerHTML= 
    `<div class="card" style="width: 15rem;">
    <img class="card-img-top" src="${localStorage.getItem('item_url')}" alt=" card alt ">
    <div class="card-body">
      <h5 class="card-title">${localStorage.getItem('item_name')}</h5>
      <p class="card-text">Click below to view more details.</p>
      <div class="buying">
      <p><span>${localStorage.getItem('item_price')}</span> Riyals</p>
      <a href="#" class="btn btn-primary" onclick="addToCart(this)">Add to cart</a>
      </div>
    </div>
  </div>
  `;
  
}

function loadCart() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let the_key = localStorage.key(i).slice(0, 4);
      let the_key_num = parseInt(localStorage.key(i)[4]);
      console.log(the_key_num);
      if (
        the_key_num == NaN ||
        the_key != "Item" ||
        localStorage.key(i).length < 5
      )
        continue;
      let temp = JSON.parse(localStorage.getItem(the_key+the_key_num));
      console.log(temp);
      let itemToShow = `<div class="card" style="margin-bottom:20px; padding: 3vw; width: 70vw; display:flex; flex-direction:row">
    <img class="card-img-top" src="${temp.url}" alt=" card alt ">
    <div class="card-body">
      <h5 class="card-title">${temp.name}</h5>
      <p id="price">${temp.price} Riyals.</p>
      <a href="#" class="btn btn-danger" onclick="removeFromCart(this)">Remove from cart</a>
    </div>
  </div>`;
  initialCost +=parseInt(temp.price);
      document.getElementById("cards").innerHTML += itemToShow;
    }
  } else {
    document.getElementById("cards").innerHTML += "Wow!, such empty";
  }
  localStorage.setItem('total_cost' , parseInt(initialCost*1.15))
  localStorage.setItem('delivery_cost' , deliveryCost)
  document.getElementById(
    "total"
  ).innerHTML = `Subtotal = ${initialCost} Riyals\n VAT 15% = ${initialCost*0.15}Riyals\nTotal after Taxes = ${Math.trunc(initialCost*1.15)} Riyal`;
}

function animateSomething(num){
  num.src="#"
  let cardAnimation = document.querySelector('.card');
}

function makeThisActive(num,pos){
  switch (pos) {
    case 1:
      num.parentElement.children[1].class = "dropdown-item active"
      num.parentElement.children[2].class = "dropdown-item"
      loadBuyingScreen()
      break;

    case 2:
      num.parentElement.children[1].class = "dropdown-item"
      num.parentElement.children[2].class = "dropdown-item active"
      loadBuyingScreen()
      break;
  
    default:
      break;
  }
}

function loadBuyingScreen(){
  let temp = document.getElementById("purchase_screen");
  if (temp.parentElement.children[1].children[1].class=="dropdown-item active") {
    temp.innerHTML = `Your total=${localStorage.getItem('total_cost')}`
    temp.parentElement.children[1].children[4].style="display:block"
  }
  else if(temp.parentElement.children[1].children[2].class=="dropdown-item active"){
    temp.innerHTML = `Your total=${parseInt(localStorage.getItem('total_cost'))+parseInt(localStorage.getItem('delivery_cost'))}`
    temp.parentElement.children[1].children[4].style="display:block"
  }
  else{
  }

}


////
////
////
////
/*
  A JSON promise is like: 
  fetch("json/colors.json").then((response)=>{
      console.log("resolved",response);
    return response.json();
  }).catch((err)=>{
    console.log("resolved",err);
  });

  fetch('http://jdjldnfedlsfnlsdf.com/dfknflg/dafkm' "method":"GET").then((response)=>{
    console.log("resolved",response);
  return response.json();
}).catch((err)=>{
  console.log("resolved",err);
});*/
