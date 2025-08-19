const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  race: {
    type: String,
    enum: [
      "Human",
      "Mutant",
      "Meta-Human",
      "Alien",
      "Super Soldier",
      "Sorcerer",
      "Tech Genius",
      "Symbiote Host",
      "Atlantean",
      "Kryptonian",
      "Asgardian",
      "Speedster",
      "Time Traveler",
      "Android",
      "Shape Shifter",
      "Cosmic Entity",
      "Vigilante",
      "Dark Wizard",
      "Interdimensional Being",
      "Potato",
    ],
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
