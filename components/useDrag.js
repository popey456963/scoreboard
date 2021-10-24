import { useCallback, useEffect, useState } from 'react';
import { DOWN_MOVEMENT, LEFT_MOVEMENT, RIGHT_MOVEMENT, UP_MOVEMENT } from './constants';

export default function useDrag(onMovement = () => { }, { tolerance = 15 } = {}) {
    const [touchPress, setTouchPress] = useState(undefined)

    function onTouchStart(e) {
        setTouchPress(e.touches[0])
    }

    const repeatCall = useCallback((func, times, ...args) => {
        // console.log(func, times, args)
        for (let i = 0; i < Math.floor(times); i++) func(...args)
    })

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

    const [isOurClick, setIsOurClick] = useState(false)
    const [lastClickEvent, setLastClickEvent] = useState(undefined)

    function onMouseDown(e) {
        setIsOurClick(true)
        setLastClickEvent(e)
    }

    const onMouseMove = useCallback((e) => {
        e.preventDefault()

        if (!isOurClick || !lastClickEvent) return

        let deltaX = lastClickEvent.clientX - e.clientX
        let deltaY = lastClickEvent.clientY - e.clientY

        if (Math.abs(deltaY) > tolerance || Math.abs(deltaX) > tolerance) {
            setLastClickEvent(e)
        }

        if (deltaY > tolerance) { repeatCall(onMovement, Math.abs(deltaY / tolerance), UP_MOVEMENT) }
        else if (deltaY < -tolerance) { repeatCall(onMovement, Math.abs(deltaY / tolerance), DOWN_MOVEMENT) }
        else if (deltaX > tolerance) { repeatCall(onMovement, Math.abs(deltaX / tolerance), LEFT_MOVEMENT) }
        else if (deltaX < -tolerance) { repeatCall(onMovement, Math.abs(deltaX / tolerance), RIGHT_MOVEMENT) }
    }, [onMovement, lastClickEvent, tolerance, isOurClick, repeatCall])

    const onMouseUp = useCallback((e) => {
        if (!isOurClick || !lastClickEvent) return

        setLastClickEvent(undefined)
        setIsOurClick(false)
    }, [setLastClickEvent, setIsOurClick, lastClickEvent, isOurClick])


    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [onMouseMove, onMouseUp])

    return {
        onTouchMove,
        onTouchStart,
        onTouchEnd,
        onMouseDown
    };
}