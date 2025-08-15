import React from 'react'
import siteConfig from "@/siteConfig"

const Footer = () => {
  return (
    <footer className="py-6 dark:border-border bg-transparent text-end backdrop-blur-xl">
      <div className="container items-center justify-between gap-4 md:flex-row">
        <p className="text-balance geist text-center text-sm leading-loose text-muted-foreground">
          Built by{" "}
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {siteConfig.personal.name}
          </a>. 
          The source is on <a className='underline underline-offset-4' href="https://github.com/chess10kp/chess10kp.github.io">Github</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer