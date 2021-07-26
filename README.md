# Chrome Extension - Lead Tracker


## Lesson Learnt

### Human readable date string from Date object
date.getFullYear(),
   date.getMonth()+1,
   date.getDate(),
   date.getHours(),
   date.getMinutes(),
   date.getSeconds(),

### Find parent node
e.target.parentNode.remove()


### Compare `.innerHTML`, `.innerText`, and `.textContent`

- `.innerHTML`: return the HTML tag and format like space

- `.innerText`: return the text without format

- `.textContent`: return the text with format


### Remove a key from the object

```js
delete object[key]; 
or
delete object.key
```

if (!(key in myTabs)) myTabs[key] = []

### Other ways to write the selector inside `querySelector()`

https://drafts.csswg.org/selectors/#overview
