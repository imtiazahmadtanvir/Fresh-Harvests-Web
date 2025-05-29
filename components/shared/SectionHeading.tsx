import type React from "react"

interface SectionHeadingProps {
  subheading: string
  heading: string
  paragraph: string
  className?: string
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ subheading, heading, paragraph, className = "" }) => {
  return (
    <div className={`text-center max-w-3xl mx-auto ${className}`}>
      <p className="text-green-600 font-medium text-lg mb-2">{subheading}</p>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
      <p className="text-gray-600 leading-relaxed text-base md:text-lg">{paragraph}</p>
    </div>
  )
}

export default SectionHeading