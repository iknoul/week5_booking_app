# Movie Ticket Booking App (MERN Stack)

This application is a movie ticket booking platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, with user authentication via OAuth and mobile number OTP verification, a booking process, and WhatsApp integration for booking confirmations.

## Features

- **User Authentication with OAuth (SSO) and Mobile Number OTP Verification**
- **Two-Factor Authentication (2FA) via OTP**
- **Browse Available Movies (Public)**
- **Book Movie Tickets (Only for Logged-in Users)**
- **Select Seats**
- **Secure Payment Gateway**
- **Receive Booking Confirmation via WhatsApp**

## User Flow

### 1. User Authentication with OAuth (SSO) and Mobile Number OTP Verification

1. User visits the movie ticket booking website.
2. User clicks on the **Sign In** button.
3. The website redirects the user to an OAuth provider (e.g., Google, Facebook).
4. User grants permission for the app to access their basic profile information.
5. The OAuth provider authenticates the user and redirects them back to the website with an authorization code.
6. The website exchanges the authorization code for an access token and retrieves the user's profile information.
7. User is now prompted to verify their identity using their mobile number.
8. User enters their mobile number and receives an OTP via SMS.
9. User enters the OTP to verify their mobile number.
10. Upon successful OTP verification, the user is signed in to the website.

### 2. Two-Factor Authentication (2FA) via OTP

1. After signing in with OAuth, the website automatically triggers 2FA using OTP sent to the user's registered mobile number.
2. User enters the OTP sent via SMS.
3. Upon successful verification, the user gains full access to their account.

### 3. Viewing Available Movies (Public)

1. Any user (logged in or not) can navigate to the **Movies** section of the website.
2. A list of available movies is displayed with posters, titles, and brief descriptions.
3. Users can filter movies by genre, rating, or showtime.
4. Any user can click on a movie to view more details.

### 4. Selecting a Movie

1. User (logged in or not) views detailed information about the selected movie, including synopsis, cast, showtimes, and reviews.
2. Logged-in users can select a preferred showtime and proceed to book the movie.
3. Non-logged-in users will be prompted to log in to continue with booking.

### 5. Booking a Ticket (Only for Logged-in Users)

1. Logged-in users click the **Book Ticket** button for the chosen showtime.
2. The website prompts the user to choose the number of tickets.

### 6. Choosing a Seat

1. User is presented with a seat map of the theater.
2. User selects their desired seats from the available options.
3. User confirms their seat selection.

### 7. Making a Payment

1. Logged-in user is redirected to the payment page (using any payment gateway).
2. User enters payment details (credit card, debit card, or digital wallet).
3. The website securely processes the payment.
4. Upon successful payment, the user receives a payment confirmation message.

### 8. Receiving Booking Confirmation via WhatsApp

1. The website prompts the user to enter their WhatsApp number (if not already provided).
2. Booking details are sent to the user's WhatsApp number via an automated message.
3. User receives a confirmation message with booking details, including the movie title, showtime, seat number(s), and a QR code for ticket entry.

---

**Technologies Used**:  
- MongoDB  
- Express.js  
- Next.js  
- Node.js  
- OAuth (Google, Facebook)  
- Mobile Number OTP Verification  
- WhatsApp API for booking confirmation  

**Payment Gateway**: Any secure payment gateway.

---

### Installation & Setup

1. Clone the repository:  
   ```bash
   git clone <repository_url>
