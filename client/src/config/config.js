
let api_port = 1111

if(process.env.NODE_ENV === 'development'){
  api_port = 3001
} else if(process.env.NODE_ENV === 'production'){
  api_port = process.env.REACT_APP__EXPRESS_API_PORT
}

module.exports = {

  EXPRESS_API_IP: process.env.REACT_APP__EXPRESS_API_IP || "http://localhost",
  EXPRESS_API_PORT: api_port || 3001,
}