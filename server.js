// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [];
const waitlist = [];



const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
        let custName = document.getElementById("custName").value.trim()
        let custEmail = document.getElementById("custEmail").value.trim()
        let custPhone = document.getElementById("custPhone").value.trim()
        let custID = document.getElementById("custID").value.trim()
        let customerInfo = {
            name: custName,
            email: custEmail,
            phone: custPhone,
            id: custID
        }
        fetch('/api/characters', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerInfo),
          })
            .then((response) => response.json())
            .catch((error) => {
              console.error('Error:', error);
            });
        if (tables.length > 5) {
            tables.push(customerInfo);
        } else {
            waitlist.push(customerInfo);
        }
});

app.post('/api/characters', (req, res) => {
    const newCustomer = req.body;
    newCustomer.routeName = newCustomer.name.replace(/\s+/g, '').toLowerCase();
    console.log(newCustomer);
    res.json(newCustomer);
});

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, 'reserve.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

// Displays all characters
app.get('/api/tables', (req, res) => res.json(tables));
app.get('/api/waitlist', (req, res) => res.json(waitlist));



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));