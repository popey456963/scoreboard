import Head from 'next/head'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

const layouts = [
  {},
  {},

  // two players
  {
    grid: {
      gridTemplateAreas: `"one two"`,
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(1, 1fr)"
    },
    players: [
      { gridArea: "one", writingMode: "vertical-rl", rotation: "left" },
      { gridArea: "two", writingMode: "vertical-rl", transform: "rotate(-180deg)", rotation: "right" },
    ]
  },

  // three players
  {
    grid: {
      gridTemplateAreas: `"one two" "one three"`,
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)"
    },
    players: [
      { gridArea: "one", writingMode: "vertical-rl", rotation: "left" },
      { gridArea: "two", transform: "rotate(180deg)", rotation: "up" },
      { gridArea: "three", rotation: "down" }
    ]
  },

  // four players
  {
    grid: {
      gridTemplateAreas: `"one two" "three four"`,
      gridTemplateColumns: "repeat(2, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)"
    },
    players: [
      { gridArea: "one", transform: "rotate(180deg)", rotation: "up" },
      { gridArea: "two", transform: "rotate(180deg)", rotation: "up" },
      { gridArea: "three", rotation: "down" },
      { gridArea: "four", rotation: "down" },
    ]
  },

  // five players
  {
    grid: {
      gridTemplateAreas: `"one two three" "one two three" "one four five" "one four five"`,
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(4, 1fr)"
    },
    players: [
      { gridArea: "one", writingMode: "vertical-rl", rotation: "left" },
      { gridArea: "two", transform: "rotate(180deg)", rotation: "up" },
      { gridArea: "three", transform: "rotate(180deg)", rotation: "up" },
      { gridArea: "four", rotation: "down" },
      { gridArea: "five", rotation: "down" },
    ]
  },

  // six players
  {
    grid: {
      gridTemplateAreas: `"one two three six" "one two three six" "one four five six" "one four five six"`,
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(4, 1fr)"
    },
    players: [
      { gridArea: "one", writingMode: "vertical-rl", rotation: "left" },
      { gridArea: "two", transform: "rotate(180deg)", rotation: "up" },
      { gridArea: "three", transform: "rotate(180deg)", rotation: "up" },
      { gridArea: "four", rotation: "down" },
      { gridArea: "five", rotation: "down" },
      { gridArea: "six", writingMode: "vertical-rl", transform: "rotate(-180deg)", rotation: "right" }
    ]
  }
]

const genericPlayers = [
  { background: "#285FEA" },
  { background: "#FF005F" },
  { background: "#BC73F0" },
  { background: "#600EA5" },
  { background: "#969CAE" },
  { background: "#3C4053" }
]

const basePlayer = {
  borderRadius: "25px",
  display: "flex",
  justifyContent: "center",
  // alignItems: "center",
  fontSize: "2rem",
  color: "white",

  padding: "4vh"
}

const baseGrid = {
  display: "grid",
  gridGap: "3vh",
  height: "100vh",
  padding: "5px",
  background: "black"
}

function Scoreboard({ playerCount, scores, setScores, sameDirection, playerNames, setPlayers }) {
  const players = []

  function getScoreFunction(index) {
    return function (score) {
      const newScores = [...scores]
      newScores[index] = score
      setScores(newScores)
    }
  }

  function getNameFunction(index) {
    return function (name) {
      const newPlayers = [...playerNames]
      newPlayers[index] = name
      setPlayers(newPlayers)
    }
  }

  let override = {}

  if (sameDirection) {
    override = { transform: "", writingMode: "", rotation: "" }
  }

  for (let i = 0; i < playerCount; i++) {
    const rotation = layouts[playerCount].players[i].rotation
    const style = Object.assign({}, basePlayer, layouts[playerCount].players[i], genericPlayers[i], override)

    players.push(<div style={style}>
      <Player setPlayerName={getNameFunction(i)} playerName={playerNames[i]} playerNumber={i} score={scores[i]} setScore={getScoreFunction(i)} rotation={sameDirection ? "down" : rotation} />
    </div>)
  }

  return (
    <div style={Object.assign({}, baseGrid, layouts[playerCount].grid)}>
      {players}
    </div>
  )
}

