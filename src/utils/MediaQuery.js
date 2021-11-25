import { useMediaQuery } from 'react-responsive'

const MediaQuery = () => {

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 650px)' })
  if (isTabletOrMobile) {
    return 'mobile';
  }else{
    return 'desktop'
  }
}

export default MediaQuery;