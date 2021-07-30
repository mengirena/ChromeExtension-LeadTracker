# Chrome Extension - Save Tabs

This chrome extension can save tabs under different customed category so that users can find the tabs easily and in the meanwhile to maintain the browser efficiency.

## How it's built

**Tech used:** HTML, CSS, JavaScript

## Lesson Learnt

### Human readable date string from Date object

- Get the individual year, date and time first
   ```js
   date.getFullYear(),
   date.getMonth()+1,
   date.getDate(),
   date.getHours(),
   date.getMinutes(),
   date.getSeconds(),
   ```

### How to get parent node and remove it from DOM

`e.target.parentNode.remove()`

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

### To check if a key exists in an object

`if (!(key in myTabs)) myTabs[key] = []`

### Differernt ways to specify the selector inside `querySelector()`

https://drafts.csswg.org/selectors/#overview

### Difference between event.currentTarget and event.target

- e.currentTarget: is the target that assigned event listener

- e.target: is the target being clicked

### How to stop event bubbling

- e.stopPropagation()