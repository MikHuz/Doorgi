import { useState, useEffect,useRef} from 'react'
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
import carriageSteel from  './assets/door_imgs/carriage/Steel Overlay.jpg'
/*Carriage Designs*/
import ten from './assets/Designs/carriage/10.jpg'
import tenA from './assets/Designs/carriage/10A.jpg'
import eleven from './assets/Designs/carriage/11.jpg'
import elevenA from './assets/Designs/carriage/11A.jpg'
import twelve from './assets/Designs/carriage/12.jpg'
import twelveA from './assets/Designs/carriage/12A.jpg'
import thirtyThree from './assets/Designs/carriage/33.jpg'
import thirtyThreeA from './assets/Designs/carriage/33A.jpg'

/*Wood Types*/
import cedar from './assets/Colors/woods/accents-cedar.jpg';
import carbon from './assets/Colors/woods/accents-carbonOak.jpg';
import natural from './assets/Colors/woods/accents-naturalOak.jpg';
import darkOak from './assets/Colors/woods/accents-darkOak.jpg';
import mahogany from './assets/Colors/woods/accents-mahogany.jpg';
import driftwood from './assets/Colors/woods/accents-driftwood.jpg';
import walnut from './assets/Colors/woods/accents-walnut.jpg';

/*Window Position*/
import top from './assets/window_position/1st.jpg'
import topTwo from './assets/window_position/1st.jpg'
import topRow from './assets/window_position/2_top_rows.jpg'
import full from './assets/window_position/full.jpg'
import right from './assets/window_position/right.jpg'
import left from './assets/window_position/left.jpg'
/*Window Position*/

/*Glass*/
import plain from './assets/Glass/Thumb_Plain.jpg'
import tinted from './assets/Glass/Thumb_Tinted.jpg'
import obscure from './assets/Glass/Thumb_Obscure.jpg'
import frosted from './assets/Glass/Thumb_Frosted.jpg'
import glueChips from './assets/Glass/Thumb_GlueChips.jpg'
import seeded from './assets/Glass/Thumb_Seeded.jpg'

/*Stylelite*/
import litePlain from './assets/Stylelite/plain.png'
import liteTinted from './assets/Stylelite/tinted.png'
import liteFrosted from './assets/Stylelite/frosted.png'
import liteRain from './assets/Stylelite/rain.png'
/*Stylelite*/

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

/*Insulation */
import standardInsulation from  './assets/Insulation/traditional/raised/standard/2250_shortPanel.jpg'
import premiumInsulation from  './assets/Insulation/traditional/raised/premium/2283_shortPanel.jpg'

import standardRaisedPanel from './assets/Insulation/traditional/raised/standard/2250_shortPanel.jpg' 
import premiumRaisedPanel from './assets/Insulation/traditional/raised/premium/2283_shortPanel.jpg' 
import standardStampedCarriage from './assets/Insulation/traditional/stampedCarriage/standard/5250_shortCarriage.jpg' 
import premiumStampedCarriage  from './assets/Insulation/traditional/stampedCarriage/premium/5283_shortCarriage.jpg'
import standardStampedShaker from './assets/Insulation/traditional/stampedShaker/standard/2550_stampedShaker.jpg'
import premiumStampedShaker from './assets/Insulation/traditional/stampedShaker/premium/2583_stampedShaker.jpg'
import premiumRecessed from './assets/Insulation/traditional/recessed/premium/2298_recessedShort.jpg'
import premiumShoreline from './assets/Insulation/traditional/recessed/premium/2298_recessedShort.jpg'

import premiumSterling from './assets/Insulation/contemporary/sterling/2783_sterling.jpg'
import standardPlank from  './assets/Insulation/traditional/raised/standard/2250_shortPanel.jpg'
import premiumPlank from  './assets/Insulation/contemporary/planks/premium/2328_short.jpg'
import aluminumStandard from'./assets/Insulation/contemporary/aluminum/3295R_standard.jpg'
import aluminumPremium from'./assets/Insulation/contemporary/aluminum/3297R_premium.jpg'
import carriageSteelStandard from'./assets/Insulation/carriage/5300_standard.jpg'
import carriageSteelPremium from'./assets/Insulation/carriage/5600_premium.jpg'

