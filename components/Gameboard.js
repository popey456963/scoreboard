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

    console.log(changeLayoutOrientationToPortrait({
        grid: {
            gridTemplateAreas: [["one", "two", "three", "six"], ["one", "two", "three", "six"], ["one", "four", "five", "six"], ["one", "four", "five", "six"]],
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)"
        },
        players: [
            { rotation: RIGHT_ROTATION },
            { rotation: UP_ROTATION },
            { rotation: UP_ROTATION },
            { rotation: DOWN_ROTATION },
            { rotation: DOWN_ROTATION },
            { rotation: LEFT_ROTATION }
        ]
    }))

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