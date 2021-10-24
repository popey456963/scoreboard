import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import { SETTINGS_VIEW } from "./constants";
import { getUnits } from './utils';

export default function SettingsButton({ setCurrentView, settings }) {
    const v = getUnits(settings.orientation)

    return <div onClick={() => setCurrentView(SETTINGS_VIEW)}>
        <div style={{ width: "9" + v, height: "9" + v, background: "black", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "8" + v, height: "8" + v, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FontAwesomeIcon icon={faCog} style={{ width: "90%", height: "90%" }} color={"white"} />
            </div>
        </div>
    </div >
}