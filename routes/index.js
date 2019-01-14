var express = require('express');
var router = express.Router();
var mysql = require('mysql')

var connection = mysql.createConnection({
  user : 'bfe1d90ceb4450',
  password : '27b2bfe1',
  database : 'heroku_2d311b4fd91c7df',
  host : 'eu-cdbr-west-02.cleardb.net'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res){
  res.render('register')
})

router.get('/match', function(req, res){
  res.render('match')
})

router.get('/teams', function(req, res){
  res.render('teams')
})

router.get('/favorites', function(req, res){
  res.render('favorites')
})

router.get('/detail', function(req, res){
  res.render('eventDetail')
})

router.get('/viewTeam', function(req, res){
  res.render('viewTeam')
})

router.get('/viewPlayer', function(req, res){
  res.render('viewPlayer')
})

router.post('/login', function(req, res){
  var username = req.body.username
  var password = req.body.password
  connection.query('SELECT id, username, password FROM useracc', null, function(e, result){
    if(e){
      res.send(500)
      throw e
    }else{
      for (let index = 0; index < result.length; index++) {
        if(username == result[index].username){
          if(password == result[index].password){
            return res.json({
              index : result[index].id
            })
          }
        }
      }
      return res.json({
        index : -1
      })
    }
  })
})

router.post('/register', function(req, res){
  var username = req.body.username
  var password = req.body.password
  var email = req.body.email
  connection.query('INSERT INTO useracc(username, password, email) VALUES (?,?,?)', 
  [username, password, email], function(e){
    if(e){
      res.send(500)
      throw error
    }else{
      return res.send(200)
    }
  })
})

router.post('/favTeam', function(req,res){
  var query = `SELECT favteam FROM useracc WHERE id =${req.body.id}`
  connection.query(query, null, function(e, result){
  if(e){
    res.send(500)
    throw e
  }else{
    var data = result[0].favteam
    var arr
    if(!data){
      arr = []
    }else{
      arr = JSON.parse(data)
    }
    arr.push(parseInt(req.body.index))
    data = JSON.stringify(arr)
    query = `UPDATE useracc SET favTeam = '${data}' WHERE id = ${req.body.id}`
    connection.query(query, function(e){
       return res.send(200)
      })
    }
  })
})

router.post('/favEvent', function(req, res){
  var query = `SELECT favEvent FROM useracc WHERE id =${req.body.id}`
  connection.query(query, null, function(e, result){
    if(e){
      res.send(500)
      throw e
    }else{
      var data = result[0].favEvent
      var arr
      if(!data){
        arr = []
      }else{
        arr = JSON.parse(data)
      }
      arr.push(parseInt(req.body.index))
      data = JSON.stringify(arr)
      query = `UPDATE useracc SET favEvent = '${data}' WHERE id = ${req.body.id}`
      connection.query(query, function(e){
        return res.send(200)
      })
    }
  })
})

router.post('/checkFav', function(req, res){
  if(req.body.status == 'team'){
    var query =  `SELECT favTeam FROM useracc WHERE id =${req.body.id}`
  }else{
    var query =  `SELECT favEvent FROM useracc WHERE id =${req.body.id}`
  }
  connection.query(query, null, function(e, result){
    if(e){
      res.send(500)
      throw e
    }else{
      if(req.body.status == 'team'){
        var data = result[0].favTeam
      }else{
        var data = result[0].favEvent
      }
      if(!data){
        return res.json({index : -1})
      }else{
        data = JSON.parse(data)
        for (let index = 0; index < data.length; index++) {
          if(req.body.index == data[index]){
            return res.json({index : index})
          }
        }
      }
      return res.json({index : -1})
    }
  })
})

router.post('/favList', function(req, res){
  if(req.body.status == 'event'){
    var query =  `SELECT favEvent FROM useracc WHERE id =${req.body.id}`
  }else{
    var query = `SELECT favTeam FROM useracc WHERE id =${req.body.id}`
  }
  connection.query(query, null, function(e, result){
    if(e){
      res.send(500)
      throw e
    }else{
      if(req.body.status == 'team'){
        var data = result[0].favTeam
      }else{
        var data = result[0].favEvent
      }
      if(!data){
        return res.json({index : -1})
      }else{
        data = JSON.parse(data)
        return res.json({
          index : 1,
          data : data
        })
      }
    }
  })
})

module.exports = router;
