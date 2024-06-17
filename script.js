import { unsplashAPIKey } from "/api-key.js";

// Unsplash API
const count = 10;
const apiKey = unsplashAPIKey;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {}
}

// On Load
getPhotos();
