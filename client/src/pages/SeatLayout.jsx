import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { dummyShowsData, dummyDateTimeData } from '../assets/assets'
import { ArrowRightIcon, ClockIcon } from 'lucide-react'
import iosTimeFormat from '../lib/iosTimeFormat'

const SeatLayout = () => {

    const { id, date } = useParams()
    const [selectedSeats, setSelectedSeats] = useState([])
    const [selectedTime, setSelectedTime] = useState(null)
    const [show, setShow] = useState(null)
    const navigate = useNavigate()
    const getShow = async () => {
        const show = dummyShowsData.find(show => show._id === id)
        if (show) {
            setShow({
                movie: show,
                dateTime: dummyDateTimeData

            })
        }
    }
    useEffect(() => {
        getShow()
    }, [])

    return show ? (
        <div className='flex flex-col justify-center md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50' >
            {/* Available Timings */}
            <div className='w-80 bg-primary/10 border border-primary/20 rounded-1g py-10 h-max md:sticky md:top-30'>
                <p className='text-lg text-center font-semibold px-6'>Available Timings</p>
                <div className='mt-5 space-y-1'>
                    {show.dateTime[date].map((item) => (
                        <div key={item.time} onClick={() => setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ?
                            "bg-primary text-white" : "hover:bg-primary/20"}`}>
                            <ClockIcon className="w-4 h-4" />
                            <p className='text-sm'>{iosTimeFormat(item.time)}</p>
                        </div>
                    ))}
                </div >
            </div >

            {/*//////////// /seat Layout/ /////////*/}
            {/* <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
                <h1 className='text-2x1 font-semibold mb-4'>Select your seat</h1>
            </div> */}
            <div>
                <button onClick={() => navigate('/my-bookings')} className='ml-6 flex items-center gap-1 mt-20  px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer active:scale-95'>
                    Proceed to Checkout
                    <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
                </button>
            </div>


        </div >


    ) : (
        <Loading></Loading>
    )
}

export default SeatLayout
