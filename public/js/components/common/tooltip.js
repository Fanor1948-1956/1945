

export function Tooltip(elements) {
  elements.forEach(function (element) {
    
    const tooltipText = document.createElement("div");
    tooltipText.className = "tooltip-text";
    tooltipText.innerText = element.getAttribute("data-tooltip");

    
    element.appendChild(tooltipText);

    
    element.addEventListener("mouseenter", function () {
      tooltipText.classList.add("tooltip-text-visible"); 
    });

    
    element.addEventListener("mouseleave", function () {
      tooltipText.classList.remove("tooltip-text-visible"); 
    });
  });
}
