// Import all images for subtypes
/*Traditonal subtypes*/

/*Desktop*/
const raisedPanels = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/Desktop/1 - Raised Panel/*.jpg",
  { eager: true }
);
const stampedCarriages = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/Desktop/2 - Stamped Carriage House/*.jpg",
  { eager: true }
);
const stampedShakers = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/Desktop/3 - Stamped Shaker/*.jpg",
  { eager: true }
);
const recessedPanels = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/Desktop/4 - Recessed Panel/*.jpg",
  { eager: true }
);
/*Desktop*/

/*Mobile*/
const raisedPanelsM = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/Mobile/1 - Raised Panel/*.jpg",
  { eager: true }
);
const stampedCarriagesM = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/Mobile/2 - Stamped Carriage House/*.jpg",
  { eager: true }
);
const stampedShakersM = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/Mobile/3 - Stamped Shaker/*.jpg",
  { eager: true }
);
const recessedPanelsM = import.meta.glob(
  "/src/assets/door_imgs/carousel/traditional/Mobile/4 - Recessed Panel/*.jpg",
  { eager: true }
);
/*Mobile*/

/*Traditonal subtypes*/

/* ---------------- Contemporary subtypes ---------------- */

/* Desktop */
const planks = import.meta.glob(
  "/src/assets/door_imgs/carousel/contemporary/Desktop/1 - Planks/*.jpg",
  { eager: true }
);
const skylineFlushes = import.meta.glob(
  "/src/assets/door_imgs/carousel/contemporary/Desktop/2 - Skyline Flush/*.jpg",
  { eager: true }
);
const aluminums = import.meta.glob(
  "/src/assets/door_imgs/carousel/contemporary/Desktop/3 - Full-view/*.jpg",
  { eager: true }
);
const sterlings = import.meta.glob(
  "/src/assets/door_imgs/carousel/contemporary/Desktop/4 - Sterling/*.jpg",
  { eager: true }
);

/* Mobile */
const planksM = import.meta.glob(
  "/src/assets/door_imgs/carousel/contemporary/Mobile/1 - Planks/*.jpg",
  { eager: true }
);
const skylineFlushesM = import.meta.glob(
  "/src/assets/door_imgs/carousel/contemporary/Mobile/2 - Skyline Flush/*.jpg",
  { eager: true }
);
const aluminumsM = import.meta.glob(
  "/src/assets/door_imgs/carousel/contemporary/Mobile/3 - Full-view/*.jpg",
  { eager: true }
);
const sterlingsM = import.meta.glob(
  "/src/assets/door_imgs/carousel/contemporary/Mobile/4 - Sterling/*.jpg",
  { eager: true }
);

/* ---------------- Carriage subtypes ---------------- */

/* Desktop */
const steelOverlays = import.meta.glob(
  "/src/assets/door_imgs/carousel/carriage/Desktop/1 - Steel Overlay Carriage House/*.jpg",
  { eager: true }
);
const fiberGlassOverlays = import.meta.glob(
  "/src/assets/door_imgs/carousel/carriage/Desktop/2 - Fiberglass Overlay Carriage House/*.jpg",
  { eager: true }
);
const shorelines = import.meta.glob(
  "/src/assets/door_imgs/carousel/carriage/Desktop/3 - Shoreline/*.jpg",
  { eager: true }
);
const woodOverlays = import.meta.glob(
  "/src/assets/door_imgs/carousel/carriage/Desktop/4 - Wood Overlay Carriage House/*.jpg",
  { eager: true }
);

/* Mobile */
const steelOverlaysM = import.meta.glob(
  "/src/assets/door_imgs/carousel/carriage/Mobile/1 - Steel Overlay Carriage House/*.jpg",
  { eager: true }
);
const fiberGlassOverlaysM = import.meta.glob(
  "/src/assets/door_imgs/carousel/carriage/Mobile/2 - Fiberglass Overlay Carriage House/*.jpg",
  { eager: true }
);
const shorelinesM = import.meta.glob(
  "/src/assets/door_imgs/carousel/carriage/Mobile/3 - Shoreline/*.jpg",
  { eager: true }
);
const woodOverlaysM = import.meta.glob(
  "/src/assets/door_imgs/carousel/carriage/Mobile/4 - Wood Overlay Carriage House/*.jpg",
  { eager: true }
);

// Function to return object of subtype -> array of URLs
export function getCarouselImages(type,viewport) {
  let modules;
  if (type === "traditional") {
  //console.log("GETTING CAROUSELSUBTYPES:",type)
    modules = {
      "Raised Panel": Object.values(viewport==="desktop"?raisedPanels:raisedPanelsM).map((mod) => mod.default || mod),
      "Stamped Carriage House": Object.values(viewport==="desktop"?stampedCarriages:stampedCarriagesM).map((mod) => mod.default || mod),
      "Stamped Shaker": Object.values(viewport==="desktop"?stampedShakers:stampedShakersM).map((mod) => mod.default || mod),
      "Recessed Panel": Object.values(viewport==="desktop"?recessedPanels:recessedPanelsM).map((mod) => mod.default || mod),
    };
    console.log(modules)
  } else if (type === "contemporary") {
  // console.log("GETTING CAROUSELSUBTYPES:",type)
    modules = {
      "Planks": Object.values(planks).map((mod) => mod.default || mod),
      "Skyline Flush": Object.values(skylineFlushes).map((mod) => mod.default || mod),
      "Aluminum": Object.values(aluminums).map((mod) => mod.default || mod),
      "Sterling": Object.values(sterlings).map((mod) => mod.default || mod),
    };
    //console.log(modules)
  } else if (type === "carriage") {
    //console.log("GETTING CAROUSELSUBTYPES:",type)
    modules = {
      "Steel Overlay": Object.values(steelOverlays).map((mod) => mod.default || mod),
      "Fiberglass Overlay": Object.values(fiberGlassOverlays).map((mod) => mod.default || mod),
      "Shoreline": Object.values(shorelines).map((mod) => mod.default || mod),
      "Wood Overlay": Object.values(woodOverlays).map((mod) => mod.default || mod),
    };
      //console.log(modules)
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