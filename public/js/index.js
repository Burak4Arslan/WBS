
const myDiv = document.getElementById('randomTipDiv');
const mySpan = document.getElementById('randomTipSpan');

var previousNumber = -1;

randomTip();

document.getElementById('randomTipButton').addEventListener('click',()=> {

    randomTip();

})


function randomTip() {

    let randomTipNumber = Math.floor(Math.random()*10) + 1;
    while(randomTipNumber == previousNumber) {
        randomTipNumber = Math.floor(Math.random()*10) + 1;
    }
    previousNumber = randomTipNumber;
    switch(randomTipNumber) {

        case 1: 
        mySpan.innerText = 'An indicator arrow will show you where component will be placed while you are dragging'+
        ' components';
        break;
        case 2: 
        mySpan.innerText = 'Add Child Button, will add a child to selected Component';
        break;
        case 3: 
        mySpan.innerText = 'After Selecting a component use Copy Style Button to copy it\'s Background Color and then' +
        ' select another component to change newly selected Component\'s Background Color';
        break;
        case 4: 
        mySpan.innerText = 'You can use both Delete Button or Delete Key from keyboard to delete selected Component';
        break;
        case 5: 
        mySpan.innerText = 'You can Double Click on an Component to create a New Name Input to Change it\'s Name';
        break;
        case 6: 
        mySpan.innerText = 'Help Page has some useful information';
        break;
        case 7: 
        mySpan.innerText = 'Use New Page Button to clear screen and begin a new WBS';
        break;
        case 8: 
        mySpan.innerText = 'Use TaB and SbS buttons to change a Component\'s children\'s sequence';
        break;
        case 9: 
        mySpan.innerText = 'Use Open Color Picker Button to open Color Picker where you can insert color number'+
        ' and copy it\'s Background Color just by clicking it';
        break;
        case 10: 
        mySpan.innerText = 'Contact with burak4arslan@gmail.com for suggestions';
        break;


    }

}
