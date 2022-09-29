function buildGrid(sideLength = 16) {

    const grid = document.querySelector('.grid');
    grid.setAttribute('style', `grid-template-columns: repeat(${sideLength}, 1fr);
                        grid-template-rows: repeat(${sideLength}, 1fr);`);
    grid.setAttribute('draggable', 'false');

    for (let i = 0; i < sideLength * sideLength; i++) {
        const newBox = document.createElement('div');
        newBox.classList.add('grid-box');
        newBox.setAttribute('draggable', 'false');
        grid.appendChild(newBox);
    }
}

function setupHover(color = 'black') {
    const gridSquares = document.querySelectorAll('.grid-box, .grid-box-fill');

    gridSquares.forEach((square) => {
        square.addEventListener('mousedown', (event) => {
            square.setAttribute('class', 'grid-box-fill');
            square.style.backgroundColor = color;
            //square.style.border = 0;
        })
        square.addEventListener('mouseover', (event) => {
            if (event.buttons === 1) {
                event.preventDefault();
                square.setAttribute('class', 'grid-box-fill');
                square.style.backgroundColor = color;
                //square.style.border = 0;
            };
        })
    })
}

function removeHover() {
    const gridSquares = document.querySelectorAll('.grid-box, .grid-box-fill');

    gridSquares.forEach((square) => {
        square.addEventListener('mousedown', (event) => {
            square.setAttribute('class', 'grid-box');
            square.style.backgroundColor = 'transparent';
        })
        square.addEventListener('mouseover', (event) => {
            if (event.buttons === 1) {
                event.preventDefault();
                square.setAttribute('class', 'grid-box');
                square.style.backgroundColor = 'transparent';
            };
        })
    })
}

function removeGrid() {
    const grid = document.querySelector('.grid');
    while(grid.firstElementChild) {
        const curBox = grid.firstElementChild;
        grid.removeChild(curBox);
    }
}

function clearGrid() {
    removeGrid();
    buildGrid(gridSize);
    setupHover(penColor);
}

let gridSize = 16;
let penColor = 'black';
let eraserOn = false;

const slider = document.querySelector('#grid-size-slider');
const eraser = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear-button');
const colorPicker = document.querySelector('#pen-color');

slider.oninput = function () {
                    gridSize = slider.value;
                    sizeText = document.querySelector('.gridsize-display');
                    sizeText.textContent = `${slider.value} x ${slider.value}`;
                    removeGrid();
                    buildGrid(gridSize);
                    setupHover(penColor);
                };

clearBtn.onclick = () => {clearGrid()};

colorPicker.oninput = function () {
                        if (eraserOn) {eraser.classList.toggle('eraser-down'); eraserOn = !eraserOn}
                        penColor = colorPicker.value;
                        setupHover(penColor);
                    }

eraser.addEventListener('click', () => {
                                    eraser.classList.toggle('eraser-down');
                                    if (!eraserOn) {
                                        removeHover();
                                    } else {
                                        setupHover(penColor);
                                    }
                                    eraserOn = !eraserOn;
                                });

buildGrid();
setupHover();