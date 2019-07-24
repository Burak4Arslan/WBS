
var selectedElement='';
var oldSelectElement ='';

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
    }else if(selectedElement.className.includes('selections')){
        
    } else {
        $(oldSelectElement).removeClass('selectedComponent');
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
    console.log(parentComponent);
    var childPlace = parentComponent.querySelector('.childComponentPlace');
    // console.log(childPlace);
    const newComponent = document.createElement('div');
    const newNameSpan = document.createElement('span');
    const newNameDiv = document.createElement('div');
    const newChildComponentPlace = document.createElement('div');

    newComponent.className = "component";
    newNameDiv.className = "componentNameDiv"
    newNameSpan.className = "componentNameSpan nameSpan";
    newNameSpan.innerText = "New Component"
    newChildComponentPlace.className ="childComponentPlace normalComponentChildComponentPlace"

    childPlace.appendChild(newComponent);
    newComponent.appendChild(newNameDiv);
    newNameDiv.appendChild(newNameSpan);
    newComponent.appendChild(newChildComponentPlace);

    console.log(newComponent);
    console.log(newComponent.parentElement.parentElement)

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

function renameComponent() {



}