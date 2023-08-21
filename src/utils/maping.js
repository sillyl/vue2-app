/* eslint-disable no-useless-escape */
const MapImage = function (data) {
  let exp = /^(\S+)\s+(\#.*?\n)*\s*(\d+)\s+(\d+)\s+(\d+)?\s*/;
  let match = data.match(exp);

  if (match) {
    let width = 2007 || (this.width = parseInt(match[3], 10));
    let height = 2040 || (this.height = parseInt(match[4], 10));
    let maxVal = parseInt(match[5], 10);
    let bytes = 1;
    // 255 < 256 ? 1 : 2;
    let imgData =
      "þþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþ" +
      "þþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþþ";
    //  data.substr(match[0].length);

    switch (match[1]) {
      case "P1":
        this._parser = new ASCIIParser(maxVal + " " + imgData, bytes);
        this._formatter = new PBMFormatter(width, height);
        break;

      case "P2":
        this._parser = new ASCIIParser(imgData, bytes);
        this._formatter = new PGMFormatter(width, height, maxVal);
        break;

      case "P3":
        this._parser = new ASCIIParser(imgData, bytes);
        this._formatter = new PPMFormatter(width, height, maxVal);
        break;

      case "P4":
        this._parser = new BinaryParser(imgData, bytes);
        this._formatter = new PBMFormatter(width, height);
        break;

      case "P5":
        this._parser = new BinaryParser(imgData, bytes);
        this._formatter = new PGMFormatter(width, height, maxVal);
        break;

      case "P6":
        this._parser = new BinaryParser(data, bytes);
        this._formatter = new PPMFormatter(width, height, maxVal);
        break;

      default:
        throw new TypeError(
          "Sorry, your file format is not supported. [" + match[1] + "]"
        );
    }
  } else {
    throw new TypeError("Sorry, file does not appear to be a Netpbm file.");
  }
};

MapImage.prototype.getInitMap = function (type = "image") {
  let canvas = this._formatter.getPainting(this._parser, type);
  return canvas;
};

const BinaryParser = function (data, bytes) {
  this._data = data;
  this._bytes = bytes;
  this._pointer = 0;
};

BinaryParser.prototype.getNextSample = function () {
  if (this._pointer >= this._data.length) return false;

  let val = 0;
  for (let i = 0; i < this._bytes; i++) {
    val = val * 255 + this._data.charCodeAt(this._pointer++);
  }

  return val;
};

const ASCIIParser = function (data, bytes) {
  this._data = data.split(/\s+/);
  this._bytes = bytes;
  this._pointer = 0;
};

ASCIIParser.prototype.getNextSample = function () {
  if (this._pointer >= this._data.length) return false;

  let val = 0;
  for (let i = 0; i < this._bytes; i++) {
    val = val * 255 + parseInt(this._data[this._pointer++], 10);
  }

  return val;
};

const PPMFormatter = function (width, height, maxVal) {
  this._width = width;
  this._height = height;
  this._maxVal = maxVal;
};

PPMFormatter.prototype.getPainting = function (parser, type) {
  let paintData = null;
  let canvas = null;
  let ctx = null;
  let img = null;
  if (type === "canvas") {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = ctx.width = this._width;
    canvas.height = ctx.height = this._height;
    paintData = ctx.getImageData(0, 0, this._width, this._height);
  } else {
    paintData = new Uint8ClampedArray(this._width * this._height * 4);
  }
  let dataArr = type === "canvas" ? paintData.data : paintData;
  for (let row = 0; row < this._height; row++) {
    for (let col = 0; col < this._width; col++) {
      let factor = 255 / this._maxVal;
      let r = factor * parser.getNextSample();
      let g = factor * parser.getNextSample();
      let b = factor * parser.getNextSample();
      let pos = (row * this._width + col) * 4;

      dataArr[pos] = r;
      dataArr[pos + 1] = g;
      dataArr[pos + 2] = b;
      dataArr[pos + 3] = 255;
    }
  }
  if (type === "canvas") {
    ctx.putImageData(paintData, 0, 0);
    return canvas;
  } else {
    img = new ImageData(paintData, this._width, this._height);
    return img;
  }
};

const PGMFormatter = function (width, height, maxVal) {
  this._width = width;
  this._height = height;
  this._maxVal = maxVal;
};

PGMFormatter.prototype.getPainting = function (parser, type) {
  let paintData = null;
  let canvas = null;
  let ctx = null;
  let img = null;
  if (type === "canvas") {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");

    canvas.width = ctx.width = this._width;
    canvas.height = ctx.height = this._height;
    paintData = ctx.getImageData(0, 0, this._width, this._height);
  } else {
    paintData = new Uint8ClampedArray(this._width * this._height * 4);
  }

  let dataArr = type === "canvas" ? paintData.data : paintData;
  for (let row = 0; row < this._height; row++) {
    for (let col = 0; col < this._width; col++) {
      let d = parser.getNextSample() * (255 / this._maxVal);
      let pos = (row * this._width + col) * 4;
      dataArr[pos] = d;
      dataArr[pos + 1] = d;
      dataArr[pos + 2] = d;
      dataArr[pos + 3] = 255;
    }
  }
  if (type === "canvas") {
    ctx.putImageData(paintData, 0, 0);
    return canvas;
  } else {
    img = new ImageData(paintData, this._width, this._height);
    return img;
  }
};

const PBMFormatter = function (width, height) {
  this._width = width;
  this._height = height;
};

PBMFormatter.prototype.getPainting = function (parser, type) {
  let paintData = null;
  let canvas = null;
  let ctx = null;
  let img = null;
  if (type === "canvas") {
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = ctx.width = this._width;
    canvas.height = ctx.height = this._height;
    paintData = ctx.getImageData(0, 0, this._width, this._height);
  }

  if (parser instanceof BinaryParser) {
    let data = "";
    let byte = null;
    let bytesPerLine = Math.ceil(this._width / 8);

    for (let i = 0; i < this._height; i++) {
      let line = parser._data.substr(i * bytesPerLine, bytesPerLine);
      let lineData = "";

      for (let j = 0; j < line.length; j++)
        lineData += ("0000000" + line.charCodeAt(j).toString(2)).substr(-8);
      data += lineData.substr(0, this._width);
    }

    while ((byte = parser.getNextSample()) !== false) {
      data += ("0000000" + byte.toString(2)).substr(-8);
    }

    parser = new ASCIIParser(data.split("").join(" "), 1);
  }
  let dataArr = type === "canvas" ? paintData.data : paintData;
  for (let row = 0; row < this._height; row++) {
    for (let col = 0; col < this._width; col++) {
      let d = (1 - parser.getNextSample()) * 255;
      let pos = (row * this._width + col) * 4;
      dataArr[pos] = d;
      dataArr[pos + 1] = d;
      dataArr[pos + 2] = d;
      dataArr[pos + 3] = 255;
    }
  }
  if (type === "canvas") {
    ctx.putImageData(paintData, 0, 0);
    return canvas;
  } else {
    img = new ImageData(paintData, this._width, this._height);
    return img;
  }
};

export { MapImage };
