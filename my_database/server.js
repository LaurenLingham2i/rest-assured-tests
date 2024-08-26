const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

const dataFilePath = "./people.json";

let people = JSON.parse(fs.readFileSync(dataFilePath));

app.get('/', (req, res) => {
    res.send('Welcome to the People API!');
});

// Get all people
app.get("/people", (req, res) => {
    res.status(200).json(people);
});

// Get one person by ID
app.get("/people/:id", (req, res) => {
    const person = people.find(p => p.id === req.params.id);
    if (person) {
        res.status(200).json(person);
    } else {
        res.status(404).send("Person not found");
    }
});

// Create a new person
app.post("/people", (req, res) => {
    const newPerson = req.body;
    people.push(newPerson);
    fs.writeFileSync(dataFilePath, JSON.stringify(people, null, 2));
    res.status(201).json(newPerson);
});

// Update a person's full name (PATCH)
app.patch("/people/:id", (req, res) => {
    const person = people.find(p => p.id === req.params.id);
    if (person) {
        person.fullName = req.body.fullName;
        fs.writeFileSync(dataFilePath, JSON.stringify(people, null, 2));
        res.status(200).json(person);
    } else {
        res.status(404).send("Person not found");
    }
});

// Update a person completely (PUT)
app.put("/people/:id", (req, res) => {
    const index = people.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        people[index] = req.body;
        fs.writeFileSync(dataFilePath, JSON.stringify(people, null, 2));
        res.status(200).json(people[index]);
    } else {
        res.status(404).send("Person not found");
    }
});

// Delete a person
app.delete("/people/:id", (req, res) => {
    const index = people.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        people.splice(index, 1);
        fs.writeFileSync(dataFilePath, JSON.stringify(people, null, 2));
        res.status(200).send("Person deleted");
    } else {
        res.status(404).send("Person not found");
    }
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
