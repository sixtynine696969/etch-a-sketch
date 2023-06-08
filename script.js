function populateGrid (gridSize, containerHeight) {
    for (let i = 0; i < (gridSize * gridSize); i++) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        // div.style.padding = `${containerHeight / (gridSize * 2)}px`;
        div.style.height = `${containerHeight / gridSize}px`;
        div.style.width = `${containerHeight / gridSize}px`;
        container.appendChild(div);
    }
}

function removeGridItems(gridContainer) {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(gridItem => {
        container.removeChild(gridItem);
    })
}

function random() {
    return Math.floor(Math.random() * 255) + 1;
}

function getNewRBGString(oldRGB) {
    // console.log(oldRGB);
    const numberArray = oldRGB.replace('rgb(', '').replace(')', '').split(', ');
    const red = +numberArray[0];
    const green = +numberArray[1];
    const blue = +numberArray[2];

    // return `rgb(${red - (255 / 10)}, ${green - (255 / 10)}, ${blue - (255 / 10)})`;
    return `rgb(${red - (red / 10)}, ${green - (green / 10)}, ${blue - (blue / 10)})`
}

function addListeners() {
    const divs = document.querySelectorAll('div');

    divs.forEach(div => {
        if (div.classList.value !== 'grid-item') return;

        div.addEventListener('mouseover', e => {
            let bgColor = e.target.style.backgroundColor;
            if (bgColor.startsWith('rgb')) {
                let newRGB = getNewRBGString(bgColor);
                e.target.style.backgroundColor = newRGB;
            } else {
                e.target.style.backgroundColor = `rgb(${random()}, ${random()}, ${random()})`;
            }
        })
    })
}

const container = document.querySelector('#container');
const containerHeight = container.clientHeight;

populateGrid(16, containerHeight);
addListeners();

const selectButton = document.querySelector('.select-btn')

selectButton.addEventListener('click', () => {

    let userInput = prompt("How many squeres per side do you want? (100 is max)", "16");
    if (userInput === null) return;
    
    userInput = +userInput;
    while (isNaN(userInput) || userInput > 100) {
        if (isNaN(userInput)) userInput = +prompt("Enter a valid number", "16");
        else if (userInput > 100) userInput = +prompt("Ayooo, chill out, 100 is the maximum!");
    } 
    
    removeGridItems(container);
    populateGrid(userInput, containerHeight);
    addListeners();
})