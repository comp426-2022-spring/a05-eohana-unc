// Configuration goes here
data =  {
  db: {
    log: {
      path: './data/db/log.db',
      tables: [
        {
          name: 'log',
          columns: {
            id: "INTEGER PRIMARY KEY",
            remoteaddr: "TEXT",
            remoteuser: "TEXT",
            time: "INTEGER",
            method: "TEXT",
            url: "TEXT",
            protocol: "TEXT",
            httpversion: "TEXT",
            secure: "TEXT",
            status: "INTEGER",
            referer: "TEXT",
            useragent: "TEXT"
          }
        }
      ]
    }
  },
  logfiles: {
    access: {
      path: './data/log/access.log'
    }
  },
  statics: {
    help: {
      path: './static/help.txt'
    },
    public: {
      path: './public'
    }
  }
  
}


module.exports = data