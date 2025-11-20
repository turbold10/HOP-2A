const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  const method = request.method;
  if (method === "GET") {
    console.log("GET methodiin code ajillaj bga");
    const data = fs.readFileSync("./data.json", "utf8");
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(data);
  } else if (method === "POST") {
    console.log("POST methodiin code ajillaj bga");
    let body = "";
    request.on("data", (chunk) => {
      body = body + chunk;
    });

    request.on("end", () => {
      const newUser = JSON.parse(body);
      const usersJSON = fs.readFileSync("./data.json", "utf8");
      const users = JSON.parse(usersJSON);
      users.push(newUser);

      fs.writeFileSync("./data.json", JSON.stringify(users), "utf8");
      response.end("USER AMJILTTAI NEMLEE!!!");
    });
  } else if (method === "PUT") {
    const url = request.url;
    const a = url.split("=");
    const name = a[1];

    let body = "";
    request.on("data", (chunk) => {
      body = body + chunk;
    });

    request.on("end", () => {
      const usersJSON = fs.readFileSync("./data.json", "utf8");
      const users = JSON.parse(usersJSON);

      const userInfo = JSON.parse(body);

      for (let i = 0; i < users.length; i++) {
        if (users[i].name === name) {
          users[i] = {
            name: name,
            age: userInfo.age,
            gender: userInfo.gender,
          };
        }
      }

      fs.writeFileSync("./data.json", JSON.stringify(users), "utf8");

      response.end("AMJILTTAI USER-IIN DATA SOLILOO!");
    });
  } else if (method === "DELETE") {
    const url = request.url;
    const urlParts = url.split("=");
    const name = urlParts[1];

    const usersJSON = fs.readFileSync("./data.json", "utf8");
    const users = JSON.parse(usersJSON);

    for (let i = 0; i < users.length; i++) {
      if (users[i].name === name) {
        users.splice(i, 1);
      }
    }

    fs.writeFileSync("./data.json", JSON.stringify(users), "utf8");

    response.end("AMJILTTAI USER USTLAA!");
  }
});

server.listen(8080, () => {
  console.log("Your server is running on: http://localhost:3000/");
});
