import { DOWN_ROTATION, LEFT_ROTATION, PORTRAIT, RIGHT_ROTATION, UP_ROTATION } from "./constants"
import cloneDeep from "clone-deep"

export function getUnits(orientation) {
    return orientation === PORTRAIT ? "vw" : "vh"
}

export function updateUnits(style, orientation, attributes) {
    const newStyles = { ...style }

    if (orientation === PORTRAIT) {
        for (let attribute of attributes) {
            newStyles[attribute] = style[attribute].replace("vh", "vw")
        }
    }

    return newStyles
}

function newMultiArray(w, h) {
    const md = []

    for (let i = 0; i < h; i++) {
        md[i] = []

        for (let j = 0; j < w; j++) {
            md[i][j] = 0
        }
    }

    return md
}

function transpose(mat) {
    return mat[0].map((val, index) => mat.map(row => row[index]).reverse())
    // let newMatrix = newMultiArray(mat.length, mat[0].length)

    // console.log("newMatrix", newMatrix)

    // for (var i = 0; i < mat.length; i++) {
    //     for (var j = 0; j < mat[0].length; j++) {
    //         newMatrix[j][i] = mat[i][j]
    //     }
    // }

    // return newMatrix
}


function rotateRotation(rotation) {
    switch (rotation) {
        case UP_ROTATION: return LEFT_ROTATION;
        case LEFT_ROTATION: return DOWN_ROTATION;
        case DOWN_ROTATION: return RIGHT_ROTATION;
        case RIGHT_ROTATION: return UP_ROTATION;
    }
}

export function changeLayoutOrientationToPortrait(layout) {
    // {
    //     grid: {
    //         gridTemplateAreas: [["one", "two"]],
    //             gridTemplateColumns: "repeat(2, 1fr)",
    //                 gridTemplateRows: "repeat(1, 1fr)"
    //     },
    //     players: [
    //         { rotation: RIGHT_ROTATION },
    //         { rotation: LEFT_ROTATION },
    //     ]
    // },

    const new_layout = cloneDeep(layout)

    new_layout.grid.gridTemplateAreas = transpose(new_layout.grid.gridTemplateAreas)
    var tmp = new_layout.grid.gridTemplateColumns
    new_layout.grid.gridTemplateColumns = new_layout.grid.gridTemplateRows
    new_layout.grid.gridTemplateRows = tmp

    for (var i = 0; i < new_layout.players.length; i++) {
        var cur_rotation = new_layout.players[i].rotation
        new_layout.players[i].rotation = rotateRotation(cur_rotation)
    }

    return new_layout
}

export function gridTemplateToString(grid) {
    return `"${grid.map(row => row.join(" ")).join("\" \"")}"`
}