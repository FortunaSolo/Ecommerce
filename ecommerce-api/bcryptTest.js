const bcrypt = require("bcryptjs");

const rawPassword = "nahomi"; // Use the password you registered with
const storedHash = "$2b$10$hCnKo7dWgnSV2epMQzHJt.Mmf403i0pTJh1P7o2H3F.sGE8BViEge"; // Replace with actual stored hash from MongoDB

bcrypt.compare(rawPassword, storedHash, (err, result) => {
  if (err) console.error("Error comparing passwords:", err);
  console.log("Password Match:", result); // Should print true if correct
});
