let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('.add-toy-form');
  form.addEventListener('submit', addNewToy)
  
  document.addEventListener('click', (event) => {
    if(event.target.matches('.like-btn')){
      updateLikes(event)
    }
  })
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});

function getToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(response => response.forEach(toy => showToy(toy)))
}

function showToy(toy){ //creating a card
  const toyCollection = document.getElementById('toy-collection')
  const div = document.createElement('div') //create the container where the card lives
  div.classList.add('card') //adds the class to connect css rules to card
  const h2 = document.createElement('h2')
  h2.textContent = toy.name //make the header populate with toy name
  const img = document.createElement('img') 
  img.src = toy.image //pulls the img url from the api
  img.classList.add('toy-avatar') //adds css rules to img
  const p = document.createElement('p')
  p.textContent = `${toy.likes} Likes` //adds count of likes
  p.id = toy.id
  const button = document.createElement('button') 
  button.textContent = 'Like' 
  button.classList.add('like-btn')
  button.id = toy.id //adds like button, css rules, & populates id with what is in the api
  button.addEventListener('click', (event) => {

  })
  div.append(h2, img, p, button)
  toyCollection.append(div)
}

function addNewToy(event){
  event.preventDefault()
  const [name, image] = event.target
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'content-type':'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      image: image.value,
      likes: 0
    })
  })
  .then(response => response.json())
  .then(response => showToy(response))
  name.value = ''
  image.value = ''
}

function updateLikes(event){
  event.preventDefault()
    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        likes: parseInt(event.target.parentElement.children[2].textContent, 10) + 1
      }) 
    })
    .then(response => response.json())
    .then(response => {
      //event.target.parentElement.children[2].textContent = `${response.likes} Likes`
      const pLikes = document.getElementById(response.id)
      pLikes.textContent = `${response.likes} Likes`
    })
}


{/* <div class="card">
  <h2>Woody</h2>
  <img src="[toy_image_url]" class="toy-avatar" />
  <p>4 Likes</p>
  <button class="like-btn" id="[toy_id]">Like ❤️</button>
</div> */}