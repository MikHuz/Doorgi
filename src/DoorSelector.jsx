import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './css/DoorSelector.css'
import Build from './Build.jsx'
/*Traditional Doors*/
import RaisedPanel from './assets/door_imgs/traditional/Raised_Panel.jpg';
import StampedCarriage from './assets/door_imgs/traditional/Stamped_Carriage_House.jpg';
import StampedShaker from './assets/door_imgs/traditional/Stamped_Shaker.jpg';
import RecessedPanel from  './assets/door_imgs/traditional/Recessed_Panel.jpg';
/*Traditional Designs*/
import shortPanelRaised from './assets/Designs/traditional/Raised_Panel_Short.jpg'
import longPanelRaised from './assets/Designs/traditional/Raised_Panel_Long.jpg'
import shortPanelStamped from './assets/Designs/traditional/Stamped_Carriage_Short.jpg'
import longPanelStamped from './assets/Designs/traditional/Stamped_Carriage_Long.jpg'
import stampedShakerDesign from './assets/Designs/traditional/Stamped_Shaker.jpg'
import flush from './assets/Designs/contemporary/Flush.jpg'
/*Contemporary Doors*/
import Sterling  from './assets/door_imgs/contemporary/Sterling.jpg'
import Planks from './assets/door_imgs/contemporary/Planks.jpg'
import SkylineFlush from './assets/door_imgs/contemporary/Flush.jpg'
import Aluminum from './assets/door_imgs/contemporary/Aluminum.jpg'
/*Contemporary Designs*/
import shortWindows from './assets/Designs/contemporary/No_Or_Short_Windows.jpg'
import longWindows from './assets/Designs/contemporary/Long_Windows.jpg'
import overSizedWindows from './assets/Designs/contemporary/Oversized_Windows.jpg'
import fullView from './assets/Designs/contemporary/Full_View_Aluminum.jpg'
/*Carriage Doors */
import Shoreline from './assets/door_imgs/carriage/Shoreline.jpg'
/*Carriage Designs*/
import tenA from './assets/Designs/carriage/10A.jpg'
import elevenA from './assets/Designs/carriage/11A.jpg'
import twelveA from './assets/Designs/carriage/12A.jpg'
import thiryThreeA from './assets/Designs/carriage/33A.jpg'
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
import raisedTemple from './assets/Designer_Glass/short_Temple.png'
import raisedNewPort from './assets/Designer_Glass/short_Newport.png'
import raisedSomsertSetBrass from './assets/Designer_Glass/short_somerset_brass.jpg'
import raisedSomsertSetPlat from './assets/Designer_Glass/short_somerset_platinum.jpg'
import raisedHawthorneBrass from './assets/Designer_Glass/short_hawthorne_brass.jpg'
import raisedHawthornePlat from './assets/Designer_Glass/short_hawthorne_platinum.jpg'
import carriageTemple from './assets/Designer_Glass/Long_Temple.png'
import carriageNewport from './assets/Designer_Glass/Long_Newport.png'
import carriageFlorence from './assets/Designer_Glass/Long_Florence.png'

/*Glass Inserts*/
import noInserts from './assets/Inserts/no-insert-long.jpg'
import prarire from './assets/Inserts/prairie-long.jpg'
import sherwood from './assets/Inserts/sherwood-long.jpg'
import stockton from './assets/Inserts/stockton-long.jpg'
import sunburst from './assets/Inserts/sunburst-long.jpg'
import waterton from './assets/Inserts/waterton-long.jpg'
import madison from './assets/Inserts/madison-long.jpg'
import cascade from './assets/Inserts/cascade-long.jpg'
import cathedral from './assets/Inserts/cathedral-short.jpg'
const traditionalDoors=[
{name:"Raised Panel",defaultImg:RaisedPanel,id:"Raised",defaultDesign:"Short Panel",defaultColor:"Almond",rwd:"CHI_Raised.rwd",
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
    Cathedral: cathedral,
    Cascade: cascade
  },
  hardware:null
  }
},
{name:"Recessed Panel",defaultImg:RecessedPanel,id:"Recessed",defaultDesign:"Flush",defaultColor:"Sandstone",rwd:"CHI_Recessed.rwd",
 colors:{White:"#EAEEED","Sandstone":"#9E9188",Almond:"#D5CBBF"},
  woods: null,
 designs:{"Short Panel":shortPanelRaised,"Long Panel":longPanelRaised,"Flush":flush,},
 windows:{
    position:{},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips},
    designerGlass: null,
    inserts: {
    "No Inserts": noInserts,
    Stockton: stockton,
    Madison:madison
  },
  hardware:null
  }
},
{name:"Stamped Carriage House",defaultImg:StampedCarriage,id:"StampedCarriage",defaultDesign:"Short Panel",defaultColor:"Brown",rwd:"CHI_StampedCarriageHouse.rwd",
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
    designerGlass:{Temple:carriageTemple,Newport:carriageNewport,Florence:carriageFlorence},
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
{name:"Stamped Shaker",defaultImg:StampedShaker,id:"StampedShaker",defaultDesign:"Shaker",defaultColor:"Gray",rwd:"CHI_StampedShaker.rwd",
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
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips,Seeded:seeded},
    designerGlass:{Temple:carriageTemple,Newport:carriageNewport,Florence:carriageFlorence},
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
  },
  hardware:{}
}]

