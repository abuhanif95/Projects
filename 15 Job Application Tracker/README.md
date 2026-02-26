## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
 Answer:
  getElementById: Returns a single element with the matching id attribute
  getElementsByClassName: Returns an HTMLCollection of all elements with the specified class name.
  querySelector: Returns the FIRST element that matches a CSS selector.
  querySelectorAll: Returns a NodeList of ALL elements matching a CSS selector.

  getElementById is fastest but only works with IDs, 
  getElementsByClassName returns live HTMLCollection,
  querySelectorAll returns static NodeList,
  querySelector/querySelectorAll are more flexible as they accept any CSS selector

### 2. How do you create and insert a new element into the DOM?
 Answer:
  const div = document.createElement('div');
  div.className = 'card';
  div.textContent = "New Card";
  div.setAttribute('id', 'job-card');
  document.querySelector("body").appendChild(div);

### 3. What is Event Bubbling? And how does it work?
 Answer:
  Event Bubbling is a DOM event propagation mechanism where an event starts from the target element and bubbles up to its ancestors (chid => parent => grandparent → ... → document).

  How it Works:
   If i click on a button inside a card. the click event first triggers on the button then it bubbles up to the card then to the section continue until the reaches the document root.


### 4. What is Event Delegation in JavaScript? Why is it useful?
 Answer:
  Event Delegation is a technique where you attach a single event listener to a parent element instead of attaching multiple listeners to child elements. The parent listens for events that bubble up from children.

  Useful: It's useful for performance, dynamic elements, clean code and automatic handling.

### 5. What is the difference between preventDefault() and stopPropagation() methods?
 Answer: 
 preventDefault():
  Prevents the browser's default behavior for an element.doesn't stop event bubbling

 stopPropagation():
 Stops the event from bubbling up to parent elements. does not prevent default browser behavior

  Key Difference:
  preventDefault(): Stops browser's default action
  stopPropagation(): Stops event bubbling in DOM