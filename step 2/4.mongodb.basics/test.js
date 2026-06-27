const dns = require("dns").promises;

async function test() {
  try {
    const result = await dns.resolveSrv(
      "_mongodb._tcp.cluster0.4euxbj2.mongodb.net"
    );
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

test();