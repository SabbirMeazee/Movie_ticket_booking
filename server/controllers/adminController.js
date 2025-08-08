import Booking from "../model/Booking";
import Show from "../model/Show";



// API to check if user is admin
export const isAdmin = async (req, res) => {
    res.json({ success: true, isAdmin: true })
}
// API to get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const bookings = await Booking.find({ isPaid: true });
        const activeShows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie');

        const tototalUser = await User.countDocuments()
    } catch (error) {

    }

}

