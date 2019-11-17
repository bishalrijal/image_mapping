var image_x, image_y, image_len, image_wid

// function showTutorial(name) {
//    document.myform.stage.value = name
// }
image = document.getElementById('map-image');
input = document.getElementById('cordinate')
image_x = image.getBoundingClientRect().x
image_y = image.getBoundingClientRect().y
console.log(image_y)
image_wid = image.getBoundingClientRect().width
image_height = image.getBoundingClientRect().height
viewBox = `${parseInt(image_x)} ${parseInt(image_y)} ${parseInt(image_height)} ${parseInt(image_wid)}`
svgDom = document.getElementById('svg')
class Circle {
    constructor(count = 0, x_cor = 0, y_cor = 0, element = '') {
        this.count = count
        this.x_cor = x_cor
        this.y_cor = y_cor,
            this.element = `
               <circle cx="${ this.x_cor + 8}" cy="${this.y_cor + 64}" r="2" stroke="black" stroke-width="3 display:block"  />
                  ` }
}
function makeRec(circles) {
    let x , y
    console.log(circles)
    x = Math.min(circles[0].x_cor,circles[1].x_cor)
    y = Math.min(circles[0].y_cor,circles[1].y_cor)
    console.log(y)
    width =Math.abs(circles[0].x_cor-circles[1].x_cor)
    height =  Math.abs(circles[0].y_cor-circles[1].y_cor)
    return `
    <rect x="${x+8}" y="${y+64}" width="${width}" height="${height}"
    style="fill:blue;stroke:black;stroke-width:2;fill-opacity:0.1;stroke-opacity:0.9" />
    `
}

var click = 0
var circles = []
svgDom.addEventListener('click', e => {
    if (click < 2) {
        var x_cor = e.clientX - image.getBoundingClientRect().x;
        var y_cor = e.clientY - image.getBoundingClientRect().y
        var cir = new Circle(click, x_cor, y_cor)
        circles.push(cir)
        console.log(cir)
        svgDom.insertAdjacentHTML('beforeend', cir.element)
        input.value = `x:${x_cor.toFixed(2)}, y: ${y_cor.toFixed(2)}`
        click += 1
    }
    if(click === 2) {
        rec = makeRec(circles)
        svgDom.insertAdjacentHTML('beforeend', rec)

    }
    
})
