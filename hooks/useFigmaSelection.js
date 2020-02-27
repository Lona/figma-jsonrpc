const { useEffect, useState } = require("react");
const { createUIAPI } = require("../index");

const api = createUIAPI({
  __onSelectionChange(selection) {
    if (typeof window.__onSelectionChange !== "undefined") {
      window.__onSelectionChange(selection);
    }
  }
});

if (typeof figma !== "undefined") {
  figma.on("selectionchange", () => {
    api.__onSelectionChange(figma.currentPage.selection);
  });
}

const listeners = [];

if (typeof window !== "undefined") {
  window.__onSelectionChange = function(selection) {
    listeners.forEach(function(l) {
      l(selection);
    });
  };
}

module.exports = function useFigmaSelection() {
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    listeners.push(setSelection);
    return () => {
      listeners = listeners.filter(function(l) {
        return l !== setSelection;
      });
    };
  }, []);

  return selection;
};
