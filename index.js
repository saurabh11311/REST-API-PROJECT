const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//middleware - Plugin
app.use(express.urlencoded({ extended: false }))

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Project-01</h1><p>Try <a href=\"/users\">/users</a> or <a href=\"/api/users\">/api/users</a></p>")
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${users.map(user => `<li>${user.first_name} ${user.last_name ?? ""}</li>`).join("")}
    </ul>
  `;
  res.type("html").send(html);
});

// REST API - all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// REST API - single user by id
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //Edit user with id
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    //Delete user with id
    return res.json({ status: "Pending" })
  })


app.post("/api/users", (req, res) => {
  //TO-DO : Create new user
  const body = req.body;
  // console.log("Body" , body);
  users.push({...body , id: users.length + 1});
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.json({ status: "success" , id: users.length })
  });
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
