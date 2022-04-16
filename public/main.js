// Focus div based on nav button click
function addNavListener(button, focusId, func){
  button.addEventListener("click", () => {
    const focus = document.getElementById(focusId)
    const divs = document.getElementsByTagName("div")
    // const active = document.getElementsByClassName("active")

    func(focus)
    
    activateFocusDiv(divs, focus)
  
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

function createImageElement(filename){
  return `<img src="${filename}">`
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
      if (data.flip === "heads"){
        focus.innerHTML = createImageElement("assets/img/heads.png")
      } else if (data.flip === "tails"){
        focus.innerHTML = createImageElement("assets/img/tails.png")
      } else {
        focus.innerHTML = createeImageElement("assets/img/coin.png")
      }
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
  focus.getElementById("multi-coins").addEventListener("submit", ()=>{
    
  })
})

addNavListener(guess, "guess", (focus) => {
  focus.innerText = "guess"
})





