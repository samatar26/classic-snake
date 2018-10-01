// First Draw the snake

const canvas = document.querySelector('canvas')
const scoreEl = document.querySelector('span')
const ctx = canvas.getContext('2d')
let direction = null
let snake = [
  { x: 0, y: 0 },
  { x: 10, y: 0 },
  { x: 20, y: 0 },
  { x: 30, y: 0, direction: null },
]
let point = { x: 10, y: 10 }
let stepSize = 10
let score = 0
let speed = 80

function drawSnake(snake) {
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.lineWidth = '2'
  snake.forEach(({ x, y }) => {
    ctx.rect(x, y, 10, 10)
    ctx.stroke()
  })

  createFood()
}

// Second move the snake forward

function moveSnake() {
  const head = snake[snake.length - 1]
  // const tail = head
  // snake.shift()

  if (head.x === point.x && head.y === point.y) {
    score++
    point.x = Math.floor(Math.random() * 30) * stepSize
    point.y = Math.floor(Math.random() * 30) * stepSize
    scoreEl.textContent = score
  }

  switch (direction) {
    case 37:
      if (head.direction !== 'right')
        redrawSnake(head['x'] - stepSize, head['y'], 'left')
      else redrawSnake(head['x'] + stepSize, head['y'], 'right')

      break

    case 38:
      if (head.direction != 'down')
        redrawSnake(head['x'], head['y'] - stepSize, 'up')
      else redrawSnake(head['x'], head['y'] + stepSize, 'down')

      break

    case 39:
      if (head.direction != 'left')
        redrawSnake(head['x'] + stepSize, head['y'], 'right')
      else redrawSnake(head['x'] - stepSize, head['y'], 'left')

      break

    case 40:
      if (head.direction != 'up')
        redrawSnake(head['x'], head['y'] + stepSize, 'down')
      else redrawSnake(head['x'], head['y'] - stepSize, 'up')
      break

    default:
      redrawSnake(head['x'] + stepSize, head['y'], 'right')
      break
  }
  clearCanvas()
  //Remove tail and append to the end

  drawSnake(snake)
}

function redrawSnake(x, y, direction) {
  const tail = snake.shift()
  tail.direction = direction
  tail.x = x
  tail.y = y
  snake.push(tail)
}

function clearCanvas() {
  return ctx.clearRect(0, 0, canvas.width, canvas.height)
}

//Third Respond to user input
window.addEventListener('keydown', e => (direction = e.keyCode))

//Fourth draw Food
function createFood() {
  ctx.rect(point.x, point.y, 10, 10)
  ctx.stroke()
}

let startGame = setInterval(() => {
  moveSnake()
}, speed)
