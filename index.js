const searchBaseUrl = "https://api.coingecko.com/api/v3/coins/";
const cache = {};
let coinToRrport =[]

const DOM = {
    Searches: document.querySelector("#searches"),
    information: document.querySelector("#information"),
    inputSearch: null,
    buttonSearch: null,
    element: null
}

HomeScreen();

function init() {
    drawCoins(""); 
    drawSearches();
}

function drawSearches() {
    const SearchesUi = [];
    DOM.inputSearch = getInput("search", ["form-control"]);
    DOM.buttonSearch = getButton("Search");
    DOM.buttonSearch.addEventListener("click", function () {
        const value = DOM.inputSearch.value;
        drawCoins(value);
    });
    SearchesUi.push(DOM.inputSearch, DOM.buttonSearch);
    DOM.Searches.append(...SearchesUi)
}

async function drawCoins(filterStr) {
    try {
        showLoader(DOM. Searches);
        let result = await getCoinsApi();
        if (result && !result.error && result.length > 0) {
            if (filterStr)
               
                result = result.filter((coin) =>
                coin.symbol.toLowerCase() === filterStr.toLowerCase()
              );
            const coins = result.slice(0, 100);
            await showCoins(coins);
             applyChecked();
            DOM.information.innerHTML = ""
        } else {
            const h1 = document.createElement("h1");
            h1.innerText = "No Data";
            DOM.information.innerHTML = "";
            DOM.information.append(h1);
        }
    }catch (error) {
        console.log(error);
        DOM.information.innerText = "There is an error entering the data.";
    }finally {
      removeLoader();
    }
}

async function getCoinsApi() {
    const result = await fetch(`${searchBaseUrl}`, {
      method: "GET",
    });
    const resultJson = await result.json();
    return resultJson;
  }

  async function showCoins(coins) {
    const ticketContainer = document.querySelector("#ticket-container");
    const casing = document.createDocumentFragment();
    
  
    for (let i = 0; i < coins.length && i < 100; i++) {
      const ticket = document.createElement("div");
      ticket.className = "ticket";
  
      const ticketBody = document.createElement("div");
      ticketBody.className = "ticket-body";
  
      if (coins[i]) {
        ticketBody.id = coins[i].id;
  
        
        const symbol = document.createElement("h5");
        symbol.innerText = coins[i].symbol;
        symbol.className = "ticket-title";
  
        const nameOfCoin = document.createElement("p");
        nameOfCoin.innerText = coins[i].name;
        nameOfCoin.className = "ticket-text";
  
        const toggle = document.createElement("div");
        toggle.className = "form-check form-switch";
        
       
  
        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "checkbox";
        input.role = "switch";
        input.id = "checkbox" + coins[i].id;
        toggle.append(input);
  
        const button = document.createElement("button");
        button.className = "btn btn-outline-danger";
        button.innerText = "more info";
        button.id = "button";
        button.addEventListener("click", async function () {
          showLoader(button);
          await moreInfo(coins[i].id);
          removeLoader();
        });
        ticketBody.appendChild(nameOfCoin);
        ticketBody.appendChild(symbol);
        ticketBody.appendChild(toggle);
        ticketBody.appendChild(button);
        ticket.appendChild(ticketBody);
        casing.appendChild(ticket);
        input.addEventListener("change", function () {
          if (input.checked) {
            if (coinToRrport.length > 4) {
              input.checked = false;
              removeFromReportModal(coins[i], input);
            } else coinToRrport.push({ input: input, coin: coins[i] });
          } else coinToRrport = coinToRrport.filter((x) => x.coin.id !== coins[i].id);
        });
      }
    }
  
    ticketContainer.innerHTML = "";
    ticketContainer.appendChild(casing);
  }

  function removeFromReportModal(newCoin, input) {
    var myModal = new bootstrap.Modal(document.getElementById("myModal"), {
      keyboard: false,
    });
  
    document.getElementById("CoinsToDelete").innerHTML = "";
  
    coinToRrport.forEach((coinData) => {
      const button = document.createElement("button");
      button.className = "btn btn-success btn-del-coin";
      button.innerText = coinData.coin.name;
      button.addEventListener("click", function () {
        coinToRrport.find(
          (x) => x.coin.id == coinData.coin.id
        ).input.checked = false;
        coinToRrport = coinToRrport.filter(
          (x) => x.coin.id !== coinData.coin.id
        );
        coinToRrport.push({ input: input, coin: newCoin });
        myModal.hide();
        input.checked = true;
      });
  
      document.getElementById("CoinsToDelete").appendChild(button);
    });
  
    myModal.show();
  }

  function applyChecked() {
    coinToRrport.forEach((x) => {
      const input = document.getElementById("checkbox" + x.coin.id);
      if (input) {
        input.checked = true;
        x.input = input;
      }
    });
  }
  
  function HomeScreen() {
    DOM.Searches.innerHTML = "";
    DOM.information.innerHTML = "";
    init();
  }


  function removeCoins() {
    Object.keys(DOM)
      .filter((x) => DOM[x])
      .forEach((x) => (DOM[x].innerHTML = ""));
  
    document.querySelector("#ticket-container").innerHTML = "";
  }
  
  