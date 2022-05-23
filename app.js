fetch("./books.json") //path to the file with json data
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // Get the main tag in HTML
    let main = document.getElementById("people");

    // Create H1 element
    let mainHeading = document.createElement("h1");
    mainHeading.className = "heading";
    mainHeading.innerText = "Welcome to amazing book shop!";
    main.append(mainHeading);

    // create container
    let container = document.createElement("div");
    container.className = "books-container";
    main.append(container);

    // Div book catalog
    let bookCatalog = document.createElement("div");
    bookCatalog.className = "catalog";
    container.append(bookCatalog);

    // h2 element
    let subheading = document.createElement("h2");
    subheading.className = "subheading";
    subheading.innerText = "Book Catalog";
    bookCatalog.append(subheading);

    let df = new DocumentFragment();

    df.appendChild(bookCatalog);

    container.appendChild(df);

    //Book order list/cart
    let bookOrder = document.createElement("div");
    bookOrder.className = "book-order";
    container.append(bookOrder);

    let bookOrderHeading = document.createElement("h2");
    bookOrderHeading.className = "order-heading";
    bookOrderHeading.innerText = "Book Order";
    bookOrder.append(bookOrderHeading);

    let orderContent = document.createElement("div");
    orderContent.className = "order-content";
    bookOrder.append(orderContent);

    json.forEach((book) => {
      // div catalog content
      let catalogContent = document.createElement("div");
      catalogContent.className = "catalog-content";
      bookCatalog.append(catalogContent);

      // div book img
      let bookImg = document.createElement("div");
      bookImg.className = "book-img";
      catalogContent.append(bookImg);

      // img
      let image = document.createElement("img");
      image.setAttribute("src", `${book.imageLink}`);
      bookImg.append(image);

      // div book content
      let bookContent = document.createElement("div");
      bookContent.className = "book-content";
      catalogContent.append(bookContent);

      // div book text
      let bookText = document.createElement("div");
      bookText.className = "book-text";
      bookContent.append(bookText);

      // h2 element inside book text
      let title = document.createElement("h2");
      title.className = "title";
      title.innerText = `${book.author}`;
      bookText.append(title);

      // h4 element inside book text
      let bookName = document.createElement("h4");
      bookName.className = "book-name";
      bookName.innerText = `${book.title}`;
      bookText.append(bookName);

      // p element inside book text
      let price = document.createElement("p");
      price.className = "book-price";
      price.innerText = `$${book.price}`;
      bookText.append(price);

      // Buttons div
      let buttons = document.createElement("div");
      buttons.className = "btns";
      bookContent.append(buttons);

      // a tag
      let showMore = document.createElement("a");
      showMore.className = "show";
      showMore.setAttribute("href", "#");
      showMore.innerText = "Show more";
      buttons.append(showMore);

      // button
      let addBtn = document.createElement("button");
      addBtn.className = "addBtn";
      addBtn.setAttribute("type", "button");
      addBtn.innerText = "Add to bag";
      buttons.append(addBtn);

      let description = document.createElement("p");
      description.className = "desc";
      description.innerText = `${book.description}`;
      showMore.append(description);
    });

    let modal = document.createElement("div");
    modal.className = "modal";
    main.append(modal);

    let popUpModal = document.createElement("div");
    popUpModal.className = "popUp";
    modal.append(popUpModal);

    let showMores = document.querySelectorAll(".show");
    for (showMore of showMores) {
      showMore.addEventListener("click", function () {
        let content = this.closest(".catalog-content");
        // let author = content.querySelector(".title").innerText;
        let title = content.querySelector(".book-name").innerText;
        // let image = content.querySelector(".book-img").innerHTML;
        let description = content.querySelector(".desc").innerText;

        popUpModal.innerHTML += `
          <div class = "show-container">
            <div class= "order-desc">
              <h2>${title}</h2>
              <p>${description}</p>  
            </div>
            <span onclick="removePopUp(this)" class="close"><img src="./icons/xmark-solid.svg" alt=""></span>
          </div>
        `;
        popUpModal.style.display = "block";
      });
    }

    let overlay = document.createElement("div");
    overlay.className = "overlay";
    modal.append(overlay);

    let total = document.createElement("div");
    total.className = "total";
    bookOrder.append(total);

    let completeBtn = document.createElement("a");
    completeBtn.className = "complete-btn";
    completeBtn.innerText = "Complete order";
    bookOrder.append(completeBtn);

    let orders = document.querySelector(".order-content");

    let btns = document.querySelectorAll(".btns .addBtn");
    for (btn of btns) {
      btn.addEventListener("click", function () {
        let content = this.closest(".catalog-content");
        let author = content.querySelector(".title").innerText;
        let title = content.querySelector(".book-name").innerText;
        let price = content.querySelector(".book-price").innerText;
        let image = content.querySelector(".book-img").innerHTML;

        orders.innerHTML += `
      <div class = "order-container">
        <div class= "order-img">
          ${image}
        </div>
        <div class= "order-text">
          <h3>${author}</h3>
          <h2>${title}</h2>
          <p><span>${price}</span></p>
        </div>
        <span onclick="removeFromCart(this)" class="close"><img src="./icons/xmark-solid.svg" alt=""></span>
      </div>
      `;

        price = price.substring(1);
        price = parseInt(price);
        allTotal += price;

        document.querySelector(
          ".total"
        ).innerHTML = `Total: $<span>${allTotal}</span> <br><br>`;
      });
    }
    completeBtn.addEventListener("click", function () {
      completeBtn.setAttribute("href", "./validation.html");
    });
  });

let allTotal = 0;

function removeFromCart(element) {
  let content = element.closest(".order-container");
  let price = content.querySelector("p span").innerText;
  price = price.substring(1);
  price = parseInt(price);
  allTotal = parseInt(allTotal);
  allTotal -= price;
  document.querySelector(".total").innerText = `Total: $${allTotal}`;
  content.remove();
}

function removePopUp(element) {
  let content = element.closest(".show-container");
  let popUp = document.querySelector(".popUp");
  popUp.style.display = "none";
  content.remove();
}
