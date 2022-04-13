function logToDb(db){
  return (req, res, next) => {
    next()
    console.log("now")

    let logdata = {
      remoteaddr: req.ip || "",
      remoteuser: req.user || "",
      time: Date.now(),
      method: req.method || "",
      url: req.url || "",
      protocol: req.protocol || "",
      httpversion: req.httpVersion || "",
      secure: req.secure || "",
      status: res.statusCode || "",
      referer: req.headers['referer'] || "",
      useragent: req.headers['user-agent'] || ""
    }
  
  const dbInsert = (`INSERT INTO log 
      (remoteaddr, remoteuser, time, 
        method, url, protocol, 
        httpversion, secure, status, 
        referer, useragent) 
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const stmt = db.prepare(dbInsert)
    stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method,
      logdata.url, logdata.protocol, logdata.httpversion, logdata.secure, logdata.status,
      logdata.referer, logdata.useragent)
  
  }
}

module.exports = logToDb