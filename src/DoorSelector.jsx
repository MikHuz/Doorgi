import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './DoorSelector.css'
import Build from './Build.jsx'
import RaisedPanel from './assets/Raised_Panel.jpg';
import StampedCarriage from './assets/Stamped_Carriage_House.jpg';
import StampedShaker from './assets/Stamped_Shaker.jpg';
const Doors=[
{name:"Raised Panel",img:RaisedPanel,id:"Raised"},
{name:"Stamped Carriage House",img:StampedCarriage,id:"StampedCarriage"},
{name:"Stamped Shaker",img:StampedShaker,id:"StampedShaker" }]


function DoorSelector({handleDoorSelection,doorType}) {
  const [doorIndex, setDoorIndex] = useState(0)//Still must be defined at the top level

  useEffect(() => {
    console.log("INSIDE USEEFFECT")
    //Runs after render. This React hoook is used to handle interactions after everything in the component has rendered
    //React strictmode calls this twice for bug detecton(not in production builds), as such this creat two event listeners 
    const carousel = document.getElementById("doorSelectCarousel");
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
    handleDoorSelection(Doors[doorIndex]) 
  }

  let doorElements =[]

  for (let i = 0; i < Doors.length; i++) {
    doorElements.push(
      <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i} id="doorSelectCarouselItem">
          <div><b>{Doors[i].name}</b></div>
        <img src={Doors[i].img} className="img-fluid" alt={`Garage door ${i + 1}`} />
      </div>
    );
    //console.log(elements[0])
  }

  return (
<div className='container-fluid' id="doorSelectorContainer">
  <div className="row" id="doorSelectRow">
    <div className='col12' id="doorSelectCol">
        <div id="doorSelectCarousel" className="carousel slide">
          <div className="carousel-indicators"id="indicatorDiv" >
            {Doors.map((_, i) => (
              <button
                id='slide-btn'
                key={i}
                type="button"
                data-bs-target="#doorSelectCarousel"
                data-bs-slide-to={i}
                className={i === 0 ? "active" : ""}
                aria-current={i === 0}
                aria-label={`Door ${i + 1}`}
              /> ))}
          </div>

          <div className="carousel-inner" id="doorSelectInner">
            {doorElements}
          </div>

          <button id="prevDoor"className="carousel-control-prev" type="button" data-bs-target="#doorSelectCarousel" data-bs-slide="prev" >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <Link to={`/${doorType}/build`}>
          <button id="build-door-btn" onClick={handleBuildBtn}>Build</button>
          </Link>

          <button id="nextDoor"className="carousel-control-next" type="button" data-bs-target="#doorSelectCarousel" data-bs-slide="next" >
            <span id="btn"className="carousel-control-next-icon" aria-hidden="true"></span>
            <span id="btn2"className="visually-hidden">Next</span>
          </button>

        </div>
      </div>
    </div>
  </div>);
}

export default DoorSelector

