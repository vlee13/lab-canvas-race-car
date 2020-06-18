
document.getElementById('start-button').onclick = () => {
  startGame();
};



function startGame() {}



let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')


ctx.fillStyle = 'green'
ctx.fillRect(10,10,1000,1000)


let carImage = new Image() 
carImage.src = '../images/car.png'
carImage.onload = function(e){
  ctx.drawImage(carImage,100,100,40,100)
}

let carObj = {

}


