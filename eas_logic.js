function buildGrid() {
    const sideLength = 16;
    const grid = document.querySelector('.grid');

    for (let i = 0; i < sideLength * sideLength; i++) {
        const newBox = document.createElement('div');
        newBox.classList.add('grid-box');
        grid.appendChild(newBox);
    }
}

