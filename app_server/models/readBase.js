const fs = require("fs");
// function for reading files
function readBase(url) {
  return new Promise((resolve, reject) => {
    fs.readFile(url, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err); // in the case of error, control flow goes to the catch block with the error occured.
      } else {
        resolve(data); // in the case of success, control flow goes to the then block with the content of the file.
      }
    });
  });
}

module.exports = {
  readBase
};