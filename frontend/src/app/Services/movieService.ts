import axios from "@/utils/axios";
// Define the type for the parameters
interface GetMoviesParams {
    genre?: string;
    rating?: number; // Assuming rating is a number for filtering
    sortByRating?: boolean;
    limit?: number;
    title?: string;
}

export const getMoviesByFilter = async ({ title, genre, rating, sortByRating, limit}: GetMoviesParams) => {
    try {
        // Build the request payload
        const payload: any = {};
        if (genre) {
            payload.genre = genre;
        }
        if (rating !== undefined) {
            payload.rating = rating;
        }
        if (sortByRating !== undefined) {
            payload.sortByRating = -1;
        }
        if(limit) {
            payload.limit = limit
        }
        if(title) {
            payload.title = title

        }

        // Send the request with the filter payload
        const response = await axios.post('/movie/getMovie', payload);
        console.log(response.data, 'here sort by rate');

        // Return the data from the response
        return response.data?.data;

    } catch (error) {
        console.log("Error fetching movies:", error);
    }
}
