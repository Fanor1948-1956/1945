"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleCheckboxes = exports.setModalMessage = exports.addModalToDOM = void 0;
var toggleCheckboxes = exports.toggleCheckboxes = function toggleCheckboxes(containerId, assignedIds) {
  var checkboxes = document.querySelectorAll("#".concat(containerId, " input[type=\"checkbox\"]"));
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = assignedIds.includes(checkbox.value);
  });
};
var modalHTML = "\n  <div class=\"modal\" id=\"deleteItemModal\" style=\"display: none;\">\n    <div class=\"modal-content\">\n      <span class=\"close-button\">&times;</span>\n      <h2>Confirmar Eliminaci\xF3n</h2>\n      <p id=\"modalMessage\"></p>\n      <button id=\"confirmDeleteButton\">Confirmar</button>\n      <button id=\"cancelDeleteButton\">Cancelar</button>\n    </div>\n  </div>\n";
var addModalToDOM = exports.addModalToDOM = function addModalToDOM() {
  if ($("#deleteItemModal").length === 0) {
    $("body").append(modalHTML);
  }
};
var setModalMessage = exports.setModalMessage = function setModalMessage(message) {
  $("#modalMessage").text(message);
};