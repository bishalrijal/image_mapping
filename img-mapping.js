var image_x, image_y, image_len, image_wid

// function showTutorial(name) {
//    document.myform.stage.value = name
// }
image = document.getElementById('map-image');
input = document.getElementById('cordinate')
show_map_button = document.getElementById('show-map-button')
svgDom = document.getElementById('svg')

// const fs = require('fs')
image_x = image.getBoundingClientRect().x
image_y = image.getBoundingClientRect().y
console.log(image_y)
image_wid = image.getBoundingClientRect().width
image_height = image.getBoundingClientRect().height
viewBox = `${parseInt(image_x)} ${parseInt(image_y)} ${parseInt(image_height)} ${parseInt(image_wid)}`
class Circle {
    constructor(count = 0, x_cor = 0, y_cor = 0, element = '') {
        this.count = count
        this.x_cor = x_cor
        this.y_cor = y_cor,
            this.element = `
               <circle cx="${ this.x_cor + 8}" cy="${this.y_cor + 64}" r="2" stroke="black" stroke-width="3 display:block"  />
                  ` }
}
class Rectangle {
    constructor(x,y,width,height,element){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.element = element;
    }
}
function makeRec(circles) {
    x = Math.min(circles[0].x_cor,circles[1].x_cor)
    y = Math.min(circles[0].y_cor,circles[1].y_cor)
    width =Math.abs(circles[0].x_cor-circles[1].x_cor)
    height =  Math.abs(circles[0].y_cor-circles[1].y_cor)
    element =  `
    <rect x="${x+8}" y="${y+64}" width="${width}" height="${height}"
    style="fill:blue;stroke:black;stroke-width:2;fill-opacity:0.1;stroke-opacity:0.9" />
    `
    return new Rectangle(x,y,width,height,element)
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
        svgDom.insertAdjacentHTML('beforeend', rec.element)
        click += 1   }
    
});

show_map_button.addEventListener('click', (e,rec = makeRec(circles)) => {
    let x1,x2,y1,y2;
    console.log(rec.x)
    x1= rec.x
    y1 =  rec.y
    x2 = (x1+rec.width)
    y2 =  y1+rec.height
    console.log(x1)
    svgDom.parentNode.removeChild(svgDom)
    image.insertAdjacentHTML('afterend',
    `<map name="workmap">
    <area shape="rect" coords="${parseInt(x1)},${parseInt(y1)},${parseInt(x2)}, ${parseInt(y2)}" alt="Computer" href="https://www.image-map.net/">
  </map>
  `)
})
