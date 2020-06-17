import React from 'react'
import './App.css';
import Game from './components/Game'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import GameRule from './components/GameRule';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Game} />
          <Route path="/gamerule" exact component={GameRule} />
        </Switch>
      </div>
    </Router>
  )
}

export default App






// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { CirclePicker } from 'react-color'
// import {toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import Modal from 'react-modal'
// import { findByTestId } from '@testing-library/react';

// toast.configure()
// Modal.setAppElement("#root")



// function App() {

//   // THE STATE VARIABLES

//   //This is the state where computer choose any 4 color
//   const colorList = ['#ff0000', '#0000ff', '#008000', '#ffff00']
//   const [computerColors, setComputerColors] = useState({
//     firstColor: colorList[Math.floor(Math.random() * colorList.length)],
//     secondColor: colorList[Math.floor(Math.random() * colorList.length)],
//     thirdColor: colorList[Math.floor(Math.random() * colorList.length)],
//     fourthColor: colorList[Math.floor(Math.random() * colorList.length)],
//   })

//   // This is the state which holds the color chosen by user in each turn
//   const [userColors, setUserColors] = useState({
//     firstColor: '',
//     secondColor: '',
//     thirdColor: '',
//     fourthColor: ''
//   })

//   // The state variable holds the value of the color picker color
//   const [color, setColor] = useState('')

//   // This state variable determines whether to show/hide color-picker
//   const [showColorPicker, setShowColorPicker] = useState(false)

//   //This state variable is used to keep track of number of turns
//   const [index, setIndex] = useState(0)

//   // This state variable determines whether modal is opened or not
//   const [modalIsOpen, setModalIsOpen] = useState(false)

//   // This state variable is defined to keep track of winner
//   const [win, setWin] = useState(false)


//   // This handler function sets a color for the circle which user has picked from the color-picker
//   // and also sets the userColors object variables accordingly
//   const handleBackground = e => {
//     const id = e.target.id
//     e.target.style.background = color
//     switch (id) {
//       case '1':
//         setUserColors({ ...userColors, firstColor: color })
//         break
//       case '2':
//         setUserColors({ ...userColors, secondColor: color })
//         break
//       case '3':
//         setUserColors({ ...userColors, thirdColor: color })
//         break
//       case '4':
//         setUserColors({ ...userColors, fourthColor: color })
//         break
//     }
//   }

//   useEffect( () => {
//     console.log(`Index: ${index}`)
//     if(index === 7){
//       toast.warn("Last chance! All the best!", {position:toast.POSITION.TOP_RIGHT})
//     }
//     if (index > 7) {
//       console.log('I am in')
//       showModal()
//     }
//   },[index])

//   useEffect( () => {
//     toast.info("Game has started.Pick a color!", {position:toast.POSITION.BOTTOM_RIGHT})
//   },[])

//   // This is a utility function to create the next round after user has checked his/her current turn
//   const createNextRound = () => {
//     const AllCircleWrapper = document.querySelectorAll('.circle-wrapper')
//     // console.log(AllCircleWrapper);


//     const newCircleWrapper = AllCircleWrapper[index + 1]
//     // console.log(newCircleWrapper);

//     newCircleWrapper.classList.remove('hide')
//     Array.from(AllCircleWrapper).slice(0, index + 1).forEach(elem => elem.style.pointerEvents = 'none')


//   }

//   // This is a utility function which show a modal when use ran out of chances or won
//   const showModal = () => {
//     setModalIsOpen(true)
//   }

//   // This fucntion is run after the user click the check button.It is responsible to check the result and set the result check circle's colors and also creating a new round
//   const matchColor = () => {
//     const AllColoredCircles = document.querySelectorAll('.circles-to-color')
//     const currentColorCircles = Array.from(AllColoredCircles)[index]

//     const currentColors = currentColorCircles.children
//     let flag = false // this flag makes sure that user has filled all the circles in the current turn 
//     if (userColors.firstColor !== '' && userColors.secondColor !== '' & userColors.thirdColor !== '' & userColors.fourthColor !== '') {
//       flag = true
//     }
//     else {
//       console.log('not all colored');
//       toast.error("Please fill all the circle before checking!", {position:toast.POSITION.TOP_RIGHT,autoClose:2100})

//     }

//     if (flag) {
//       const AllColorCheckCircles = document.querySelectorAll('.circles-to-check')
//       const currentColorCheckCircles = Array.from(AllColorCheckCircles)[index]
//       currentColorCheckCircles.classList.remove('hide')

//       const pickedColorsOfUser = [userColors.firstColor, userColors.secondColor, userColors.thirdColor, userColors.fourthColor]
//       const pickedColorsOfComputer = [computerColors.firstColor, computerColors.secondColor, computerColors.thirdColor, computerColors.fourthColor]

//       pickedColorsOfUser.forEach((color, index) => {
//         if (pickedColorsOfComputer.includes(color)) {
//           currentColorCheckCircles.children[index].style.background = 'black'
//           if (color === pickedColorsOfComputer[index]) {
//             currentColorCheckCircles.children[index].style.background = 'violet'
//           }
//         }
//       })


