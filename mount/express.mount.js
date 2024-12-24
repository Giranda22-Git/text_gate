const express = require("express")
const cors = require("cors")

global.express = express()
global.express.use(cors())
global.express.use(express.json())
global.express.use(express.urlencoded({ extended: true }))
