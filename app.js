
var selectedElement='';
var oldSelectElement ='';
let isAnyInputOpen = false;

addDoubleClickEvent(document.getElementById('projectNameDiv'));

window.addEventListener('click',(e)=> {

    selectedElement = e.target;
    
    while(!(selectedElement.className.includes('myBody'))) {
        if((selectedElement.className.includes('NameDiv'))) {
            break;
        }else if(selectedElement.className.includes('selections')){
            break;
        } else {
            selectedElement = selectedElement.parentElement;
        }
    }
    if(selectedElement.className.includes('myBody')) {
        $(oldSelectElement).removeClass('selectedComponent');
        oldSelectElement='';
        if(document.querySelector('.inputForNewName')) {
            document.querySelector('.inputForNewName').parentElement.querySelector('span').style.display='initial';
            deleteComponent(document.querySelector('.inputForNewName'));
            isAnyInputOpen = false;
        }
    }else if(selectedElement.className.includes('selections')){
        
    } else {
        $(oldSelectElement).removeClass('selectedComponent');
        if(document.querySelector('.inputForNewName') 
        && document.querySelector('.inputForNewName').parentElement!= oldSelectElement) {
            document.querySelector('.inputForNewName').parentElement.querySelector('span').style.display='initial';
            deleteComponent(document.querySelector('.inputForNewName'));
            isAnyInputOpen = false;
        }
        $(selectedElement).addClass('selectedComponent');
        oldSelectElement=selectedElement;
    }
    // console.log(oldSelectElement);
})


document.getElementById('addChildButton').addEventListener('click',()=>{
    
    if(oldSelectElement.id == "projectNameDiv") {
        addComponent(document.getElementById('mainComponentPlace'))
    }else if(oldSelectElement!='') {
        addComponent(oldSelectElement.parentElement);
    }else {
        addComponent(document.getElementById('mainComponentPlace'))
    }
});


function addComponent(parentComponent) {
    
    var childPlace = parentComponent.querySelector('.childComponentPlace');
    // console.log(childPlace);
    const newComponent = document.createElement('div');
    const newNameSpan = document.createElement('span');
    const newNameDiv = document.createElement('div');
    const newChildComponentPlace = document.createElement('div');

    newComponent.className = "component";
    newNameDiv.className = "componentNameDiv"
    newNameDiv.setAttribute('draggable','true');
    newNameSpan.className = "componentNameSpan nameSpan";
    newNameSpan.innerText = "New Component";
    newChildComponentPlace.className ="childComponentPlace normalComponentChildComponentPlace";
    if(childPlace.className.includes('dif')) {

        newNameDiv.style.backgroundColor = randomColorFunction();

    } else {
        const color = childPlace.parentElement.querySelector('.componentNameDiv').style.backgroundColor
        newNameDiv.style.backgroundColor = color;
    }

    childPlace.appendChild(newComponent);
    newComponent.appendChild(newNameDiv);
    newNameDiv.appendChild(newNameSpan);
    newComponent.appendChild(newChildComponentPlace);

    addDoubleClickEvent(newNameDiv);

}


document.getElementById('deleteButton').addEventListener('click',()=>{

    if(oldSelectElement.id == "projectNameDiv") {
        
    }else if(oldSelectElement!='') {
        deleteComponent(oldSelectElement.parentElement);
    }else {
        
    }

})

function deleteComponent(itemToDelete) {

    $(itemToDelete).remove();

}

document.getElementById('renameButton').addEventListener('click',()=> {

    if(oldSelectElement.id == "projectNameDiv") {
        renameComponent(oldSelectElement);
    }else if(oldSelectElement!='') {
        console.log(oldSelectElement);
        renameComponent(oldSelectElement);
    }else {
        
    }

})

function renameComponent(nameDiv) {

    if(!isAnyInputOpen) {
        const newNameInput = document.createElement('input');
        nameDiv.querySelector('span').style.display='none';

        newNameInput.setAttribute('type','text');
        newNameInput.className= 'inputForNewName';
        
        newNameInput.addEventListener('keydown',(e)=> {
            
            if(e.keyCode==13) {
                nameDiv.querySelector('span').innerText = newNameInput.value;
                nameDiv.querySelector('span').style.display='initial';
                deleteComponent(newNameInput);
                isAnyInputOpen = false;
            } else if(e.keyCode==27) {
                document.querySelector('.inputForNewName').parentElement.querySelector('span').style.display='initial';
                deleteComponent(document.querySelector('.inputForNewName'));
                isAnyInputOpen = false;
            }

        })
        isAnyInputOpen = true;
        nameDiv.appendChild(newNameInput);
        newNameInput.focus();
    } else {
        document.querySelector('.inputForNewName').parentElement.querySelector('span').style.display='initial';
        deleteComponent(document.querySelector('.inputForNewName'));
        isAnyInputOpen = false;
        renameComponent(nameDiv);
    }

}


function addDoubleClickEvent(element){

    
    element.addEventListener('dblclick',()=>{
        console.log(element);
        renameComponent(element);

    });

}


document.getElementById('otherComponentButton').addEventListener('click',()=>{

    const toSbS = oldSelectElement.parentElement;
    $(toSbS).addClass('otherComponent');
    $(toSbS.querySelector('.childComponentPlace'))
    .removeClass('normalComponentChildComponentPlace');
    $(toSbS.querySelector('.childComponentPlace'))
    .addClass('otherComponentChildComponentPlace');
    
});

document.getElementById('normalComponentButton').addEventListener('click',()=>{

    $(oldSelectElement.parentElement).removeClass('otherComponent');
    $(oldSelectElement.parentElement.querySelector('.childComponentPlace'))
    .removeClass('otherComponentChildComponentPlace');
    $(oldSelectElement.parentElement.querySelector('.childComponentPlace'))
    .addClass('normalComponentChildComponentPlace');

});


function randomColorFunction() {

    let colorString = '#';

    let redColor = Math.floor((Math.random()*255)).toString(16);
    let greenColor = Math.floor((Math.random()*255)).toString(16);
    let blueColor = Math.floor((Math.random()*255)).toString(16);
    colorString += redColor + greenColor +  blueColor;
    return colorString;

}