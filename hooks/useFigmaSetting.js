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
  const [state, setState] = useState({
    setting: null,
    error: null,
    loading: true
  });

  const setThisSetting = useCallback(
    (_key, data) => {
      if (_key === key) {
        setState({
          setting: data,
          error: null,
          loading: false
        });
      }
    },
    [setState, key]
  );

  useEffect(() => {
    listeners.push(setThisSetting);
    api
      .__getSetting(key)
      .then(setting =>
        setState({
          setting,
          error: null,
          loading: false
        })
      )
      .catch(error =>
        setState({
          setting: null,
          error,
          loading: false
        })
      );
    return () => {
      listeners = listeners.filter(l => l !== setThisSetting);
    };
  }, [setThisSetting]);

  const setFigmaSetting = useCallback(data => api.__setSetting(key, data), [
    key
  ]);

  return [state.setting, state.error, state.loading, setFigmaSetting];
};
