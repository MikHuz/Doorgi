import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './css/Build.css'
import DoorSelector from "./DoorSelector.jsx";
import doorgiLogo from '/logo.png'
const lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function Windows(props){
  const [showWindows,setShowWindows] = useState(false)
  const [selectedWindow,setSelectedWindow] = useState(null)
  const [glassType, setGlassType] = useState(null)
  const [showInserts,setShowInserts] = useState(false)
  const [selectedInsert,setInsert] = useState("No Insert")

  const handleWindow = (glass,glassType)=>{/*Handles Actual Window Selection*/
    alert("Inside window")
    position="FIRST ROW"/*Right now this is the default for all doors*/
    if (props.door=="Sterling"){ glassType="Infinity Windows";var position="TOP ROW"}
    setGlassType(glassType)
    if (glassType=="Glass"){ setShowInserts(true)}
    else if (glassType=="Designer Glass"){
      setShowInserts(false)
      setInsert(null)
    }
    setSelectedWindow(glass)
    props.handleWindow(glass,glassType,selectedInsert,position)
  }
  const handleShowWindows = (e)=>{/*Handles the Show Window Checkbox*/
    setShowWindows(!showWindows)
    setShowInserts(false)
    setSelectedWindow(null)
    setInsert(null)
    if (!e.target.checked && selectedWindow!=null){
      alert("Running handleWindow")
      props.handleWindow(null,"Glass",null,null)/*To display a Windowless door*/
    }
  }
  const handleGlassType = (type) =>{
    setGlassType(type);
    alert("Glass type currently: "+glassType)
    setShowInserts(type =="Glass" && (selectedWindow in props.windows.glass)? true : false )
  }
  const handleInsert = (insert) =>{
    setInsert(insert)
    props.handleWindow(selectedWindow,glassType,
    (insert=="Sunburst"?"4 piece Sunburst" : insert),
    (props.door == "Sterling") ? "TOP ROW": "FIRST ROW")
  }
  let windowDivs = (props.windows.glass!=null ? Object.entries(props.windows.glass).map( ([glass,url]) =>{
    return(
      <div key={glass} className='window-box'>
        <h5>{glass}</h5>
        <div
          key={glass}
          style={{  backgroundImage: `url(${url})`}}
          className={selectedWindow === glass ? 'selected-glass' : ''}
          onClick={() => handleWindow(glass, "Glass")} >
        </div> 
      </div>) } ): null);

    let windowDesignerDivs = (props.windows.designerGlass!=null?Object.entries(props.windows.designerGlass).map( ([glass,url])=>{
    return(
      <div key={glass} className='designer-box'>
        <h5>{glass}</h5>
        <div
          key={glass}
          style={{
            backgroundImage: `url(${url})`}}
          className={selectedWindow === glass ? 'selected-glass' : ''}
          onClick={() => handleWindow(glass,"Designer Glass")} >
        </div> 
      </div>) } ) : null);

    let insertDivs =(props.windows.inserts!=null ? Object.entries(props.windows.inserts).map( ([insert,url]) =>{
      return (
        <div key={insert} className='insert-box'>
          <h5>{insert}</h5>
          <div 
            style={{  backgroundImage: `url(${url})`}}
            className={selectedInsert === insert ? 'selected-insert' : ''}
            onClick={() => handleInsert(insert,"Inserts")} >
            </div>
        </div>)}): null); 
  return (<>
    <div id="windows">
      <label style={{width:"100%"}}>
        <b>Choose Windows:</b>
        <input type="checkbox"  style={{margin:"1%"}}onClick={(e) =>handleShowWindows(e)}/>
      </label>
      {showWindows && (
        <>
          <h1 style={{ color: "black" }}>Windows</h1>
          <div id="glass-type">
            {props.door=="Sterling" ? <span onClick={() => handleGlassType("Infinity Windows")}>Infinity Windows</span>
            : (<>
            <span onClick={() => handleGlassType("Glass")}>Glass</span>
            {props.windows.designerGlass!= null && <>
            <span>|</span>
            <span onClick={() => handleGlassType("Designer Glass")}>Designer Glass</span></>}
            </>)}
          </div>
          {glassType=="Designer Glass"? windowDesignerDivs : windowDivs}
        </>
      )}
     </div>
      {showInserts && props.windows.inserts!=null &&
      <>
      <div id="inserts">
        <h2>Choose a  Window Insert</h2>
        {insertDivs}
      </div>
      </>}
  </>);
}
function Colors(props) {
  const [IconColor, setIconColor] = useState(null);
  const [colorType, setColorType] = useState("Solid Color")
  const [hasWood] = props.woods==null ? useState(false) : useState(true)
  const handleColor = (event, color, type) => {
    setIconColor(color);
    props.handleColor(color,type);
  };
  const colorDivs = Object.entries(props.colors).map(([colorName, hexCode]) => (
    <div className="color-box" key={colorName}>
      <h5>{colorName}</h5>
      <div
        style={{ backgroundColor: hexCode }}
        className={IconColor === colorName ? 'selected' : ''}
        onClick={(event) => handleColor(event, colorName, "Solid Color")}
      />
    </div>));
 if (hasWood){
  var woodDivs = Object.entries(props.woods).map( ([woodName,woodUrl]) => (
       <div className="color-box" key={woodName}>
      <h5>{woodName}</h5>
      <div
        style={{  backgroundImage: `url(${woodUrl})`}}
        className={IconColor === woodName ? 'selected' : ''}
        onClick={(event) => handleColor(event, woodName,"Accents Woodtones")}
      />
    </div>) )
}
return(
<>   
<div id="colors-container">
  {hasWood &&<div><span onClick ={() =>setColorType("Solid Color")}>Color</span>
  <span>|</span><span onClick ={() =>setColorType("Wood")}>Wood Tone</span></div>}
  {!hasWood && <div><span onClick ={() =>setColorType("Solid Color")}>Color</span> </div>}
  {colorType === "Solid Color" ? colorDivs: woodDivs}
</div>
</>
    )
}
function Designs(props){
  //console.log("INSIDE COMPONENT:",props.designs)
  const [designStyle,setDesignStyle] = useState(null)
  const handleDesign = (design)=>{
    //console.log("STYLING:",design)
    setDesignStyle(design)
    props.handleDesign(design)
  }
  const designDivs = Object.entries(props.designs).map(([design,url]) =>{
  //console.log("DESIGN:",design,"URL:",url);
  return (<div key={design}>
    <h5>{design}</h5>
    <img   
    className={`design-imgs ${designStyle === design ? "selected-design" : ""}`}
    src={url}
    alt={design}
    onClick={() =>handleDesign(design)}/>
  </div>)})
  //console.log(designDivs)
 return(
 <div id="design-container">
  <h1>Designs</h1>
  {designDivs}
 </div>)
}
function PersistentState(key,defaultDoor){
  if (defaultDoor){
    /*alert("Setting door")*/
    localStorage.setItem(key,JSON.stringify(defaultDoor));
    //console.log("RETURNING PROP DOOR")
    //console.log(defaultDoor)
    return defaultDoor
  }
 /* alert("Returning from local storage")*/
  //console.log("RETURNING LOCAL STORAGE DOOR:")
  //console.log(JSON.parse(localStorage.getItem(key)) )
  return JSON.parse(localStorage.getItem(key))

}
export default function Build(props) {
  const selectedDoor = PersistentState("selectedDoor",props.selectedDoor)
 // console.log("DESIGNS OF CURRENT DOOR",selectedDoor.designs)
  const [Price, setPrice] = useState(1000)
  const [Size,setSize] = useState("Double")
  const [Image,setImage] = useState(selectedDoor.defaultImg) 
  const [Design,setDesign] = useState(selectedDoor.defaultDesign)
  const [Color, setColor] = useState(selectedDoor.defaultColor)
  const [colorType,setColorType] = useState(Color in selectedDoor.colors? "Solid Color":"Accents Woodtones")
  const [windowPosition, setWindowPosition] = useState(null)
  const [Glass, setGlass] = useState(null)
  const [glassType,setGlassType] = useState("Glass")
  const [windowInserts, setWindowInserts] = useState(null)
  const [loading,setLoading] = useState(false);
  const rwd = selectedDoor.rwd
  const URL = "https://chi-api.renoworks.com/RenderGrid"
  const patterns = {
    /*NameSizeDesign*/
    /*Traditional*/
    RaisedSingleShortPanel: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",             
    RaisedSingleLongPanel: "21|-|-;21|-|-;21|-|-;21|-|-;",
    RaisedDoubleShortPanel: "21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;",             
    RaisedDoubleLongPanel: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    RecessedSingleShortPanel:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    RecessedSingleLongPanel:"21|-|-;21|-|-;21|-|-;21|-|-;",
    RecessedSingleFlush:"21|-|-;21|-|-;21|-|-;21|-|-;",
    RecessedDoubleShortPanel:"21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;",
    RecessedDoubleLongPanel: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    RecessedDoubleFlush:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    StampedCarriageSingleShortPanel: "21|-|-;21|-|-;21|-|-;21|-|-;",/*Short/Long have same pattern*/
    StampedCarriageSingleLongPanel:"21|-|-;21|-|-;21|-|-;21|-|-;",
    StampedCarriageDoubleShortPanel:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    StampedCarriageDoubleLongPanel:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",/*Short/Long have same pattern*/
    StampedShakerSingleShaker: "21|-|-;21|-|-;21|-|-;21|-|-;",
    StampedShakerDoubleShaker: "21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    /*Contemporary*/
    SterlingDoubleFlush:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    SterlingSingleFlush:"21|-|-;21|-|-;21|-|-;21|-|-;",

    PlanksSingleNoOrShortWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    PlanksSingleLongWindows:"21|-|-;21|-|-;21|-|-;21|-|-;",
    PlanksSingleOversizedWindows:"21|-|-;21|-|-;21|-|-;21|-|-;",
    PlanksDoubleNoOrShortWindows:"21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;",
    PlanksDoubleLongWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    PlanksDoubleOversizedWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",

    SkylineFlushSingleNoOrShortWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    SkylineFlushSingleLongWindows:"21|-|-;21|-|-;21|-|-;21|-|-;",
    SkylineFlushSingleOversizedWindows:"21|-|-;21|-|-;21|-|-;21|-|-;",
    SkylineFlushDoubleNoOrShortWindows:"21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;21|-|-|-|-|-|-|-|-;",
    SkylineFlushDoubleLongWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",
    SkylineFlushDoubleOversizedWindows:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;",

   AluminumSingleFullView:"21|-|-;21|-|-;21|-|-;21|-|-;",
   AluminumDoubleFullView:"21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;21|-|-|-|-;"



  };
  const site ="CHI"
  const ppf= "80"
  const firstRun = 1
  const api_key= "5809bc44-3cf7-42c5-8395-a9558bb40647"
  const responsePath = "https://chi-api.renoworks.com/data/CHI/"
  useEffect(() => {/*effect for ScrollBar removal*/ 
    // Add class when component mounts
    document.body.classList.add('build-page');
      // Remove class when component unmounts
    return () => {
      document.body.classList.remove('build-page');
    };
  }, []);
  const getPattern = (size, design)=>{
    let key = selectedDoor.id + size +design.replace(/ /g, '');;
    console.log("Pattern key: ",key)
    let pattern = patterns[key]
    return pattern;
  }
    const handleSize = (e,size)=>{
    setSize(size);
    setLoading(true)
    fetchDoor(getPattern(size,Design),{"Width":size})
  }
  const handleDesign= (design)=>{
    setDesign(design)
    setLoading(true)
    fetchDoor(getPattern(Size,design), {Design:design})

  }
  const handleColor= (userColor, type)=>{
    if (selectedDoor.id == "Sterling"){
      userColor += " (Standard)"
    }
    setColor(userColor)
    setColorType(type)
    setLoading(true)
    fetchDoor(getPattern(Size,Design),{[type]:userColor})/*Inject actual value as the key, not "type"*/
  }
  const handleWindow= (glass,glassType,insert,position)=>{
    console.log("INSIDE HANLDE GLASS:",glass)
    setGlass(glass)
    setGlassType(glassType)
    setLoading(true)
    fetchDoor(getPattern(Size,Design),{[glassType]:glass,"Window Inserts":insert,Position:position})
  }
  function fetchDoor(pattern, parameter){
    console.log("Paramter passed:",parameter)/*Parameter refers to the door option(Ex. Color:Blue) user has selected at this time*/
    console.log(pattern)
    var solidColorOrWood = colorType
    var glassOrDesigner = glassType
    for (let key in parameter){/*Handle color type, glass type,and API width header parm*/
      if (key == "Accents Woodtones" ||key == "Solid Color") {solidColorOrWood = key}
      if (key == "Glass" || key=="Designer Glass" ||key=="Infinity Windows"){glassOrDesigner = key}
      console.log("GLASSORDESIGNER: ",glassOrDesigner)
      if (key=="Width"){
         var width = (parameter[key] == "Single"?"640":"1280");
      }
      else{
        var width = (Size=="Single"?"640":"1280");
      }
    }
    //console.log("Color Type:",solidColorOrWood)
    //console.log("Glass TYPE:",glassOrDesigner)
    let gridSettings={/*Create the gridSettings based on current door*/
      Width:Size,
      Design:Design,
      [solidColorOrWood]:Color,/*Use actual value inside variable, not its name*/
      [glassOrDesigner]:Glass,
      Position:windowPosition,
      "Window Inserts":windowInserts
    }
    for (let key in parameter){/*Handles gridSettings field for the API body*/
      gridSettings[key] = parameter[key]/*Updates correct user parameter inside gridSettings*/
    }
    console.log(gridSettings)

    let gridSettingsParameter = ""
    for (let key in gridSettings) {
      if (gridSettings[key] != null){/*Stringifies GridSettings to inject into API body*/
        gridSettingsParameter += (key + "=" + gridSettings[key] +"|")
      }
    }
    console.log(gridSettingsParameter)
    const formBody = new URLSearchParams();
    formBody.append("rwd", rwd);
    formBody.append("gridSettings", gridSettingsParameter);
    formBody.append("pattern", pattern);
    formBody.append("width", width); 
    formBody.append("height", "560");
    formBody.append("site", site);
    formBody.append("ppf", ppf);
    formBody.append("firstRun", firstRun);
    formBody.append("api_key", api_key);
    console.log(formBody)

    fetch('/api/RenderGrid', {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "en-US,en;q=0.9",
      "Connection":"keep-alive",
      "Host": "chi-api.renoworks.com",
      "Origin":"https://doorvisions.chiohd.com"
    },
    body: formBody.toString()
  }).then((res) => {
       if (!res.ok) throw new Error("Network response was not ok " + res.statusText);
       const contentType = res.headers.get("content-type") || "";
       if (contentType.includes("application/json")) {
        return res.json();
      } else {
        return res.text()
        };
  }).then((url) => {
        console.log("Success:", url)
        console.log(responsePath+url+"\n\n\n\n\n\n\n\n")
        setImage(responsePath+url)})
    .catch((err) => console.error("Error:", err))
    .finally(() => {
      setTimeout(() =>setLoading(false), 500 )
     
    });
  }
  return (
    <>
    <div className="container-fluid" id='buildContainer'>
      <div className="row gy-0">
        <div id="col-img"className='col-12 col-lg-8 d-flex flex-column align-items-center gy-0'>
          <h1>{selectedDoor.name}</h1>
          <div id="img-container">
            <img src={loading ? doorgiLogo:Image} className={`img-fluid ${loading ? "loading-style" : ""}`} />
            {loading && <p style={{fontSize:"clamp(1rem,2vw,2rem)",marginTop:"2%"}}><b>Loading...</b></p>}
          </div>
        </div>
          <div id="col-options" className='col12 col-lg-4 d-flex flex-column gap-3 gy-0'>
            <div id="size-container"> 
              <h1>Size</h1>
              <p onClick={(e) => handleSize(e,"Single")}><b>Single Door 8' X 7'</b></p>
              <p onClick={(e) => handleSize(e,"Double")}><b>Double Door 16' X 7'</b></p>
            </div>
         
           <Windows door ={selectedDoor.id} handleWindow ={handleWindow} windows={selectedDoor.windows}/>
             <Designs handleDesign={handleDesign} designs={selectedDoor.designs}/>
           <Colors handleColor={handleColor} colors={selectedDoor.colors} woods={selectedDoor.woods}/>
              <Colors handleColor={handleColor} colors={selectedDoor.colors} woods={selectedDoor.woods}/>
             <Colors handleColor={handleColor} colors={selectedDoor.colors} woods={selectedDoor.woods}/>
          </div>
      </div>
    </div>
   </>
  );
}