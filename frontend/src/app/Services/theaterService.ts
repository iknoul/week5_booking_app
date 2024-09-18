import axios from "@/utils/axios";

// Define the type for the parameters
interface GetTheaterParams {
    theaterId: string; // Assuming theaterId is a required parameter for fetching a theater by ID
}

interface GetShowtimesParams {
    theaterId?: string;
    movieId?: string;
    date?: Date;
}

// Function to get theater by ID
export const getTheaterById = async ({ theaterId }: GetTheaterParams) => {
    try {
        // Build the request payload with the theaterId
        const payload = { id: theaterId };

        // Send the request to fetch the theater by ID
        const response = await axios.get('/theater/getTheater', { params:payload});
        console.log(response.data, 'Theater fetched by ID');

        // Return the data from the response
        return response.data;

    } catch (error) {
        console.log("Error fetching theater:", error);
        throw error; // Re-throw the error if needed for further handling
    }
};



// Function to get showtimes by theaterId, movieId, and date
export const getShowtimes = async ({ theaterId, movieId, date }: GetShowtimesParams) => {
    try {
        // Make an API call to get showtimes based on theaterId, movieId, and date
        const response = await axios.post('/theater/show-time', {
            theaterId, movieId, date 
        });
        
        console.log(response.data, 'Showtimes fetched by theater, movie, and date');

        // Return the data from the response
        return response.data;
    } catch (error) {
        console.log("Error fetching showtimes:", error);
        throw error;
    }
};

export const fetchSeatNumbers = async (seatIds: string[]) => {
    try {
        const response = await axios.get('/theater/seats', { params: { seatIds } });
        const seatNumbers = response.data.data;
        return seatNumbers;
    } catch (error) {
        console.error("Error fetching seat details:", error);
        return [];
    }
};