let commonInserts = {"No Inserts": noInserts,Prairie: prarire,Sherwood: sherwood, Stockton: stockton,Sunburst: sunburst,Waterton: waterton,Cathedral: cathedral,Cascade: cascade}
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
  Insulation:{"StandardImg":standardRaisedPanel,"Standard":{"Short Panel":2250,"Long Panel":4250}, 
              "PremiumImg": premiumRaisedPanel, Premium:{"Short Panel":2283,"Long Panel":4283}},
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
    "Any Design":{
      ...commonInserts
    }
  },
  hardware:null
  }
},
{name:"Recessed Panel",defaultImg:RecessedPanel,id:"Recessed",defaultDesign:"Short Panel",defaultColor:"Sandstone",rwd:"CHI_Recessed.rwd",
  colors:{White:"#EAEEED","Sandstone":"#9E9188",Almond:"#D5CBBF"},
  woods: null,
  designs:{"Short Panel":shortPanelRaised,"Long Panel":longPanelRaised,"Flush":flush,},
  Insulation:{"StandardImg":standardRaisedPanel, "Standard":null, 
              "PremiumImg": premiumRecessed, Premium:{"Short Panel":2298,"Long Panel":2294,"Flush":2291}},
  windows:{
    position:{},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips},
    designerGlass: null,
    inserts: {"Any Design":
      {"No Inserts": noInserts,
      Stockton: stockton,
      Madison:madison}
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
  Insulation:{"StandardImg": standardStampedCarriage,"Standard":{"Short Panel":5250, "Long Panel":5950}, 
              "PremiumImg": premiumStampedCarriage, "Premium":{"Short Panel":5283,"Long Panel":5983,}},
  windows:{
    position:{},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips,"Seeded":seeded},
    designerGlass:{Temple:carriageTemple,Newport:carriageNewport,Florence:carriageFlorence},
    inserts: {
    "Any Design":{
      ...commonInserts
      }
    }
  }
},
{name:"Stamped Shaker",defaultImg:StampedShaker,id:"StampedShaker",defaultDesign:"Shaker",defaultColor:"Bronze",rwd:"CHI_StampedShaker.rwd",
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
  Insulation:{"StandardImg": standardStampedShaker,"Standard":{"Shaker":2550}, 
              "PremiumImg": premiumStampedShaker, "Premium":{"Shaker":2583}},
  windows:{
    position:{},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips,Seeded:seeded},
    designerGlass:{Temple:carriageTemple,Newport:carriageNewport,Florence:carriageFlorence},
    inserts: {
      "Any Design":{
      ...commonInserts
      }
    }
  },
  hardware:{}
}]

