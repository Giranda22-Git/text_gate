require("./mount/dotenv.mount.js") 

async function init () {
  require("./mount/express.mount")
  require("./utils/handle_routes.util")
  require("./utils/listen_routes.util")

}

init ()
  .catch (error => {
    console.log(`[ERROR] in main [init] -> index.js: ${error}`)
  })
