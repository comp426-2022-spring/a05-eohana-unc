// Configuration goes here
const config = {
  data: {
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
    }
  }
}

module.exports = config