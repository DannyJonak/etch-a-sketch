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
    const gridSquares = document.querySelectorAll('.grid-box')

    gridSquares.forEach((square) => {
        square.addEventListener('mousedown', (event) => {
            square.style.backgroundColor = color;
        })
        square.addEventListener('mouseover', (event) => {
            if (event.buttons === 1) {
                event.preventDefault();
                square.style.backgroundColor = color;
            };
        })
    })
}

function clearGrid() {
    const grid = document.querySelector('.grid');
    while(grid.firstElementChild) {
        const curBox = grid.firstElementChild;
        grid.removeChild(curBox);
    }
}

let gridSize = 16;
const slider = document.querySelector('#grid-size-slider');
slider.onchange = function () {
                    gridSize = slider.value;
                    clearGrid();
                    buildGrid(gridSize);
                    setupHover();
                };

buildGrid(gridSize);
setupHover();