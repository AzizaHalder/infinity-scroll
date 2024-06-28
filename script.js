import { unsplashAPIKey } from "/api-key.js";

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// console.log(photosArray);

// Unsplash API
const count = 3;
const apiKey = unsplashAPIKey;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
  console.log("image loaded");
  imageLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log(`ready = ${ready}`);
  }
}

// Helper Function to set attribute on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photo, Add to DOM
function displayPhotos() {
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each img is finished loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a>, then both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(img);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log("photos", photosArray[0].urls.regular);
    displayPhotos();
  } catch (error) {
    console.log("ERROR:", error);
  }
}

// Check if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // console.log("INNERHEIGHT:", window.innerHeight);
    // console.log("SCROLLY:", window.scrollY);
    // console.log("OFFSETHEIGHT:", document.body.offsetHeight);
    // console.log("INNDERHEIGHT + SCROLLY:", window.innerHeight + window.scrollY);
    // console.log("OFFSET HEIGHT - 1000:", document.body.offsetHeight - 1000);
    console.log("load more");
  }
  //   console.log("SCROLLED");
});

// On Load
getPhotos();
