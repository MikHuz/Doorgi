// Import all images for subtypes
const raisedPanels = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/1 - Raised Panel/*.jpg",
  { eager: true }
);
const recessedPanels = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/4 - Recessed Panel/*.jpg",
  { eager: true }
);
const stampedCarriages = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/2 - Stamped Carriage House/*.jpg",
  { eager: true }
);
const stampedShakers = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/3 - Stamped Shaker/*.jpg",
  { eager: true }
);

// Function to return object of subtype -> array of URLs
export function getCarouselImages(type) {
  let modules;

  if (type === "traditional") {
    modules = {
      "Raised Panel": Object.values(raisedPanels).map((mod) => mod.default || mod),
      "Recessed Panel": Object.values(recessedPanels).map((mod) => mod.default || mod),
      "Stamped Carriage House": Object.values(stampedCarriages).map((mod) => mod.default || mod),
      "Stamped Shaker": Object.values(stampedShakers).map((mod) => mod.default || mod),
    };
  } else if (type === "contemporary") {
  
  } else if (type === "carriage") {
   
  } else {
    modules = {};
  }

  return modules;
}

const traditionalDoors = import.meta.glob(
  "/src/assets/home_imgs/traditional/door*.webp",
  { eager: true }
);

const contemporaryDoors = import.meta.glob(
  "/src/assets/home_imgs/contemporary/door*.webp",
  { eager: true }
);
const carriageDoors = import.meta.glob(
  "/src/assets/home_imgs/carriage/door*.webp",
  { eager: true }
);
export function getDoors(type) {
  let modules;

  if (type === "traditional") {
    modules = traditionalDoors;
  } else if (type === "contemporary") {
    modules = contemporaryDoors;
  } else if(type === "carriage"){
    modules = carriageDoors
  }
  else {
    modules = {};
  }
  return Object.values(modules).map((mod) => mod.default || mod);
}