//       setUserColors({
//         firstColor: '',
//         secondColor: '',
//         thirdColor: '',
//         fourthColor: ''
//       })
//       if(JSON.stringify(pickedColorsOfComputer) === JSON.stringify(pickedColorsOfUser)){
//         setWin(true)
//         setUserColors({
//           firstColor: pickedColorsOfUser[0],
//           secondColor: pickedColorsOfUser[1],
//           thirdColor: pickedColorsOfUser[2],
//           fourthColor: pickedColorsOfUser[3]
//         })
//         showModal()
//       }
//       setIndex(prevIndex => prevIndex + 1)




//       createNextRound()

//       console.log(pickedColorsOfComputer)
//       console.log(pickedColorsOfUser)


//     }
//   }

//   // Refreshes the page
//   const refreshPage = () => {
//     window.location.reload(false)
//   }

//   return (
//     <div className="App">
//       <div className="wrapper">
//         {/* The modal */}
//         <Modal isOpen={modalIsOpen}
//           shouldCloseOnOverlayClick={false}
//           shouldCloseOnEsc={false}
//           onRequestClose={() => setModalIsOpen(false)}
//           style={
//             {
//               overlay: {
//                 backgroundColor: 'grey'
//               },
//               content: {
//                 boxShadow: '0px 0px 10px orange',
//                 color: 'orange',
//                 width: '40%',
//                 display: 'block',
//                 margin: '10px auto',
//                 height: '50vh',
//                 textAlign:'center'
//               }
//             }
//           }>
//           <h2>{win ? "Great you won!":"Oops! You ran out of chances."}</h2>
//           <h3>{win ? `You took ${index} turns`:"Better luck next time!"}</h3>
//           <p>The computer picked</p>
//           <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',height:'30px'}}>
//               <div style={{ background: `${computerColors.firstColor}` }} className="circle"></div>
//               <div style={{ background: `${computerColors.secondColor}` }} className="circle"></div>
//               <div style={{ background: `${computerColors.thirdColor}` }} className="circle"></div>
//               <div style={{ background: `${computerColors.fourthColor}` }} className="circle"></div>
//           </div>
//           {win ? <div>
//           <p>Your final choice</p>
//           <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',height:'30px'}}>
//               <div style={{ background: `${userColors.firstColor}` }} className="circle"></div>
//               <div style={{ background: `${userColors.secondColor}` }} className="circle"></div>
//               <div style={{ background: `${userColors.thirdColor}` }} className="circle"></div>
//               <div style={{ background: `${userColors.fourthColor}` }} className="circle"></div>
//           </div>
//           </div> : ''}
//           <br/>
//           <button style={{cursor:'pointer',border:'2px solid orange', outline:'none', borderRadius:'5px',fontSize:'15px',background: 'rgb(247, 238, 222)'}} onClick={refreshPage}>Restart Game</button>
//         </Modal>

//         <div className="color-box">
//           <button onClick={() => setShowColorPicker(prevState => !prevState)}>{showColorPicker ? 'Close color picker' : 'Pick a color'}</button>
//           {
//             showColorPicker && (
//               <div className="color-chooser"><CirclePicker
//                 colors={['#ff0000', '#0000ff', '#008000', '#ffff00']}
//                 color={color}
//                 onChange={updatedColor => setColor(updatedColor.hex)} /></div>
//             )
//           }</div>
//         {/* <h2>You Picked {color}</h2> */}

//         <div className="play-box">


//           <div className="circle-wrapper">
//             <p className="turn-no">Turn - 1</p>
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>

//           <div className="circle-wrapper hide">
//             <p className="turn-no">Turn - 2</p>
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>

//           <div className="circle-wrapper hide">
//           <p className="turn-no">Turn - 3</p>
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>

//           <div className="circle-wrapper hide">
//           <p className="turn-no">Turn - 4</p>
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>

//           <div className="circle-wrapper hide">
//           <p className="turn-no">Turn - 5</p>
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>

//           <div className="circle-wrapper hide">
//           <p className="turn-no">Turn - 6</p>
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>

//           <div className="circle-wrapper hide">
//           <p className="turn-no">Turn - 7</p>
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>

//           <div className="circle-wrapper hide">
//           <p className="turn-no">Turn - 8</p>
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>

//           <div className="circle-wrapper hide">
//           <p className="turn-no">Turn - 9</p>
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>

//           <div className="circle-wrapper hide">
//           <p className="turn-no">Turn - 10</p>
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>
//           {/* Extra to avoid error */}
//           <div className="circle-wrapper hide">
//             <div className="circles-to-color">
//               <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
//               <button onClick={matchColor}>Check</button>
//             </div>
//             <div className="circles-to-check hide">
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//               <div className="circle-small"></div>
//             </div>
//           </div>


//         </div>

//       </div>
//     </div>
//   )
// }

// export default App