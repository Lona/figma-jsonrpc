const { useEffect, useState, useCallback } = require("react");
const { createUIAPI, createPluginAPI } = require("../index");

const uiApi = createUIAPI({
  __onSelectionChange(selection) {
    if (typeof window.__onSelectionChange !== "undefined") {
      window.__onSelectionChange(selection);
    }
  }
});

const selectionChangeHandler = () => {
  uiApi.__onSelectionChange(figma.currentPage.selection);
};

const api = createPluginAPI({
  __registerForSelectionChange() {
    figma.on("selectionchange", selectionChangeHandler);
  },
  __deregisterForSelectionChange() {
    figma.off("selectionchange", selectionChangeHandler);
  },
  __setSelection(newSelection) {
    figma.currentPage.selection = newSelection;
  }
});

let listeners = [];

if (typeof window !== "undefined") {
  window.__onSelectionChange = selection => {
    listeners.forEach(l => {
      l(selection);
    });
  };
}

module.exports = function useFigmaSelection() {
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    if (!listeners.length) {
      // if it's the first listener, let's register for selection change
      api.__registerForSelectionChange();
    }
    listeners.push(setSelection);
    return () => {
      listeners = listeners.filter(l => l !== setSelection);
      if (!listeners.length) {
        // if it was the last listener, then we don't have to listen to selection change anymore
        api.__deregisterForSelectionChange();
      }
    };
  }, [setSelection]);

  const setFigmaSelection = useCallback(api.__setSelection, []);

  return [selection, setFigmaSelection];
};
