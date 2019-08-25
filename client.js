const network = require("@hyperswarm/network");
const crypto = require("crypto");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log("===");
console.log("CLIENT");

rl.question("Channel: ", topicInput => {
  // const swarm = hyperswarm();
  const users = {};
  const myId = crypto.randomBytes(32);
  const nw = network();
  console.log("myId: ", myId.toString("hex"));

  nw.bind(function() {
    // topic should be a 32 byte buffer
    const topic = crypto
      .createHash("sha256")
      .update(topicInput)
      .digest();
    console.log(`Topic: ${topic.toString()}`);
    nw.lookupOne(topic, function(err, peer) {
      console.log(`Found a peer: ${peer.toString()}`);
      console.log(peer);
      if (err) console.error(error);
      nw.connect(peer, function(err, socket) {
        if (err) console.error(err);
        socket.write("Hello World!");
        socket.on("data", data => {
          console.log(`SERVER SAYS: ${data.toString()}`);
        });
      });
    });
  });

  rl.close();
});
