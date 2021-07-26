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
catEl.innerHTML = renderCat(myTabs)

function handleDelete(e){
    let parent = document.querySelector(`div[id=${e.id}]`)
    console.log(parent)
    console.log(parent.innerText.split("\n"))
    let key = parent.innerText.split("\n")[0]
    delete myTabs[key]
    console.log(myTabs)
    parent.remove()
}

createBtn.addEventListener("click", function() {
    if (inputEl.value != "") myTabs[inputEl.value] = []
    catEl.innerHTML = renderCat(myTabs)
})


saveBtn.addEventListener("click", function(){
    console.log("dd")
    console.log(chrome.tabs)
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        let newObj = {
            "url": null,
            "saved": null
        }
        let key = "undefined"
        newObj["url"] = tabs[0].url
        newObj["saved"] = new Date()
        if (inputEl.value != "") {
            key = inputEl.value
        }
        if (!(key in myTabs)) myTabs[key] = []

        myTabs[key].push(newObj)

        catEl.innerHTML = myTabs
        catEl.innerHTML = renderCat(myTabs)
    })
})



function renderList(lists){
    let listItems = "<ul>"
    for (let i = 0; i < lists.length; i++) {
        listItems += `
            <li draggable="true">
                <a target='_blank' href='${lists[i].url}'>
                    ${lists[i].url}
                </a>
                <span>${lists[i].saved.getMonth()+1}/${lists[i].saved.getDate()}</span>
            </li>
        `
    }
    return listItems + '</ul>'
}

function renderCat(myTabs) {
    let categoryItems = ""
    for (let key in myTabs){
        categoryItems += `
            <div id="${key}" class ='category' draggable="true">
                <p>${key}</p>
                <button class="delete-btn" onclick="handleDelete(this)" id="${key}">X</button>
                ${renderList(myTabs[key])}
            </div>
        `
    }
    return categoryItems
}

