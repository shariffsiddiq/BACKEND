const mongoose = require('mongoose');

// Connect to MongoDB (without deprecated options)
main().then(() => {
    console.log("MongoDB connected for Activities");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/activityDB');  // No need for useNewUrlParser or useUnifiedTopology
}

main();  // Call the connection function

// Define the Activity schema
const activitySchema = mongoose.Schema({
    name: { type: String, required: true },  // Name of the activity
    caloriesBurned: { type: Number, required: true },  // Calories burned during the activity
    duration: { type: Number, required: true }  // Duration of the activity in minutes
}, { timestamps: true });  // Optionally, add timestamps to automatically include `createdAt` and `updatedAt`

// Create a model based on the schema
const Activity = mongoose.model('Activity', activitySchema);

// Export the model for use in other files
module.exports = Activity;
