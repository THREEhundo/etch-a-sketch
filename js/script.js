const board = document.querySelector('#board');
const gridContainer = document.querySelector('#grid');
const controls = document.querySelector('#controls');
const reset = document.querySelector('#clear');
const newBoard = document.querySelector('#new-board');
const slider = document.querySelector('#new-size');
let sliderLabel = document.querySelector('#size-label');
let lengthAndWidth = 12;
let rgbA = [0, 0, 0, 0];
let squares = [];

slider.value = lengthAndWidth;

reset.addEventListener('click', clearGrid);

slider.addEventListener('input', updateValue);
sliderLabel.innerHTML = `${slider.value} Rows & Columns`;

newBoard.addEventListener('click', newGrid);

createGrid(lengthAndWidth);

// Create Board
function createGrid(lengthAndWidth) {
  // Create squares with grid
  gridContainer.style.gridTemplateRows = `repeat(${lengthAndWidth}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${lengthAndWidth}, 1fr)`;

  let totalSquares = lengthAndWidth * lengthAndWidth;
  for (var i = 0; i < totalSquares; i++) {
    squares[i] = document.createElement('div');
    squares[i].classList.add('square');
    squares[i].dataset.darkness = 0;
    squares[i].style = 'background-color: rgba(0, 0, 0, 0)';
    squares[i].addEventListener('mouseover', shadeChanger);
    gridContainer.appendChild(squares[i]);
  }
}

// Square Adjustor using range slider
function updateValue(e) {
  sliderLabel.innerHTML = e.target.value + ' Rows & Columns';
}

function clearGrid() {
  board.classList.add('animate');
  board.addEventListener('animationend', animationEndCallback);
  squares.forEach((item) => {
    item.style = 'background-color: rgba(0, 0, 0, 0)';
    item.dataset.darkness = 0;
    item.removeEventListener('mouseover', shadeChanger);
    item.addEventListener('mouseover', shadeChanger);
  });
}

animationEndCallback = () => {
  board.removeEventListener('animationend', animationEndCallback);
  board.classList.remove('animate');
}

function newGrid() {
  clearGrid();
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  // add new grid
  createGrid(slider.value);
}

// Change Shade Value
function shadeChanger(e) {
  rgbA = darken(e);
  e.target.style = `background-color: rgba(${rgbA})`
}
// Darken Squares
function darken(e) {
  let currentShade = e.target.style.backgroundColor;
  let rgbaString = (currentShade.charAt(3) == 'a') ? currentShade.slice(5, -1) : currentShade.slice(4, -1);
  console.log(currentShade.charAt(0), currentShade.charAt(1), currentShade.charAt(2), currentShade.charAt(3));
  let rgbaArray = rgbaString.split(',')
  console.log(`rgbaArray: ` + rgbaArray);
  let red = rgbaArray[0];
  let green = rgbaArray[1];
  let blue = rgbaArray[2];
  let alpha = rgbaArray[3];
  console.log(`alpha: ` + alpha);
  let currentDarkness = e.target.dataset.darkness;
  console.log(`darkness: ` + currentDarkness);
  if (currentDarkness > 9) {
    console.log(`over 9`);
    return [0, 0, 0, 1];
  }
  let newAlpha = alphaIncrease(alpha, currentDarkness);
  console.log(`New Alpha: ` + newAlpha);
  currentDarkness++;
  console.log(`Current Darkness: ` + currentDarkness);
  e.target.dataset.darkness = currentDarkness;
  return [red, green, blue, newAlpha];
}

function alphaIncrease(alpha, step) {
  let incrementor;
  let newDarknessValue;
  incrementor = (1 - alpha) / (10 - step);
  console.log(`incrementor: ` + incrementor);
  newDarknessValue = +alpha + incrementor;
  console.log(`New Darkness Value: ` + newDarknessValue);
  return newDarknessValue;
}