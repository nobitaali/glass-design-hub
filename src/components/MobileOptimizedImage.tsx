"use client"

import Image from 'next/image'
import { useState } from 'react'

interface MobileImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  width?: number
  height?: number
  fill?: boolean
}

export const MobileOptimizedImage = ({
  src,
  alt,
  className,
  priority = false,
  width = 800,
  height = 600,
  fill = false
}: MobileImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // If fill is true, don't use width/height
  // If fill is false, use provided width/height or defaults
  const imageProps = fill
    ? { fill, width: undefined, height: undefined }
    : { width, height, fill: false }
  
  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <Image
        src={src}
        alt={alt}
        className={`object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={priority ? 85 : 65}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        unoptimized={true}
        {...imageProps}
      />
    </div>
  )
}
