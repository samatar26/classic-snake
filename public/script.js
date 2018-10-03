const canvas = document.querySelector('canvas')
const scoreEl = document.querySelector('span')
const ctx = canvas.getContext('2d')

let direction = null
let levelUp = false
let stepSize = 14
let snake = Array.from(new Array(4), (num, index) => ({
  x: index * stepSize,
  y: 0,
}))
let food = {
  x: Math.floor(Math.random() * (canvas.width / stepSize)) * stepSize,
  y: Math.floor(Math.random() * (canvas.width / stepSize)) * stepSize,
}
let score = 0
let speed = 50

function drawSnake(snake) {
  ctx.beginPath()
  ctx.strokeStyle = 'black'
  ctx.lineWidth = '2'
  snake.forEach(({ x, y }) => {
    ctx.rect(x, y, stepSize, stepSize)
  })

  ctx.rect(food.x, food.y, stepSize, stepSize)
  ctx.stroke()
}

function moveSnake() {
  const head = snake[snake.length - 1]

  if (head.x === food.x && head.y === food.y) {
    levelUp = true
    score++
    scoreEl.textContent = score
    food.x = Math.floor(Math.random() * (canvas.width / stepSize)) * stepSize
    food.y = Math.floor(Math.random() * (canvas.width / stepSize)) * stepSize
  }

  switch (direction) {
    case 37:
      head.direction !== 'right' ? moveLeft() : moveRight()
      break

    case 38:
      head.direction != 'down' ? moveUp() : moveDown()
      break

    case 39:
      head.direction != 'left' ? moveRight() : moveLeft()
      break

    case 40:
      head.direction != 'up' ? moveDown() : moveUp()
      break

    default:
      previousDirection()
      break
  }

  clearCanvas()
  drawSnake(snake)
}

const redrawSnake = (x, y, direction) => () => {
  const tail = { ...snake[snake.length - 1] }
  previousDirection = directions[direction]
  tail.direction = direction

  tail.x =
    tail.x + x >= canvas.width
      ? 0
      : tail.x + x < 0
        ? canvas.width - stepSize
        : tail.x + x
  tail.y =
    tail.y + y >= canvas.width
      ? 0
      : tail.y + y < 0
        ? canvas.width - stepSize
        : tail.y + y

  if (snakeTouching(tail)) return clearInterval(game)

  levelUp ? (levelUp = null) : snake.shift()
  snake.push(tail)
}

const moveLeft = redrawSnake(-stepSize, 0, 'left')
const moveRight = redrawSnake(stepSize, 0, 'right')
const moveUp = redrawSnake(0, -stepSize, 'up')
const moveDown = redrawSnake(0, stepSize, 'down')

const directions = {
  left: moveLeft,
  up: moveUp,
  right: moveRight,
  down: moveDown,
}

let previousDirection = directions['right']

const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

window.addEventListener('keydown', e => (direction = e.keyCode))

const snakeTouching = head =>
  snake.some(block => block.x === head.x && block.y === head.y)

let game = setInterval(() => {
  moveSnake()
}, speed)
