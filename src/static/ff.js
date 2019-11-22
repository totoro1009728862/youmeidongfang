;(function(a, b) {
    function f() {
        b.body ? (b.body.style.fontSize = 12 * g + 'px') : b.addEventListener('DOMContentLoaded', f)
    }
    function d() {
        c.style.fontSize = Math.min(64, c.clientWidth / 10) + 'px'
    }
    var c = b.documentElement,
        g = a.devicePixelRatio || 1
    f()
    d()
    a.addEventListener('resize', d)
    a.addEventListener('pageshow', function(a) {
        a.persisted && d()
    })
    if (2 <= g) {
        a = b.createElement('body')
        var e = b.createElement('div')
        e.style.border = '.5px solid transparent'
        a.appendChild(e)
        c.appendChild(a)
        1 === e.offsetHeight && c.classList.add('hairlines')
        c.removeChild(a)
    }
})(window, document)
