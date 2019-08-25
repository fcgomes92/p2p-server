const network = require("@hyperswarm/network");
const crypto = require("crypto");

const users = {};
const myId = crypto.randomBytes(32);
const nw = network({
  socket: socket => {
    socket.write("Hello  from server");
    socket.on("data", data => {
      console.log(data.toString());
    });
  }
});
console.log("myId: ", myId.toString("hex"));

nw.bind(5050, function() {
  // topic should be a 32 byte buffer
  const topic = crypto
    .createHash("sha256")
    .update("tp")
    .digest();
  announcer = nw.announce(topic);
  console.log(`Topic: ${topic.toString()}`);
});