function Player({ playerNumber, score, setScore, rotation, playerName, setPlayerName }) {
  const [currentTouch, setCurrentTouch] = useState({})
  const [currentTimeout, setCurrentTimeout] = useState(undefined)
  const [currentNameTimeout, setCurrentNameTimeout] = useState(undefined)

  function longTapName() {
    const newName = prompt("Set Name: ")
    setPlayerName(newName)
  }

  function longTap() {
    const newScore = parseInt(prompt("Set Score: "))

    if (!isNaN(newScore)) {
      setScore(newScore)
    }

    // toggle_fullscreen()
  }

  function onTouchStart(e) {
    setCurrentTouch(e.touches[0])

    if (!currentTimeout) {
      setCurrentTimeout(setTimeout(longTap, 500))
    }
  }

  function onTouchMove(e) {
    // alert(JSON.stringify(e.clientX, e.clientY))
    e.preventDefault()

    if (currentTimeout) {
      clearTimeout(currentTimeout)
      setCurrentTimeout(undefined)
    }

    const tolerance = 15

    var deltaX = currentTouch.clientX - e.touches[0].clientX
    var deltaY = currentTouch.clientY - e.touches[0].clientY
    if (deltaY > tolerance) {
      if (rotation === "down") { setScore(score + 1); setCurrentTouch(e.touches[0]) }
      if (rotation === "up") { setScore(score - 1); setCurrentTouch(e.touches[0]) }
    }
    else if (deltaY < -tolerance) {
      if (rotation === "down") { setScore(score - 1); setCurrentTouch(e.touches[0]) }
      if (rotation === "up") { setScore(score + 1); setCurrentTouch(e.touches[0]) }
    }

    if (deltaX > tolerance) {
      if (rotation === "right") { setScore(score + 1); setCurrentTouch(e.touches[0]) }
      if (rotation === "left") { setScore(score - 1); setCurrentTouch(e.touches[0]) }
    }
    else if (deltaX < -tolerance) {
      if (rotation === "right") { setScore(score - 1); setCurrentTouch(e.touches[0]) }
      if (rotation === "left") { setScore(score + 1); setCurrentTouch(e.touches[0]) }
    }
  }

  function onTouchEnd(e) {
    if (currentTimeout) {
      clearTimeout(currentTimeout)
      setCurrentTimeout(undefined)
    }
  }

  function onTouchStartName(e) {
    e.stopPropagation()

    if (!currentNameTimeout) {
      setCurrentNameTimeout(setTimeout(longTapName, 500))
    }
  }

  function onTouchMoveName(e) {
    e.stopPropagation()

    if (currentNameTimeout) {
      clearTimeout(currentNameTimeout)
      setCurrentNameTimeout(undefined)
    }
  }

  function onTouchEndName(e) {
    e.stopPropagation()

    if (currentNameTimeout) {
      clearTimeout(currentNameTimeout)
      setCurrentNameTimeout(undefined)
    }
  }

  return (<div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} style={{
    textAlign: "center",
    width: "100%",
    height: "100%"
  }}>
    <p onTouchStart={onTouchStartName} onTouchMove={onTouchMoveName} onTouchEnd={onTouchEndName}>{playerName}</p>
    <div style={{
      width: "100%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div>
        <p style={{ fontSize: "6rem" }}>{score}</p>
      </div>
    </div>
  </div>)
}

function SettingsButton({ setShowSettings }) {
  return <div style={{
    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
  }} onClick={() => setShowSettings(true)}>
    <div style={{ width: "9vh", height: "9vh", background: "black", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "8vh", height: "8vh" }}>
        <FontAwesomeIcon icon={faCog} color={"white"} />
      </div>
    </div>
  </div >

  // return <button onClick={() => setShowSettings(true)} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
  //   settings
  // </button>
}

function Settings({ setShowSettings, setPlayers, setSameDirection, setScores, scores }) {
  const [score, setScore] = useState(0)

  return <div>
    <br />
    <br />

    <div>
      <button style={{ width: "100px" }} onClick={() => setPlayers(2)}>2</button>
      <button style={{ width: "100px" }} onClick={() => setPlayers(3)}>3</button>
      <button style={{ width: "100px" }} onClick={() => setPlayers(4)}>4</button>
      <button style={{ width: "100px" }} onClick={() => setPlayers(5)}>5</button>
      <button style={{ width: "100px" }} onClick={() => setPlayers(6)}>6</button>
    </div>

    <br />

    <div>
      <button style={{ width: "100px" }} onClick={() => setSameDirection(true)}>Same Direction</button>
      <button style={{ width: "100px" }} onClick={() => setSameDirection(false)}>Outwards Direction</button>
    </div>

    <br />

    <div>
      <input type="number" value={score} onChange={(e) => setScore(e.target.value)} />
      <button style={{ width: "100px" }} onClick={() => setScores([...scores].fill(parseInt(score)))}>Set All Scores</button>
      <button style={{ width: "100px" }} onClick={() => setScores([...scores].fill(0))}>Reset To Zero</button>
    </div>

    <br />
    <br />

    <div>
      <button onClick={() => setShowSettings(false)}>Close</button>
    </div>
  </div >
}

export default function Home() {
  // const [players, setPlayers] = useState([
  //   { background: "#285FEA", name: "Player 1", grid: "one", score: 0 },
  //   { background: "#FF005F", name: "Player 2", grid: "two", score: 0 },
  //   { background: "#BC73F0", name: "Player 3", grid: "three", score: 0 },
  //   { background: "#600EA5", name: "Player 4", grid: "four", score: 0 },
  //   { background: "#969CAE", name: "Player 5", grid: "five", score: 0 },
  //   { background: "#3C4053", name: "Player 6", grid: "six", score: 0 }
  // ])

  // const [settings, setSettings] = useState({
  //   numberOfPlayers: 6,


  // })

  const [players, setPlayers] = useState(6)
  const [scores, setScores] = useState(new Array(6).fill(0))
  const [showSettings, setShowSettings] = useState(false)
  const [sameDirection, setSameDirection] = useState(false)
  const [playerNames, setPlayerNames] = useState(new Array(6).fill(1).map((_, index) => `Player ${index + 1}`))

  console.log(scores)

  return (
    <>
      <Head>
        <title>Bushna Scoreboard</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>

      {!showSettings && <Scoreboard playerNames={playerNames} setPlayers={setPlayerNames} sameDirection={sameDirection} playerCount={players} scores={scores} setScores={setScores} />}
      {!showSettings && <SettingsButton setShowSettings={setShowSettings} />}
      {showSettings && <Settings setScores={setScores} scores={scores} setShowSettings={setShowSettings} setPlayers={setPlayers} setSameDirection={setSameDirection} />}
    </>
  )
}

function toggle_fullscreen() {
  var doc = window.document
  var docEl = doc.documentElement

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

  try {
    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl)
    }
    else {
      // requestFullScreen.call(docEl)
      // cancelFullScreen.call(doc)
    }
  } catch (e) { }
}

if (typeof window !== 'undefined') {
  if (document.getElementById('__next')) { document.getElementById('__next').onclick = function () { toggle_fullscreen() } }

  var tapped = false;
  document.body.addEventListener('touchstart', function (e) {
    if (!tapped) tapped = setTimeout(function () { tapped = null; }, 300)
    else { /* e.preventDefault(); */ toggle_fullscreen(); clearTimeout(tapped); tapped = null
    }
  })
}

