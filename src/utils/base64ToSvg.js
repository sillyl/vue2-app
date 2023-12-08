export const base64ToSvg = function (str) {
  return decodeURIComponent(escape(window.atob(str)));
};

export const svgToBase64 = function (svg) {
  return (
    "data:image/svg+xml;base64," +
    window.btoa(unescape(encodeURIComponent(svg)))
  );
};
