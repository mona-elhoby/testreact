import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilAccountLogout
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import avatar8 from './../../assets/images/avatars/2.jpg'
import {Logout} from '../../store/reducers/auth'
import translation from "../../i18n/translate"

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const handleLogout = () => {
    dispatch(Logout()).then(() =>{ 
      Navigate('/login')
      localStorage.removeItem('dir')
      localStorage.removeItem('locale')
    })
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
      <CDropdownHeader className="bg-light fw-semibold py-2">{translation("profile")}</CDropdownHeader>
        
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" style={{color: 'red'}}/>
          {translation("logout")} 
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
