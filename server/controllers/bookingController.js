import Booking from "../model/Booking.js";
import Show from "../model/Show.js";

export const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { showId } = req.body;
        const { origin } = req.headers;

        const showData = await Show.findById(showId).populate('movie')

        // Create a new booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice
        })
        await showData.save()
        //Stripe gateway initialize
        res.json({ success: true, message: 'Booked sucessfully' })

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get the show details
