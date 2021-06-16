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
        if (tables.length > 5) {
            tables.push(customerInfo);
        } else {
            waitlist.push(customerInfo);
        }
}


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
