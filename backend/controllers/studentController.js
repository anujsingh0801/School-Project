import { runConfig } from "../service/dbConfig.js";

export const getAllStudents = async (req, res) => {
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
};

export const createStudent = async (req, res) => {
  try {
    if (!req.session.isAuth) {
      return res.status(401).send("Authentication Failed!!!");
    }
    const { admNum, name } = req.body;

    const query = `INSERT INTO student(Admission_Number, Student_name) VALUES (${admNum}, '${name}')`;
    let result = await runConfig(query);
    return res.send(result);
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    if (!req.session.isAuth) {
      return res.status(401).send("Authentication Failed!!!");
    }
    const { admNum, name } = req.body;

    const query = `UPDATE student SET Student_Name='${name}' WHERE Admission_Number=${admNum}`;
    let result = await runConfig(query);
    return res.send(result);
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    if (!req.session.isAuth) {
      return res.status(401).send("Authentication Failed!!!");
    }
    const { admNum } = req.body;

    const query = `DELETE FROM student WHERE Admission_Number=${admNum}`;
    let result = await runConfig(query);
    return res.send(result);
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
