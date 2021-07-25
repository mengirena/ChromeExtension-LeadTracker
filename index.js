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
const catEl = document.getElementById("cat-el")

/*
 1. render category blocks and the url
 2.  
*/
createBtn.addEventListener("click", function() {
    console.log(inputEl.value)
    
    //catEl.innerHTML = renderList(myTabs.CSS)
})

function renderList(lists){
    console.log(lists)
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
    for (let i = 0; i < myTabs.length; i++){
        categoryItems += `
            <div class ='category' draggable="true">
            </div>
        `
    }
}

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//     myLeads.push(tabs[0].url)
//     localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//     render(myLeads)
// })