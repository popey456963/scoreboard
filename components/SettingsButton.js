import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

import { SETTINGS_VIEW } from "./constants";
import { getUnits } from './utils';

export default function SettingsButton({ setCurrentView, settings }) {
    const v = getUnits(settings.orientation)

    return <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
    }} onClick={() => setCurrentView(SETTINGS_VIEW)}>
        <div style={{ width: "9" + v, height: "9" + v, background: "black", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "8" + v, height: "8" + v }}>
                <FontAwesomeIcon icon={faCog} style={{ width: "100%", height: "100%" }} color={"white"} />
            </div>
        </div>
    </div >
}