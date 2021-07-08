const imgContainer= document.getElementById('image-container');
const loader= document.getElementById('loader');

let ready=false;
let ImagesLoaded=0;
let totalImages=0;
let photosArray= [];

// Unsplash Api
let count=5;
const apiKey= '6ZbJv4VxgEvp4YMo8WDJCusNJCsbjw6ZaNM79Lt9AlI';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready=true;
        loader.hidden=true;
        count=30;
    }
}
// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes){
for(const key in attributes){
    element.setAttribute(key,attributes[key]);
}
}

//Create Elements For Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item= document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target:'_blank'
        });
        const img = document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        img.addEventListener('load',imageLoaded());
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}
// Get photos from Unslplash API
async function getPhotos() {
    try{
        const response=await fetch(apiUrl);
        photosArray= await response.json();
        console.log(photosArray);
        displayPhotos();
    }catch(e){
            console.log(e);
    }
  }

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () =>{
    if(window.innerHeight + window.screenY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready=false;
    }
});
 // On Load
 getPhotos();