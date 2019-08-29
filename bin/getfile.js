const fs = require("fs");

module.exports = function(name) {
  var outputname = "/Users/zhujunwei/Desktop" + name;
  fs.readdir("../project", (err, files) => {
    if(!err){
      console.log(files);
      fs.mkdir(outputname, () => {
        
      })
    }
  })
}