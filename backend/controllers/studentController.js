import { runConfig } from "./dbConfig.js";

const getAllStudents = async (req, res) => {
    try {
      if (!req.session.isAuth) {
        return res.status(401).send("Authentication Failed!!!");
      }
      const query = "SELECT * FROM Student";
      let result = await runConfig(query);
      return res.send(result);
    } catch (error) {
      console.error("Error handling request:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

module.exports = {
    getAllStudents
}