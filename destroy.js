function toggle_fullscreen() {
    var doc = window.document
    var docEl = doc.documentElement

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

    try {
        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl)
        }
        else {
            // requestFullScreen.call(docEl)
            // cancelFullScreen.call(doc)
        }
    } catch (e) { }
}

if (typeof window !== 'undefined') {
    if (document.getElementById('__next')) { document.getElementById('__next').onclick = function () { toggle_fullscreen() } }

    var tapped = false;
    document.body.addEventListener('touchstart', function (e) {
        if (!tapped) tapped = setTimeout(function () { tapped = null; }, 300)
        else { /* e.preventDefault(); */ toggle_fullscreen(); clearTimeout(tapped); tapped = null
        }
    })
}

