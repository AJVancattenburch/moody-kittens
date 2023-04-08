// @ts-nocheck

let kittens = []
let kitten = {}
let kittenImg = {
  happy: "https://c.tenor.com/Z0owBbOn9v0AAAAd/tenor.gif",
  fine: "https://media.tenor.com/images/a412fc62c095ba9901f96a803fd279ad/tenor.gif",
  upset: "https://c.tenor.com/-2X9RJQkqhgAAAAd/tenor.gif",
  mad: "https://media.tenor.com/images/fc1cc672a99a7e3cda46381f871e45f7/tenor.gif",
  run: "https://i.pinimg.com/originals/04/c4/30/04c4304d9a96d26ac76c4f0a95834fb1.gif",
}




/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target


  
  let newKitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5,
  }

  let catCopy = kittens.find(kitten => kitten.name === newKitten.name)

  if (catCopy) {
    alert ("Hey meow! There's already a kitten by that name")
  } else {
    kittens.push(newKitten)
    saveKittens()
  }
  
  form.reset()
  drawKittens()


}


/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
    if (storedKittens){
      kittens = storedKittens
    }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittenListElem = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten =>{
    kittensTemplate += `
    <div id="cat-card" class="container m-3">
      <div class="p-1 kitten ${kitten.mood} ">
        <img  src="${kitten.img}" height="335px" width="200px"> 
        <div class="p-1">
          <h3 class="mt-3 mb-3">Name: ${kitten.name}</h3>
          <h3 class="mt-3 mb-3">Mood: ${kitten.mood}</h3>
          <h3 class="mt-3 mb-3">Affection: ${kitten.affection}</h3>
        </div>
        <div class="text-center">
          <button class="shimmer w-40" onclick="pet('${kitten.id}')">Pet</button>
          <button class="shimmer w-40" onclick="catnip('${kitten.id}')">Catnip</button><br>
          <button class="shimmer mt-1 w-50" onclick="sprayBottle('${kitten.id}')">Spray Bottle</button>
        </div>
          <button class="shimmer mt-3 btn-cancel" onclick="evictKitten('${kitten.id}')">Evict<br>
          Kitten</button>
      </div>
    </div>`    
  });
    kittenListElem.innerHTML = kittensTemplate
}




/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(kitten => kitten.id === id)
};






/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = findKittenById(id);
  let random = Math.random();
  if (random > 0.5) {
    kitten.affection += 1;
  } else {
    kitten.affection = 10;
  }
  setKittenMood(kitten)
  saveKittens()
  drawKittens()
  document.getElementById("purr").play();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id);
  kitten.affection = 5;
  if (kitten.affection  <= 7) {
    kitten.img = kittenImg.fine;
    kitten.mood = "tolerant";
    document.getElementById("treat").play();

  }
  kitten.affection++; // Will only make kitten so happy
  saveKittens()
  drawKittens()
}

function sprayBottle(id) {
  let kitten = findKittenById(id);
  kitten.affection--;  //angers kitten -1 per spray
  setKittenMood(kitten)
  saveKittens()
  drawKittens()
  document.getElementById("spray").play();
}

function evictKitten(id) {
  let index = findKittenById(id);
  kittens.splice(index, 1);
  saveKittens();
  drawKittens();
  document.getElementById("hiss").play();
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten
*/
function setKittenMood(kitten) {
  if (kitten.affection >= 7) {
    kitten.img = kittenImg.happy;
    kitten.mood = "happy";
  }

  if (kitten.affection  <= 7) {
    kitten.img = kittenImg.fine;
    kitten.mood = "tolerant";
  }

  if (kitten.affection <= 4) {
    kitten.img = kittenImg.upset;
    kitten.mood = "frustrated";
  }

  if (kitten.affection <= 2) {
    kitten.img = kittenImg.mad;
    kitten.mood = "angry";
  }

  if (kitten.affection == 0) {
    kitten.img = kittenImg.run;
    kitten.mood = 'gone';
    document.getElementById("see-ya").play();
  }
}

function clearKittens(){
  kittens = []; // removes all kittens from the array
  saveKittens() // save the empty array to localstorage
  drawKittens()
  document.getElementById("explode").play(); // draws empty array of kittens
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  let welcome = document.getElementById("welcome");
  document.getElementById("mouse-click").play();
  welcome.remove() // remove the welcome content
  drawKittens() // draw the list of kittens to the page
}



// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{id:string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();