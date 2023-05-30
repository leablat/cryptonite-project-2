async function getMoreInfoByCache(id) {
    const key = id;
  
    if (!cache[key] || cache[key].date < new Date()) {
      cache[key] = {
        value: await fetchMoreCoinData(id),
        date: new Date(new Date().getTime() + 2 * 60000),
      };
    }
  
    return cache[key].value;
  }
  
  async function fetchMoreCoinData(id) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for coin with id '${id}'.`);
    }
  
    const coinData = await response.json();
    return coinData;
  }