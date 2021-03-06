const modUser = require("../models/user")
const response = require("./response")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
module.exports = {
  signUp: (rq, rs) => {
    const data = {
      username: rq.body.username,
      email: rq.body.email,
      password: bcrypt.hashSync(rq.body.password, 8),
      role_id: rq.body.role_id
    }
    modUser
      .getUserDuplicate(data)
      .then(res => {
        if (res.length == 0) {
          // console.log('a')
          return modUser.signUp(data)
        } else {
          return response.response(
            rs,
            "USERNAME or Email has already been taken, PLZ use another email or username",
            409
          )
        }
      })
      .then(res => response.response(rs, "Register Success", 200, res))
      .catch(err => console.error(err))
  },
  signIn: (rq, rs) => {
    const param = rq.body.email
    const password = rq.body.password

    modUser
      .signIn(param)
      .then(res => {
        if (res.length > 0) {
          const dbPassword = res[0].password
          const result = bcrypt.compareSync(password, dbPassword)
          if (result) {
            const token = jwt.sign(
              {
                id: res[0].id,
                role: res[0].role,
                email: res[0].email
              },
              process.env.SECRET_KEY,
              {
                expiresIn: 86400 // expires in 24 hours
              }
            )
            const val = {
              id: res[0].id,
              role: res[0].role,
              email: res[0].email,
              auth: true,
              accessToken: token
            }
            // console.log(process.env.SECRET_KEY);
            return response.response(rs, "Login Success", 200, val)
          } else {
            return response.response(rs, "Invalid Password", 403)
          }
        } else {
          return response.response(rs, "Username or email not found", 404)
        }
      })
      .catch(err => console.error(err))
  },
  getData: (rq, rs) => {
    modUser
      .getUser()
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  },
  getbyId: (rq, rs) => {
    const id = rq.params.id
    modUser
      .getUserById(id)
      .then(res => response.response(rs, "Success", 200, res))
      .catch(err => console.log(err))
  }
}
