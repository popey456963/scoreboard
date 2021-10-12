import { DOWN_ROTATION, LANDSCAPE, LAYOUTS, LEFT_ROTATION, PORTRAIT, RIGHT_ROTATION, UP_ROTATION } from "./constants"
import PlayerCard from "./PlayerCard"
import { changeLayoutOrientationToPortrait, gridTemplateToString, updateUnits } from "./utils"

const baseGameboardStyle = {
    display: "grid",
    gridGap: "3vh",
    height: "100vh",
    width: "100vw",
    padding: "5px",
    background: "black",
    overflow: "hidden",
}

export default function Gameboard({ players, setPlayers, settings, setSettings, setCurrentView }) {
    let layout = LAYOUTS[settings.numberOfPlayers]

    if (settings.orientation === PORTRAIT) {
        // alert("changing to portrait")

        layout = changeLayoutOrientationToPortrait(layout)
    }

    const playerCards = []

    for (let i = 0; i < settings.numberOfPlayers; i++) {
        function getSetPlayer() {
            return function setPlayer(player) {
                const newPlayers = [...players]

                if (player.score && player.score !== newPlayers[i].score) {
                    // player score changed, reset other last scores...
                    for (let [index, newPlayer] of Object.entries(newPlayers)) {
                        if (Number(index) !== i) newPlayer.lastScore = newPlayer.score
                    }
                }

                newPlayers[i] = { ...newPlayers[i], ...player }

                setPlayers(newPlayers)
            }
        }

        const cardRotation = settings.scoresFaceOutwards ? layout.players[i].rotation : DOWN_ROTATION

        const playerCard = (
            <PlayerCard
                key={i}
                player={players[i]}
                setPlayer={getSetPlayer()}
                cardRotation={cardRotation}
                settings={settings}
            />
        )

        playerCards.push(playerCard)
    }

    const gridStyle = { ...layout.grid, gridTemplateAreas: gridTemplateToString(layout.grid.gridTemplateAreas) }
    const updatedGameboardStyle = updateUnits(baseGameboardStyle, settings.orientation, ["gridGap"])
    console.log(updatedGameboardStyle)
    const gameboardStyle = Object.assign({}, updatedGameboardStyle, gridStyle)

    return (
        <div style={gameboardStyle}>
            {playerCards}
        </div>
    )
}