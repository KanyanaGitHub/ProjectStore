const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const port = 3000;
const all_data = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

const db = new sqlite3.Database('./database/data.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
});


app.get('/main.html', (req, res) => {
  res.sendFile(__dirname + '/model/main.html');
});

app.get('/block1.html', (req, res) => {
  res.sendFile(__dirname + '/model/dataItem.html');
});

app.get('/project.html', (req, res) => {
  res.sendFile(__dirname + '/model/main.html');
});


app.get('/puts_data', (req, res) => {
  const f_name = req.query.f_name;
  const l_name = req.query.l_name;
  const faculty = req.query.faculty;
  const p_id = req.query.p_id;

  let data = [f_name, l_name, faculty, p_id];
  console.log("register success");
  all_data.push(data);
  res.sendFile(__dirname + '/model/main.html');
});

app.get('/item',(req, res) =>{
  const oscilloscope = req.query.oscilloscope;
  const power_supply = req.query.power_supply;
  const function_generator = req.query.function_generator;
  const soldering_iron = req.query.soldering_iron;
  const digital_meter = req.query.digital_meter;
  const breadboard = req.query.breadboard;


  let item = [oscilloscope,power_supply,function_generator,soldering_iron,digital_meter,breadboard];
  all_data.push(item);
  const combinedData = all_data.reduce((acc, cur) => acc.concat(cur), []);
  console.log(combinedData);
  const sql = `INSERT INTO User(first_name, last_name, faculty, personal_id, oscilloscope, power_supply, function_gen, soldering_iron, digital_meter, breadboard) VALUES(?,?,?,?,?,?,?,?,?,?)`;
  db.run(sql, combinedData, function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error inserting data into User table.');
    } else {
      console.log(`Rows inserted: ${this.changes}`);
    }
  });

  res.sendFile(__dirname + '/madel/dataItem.html');
  all_data.length = 0;
});

app.get('/show', (req, res) => {
  db.all("SELECT * FROM User", [], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal server error');
    } else {
      res.send(rows);
    }
  });
});

app.delete('/delete', (req, res) => {
  const id = req.body.id;
  db.run('DELETE FROM User WHERE id = ?', id, function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error deleting data from database');
    } else {
      console.log(`Row with ID ${id} deleted from database`);
      res.json({ success: true });
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
