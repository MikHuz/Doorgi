import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './DoorSelector.css'
import Build from './Build.jsx'
import door from './assets/door.jpg';
import door2 from './assets/door2.jfif';
import door3 from './assets/door3.jpg';
import door4 from './assets/door4.jpg';
import door5 from './assets/door5.jpg';
let doors=[door,door2,door3,door4,door5]


function DoorSelector({handleDoorSelection,doorType}) {
  const [doorIndex, setDoorIndex] = useState(0)//Still must be defined at the top level

  useEffect(() => {
    console.log("INSIDE USEEFFECT")
    //Runs after render. This React hoook is used to handle interactions after everything in the component has rendered
    //React strictmode calls this twice for bug detecton(not in production builds), as such this creat two event listeners 
    const carousel = document.getElementById("carouselExample");
    const handleSlide = (event) => {
      console.log("EVENT:",  event)
      const newIndex = event.to;
      setDoorIndex(newIndex);
      alert("Changed to door index: " + newIndex);
    };

    if (carousel) {
      carousel.addEventListener("slid.bs.carousel", handleSlide);
    }

    //the return is optional and is the "cleanup function", react runs this upon the second useEffect call
    return () => {
      if (carousel) {//By remvoing the listener, you avoid the double behavior in strictMode
        carousel.removeEventListener("slid.bs.carousel", handleSlide);
      }
    };
  }, []);

  const handleBuildBtn = () =>{
    
    //alert("Inside handle buoild btn");
    handleDoorSelection(doorIndex) 
  }

  let doorElements =[]

  for (let i = 0; i < doors.length; i++) {
    doorElements.push(
      <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i} id="carouselItem">
          <span><b>Garage door {i + 1}</b></span>
        <img src={doors[i]} className="d-block w-50 img-fluid mx-auto" alt={`Garage door ${i + 1}`} />
      </div>
    );
    //console.log(elements[0])
  }

  return (
    <div className='container-fluid' id="doorSelectorContainer">
  <div className="row">
    <div className='col12'>
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-indicators">
            {doors.map((_, i) => (
              <button
                id='slide-btn'
                key={i}
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0}
                aria-label={`Door ${i + 1}`}
              /> ))}
          </div>

          <div className="carousel-inner" id="carouselInner">
            {doorElements}
          </div>

          <button id="prevDoor"className="carousel-control-prev control-btn" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <Link to={`/${doorType}/build`}>
          <button id="build-door-btn" onClick={handleBuildBtn}>Build</button>
          </Link>

          <button id="nextDoor"className="carousel-control-next control-btn" type="button" data-bs-target="#carouselExample" data-bs-slide="next" >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>

        </div>
      </div>
    </div>
  </div>);
}

export default DoorSelector

