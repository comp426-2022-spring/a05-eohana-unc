// Focus div based on nav button click
function addNavListener(button, focusId, func){
  button.addEventListener("click", () => {
    const focus = document.getElementById(focusId)
    console.log(focus)
    // const divs = document.getElementsByTagName("div")
    const active = document.getElementsByClassName("active")

    func(focus)
    
    document.getElementById("home").className = "hidden"
    activateFocusDiv(active, focus)
    
  })
}

function activateFocusDiv(divs, newFocus){
  for (let div of divs){
    // console.log(div)
    div.className = "hidden"
  }
  newFocus.className = newFocus.id === "home" ? "" : "active"
  newFocus.className = "active"
}


async function getData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function createImageElement(filename, className){
  return `<img src="${filename}" class="${className || "smallcoin"}">`
}

function addCoin(result, className){
  if (result === "heads")
    return createImageElement("assets/img/heads.png", className)
  if (result === "tails")
    return createImageElement("assets/img/tails.png", className)
  return  focus.innerHTML = createImageElement("assets/img/coin.png")
}

const home = document.getElementById("homenav")
const single = document.getElementById("singlenav")
const multi = document.getElementById("multinav")
const guess = document.getElementById("guessnav")


// Flip one coin and show coin image to match result when button clicked
addNavListener(single, "single", (focus) => {
  getData('/app/flip')
    .then(data => {
    //  focus.innerText = data.flip
      // console.log(data)
      // if (data.flip === "heads"){
      //   focus.innerHTML = createImageElement("assets/img/heads.png")
      // } else if (data.flip === "tails"){
      //   focus.innerHTML = createImageElement("assets/img/tails.png")
      // } else {
      //   focus.innerHTML = createeImageElement("assets/img/coin.png")
      // }
      focus.innerHTML = addCoin(data.flip, "bigcoin")
    }
  );
  // console.dir(response)
})

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button


// button.addEventListener("click", () => {
//   const focus = document.getElementById("single")
//   const divs = document.getElementsByTagName("div")
//   focus.innerText = "Single Button Working"

//   activateFocusDiv(divs, focus)
// })






addNavListener(home, "home", (focus) => {
  // focus.innerText = "home"
})

addNavListener(multi, "multi", (focus) => {
  // focus.innerText = "multi"

})

addNavListener(guess, "guess", (focus) => {
  // focus.innerText = "guess"
  
})



document.getElementById("multi-coins").addEventListener("submit", (event)=>{
  const form = event.target
  event.preventDefault()
  // console.log(event)
  const formdata = new FormData(form)
  // console.log(event.target)
  // console.log(formdata.get("number"))
  // console.log(formdata)
  postData("app/flip/coins", {number: formdata.get("number")})
    .then(data => {
      // const parent = form.parentNode
      const parent = document.getElementById("display-flips")
      parent.innerHTML = ""
      console.log(data)
      for (let item of data.raw){
        console.log(parent)
        parent.insertAdjacentHTML("beforeend", addCoin(item, "smallcoin"))
        // event.target.parentNode.innerHTML += addCoin(item)
      }
    })
});

document.getElementById("user_guess").addEventListener("submit", (event) => {
  event.preventDefault()
  const form = event.target
  const formdata = new FormData(form)
  console.log(formdata.get("user_guess"))
  getData(`app/flip/call/${formdata.get("user_guess")}`)
    .then(data => {
      const parent=document.getElementById("display-result")
      console.log(data)
      parent.innerHTML = `
      <table>
        <tr>
          <td>Call:</td>
          <td>${data["call"]}</td>
        </tr>
        <tr>
        <td>Flip:</td>
        <td>${addCoin(data["flip"], "smallcoin")}</td>
      </tr>
      <tr>
        <td>Result:</td>
        <td>${data["result"]}</td>
      </tr>
      </table>`
    })
});