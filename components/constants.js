export const GAMEBOARD_VIEW = "GAMEBOARD_VIEW"
export const SETTINGS_VIEW = "SETTINGS_VIEW"

export const BUSHNA_GAME = "BUSHNA_GAME"

export const DOWN_ROTATION = "DOWN_ROTATION"
export const UP_ROTATION = "UP_ROTATION"
export const LEFT_ROTATION = "LEFT_ROTATION"
export const RIGHT_ROTATION = "RIGHT_ROTATION"

export const ROTATIONS = [DOWN_ROTATION, RIGHT_ROTATION, UP_ROTATION, LEFT_ROTATION]

export const DOWN_MOVEMENT = "DOWN_MOVEMENT"
export const UP_MOVEMENT = "UP_MOVEMENT"
export const LEFT_MOVEMENT = "LEFT_MOVEMENT"
export const RIGHT_MOVEMENT = "RIGHT_MOVEMENT"

export const MOVEMENTS = [DOWN_MOVEMENT, RIGHT_MOVEMENT, UP_MOVEMENT, LEFT_MOVEMENT]

export const PORTRAIT = "PORTRAIT"
export const LANDSCAPE = "LANDSCAPE"

export const NAME_PRESS = "NAME_PRESS"
export const SCORE_PRESS = "SCORE_PRESS"

export const LAYOUTS = [
    {},
    {},

    // two players
    {
        grid: {
            gridTemplateAreas: [["one", "two"]],
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(1, 1fr)"
        },
        players: [
            { rotation: RIGHT_ROTATION },
            { rotation: LEFT_ROTATION },
        ]
    },

    // three players
    {
        grid: {
            gridTemplateAreas: [["one", "two"], ["one three"]],
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)"
        },
        players: [
            { rotation: RIGHT_ROTATION },
            { rotation: UP_ROTATION },
            { rotation: DOWN_ROTATION }
        ]
    },

    // four players
    {
        grid: {
            gridTemplateAreas: [["one", "two"], ["three", "four"]],
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)"
        },
        players: [
            { rotation: UP_ROTATION },
            { rotation: UP_ROTATION },
            { rotation: DOWN_ROTATION },
            { rotation: DOWN_ROTATION },
        ]
    },

    // five players
    {
        grid: {
            gridTemplateAreas: [["one", "two", "three"], ["one", "two", "three"], ["one", "four", "five"], ["one", "four", "five"]],
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)"
        },
        players: [
            { rotation: RIGHT_ROTATION },
            { rotation: UP_ROTATION },
            { rotation: UP_ROTATION },
            { rotation: DOWN_ROTATION },
            { rotation: DOWN_ROTATION },
        ]
    },

    // six players
    {
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
    }

    // {
    //     grid: {
    //         gridTemplateAreas: `"one one one one" "two two four four" "three three five five" "six six six six"`,
    //         gridTemplateColumns: "repeat(4, 1fr)",
    //         gridTemplateRows: "repeat(4, 1fr)"
    //     },
    //     players: [
    //         { rotation: UP_ROTATION },
    //         { rotation: RIGHT_ROTATION },
    //         { rotation: RIGHT_ROTATION },
    //         { rotation: LEFT_ROTATION },
    //         { rotation: LEFT_ROTATION },
    //         { rotation: DOWN_ROTATION }
    //     ]
    // }
]