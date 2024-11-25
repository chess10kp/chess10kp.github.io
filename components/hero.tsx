import React from 'react'
import info from '@/siteConfig'


const Hero = () => {
  const standing = info.currentStanding()
  return (
    <section className="flex flex-col min-h-[80vh] items-center justify-center">
      <div className="font-light text-4xl">Hi, I'm Nitin</div>
      <div className='font-light text-sm'>{standing} at {info.personal.university} studying {info.personal.major}</div>
    </section>
  )
}

export default Hero
