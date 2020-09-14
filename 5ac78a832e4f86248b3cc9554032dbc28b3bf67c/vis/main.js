//OxySound

!function() {
    function n(n, e, t) {
        e /= 100, t /= 100;
        var i = (1 - Math.abs(2 * t - 1)) * e,
            a = i * (1 - Math.abs(n / 60 % 2 - 1)),
            o = t - i / 2,
            r = 0,
            c = 0,
            l = 0;
        return 0 <= n && n < 60 ? (r = i, c = a, l = 0) : 60 <= n && n < 120 ? (r = a, c = i, l = 0) : 120 <= n && n < 180 ? (r = 0, c = i, l = a) : 180 <= n && n < 240 ? (r = 0, c = a, l = i) : 240 <= n && n < 300 ? (r = a, c = 0, l = i) : 300 <= n && n < 360 && (r = i, c = 0, l = a), r = Math.round(255 * (r + o)), c = Math.round(255 * (c + o)), l = Math.round(255 * (l + o)), [r, c, l]
    }
    var e = document.getElementById("visualiser"),
        t = e.getContext("2d"),
        a = 0,
        o = {
            init: function(n) {
                e.width = window.innerWidth - 20, e.height = n.frequencyBinCount, e.style.height = "100vh", t.clearRect(20, 0, e.width, e.height), a = e.width
            },
            process: function(i) {
                var o = new Uint8Array(i.frequencyBinCount);
                i.getByteFrequencyData(o);
                for (var r = t.getImageData(a, 0, 1, e.height), c = 0; c < o.length; c++) {
                    for (var l = n(c / o.length * 360, 100, o[o.length - c] / 256 * 100), d = 0; d < 3; d++)
                        r.data[4 * c + d] = l[d];
                    r.data[4 * c + 3] = 222
                }
                t.putImageData(r, a, 0), a += 1, a %= e.width
            }
        };
    !function(n, e) {
        if ("undefined" == typeof document)
            return e;
        n = n || "";
        var t = document.head || document.getElementsByTagName("head")[0],
            i = document.createElement("style");
        i.type = "text/css", t.appendChild(i), i.styleSheet ? i.styleSheet.cssText = n : i.appendChild(document.createTextNode(n))
    }("\nbody {\n    margin: 0;\n    font-family: sans-serif;\n    width: 100%;\n    cursor: pointer;\n    background: black;\n    height: 100%;\n    height: moz-available;\n    height: webkit-fill-available;\n    height: fill-available;\n}\n\ncanvas {\n    z-index: 0;\n    width: 100%;\n    height: 100vh;\n}\n\ninput {\n    flex: 100%;\n    height: 50px;\n    background: transparent;\n    outline: none;\n    border: none;\n    border-bottom: 1px solid black;\n    font-size: 1rem;\n    color: black;\n}\n\nbutton {\n    position: absolute;\n    top: calc(50% - 25px);\n    left: calc(50% - 60px);\n    width: 120px;\n    height: 50px;\n    border: 1px solid black;\n    background: transparent;\n    font-size: .8rem;\n    color: black;\n    text-transform: uppercase;\n    outline: none;\n    cursor: pointer;\n}\n\nbutton:hover {\n    border: 2px solid white;\n    color: white;\n    font-size: .85rem;\n}\n\nbutton:disabled {\n    color: grey;\n}\n\n#key {\n    margin: 0;\n    top: 1vh;\n    position: absolute;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n    align-items: center;\n    color:#eee;\n    width: 20px;\n    background: black;\n    height: 98%;\n    height: moz-available;\n    height: webkit-fill-available;\n    height: fill-available;\n}", void 0), "serviceWorker" in navigator && navigator.serviceWorker.register("/sw.js");
    var r = document.getElementById("key"),
        c = {
            autoGainControl: !1,
            echoCancellation: !1,
            noiseSuppression: !1
        };
    document.getElementById("visualiser");
    navigator.mediaDevices.getUserMedia({
        audio: c,
        video: !1
    }).then(function(n) {
        var e = new (window.AudioContext || window.webkitAudioContext),
            t = e.createScriptProcessor(0, 1, 1),
            a = e.createAnalyser(),
            c = e.createMediaStreamSource(n);
        for (c.connect(t), c.connect(a), t.connect(e.destination), i = parseInt(e.sampleRate / 2e3) - 1; i > 0; i--) {
            var l = document.createElement("span");
            l.innerHTML = "" + i, r.appendChild(l)
        }
        o.init(a), t.onaudioprocess = function(n) {
            o.process(a), n.outputBuffer.getChannelData(0).forEach(function(n) {
                return 0
            })
        }
    }).catch(function(n) {
        return window.alert(n)
    })
}();



