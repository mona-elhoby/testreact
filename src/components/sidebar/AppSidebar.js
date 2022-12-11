import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import  AppSidebarNav  from './AppSidebarNav'

import Logo  from '../../assets/images/logo-letter.png'
import LogoLetter  from '../../assets/images/logo-dark-text.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import "./sidebar.css"

// sidebar nav config
import navigation from '../../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)
  // console.log("sidebarShow", sidebarShow)
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      // onVisibleChange={(visible) => {
      //   dispatch(set({ sidebarShow: visible }))
      // }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={Logo} width="20%" style={{display: "inline-block"}}/>
        <img src={LogoLetter} width="70%" style={{display: "inline-block"}}/>
      </CSidebarBrand>
      <CSidebarNav>
        <div className="d-block text-center mt-4">			
          <div className="image">
            <img src={require('../../assets/images/avatars/avatar-13.png')} alt="User Image" height="100%" width="100%"/>
          </div>
          <div className="info pt-15 mb-4">
            <a className="px-20 fs-18 fw-500" href="#" style={{color: '#5C607B'}}>Johen Doe</a>
          </div>
        </div>
        <SimpleBar className='mb-4'>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      <div className="mb-5 mt-5">
        <div className="text-center">;
          <img src="https://lawfirm-admin-template.multipurposethemes.com/images/svg-icon/color-svg/custom-17.svg" className="sideimg p-5" alt=""/>
          <div className='sidebarFooter'></div>
          {/* <h4 className="title-bx text-primary">حجز موعد</h4>
          <a href="#" className="py-10 fs-14 mb-0 text-primary">
            أفضل خدمه <i className="mdi mdi-arrow-right"></i>
          </a> */}
        </div>
      </div>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
