
var selectedElement='';
var oldSelectElement ='';
var elementToCut='';
var elementToCopy='';
let isAnyInputOpen = false;
var copiedStyle = '';
let colorPickerOpen = false;
var xml = '';
var UID = 0;

$($('#colorPickerID')[0]).hide();

const theArrow = document.getElementById('arrow');

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
        } else if(selectedElement.className.includes('copyColour')) {
            break;
        } else {
            selectedElement = selectedElement.parentElement;
        }
    }
    if(selectedElement.className.includes('myBody')) {
        $(oldSelectElement).removeClass('selectedComponent');
        oldSelectElement='';
        if(document.querySelector('.inputForNewName')) {
            document.querySelector('.inputForNewName').parentElement.querySelector('.nameSpan').style.display='initial';
            deleteComponent(document.querySelector('.inputForNewName'));
            isAnyInputOpen = false;
        }
    }else if(selectedElement.className.includes('selections')){
        
    } else if(selectedElement.className.includes('copyColour')) {
        copyStyle(1);
    } else {
        $(oldSelectElement).removeClass('selectedComponent');
        if(document.querySelector('.inputForNewName') 
        && document.querySelector('.inputForNewName').parentElement!= oldSelectElement) {
            document.querySelector('.inputForNewName').parentElement.querySelector('.nameSpan').style.display='initial';
            deleteComponent(document.querySelector('.inputForNewName'));
            isAnyInputOpen = false;
        }
        $(selectedElement).addClass('selectedComponent');
        oldSelectElement=selectedElement;
        if(copiedStyle!='') {
            oldSelectElement.style.backgroundColor = copiedStyle;    
            copiedStyle = '';
            document.getElementById('copyStyleButton').innerText = 'Copy Style';
        }
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
    } else if (e.keyCode==27 && elementToCopy != '') {
        $(elementToCopy).removeClass('copiedComponent');
        elementToCopy = '';
    } else if (e.keyCode==107) {
        if(oldSelectElement.id == "projectNameDiv") {
            addComponent(document.getElementById('mainComponentPlace'))
        }else if(oldSelectElement!='') {
            addComponent(oldSelectElement.parentElement);
        }else {
            addComponent(document.getElementById('mainComponentPlace'))
        }
    } else if (e.keyCode==9) {
        try {
            if(oldSelectElement.parentElement.className.includes('other')) {
                convertingToTaB();
            } else {
                convertingToSbS();
            }
        } catch {

        }
        e.preventDefault();
    }

})

function addComponent(parentComponent) {
    
    var childPlace = parentComponent.querySelector('.childComponentPlace');
    
    const newComponent = document.createElement('div');
    const newNameDiv = document.createElement('div');
    const newNumberSpan = document.createElement('span');
    const newNameSpan = document.createElement('span');
    const newChildComponentPlace = document.createElement('div');
    const newOpenAndCloseButton = document.createElement('button');

    newComponent.className = "component";
    newComponent.setAttribute('ondragover','allowDrop(event)');
    newNameDiv.className = "componentNameDiv"
    newNameDiv.setAttribute('draggable','true');
    newNameDiv.setAttribute('ondragstart','drag(event)');
    newNameDiv.setAttribute('ondrop','drop(event)');
    newNameSpan.className = "componentNameSpan nameSpan";
    newNameSpan.innerText = "New Component";
    newNumberSpan.className = "numberSpan";
    newChildComponentPlace.className ="childComponentPlace normalComponentChildComponentPlace";
    newOpenAndCloseButton.className = "openAndCloseButton";
    newOpenAndCloseButton.innerText = '-';
    let status = 0;
    newOpenAndCloseButton.addEventListener('click', ()=>{

        $(newChildComponentPlace).slideToggle(500);
        
        if(status == 0) {
            newOpenAndCloseButton.innerText = '+';
            status = 1;
        } else {
            newOpenAndCloseButton.innerText = '-';
            status = 0;
        }

    })


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
    newNameDiv.appendChild(newNumberSpan);
    newNameDiv.appendChild(newNameSpan);
    newComponent.appendChild(newOpenAndCloseButton);
    newComponent.appendChild(newChildComponentPlace);

    addDoubleClickEvent(newNameDiv);

    if(parentComponent.className.includes('otherComponent')) {

        convertingToSbS();

    } else {

        convertingToTaB();

    }
    enumarationComponents();

}

document.getElementById('deleteButton').addEventListener('click',()=>{

    if(oldSelectElement.id == "projectNameDiv") {
        
    }else if(oldSelectElement!='') {
        deleteComponent(oldSelectElement.parentElement);
    }else {
        
    }

})

