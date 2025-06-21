import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './Build.css'
import DoorSelector from "./DoorSelector.jsx";
import door from './assets/Raised_Panel.jpg';
import shortDoor from'./assets/Raised_Panel_Short.jpg';
import door2 from './assets/Stamped_Carriage_House.jpg';
import door3 from './assets/Stamped_Shaker.jpg';
let doors=[door,door2,door3]
const lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function Windows(props){
  const [selectedWindow,setSelectedWindow] = useState(null)
  const windows=['Blue','Black','Brown','Grey','Green', 'Purple', "Lime"]//Use props colors based on selected door

  const handleWindow = (event, window)=>{
    alert(window)
  }

   let windowDivs = windows.map( (window) =>{
    return(
      <div
        key={window}
        className={selectedWindow === window ? 'selected' : ''}
        onClick={(event) => handleWindow(event, window)} >
      </div> ) } );
  return (<>
  <div id="windows">
    <h1>Windows</h1>
   {windowDivs}
  </div>

    </>);
}
function Color(props){
  const [selectedColor,setSelectedColor] = useState(null)
  const colors=['Blue','Black','Brown','Grey','Green', 'Purple', "Lime"]//Use props colors based on selected door

  const handleColor = (event, color)=>{
    alert(color)
    setSelectedColor(color)
    props.setColor(color)
  }
   let colorDivs = colors.map( (color) =>{
      return(
      <div
        key={color}
        style={{backgroundColor:`${color}`}}
        className={selectedColor === color ? 'selected' : ''}
        onClick={(event) => handleColor(event, color)} >
      </div> ) } );
return(
<>   
<div id="colors">
  <h1>Color</h1>
  {colorDivs}
</div>
</>
    )
}

export default function Build({ selectedDoor }) {

  const [selectedColor, setSelectedColor] = useState(null)
  const [Price, setPrice] = useState(1000)
  const [Size,setSize] = useState("Double")
  const [Design,setDesign] = useState("ShortPanel")
  const URL = "https://chi-api.renoworks.com/RenderGrid"
  const headers = {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      "Connection":"keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Content-Length": "255",
      "Host": "chi-api.renoworks.com",
      "Origin":"https://doorvisions.chiohd.com"
    }
  const pattern="24|-|-;24|-|-;18|-|-;18|-|-;"
  let rwdRaised = "CHI_Raised.rwd"
  let rwdCarriage= "CHI_StampedCarriageHouse.rwd"
  let rwdShaker = "CHI_StampedShaker.rwd"
  const patterns = {
    /*NameSizeDesign*/
    RaisedSingleShortPanel: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    RaisedSingleLongPanel: "21|-|-;21|-|-;21|-|-;21|-|-;",
    RaisedDoubleShortPanel: "21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;",
    RaisedDoubleLongPanel: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    StampedCarriageSingleShortPanel: "21|-|-;21|-|-;21|-|-;21|-|-;",/*Short/Long have same pattern*/
    StampedCarriageDoubleShortPanel: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",/*Short/Long have same pattern*/
    StampedShakerSingleShaker: "21|-|-;21|-|-;21|-|-;21|-|-;",
    StampedShakerDoubleShaker: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;"
  };
  const site ="CHI"
  const ppf= "80"
  const firstRun = 1
  const api_key= "5809bc44-3cf7-42c5-8395-a9558bb40647"
  const responsePath = "https://chi-api.renoworks.com/data/CHI"
  //alert(selectedDoor)
  const setColor = (color) =>{
    console.log(color)
    //alert("test",color)
  } 
    useEffect(() => {
    // Add class when component mounts
    document.body.classList.add('build-page');

    // Remove class when component unmounts
    return () => {
      document.body.classList.remove('build-page');
    };
  }, []);

  const findPattern = () =>{

    
  }

  const handleSize = (e,size)=>{
    console.log("Passing: ",size)
    setSize(size)
    alert("Size is now:",size)
    let key = selectedDoor.id + size + Design;
    console.log("key: ",key)
    let pattern = patterns[key]
    console.log("Patternb:",pattern)
    let gridSettings = 0;
    console.log(e)
    if (Size=="single"){
      var width = "640";var height="560"
    }
    else{  var width = "1280";var height="560"}
    /*fetch(URL, {
    method: "POST",
    headers: {headers
    },
    body: JSON.stringify({
      "rwd":"CHI_Raised.rwd",
      "pattern": pattern,
      "gridSettings":"Design=Short Panel|Width=Double",
      "width":width,
      "height":height,
      "site":site,
      "ppf":ppf,
      "api_key":api_key
    })
  })
    .then((res) => res.json())
    .then((data) => console.log("Success:", data))
    .catch((err) => console.error("Error:", err));*/
  }
  return (
    <>
    <div className="container-fluid" id='buildContainer'>
      <div className="row gy-0">
        <div id="col-img"className='col-12 col-md-8 d-flex flex-column align-items-center gy-3'>
          <h1 id="doorName">{selectedDoor?.name || "Door"}</h1>
          <div style={{textAlign:"center", width: "100%",border:"2px solid red"}}>
            <img src={selectedDoor?.img || door}className="img-fluid" style={{ borderRadius: "5%" }} />
          </div>
        </div>
          <div id="col-options" className='col12 col-md-4 d-flex flex-column gap-1'>
            <div id="sizeContainer" style={{display:"flex", flexWrap:"wrap", justifyContent:"center",   columnGap: "1vw"}}> 
              <h1 style={{flexGrow:"1", border:"2px solid blue"}}>Size</h1>
              <span onClick={(e) => handleSize(e,"Single")} >Single Door 8' X 7'</span>
              <span onClick={(e) => handleSize(e,"Double")}>Double Door 16' X 7'</span>
            </div>
           <Color/>
           <Windows/>
          </div>
      </div>
    </div>
   </>
  );
}