const contemporaryDoors = [
{name:"Sterling",defaultImg:Sterling,id:"Sterling",defaultDesign:"Flush",defaultColor:"Sandstone",rwd:"CHI_Sterling.rwd",
colors:{"Bone White":"#F8F4EC","Sandstone":"#E8E4d4",Almond:"#E8dCC4","Medium Bronze":"#584C3C",Charcoal:"#404444","Slate Gray":"#807c74","Deep Black":"#281c24", "Hartford Green":"#283c3c"},
woods:null,
designs:{Flush:flush},
 windows:{
    position:{},
    glass:{"Tinted": tinted},
    designerGlass:null,
   inserts:null,
  hardware:null
  }
},
{name:"Planks",defaultImg:Planks,id:"Planks",defaultDesign:"No Or Short Windows",defaultColor:"Cedar",rwd:"CHI_Planks.rwd",
colors:{White:"#EAEEED",Sandstone:"#9E9188",Almond:"#D5CBBF",Brown:"#4D3B37",Bronze:"#6E6D69",Gray:"#9C9DA1","Desert Tan":"#CBC4B1","Black":"#242625","Graphite":"#46494E"},
woods:{
  Cedar: cedar,
  "Carbon Oak": carbon,
  "Natural Oak": natural,
  "Dark Oak": darkOak,
  Mahogany: mahogany,
  Driftwood: driftwood,
  Walnut: walnut
},
designs:{"No Or Short Windows":shortWindows ,"Long Windows":longWindows,"Oversized Windows":overSizedWindows},
 windows:{
    position:{},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips},
    designerGlass:{  
      Temple: raisedTemple,
      Newport: raisedNewPort,
      "Somerset Brass": raisedSomsertSetBrass,
      "Somerset Platinum": raisedSomsertSetPlat,
      "Hawthorne Brass": raisedHawthorneBrass,
      "Hawthorne Platinum": raisedHawthornePlat},
    inserts: {
    "No Inserts": noInserts,
    Prairie: prarire,
    Sherwood: sherwood,
    Stockton: stockton,
    Sunburst: sunburst,
    Waterton: waterton,
    Cathedral: cathedral,
    Cascade: cascade
  }
  }
},
{name:"Skyline Flush",defaultImg:SkylineFlush,id:"SkylineFlush",defaultDesign:"No Or Short Windows",defaultColor:"Natural Oak",rwd:"CHI_SkylineFlush.rwd",
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
designs:{"No Or Short Windows":shortWindows ,"Long Windows":longWindows,"Oversized Windows":overSizedWindows},
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
    Cathedral: cathedral,
    Cascade: cascade
  }
  },
  hardware:{}
},
{name:"Aluminum",defaultImg:Aluminum,id:"Aluminum",defaultDesign:"Full View",defaultColor:"Anodized",rwd:"CHI_AluminumFullview.rwd",
colors:{Anodized:"#a0a4ac",White:"#EAEEED"},
woods:null, 
designs:{"Full View":fullView},
 windows:{
    position:{},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips},
    designerGlass: null,
   inserts: null,
  hardware:{}
}}]
const carriageDoors=[
{name:"Shorline",defaultImg:Shoreline,id:"Shoreline",defaultDesign:"10A",defaultColor:null,rwd:"CHI_Shoreline.rwd",
 style:"Accents Overlay",
 colors:null,
 woods:null,
 designs:{"10A":tenA,"11A":elevenA,"12A":twelveA,"33A":thiryThreeA},
 windows:null,
hardware:null
},
{name:"Recessed Panel",defaultImg:RecessedPanel,id:"Recessed",defaultDesign:"Flush",defaultColor:"Sandstone",rwd:"CHI_Recessed.rwd",
 colors:{White:"#EAEEED","Sandstone":"#9E9188",Almond:"#D5CBBF"},
  woods: null,
 designs:{"Short Panel":shortPanelRaised,"Long Panel":longPanelRaised,"Flush":flush,},
 windows:{
    position:{},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips},
    designerGlass: null,
    inserts: {
    "No Inserts": noInserts,
    Stockton: stockton,
    Madison:madison
  },
  hardware:null
  }
},
{name:"Stamped Carriage House",defaultImg:StampedCarriage,id:"StampedCarriage",defaultDesign:"Short Panel",defaultColor:"Brown",rwd:"CHI_StampedCarriageHouse.rwd",
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
    designerGlass:{Temple:carriageTemple,Newport:carriageNewport,Florence:carriageFlorence},
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
{name:"Stamped Shaker",defaultImg:StampedShaker,id:"StampedShaker",defaultDesign:"Shaker",defaultColor:"Gray",rwd:"CHI_StampedShaker.rwd",
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
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips,Seeded:seeded},
    designerGlass:{Temple:carriageTemple,Newport:carriageNewport,Florence:carriageFlorence},
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
  },
  hardware:{}
}]


function DoorSelector({handleDoorSelection,doorType}) {
  const [doorIndex, setDoorIndex] = useState(0)
  var Doors;
  switch(doorType){
    case("traditional"): Doors = traditionalDoors
    break;
    case("contemporary"): Doors = contemporaryDoors
    break;
    case("carriage"): Doors = carriageDoors
    break;
  }
  const doorName = Doors[doorIndex].name.replace(/ /g, '_').toLowerCase()

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
    //alert(doorName)
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

          <Link to={`/${doorType}/${doorName}/build`}>
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

