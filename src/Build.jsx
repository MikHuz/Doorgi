import { useState, useEffect,useRef} from 'react'
import { Routes, Route, Link,useLocation} from 'react-router-dom';
import './css/Build.css'
import DoorSelector from "./DoorSelector.jsx";
import doorgiLogo from '/logo.png'
import RaisedPanel from './assets/door_imgs/traditional/Raised_Panel.jpg';
import shortSize from './assets/door_imgs/traditional/ShortPanel.jpg'
import doubleSize from './assets/door_imgs/traditional/LongPanel.jpg'
const lorem="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

function Colors(props) {
  const IconColor = props.IconColor
  const [hasWood] = props.woods==null ? useState(false) : useState(true)
  const [hasColor] = props.colors==null ? useState(false): useState(true)
  const [colorType,setColorType] = useState(props.colorType)
  // console.log("HAS COLOR?:", hasColor)
  // console.log(colorType)
  const handleColor = (event, color, type) => {
    console.log("Color type:",type)
    props.handleColor(color,type);
  };
  let colorDivs = null
  if(hasColor){
    colorDivs = Object.entries(props.colors).map(([colorName, hexCode]) => {
      let backgroundColor= {}
      if (colorName.includes("with")){
        console.log("Two toned color")
        const [firstColor, secondColor] = hexCode.split(",");
        backgroundColor = {
        background: `linear-gradient(to right, ${firstColor}, ${secondColor})`
      };
      }else{
         backgroundColor = {backgroundColor:hexCode}
      }
      return(
      <div className="color-box" key={colorName}>
        <h5>{colorName}</h5>
        <div
          style={backgroundColor}
          className={IconColor === colorName ? 'selected' : ''}
          onClick={(event) => handleColor(event, colorName, "Solid Color")}
        />
      </div>) });
  }
  let woodDivs = null
  if (hasWood){
    woodDivs = Object.entries(props.woods).map( ([woodName,woodUrl]) => (
      <div className="color-box" key={woodName}>
        <h5>{woodName}</h5>
        <div
          style={{  backgroundImage: `url(${woodUrl})`}}
          className={IconColor === woodName ? 'selected' : ''}
          onClick={(event) => handleColor(event, woodName,"Accents Woodtones")}
        />
      </div>) )
  }
  //console.log(colorDivs)
return(
<> 
 <div id="colors-container">
  <h2>Choose a Color</h2>
  {hasColor &&
    <div >
      <h3>Solid Colors</h3>
      {colorDivs} 
    </div>}
  {hasWood &&
    <div>
      <h3>Wood Colors</h3>
      {woodDivs} 
    </div>}
  </div>
  </> )
}
function Designs(props){
  //console.log("INSIDE COMPONENT:",props.designs)
  const designStyle = props.designStyle
  const handleDesign = (design)=>{
    //console.log("STYLING:",design)
    props.handleDesign(design)
  }
  let designDivs = 0
  if (props.door=="Steel Overlay" || props.door=="Shoreline"){/*These doors use a different design storage method*/
    designDivs = props.designs.map((designObj) => {
    const designName = Object.keys(designObj)[0];
    const url = designObj[designName];
    return (
      <div className="design-box design-box-small" key={designName}>
        <h3>{designName}</h3>
        <img
          className={`${designStyle === designName ? "selected-design" : ""}`}
          src={url}
          alt={designName}
          onClick={() => handleDesign(designName)}
        />
      </div>
    );
    });
  }
  else{/*Most doors*/
    designDivs = Object.entries(props.designs).map(([design,url]) =>{
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
    }
  //console.log(designDivs)
 return(
 <div id="design-container">
  <h2>Designs</h2>
  {designDivs}
 </div>)
}
function Insulations(props){
  const { insulations, selectedInsulation, handleInsulationType } = props;
  const [openDialog, setOpenDialog] = useState(null); 
  //console.log("Selected",selectedInsulation)
  const isDesktop = () => {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  };
  const handleHover = (type) => {
    if (isDesktop()) {
      setOpenDialog(type);
    }
  };
  const handleHoverLeave = (type) => {
    if (isDesktop()) {
      setOpenDialog(null); 
    }
  };
  const toggleDialog = (type) => {
    if (!isDesktop()){
      setOpenDialog(type==openDialog ? null : type);/*For buttons clicks on mobile*/
    }
  };

  return (
    <div id="insulation-container">
    <h2>Insulation</h2>
    <div className={`insulation-box ${insulations.Standard==null ? "void-box": ""}`}>
      <h3 className="insulation-header">
        Standard
        <button
          className={`insulation-dialog-btn ${openDialog=="Standard"? "bg-orange-main": ""}`}
          onMouseEnter={() => handleHover("Standard")}
          onMouseLeave={() => handleHoverLeave("Standard")}
          onClick={() => toggleDialog("Standard")}
          disabled={insulations.Standard==null ? true:false}
          >?</button>

        {openDialog === "Standard" && 
        <div id="ins-standard-dialog" className="insulation-dialog">
          <ul>
            <li>No Insulation</li>
            <li>No Thermal Rating</li>
            <li>1 Sided Steel</li>
            <li>Light Duty Steel</li>
          </ul>
          {/* <button onClick={closeDialog}>Close</button> */}
        </div>}

      </h3>
      <img src={insulations.StandardImg}  onClick={()=>handleInsulationType("Standard")}
           className={selectedInsulation === "Standard" ? "selected-ins" : ""}></img>
    </div>
    <div className='insulation-box'>
      <h3 className="insulation-header">
        Premium
         <button
          className={`insulation-dialog-btn ${openDialog=="Premium"? "bg-orange-main": ""}`}
          onMouseEnter={() => handleHover("Premium")}
          onMouseLeave={() => handleHoverLeave("Premium")}
          onClick={() => toggleDialog("Premium")}
          disabled={insulations.Premium==null ? true:false}
          >?</button>

          {openDialog === "Premium" && 
          <div id="ins-premium-dialog" className="insulation-dialog">
          <ul>
            <li>Good Insulation</li>
            <li>Great Thermal Rating</li>
            <li>2 Sided Steel</li>
            <li>Medium Duty Steel</li>
          </ul>
          {/* <button onClick={closeDialog}>Close</button> */}
        </div>}
      </h3>
      <img src={insulations.PremiumImg}  onClick={()=>handleInsulationType("Premium")} alt="Premium insulation"
          className={selectedInsulation === "Premium" ? "selected-ins" : ""}></img>
    </div>
  </div>
  )
}
function Windows(props){
  const [selectedWindow,setSelectedWindow] = useState(null)
  const [glassType, setGlassType] = useState("Glass")
  const [selectedInsert,setInsert] = useState(null)
  const [showInserts,setShowInserts] = useState(false)
  const [selectedPosition,setPosition] = useState(props.door!="Sterling" ? "FIRST ROW":"TOP ROW")                
  const selectedDesign = props.design
  // console.log("Design:",selectedDesign)
  // console.log("Type:",glassType)
  // console.log("Selected Insert",selectedInsert)
  useEffect(() => {
    //If design changed to something that doesn't support StyleLite, reset
    if (props.design !== "Long Windows" && glassType === "StyleLite") {
      setGlassType("Glass"); 
      setSelectedWindow(null);
      setShowInserts(false); 
      props.handleWindow((null, null, null, null))
    }
    //If design changes and the prior selected insert isnt supported, change the selection
    // else if (props.windows.inserts!= null && !("Any Design" in props.windows.inserts) ){
    //   if (props.windows.inserts[selectedDesign][selectedInsert]==null){setInsert("No Inserts")}
    // }
  }, [props.design]);
  const handleWindow = (glass,glassType,position)=>{/*Handles Actual Window Selection*/
    if (position==undefined){
      position=selectedPosition/*no pass in means position hasn't changed*/
    }
    else{/*An explict pass in mean user just changed a window position*/
      position = position
    }
    if (props.door=="Sterling"){ /*Exception case for sterling, uses different APi logic*/
      glassType="Infinity Windows";
    }
    setGlassType(glassType)
    if (glassType=="Glass"){ 
      //console.log("INSERT:",selectedInsert)
      //if (selectedInsert==null){setInsert("No Inserts")}
      setShowInserts(true)
    } else if (glassType=="Designer Glass"){
      setShowInserts(false)
      setInsert(null)
      //console.log("INSERT:",selectedInsert)
    }else if(glassType=="StyleLite"){
      setShowInserts(false)
      setInsert(null)
    }
    setSelectedWindow(glass)
    props.handleWindow(glass,glassType,selectedInsert,position)/*Handles Windows API in parent*/
  }
  const handleGlassType = (type) =>{
    setGlassType(type);
    //console.log("SELECTED WINDOW:",selectedWindow)
    setShowInserts(type =="Glass" && (selectedWindow in props.windows.glass)? true : false )
  }
  const handleInsert = (insert) =>{
    setInsert(insert)
    props.handleWindow(selectedWindow,glassType,
    (insert=="Sunburst"?"4 piece Sunburst" : insert),selectedPosition)
  }
  const handlePosition = (position)=>{
    setPosition(position)
    handleWindow(selectedWindow,glassType,position)
  }
  let positionDivs = null;
  if (Object.keys(props.windows.position).length!=0){
    console.log("Multiple positions available")
    positionDivs = Object.entries(props.windows.position).map( ([position,url]) => {
      return( 
      <div 
        key={position} 
        className="position-box" 
        onClick={() => handlePosition(position.toUpperCase())}
      >
      <h6>{position}</h6>
      <img
        src={url}
        className={selectedPosition=== position.toUpperCase() ? 'selected-position' : ''}
      />
    </div>)
    })
  }
  //console.log("Positions:",positionDivs)

  let windowDivs = (props.windows.glass!=null ? Object.entries(props.windows.glass).map( ([glass,url]) =>{
    return(
      <div key={glass} className={`window-box ${selectedWindow === glass ? 'selected-glass' : ''}`} 
           onClick={() => handleWindow(glass, "Glass")}>
        <h5>{glass}</h5>
        <div
          key={glass}
          style={{  backgroundImage: `url(${url})`}}
          className={selectedWindow === glass ? 'selected-glass' : ''} >
        </div> 
      </div>) } ) : null);

  let styleLiteDivs = (props.windows.styleLite!=null ? Object.entries(props.windows.styleLite).map( ([glass,url]) =>{
    let glassName = glass.split(" ")[1]
    return(
      <div key={glass} className={`window-box ${selectedWindow === glass ? 'selected-glass' : ''}`} 
          onClick={() => handleWindow(glass, "StyleLite")}>
        <h3>{glassName}</h3>
        <div
          key={glass}
          style={{ backgroundImage: `url(${url})`}}
          className={selectedWindow === "StyleLite" + glass ? 'selected-glass' : ''} >
        </div> 
      </div>) } ) : null);

  let windowDesignerDivs = (props.windows.designerGlass!=null ? Object.entries(props.windows.designerGlass).map( ([glass,url])=>{
    return(
      <div key={glass} className={`window-box ${selectedWindow === glass ? 'selected-glass' : ''}`}  onClick={() => handleWindow(glass,"Designer Glass")}>
        <h5>{glass}</h5>
        <div
          key={glass}
          style={{ backgroundImage: `url(${url})`}}
          className={selectedWindow === glass ? 'selected-glass' : ''}>
        </div> 
      </div>) } ) : null);
  let insertDivs = null
  if (props.windows.inserts!=null){
    let insertsObj = "Any Design" in props.windows.inserts 
                  ? props.windows.inserts["Any Design"]
                  : props.windows.inserts[selectedDesign]
    //console.log("INSERTs:",insertsObj)
    insertDivs = Object.entries(insertsObj).map(([insert, url]) => {
      /*Entries creates an array in which each index is a key value pair, then uses the array map function to return
      a div element as in index into a new inserts array*/
      if (url!=null){
      return (
      <div key={insert} className="insert-box">
      <h5>{insert}</h5>
      <div
        style={{ backgroundImage: `url(${url})` }}
        className={selectedInsert === insert ? "selected-insert" : ""}
        onClick={() => handleInsert(insert, "Inserts")}
      /></div>)
      }
    })
  }
  let glassTypes = null;
  // Case: Sterling → special Infinity Windows header
  if (props.door === "Sterling") {
    glassTypes = (
      <h2>
        <span>
          Infinity Windows
        </span>
      </h2>
    );
  }
  // Case: Design supports Stylelite Glass as well
  else if (props.design == "Long Windows"){
    //alert("Stylelite support")
    glassTypes = (
      <h2 className="small-font">
        <span
          className={`attention ${glassType === 'Glass' ? 'selected-glass-type' : ''}`}
          onClick={() => handleGlassType("Glass")}
        >
          Glass
        </span>
        <span> | </span>
        <span
          className={`attention ${glassType === 'StyleLite' ? 'selected-glass-type' : ''}`}
          onClick={() => handleGlassType("StyleLite")}
        >
          StyleLite
        </span>
        <span> | </span>
        <span
          className={`attention ${glassType === 'Designer Glass' ? 'selected-glass-type' : ''}`}
          onClick={() => handleGlassType("Designer Glass")}
        >
          Designer Glass
        </span>
      </h2>
    );
  }
  // Case: Only Glass available
  else if (props.windows.designerGlass == null && props.windows.glass != null) {
   // alert("Glass Only")
    glassTypes = (
      <h2>
        <span>Glass</span>
      </h2>
    );
  }
  // Case: Glass + Designer Glass available
  else if (props.windows.designerGlass != null) {
    //alert("Glass and Designer")
    glassTypes = (
      <h2>
        <span
          className={`attention ${glassType === 'Glass' ? 'selected-glass-type' : ''}`}
          onClick={() => handleGlassType("Glass")}
        >
          Glass
        </span>
        <span> | </span>
        <span
          className={`attention ${glassType === 'Designer Glass' ? 'selected-glass-type' : ''}`}
          onClick={() => handleGlassType("Designer Glass")}
        >
          Designer Glass
        </span>
      </h2>
    );
  }
  //console.log("Glass types:",glassTypes)

  return (<>
    <div id="windows-container">
      {positionDivs!=null && 
        <div id="window-positions">
          <h2>Choose Window Position</h2>
          {positionDivs}
        </div>
      }
      <div id="glass-type">
        {glassTypes}
      </div>
      <div id="windows"  key={glassType}>
        {glassType == "Designer Glass"
        ? windowDesignerDivs
        : glassType == "StyleLite"
        ? styleLiteDivs
        : windowDivs}
      </div>
    </div>
    {showInserts && props.windows.inserts!=null &&
      <div id="inserts">
        <h2>Choose a Window Insert</h2>
        {insertDivs}
      </div>}
  </>);
}

export default function Build(props) {
  const selectedDoor = props.selectedDoor
  const prices = selectedDoor.prices
  const [Image,setImage] = useState(selectedDoor.defaultImg) 
  const [Price, setPrice] = useState(1000)
  const [Size,setSize] = useState("Double")
  const [Design,setDesign] = useState(selectedDoor.defaultDesign)
  const [DesignStyle,setDesignStyle] = useState(null)/*UI highlight for design only*/

  const [InsulationType, setInsulationType] = useState("")
  const [Insulation, setInsulation] = useState("")

  const [Color, setColor] = useState(selectedDoor.defaultColor)
  const [colorType,setColorType] = selectedDoor.colors == null ? useState("Accents Woodtones"):
  Color in selectedDoor.colors ? useState("Solid Color") : useState("Accents Woodtones")
  const [IconColor, setIconColor] = useState(null);/*UI highlight for color only*/

  const [showWindows, setShowWindows] = useState(false)
  const [windowCheckBox,setWindowCheckBox] = useState(false)
  const [windowPosition, setWindowPosition] = useState(null)

  const [glassType,setGlassType] = useState(null)
  const [Glass, setGlass] = useState(null)
  const [windowInserts, setWindowInserts] = useState(null)

  const [doorValid, setDoorValid] = useState(false)
  const [loading,setLoading] = useState(false);
  const [viewportWidth,setViewport] = useState(window.innerWidth)
  const [selections, setSelections] = useState({
    "Size":  false, 
    "Color": false,
    "Design":(Object.keys(selectedDoor.designs).length > 1 ? false:true)
    /*Doors need a some values set always, such as default design set for API to work, 
      meaning a door completion check relies partly on user click selections.
      Doors that have only one design have no design selections and set this value to true*/
  });
  //console.log("COLORTYPE:",colorType)
  //console.log("CURRENT DOOR:",selectedDoor)
  // console.log("Selections:",selections)
  // console.log("Design:",Design,"Color:",Color,"Size:",Size,"ColorType:",colorType)
   //console.log("Model insulation:",Insulation)

  useEffect( ()=>{
    //console.log("Detected change, getting new price")
  let newPrice = 0
      //console.log("NEW PRICE FOR DESIGN:",Design, newPrice)
    if (Design && Size && InsulationType){
      let ins = InsulationType=="Standard" ? "Non-insulated" : "Insulated"
      let baseKeys = prices[Design][ins][Size]
      let newPrice = Number(baseKeys["basePrice"])
      console.log("\nNEW BASE PRICE", Design,ins,Size,newPrice)
      console.log(baseKeys["options"])
      if (colorType && colorType=="Accents Woodtones" && baseKeys["options"]["Accents Woodtones"]){
          newPrice += Number(baseKeys["options"]["Accents Woodtones"])
      }
      if (Glass){
        //console.log("GLASS SELECTED:",Glass)
        newPrice += Number(baseKeys["options"]
                          [glassType === "StyleLite" ? StyleLite : Glass])
        //alert("glass selected")
      } else{//alert("no glass")
        }
      if (windowInserts && windowInserts!= "No Inserts"){
         newPrice += Number(baseKeys["options"]["Inserts"])
        //alert("inserts")
      } else{//alert("no inserts")
        }
      console.log("PRICE",Glass,windowInserts, newPrice)

    }
    else{console.log("MISSING BASE CHECKS")}
  }, [Design,Size,InsulationType,colorType,Glass,windowInserts])
  useEffect(() => {/*effect for ScrollBar removal*/ 
    document.body.classList.add('build-page');
    return () => {
      document.body.classList.remove('build-page');
    };
  }, []);
  useEffect(()=>{/*Effect for door validity*/
   /*This check relies on state variable values selections object*/
    //console.log(Glass,glassType,windowInserts,windowPosition)
    let validity = false;
    if (selectedDoor.id == "Planks" || selectedDoor.id == "SkylineFlush"){/*Other doors*/
      //console.log(selections["Size"] , selections["Color"],Design,Insulation)
      if (selections["Size"] && selections["Color"] && Design !== "" && Insulation !== "") {/*Base case for these doors*/
        // alert("base cases for special doors")
        validity = true;
        if (selections["Design"] && Design=="Long Windows") {/*Design is optional, if long window is selected then windows must be selected*/
          validity = isWindowSelectionComplete(Glass, glassType, windowInserts);
        }
        else if (selections["Design"] && Design=="No Or Short Windows"){
          if (Glass==null){validity= true;}/*This design doesnt require glass, but if selected ensure other options are finished*/ 
          else{validity = isWindowSelectionComplete(Glass, glassType, windowInserts)}
        }
        setDoorValid(validity);return;
      } 
      else {
        setDoorValid(validity)/*False, base cases failed*/
        //console.log("bases cases for planks and flush failed");return;
      }
    }
    else if (selections["Size"] && selections["Color"] && selections["Design"] && Insulation !== "") {/*Base Cases for most doors*/
      validity = true;/*Right now true*/
      //console.log("BASE CASES CHECKED")
      if (showWindows) {
        console.log("Checking if windows are complete")
        validity = isWindowSelectionComplete(Glass, glassType, windowInserts);
      }
      setDoorValid(validity)
    } 
    else{ /*Most Doors fail*/
      setDoorValid(validity)
     // console.log("Base cases for most doors failed")
    }
  })
  useEffect(() => {/*Effect for dynamic button placement based on viewport changes*/
    const handleResize = () => {
      setViewport(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const markSelected = (option,value)=>{
    /*Some state options need to always be selected for API to work properly
      thus a separate attribute is used for door completion checks and styles */ 
    setSelections(prev => ({
    ...prev,
    [option]: value
    }));
  }
  const handleSize = (e,size)=>{
    setSize(size);
    setLoading(true)
    if (!selections["Size"]){markSelected("Size",true)}
    fetchDoor(getPattern(size,Design),{"Width":size})
  }
  const handleDesign= (design)=>{
    setDesign(design)
    setLoading(true)
    setDesignStyle(design)
    if (Insulation!=""){
      //alert("Changing insulation from design")
      handleInsulation(InsulationType,design)
    }
    if (!selections["Design"]){markSelected("Design",true)}
    fetchDoor(getPattern(Size,design), {Design:design})
  }
  const handleInsulationType = (insulationType)=>{
    setInsulationType(insulationType)
    // console.log("Image URL:", selectedDoor.Insulation[insulationType]);
    // console.log("Insulation Model:", selectedDoor.Insulation[insulationType][Design])
    handleInsulation(insulationType,Design)
  }
  const handleInsulation = (insulationType, design)=>{
    let insulationModelNumber = 0;
    if ("Any Design" in selectedDoor.Insulation[insulationType]){
      //alert("Any design")
      console.log(insulationType)
      insulationModelNumber = selectedDoor.Insulation[insulationType]["Any Design"]
    } else{ insulationModelNumber = selectedDoor.Insulation[insulationType][design]}
    setInsulation(insulationModelNumber)
  }
  const handleColor= (userColor, type)=>{
    setColor(userColor)
    setColorType(type)
    setIconColor(userColor)
    if (selectedDoor.id == "Sterling"){
      userColor += " (Standard)"
    }
    if (!selections["Color"]){markSelected("Color",true)}
    setLoading(true)
    fetchDoor(getPattern(Size,Design),{[type]:userColor})/*Inject actual value as the key, not literally "type"*/
  }
  const handleShowWindows = (e)=>{
    const checked = e.target.checked;
    setWindowCheckBox(checked)
    if (selectedDoor.id == "Aluminum"){
      if (!checked){handleWindow(null,null,null,null)}
      else{handleWindow(null,null,null, "SOLID BOTTOM 2 ROWS")}
      return;/*Special Case doors have no browsing options so we don't want show windows to be set*/
    }
    setShowWindows(checked);
    if (!checked && (selectedDoor.id === "Planks" || selectedDoor.id === "SkylineFlush")){
        setSelections(prev => ({ ...prev, Design: false }));
        markSelected("Design",false)
        setDesignStyle("")
    }
    if (!checked) {
      //alert("Resetting windows")
      handleWindow(null, null, null, null); // reset when unchecked
    }
  }
  const handleWindow= (glass,glassType,insert,position)=>{
    //console.log("INSIDE HANLDE GLASS:",glass)
    console.log("Glass Name:",glass,"Type:",glassType)
    setGlass(glass)
    setGlassType(glassType)
    setWindowInserts(insert)
    setWindowPosition(position)
    setLoading(true)
    fetchDoor(getPattern(Size,Design),{[glassType]:glass,"Window Inserts":insert,Position:position})
  }
  const isWindowSelectionComplete = (Glass, glassType, windowInserts, windowPosition) =>{
    console.log("INSIDE WINDOWSELECTION:",Glass,glassType,windowInserts)
    if (glassType == "Glass"){/*Normal glass needs inserts*/
      return Glass != null && glassType != null && windowInserts != null;
    }
    else if (glassType!= null){/*Infinity windows and designer glass go here*/
      return Glass != null && glassType != null
    }
  }
  const getPattern = (size, design)=>{
  let key = selectedDoor.id + size +design.replace(/ /g, '');;
  //console.log("Pattern key: ",key)
  let pattern = patterns[key]
  return pattern;
  }
  const handleReset = ()=>{
    // Reset all selections
    setSelections({ Size: false, Color: false, 
                    Design:(Object.keys(selectedDoor.designs).length > 1 ? false:true) });
    setSize("Double");
    setDesign(selectedDoor.defaultDesign);
    setColor(selectedDoor.defaultColor);
    let defaultColorType = selectedDoor.colors == null ? "Accents Woodtones":
    selectedDoor.defaultColor in selectedDoor.colors ? "Solid Color" : "Accents Woodtones"
    setColorType(defaultColorType)

    // Reset window / insulation
    setShowWindows(false);
    setWindowCheckBox(false)
    setGlass(null);
    setGlassType(null);
    setWindowInserts(null);
    setWindowPosition(null);
    setInsulation("");
    setInsulationType("");

    // Reset UI highlights
    setIconColor(null);
    setDesignStyle("");
    //setImage(selectedDoor.defaultImg);

    // Re-fetch default pattern from API
    let defaultParameter = {"Width":"Double",Design:selectedDoor.defaultDesign, [defaultColorType]:selectedDoor.defaultColor,
      Glass:null,Position:null,"Window Inserts":null}
    setLoading(true)
    fetchDoor(getPattern("Double", selectedDoor.defaultDesign), defaultParameter);
  }
  const handleContinue = ()=>{
    console.log("Size:", Size);
    console.log("Design:", Design);
    console.log("InsulationType:", InsulationType);
    console.log("Insulation:", Insulation);
    console.log("Color:", Color);
    console.log("colorType:", colorType);
    console.log("showWindows:", showWindows);
    console.log("windowPosition:", windowPosition);
    console.log("Glass:", Glass);
    console.log("glassType:", glassType);
    console.log("windowInserts:", windowInserts);
  }
  function fetchDoor(pattern, parameter){
    const rwd = selectedDoor.rwd
    const URL = "https://chi-api.renoworks.com/RenderGrid"
    const site ="CHI"
    const ppf= "80"
    const firstRun = 1
    const api_key= "5809bc44-3cf7-42c5-8395-a9558bb40647"
    const responsePath = "https://chi-api.renoworks.com/data/CHI/"
    //console.log("Paramter passed:",parameter)/*Parameter refers to the door option(Ex. Color:Blue) user has selected at this time*/
   // console.log(pattern)
    var solidColorOrWood = colorType
    var glassOrDesigner = glassType
    var width=0;
    if ("Width" in parameter) {
      width = parameter["Width"] === "Single" ? "640" : "1280";
    } else {
      width = Size === "Single" ? "640" : "1280";
    }
    for (let key in parameter){/*Handle color type, glass type,*/
      if (key == "Accents Woodtones" || key == "Solid Color") {solidColorOrWood = key}
      if (key == "Glass" || key=="Designer Glass" ||key=="Infinity Windows" || key== "StyleLite"){
        glassOrDesigner = key/*Holds key name of the window Type for API*/
      }
    }
    //console.log("Color Type:",solidColorOrWood)
    //console.log("Glass Or Designer:",glassOrDesigner)
    let gridSettings={/*Create the gridSettings based on current door and values*/
      Width:Size,
      Design:Design,
      [solidColorOrWood]:Color,/*Use actual value inside variable, not its name*/
      [glassOrDesigner]:Glass,
      Position:windowPosition,
      "Window Inserts":windowInserts
    }
    for (let key in parameter){
      gridSettings[key] = parameter[key]/*Updates correct function passed parameter inside gridSettings*/
    }
    //console.log("Grid settings:",gridSettings)

    let gridSettingsParameter = ""
    for (let key in gridSettings) {
      if (gridSettings[key] != null){/*Stringifies GridSettings to inject into the API body*/
        gridSettingsParameter += (key + "=" + gridSettings[key] +"|")
      }
    }
    //:",gridSettingsParameter)
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
    //console.log(formBody)

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
        // console.log("Success:", url)
        // console.log(responsePath+url+"\n\n\n\n\n\n\n\n")
        setImage(responsePath+url)})
    .catch((err) => console.error("Error:", err))
    .finally(() => {
      setTimeout(() =>setLoading(false), 500 )
    });
  }
  let buttonPanel = <> 
    {!loading ? <h2>Price: ${Price} </h2>:<h2 className="wave">
    <span>L</span><span>o</span><span>a</span><span>d</span>
    <span>i</span><span>n</span><span>g</span>
    <span>.</span><span>.</span><span>.</span>
  </h2>}
    <div className="btns">
      <Link to={`/${props.doorType}`}>
        <button className="back-btn" >Back</button>
      </Link>
      <button className="reset-btn" onClick={handleReset}>Reset</button>
      <button className={`continue-btn ${doorValid ? "" : "disabled-bt"}`} disabled={!doorValid} onClick={handleContinue}>Continue</button>
    </div> </>
  return (
  <div id="build-page-grid">
    <div id="door-section">
      <h1>{selectedDoor.name}</h1>
     <img src={loading ? doorgiLogo : Image}className={loading ? "loading-style" : ""}/>   
      {viewportWidth > 1025 && buttonPanel}{/*Show panel here for desktop only*/}
    </div>
    <div id="options-section">
      <div id="size-container"> 
        <h2>Size</h2>
        <div className='size-box'>
          <img src={shortSize} className="img-fluid"  onClick={(e) => handleSize(e,"Single")}/>
          <p className={`${selections["Size"]==true && Size === "Single" ? "selected-size" : ""}`} onClick={(e) => handleSize(e,"Single")} >Single Car 8'x7'</p>
        </div>
        <div className='size-box'>
           <img src={doubleSize} className="img-fluid"  onClick={(e) => handleSize(e,"Double")}/>
          <p className={`${selections["Size"]==true && Size === "Double" ? "selected-size" : ""}`} onClick={(e) => handleSize(e,"Double")} >Two Cars 16'x7'</p>
        </div>
      </div>
      {selectedDoor.id != "Planks" && selectedDoor.id!= "SkylineFlush" &&/*Some doors require designs in other places*/
      (Object.keys(selectedDoor.designs).length > 1) ?/*Dont show designs if its only one design*/
      <Designs door={selectedDoor.id} handleDesign={handleDesign} designs={selectedDoor.designs} designStyle={DesignStyle}/> : ""}

      <Insulations handleInsulationType={handleInsulationType} insulations={selectedDoor.Insulation} selectedInsulation={InsulationType}/>
      <Colors handleColor={handleColor} colors={selectedDoor.colors} woods={selectedDoor.woods} colorType ={colorType} IconColor={IconColor}/>

      {selectedDoor.windows!=null &&
      <label id="windows-checkbox-label">
        <h2>Choose Windows?</h2>
        <input id="show-windows-check-box" type="checkbox" checked={windowCheckBox} onClick={(e) =>handleShowWindows(e)}/>
      </label>}

      {showWindows && (<>
      {selectedDoor.id === "Planks" || selectedDoor.id === "SkylineFlush" ? (
        <>
        {/* Special case doors, design section merged with windows */}
        <Designs handleDesign={handleDesign} designs={selectedDoor.designs} designStyle={DesignStyle}/>
        {/* Show Windows only if a Design is chosen */}
        {selections["Design"] && (
          <Windows
            door={selectedDoor.id}
            handleWindow={handleWindow}
            showWindows={showWindows}
            windows={selectedDoor.windows}
            design={Design}
          />)}
        </>
        ) : (
        // Else for most doors, skip Designs and go straight to Windows
        <Windows
          door={selectedDoor.id}
          handleWindow={handleWindow}
          showWindows={showWindows}
          windows={selectedDoor.windows}
          design={Design}
        />
        )}
      </>)}
      {viewportWidth < 1025 && buttonPanel}{/*Show panel here for mobile/tablet only*/}
    </div>
  </div>
  );
}

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
