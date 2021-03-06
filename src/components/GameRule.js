import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function GameRule({ match }) {

    // console.log(match);
    // useEffect( () => {
    //     if(match.url === '/gamerule/hint'){
    //         let hintPosition = document.getElementById('hints').getBoundingClientRect().bottom
    //         window.scrollTo(0,hintPosition)
    //     }
    // },[])

    return (
        <div>
            <Link style={{ textDecoration: "none" }} to="/"><button style={getStyle}>Play Game</button></Link>
            <div className="game-rule-box">
                <h1 className="header-text">The main goal of the game is to find the ultimate pattern of color the computer has chosen</h1>
                <div className="paragraphs" style={{ color: 'red' }}>
                    1. After the game starts, the computer will choose any random 4 colors for 4 cirlces. <br />
                    <em>How the computer chooses?</em><br />
                    <ul>
                        <li>Computer will only choose 4 colors from 6 colors available in the color-picker given to you(i.e., red, blue, green, yellow, sky-blue, hot-pink).</li>
                        <li>The computer may choose same color as many time as it wants. Like (red, red, blue, green) , (red, red, red, red) are also possible patterns.</li>
                    </ul>
                </div>
                <div className="paragraphs" style={{ color: 'blue' }}>
                    2. Your job is to crack the exact combination of colors in respective order. <br />
                    <b>You will be given 12 chances to do so!</b>
                </div>
                <div className="paragraphs" style={{ color: 'green' }}>
                    3. Now, there are 6*6*6*6 = 1296 possible patterns. So how can you guess in just 8 rounds? That is why, after each turn when you click the 'check button' you will be given hints in the 'check-circles'(only appear after 'check' is clicked) based on the patterns you have guessed.
                </div>
                <div id="hints" className="paragraphs" style={{ color: 'yellow' }}>
                    4. Understanding the hints! <br />
                    <ul>
                        <li>If you choose a color for a cirlce and the color is present in the list of 4 colors, the computer has picked,<em>any one of the 'check circles' </em> will be colored 'black'.</li><br/>
                        <li>If you choose a color for a cirlce and the computer has also picked the same color for the same circle, then<em> any one of the 'check circles' </em> will be colored 'violet'.</li><br/>
                        <li>If you choose a color for a circle and the color is not at all present in the list of 4 colors, the computer has picked, <em>any of the 'check circles'</em> will be kept 'white'.</li><br/>

                        Ex : Computer Picked : (red, blue, red, green) <br />
                        <ul>
                            <li>If you pick (red, green, hot-pink, red) <br />
                        Then 2 of any check circles will be colored 'black' indicating your choices green and last red ; 1 of any check cirlces will be colored 'violet' indicating your choice first red ; any one check circle will be kept 'white' indicating your choice 'hot-pink'.</li><br/>
                            <li>If you pick (red , red, red, red) ; any 1 of the four check circles will be 'violet' indicating the first red of yours. Remaining three check circles will be 'black' indicating your remaining three red choices. [caution : That doesn't mean there are four red colors in the computer's choice ,In that case you would have get all 'violet']</li>
                        </ul>


                    </ul>
                </div>
                <em>The idea of the game is from a board game named <Link to="https://en.wikipedia.org/wiki/Mastermind_(board_game)">Mastermind</Link> invented in 1970 by Mordecai Meirowitz, a Israeli postmaster and telecommunication expert.</em>
            </div>

        </div>
    )
}
const getStyle = {
    padding: '5px',
    outline: "none",
    border: '3px solid red',
    borderRadius: '5px',
    fontSize: '20px',
    display: 'block',
    margin: '25px auto',
    background: 'rgb(252, 222, 218)'
}

export default GameRule
