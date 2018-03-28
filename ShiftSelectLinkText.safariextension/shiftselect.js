function bindNewAnchor(element) {
  element.addEventListener("mouseenter", function(event) {
    if (element.innerText) {
      if (event.shiftKey) setContenteditable(this);
      currentElement = this;
    }
  });
  element.addEventListener('keydown', function (event) {
    if (event.keyCode == 67 && event.metaKey) {
      document.execCommand('copy');
    }
  });
  element.addEventListener("mouseleave", function(event) {
    this.removeAttribute("contenteditable");
    currentElement = null;
  });
  element.addEventListener("keypress", blockEvent);
  element.addEventListener("paste", blockEvent);
  element.addEventListener("cut", blockEvent);
  allNodes.push(element);
}

function blockEvent(event) {
  event.preventDefault();
}

function setContenteditable(element) {
  element.setAttribute("contenteditable", "true");
  if (window.getComputedStyle(element, null).outlineWidth == "0px") {
    element.style.outlineWidth = "0px";
  }
}

var currentElement = null, allNodes = [];

addEventListener("DOMNodeInserted", function(event) {
  if (allNodes.indexOf(event.target) == -1 && event.target instanceof HTMLAnchorElement) {
    bindNewAnchor(event.target);
  }
  if (event.target.querySelectorAll) {
    var element = event.target.querySelectorAll("a");
    for (var i = 0; i < element.length; i++) {
      if (0 > allNodes.indexOf(element[i])) bindNewAnchor(element[i]);
    }
  }
});

for (var elements = document.querySelectorAll("a"), i = 0; i < elements.length; i++) bindNewAnchor(elements[i]);

window.addEventListener("keydown", function(event) {
  if (currentElement && event.keyCode == 16) {
    setContenteditable(currentElement);
  }
});

