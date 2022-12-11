import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/sidebar/index'

const DefaultLayout = props => {
  return (
    <div className={document.body.getAttribute("dir") == 'ltr' ? 'enTextLeft' : null}>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader handleArabicTheme={props.handleArabicTheme} handleEnglishTheme={props.handleEnglishTheme}/>
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        {/* <AppFooter /> */}
      </div>
    </div>
  )
}

export default DefaultLayout
