function t() { window.addEventListener("resize", r, !1), r() }
function e() {
    var t = Math.floor(s.height / 4), e = Math.floor(2 * t),
        n = Math.floor(0 * Math.random()) + 1, i = Math.floor(Math.random() * e + t) + 1;
    this.x = n, this.y = i, this.vx = 5 * Math.random() - 2, this.vy = 2 * Math.random() - 1, this.gravity = 0, c++, l[c] = this,
    this.id = c, this.size = 6 * Math.random() - 2, this.color = h, this.color2 = particleColor2, this.color3 = particleColor3,
    this.color_selector = 150 * Math.random() - 1
}
function n()
{
    setInterval(function () {
        a.fillStyle = "#111", a.fillRect(0, 0, s.width, s.height);
        for (var t = 0; u > t; t++) new e; for (var t in l) l[t].draw()
    }, 35)
} function i() { a.fillRect(0, 0, s.width, s.height) }
function r() { s.width = window.innerWidth, s.height = window.innerHeight, i() }
var s = document.getElementById("canvas"), a = s.getContext("2d"),
    l = {}, c = 0, u = .1, h = "#00bef7"; particleColor2 = "#00bef7",
    particleColor3 = "#1b103a", t(), e.prototype.draw = function () {
        this.x += this.vx, this.y += this.vy, this.vy += this.gravity,
        (this.x > s.width || this.y > s.height) && delete l[this.id],
        a.fillStyle = this.color_selector < 30 && this.color_selector > 10 ? this.color2 : this.color_selector < 10 ? this.color3 : this.color,
        a.fillRect(this.x, this.y, this.size, this.size)
    }, n(), setTimeout(function () { }, 500);