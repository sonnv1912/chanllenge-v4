import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const secretKey = "4aa3b8fe-5586-4145-ae7a-67be869ed741";

app.post("/login", (req, res) => {
  const user = { id: 1, username: "example" };
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

  res.json({ token });
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// This route authorizes the user if the token used is valid
app.get("/profile", authenticateToken, (req, res) => {
  try {
    res.send(`Welcome, ${req.user.username}`);
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
