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
    // Search:[{
    //     url:"https://developer.mozilla.org/en-US/docs/Web/API/Element/classList",
    //     saved:new Date()
    // },{
    //     url:"https://www.glassdoor.com/employers/blog/interview-questions-facebook-asks/",
    //     saved:new Date()
    // }],
    // CSS:[{
    //     url:"https://www.google.com",
    //     saved:new Date()
    // },{
    //     url:"https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en",
    //     saved:new Date()
    // }]
}

const inputEl = document.getElementById("input-el")
const createBtn = document.getElementById("input-btn")
const saveBtn = document.getElementById("save-btn")
const catEl = document.getElementById("cat-el")
let dragging, dragOverEle, draggingInfo, dragOverInfo

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

function dragStart(e){
    e.stopPropagation()
    dragging = e.currentTarget
    draggingInfo = e
}

function dragOver(e){
    e.preventDefault()
    e.stopPropagation()
    dragOverEle = e.currentTarget
    dragOverInfo = e
}

function dragEnd(e){
    e.stopPropagation()
    const draggingPosition = dragging.id.split("-")
    const draggingKey = draggingPosition[0]
    const draggingValue = draggingPosition[1]
    const dragOverPosition = dragOverEle.id.split("-")
    const dragOverKey = dragOverPosition[0]
    const dragOverValue = dragOverPosition[1]
    let draggingClass = dragging.className
    let temp
    if(!draggingClass && dragOverEle.className !== "category"){
        temp = myTabs[draggingKey][draggingValue]
        myTabs[draggingKey].splice(draggingValue,1)
        myTabs[dragOverKey].splice(dragOverValue,0,temp)
    }else if(!draggingClass){
        temp = myTabs[draggingKey][draggingValue]
        myTabs[draggingKey].splice(draggingValue,1)
        myTabs[dragOverEle.id].push(temp)
    }else if (draggingClass == "category"){
        if (draggingKey !== dragOverKey){
            let rearrangeObj = {}
            temp = myTabs[draggingKey]
            delete myTabs[draggingKey]
            for (let key in myTabs){
                if (draggingInfo.clientY < dragOverInfo.clientY){
                    rearrangeObj[key] = myTabs[key]
                    if (key == dragOverKey) rearrangeObj[draggingKey] = temp
                }else{
                    if (key == dragOverKey) rearrangeObj[draggingKey] = temp
                    rearrangeObj[key] = myTabs[key]
                } 
            }
            myTabs = rearrangeObj
        }
    }
    localStorage.setItem("myTabs",JSON.stringify(myTabs))
    renderCat(myTabs)
}

function addSmurf(){
    let deleteBlock = document.querySelectorAll('.delete-btn')
    let deleteUrl = document.querySelectorAll('li')
    let draggableCat = document.querySelectorAll('.category[draggable=true]')
    let draggableList = document.querySelectorAll("li[draggable=true]")

    deleteBlock.forEach(block => block.addEventListener("click",deleteCat))
    deleteUrl.forEach(list => list.addEventListener("dblclick",deleteList,true))
    draggableCat.forEach(cat => cat.addEventListener("dragover",dragOver))
    draggableCat.forEach(cat => cat.addEventListener("dragstart",dragStart))
    draggableCat.forEach(cat => cat.addEventListener("dragend",dragEnd))
    draggableList.forEach(list => list.addEventListener("dragover",dragOver))
    draggableList.forEach(list => list.addEventListener("dragstart",dragStart))
    draggableList.forEach(list => list.addEventListener("dragend",dragEnd))
}

function renderList(lists, key){
    // let title
    let listItems = "<ul>"
    for (let i = 0; i < lists.length; i++) {
        // fetch(`https://cors-anywhere.herokuapp.com/${lists[i].url}`)
        // .then((response) => {
        //     console.log(response)
        //     response.text()})
        // .then((html) => {
        //     const doc = new DOMParser().parseFromString(html, "text/html");
        //     title = doc.querySelectorAll('title')[0].innerText;
        // })

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