function deleteComponent(itemToDelete) {
    // var parentOfDeletedComponent;
    try {
        if(!(itemToDelete.parentElement.parentElement.className.includes('dif'))){
            parentOfDeletedComponent = itemToDelete.parentElement.parentElement;
        }
    } catch {

    }

    $(itemToDelete).remove();
    // oldSelectElement = parentOfDeletedComponent.querySelector('.componentNameDiv');
    // $(oldSelectElement).addClass('selectedComponent')
    try {
        if(oldSelectElement.parentElement.className.includes('otherComponent')) {

            convertingToSbS();

        }
    } catch {

    }
    enumarationComponents()
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
        nameDiv.querySelector('.nameSpan').style.display='none';

        newNameInput.setAttribute('type','text');
        newNameInput.className= 'inputForNewName';
        newNameInput.setAttribute('value',nameDiv.querySelector('.nameSpan').innerText);
        newNameInput.addEventListener('keydown',(e)=> {
            
            $(oldSelectElement).removeClass('selectedComponent');
            oldSelectElement = '';

            if(e.keyCode==13 && newNameInput.value.trim()) {
                nameDiv.querySelector('.nameSpan').innerText = newNameInput.value.trim();
                nameDiv.querySelector('.nameSpan').style.display='initial';
                $(newNameInput).remove();
                isAnyInputOpen = false;
            } else if(e.keyCode==27) {
                document.querySelector('.inputForNewName').parentElement.querySelector('.nameSpan').style.display='initial';
                $(document.querySelector('.inputForNewName')).remove();
                isAnyInputOpen = false;
            }

        })
        isAnyInputOpen = true;
        nameDiv.appendChild(newNameInput);
        newNameInput.setAttribute('onfocus','this.select()');
        newNameInput.focus();
    } else {
        try {
            document.querySelector('.inputForNewName').parentElement.querySelector('.nameSpan').style.display='initial';
        } catch {

        }
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
                $(elementToCut).insertBefore(rightSideDiv1);
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
                $(clonedElement).insertBefore(rightSideDiv1);
            }else {
                oldSelectElement.parentElement.querySelector('.childComponentPlace').appendChild(clonedElement);
            }
            
            elementToCopy = '';

        }

    }
    enumarationComponents()
}

document.getElementById('copyStyleButton').addEventListener('click',()=>{

    copyStyle();

})

