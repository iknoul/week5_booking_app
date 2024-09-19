const mongoose = require('mongoose');
const Showtime = require('../src/modules/Theater/models/show-time-schema'); // Adjust path as needed

// Function to delete outdated showtimes
const deleteOutdatedShowtimes = async () => {
  try {
    const result = await Showtime.deleteMany({
      date: { $lt: new Date().toISOString().split('T')[0] }
    });
    console.log(`Deleted ${result.deletedCount}  outdated showtimes.`);
  } catch (error) {
    console.error('Error deleting outdated showtimes:', error);
  }
};

// Export the function for external use
module.exports = deleteOutdatedShowtimes;
