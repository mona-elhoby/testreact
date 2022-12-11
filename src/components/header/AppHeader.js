import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	CContainer,
	CHeader,
	CHeaderBrand,
	CHeaderDivider,
	CHeaderNav,
	CHeaderToggler,
	CNavLink,
	CNavItem,
	CDropdownHeader,
	CDropdownItem,
  CDropdown,
	CDropdownMenu,
	CDropdownToggle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilWindowMinimize } from '@coreui/icons';
import LanguageIcon from '@mui/icons-material/Language';

import { AppBreadcrumb } from '../sidebar/index';
import { AppHeaderDropdown } from './index';
import { set } from '../../store/reducers/sidebar';
import translation from "../../i18n/translate"

const AppHeader = props => {
	const dispatch = useDispatch();
	const sidebarShow = useSelector((state) => state.changeState.sidebarShow);


	return (
		<CHeader position="sticky" className="mb-4">
			<CContainer fluid>
				<CHeaderToggler className="ps-1" onClick={() => dispatch(set(sidebarShow))}>
					<div className="menueIcon">
						<CIcon icon={cilWindowMinimize} size="lg" className="firstIcon" />
						<CIcon icon={cilWindowMinimize} size="lg" className="firstIcon" />
						<CIcon icon={cilWindowMinimize} size="lg" className="firstIcon" />
					</div>
					{/* <CIcon icon={cilMenu} size="lg" /> */}
				</CHeaderToggler>
				<CHeaderBrand className="mx-auto d-md-none" to="/">
					<CIcon icon={'logo'} height={48} alt="Logo" />
				</CHeaderBrand>
				<CHeaderNav className="d-none d-md-flex me-auto">
					<CNavItem>
						<CNavLink to="/dashboard" component={NavLink}>
							{translation("dashboard")}
						</CNavLink>
					</CNavItem>
					{/* <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem> */}
				</CHeaderNav>
				<CHeaderNav>
						<CDropdown variant="nav-item">
							<CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
						<LanguageIcon style={{ opacity: '.3', marginTop: '5px' }} />
							</CDropdownToggle>
							<CDropdownMenu className="pt-0 change-language" placement="bottom-end">
      <CDropdownHeader className="fw-semibold py-2" onClick={props.handleArabicTheme}>العربيه</CDropdownHeader>
      <CDropdownHeader className="fw-semibold py-2" onClick={props.handleEnglishTheme}>English</CDropdownHeader>
							</CDropdownMenu>
						</CDropdown>
					<CNavItem>
						<CNavLink href="#">
							<CIcon icon={cilBell} size="lg" />
						</CNavLink>
					</CNavItem>
					<CNavItem>
						<CNavLink href="#">
							<CIcon icon={cilList} size="lg" />
						</CNavLink>
					</CNavItem>
					<CNavItem>
						<CNavLink href="#">
							<CIcon icon={cilEnvelopeOpen} size="lg" />
						</CNavLink>
					</CNavItem>
				</CHeaderNav>
				<CHeaderNav className="ms-3">
					<AppHeaderDropdown />
				</CHeaderNav>
			</CContainer>
			<CHeaderDivider />
			<CContainer fluid>
				<AppBreadcrumb />
			</CContainer>
		</CHeader>
	);
};

export default React.memo(AppHeader);
