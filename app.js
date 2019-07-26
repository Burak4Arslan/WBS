
var selectedElement='';
var oldSelectElement ='';
var elementToCut='';
var elementToCopy='';
let isAnyInputOpen = false;

const rightSideDiv1 = document.getElementById('rightSideDiv1');

addDoubleClickEvent(document.getElementById('projectNameDiv'));
// creatingColorSchema();

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

document.getElementById('addSiblingButton').addEventListener('click',()=>{

    if(oldSelectElement.id == "projectNameDiv") {
        
    }else if(oldSelectElement!='') {
        addComponent(oldSelectElement.parentElement.parentElement.parentElement);
    }else {
        
    }

});

window.addEventListener('keydown',(e)=> {

    
    if(e.keyCode==46) {
        if(oldSelectElement!='' && oldSelectElement.id!='projectNameDiv') {
            deleteComponent(oldSelectElement.parentElement);
        }
    } else if (e.keyCode==27 && elementToCut != '') {
        $(elementToCut).removeClass('cuttedComponent');
        elementToCut = '';
    }

})

function addComponent(parentComponent) {
    
    var childPlace = parentComponent.querySelector('.childComponentPlace');
    
    const newComponent = document.createElement('div');
    const newNameSpan = document.createElement('span');
    const newNameDiv = document.createElement('div');
    const newChildComponentPlace = document.createElement('div');

    newComponent.className = "component";
    newComponent.setAttribute('ondragover','allowDrop(event)');
    newNameDiv.className = "componentNameDiv"
    newNameDiv.setAttribute('draggable','true');
    newNameDiv.setAttribute('ondragstart','drag(event)');
    newNameDiv.setAttribute('ondrop','drop(event)');
    newNameSpan.className = "componentNameSpan nameSpan";
    newNameSpan.innerText = "New Component";
    newChildComponentPlace.className ="childComponentPlace normalComponentChildComponentPlace";

    if(childPlace.className.includes('dif')) {
        newNameDiv.style.backgroundColor = randomColorFunction();
    } else {
        const color = childPlace.parentElement.querySelector('.componentNameDiv').style.backgroundColor
        newNameDiv.style.backgroundColor = color;
    }

    if(childPlace.className.includes('dif')) {
        $(newComponent).insertBefore(rightSideDiv1);
    } else {
        childPlace.appendChild(newComponent);
    }
    
    newComponent.appendChild(newNameDiv);
    newNameDiv.appendChild(newNameSpan);
    newComponent.appendChild(newChildComponentPlace);

    addDoubleClickEvent(newNameDiv);

    if(parentComponent.className.includes('otherComponent')) {

        convertingToSbS();

    }

}


document.getElementById('deleteButton').addEventListener('click',()=>{

    if(oldSelectElement.id == "projectNameDiv") {
        
    }else if(oldSelectElement!='') {
        deleteComponent(oldSelectElement.parentElement);
    }else {
        
    }

})

