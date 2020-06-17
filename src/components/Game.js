import React, { useState, useEffect } from 'react';
import { CirclePicker } from 'react-color'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'
import { findByTestId } from '@testing-library/react';
import { Link } from 'react-router-dom';

toast.configure()
Modal.setAppElement("#root")



function Game() {


  // THE STATE VARIABLES

  //This is the state where computer choose any 4 color
  const colorList = ['#ff0000', '#0000ff', '#008000', '#ffff00', '#87ceeb', '#ff69b4']
  const [computerColors, setComputerColors] = useState({
    firstColor: colorList[Math.floor(Math.random() * colorList.length)],
    secondColor: colorList[Math.floor(Math.random() * colorList.length)],
    thirdColor: colorList[Math.floor(Math.random() * colorList.length)],
    fourthColor: colorList[Math.floor(Math.random() * colorList.length)],
  })

  // This is the state which holds the color chosen by user in each turn
  const [userColors, setUserColors] = useState({
    firstColor: '',
    secondColor: '',
    thirdColor: '',
    fourthColor: ''
  })

  // The state variable holds the value of the color picker color
  const [color, setColor] = useState('')

  // This state variable determines whether to show/hide color-picker
  const [showColorPicker, setShowColorPicker] = useState(false)

  //This state variable is used to keep track of number of turns
  const [index, setIndex] = useState(0)

  // This state variable determines whether result modal is opened or not
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [ruleModalIsOpen, setRuleModalIsOpen] = useState(false)

  // This state variable is defined to keep track of winner
  const [win, setWin] = useState(false)


  // This handler function sets a color for the circle which user has picked from the color-picker
  // and also sets the userColors object variables accordingly
  const handleBackground = e => {
    const id = e.target.id
    e.target.style.background = color
    switch (id) {
      case '1':
        setUserColors({ ...userColors, firstColor: color })
        break
      case '2':
        setUserColors({ ...userColors, secondColor: color })
        break
      case '3':
        setUserColors({ ...userColors, thirdColor: color })
        break
      case '4':
        setUserColors({ ...userColors, fourthColor: color })
        break
    }
  }

  useEffect(() => {
    // console.log(`Index: ${index}`)
    if (index === 6) {
      toast.warn("Last chance! All the best!", { position: toast.POSITION.TOP_RIGHT })
    }
    if (index > 6) {
      // console.log('I am in')
      showModal()
    }
  }, [index])

  useEffect(() => {
    toast.info("Game has started.Pick a color!", { position: toast.POSITION.BOTTOM_RIGHT })
  }, [])

  // This is a utility function to create the next round after user has checked his/her current turn
  const createNextRound = () => {
    const AllCircleWrapper = document.querySelectorAll('.circle-wrapper')
    // console.log(AllCircleWrapper);


    const newCircleWrapper = AllCircleWrapper[index + 1]
    // console.log(newCircleWrapper);

    newCircleWrapper.classList.remove('hide')
    Array.from(AllCircleWrapper).slice(0, index + 1).forEach(elem => elem.style.pointerEvents = 'none')


  }

  // This is a utility function which show a modal when use ran out of chances or won
  const showModal = () => {
    setModalIsOpen(true)
  }

  // This fucntion is run after the user click the check button.It is responsible to check the result and set the result check circle's colors and also creating a new round
  const matchColor = () => {
    const AllColoredCircles = document.querySelectorAll('.circles-to-color')
    const currentColorCircles = Array.from(AllColoredCircles)[index]

    const currentColors = currentColorCircles.children
    let flag = false // this flag makes sure that user has filled all the circles in the current turn 
    if (userColors.firstColor !== '' && userColors.secondColor !== '' & userColors.thirdColor !== '' & userColors.fourthColor !== '') {
      flag = true
    }
    else {
      console.log('not all colored');
      toast.error("Please fill all the circle before checking!", { position: toast.POSITION.TOP_RIGHT, autoClose: 2100 })

    }

    if (flag) {
      const AllColorCheckCircles = document.querySelectorAll('.circles-to-check')
      const currentColorCheckCircles = Array.from(AllColorCheckCircles)[index]
      currentColorCheckCircles.classList.remove('hide')

      const pickedColorsOfUser = [userColors.firstColor, userColors.secondColor, userColors.thirdColor, userColors.fourthColor]
      const pickedColorsOfComputer = [computerColors.firstColor, computerColors.secondColor, computerColors.thirdColor, computerColors.fourthColor]

      pickedColorsOfUser.forEach((color, index) => {
        if (pickedColorsOfComputer.includes(color)) {
          currentColorCheckCircles.children[index].style.background = 'black'
          if (color === pickedColorsOfComputer[index]) {
            currentColorCheckCircles.children[index].style.background = 'violet'
          }
        }
      })


      setUserColors({
        firstColor: '',
        secondColor: '',
        thirdColor: '',
        fourthColor: ''
      })
      if (JSON.stringify(pickedColorsOfComputer) === JSON.stringify(pickedColorsOfUser)) {
        setWin(true)
        setUserColors({
          firstColor: pickedColorsOfUser[0],
          secondColor: pickedColorsOfUser[1],
          thirdColor: pickedColorsOfUser[2],
          fourthColor: pickedColorsOfUser[3]
        })
        showModal()
      }
      setIndex(prevIndex => prevIndex + 1)




      createNextRound()

    }
  }

  // Refreshes the page
  const refreshPage = () => {
    window.location.reload(false)
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <div className="wrapper">
        {/* The Result modal */}
        <Modal isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          onRequestClose={() => setModalIsOpen(false)}
          style={
            {
              overlay: {
                backgroundColor: 'grey'
              },
              content: {
                boxShadow: '0px 0px 10px orange',
                color: 'orange',
                width: '40%',
                display: 'block',
                margin: '10px auto',
                height: '50vh',
                textAlign: 'center'
              }
            }
          }>
          <h2>{win ? "Great you won!" : "Oops! You ran out of chances."}</h2>
          <h3>{win ? `You took ${index} turns` : "Better luck next time!"}</h3>
          <p>The computer picked</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '30px' }}>
            <div style={{ background: `${computerColors.firstColor}` }} className="circle"></div>
            <div style={{ background: `${computerColors.secondColor}` }} className="circle"></div>
            <div style={{ background: `${computerColors.thirdColor}` }} className="circle"></div>
            <div style={{ background: `${computerColors.fourthColor}` }} className="circle"></div>
          </div>
          {win ? <div>
            <p>Your final choice</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '30px' }}>
              <div style={{ background: `${userColors.firstColor}` }} className="circle"></div>
              <div style={{ background: `${userColors.secondColor}` }} className="circle"></div>
              <div style={{ background: `${userColors.thirdColor}` }} className="circle"></div>
              <div style={{ background: `${userColors.fourthColor}` }} className="circle"></div>
            </div>
          </div> : ''}
          <br />
          <button style={{ cursor: 'pointer', border: '2px solid orange', outline: 'none', borderRadius: '5px', fontSize: '15px', background: 'rgb(247, 238, 222)' }} onClick={refreshPage}>Restart Game</button>
        </Modal>


        {/* The Rule Modal */}
        <Modal isOpen={ruleModalIsOpen}
          shouldCloseOnOverlayClick={false}
          shouldCloseOnEsc={false}
          onRequestClose={() => setRuleModalIsOpen(false)}
          style={
            {
              overlay: {
                backgroundColor: 'grey'
              },
              content: {
                boxShadow: '0px 0px 10px orange',
                color: 'orange',
                width: '70%',
                display: 'block',
                margin: '10px auto',
                height: '62vh',
                textAlign: 'center'
              }
            }
          }>
          <div id="rules"className="paragraphs" style={{color:'yellow'}}>
                    <p style={{textAlign:'center'}}>Understanding the hints!</p>
                    <ul>
                        <li>If you choose a color for a cirlce and the color is present in the list of 4 colors, the computer has picked, then the respective 'check circle' will be colored 'black'.</li>
                        <li>If you choose a color for a cirlce and the computer has also picked the same color for the same circle, then the respective 'check circle' will be colored 'violet'.</li>
                        <li>If you choose a color for a circle and the color is not at all present in the list of 4 colors, the computer has picked, then the respective 'check circle' will be kept 'white'.</li>
                    </ul>
          </div>
          <button style={{ cursor: 'pointer', border: '2px solid yellow', outline: 'none', borderRadius: '5px', fontSize: '15px',color:'yellow', background: ' rgb(119, 70, 70)' }} onClick={() => setRuleModalIsOpen(false)}>Resume Playing</button>
        </Modal>
        {/* The Rule Link */}
        <div className="sticky-text" onClick={() => setRuleModalIsOpen(true)}>Hints Here!</div>

        {/* The Color Pickee Area */}
        <div className="color-box">
          <button onClick={() => setShowColorPicker(prevState => !prevState)}>{showColorPicker ? 'Close color picker' : 'Pick a color'}</button>
          {
            showColorPicker && (
              <div className="color-chooser"><CirclePicker
                colors={['#ff0000', '#0000ff', '#008000', '#ffff00', '#87ceeb', '#ff69b4']}
                color={color}
                onChange={updatedColor => setColor(updatedColor.hex)} /></div>
            )
          }</div>
        {/* <h2>You Picked {color}</h2> */}


        {/* gamerule Link */}
        <Link to="/gamerule"><p style={{ fontSize: '20px' }}><em>Learn Game Rule</em></p></Link>

        {/* Play Area */}
        <div className="play-box">

          {/* Each Turns Consecutively */}
          <div className="circle-wrapper">
            <p className="turn-no">Turn - 1</p>
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>

          {/* Initially hidden, open after checking of orevious turn   */}
          <div className="circle-wrapper hide">
            <p className="turn-no">Turn - 2</p>
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>

          <div className="circle-wrapper hide">
            <p className="turn-no">Turn - 3</p>
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>

          <div className="circle-wrapper hide">
            <p className="turn-no">Turn - 4</p>
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>

          <div className="circle-wrapper hide">
            <p className="turn-no">Turn - 5</p>
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>

          <div className="circle-wrapper hide">
            <p className="turn-no">Turn - 6</p>
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>

          <div className="circle-wrapper hide">
            <p className="turn-no">Turn - 7</p>
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>

          <div className="circle-wrapper hide">
            <p className="turn-no">Turn - 8</p>
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>

          <div className="circle-wrapper hide">
            <p className="turn-no">Turn - 9</p>
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>

          <div className="circle-wrapper hide">
            <p className="turn-no">Turn - 10</p>
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>
          {/* Extra to avoid error */}
          <div className="circle-wrapper hide">
            <div className="circles-to-color">
              <div id="1" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="2" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="3" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <div id="4" onClick={handleBackground} style={{ background: 'rgb(255,255,255' }} className="circle"></div>
              <button onClick={matchColor}>Check</button>
            </div>
            <div className="circles-to-check hide">
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
              <div className="circle-small"></div>
            </div>
          </div>


        </div>

      </div>
    </div>
  )
}

export default Game