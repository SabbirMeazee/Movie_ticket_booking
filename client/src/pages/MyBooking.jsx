import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { dummyBookingData } from '../assets/assets'
import { dateFormat } from '../lib/dateFormat'
import { useAppContext } from '../context/AppContext'

const MyBooking = () => {
    const currency = import.meta.env.VITE_CURRENCY

    const { axios, getToken, user, image_bage_url } = useAppContext()

    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getMyBookings = async () => {
        try {
            const { data } = await axios.get('/api/user/bookings', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if (data.success) {
                setBookings(data.bookings)

            }
        } catch (error) {
            console.log(error)

        }
        setIsLoading(false)
    }

    useEffect((user) => {
        if (user) {

            getMyBookings()
        }
    }, [user])

    return !isLoading ? (
        <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
            <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

            {bookings.map((item, index) => (
                <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-1g mt-4 p-2 max-w-3x1'>
                    <div className='flex flex-col md:flex-row'>
                        <img src={image_bage_url + item.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
                        <div className='flex flex-col p-4'>
                            <p className='text-lg font-semibold'>{item.show.movie.title}</p>
                            <p className='text-gray-400 text-sm'>{item.show.movie.runtime}min</p>
                            <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
                        <div className='flex flex-col gap-4'>
                            <p className='text-2x1 font-semibold mb-3'>{currency}{item.amount}</p>
                            {!item.isPaid && <button className='bg-primary px-4 py-1.5 mb-3
text-sm rounded-full font-medium cursor-pointer'>Pay Now</button>}
                        </div>

                    </div>


                </div>
            ))}
        </div>
    ) : (
        <Loading></Loading>
    )
}

export default MyBooking
