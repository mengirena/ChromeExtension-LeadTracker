/*
functions:
1. Create categories
2. Save active websites with or without the category name
3. Save all websites
4. Delete category block
5. Delete website list
6. Drag website list to different category block 

Flow:
If the localStorage has data, render it

Render Category blocks
        
Render URL lists


*/ 

let myTabs = {
    Search:[{
        url:"www.google.com",
        saved:new Date()
    },{
        url:"www.A.com",
        saved:new Date()
    }],
    CSS:[{
        url:"www.B.com",
        saved:new Date()
    },{
        url:"www.C.com",
        saved:new Date()
    }]
}

const inputEl = document.getElementById("input-el")
const createBtn = document.getElementById("input-btn")
const saveBtn = document.getElementById("save-btn")
const catEl = document.getElementById("cat-el")
let deleteBtn, deleteUrl, draggableCat, dragging, dragOverEle
myTabs = JSON.parse(localStorage.getItem("myTabs")) || myTabs

renderCat(myTabs)

createBtn.addEventListener("click", function() {
    if (inputEl.value != "") myTabs[inputEl.value.toUpperCase()] = []
    localStorage.setItem("myTabs",JSON.stringify(myTabs))
    renderCat(myTabs)
})

saveBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let newObj = {
            "url": null,
        }
        let key = "undefined"
        newObj["url"] = tabs[0].url
        newObj["saved"] = new Date()
        
        if (inputEl.value != "") key = inputEl.value
        if (!(key in myTabs)) myTabs[key] = []
        
        myTabs[key].push(newObj)
        localStorage.setItem("myTabs",JSON.stringify(myTabs))
        renderCat(myTabs)
    })
})

function deleteCat(e){
    let key = e.target.id
    delete myTabs[key]
    localStorage.setItem("myTabs",JSON.stringify(myTabs))
    renderCat(myTabs)
}

function deleteList(e){
    let key = e.currentTarget.id.split("-")
    myTabs[key[0]].splice(key[1],1)
    localStorage.setItem("myTabs",JSON.stringify(myTabs))
    renderCat(myTabs)
}

/*
drag start is div or li
*/ 

function dragStart(e){
    e.stopPropagation()
    console.log("dragStartList",e.currentTarget.className)
    dragging = e.currentTarget
}

function dragOver(e){
    // const isLink = e.dataTransfer.types.includes("text/uri-list");
    // if (isLink) {
    //     console.log("link")
    //     //e.preventDefault();
    // }
    e.preventDefault()
    e.stopPropagation()
    console.log("dragOver",e.currentTarget) //shows dragover element
    dragOverEle = e.currentTarget
}

function dragEnd(e){
    if(!dragging.className && dragOverEle.className !== "category"){
        console.log("dragEnd")
        draggingPosition = dragging.id.split("-")
        dragOverPosition = dragOverEle.id.split("-")
        temp = myTabs[draggingPosition[0]][draggingPosition[1]]
        console.log("init", myTabs)
        myTabs[draggingPosition[0]].splice(draggingPosition[1],1)
        console.log("remove dragging", myTabs)
        myTabs[dragOverPosition[0]].splice(dragOverPosition[1],0,temp)
        console.log("dragover", myTabs)
    }else if(!dragging.className){
        
    }
    localStorage.setItem("myTabs",JSON.stringify(myTabs))
    renderCat(myTabs)
}

function addSmurf(){
    deleteBlock = document.querySelectorAll('.delete-btn')
    deleteUrl = document.querySelectorAll('li')
    draggableCat = document.querySelectorAll('.category[draggable=true]')
    draggableList = document.querySelectorAll("li[draggable=true]")

    deleteBlock.forEach(block => block.addEventListener("click",deleteCat))
    deleteUrl.forEach(list => list.addEventListener("dblclick",deleteList,true))
    draggableCat.forEach(cat => cat.addEventListener("dragover",dragOver))
    draggableCat.forEach(cat => cat.addEventListener("dragstart",dragStart))
    draggableCat.forEach(cat => cat.addEventListener("dragsend",dragEnd))
    draggableList.forEach(list => list.addEventListener("dragover",dragOver))
    draggableList.forEach(list => list.addEventListener("dragstart",dragStart))
    draggableList.forEach(list => list.addEventListener("dragend",dragEnd))
}

function renderList(lists, key){
    let listItems = "<ul>"
    for (let i = 0; i < lists.length; i++) {
        listItems += `
            <li id="${key}-${i}" draggable="true">
                <a target='_blank' href='${lists[i].url}'>
                    ${lists[i].url}
                </a>
                <span>${new Date(lists[i].saved).getMonth()+1}/${new Date(lists[i].saved).getDate()}</span>
            </li>
        `
    }
    return listItems + '</ul>'
}

function renderCat(myTabs) {
    let categoryItems = ""
    for (let key in myTabs){
        let lists = ""
        if (myTabs[key] !== []) lists = renderList(myTabs[key],key)
        categoryItems += `
            <div id="${key}" class ='category' draggable="true">
                <p>${key}</p>
                <p class="delete-btn" id="${key}">X</p>
                ${lists}
            </div>
        `
    }
    catEl.innerHTML = categoryItems
    addSmurf()
}

