// Configuration goes here
const config = {
  modules: {
    db: 'services/database.js',
    utils: 'utils/utilities.js',
    middleware: 'middleware/mymiddleware.js',
    data: 'config/data.config.js',
    routes: 'routes/routes.js',
    controllers: 'controllers/mycontrollers.js'
  }
}

module.exports = config