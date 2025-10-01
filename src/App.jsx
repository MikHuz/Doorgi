import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useLocation,useNavigate} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './css/index.css'
import './css/Home.css'
import DoorSelector from "./DoorSelector.jsx";
import Build from './Build.jsx'
import {getDoors} from './door_data.js'
import {getHomeImages} from './home_door_images.js'
import {getSubTypeImages } from './subtype_door_images.js';  
/*Home Images*/
const tradDoorsImages = getHomeImages('traditional')
const contDoorsImages = getHomeImages('contemporary')
const carrDoorsImages = getHomeImages('carriage')
/*Home Images*/

function SlideShow(props){ /*Slideshow for each doorType carousel*/
  const navigate = useNavigate()
    useEffect(() => {
      const carouselEl = document.getElementById(props.id);
      if (carouselEl) {
        /*new window.bootstrap.Carousel(carouselEl, {
          interval: 3000, 
          ride: 'carousel' 
        });*/
      }
  }, [props.id]);
  const handleCarouselClick = () => {
    navigate(`/${props.type}`)
  }
  let doorElements = props.doorImgs.map((imgSrc, i) => (
    <div id="homeItemSlide" className={`carousel-item ${i === 0 ? 'active' : ''} `} key={i}>
      <img src={imgSrc} onClick={handleCarouselClick}className="d-block w-100" alt={`Garage door ${i + 1}`} />
      {/*<div class="carousel-caption" style={{bottom:"0px"}}>
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>*/}
    </div>
  ));

  return (
    <>
      <div id={props.id} className="carousel carousel-dark slide homeCarousel">
        <div className="carousel-inner" id="homeCarouselInner">
          {doorElements}
        </div>

        <button id="homePrevBtn" className="carousel-control-prev" type="button" data-bs-target={`#${props.id}`} data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button id="homeNextBtn" className="carousel-control-next" type="button" data-bs-target={`#${props.id}`} data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
}

function HomePage() {
  return (<>  
    <h2 className="homeCarouselHeader">Traditional</h2>
    <SlideShow id="Carousel-trad"  doorImgs={tradDoorsImages} type={"traditional"}/>
    {/* <Link id="view-btn-link"to="/traditional">
      <button id="view-doors-type-btn" style={{}}>View Traditional Doors</button>
    </Link> */}
    
    <h2 className="homeCarouselHeader">Contemporary</h2>
    <SlideShow id="Carousel-cont" doorImgs={contDoorsImages} type={"contemporary"}/>
    {/* <Link id="view-btn-link" to="/contemporary">
      <button id="view-doors-type-btn" style={{}}>View Contemporary Doors</button>
    </Link>
     */}
    <h2 className="homeCarouselHeader">Carriage</h2>
    <SlideShow id="Carousel-carriage"  doorImgs={carrDoorsImages} type={"carriage"}/>
    {/* <Link id="view-btn-link" to="/carriage">
      <button id="view-doors-type-btn" style={{}}>View Carriage Doors</button>
    </Link> */}
  </>);
}

function Footer(){
  return (
  <h1>Footer</h1>
  );
}
function PersistentState(key, door){
  if (door){
    //alert("Setting door")
    localStorage.setItem(key,JSON.stringify(door));
  }
 /* alert("Returning from local storage")*/
  //console.log("RETURNING LOCAL STORAGE DOOR:")
  //console.log(JSON.parse(localStorage.getItem(key)) )
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null; // fallback
}
function App() {/*Route generations and door generation*/
  const [selectedDoor,setSelectedDoor] = useState(PersistentState("selectedDoor",null))
  const [subTypeImages, setSubTypeImages] = useState({}); 
  const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));
  // const [doorData, setDoorData] = useState(() => {
  //   const stored = localStorage.getItem("doorsData");
  //   return stored ? JSON.parse(stored) : null;
  // });
  const [doorData, setDoorData] = useState(null)
  const location = useLocation();
//   console.log("SELECTED DOOR:",selectedDoor)
 console.log("FULL DOOR DATA:",doorData)
//   if (doorData){
//   for (let type in doorData){
//     console.log(`${type} DOORDATA IN APP:`, doorData[type])
//     for (let i in doorData[type]){
//       console.log(doorData[type][i])
   
//     }
//   }
// }
  function getDeviceType(width){
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }
  useEffect(() => {/*listener for window viewport change*/
    const handleResize = () => {
      const newType = getDeviceType(window.innerWidth);
      // update only if type actually changes
      setDeviceType(prev => (prev !== newType ? newType : prev));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {/*fetch door data and prices. MAKE SURE TO UPDATE IF NEW CSV FILE IS REPLACED*/
    // localStorage.removeItem("doorsData")
    getDoors().then(allDoors => {
        setDoorData(allDoors);
    })
    // const cachedDoors = localStorage.getItem("doorsData");
    // if (!cachedDoors) {
    //   // First-time fetch
    //   getDoors().then(allDoors => {
    //     setDoorData(allDoors);
    //     // 🗄 Cache it
    //     //alert("first doors fetch")
    //     localStorage.setItem("doorsData", JSON.stringify(allDoors));
    //   });
    // }
  }, []);

  useEffect(() => {/*Load carousel images for DoorSelector*/
    const loadImages = async () => {
      // localStorage.removeItem("subTypeImages")
      const cached = localStorage.getItem("subTypeImages");
      if (cached) setSubTypeImages(JSON.parse(cached));

      const newImages = {
        traditional: await getSubTypeImages("traditional", deviceType),
        contemporary: await getSubTypeImages("contemporary", deviceType),
        carriage: await getSubTypeImages("carriage", deviceType),
      };

      setSubTypeImages(newImages);
      localStorage.setItem("subTypeImages", JSON.stringify(newImages));
    };

    loadImages();
  }, [deviceType]);
  
  useEffect(() => {/*Page fade effect fro all components*/
    //alert("Changing page")
    document.body.classList.add("page-fade");
    const timeout = setTimeout(() => {
      document.body.classList.remove("page-fade");
    }, 600);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const handleDoorSelection = (door) =>{
    setSelectedDoor(door);
    PersistentState("selectedDoor",door)
  }/*Chosen door in DoorSelector to sent to Build*/
  /*These types are for dynamic route generation*/
  const doorTypes = {traditional:["raised_panel","stamped_carriage_house","stamped_shaker","recessed_panel"], 
                    contemporary:["sterling","planks","skyline_flush","aluminum"],
                    carriage:["shoreline","steel_overlay","wood_overlay","fiber_glass_overlay","stamped_carriage_house","stamped_shaker","recessed_panel"]}
  let generatedRoutes = []
  // console.log(subTypeImages["contemporary"])
  if (doorData!= null && Object.keys(subTypeImages).length > 0){
  for (const type in doorTypes){/*Route for each door type*/
    generatedRoutes.push(<Route path={`${type}/`} 
                                element={<DoorSelector Doors={doorData[type]} handleDoorSelection={handleDoorSelection} 
                                          doorType={type} doorImgs={subTypeImages[type]}/>} />)
    for (const doorName of doorTypes[type]){/*Route for doorType/doorName*/
      generatedRoutes.push(<Route path={`${type}/${doorName}/build`} 
                            element={<Build selectedDoor={selectedDoor} doorType={type}/>} />)
    }
  }
  }
  //console.log("ROUTES:", generatedRoutes)
  return (<>
  {/*<Header/>*/}
    <Routes>
      <Route path="/" element={<HomePage />} />
      {generatedRoutes}
    </Routes>
  {/*<Footer/>*/}
  </>);
}

export default App;
