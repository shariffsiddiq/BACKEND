const mongoose = require('mongoose');

// Connect to MongoDB (without deprecated options)
main().then(() => {
    console.log("MongoDB connected for Activities");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://shariffsiddiq1975:<shariffsiddiq1975>@cluster0.vhlh6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');  // No need for useNewUrlParser or useUnifiedTopology
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
