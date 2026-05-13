// This brings in the tools we downloaded
const express = require('express');
const cors = require('cors');

// This starts our kitchen
const app = express();

// This allows the kitchen to understand the orders
app.use(express.json());
app.use(cors());

// --- THE CHEF IS LISTENING HERE ---
// When the waiter brings an order to "/api/donations", do this:
app.post('/api/donations', (request, response) => {
    
    // 1. Read the ticket the waiter brought in
    const orderTicket = request.body;
    
    // 2. Print it to the screen so we can see it worked!
    console.log("DING! New Donation Arrived in the Kitchen:");
    console.log("Name:", orderTicket.name);
    console.log("Item:", orderTicket.item);
    
    // 3. Tell the waiter to go back and say "Thank You!"
    response.json({ 
        message: "The Kitchen received your donation successfully!" 
    });
});

// Turn on the open sign!
app.listen(3000, () => {
    console.log("The Fortis Kitchen is OPEN on port 3000!");
});