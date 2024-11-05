"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSubItemsCheckboxesForSelection = void 0;
var renderSubItemsCheckboxesForSelection = exports.renderSubItemsCheckboxesForSelection = function renderSubItemsCheckboxesForSelection(subItems, selectedSubItems, containerId) {
  var container = document.getElementById(containerId);
  if (!container) {
    console.error("El contenedor con ID \"".concat(containerId, "\" no fue encontrado."));
    return;
  }
  container.innerHTML = "";
  subItems.forEach(function (subItem) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "selectSubItems-".concat(subItem._id);
    checkbox.value = subItem._id;
    var label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = subItem.name;
    checkbox.checked = selectedSubItems.includes(subItem._id);
    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
};