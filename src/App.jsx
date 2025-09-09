import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import DoorSelector from "./DoorSelector.jsx";
import Build from './Build.jsx'
import './css/Home.css'
import './css/index.css'
import door from './assets/door_imgs/door.jpg';
import door2 from './assets/door_imgs/door2.jfif';
import door3 from './assets/door_imgs/door3.jpg';
import door4 from './assets/door_imgs/door4.jpg';
import door5 from './assets/door_imgs/door5.jpg';
let doors=[door,door2,door3,door4,door5]/*Will need to be replaced with actual door images*/

/*Two Placeholder components may be deleted*/
function Traditional(){
return (<h1>Traditonal</h1>)
}

function Contemporary(){
return (
  <h1> Contemporary</h1>
)
}

function SlideShow(props){ /*Slideshow for each doorType carousel*/
    useEffect(() => {
      const carouselEl = document.getElementById(props.id);
      if (carouselEl) {
        /*new window.bootstrap.Carousel(carouselEl, {
          interval: 3000, 
          ride: 'carousel' 
        });*/
      }
  }, [props.id]);
  let doorElements = doors.map((imgSrc, i) => (
    <div id="homeItemSlide" className={`carousel-item ${i === 0 ? 'active' : ''} `} key={i}>
      <img src={imgSrc} className="d-block w-100" alt={`Garage door ${i + 1}`} />
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

        <button className="carousel-control-prev" type="button" data-bs-target={`#${props.id}`} data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target={`#${props.id}`} data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
}

function HomePage() {
  return (<>  
    <div id="test-flex">
      <h1 className="bg-orange-main">Header 1</h1>
      <h2 className="bg-orange-dark">Header 2</h2>
      <h3 className="bg-orange-light">Header 3</h3>
      <h4 className="bg-yellow">Header 4</h4>
      <h5 className="bg-main">Header 5</h5>
      <h6 className="bg-dark">Header 6</h6>
      <p>This is a paragraph of text to test scaling. Resize the window to see how clamp() behaves.</p>
      <span>This is a span element (inline by default).</span>
      <button>Click Me</button>
    </div>
    <h2 className="home-header">Traditional</h2>
    <SlideShow id="Carousel-trad" />
    <Link id="view-btn-link"to="/traditional">
      <button id="view-doors-type-btn" style={{}}>View Traditional Doors</button>
    </Link>
    
    <h2  className="home-header">Contemporary</h2>
    <SlideShow id="Carousel-cont" />
    <Link id="view-btn-link" to="/contemporary">
      <button id="view-doors-type-btn" style={{}}>View Contemporary Doors</button>
    </Link>
    
    <h2  className="home-header">Carriage</h2>
    <SlideShow id="Carousel-carriage" />
    <Link id="view-btn-link" to="/carriage">
      <button id="view-doors-type-btn" style={{}}>View Carriage Doors</button>
    </Link>
  </>);
}

function Footer(){
  return (
  <h1>Footer</h1>
  );
}

function App() {
  const [selectedDoor,setSelectedDoor] = useState(null)
  const handleDoorSelection = (door) =>{setSelectedDoor(door);}
  const doorTypes = {traditional:["raised_panel","stamped_carriage_house","stamped_shaker","recessed_panel"], 
                    contemporary:["sterling","planks","skyline_flush","aluminum"],
                    carriage:["shoreline","overlay_shoreline"]}
  let generatedRoutes = []
  for (const type in doorTypes){/*Route for each door type*/
    generatedRoutes.push(<Route path={`${type}/`} 
    element={<DoorSelector handleDoorSelection={handleDoorSelection} doorType={type}/>} />)
    for (const doorName of doorTypes[type]){/*Route for doorType/doorName*/
      generatedRoutes.push(<Route path={`${type}/${doorName}/build`} element={<Build selectedDoor={selectedDoor} doorType={type}/>} />)
    }
  }
  console.log("ROUTES:", generatedRoutes)
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
