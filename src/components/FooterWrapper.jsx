'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function FooterWrapper() {
  const pathname = usePathname()

  // Example: pathname might be '/en/create-post' or '/fr/create-post'
  const isCreatePostPage = pathname?.match("/create-post")
  
  return (
    <div className="footerwrapper">
      {!isCreatePostPage ? <Footer /> : null}
    </div>
  )
}
