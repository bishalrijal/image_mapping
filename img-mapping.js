var image_x, image_y, image_len, image_wid
image = document.getElementById('map-image');
input = document.getElementById('cordinate')
show_map_button = document.getElementById('show-map-button')
svgDom = document.getElementById('svg')
add_new_button = document.getElementById('add-new-button')
map_id = document.getElementById('mapping')
class Circle {
    constructor(count = 0, x_cor = 0, y_cor = 0, element = '') {
        this.count = count
        this.x_cor = x_cor
        this.y_cor = y_cor,
            this.element = `
               <circle cx="${ this.x_cor }" cy="${this.y_cor }" r="2" stroke="black" stroke-width="3 display:block"  />
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
class RectangleMap {
    constructor (x1,y1,x2,y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}
function makeRec(circles) {
    x = Math.min(circles[0].x_cor,circles[1].x_cor)
    y = Math.min(circles[0].y_cor,circles[1].y_cor)
    width =Math.abs(circles[0].x_cor-circles[1].x_cor)
    height =  Math.abs(circles[0].y_cor-circles[1].y_cor)
    element =  `
    <rect x="${x}" y="${y}" width="${width}" height="${height}"
    style="fill:blue;stroke:black;stroke-width:2;fill-opacity:0.1;stroke-opacity:0.9" />
    `
    return new Rectangle(x,y,width,height,element)
}

var click = 0
var circles = []
var rectangles = []
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
        let x1,x2,y1,y2;
        console.log(rec.x)
        x1= rec.x
        y1 =  rec.y
        x2 = (x1+rec.width)
        y2 =  y1+rec.height
        rect_map = new RectangleMap(x1,y1,x2,y2)
        rectangles.push(rect_map)
        svgDom.insertAdjacentHTML('beforeend', rec.element)
        click += 1   }
    
});

show_map_button.addEventListener('click', (e,rects = rectangles) => {
    if(click === 3){
        svgDom.parentNode.removeChild(svgDom)
        map_inner_html = ''
        rects.forEach(element => {   
        map_inner_html+=
       ` <area shape="rect" coords="${parseInt(element.x1)},${parseInt(element.y1)},${parseInt(element.x2)}, ${parseInt(element.y2)}" alt="Computer" href="https://www.image-map.net/">
      `    
        });
        image.insertAdjacentHTML('afterend',
        `<map id = "mapping" name="workmap">
        ${map_inner_html}
      </map>
      `)  

        
        
    }
})
add_new_button.addEventListener('click',()=>{
    click = 0
    circles = []
}
)