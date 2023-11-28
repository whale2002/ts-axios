import { deepMerge, isPlainObject } from "../helper/utils";
var strategyKeysFromConfig2 = ['url', 'params', 'data'];
var strategyKeysDeepMerge = ['headers'];
var strategys = Object.create(null);
strategyKeysFromConfig2.forEach(function (key) {
  strategys[key] = fromConfig2Strategy;
});
strategyKeysDeepMerge.forEach(function (key) {
  strategys[key] = deepMergeStrategy;
});
export default function mergeConfig(config1, config2 // 自定义配置
) {
  if (!config2) {
    config2 = {};
  }
  var config = Object.create(null);
  for (var key in config2) {
    mergeField(key);
  }
  for (var _key in config1) {
    if (!config2[_key]) {
      mergeField(_key);
    }
  }
  function mergeField(key) {
    var strategy = strategys[key] || defaultStrategy;
    config[key] = strategy(config1[key], config2[key]);
  }
  return config;
}
function fromConfig2Strategy(val1, val2) {
  if (typeof val2 !== 'undefined') {
    return val2;
  }
}
function deepMergeStrategy(val1, val2) {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== 'undefined') {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else if (typeof val1 !== 'undefined') {
    return val1;
  }
}
function defaultStrategy(val1, val2) {
  return typeof val2 !== 'undefined' ? val2 : val1;
}