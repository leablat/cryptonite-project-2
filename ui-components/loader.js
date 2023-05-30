function showLoader(el) {
    
    const loader = document.createElement("div");
    loader.id = "searchLoader";
    loader.classList.add("spinner-border");
    el.append(loader);
  }
  
  function removeLoader() {
    const loader = document.querySelector("#searchLoader");
    if (loader) {
      loader.remove();
    }
  }