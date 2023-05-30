function AboutScreen() {
  removeCoins();
  drowAbout();
}

function drowAbout() {
  const h1 = document.createElement('h1')
  h1.innerText = 'About the website:'
  h1.className = "title"
  const p = document.createElement('p')
  p.innerText = 'The site provides information on 50 currencies in real time. You can get the value of the currencies in real time in dollars, euros, and shekels. There is also an option to view reports showing the flow of changes in real time by graphs!'
  p.className = "Detail"
  const div1 = document.createElement("div")
  div1.className = "myRow"
  const div2 = document.createElement("div")
  div2.className = "myRow"
  const img = document.createElement("img")
  img.src = 'Assets/Images/lea.jpg'
  img.className = "img"
  const h6 = document.createElement("h6")
  h6.innerText = "email: L0527123860@gmail.com"
  h6.className = "email"
  const h4 = document.createElement("h4")
  h4.innerText = "Lea Blat"
  h4.className = "name"
  div1.appendChild(img);
  h4.appendChild(h6);
  div2.appendChild(h4);
  div1.appendChild(div2);
  const h7 = document.createElement('h7')
  h7.innerText = 'Certified and professional web developer with experience in banking and financial fields.'
  h7.className = "h7"

  DOM.information.append(h1, p, div1, h7)

}