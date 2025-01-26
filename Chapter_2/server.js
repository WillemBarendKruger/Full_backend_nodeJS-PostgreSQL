const express = require("express");
const { request } = require("http");
const app = express();
const PORT = 8585;


const data = ["willem"]

// Middleware
app.use(express.json())


// app.get("/", (request, response) => {
//     console.log("YES i hit an endpoint", request.method);
//     response.sendStatus(201);
// })


// Website endpoints (these are for sending html, useally come when a user enters a url in the browser)

app.get("/", (request, response) => {
    response.send(`
        <body style = "background: pink; color:blue;">
        <h1>Data:</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Dashboard</a>
        </body>
        `);
});

app.get("/dashboard", (request, response) => {
    response.send(`
        <body>
            <h1>Dashboard</h1>
            <a href="/">Home</a>
        </body>
        `)
});



// API endpoints (non visual)

//GRUD-method - CREATE = post, READ = get, UPDATE = put, DELETE = delete

app.get("/api/data", (request, response) => {
    console.log("this is for data");
    response.status(599).send(data);
});

app.post("/api/data", (request, response) => {
    //wants to create a user by pressing button
    const newEntry = request.body;
    console.log(newEntry);
    data.push(newEntry.name)
    response.sendStatus(201);
});

app.delete("/api/data", (request, response) => {
    data.pop();
    console.log("We have deleted the element at the end op the array");
    response.sendStatus(202)
})

app.listen(PORT, () => console.log(`The server started on http://localhost:${PORT}`));