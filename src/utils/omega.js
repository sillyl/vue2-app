export function getθ(A, B, C) {
  // 任意三个点坐标，求角度
  var AB = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
  var AC = Math.sqrt(Math.pow(A.x - C.x, 2) + Math.pow(A.y - C.y, 2));
  var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
  var cosA =
    (Math.pow(AB, 2) + Math.pow(AC, 2) - Math.pow(BC, 2)) / (2 * AB * AC);
  var angleA = Math.round((Math.acos(cosA) * 180) / Math.PI);
  return angleA;
}

export function getFθ(A, B) {
  const angleA = Math.atan2(B.y - A.y, B.x - A.x);
  return (angleA * 180) / Math.PI;
}
