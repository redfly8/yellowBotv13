const express = require('express');
const server = express();
console.log("Server.js was required!");
server.all(`/`, (req, res) => {
  res.send(`Result: [OK].`);
});

function keepAlive() {
  server.listen(3000, () => {
    console.log(`Server is now ready! | ` + Date.now());
    console.log("The server is online!");
  });
}

module.exports = keepAlive;