function copyStyle(a) {

    if(a==undefined) {
        if(oldSelectElement!='') {
            copiedStyle = oldSelectElement.style.backgroundColor;
            document.getElementById('copyStyleButton').innerText = 'Copied';
            document.getElementById('copyStyleButton').style.backgroundColor = copiedStyle;
            $(oldSelectElement).removeClass('selectedComponent');
            oldSelectElement = '';
        }
    } else {
        copiedStyle = document.querySelector('.copyColourComponent').style.backgroundColor;
        document.getElementById('copyStyleButton').innerText = 'Copied';
        document.getElementById('copyStyleButton').style.backgroundColor = copiedStyle;
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
    try {
        const toSbS = oldSelectElement.parentElement;
        $(toSbS).addClass('otherComponent');
        $(toSbS.querySelector('.childComponentPlace'))
        .removeClass('normalComponentChildComponentPlace');
        $(toSbS.querySelector('.childComponentPlace'))
        .addClass('otherComponentChildComponentPlace');

        // if(!toSbS.querySelector('canvas')) {
        //     const childCount = 
        //     $($(oldSelectElement.parentElement.querySelector('.childComponentPlace'))[0])[0].childElementCount;
        //     if(childCount<2) {
        //         return;
        //     }

        //     const otherComponentCanvas = document.createElement('canvas');
        //     var count = $(toSbS).length;
        //     var canvasWidth = (count*100);
        //     canvasWidth += 'px';
        //     $(otherComponentCanvas).width(toSbS.offsetWidth-50);
        //     $(otherComponentCanvas).height(1);
        //     otherComponentCanvas.style.backgroundColor = '#222';

        //     $(otherComponentCanvas).insertBefore(toSbS.querySelector('.otherComponentChildComponentPlace'));

        // } else {
        //     $(toSbS.querySelector('canvas')).remove();
        //     const childCount = 
        //     $($(oldSelectElement.parentElement.querySelector('.childComponentPlace'))[0])[0].childElementCount;
        //     if(childCount<2) {
        //         return;
        //     }

        //     const otherComponentCanvas = document.createElement('canvas');
        //     var count = $(toSbS).length;
        //     var canvasWidth = (count*100);
        //     canvasWidth += 'px';    console.log(canvasWidth);
        //     $(otherComponentCanvas).width(toSbS.offsetWidth-50);
        //     $(otherComponentCanvas).height(1);
        //     otherComponentCanvas.style.backgroundColor = '#222';

        //     $(otherComponentCanvas).insertBefore(toSbS.querySelector('.otherComponentChildComponentPlace'));


        // }
    } catch {


    }

}

document.getElementById('normalComponentButton').addEventListener('click',()=>{
    
    convertingToTaB();

});

function convertingToTaB() {

    const myDiv = oldSelectElement.parentElement;
    if(myDiv==null) {
        return;
    }
    try {
        $(myDiv).removeClass('otherComponent');
        $(myDiv.querySelector('.childComponentPlace'))
        .removeClass('otherComponentChildComponentPlace');
        $(myDiv.querySelector('.childComponentPlace'))
        .addClass('normalComponentChildComponentPlace');

        if(myDiv.querySelector('canvas')) {

            $(myDiv.querySelector('canvas')).remove();

        }

        // normalCanvasConstructor(myDiv);

    } catch(e) {

        console.log(e);

    }

}

function normalCanvasConstructor(myDiv) {
    const normalCanvas = document.createElement('canvas');
    normalCanvas.className = 'TaBCanvas';
    childCountElement = myDiv.querySelector('.childComponentPlace');
    childCount = $(childCountElement)[0].children.length;
    $(normalCanvas).insertBefore(myDiv.querySelector('.childComponentPlace'));
    if(childCount!=0) {
        normalCanvas.style.height = childCount*75 +'px';
        var ctx = normalCanvas.getContext("2d");
        ctx.strokeStyle = "black";
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(0,childCount*75);
        // ctx.lineTo(20,0);
        // ctx.lineTo(0,0);
        let i = 1;
        ctx.moveTo(0,1*75);
        for(i=1;i<childCount+1;i++) {
            ctx.lineTo(20,i*75);
            ctx.moveTo(0,(i+1)*75);
        }
        ctx.stroke();
        


    } else {
        normalCanvas.style.height = '0px';
    }
    

}

function randomColorFunction() {

    let colorString = '#';

    let redColor = Math.floor((Math.random()*255));
    while(redColor<50) {
        redColor = Math.floor((Math.random()*255))
    }
    redColor = redColor.toString(16);
    let greenColor = Math.floor((Math.random()*255));
    while(greenColor<50) {
        greenColor = Math.floor((Math.random()*255))
    }
    greenColor = greenColor.toString(16);
    let blueColor = Math.floor((Math.random()*255));
    while(blueColor<50) {
        blueColor = Math.floor((Math.random()*255))
    }
    blueColor = blueColor.toString(16);
    colorString += redColor + greenColor +  blueColor;
    return colorString;

}

function allowDrop(ev) {
    // console.log(ev.target);
    ev.preventDefault();
    arrowCreating(ev);
  }
  
function drag(ev) {
    $(oldSelectElement).removeClass('selectedComponent');
    oldSelectElement = ev.target.parentElement;
}
  
function drop(ev) {
    
    theArrow.style.display = 'none';
    var newParent = ev.target;
    if(newParent.id=='projectDiv' || newParent.id=='projectNameDiv' || newParent.id=='projectNameSpan') {
        // document.querySelector('.dif').appendChild(oldSelectElement);
        $(oldSelectElement).insertBefore($('#rightSideDiv1'));
        enumarationComponents()
        return;
    }

    if(newParent.className.includes('Span')) {
        newParent = newParent.parentElement; 
    }
    var elem = $(oldSelectElement).next();
    try {
        var rect = newParent.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
        // console.log('yler' ,y,rect.top)
        // console.log('xler' ,x,rect.right);
        var x = event.clientX;
        var y = event.clientY;
        if(x<rect.right-30 && y<rect.top+32 && x>rect.left+30) {
            if(oldSelectElement == newParent.parentElement.parentElement.parentElement) {

            } else {
                $(oldSelectElement).insertBefore(newParent.parentElement);
                oldSelectElement.querySelector('.childComponentPlace').appendChild(newParent.parentElement);
            }
            
            
        } else if(x>rect.right-30) {
            if(oldSelectElement == newParent.parentElement.parentElement.parentElement) {

            } else {
                $(oldSelectElement).insertAfter(newParent.parentElement);
            }
        } else if(x<rect.left+30){
            if(newParent.parentElement.parentElement.parentElement == oldSelectElement) {

            } else {
                $(oldSelectElement).insertBefore(newParent.parentElement);
            }
        } else {
            
            newParent.parentElement.querySelector('.childComponentPlace').appendChild(oldSelectElement);
        }
        // newParent.parentElement.querySelector('.childComponentPlace').appendChild(oldSelectElement);
    } catch(e) {
        // console.log('nanii', test);

        if(e.name =='HierarchyRequestError') {
            $(oldSelectElement).insertBefore(elem);
            // console.log(oldSelectElement,newParent.parentElement);
            // console.log(e);

        }

    }
    // oldSelectElement.querySelector('.componentNameDiv').style.backgroundColor = newParent.style.backgroundColor;

    oldSelectElement='';
    enumarationComponents()
    ev.preventDefault();

}

function arrowCreating(e) {
    var myElement = e.target;
    if(myElement.className.includes('Span')) {
        myElement = myElement.parentElement;
    }
    if(oldSelectElement == myElement.parentElement) {
        theArrow.style.display = 'none';
        return;
    }

    if(myElement.className.includes('componentNameDiv')) {
        var rect = myElement.getBoundingClientRect();
        
        var x = event.clientX;
        var y = event.clientY;
        // console.log('yeler' , y, rect.top )
        // console.log('xler' , x, rect.right )
        if(x<rect.right-30 && y<rect.top+32 && x>rect.left+30) { //top
            theArrow.innerText = '↑';
            theArrow.style.top = (rect.top-70) +'px';
            theArrow.style.left = (rect.right+rect.left)/2 -20  +'px';
            theArrow.style.display = 'initial';

        } else if(x>rect.right-30) { // right
            theArrow.innerText = '→';
            theArrow.style.top = (rect.top+rect.bottom)/2-35 +'px';
            theArrow.style.left = (rect.right) +'px';
            theArrow.style.display = 'initial';

        } else if(x<rect.left+30){ //left
            theArrow.innerText = '←';
            theArrow.style.top = (rect.top+rect.bottom)/2-35 +'px';
            theArrow.style.left = (rect.left-40) +'px';
            theArrow.style.display = 'initial';

        } else { // bottom
            theArrow.innerText = '↓';   
            theArrow.style.top = (rect.top+70) +'px';
            theArrow.style.left = (rect.right+rect.left)/2 -20 +'px';
            theArrow.style.display = 'initial';
                
        }

    } else {

        theArrow.style.display = 'none';

    }

}

document.querySelector('.colorPickerInput').addEventListener('keyup',()=>{
    
    if(document.querySelector('.colorPickerInput').value.toString().length==3 
    || document.querySelector('.colorPickerInput').value.toString().length==6) {

        document.querySelector('.copyColourComponent').style.backgroundColor = '#' + 
        document.querySelector('.colorPickerInput').value.toString();

    }

})

document.getElementById('colorPickerButton').addEventListener('click',()=> {
    const myElem = $('#colorPickerID')[0];
    if(colorPickerOpen) {
        $(myElem).hide(500);
        document.getElementById('colorPickerButton').innerText = 'Open Color Picker';
        colorPickerOpen = false;
    } else {
        $(myElem).show(500);
        document.getElementById('colorPickerButton').innerText = 'Close Color Picker';
        colorPickerOpen = true;
    }

})

// document.getElementById('saveButton').addEventListener('click',()=> {

//     $(oldSelectElement).removeClass('selectedComponent');

//     const thePage = document.body.innerHTML;

//     localStorage.setItem('myPage',JSON.stringify(thePage));

// });

// document.getElementById('loadButton').addEventListener('click',()=>{

//     const thePage = JSON.parse(localStorage.getItem('myPage'))
//     document.body.innerHTML = thePage;

// })

// document.getElementById('newPageButton').addEventListener('click',()=> {

//     if (confirm("Are you Sure?")) {
//         window.location.href = 'file:///C:/Users/ww/Desktop/wbs/index.html';
//     } else {

//     }


// })

function enumarationComponents(whichComponent, numberOfParent,sira) {
    
    if(sira == undefined) {
        sira = 1;
    }
    let fol = 0;
    // console.log(whichComponent);
    if(whichComponent == undefined) {
        var start = document.querySelector('.dif');
        var firstChildCount = $(start)[0].children.length-1;
    } else {
        var start = whichComponent.querySelector('.childComponentPlace');
        var firstChildCount = $(start)[0].children.length;
        fol = 1;
    }
    const firstChilds = $(start)[0].children;
    
    if(fol==1) {

        if(firstChildCount>0) {
            start.parentElement.querySelector('.openAndCloseButton').style.display = 'initial';
        } else {
            start.parentElement.querySelector('.openAndCloseButton').style.display = 'none';
        }

    }

    for(let i=0; i<firstChildCount;i++) {

        if(fol == 1) {
            firstChilds[i].querySelector('.numberSpan').innerText = numberOfParent + '.' + (i+1); 
        } else {
            firstChilds[i].querySelector('.numberSpan').innerText = (i+1);
        }
        let itsName = firstChilds[i].querySelector('.nameSpan').innerText;
        // itsName = removeLastDot(itsName);
        xml += `
        <Task>

        <UID>${UID}</UID>

        <ID>${UID}</ID>
        
        <Name>${itsName}</Name>
        
        <Type>0</Type>
        
        <IsNull>0</IsNull>
        
        <CreateDate>2019-08-01T09:11:08</CreateDate>
        
        <WBS>${'1.'+firstChilds[i].querySelector('.numberSpan').innerText}</WBS>
        
        <OutlineNumber>0</OutlineNumber>
        
        <OutlineLevel>0</OutlineLevel>
        
        <Priority>500</Priority>
        
        <Start>2019-08-01T08:00:00</Start>
        
        <Finish>2019-08-01T17:00:00</Finish>
        
        <Duration>PT8H0M0S</Duration>
        
        <DurationFormat>39</DurationFormat>
        
        <Work>PT0H0M0S</Work>
        
        <ResumeValid>0</ResumeValid>
        
        <EffortDriven>1</EffortDriven>
        
        <Recurring>0</Recurring>
        
        <OverAllocated>0</OverAllocated>
        
        <Estimated>1</Estimated>
        
        <Milestone>0</Milestone>
        
        <Summary>1</Summary>
        
        <Critical>0</Critical>
        
        <IsSubproject>0</IsSubproject>
        
        <IsSubprojectReadOnly>0</IsSubprojectReadOnly>
        
        <ExternalTask>0</ExternalTask>
        
        <EarlyStart>2019-08-01T08:00:00</EarlyStart>
        
        <EarlyFinish>2019-08-01T17:00:00</EarlyFinish>
        
        <LateStart>2019-08-01T08:00:00</LateStart>
        
        <LateFinish>2019-08-01T17:00:00</LateFinish>
        
        <StartVariance>0</StartVariance>
        
        <FinishVariance>0</FinishVariance>
        
        <WorkVariance>0</WorkVariance>
        
        <FreeSlack>0</FreeSlack>
        
        <TotalSlack>0</TotalSlack>
        
        <FixedCost>0</FixedCost>
        
        <FixedCostAccrual>3</FixedCostAccrual>
        
        <PercentComplete>0</PercentComplete>
        
        <PercentWorkComplete>0</PercentWorkComplete>
        
        <Cost>0</Cost>
        
        <OvertimeCost>0</OvertimeCost>
        
        <OvertimeWork>PT0H0M0S</OvertimeWork>
        
        <ActualDuration>PT0H0M0S</ActualDuration>
        
        <ActualCost>0</ActualCost>
        
        <ActualOvertimeCost>0</ActualOvertimeCost>
        
        <ActualWork>PT0H0M0S</ActualWork>
        
        <ActualOvertimeWork>PT0H0M0S</ActualOvertimeWork>
        
        <RegularWork>PT0H0M0S</RegularWork>
        
        <RemainingDuration>PT8H0M0S</RemainingDuration>
        
        <RemainingCost>0</RemainingCost>
        
        <RemainingWork>PT0H0M0S</RemainingWork>
        
        <RemainingOvertimeCost>0</RemainingOvertimeCost>
        
        <RemainingOvertimeWork>PT0H0M0S</RemainingOvertimeWork>
        
        <ACWP>0</ACWP>
        
        <CV>0</CV>
        
        <ConstraintType>0</ConstraintType>
        
        <CalendarUID>-1</CalendarUID>
        
        <LevelAssignments>1</LevelAssignments>
        
        <LevelingCanSplit>1</LevelingCanSplit>
        
        <LevelingDelay>0</LevelingDelay>
        
        <LevelingDelayFormat>8</LevelingDelayFormat>
        
        <IgnoreResourceCalendar>0</IgnoreResourceCalendar>
        
        <HideBar>0</HideBar>
        
        <Rollup>0</Rollup>
        
        <BCWS>0</BCWS>
        
        <BCWP>0</BCWP>
        
        <PhysicalPercentComplete>0</PhysicalPercentComplete>
        
        <EarnedValueMethod>0</EarnedValueMethod>
        
        <IsPublished>1</IsPublished>
        
        <CommitmentType>0</CommitmentType>
        
        </Task>`;

        UID++;




        
        // let k=0;
        // for(k=0;k<sira;k++) {
        //     xml += ' ';
        // }
        // xml += '<task>\n';
        // for(k=0;k<sira+1;k++) {
        //     xml += ' ';
        // }
        // xml += '<name>'+firstChilds[i].querySelector('.nameSpan').innerText+'</name>\n';
        // for(k=0;k<sira-1;k++) {
        //     xml += ' ';
        // }
        // xml += '</task>\n';
        // sira++;
        enumarationComponents(firstChilds[i],firstChilds[i].querySelector('.numberSpan').innerText,sira);
        
        // sira--;
    }

    
}

document.getElementById('newPageButton').addEventListener('click', ()=> {

    var r = confirm("Are You Sure?");
    if (r == true) {
        window.location.href = '/wbs';
    } else {
    
    }

})

document.getElementById('toXMLButton').addEventListener('click',()=> {

    UID = 1;
    let pN = document.getElementById('projectNameSpan').innerText;
    xml= '';

    xml += `
    <Project xmlns="http://schemas.microsoft.com/project">

    <Name>WBSTool Project</Name>
    
    <Company/>
    
    <Author/>
    
    <CreationDate>2019-08-01T09:11:08</CreationDate>
    
    <LastSaved>2019-08-01T09:11:08</LastSaved>
    
    <ScheduleFromStart>1</ScheduleFromStart>
    
    <StartDate>2019-08-01T08:00:00</StartDate>
    
    <FinishDate>2019-08-01T17:00:00</FinishDate>
    
    <FYStartDate>1</FYStartDate>
    
    <CriticalSlackLimit>0</CriticalSlackLimit>
    
    <CurrencyDigits>2</CurrencyDigits>
    
    <CurrencySymbol>$</CurrencySymbol>
    
    <CurrencySymbolPosition>2</CurrencySymbolPosition>
    
    <CalendarUID>1</CalendarUID>
    
    <DefaultStartTime>08:00:00</DefaultStartTime>
    
    <DefaultFinishTime>17:00:00</DefaultFinishTime>
    
    <MinutesPerDay>480</MinutesPerDay>
    
    <MinutesPerWeek>2400</MinutesPerWeek>
    
    <DaysPerMonth>20</DaysPerMonth>
    
    <DefaultTaskType>0</DefaultTaskType>
    
    <DefaultFixedCostAccrual>3</DefaultFixedCostAccrual>
    
    <DefaultStandardRate>0</DefaultStandardRate>
    
    <DefaultOvertimeRate>0</DefaultOvertimeRate>
    
    <DurationFormat>7</DurationFormat>
    
    <WorkFormat>2</WorkFormat>
    
    <EditableActualCosts>0</EditableActualCosts>
    
    <HonorConstraints>0</HonorConstraints>
    
    <InsertedProjectsLikeSummary>1</InsertedProjectsLikeSummary>
    
    <MultipleCriticalPaths>0</MultipleCriticalPaths>
    
    <NewTasksEffortDriven>1</NewTasksEffortDriven>
    
    <NewTasksEstimated>1</NewTasksEstimated>
    
    <SplitsInProgressTasks>1</SplitsInProgressTasks>
    
    <SpreadActualCost>0</SpreadActualCost>
    
    <SpreadPercentComplete>0</SpreadPercentComplete>
    
    <TaskUpdatesResource>1</TaskUpdatesResource>
    
    <FiscalYearStart>0</FiscalYearStart>
    
    <WeekStartDay>0</WeekStartDay>
    
    <MoveCompletedEndsBack>0</MoveCompletedEndsBack>
    
    <MoveRemainingStartsBack>0</MoveRemainingStartsBack>
    
    <MoveRemainingStartsForward>0</MoveRemainingStartsForward>
    
    <MoveCompletedEndsForward>0</MoveCompletedEndsForward>
    
    <BaselineForEarnedValue>0</BaselineForEarnedValue>
    
    <AutoAddNewResourcesAndTasks>1</AutoAddNewResourcesAndTasks>
    
    <CurrentDate>2019-08-01T09:11:08</CurrentDate>
    
    <MicrosoftProjectServerURL>1</MicrosoftProjectServerURL>
    
    <Autolink>1</Autolink>
    
    <NewTaskStartDate>0</NewTaskStartDate>
    
    <DefaultTaskEVMethod>0</DefaultTaskEVMethod>
    
    <ProjectExternallyEdited>0</ProjectExternallyEdited>
    
    <ExtendedCreationDate>1984-01-01T00:00:00</ExtendedCreationDate>
    
    <ActualsInSync>1</ActualsInSync>
    
    <RemoveFileProperties>0</RemoveFileProperties>
    
    <AdminProject>0</AdminProject>
    
    <OutlineCodes/>
    
    <WBSMasks/>
    
    <ExtendedAttributes/>
    
    
    <Calendars>
    
    
    <Calendar>
    
    <UID>1</UID>
    
    <Name>Standard</Name>
    
    <IsBaseCalendar>1</IsBaseCalendar>
    
    <BaseCalendarUID>-1</BaseCalendarUID>
    
    
    <WeekDays>
    
    
    <WeekDay>
    
    <DayType>1</DayType>
    
    <DayWorking>0</DayWorking>
    
    </WeekDay>
    
    
    <WeekDay>
    
    <DayType>2</DayType>
    
    <DayWorking>1</DayWorking>
    
    
    <WorkingTimes>
    
    
    <WorkingTime>
    
    <FromTime>08:00:00</FromTime>
    
    <ToTime>12:00:00</ToTime>
    
    </WorkingTime>
    
    
    <WorkingTime>
    
    <FromTime>13:00:00</FromTime>
    
    <ToTime>17:00:00</ToTime>
    
    </WorkingTime>
    
    </WorkingTimes>
    
    </WeekDay>
    
    
    <WeekDay>
    
    <DayType>3</DayType>
    
    <DayWorking>1</DayWorking>
    
    
    <WorkingTimes>
    
    
    <WorkingTime>
    
    <FromTime>08:00:00</FromTime>
    
    <ToTime>12:00:00</ToTime>
    
    </WorkingTime>
    
    
    <WorkingTime>
    
    <FromTime>13:00:00</FromTime>
    
    <ToTime>17:00:00</ToTime>
    
    </WorkingTime>
    
    </WorkingTimes>
    
    </WeekDay>
    
    
    <WeekDay>
    
    <DayType>4</DayType>
    
    <DayWorking>1</DayWorking>
    
    
    <WorkingTimes>
    
    
    <WorkingTime>
    
    <FromTime>08:00:00</FromTime>
    
    <ToTime>12:00:00</ToTime>
    
    </WorkingTime>
    
    
    <WorkingTime>
    
    <FromTime>13:00:00</FromTime>
    
    <ToTime>17:00:00</ToTime>
    
    </WorkingTime>
    
    </WorkingTimes>
    
    </WeekDay>
    
    
    <WeekDay>
    
    <DayType>5</DayType>
    
    <DayWorking>1</DayWorking>
    
    
    <WorkingTimes>
    
    
    <WorkingTime>
    
    <FromTime>08:00:00</FromTime>
    
    <ToTime>12:00:00</ToTime>
    
    </WorkingTime>
    
    
    <WorkingTime>
    
    <FromTime>13:00:00</FromTime>
    
    <ToTime>17:00:00</ToTime>
    
    </WorkingTime>
    
    </WorkingTimes>
    
    </WeekDay>
    
    
    <WeekDay>
    
    <DayType>6</DayType>
    
    <DayWorking>1</DayWorking>
    
    
    <WorkingTimes>
    
    
    <WorkingTime>
    
    <FromTime>08:00:00</FromTime>
    
    <ToTime>12:00:00</ToTime>
    
    </WorkingTime>
    
    
    <WorkingTime>
    
    <FromTime>13:00:00</FromTime>
    
    <ToTime>17:00:00</ToTime>
    
    </WorkingTime>
    
    </WorkingTimes>
    
    </WeekDay>
    
    
    <WeekDay>
    
    <DayType>7</DayType>
    
    <DayWorking>0</DayWorking>
    
    </WeekDay>
    
    </WeekDays>
    
    </Calendar>
    
    </Calendars>`;
    
    xml += '<Tasks>';

    xml += `
    <Task>

    <UID>0</UID>
    
    <ID>0</ID>
    
    <Name>Task 0</Name>
    
    <Type>0</Type>
    
    <IsNull>0</IsNull>
    
    <CreateDate>2019-08-01T09:11:08</CreateDate>
    
    <WBS>0</WBS>
    
    <OutlineNumber>0</OutlineNumber>
    
    <OutlineLevel>0</OutlineLevel>
    
    <Priority>500</Priority>
    
    <Start>2019-08-01T08:00:00</Start>
    
    <Finish>2019-08-01T17:00:00</Finish>
    
    <Duration>PT8H0M0S</Duration>
    
    <DurationFormat>39</DurationFormat>
    
    <Work>PT0H0M0S</Work>
    
    <ResumeValid>0</ResumeValid>
    
    <EffortDriven>1</EffortDriven>
    
    <Recurring>0</Recurring>
    
    <OverAllocated>0</OverAllocated>
    
    <Estimated>1</Estimated>
    
    <Milestone>0</Milestone>
    
    <Summary>1</Summary>
    
    <Critical>0</Critical>
    
    <IsSubproject>0</IsSubproject>
    
    <IsSubprojectReadOnly>0</IsSubprojectReadOnly>
    
    <ExternalTask>0</ExternalTask>
    
    <EarlyStart>2019-08-01T08:00:00</EarlyStart>
    
    <EarlyFinish>2019-08-01T17:00:00</EarlyFinish>
    
    <LateStart>2019-08-01T08:00:00</LateStart>
    
    <LateFinish>2019-08-01T17:00:00</LateFinish>
    
    <StartVariance>0</StartVariance>
    
    <FinishVariance>0</FinishVariance>
    
    <WorkVariance>0</WorkVariance>
    
    <FreeSlack>0</FreeSlack>
    
    <TotalSlack>0</TotalSlack>
    
    <FixedCost>0</FixedCost>
    
    <FixedCostAccrual>3</FixedCostAccrual>
    
    <PercentComplete>0</PercentComplete>
    
    <PercentWorkComplete>0</PercentWorkComplete>
    
    <Cost>0</Cost>
    
    <OvertimeCost>0</OvertimeCost>
    
    <OvertimeWork>PT0H0M0S</OvertimeWork>
    
    <ActualDuration>PT0H0M0S</ActualDuration>
    
    <ActualCost>0</ActualCost>
    
    <ActualOvertimeCost>0</ActualOvertimeCost>
    
    <ActualWork>PT0H0M0S</ActualWork>
    
    <ActualOvertimeWork>PT0H0M0S</ActualOvertimeWork>
    
    <RegularWork>PT0H0M0S</RegularWork>
    
    <RemainingDuration>PT8H0M0S</RemainingDuration>
    
    <RemainingCost>0</RemainingCost>
    
    <RemainingWork>PT0H0M0S</RemainingWork>
    
    <RemainingOvertimeCost>0</RemainingOvertimeCost>
    
    <RemainingOvertimeWork>PT0H0M0S</RemainingOvertimeWork>
    
    <ACWP>0</ACWP>
    
    <CV>0</CV>
    
    <ConstraintType>0</ConstraintType>
    
    <CalendarUID>-1</CalendarUID>
    
    <LevelAssignments>1</LevelAssignments>
    
    <LevelingCanSplit>1</LevelingCanSplit>
    
    <LevelingDelay>0</LevelingDelay>
    
    <LevelingDelayFormat>8</LevelingDelayFormat>
    
    <IgnoreResourceCalendar>0</IgnoreResourceCalendar>
    
    <HideBar>0</HideBar>
    
    <Rollup>0</Rollup>
    
    <BCWS>0</BCWS>
    
    <BCWP>0</BCWP>
    
    <PhysicalPercentComplete>0</PhysicalPercentComplete>
    
    <EarnedValueMethod>0</EarnedValueMethod>
    
    <IsPublished>1</IsPublished>
    
    <CommitmentType>0</CommitmentType>
    
    </Task>`;


    xml += `
    <Task>

    <UID>${UID}</UID>

    <ID>${UID}</ID>
    
    <Name>${pN}</Name>
    
    <Type>0</Type>
    
    <IsNull>0</IsNull>
    
    <CreateDate>2019-08-01T09:11:08</CreateDate>
    
    <WBS>1</WBS>
    
    <OutlineNumber>0</OutlineNumber>
    
    <OutlineLevel>0</OutlineLevel>
    
    <Priority>500</Priority>
    
    <Start>2019-08-01T08:00:00</Start>
    
    <Finish>2019-08-01T17:00:00</Finish>
    
    <Duration>PT8H0M0S</Duration>
    
    <DurationFormat>39</DurationFormat>
    
    <Work>PT0H0M0S</Work>
    
    <ResumeValid>0</ResumeValid>
    
    <EffortDriven>1</EffortDriven>
    
    <Recurring>0</Recurring>
    
    <OverAllocated>0</OverAllocated>
    
    <Estimated>1</Estimated>
    
    <Milestone>0</Milestone>
    
    <Summary>1</Summary>
    
    <Critical>0</Critical>
    
    <IsSubproject>0</IsSubproject>
    
    <IsSubprojectReadOnly>0</IsSubprojectReadOnly>
    
    <ExternalTask>0</ExternalTask>
    
    <EarlyStart>2019-08-01T08:00:00</EarlyStart>
    
    <EarlyFinish>2019-08-01T17:00:00</EarlyFinish>
    
    <LateStart>2019-08-01T08:00:00</LateStart>
    
    <LateFinish>2019-08-01T17:00:00</LateFinish>
    
    <StartVariance>0</StartVariance>
    
    <FinishVariance>0</FinishVariance>
    
    <WorkVariance>0</WorkVariance>
    
    <FreeSlack>0</FreeSlack>
    
    <TotalSlack>0</TotalSlack>
    
    <FixedCost>0</FixedCost>
    
    <FixedCostAccrual>3</FixedCostAccrual>
    
    <PercentComplete>0</PercentComplete>
    
    <PercentWorkComplete>0</PercentWorkComplete>
    
    <Cost>0</Cost>
    
    <OvertimeCost>0</OvertimeCost>
    
    <OvertimeWork>PT0H0M0S</OvertimeWork>
    
    <ActualDuration>PT0H0M0S</ActualDuration>
    
    <ActualCost>0</ActualCost>
    
    <ActualOvertimeCost>0</ActualOvertimeCost>
    
    <ActualWork>PT0H0M0S</ActualWork>
    
    <ActualOvertimeWork>PT0H0M0S</ActualOvertimeWork>
    
    <RegularWork>PT0H0M0S</RegularWork>
    
    <RemainingDuration>PT8H0M0S</RemainingDuration>
    
    <RemainingCost>0</RemainingCost>
    
    <RemainingWork>PT0H0M0S</RemainingWork>
    
    <RemainingOvertimeCost>0</RemainingOvertimeCost>
    
    <RemainingOvertimeWork>PT0H0M0S</RemainingOvertimeWork>
    
    <ACWP>0</ACWP>
    
    <CV>0</CV>
    
    <ConstraintType>0</ConstraintType>
    
    <CalendarUID>-1</CalendarUID>
    
    <LevelAssignments>1</LevelAssignments>
    
    <LevelingCanSplit>1</LevelingCanSplit>
    
    <LevelingDelay>0</LevelingDelay>
    
    <LevelingDelayFormat>8</LevelingDelayFormat>
    
    <IgnoreResourceCalendar>0</IgnoreResourceCalendar>
    
    <HideBar>0</HideBar>
    
    <Rollup>0</Rollup>
    
    <BCWS>0</BCWS>
    
    <BCWP>0</BCWP>
    
    <PhysicalPercentComplete>0</PhysicalPercentComplete>
    
    <EarnedValueMethod>0</EarnedValueMethod>
    
    <IsPublished>1</IsPublished>
    
    <CommitmentType>0</CommitmentType>
    
    </Task>`
    UID++;
    enumarationComponents();

    xml += '</Tasks>';

    xml += `
    <Resources/>

    <Assignments/>
    
    </Project>`;


    // document.getElementById('projectNameSpan').innerText = xml;
    download(pN+'.xml',xml);

})


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


function removeLastDot(changingName) {

    let pos = changingName.lastIndexOf('.');
    changingName.slice(0,pos-1);
    return changingName;

}