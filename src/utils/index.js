export function getCurrentTime() {
  var time = new Date();
  time.setHours(time.getHours() + 8);
  time = time.toISOString();
  time = time.replaceAll("-", "");
  time = time.replaceAll(":", "");
  time = time.replaceAll("T", "");
  return time.substr(0, 14);
}
