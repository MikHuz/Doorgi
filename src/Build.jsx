import { useState, useEffect} from 'react'
import { Routes, Route, Link,useLocation} from 'react-router-dom';
import './css/Build.css'
import DoorSelector from "./DoorSelector.jsx";
import doorgiLogo from '/logo.png'
import RaisedPanel from './assets/door_imgs/traditional/Raised_Panel.jpg';
const lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function Windows(props){
  const [showWindows,setShowWindows] = useState(false)
  const [selectedWindow,setSelectedWindow] = useState(null)
  const [glassType, setGlassType] = useState(null)
  const [showInserts,setShowInserts] = useState(false)
  const [selectedInsert,setInsert] = useState("No Insert")

  const handleWindow = (glass,glassType)=>{/*Handles Actual Window Selection*/
    position="FIRST ROW"/*Right now a single row is the default for all doors*/
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
    props.showWindows(!showWindows)
    setShowWindows(!showWindows)
    setShowInserts(false)
    setSelectedWindow(null)
    setInsert(null)
    setGlassType("Glass")
    if (!e.target.checked && selectedWindow!=null){
      props.handleWindow(null,"Glass",null,null)/*To display a Windowless door*/
    }
  }
  const handleGlassType = (type) =>{
    setGlassType(type);
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
      <div key={glass} className={`window-box ${selectedWindow === glass ? 'selected-glass' : ''}`} onClick={() => handleWindow(glass, "Glass")}>
        <h5>{glass}</h5>
        <div
          key={glass}
          style={{  backgroundImage: `url(${url})`}}
          className={selectedWindow === glass ? 'selected-glass' : ''} >
        </div> 
      </div>) } ): null);

    let windowDesignerDivs = (props.windows.designerGlass!=null?Object.entries(props.windows.designerGlass).map( ([glass,url])=>{
    return(
      <div key={glass} className={`window-box ${selectedWindow === glass ? 'selected-glass' : ''}`}  onClick={() => handleWindow(glass,"Designer Glass")}>
        <h5>{glass}</h5>
        <div
          key={glass}
          style={{ backgroundImage: `url(${url})`}}
          className={`window-box ${selectedWindow === glass ? 'selected-glass' : ''}`}>
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
    <div id="windows-container">
      <label id="windows-checkbox-label">
        <h3 className='bolder'>Choose Windows?</h3>
        <input type="checkbox" onClick={(e) =>handleShowWindows(e)}/>
      </label>
      {showWindows && (<>
      <div id="glass-type">
        {props.door === "Sterling" && <h2> 
        <span onClick={() => handleGlassType("Infinity Windows")}>
        Infinity Windows
        </span></h2>}

        {props.windows.designerGlass == null && props.windows.Glass!= null && <h2>
        <span onClick={() => handleGlassType("Glass")}>
            Glass
        </span> </h2>}

        {props.windows.designerGlass != null && <h2>
        <span className="attention" onClick={() => handleGlassType("Glass")}>
          Glass
        </span>
        <span>|</span> 
        <span className="attention"onClick={() => handleGlassType("Designer Glass")}>
          Designer Glass
        </span></h2>}
      </div>
      <div id="windows">
        {glassType=="Designer Glass"? windowDesignerDivs : windowDivs}
      </div>
      </>
      )}
     </div>
      {showInserts && props.windows.inserts!=null &&
      <div id="inserts">
        <h2>Choose a Window Insert</h2>
        {insertDivs}
      </div>}
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
  {!hasWood && <h2><span>Solid Color</span></h2> }
  {hasWood && <h2><span className="attention" onClick ={() =>setColorType("Solid Color")}>Solid Color</span> 
  <span>|</span> 
  <span  className="attention" onClick ={() =>setColorType("Wood")}>Wood</span> </h2>}

  {colorType === "Solid Color" ? colorDivs: woodDivs}{/*Conditional Rendering for Color/wood*/}
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
    return (
      <div className="design-box"key={design}>
        <h3>{design}</h3>
        <img   
          className={`${designStyle === design ? "selected-design" : ""}`}
          src={url}
          alt={design}
          onClick={() =>handleDesign(design)}/>
      </div>)})
  //console.log(designDivs)
 return(
 <div id="design-container">
  <h2>Designs</h2>
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
  console.log(props)
 // console.log("DESIGNS OF CURRENT DOOR",selectedDoor.designs)
  const [Price, setPrice] = useState(1000)
  const [Size,setSize] = useState("Double")
  const [Image,setImage] = useState(selectedDoor.defaultImg) 
  const [Design,setDesign] = useState(selectedDoor.defaultDesign)
  const [Color, setColor] = useState(selectedDoor.defaultColor)
  const [colorType,setColorType] = useState(Color in selectedDoor.colors? "Solid Color":"Accents Woodtones")
  const [windowPosition, setWindowPosition] = useState(null)
  const [browseWindows, setBrowseWindows] = useState(false)
  const [Glass, setGlass] = useState(null)
  const [glassType,setGlassType] = useState("Glass")
  const [windowInserts, setWindowInserts] = useState(null)
  const [doorValid, setDoorValid] = useState(false)
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
    document.body.classList.add('build-page');
    return () => {
      document.body.classList.remove('build-page');
    };
  }, []);
  useEffect(()=>{
    console.log("Checking if door is valid")
    console.log(Glass,glassType,windowInserts,windowPosition)
    if (Size != "" && Color!= "" && Design!= ""){
      console.log("Inside color check, browseWindows:",browseWindows)
      if (browseWindows && Glass!= null && glassType!=null&&  windowInserts!= null && windowPosition!= null){
        console.log("VALID WINDOW DOOR")
        setDoorValid(true)
        return;
      }
      else if(browseWindows){setDoorValid(false); return}
      setDoorValid(true)
    }
    else{
      setDoorValid(false)
    }
  })
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
    fetchDoor(getPattern(Size,Design),{[type]:userColor})/*Inject actual value as the key, not literally "type"*/
  }

  const showWindows = (browseWindows)=>{setBrowseWindows(browseWindows)}/*Indicates that windows are selected for door validity*/
  const handleWindow= (glass,glassType,insert,position)=>{
    console.log("INSIDE HANLDE GLASS:",glass)
    setGlass(glass)
    setGlassType(glassType)
    setWindowInserts(insert)
    setWindowPosition(position)
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
  <div id="build-page-grid">
    <div id="door-section">
      <h2>
        {selectedDoor.name}</h2>
      <img src={loading ? doorgiLogo:Image} className={`${loading ? "loading-style" : ""}`} />
      {!loading ? <h2>Price: ${Price} </h2>:<h2>Loading...</h2>} 
       <div className="btns">
           <Link to={`/${props.doorType}`}>
             <button className="back-btn" >Back</button>
           </Link>
            <button className={`continue-btn ${doorValid ? "" : "disabled-btn"}`}>Continue</button>
           
         </div>
    </div>
    <div id="options-section">
      <div id="size-container"> 
        <h2>Size</h2>
        <p className={`${Size === "Single" ? "selected-size" : ""}`} onClick={(e) => handleSize(e,"Single")} >Single Door 8' X 7'</p>
        <p className={`${Size === "Double" ? "selected-size" : ""}`} onClick={(e) => handleSize(e,"Double")} >Double Door 16' X 7'</p>
      </div>
      <Designs handleDesign={handleDesign} designs={selectedDoor.designs}/>
      {Color &&<Colors handleColor={handleColor} colors={selectedDoor.colors} woods={selectedDoor.woods}/>}
      <Windows door ={selectedDoor.id} handleWindow ={handleWindow} showWindows={showWindows} windows={selectedDoor.windows}/>
    </div>
  </div>
  );
}