const contemporaryDoors = [
{name:"Sterling",defaultImg:Sterling,id:"Sterling",defaultDesign:"Flush",defaultColor:"Sandstone",rwd:"CHI_Sterling.rwd",
  colors:{"Bone White":"#F8F4EC","Sandstone":"#E8E4d4",Almond:"#E8dCC4","Medium Bronze":"#584C3C",Charcoal:"#404444","Slate Gray":"#807c74","Deep Black":"#281c24", "Hartford Green":"#283c3c"},
  woods:null,
  designs:{Flush:flush},
  Insulation:{"StandardImg": standardStampedShaker,"Standard":null, 
              "PremiumImg": premiumSterling, "Premium":{"Flush":2783}},
  windows:{
    position:{"Top Row":top,"All Glass":full},
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
  designs:{"No Or Short Windows":shortWindows ,"Long Windows":longWindows},
  Insulation:{"StandardImg": standardPlank,"Standard":null, 
              "PremiumImg": premiumPlank, "Premium":{"No Or Short Windows":2327, "Long Windows":2347}},
  windows:{
    position:{"First Row":top,"Right Edge":right,"Left Edge":left},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips},
    styleLite:{"StyleLite Plain":litePlain,"StyleLite Tinted":liteTinted,"StyleLite Frosted":liteFrosted,"StyleLite Rain":liteRain},
    designerGlass:{  
      Temple: raisedTemple,
      Newport: raisedNewPort,
      "Somerset Brass": raisedSomsertSetBrass,
      "Somerset Platinum": raisedSomsertSetPlat,
      "Hawthorne Brass": raisedHawthorneBrass,
      "Hawthorne Platinum": raisedHawthornePlat},
    inserts: {
      "No Or Short Windows":{
       ...commonInserts
      },
      "Long Windows":{...commonInserts,Cathedral:null}
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
  designs:{"No Or Short Windows":shortWindows ,"Long Windows":longWindows},
  Insulation:{"StandardImg": standardInsulation,"Standard":{"No Or Short Windows":2150, "Long Windows":4150}, 
              "PremiumImg": premiumInsulation, "Premium":{"No Or Short Windows":2127, "Long Windows":2147}},
  windows:{
    position:{"First Row":top,"Right Edge":right,"Left Edge":left},
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips},
    styleLite:{"StyleLite Plain":litePlain,"StyleLite Tinted":liteTinted,"StyleLite Frosted":liteFrosted,"StyleLite Rain":liteRain},
    designerGlass: {
    Temple: raisedTemple,
    Newport: raisedNewPort,
    "Somerset Brass": raisedSomsertSetBrass,
    "Somerset Platinum": raisedSomsertSetPlat,
    "Hawthorne Brass": raisedHawthorneBrass,
    "Hawthorne Platinum": raisedHawthornePlat
    },
     inserts: {
      "No Or Short Windows":{
       ...commonInserts
      },
      "Long Windows":{...commonInserts,Cathedral:null}
    }
  },
  hardware:{}
},
{name:"Aluminum",defaultImg:Aluminum,id:"Aluminum",defaultDesign:"Full View",defaultColor:"Anodized",rwd:"CHI_AluminumFullview.rwd",
colors:{Anodized:"#a0a4ac",White:"#EAEEED"},
woods:null, 
designs:{"Full View":fullView},
Insulation:{"StandardImg": aluminumStandard ,"Standard":{"Full View":"3295R"}, 
            "PremiumImg": aluminumPremium , "Premium":{"Full View":"3297R"}},
windows:{
    glass:{Plain:plain,Obscure:obscure,Frosted:frosted,Tinted:tinted,"Glue Chips":glueChips},
    designerGlass: null,
    inserts: null,
  hardware:{}
}}]
const carriageDoors=[
{name:"Shoreline",defaultImg:Shoreline,id:"Shoreline",defaultDesign:"10",defaultColor:"Driftwood",rwd:"CHI_Shoreline.rwd",
  style:"Accents Overlay",
  colors:null,
  woods: {
    Cedar: cedar,
    "Dark Oak": darkOak,
    Driftwood: driftwood,
    Walnut: walnut
  }, 
  designs:[{ "10": ten }, { "10A": tenA }, { "11": eleven }, { "11A": elevenA }, { "12": twelve }, { "12A": twelveA }, { "33": thirtyThree }, { "33A": thirtyThreeA }],
  Insulation:{"StandardImg":carriageSteelStandard ,"Standard":null, 
            "PremiumImg": premiumShoreline , "Premium":{"Any Design":5602}},
 windows:null,
 hardware:null
},
{name:"Steel Overlay",defaultImg:carriageSteel,id:"Steel Overlay",defaultDesign:"11",defaultColor:"Bronze with Black",rwd:"CHI_OverlayCarriageHouse.rwd",
 style:"Steel Overlay",
 colors:{White:"#EAEEED","Sandstone":"#9E9188",Almond:"#D5CBBF",Bronze:"#6E6D69", Black:"#000000ff",
        "Bronze with Black":"#6E6D69,#000000ff","White with Black":"#EAEEED,#000000ff","Almond with Black":"#D5CBBF,#000000ff", "Sandstone with Black":"#9E9188,#000000ff"},
 woods:null,
 designs:[{ "10": ten }, { "10A": tenA }, { "11": eleven }, { "11A": elevenA }, { "12": twelve }, { "12A": twelveA }, { "33": thirtyThree }, { "33A": thirtyThreeA }],
 Insulation:{"StandardImg":carriageSteelStandard ,"Standard":{"Any Design":5300}, 
            "PremiumImg": aluminumPremium , "Premium":{"Any Design":5600}},
 windows:null,
 hardware:null
},
{...traditionalDoors[1]},
{...traditionalDoors[2]},
{...traditionalDoors[3]}]


function DoorSelector({handleDoorSelection,doorType}) {
  const [doorIndex, setDoorIndex] = useState(0)
  const carouselRef = useRef(null);
  const headerRef = useRef(null);
  const [buttonOffset, setButtonOffset] = useState(0);
  const [ready, setReady] = useState(false);/*Waiting for header to load fully before JSX CSS positioning, to avoid load in artifacts*/
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
  useEffect(() => {
    if (headerRef.current) {
      setButtonOffset(headerRef.current.offsetHeight);
      //alert(ready)
        setReady(true)
    }
  }, []); // run once on mount; you can also run on resize
  const handleBuildBtn = () =>{
    handleDoorSelection(Doors[doorIndex]) 
  }

  let doorElements =[]

  for (let i = 0; i < Doors.length; i++) {
    doorElements.push(
      <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i} id="doorSelectCarouselItem">
        <h1 id="doorName" ref={i === 0 ? headerRef : null}>{Doors[i].name}</h1>
        <img src={Doors[i].defaultImg}  className="img-fluid" alt={Doors[i].name} />
      </div>
    );
  }
  //console.log("IS READY?: ",ready)
  //console.log("DOORNAME:",doorName)

  return (
  <div id="centering-div">
    <div id="doorSelectCarousel" className="carousel slide">
      <div className="carousel-inner" id="doorSelectInner">
        {doorElements}
        <button id="prevDoor"className="carousel-control-prev" type="button" data-bs-target="#doorSelectCarousel" data-bs-slide="prev" 
                 >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
        </button>

        <button id="nextDoor"className="carousel-control-next" type="button" data-bs-target="#doorSelectCarousel" data-bs-slide="next"
                >
          <span id="btn"className="carousel-control-next-icon" aria-hidden="true"></span>
          <span id="btn2"className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="carousel-indicators" id="indicatorDiv">
        {Doors.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#doorSelectCarousel"
            data-bs-slide-to={i}
            className={`slide-btn ${i === 0 ? "active" : ""}`}
            aria-current={i === 0}
            aria-label={Doors[i].name}
          /> ))}
      </div>
    </div>
    <div className="btns">
      <Link to={`/`}>
        <button className="back-btn" onClick={handleBuildBtn}>Back</button>
      </Link>
      <Link to={`/${doorType}/${doorName}/build`}>
        <button className="continue-btn" onClick={handleBuildBtn}>Build</button>
      </Link>
    </div>
  </div>
  );
}

export default DoorSelector

