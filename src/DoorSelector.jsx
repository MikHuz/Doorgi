import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './css/DoorSelector.css'
import Build from './Build.jsx'
import RaisedPanel from './assets/Raised_Panel.jpg';
import StampedCarriage from './assets/Stamped_Carriage_House.jpg';
import cedar from './assets/Colors/woods/accents-cedar.jpg';
import carbon from './assets/Colors/woods/accents-carbonOak.jpg';
import natural from './assets/Colors/woods/accents-naturalOak.jpg';
import darkOak from './assets/Colors/woods/accents-darkOak.jpg';
import mahogany from './assets/Colors/woods/accents-mahogany.jpg';
import driftwood from './assets/Colors/woods/accents-driftwood.jpg';
import walnut from './assets/Colors/woods/accents-walnut.jpg';
import StampedShaker from './assets/Stamped_Shaker.jpg';
const Doors=[
{name:"Raised Panel",defaultImg:RaisedPanel,id:"Raised",defaultDesign:"Short Panel",defaultColor:"White",rwd:"CHI_Raised.rwd",
 colors:{White:"#EAEEED","Sandstone":"#9E9188",Almond:"#D5CBBF",Brown:"#4D3B37",Bronze:"#6E6D69",Gray:"#9C9DA1","Desert Tan":"#CBC4B1","Black":"#242625","Graphite":"#46494E"},
woods: {
  Cedar: cedar,
  "Carbon Oak": carbon,
  "Natural Oak": natural,
  "Dark Oak": darkOak,
  Mahogany: mahogany,
  Driftwood: driftwood,
  Walnut: walnut
},
 designs:{"Short Panel":"img_here","Long Panel":"Img_here"},
 windows:{
    position:{},
    glass:{},
    inserts:{}
  }
},
{name:"Stamped Carriage House",defaultImg:StampedCarriage,id:"StampedCarriage",defaultDesign:"Short Panel",defaultColor:"White",rwd:"CHI_StampedCarriageHouse.rwd",
colors:{White:"#EAEEED",Sandstone:"#9E9188",Almond:"#D5CBBF",Brown:"#4D3B37",Bronze:"#6E6D69",Gray:"#9C9DA1","Desert Tan":"#CBC4B1","Black":"#242625","Graphite":"#46494E"},
woods: {
  Cedar: cedar,
  "Carbon Oak": carbon,
  "Natural Oak": natural,
  "Dark Oak": darkOak,
  Mahogany: mahogany,
  Driftwood: driftwood,
  Walnut: walnut
}, 
designs:{"Short Panel":"img_here","Long Panel":"Img_here"},
 windows:{
    position:{},
    glass:{},
    inserts:{}
  }
},
{name:"Stamped Shaker",defaultImg:StampedShaker,id:"StampedShaker",defaultDesign:"Shaker",defaultColor:"White",rwd:"CHI_StampedShaker.rwd",
colors:{White:"#EAEEED",Sandstone:"#9E9188",Almond:"#D5CBBF",Brown:"#4D3B37",Bronze:"#6E6D69",Gray:"#9C9DA1","Desert Tan":"#CBC4B1","Black":"#242625","Graphite":"#46494E"},
woods: {
  Cedar: cedar,
  "Carbon Oak": carbon,
  "Natural Oak": natural,
  "Dark Oak": darkOak,
  Mahogany: mahogany,
  Driftwood: driftwood,
  Walnut: walnut
}, 
designs:{"ShortPanel":"img_here","LongPanel":"Img_here"},
 windows:{
    position:{},
    glass:{},
    inserts:{}
  }
}]

function DoorSelector({handleDoorSelection,doorType}) {
  const [doorIndex, setDoorIndex] = useState(0)

  useEffect(() => {
    console.log("INSIDE USEEFFECT")
    //Runs after render. This React hoook is used to handle interactions after everything in the component has rendered
    //React strictmode calls this twice for bug detecton(not in production builds), as such this creat two event listeners 
    const carousel = document.getElementById("doorSelectCarousel");
    const handleSlide = (event) => {
      console.log("EVENT:",  event)
      const newIndex = event.to;
      setDoorIndex(newIndex);
      /*alert("Changed to door index: " + newIndex);*/
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
        <img src={Doors[i].defaultImg} className="img-fluid" alt={`Garage door ${i + 1}`} />
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

