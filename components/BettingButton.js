import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust } from '@fortawesome/free-solid-svg-icons'
import { useLongPress } from 'use-long-press'

import { getUnits } from './utils';
import { GAMEBOARD_BETTING_VIEW, GAMEBOARD_VIEW } from './constants';

export default function BettingButton({ setCurrentView, settings, currentView, players, setPlayers }) {
    const v = getUnits(settings.orientation)

    const bettingLongPress = useLongPress(e => {
        e.stopPropagation()
        setPlayers([...players].map(player => { player.bet = 0; return player }))
    }, { threshold: 400, cancelOnMovement: true, captureEvent: true, onFinish: () => setCurrentView(newCurrentView => newCurrentView === GAMEBOARD_BETTING_VIEW ? GAMEBOARD_VIEW : GAMEBOARD_BETTING_VIEW) })

    return <div onClick={() => setCurrentView(newCurrentView => newCurrentView === GAMEBOARD_BETTING_VIEW ? GAMEBOARD_VIEW : GAMEBOARD_BETTING_VIEW)}>
        <div style={{ width: "9" + v, height: "9" + v, background: "black", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}  {...bettingLongPress}>
            <div style={{ width: "8" + v, height: "8" + v, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FontAwesomeIcon icon={faAdjust} style={{ width: "90%", height: "90%" }} color={"white"} />
            </div>
        </div>
    </div >
}