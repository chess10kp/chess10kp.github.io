import React from 'react'
import siteConfig from "@/siteConfig"

const Footer = () => {
  return (
    <footer className="py-6 dark:border-border text-end">
      <div className="container items-center justify-between gap-4 md:flex-row">
        <p className="text-balance text-sm leading-loose text-muted-foreground">
          Built by{" "}
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {siteConfig.personal.name}
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
