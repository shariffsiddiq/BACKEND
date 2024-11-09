const mongoose = require('mongoose');

// Connect to MongoDB using an environment variable for security
async function main() {
    try {
        await mongoose.connect("mongodb+srv://shariffsiddiq1975:<shariffsiddiq1975>@cluster0.vhlh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");  // Use environment variable for the connection string
        console.log("MongoDB connected for Activities");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

main();  // Call the connection function

// Define the Activity schema
const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },  // Name of the activity
    caloriesBurned: { type: Number, required: true },  // Calories burned during the activity
    duration: { type: Number, required: true }  // Duration of the activity in minutes
}, { timestamps: true });  // Automatically include `createdAt` and `updatedAt`

// Create a model based on the schema
const Activity = mongoose.model('Activity', activitySchema);

// Export the model for use in other files
module.exports = Activity;
