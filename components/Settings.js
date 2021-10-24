import { useState } from "react"

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    RadioGroup,
    HStack,
    Radio,
    Switch,
    Stack,
    Button,
    Heading,
    Input
} from "@chakra-ui/react"
import { GAMEBOARD_VIEW } from "./constants"

export function Settings({ players, setPlayers, settings, setSettings, setCurrentView }) {
    const [score, setScore] = useState(0)

    const playerNumberVariant = (numPlayers, button) => numPlayers === button ? "solid" : "outline"
    const setPlayerCount = numPlayers => setSettings({ ...settings, numberOfPlayers: numPlayers })
    const setOutwardScores = e => setSettings({ ...settings, scoresFaceOutwards: e.target.checked })

    const playerNumberButtons = []

    for (let i = 2; i < 9; i++) {
        playerNumberButtons.push(
            <Button
                key={i}
                colorScheme="teal"
                variant={playerNumberVariant(settings.numberOfPlayers, i)}
                onClick={() => setPlayerCount(i)}>
                {i}
            </Button>
        )
    }

    return (
        <>
            <div style={{ padding: "2rem", background: "#1A202C", height: "100vh" }}>
                <Heading>Settings</Heading>

                <div style={{ height: "6vh" }}></div>

                <FormLabel mb="0">
                    Number of Players
                </FormLabel>
                <Stack direction="row" spacing={4} align="center">
                    {playerNumberButtons}
                </Stack>

                <div style={{ height: "6vh" }}></div>

                <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="outward" mb="0">
                        Outward Facing Scores
                    </FormLabel>
                    <Switch id="outward" isChecked={settings.scoresFaceOutwards} onChange={setOutwardScores} />
                </FormControl>

                <div style={{ height: "6vh" }}></div>

                <FormControl>
                    <FormLabel>Set All Scores</FormLabel>
                    <Input type="number" variant="filled" value={score} onChange={e => setScore(e.target.value)} />
                    <Stack direction="row" spacing={4} align="center">
                        <Button colorScheme="teal" variant="outline" onClick={() => setPlayers([...players].map(player => { player.score = parseInt(score); return player }))}>Set to Value</Button>
                        <Button colorScheme="teal" variant="outline" onClick={() => setPlayers([...players].map(player => { player.score = 0; return player }))}>Reset to Zero</Button>
                    </Stack>
                </FormControl>

                <div style={{ height: "6vh" }}></div>

                <Button colorScheme="teal" variant="outline" onClick={() => setCurrentView(GAMEBOARD_VIEW)}>Close Settings</Button>
            </div>
        </>
    )


    // <div>
    //     <br />
    //     <br />

    //     <Box bg="tomato" w="100%" p={4} color="white">
    //         This is the Box
    //     </Box>

    //     <div>
    //         <button style={{ width: "100px" }} onClick={() => setPlayers(2)}>2</button>
    //         <button style={{ width: "100px" }} onClick={() => setPlayers(3)}>3</button>
    //         <button style={{ width: "100px" }} onClick={() => setPlayers(4)}>4</button>
    //         <button style={{ width: "100px" }} onClick={() => setPlayers(5)}>5</button>
    //         <button style={{ width: "100px" }} onClick={() => setPlayers(6)}>6</button>
    //     </div>

    //     <br />

    //     <div>
    //         <button style={{ width: "100px" }} onClick={() => setSameDirection(true)}>Same Direction</button>
    //         <button style={{ width: "100px" }} onClick={() => setSameDirection(false)}>Outwards Direction</button>
    //     </div>

    //     <br />

    //     <div>
    //         <input type="number" value={score} onChange={(e) => setScore(e.target.value)} />
    //         <button style={{ width: "100px" }} onClick={() => setScores([...scores].fill(parseInt(score)))}>Set All Scores</button>
    //         <button style={{ width: "100px" }} onClick={() => setScores([...scores].fill(0))}>Reset To Zero</button>
    //     </div>

    //     <br />
    //     <br />

    //     <div>
    //         <button onClick={() => setShowSettings(false)}>Close</button>
    //     </div>
    // </div >
}