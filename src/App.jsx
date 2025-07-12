import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import DoorSelector from "./DoorSelector.jsx";
import Build from './Build.jsx'
import './css/Home.css'
import door from './assets/door_imgs/door.jpg';
import door2 from './assets/door_imgs/door2.jfif';
import door3 from './assets/door_imgs/door3.jpg';
import door4 from './assets/door_imgs/door4.jpg';
import door5 from './assets/door_imgs/door5.jpg';
let doors=[door,door2,door3,door4,door5]

function Traditional(){
return (<h1>Traditonal</h1>)
}

function Contemporary(){
return (
  <h1> Contemporary</h1>
)
}


function SlideShow(props){ 
  let doorElements = doors.map((imgSrc, i) => (
    <div id="homeItemSlide" className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
      <img src={imgSrc} className="img-fluid" alt={`Garage door ${i + 1}`} />
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
  return (
    <div className="container-fluid" id="homeContainer">
      <div className="row justify-content-center row-slide">
        <div className="col col-fit">
          <h1>Traditional</h1>
          <SlideShow id="Carousel-trad" />
          <Link id="view-btn-link"to="/traditional">
          <button id="view-doors-type-btn" style={{}}>View</button>
          </Link>
        </div>
      </div>

      <div className="row justify-content-center row-slide">
          <div className="col col-fit">
            <h1>Contemporary</h1>
            <SlideShow id="Carousel-cont" />
            <Link id="view-btn-link" to="/contemporary">
            <button id="view-doors-type-btn" style={{}}>View</button>
            </Link>
        </div>
      </div>
    </div>
  );
}

function Footer(){
  return (
<h1>Footer</h1>
  );
}


function App() {
  const [selectedDoor,setSelectedDoor] = useState(null)
  const handleDoorSelection = (door) =>{
   // alert("Selected:" + door.name)
    setSelectedDoor(door)
  }
const doorTypes = 
{traditional:["raised_panel","stamped_carriage_house","stamped_shaker","recessed_panel"], 
contemporary:["sterling","planks","skyline_flush","aluminum"]}
let generatedRoutes = []
for (const type in doorTypes){
  generatedRoutes.push(<Route path={`${type}/`} 
    element={<DoorSelector handleDoorSelection={handleDoorSelection} doorType={type}/>} />)
  for (const doorName of doorTypes[type]){
    generatedRoutes.push(<Route path={`${type}/${doorName}/build`} element={<Build selectedDoor={selectedDoor} />} />)
  }
 }console.log(generatedRoutes)
  return (
    <>
      {/*<Header/>*/}
<Routes>
  <Route path="/" element={<HomePage />} />
   {generatedRoutes}
</Routes>

      {/*<Footer/>*/}
    </>
  );
}

export default App;
