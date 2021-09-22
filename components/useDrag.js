import { useState } from 'react';
import { DOWN_MOVEMENT, LEFT_MOVEMENT, RIGHT_MOVEMENT, UP_MOVEMENT } from './constants';

export default function useDrag(onMovement = () => { }, { tolerance = 15 } = {}) {
    const [touchPress, setTouchPress] = useState(undefined);

    function onTouchStart(e) {
        setTouchPress(e.touches[0])
    }

    function onTouchMove(e) {
        e.preventDefault()

        var deltaX = touchPress.clientX - e.touches[0].clientX
        var deltaY = touchPress.clientY - e.touches[0].clientY

        if (Math.abs(deltaY) > tolerance || Math.abs(deltaX) > tolerance) {
            setTouchPress(e.touches[0])
        }

        if (deltaY > tolerance) { onMovement(UP_MOVEMENT) }
        else if (deltaY < -tolerance) { onMovement(DOWN_MOVEMENT) }
        else if (deltaX > tolerance) { onMovement(LEFT_MOVEMENT) }
        else if (deltaX < -tolerance) { onMovement(RIGHT_MOVEMENT) }
    }

    function onTouchEnd(e) {
        setTouchPress(undefined)
    }

    return {
        onTouchMove,
        onTouchStart,
        onTouchEnd,
    };
}