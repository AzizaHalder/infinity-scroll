import { unsplashAPIKey } from "/api-key.js";

// Unsplash API
const count = 10;
const apiKey = unsplashAPIKey;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log("ERROR:", error);
  }
}

// On Load
getPhotos();
