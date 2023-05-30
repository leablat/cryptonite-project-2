async function moreInfo(id) {
    const element = document.getElementById(id);
  
    if (!element) {
      console.log(`Element with id '${id}' not found.`);
      return;
    }
  
    const ticket = element.closest(".ticket-body");
    if (!ticket) {
      console.log(
        `Could not find parent ticket element for element with id '${id}'.`
      );
      return;
    }
  
    const body = ticket.querySelector(".ticket-body.more-info");
    if (body) {
      body.remove();
      return;
    }
  
    try {
      const coinData = await getMoreInfoByCache(id);
      const image = document.createElement("img");
      image.src = coinData.image.small;
      image.className ="image"
  
      const priceList = document.createElement("ul");
      const ils = document.createElement("li");
      ils.textContent = `ILS: ${coinData.market_data.current_price.ils}₪`;
      const usd = document.createElement("li");
      usd.textContent = `USD: ${coinData.market_data.current_price.usd}$`;
      const eur = document.createElement("li");
      eur.textContent = `EUR: ${coinData.market_data.current_price.eur}€`;
      
  
      priceList.append(ils, usd, eur);
  
      const infoBody = document.createElement("div");
      infoBody.className = "ticket-body more-info";
      infoBody.append(image, priceList);
  
      const collapser = document.createElement("div");
      collapser.className = "collapser";
      collapser.innerHTML = ` ${infoBody.outerHTML} `;
  
      ticket.append(collapser);
    } catch (error) {
      console.log(
        `An error occurred while fetching more info for coin with id '${id}':`,
        error
      );
    }
  }
  