function deleteComponent(itemToDelete) {
    var parentOfDeletedComponent;
    if(!(itemToDelete.parentElement.parentElement.className.includes('dif'))){
        parentOfDeletedComponent = itemToDelete.parentElement.parentElement;
    }

    $(itemToDelete).remove();
    oldSelectElement = parentOfDeletedComponent.querySelector('.componentNameDiv');
    $(oldSelectElement).addClass('selectedComponent')
    
    if(oldSelectElement.parentElement.className.includes('otherComponent')) {

        convertingToSbS();

    }
    
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
            
            $(oldSelectElement).removeClass('selectedComponent');
            oldSelectElement = '';

            if(e.keyCode==13 && newNameInput.value.trim()) {
                nameDiv.querySelector('span').innerText = newNameInput.value.trim();
                nameDiv.querySelector('span').style.display='initial';
                $(newNameInput).remove();
                isAnyInputOpen = false;
            } else if(e.keyCode==27) {
                document.querySelector('.inputForNewName').parentElement.querySelector('span').style.display='initial';
                $(document.querySelector('.inputForNewName')).remove();
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

document.getElementById('cutButton').addEventListener('click',()=> {

    cutElement();

})

function cutElement() {

    if(oldSelectElement.id == "projectNameDiv") {
        
    }else if(oldSelectElement!='') {
        if(elementToCut == '') {
            elementToCut = oldSelectElement.parentElement;
            $(elementToCut).addClass('cuttedComponent');
            $(oldSelectElement).removeClass('selectedComponent');
            oldSelectElement = '';
        } else {
            $(elementToCut).removeClass('cuttedComponent');
            elementToCut = oldSelectElement.parentElement;
            $(elementToCut).addClass('cuttedComponent');
            $(oldSelectElement).removeClass('selectedComponent');
            oldSelectElement = '';
        }
        if(elementToCopy != '') {
            $(elementToCopy).removeClass('copiedComponent');
            elementToCopy='';
        }
    }else {
        
    }

}

document.getElementById('copyButton').addEventListener('click',()=>{

    copyElement();

})

function copyElement() {

    if(oldSelectElement.id == "projectNameDiv") {
        
    }else if(oldSelectElement!='') {
        if(elementToCopy == '') {
            elementToCopy = oldSelectElement.parentElement;
            $(elementToCopy).addClass('copiedComponent');
            $(oldSelectElement).removeClass('selectedComponent');
            oldSelectElement = '';
        } else {
            $(elementToCopy).removeClass('copiedComponent');
            elementToCopy = oldSelectElement.parentElement;
            $(elementToCopy).addClass('copiedComponent');
            $(oldSelectElement).removeClass('selectedComponent');
            oldSelectElement = '';
        }
        if(elementToCut!='') {
            $(elementToCut).removeClass('cuttedComponent');
            elementToCut='';
        }
    }else {
        
    }

}

document.getElementById('pasteButton').addEventListener('click',()=>{

    pasteElement();

})

function pasteElement() {

    if(elementToCut!='') {
        if(oldSelectElement!='' && elementToCut != oldSelectElement) {
            
            if(oldSelectElement.id == 'projectNameDiv') {
                document.querySelector('.dif').appendChild(elementToCut);
            }else {
                try {
                    oldSelectElement.parentElement.querySelector('.childComponentPlace').appendChild(elementToCut);
                } catch(e) {
                    alert('Cannot paste Cutted Component to  Cutted Component')
                }
            }
            $(elementToCut).removeClass('cuttedComponent');
            elementToCut = '';

        }
    } else if(elementToCopy != '') {

        if(oldSelectElement!='') {
            $(elementToCopy).removeClass('copiedComponent');
            var clonedElement = elementToCopy.cloneNode(true);
            
            if(oldSelectElement.id == 'projectNameDiv') {
                document.querySelector('.dif').appendChild(clonedElement);
            }else {
                oldSelectElement.parentElement.querySelector('.childComponentPlace').appendChild(clonedElement);
            }
            
            elementToCopy = '';

        }

    }

}

function addDoubleClickEvent(element){

    
    element.addEventListener('dblclick',()=>{
        
        renameComponent(element);

    });

}


document.getElementById('otherComponentButton').addEventListener('click',()=>{

    convertingToSbS();
    
    
});

function convertingToSbS() {

    const toSbS = oldSelectElement.parentElement;
    $(toSbS).addClass('otherComponent');
    $(toSbS.querySelector('.childComponentPlace'))
    .removeClass('normalComponentChildComponentPlace');
    $(toSbS.querySelector('.childComponentPlace'))
    .addClass('otherComponentChildComponentPlace');

    if(!toSbS.querySelector('canvas')) {
        const childCount = 
        $($(oldSelectElement.parentElement.querySelector('.childComponentPlace'))[0])[0].childElementCount;
        if(childCount<2) {
            return;
        }

        const otherComponentCanvas = document.createElement('canvas');
        var count = $(toSbS).length;
        var canvasWidth = (count*100);
        canvasWidth += 'px';
        $(otherComponentCanvas).width(toSbS.offsetWidth-50);
        $(otherComponentCanvas).height(1);
        otherComponentCanvas.style.backgroundColor = '#222';

        $(otherComponentCanvas).insertBefore(toSbS.querySelector('.otherComponentChildComponentPlace'));

    } else {
        $(toSbS.querySelector('canvas')).remove();
        const childCount = 
        $($(oldSelectElement.parentElement.querySelector('.childComponentPlace'))[0])[0].childElementCount;
        if(childCount<2) {
            return;
        }

        const otherComponentCanvas = document.createElement('canvas');
        var count = $(toSbS).length;
        var canvasWidth = (count*100);
        canvasWidth += 'px';    console.log(canvasWidth);
        $(otherComponentCanvas).width(toSbS.offsetWidth-50);
        $(otherComponentCanvas).height(1);
        otherComponentCanvas.style.backgroundColor = '#222';

        $(otherComponentCanvas).insertBefore(toSbS.querySelector('.otherComponentChildComponentPlace'));


    }
    

}

document.getElementById('normalComponentButton').addEventListener('click',()=>{

    $(oldSelectElement.parentElement).removeClass('otherComponent');
    $(oldSelectElement.parentElement.querySelector('.childComponentPlace'))
    .removeClass('otherComponentChildComponentPlace');
    $(oldSelectElement.parentElement.querySelector('.childComponentPlace'))
    .addClass('normalComponentChildComponentPlace');
    if(oldSelectElement.parentElement.querySelector('canvas')) {

        $(oldSelectElement.parentElement.querySelector('canvas')).remove();

    }

});


function randomColorFunction() {

    let colorString = '#';

    let redColor = Math.floor((Math.random()*255)).toString(16);
    let greenColor = Math.floor((Math.random()*255)).toString(16);
    let blueColor = Math.floor((Math.random()*255)).toString(16);
    colorString += redColor + greenColor +  blueColor;
    return colorString;

}


function allowDrop(ev) {
    // console.log(ev.target);
    ev.preventDefault();
  }
  
function drag(ev) { console.log(ev.target.id);
        $(oldSelectElement).removeClass('selectedComponent');
        oldSelectElement = ev.target.parentElement;
}
  
function drop(ev) {

    var newParent = ev.target;
    if(newParent.id=='projectDiv' || newParent.id=='projectNameDiv' || newParent.id=='projectNameSpan') {
        document.querySelector('.dif').appendChild(oldSelectElement);
        return;
    }

    if(newParent.className.includes('componentNameSpan')) {
        newParent = newParent.parentElement; 
    }
    try {
        newParent.parentElement.querySelector('.childComponentPlace').appendChild(oldSelectElement);
    } catch(e) {

    }
    // oldSelectElement.querySelector('.componentNameDiv').style.backgroundColor = newParent.style.backgroundColor;

    oldSelectElement='';
    ev.preventDefault();

}


function creatingColorSchema() {

    const colorS1 = document.getElementById('colorS1');
    const colorS2 = document.getElementById('colorS2');
    const colorS3 = document.getElementById('colorS3');
    let a = 30;
    while(a>20) {

        const newColorDiv = document.createElement('div');
        $(newColorDiv).addClass('colors');
        newColorDiv.style.backgroundColor = randomColorFunction();
        colorS1.appendChild(newColorDiv);
        a--;
        console.log('a');
    }
    while(a>10) {

        const newColorDiv = document.createElement('div');
        $(newColorDiv).addClass('colors');
        newColorDiv.style.backgroundColor = randomColorFunction();
        colorS2.appendChild(newColorDiv);
        a--;
        console.log('a');
    }
    while(a>0) {

        const newColorDiv = document.createElement('div');
        $(newColorDiv).addClass('colors');
        newColorDiv.style.backgroundColor = randomColorFunction();
        colorS3.appendChild(newColorDiv);
        a--;
        console.log('a');
    }

}
