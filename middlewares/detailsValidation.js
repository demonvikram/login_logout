const validation = async (req, res, next) => {
  try {
    let { username, firstname, lastname, age, email, password } = req.body;

    //length validation
    if (
      age < 18 ||
      username.length > 10 ||
      firstname.length > 15 ||
      lastname.length > 15 ||
      password.length > 10 ||
      email.length <20
    ) {
      return res.status(400).json({
        message: "bad request",
      });
    }

    //empty string validation

    if (
      age == null ||
      username == "" ||
      firstname == "" ||
      lastname == "" ||
      password == "" ||
      email == ""
    ) {
      return res.status(402).json({
        message: "Some data fields are missing",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

const validLogin = async (req, res, next) => {
  try {
    const email = req.body.mail;
    if (email.length > 30 || email == "") {
      return res.status(401).json({
        message: "invalid username",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = { validation ,validLogin };
