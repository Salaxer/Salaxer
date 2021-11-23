import React from 'react'
import { useMediaQuery } from 'react-responsive'

const MediaQuery = () => {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 769px)'})
  const isBigScreen = useMediaQuery({ query: '(min-width: 538px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  if(isDesktopOrLaptop){
      return 'desktop';
  }

}

export default MediaQuery;