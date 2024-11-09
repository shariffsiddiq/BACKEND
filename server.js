const express = require("express");
let app = express();
app.use(express.urlencoded({ extended: true }));  // Middleware to parse form data
const activities = require('./models/activities');
  // Importing the activities model
let methodOverride = require("method-override");

app.use(methodOverride('_method'));
app.set("view engine", "ejs");

// Route to display all activities
app.get("/activities", async (req, res) => {
    try {
        let allActivities = await activities.find({});  // Fetch all activities from the database
        res.render("activities.ejs", { allActivities });  // Render the list of activities
    } catch (err) {
        res.status(500).send("Error fetching activities: " + err);
    }
});

// Route to create a new activity
app.post("/activities", async (req, res) => {
    let { name, caloriesBurned, duration } = req.body;
    try {
        await activities.create({
            name: name,
            caloriesBurned: caloriesBurned,
            duration: duration
        });
        res.redirect('/activities');  // Redirect to the list of activities after creation
    } catch (err) {
        res.status(500).send("Error creating activity: " + err);
    }
});

// Route to show the form for creating a new activity
app.get("/activities/new", (req, res) => {
    res.render("form.ejs");  // Render the form for creating a new activity
});

// Route to show the form to edit an activity
app.get("/activities", async (req, res) => {
    try {
        let allActivities = await activities.find({});  // Fetch all activities from the database
        res.render("activities.ejs", { AllActivities: allActivities });  // Corrected variable name
    } catch (err) {
        res.status(500).send("Error fetching activities: " + err);
    }
});


// Route to update an activity
app.put("/activities/:id", async (req, res) => {
    let { id } = req.params;
    let { name, caloriesBurned, duration } = req.body;
    try {
        await activities.findByIdAndUpdate(id, {
            name: name,
            caloriesBurned: caloriesBurned,
            duration: duration
        });
        res.redirect('/activities');  // Redirect to the list of activities after updating
    } catch (err) {
        res.status(500).send("Error updating activity: " + err);
    }
});

// Route to delete an activity
app.delete("/activities/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await activities.findByIdAndDelete(id);  // Delete the activity by ID
        res.redirect("/activities");  // Redirect to the list of activities after deletion
    } catch (err) {
        res.status(500).send("Error deleting activity: " + err);
    }
});

// Start the server on port 3030
app.listen(3030, () => {
    console.log("Server started on port 3030");
});
