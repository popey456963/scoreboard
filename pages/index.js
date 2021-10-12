import Head from 'next/head'
import { useState, useEffect } from 'react'
import fscreen from 'fscreen'

import { BUSHNA_GAME, GAMEBOARD_VIEW, LANDSCAPE, PORTRAIT, SETTINGS_VIEW } from '../components/constants'
import Gameboard from '../components/Gameboard'
import SettingsButton from '../components/SettingsButton'
import { Settings } from '../components/Settings'




export default function Home() {
  const [players, setPlayers] = useState([
    { background: "#285FEA", name: "Player 1", grid: "one", score: 0, lastScore: 0 },
    { background: "#FF005F", name: "Player 2", grid: "two", score: 0, lastScore: 0 },
    { background: "#BC73F0", name: "Player 3", grid: "three", score: 0, lastScore: 0 },
    { background: "#600EA5", name: "Player 4", grid: "four", score: 0, lastScore: 0 },
    { background: "#969CAE", name: "Player 5", grid: "five", score: 0, lastScore: 0 },
    { background: "#3C4053", name: "Player 6", grid: "six", score: 0, lastScore: 0 }
  ])

  const [settings, setSettings] = useState({
    game: BUSHNA_GAME,
    numberOfPlayers: 6,

    scoresFaceOutwards: true,
    orientation: LANDSCAPE
  })

  const [currentView, setCurrentView] = useState(GAMEBOARD_VIEW)
  // const [currentView, setCurrentView] = useState(SETTINGS_VIEW)

  useEffect(() => {
    function checkOrientation() {
      const newOrientation = window.innerHeight > window.innerWidth ? PORTRAIT : LANDSCAPE

      if (newOrientation !== settings.orientation) {
        // alert(JSON.stringify({ newOrientation, height: window.innerHeight, width: window.innerWidth }))

        setSettings({ ...settings, orientation: newOrientation })
      }
    }

    const interval = setInterval(checkOrientation, 50)

    // window.addEventListener("orientationchange", checkOrientation, false)
    // checkOrientation()

    return function cleanup() {
      // window.removeEventListener("orientationchange", checkOrientation, false)
      clearInterval(interval)
    }
  }, [settings])

  useEffect(() => {
    function requestFullScreen() {
      if (!fscreen.fullscreenEnabled) return false
      if (fscreen.fullscreenElement) return false

      console.log(fscreen)

      fscreen.requestFullscreen(document.body)
    }

    fscreen.onfullscreenerror = () => alert("Request for full screen failed...")
    document.body.addEventListener('click', requestFullScreen)

    return function cleanup() {
      window.removeEventListener('click', requestFullScreen)
    }
  }, [])

  let currentViewElement
  switch (currentView) {
    case GAMEBOARD_VIEW:
      currentViewElement = (
        <>
          <Gameboard
            players={players}
            setPlayers={setPlayers}
            settings={settings}
            setSettings={setSettings}
            setCurrentView={setCurrentView}
          />
          <SettingsButton
            settings={settings}
            setCurrentView={setCurrentView}
          />
        </>
      )
      break

    case SETTINGS_VIEW:
      currentViewElement = (
        <Settings
          players={players}
          setPlayers={setPlayers}
          settings={settings}
          setSettings={setSettings}
          setCurrentView={setCurrentView}
        />
      )
  }

  return (
    <>
      <Head>
        <title>Bushna Scoreboard</title>
      </Head>

      {currentViewElement}
    </>
  )
}