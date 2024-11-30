"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCheckboxesForSelection = void 0;
var renderCheckboxesForSelection = exports.renderCheckboxesForSelection = function renderCheckboxesForSelection(items, selectedItems, containerId, itemIdKey, itemNameKey) {
  var container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach(function (item) {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = "selectItem-".concat(item[itemIdKey]);
    checkbox.value = item[itemIdKey];
    var label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = item[itemNameKey];
    checkbox.checked = selectedItems.includes(item[itemIdKey]);
    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
};