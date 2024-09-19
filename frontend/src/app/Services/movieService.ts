import axios from "@/utils/axios";
// Define the type for the parameters
interface GetMoviesParams {
    genre?: string;
    rating?: number; // Assuming rating is a number for filtering
    theater?: string;
    sortByRating?: boolean;
    date?:string;
    limit?: number;
    title?: string;
    id?:string;
}

export const getMoviesByFilter = async ({ title, genre, rating, theater, sortByRating, limit, date}: GetMoviesParams) => {
    try {

        // Build the request payload
        const payload: any = {};
        if (genre) {
            payload.genre = genre;
        }
        if (rating !== undefined) {
            payload.rating = rating;
        }
        if (theater !== undefined) {
            payload.theaterName = theater;
        }
        if (sortByRating !== undefined) {
            payload.sortByRating= sortByRating;
        }
        if(limit) {
            payload.limit = limit
        }
        if(title) {
            payload.title = title

        }
        if(date) {
            payload.showDate = date
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
