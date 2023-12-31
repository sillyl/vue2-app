import { isEmpty } from "lodash";
export function getFθ(A, B) {
  const angleA = Math.atan2(B.y - A.y, B.x - A.x);
  return (angleA * 180) / Math.PI;
}

export const judgmentType = (obj) => {
  const type = Object.prototype.toString.call(obj).slice(8, -1); // '[object xxx]' 取xxx
  return type;
};

export const getMinPoint = function (arr, curPoint, threshold) {
  let minLen = threshold;
  const { x, y } = curPoint;
  let obj = {};
  const type = judgmentType(arr);
  if (type === "Array") {
    (arr || []).forEach((i) => {
      // 数组
      const curPointX = i.x;
      const curPointY = i.y;
      const len = Math.sqrt(
        Math.pow(y - curPointY, 2) + Math.pow(x - curPointX, 2)
      );
      if (len.toFixed(2) <= minLen) {
        minLen = len;
        obj = i;
      }
    });
  } else {
    // type === 'Map'
    (arr || []).forEach((val, key) => {
      // new Map()
      const curPointX = Number(val.location.x);
      const curPointY = Number(val.location.y);
      const len = Math.sqrt(
        Math.pow(y - curPointY, 2) + Math.pow(x - curPointX, 2)
      );
      if (len.toFixed(2) <= minLen) {
        minLen = len;
        obj = { value: val, key, curPoint };
      }
    });
  }
  return obj;
};

export const getKonvaConfigByObj = function (arr, obj) {
  let obj1 = {};
  if (!isEmpty(obj)) {
    for (var i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (item.key == obj.key) {
        obj1 = item;
        break;
      }
    }
  }
  return obj1;
};
export function getCenter(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

export function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
