let myTabs = [{
    url:"www.google.com",
    category:"Research",
    saved:new Date()
},{
    url:"www.A.com",
    category:"Research",
    saved:new Date()
},{
    url:"www.B.com",
    category:"CSS",
    saved:new Date()
},{
    url:"www.C.com",
    category:"CSS",
    saved:new Date()
}]

let category = ["Search","CSS"]
const inputEl = document.getElementById("input-el")
const createBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")

/*
 
*/
createBtn.addEventListener("click", function() {

})

function render() {
    let listItems = ""
    for (let i = 0; i < myTabs.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${myTabs[i]}'>
                    ${myTabs[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//     myLeads.push(tabs[0].url)
//     localStorage.setItem("myLeads", JSON.stringify(myLeads) )
//     render(myLeads)
// })