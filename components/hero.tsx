import React from 'react'
import info from '@/siteConfig'


const Hero = () => {
  const standing = info.currentStanding()
  return (
    <section className="flex mx-16 flex-col min-h-[80vh] items-center justify-center">
      <div className="font-light text-4xl">Hi, I'm Nitin</div>
      <div className='font-light text-sm'>{info.personal.major} major at {info.personal.university}</div>
    </section>
  )
}

export default Hero
