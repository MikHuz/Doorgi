import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './Build.css'
import DoorSelector from "./DoorSelector.jsx";
import door from './assets/Raised_Panel.jpg';
import door2 from './assets/door2.jfif';
import door3 from './assets/door3.jpg';
import door4 from './assets/door4.jpg';
import door5 from './assets/door5.jpg';
let doors=[door,door2,door3,door4,door5]
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
  const [price, setPrice] = useState(1000)
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
  return (
    <>
    <div className="container-fluid" id='buildContainer'>
      <div className="row gy-0">
        <div id="col"className='col-12 col-md-8'>
           <img id="myImg" src={door} style={{borderRadius:"5%"}}className="img-fluid" />
        </div>
          <div id="col-options" className='col12 col-md-4'>
           <Color/>
           <Windows/>
          </div>
      </div>
    </div>
   {/* <div id="myContainer">
      <div id="imgBox">
        <img id="myImg" src={door} className='img-fluid'/>

      </div>
      <div id="optionsBox">
        <Color/>

      </div>
      
    </div>
    
   } <div className="container-fluid" id="build-container">
      <div className="row g-0" style={{ minHeight: "60vh" }}>
        <div className="col-lg-8 p-0" id="img-col">
          <img
            src={doors[selectedDoor]}
            className="img-fluid w-100"
            style={{
              maxHeight: "75vh",
              objectFit: "contain",
              display: "block"
            }}
            alt="..."
          />
        </div>

        <div
          className="col-lg-4"
          id="options-col"
          style={{
            maxHeight: "59vh",
            overflowY: "auto",
            overflowX: "hidden"
          }}>
          <Color setColor={setColor}/>
          <Color setColor={setColor}/>
          <Material/>
        </div>
      </div>
      <div className="row g-0" style={{ minHeight: "60vh" }}>
        <div className='col text-center'>
          <h2>Price: ${price}</h2>
        </div>
      </div>
    </div>*/}</>
  );
}