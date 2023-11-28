var transform = function transform(data, headers, fns) {
  if (!fns) return data;
  if (!Array.isArray(fns)) {
    fns = [fns];
  }
  fns.forEach(function (fn) {
    data = fn(data, headers);
  });
  return data;
};
export default transform;