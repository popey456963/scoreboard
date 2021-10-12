import { DOWN_MOVEMENT, DOWN_ROTATION, LEFT_ROTATION, MOVEMENTS, NAME_PRESS, RIGHT_ROTATION, ROTATIONS, SCORE_PRESS, UP_MOVEMENT, UP_ROTATION } from "./constants"
import { useLongPress } from 'use-long-press'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input
} from "@chakra-ui/react"

import useDrag from "./useDrag"
import { getUnits, updateUnits } from "./utils"
import { useState } from "react"

const basePlayerStyle = {
    // display: "flex",

    // justifyContent: "center",
    textAlign: "center",

    borderRadius: "25px",
    fontSize: "2rem",
    padding: "4vh",

    color: "white",
}

function getCardRotationStyle(cardRotation) {
    switch (cardRotation) {
        case DOWN_ROTATION:
            return {}

        case RIGHT_ROTATION:
            return { writingMode: "vertical-rl" }

        case LEFT_ROTATION:
            return { writingMode: "vertical-rl", transform: "rotate(-180deg)" }

        case UP_ROTATION:
            return { transform: "rotate(180deg)" }

        default:
            throw new Error("Invalid Rotation: " + cardRotation)
    }
}

export default function PlayerCard({ player, setPlayer, cardRotation, settings }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentModal, setCurrentModal] = useState(NAME_PRESS)
    const [changeName, setChangeName] = useState("")
    const [changeScore, setChangeScore] = useState(0)

    const cardRotationStyle = getCardRotationStyle(cardRotation)
    const positionStyle = { background: player.background, gridArea: player.grid }

    const updatedPlayerStyle = updateUnits(basePlayerStyle, settings.orientation, ["padding"])
    const containerStyle = Object.assign({}, updatedPlayerStyle, cardRotationStyle, positionStyle)

    const nameLongPress = useLongPress(e => {
        e.stopPropagation()

        setCurrentModal(NAME_PRESS)
        setChangeName("")
        onOpen()
    }, { threshold: 400, cancelOnMovement: true, captureEvent: true })

    const scoreLongPress = useLongPress(e => {
        setCurrentModal(SCORE_PRESS)
        setChangeScore(0)
        onOpen()
    }, { threshold: 400, cancelOnMovement: true })

    const scoreDrag = useDrag((movement) => {
        const movementIndex = (MOVEMENTS.indexOf(movement) + ROTATIONS.indexOf(cardRotation)) % 4
        const relativeMovement = MOVEMENTS[movementIndex]

        let delta = 0
        if (relativeMovement === UP_MOVEMENT) delta = 1
        if (relativeMovement === DOWN_MOVEMENT) delta = -1

        setPlayer({ score: player.score + delta })
    })

    const fullSizeStyle = { width: "100%", height: "100%", display: "flex", justifyContent: "center" }
    const scoreChange = player.score - player.lastScore

    return (
        <div style={containerStyle}>
            <h5 style={{ fontSize: "7" + getUnits(settings.orientation) }} {...nameLongPress}>{player.name}</h5>

            <div style={fullSizeStyle} {...scoreDrag}>
                <div style={fullSizeStyle} {...scoreLongPress}>
                    <h1 style={{ fontSize: "20" + getUnits(settings.orientation) }}>{player.score}</h1>
                    {scoreChange !== 0 && <p>{scoreChange > 0 ? '↑' : '↓'}{scoreChange}</p>}
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currentModal === NAME_PRESS ? "Set Name" : "Set Score"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {currentModal === SCORE_PRESS && <Input type="number" variant="filled" value={changeScore} onChange={e => setChangeScore(e.target.value)} />}
                        {currentModal === NAME_PRESS && <Input type="text" variant="filled" value={changeName} onChange={e => setChangeName(e.target.value)} />}
                    </ModalBody>


                    <ModalFooter>
                        <Button variant="ghost">Cancel</Button>
                        <Button colorScheme="blue" mr={3} onClick={() => {
                            if (currentModal === SCORE_PRESS) {
                                const newScore = parseInt(changeScore)

                                if (!isNaN(newScore)) {
                                    setPlayer({ score: Number(changeScore) })
                                }
                            }

                            if (currentModal === NAME_PRESS) {
                                setPlayer({ name: changeName })
                            }

                            onClose()
                        }}>
                            Set
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div >
    )
}