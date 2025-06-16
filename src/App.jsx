import { useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './App.css'
import door from './assets/door.jpg';
import door2 from './assets/door2.jfif';
import door3 from './assets/door3.jpg';
import door4 from './assets/door4.jpg';
import door5 from './assets/door5.jpg';
import raisedPanel from './assets/Raised_Panel.jpg'
import stampedCarriage from './assets/Stamped_Carriage.jpg'
import stampedShaker from './assets/Stamped_Shaker.jpg'
import shorline from './assets/Shoreline.jpg'
import aluminum from './assets/aluminum.jpg'
let doors=[raisedPanel,stampedCarriage,stampedShaker,shorline,aluminum]

function buildDoors(){

  for(let i =0;i<doors.length;i++){

  }
}

function Color(props){
  const [selectedColor,setSelectedColor] = useState(null)
  const colors=['Blue','Black','Brown','Grey']//Use props colors based on selected door

  const handleColor = (event, color)=>{
    alert(color)
    setSelectedColor(color)
    props.setColor(color)
  }

   let colorDivs = colors.map( (color) =>{
    return(
    <div id="colorColumns"  key={color} className="col d-flex align-items-center justify-content-center">
      <div
        id="colors"
        style={{backgroundColor:`${color}`}}
        className={`${selectedColor===color ? 'selected' : ''}`}
        onClick={(event) => handleColor(event, color)} ></div> 
    </div>) } ); 
return(<>
      <div className="row text-center">
        <div className='col'> <h4>Color</h4></div>
      </div>
      
      <div className="row text-center" id="colorRows">
       {colorDivs}
      </div>

      </>)
}
function Material(){
  return (<>
    <div class="row text-center">
      <div className='col'> <h4>Material</h4></div>
    </div>
    
    <div class="row text-center">
      <div class="col">
      <label for="material">Wood</label><br/>
        <input type="radio" name="material" value="wood"/>
      </div>
      <div class="col">
        <label for="material">Wood</label><br/>
        <input type="radio" name="material" value="wood"/>
      </div>
      <div class="col">
        <label for="material">Wood</label><br/>
        <input type="radio" name="material" value="wood"/>
      </div>
      <div class="col">
        <label for="material">Wood</label><br/>
        <input type="radio" name="material" value="wood"/>
      </div>
      <div class="col">
        <label for="material">Wood</label><br/>
        <input type="radio" name="material" value="wood"/>
      </div>
    </div>

    </>);
}

function Build({ selectedDoor }) {
  const [selectedColor, setSelectedColor] = useState(null)
  const [price, setPrice] = useState(1000)
  const setColor = (color) =>{
    console.log(color)
    alert("test",color)
  } 
  return (
    <div className="container-fluid" id="build-container">
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
    </div>
  );
}

function Header(){
  return (
    <div className="container-fluid" >
    <div className="row">
      <div className="col-md-4"> 
        <img id="doorgi-logo" src="logo.png" height="80" alt="Doorgi logo" />
      </div>
      <div id="nav" className="col-md-4">
         <nav>
            <ul className="nav justify-content-center">
              <li className="nav-item"><a className="nav-link" href="meta.com">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="meta.com">About</a></li>
              <li className="nav-item"><a className="nav-link" href="meta.com">Shop</a></li>
              <li className="nav-item"><a className="nav-link" href="meta.com">Help</a></li>
            </ul>
          </nav>
      </div>
      <div className=" col-md-4">Item</div>
    </div>
    </div>
  );
}

function DoorSelector({handleDoorSelection}) {
  const [doorIndex, setDoorIndex] = useState(0)//Still must be defined at the top level

  useEffect(() => {
    console.log("INSIDE USEEFFECT")
    //Runs after render. This React hoook is used to handle interactions after everything in the component has rendered
    //React strictmode calls this twice for bug detecton(not in production builds), as such this creat two event listeners 
    const carousel = document.getElementById("carouselExample");
    const handleSlide = (event) => {
      console.log("EVENT:",  event)
      const newIndex = event.to;
      setDoorIndex(newIndex);
      //alert("Changed to door index: " + newIndex);
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
    alert("Inside handle buoild btn");
    handleDoorSelection(doorIndex) 
  }

  let doorElements =[]

  for (let i = 0; i < doors.length; i++) {
    doorElements.push(
      <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
          {/*<span><b>Garage door {i + 1}</b></span>*/}
        <img src={doors[i]} className="d-block img-fluid mx-auto" alt={`Garage door ${i + 1}`} />
      </div>
    );
    //console.log(elements[0])
  }

  return (
<div className="container-fluid">
  <div className="row justify-content-center">
    <div className="col-12">
      <div id="carouselExample" className="carousel slide w-100">
        <div className="carousel-indicators" >
          {doors.map((_, i) => (
            <button
              id='slide-btn'
              key={i}
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-current={i === 0}
              aria-label={`Door ${i + 1}`}
            /> ))}
        </div>

        <div className="carousel-inner">
          {doorElements}
        </div>

        <button className="carousel-control-prev control-btn" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <Link to="/build">
        <button id="build-door-btn" onClick={handleBuildBtn}>Build</button>
        </Link>

        <button className="carousel-control-next control-btn" type="button" data-bs-target="#carouselExample" data-bs-slide="next" >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
   </div>
  </div>);
}


function Footer(){
  return (
<h1>Footer</h1>
  );
}


function App() {
  const [selectedDoor,setSelectedDoor] = useState(0)
  const handleDoorSelection = (doorIndex) =>{
    setSelectedDoor(doorIndex)
  }

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={
            <DoorSelector handleDoorSelection={handleDoorSelection}/>}/>
        <Route path="/build" element={<Build selectedDoor={selectedDoor}/>} />
      </Routes>

      <Footer/>
    </>
  );
}

export default App;
