const { useEffect, useState, useCallback } = require("react");
const { createUIAPI, createPluginAPI } = require("../index");

let listeners = [];

const uiApi = createUIAPI({
  __onSettingChange(key, data) {
    listeners.forEach(l => {
      l(key, data);
    });
  }
});

const api = createPluginAPI({
  __setSetting(key, data) {
    figma.clientStorage.setAsync(key, data);
    uiApi.__onSettingChange(key, data);
  },
  __getSetting(key) {
    return figma.clientStorage.getAsync(key);
  }
});

module.exports = function useFigmaSetting(key) {
  const [setting, setSetting] = useState(api.__getSetting(key));

  const setThisSetting = useCallback(
    (_key, data) => {
      if (_key === key) {
        setSetting(data);
      }
    },
    [setSetting, key]
  );

  useEffect(() => {
    listeners.push(setThisSetting);
    return () => {
      listeners = listeners.filter(l => l !== setThisSetting);
    };
  }, [setThisSetting]);

  const setFigmaSetting = useCallback(data => api.__setSetting(key, data), [
    key
  ]);

  return [setting, setFigmaSetting];
};
