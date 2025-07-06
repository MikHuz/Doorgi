import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './css/DoorSelector.css'
import Build from './Build.jsx'
/*Traditional Doors*/
import RaisedPanel from './assets/Raised_Panel.jpg';
import StampedCarriage from './assets/Stamped_Carriage_House.jpg';
import StampedShaker from './assets/Stamped_Shaker.jpg';
/*Traditional Designs*/
import shortPanelRaised from './assets/Designs/Raised_Panel_Short.jpg'
import longPanelRaised from './assets/Designs/Raised_Panel_Long.jpg'
import shortPanelStamped from './assets/Designs/Stamped_Carriage_Short.jpg'
import longPanelStamped from './assets/Designs/Stamped_Carriage_Long.jpg'
import stampedShakerDesign from './assets/Designs/Stamped_Shaker.jpg'
/*Wood Types*/
import cedar from './assets/Colors/woods/accents-cedar.jpg';
import carbon from './assets/Colors/woods/accents-carbonOak.jpg';
import natural from './assets/Colors/woods/accents-naturalOak.jpg';
import darkOak from './assets/Colors/woods/accents-darkOak.jpg';
import mahogany from './assets/Colors/woods/accents-mahogany.jpg';
import driftwood from './assets/Colors/woods/accents-driftwood.jpg';
import walnut from './assets/Colors/woods/accents-walnut.jpg';

/*Glass*/
import plain from './assets/Glass/Thumb_Plain.jpg'
import tinted from './assets/Glass/Thumb_Tinted.jpg'
import obscure from './assets/Glass/Thumb_Obscure.jpg'
import frosted from './assets/Glass/Thumb_Frosted.jpg'
import glueChips from './assets/Glass/Thumb_GlueChips.jpg'
import seeded from './assets/Glass/Thumb_Seeded.jpg'
/*Designer Glass*/
import raisedTemple from './assets/Glass/Designer_Glass/short_Temple.png'
import raisedNewPort from './assets/Glass/Designer_Glass/short_Newport.png'
import raisedSomsertSetBrass from './assets/Glass/Designer_Glass/short_somerset_brass.jpg'
import raisedSomsertSetPlat from './assets/Glass/Designer_Glass/short_somerset_platinum.jpg'
import raisedHawthorneBrass from './assets/Glass/Designer_Glass/short_hawthorne_brass.jpg'
import raisedHawthornePlat from './assets/Glass/Designer_Glass/short_hawthorne_platinum.jpg'

/*Glass Inserts*/
import noInserts from './assets/Inserts/no-insert-long.jpg'
import prarire from './assets/Inserts/prairie-long.jpg'
import sherwood from './assets/Inserts/sherwood-long.jpg'
import stockton from './assets/Inserts/stockton-long.jpg'
import sunburst from './assets/Inserts/sunburst-long.jpg'
import waterton from './assets/Inserts/waterton-long.jpg'
import madison from './assets/Inserts/madison-long.jpg'
import cascade from './assets/Inserts/cascade-long.jpg'

const Doors=[
{name:"Raised Panel",defaultImg:RaisedPanel,id:"Raised",defaultDesign:"Short Panel",defaultColor:"White",rwd:"CHI_Raised.rwd",
 colors:{White:"#EAEEED","Sandstone":"#9E9188",Almond:"#D5CBBF",Brown:"#4D3B37",Bronze:"#6E6D69",Gray:"#9C9DA1","Desert Tan":"#CBC4B1","Black":"#242625","Graphite":"#46494E"/*,"Ever Green":"#114c36"*/},
woods: {
  Cedar: cedar,
  "Carbon Oak": carbon,
  "Natural Oak": natural,
  "Dark Oak": darkOak,
  Mahogany: mahogany,
  Driftwood: driftwood,
  Walnut: walnut
},
 designs:{"Short Panel":shortPanelRaised,"Long Panel":longPanelRaised},
 windows:{
    position:{},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips},
    designerGlass: {
    Temple: raisedTemple,
    Newport: raisedNewPort,
    "Somerset Brass": raisedSomsertSetBrass,
    "Somerset Platinum": raisedSomsertSetPlat,
    "Hawthorne Brass": raisedHawthorneBrass,
    "Hawthorne Platinum": raisedHawthornePlat
    },
   inserts: {
    "No Inserts": noInserts,
    Prairie: prarire,
    Sherwood: sherwood,
    Stockton: stockton,
    Sunburst: sunburst,
    Waterton: waterton,
    Madison: madison,
    Cascade: cascade
  }
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
designs:{"Short Panel":shortPanelStamped ,"Long Panel":longPanelStamped},
 windows:{
    position:{},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips,"Seeded":seeded},
    designerGlass:{},
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
designs:{"Shaker":stampedShakerDesign},
 windows:{
    position:{},
     glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips},
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

