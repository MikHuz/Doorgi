import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useLocation,useNavigate} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DoorSelector from "./DoorSelector.jsx";
import {getDoors} from './door_data.jsx'
import { getCarouselImages } from './door_data.jsx';  
import Build from './Build.jsx'
import './css/Home.css'
import './css/index.css'
/*Home Images*/
const tradDoors = getDoors('traditional')
const contDoors = getDoors('contemporary')
const carrDoors = getDoors('carriage')
/*Home Images*/

// /*SubType Images*/
// const subTypeImages = {traditional: getCarouselImages('traditional',"desktop"),
//                       contemporary: getCarouselImages('contemporary',"desktop"),
//                       carriage:getCarouselImages('carriage',"desktop")}
// /*SubType Images*/
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
  let doorElements = props.doors.map((imgSrc, i) => (
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
    {/* <div id="test-flex">
      <h1 className="bg-orange-main">Header 1</h1>
      <h2 className="bg-orange-dark">Header 2</h2>
      <h3 className="bg-orange-light">Header 3</h3>
      <h4 className="bg-yellow">Header 4</h4>
      <h5 className="bg-main">Header 5</h5>
      <h6 className="bg-dark">Header 6</h6>
      <p>This is a paragraph of text to test scaling. Resize the window to see how clamp() behaves.</p>
      <span>This is a span element (inline by default).</span>
      <button>Click Me</button>
    </div> */}
    <h2 className="homeCarouselHeader">Traditional</h2>
    <SlideShow id="Carousel-trad"  doors={tradDoors} type={"traditional"}/>
    {/* <Link id="view-btn-link"to="/traditional">
      <button id="view-doors-type-btn" style={{}}>View Traditional Doors</button>
    </Link> */}
    
    <h2 className="homeCarouselHeader">Contemporary</h2>
    <SlideShow id="Carousel-cont" doors={contDoors} type={"contemporary"}/>
    {/* <Link id="view-btn-link" to="/contemporary">
      <button id="view-doors-type-btn" style={{}}>View Contemporary Doors</button>
    </Link>
     */}
    <h2 className="homeCarouselHeader">Carriage</h2>
    <SlideShow id="Carousel-carriage"  doors={carrDoors} type={"carriage"}/>
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


function App() {/*Route generations and door generation*/
  const [selectedDoor,setSelectedDoor] = useState(null)
  const [subTypeImages, setSubTypeImages] = useState({}); 
  const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));
  const location = useLocation();
  function getDeviceType(width) {
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }
  //console.log("ROUTES:", generatedRoutes)
  useEffect(() => {
    //alert("Changing page")
    document.body.classList.add("page-fade");
    const timeout = setTimeout(() => {
      document.body.classList.remove("page-fade");
    }, 600);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      const newType = getDeviceType(window.innerWidth);
      // update only if type actually changes
      setDeviceType(prev => (prev !== newType ? newType : prev));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    //alert("Device type changed)")
    console.log("Getting new images for:", deviceType);
    setSubTypeImages({
      traditional: getCarouselImages("traditional", deviceType),
      contemporary: getCarouselImages("contemporary", deviceType),
      carriage: getCarouselImages("carriage", deviceType),
    });
  }, [deviceType]);

  const handleDoorSelection = (door) =>{setSelectedDoor(door);}
  const doorTypes = {traditional:["raised_panel","stamped_carriage_house","stamped_shaker","recessed_panel"], 
                    contemporary:["sterling","planks","skyline_flush","aluminum"],
                    carriage:["shoreline","steel_overlay","wood_overlay","fiber_glass_overlay","stamped_carriage_house","stamped_shaker","recessed_panel"]}
  let generatedRoutes = []
  // console.log(subTypeImages["contemporary"])
  for (const type in doorTypes){/*Route for each door type*/
    generatedRoutes.push(<Route path={`${type}/`} 
    element={<DoorSelector handleDoorSelection={handleDoorSelection} doorType={type} doorImages={subTypeImages[type]}/>} />)
    for (const doorName of doorTypes[type]){/*Route for doorType/doorName*/
      generatedRoutes.push(<Route path={`${type}/${doorName}/build`} element={<Build selectedDoor={selectedDoor} doorType={type}/>} />)
    }
  }
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
