import { useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'

const TrailersSection = () => {

    const [currentTrailer] = useState(dummyTrailers[0])

    return (
        <div className='px-6 md:px-16 lg:px-24 x1:px-44 py-20 overflow-hidden'>
            <p className='text-gray-300 font-medium text-lg max-w-[960px]
mx-auto'>Trailers</p>

            <div className='relative mt-6'>
                <ReactPlayer src={currentTrailer.videoUrl} controls={false} className="mx-auto max-w-full" width="960px" height="540px" />

            </div>
        </div>
    )
}

export default TrailersSection
