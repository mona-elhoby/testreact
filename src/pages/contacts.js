import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CCol, CContainer, CRow, CCard, CFormInput, CCardHeader, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilList, cilPeople, cilUserX, cilX, cilPlus, cilMinus } from '@coreui/icons';
import { MDBDataTable, MDBInput } from 'mdbreact';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MuiAlert from '@mui/material/Alert';
import OutlinedInput from '@mui/material/OutlinedInput';
import PeoplesIcon from '@rsuite/icons/Peoples';
import PeopleBranchIcon from '@rsuite/icons/PeopleBranch';
import PeoplesMapIcon from '@rsuite/icons/PeoplesMap';
import PeopleFliterIcon from '@rsuite/icons/PeopleFliter';
import { Theme, useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import {  useIntl } from "react-intl";
import ListIcon from '@mui/icons-material/List';

import Avatar from '../assets/images/avatar/2.jpg';
import { getContacts, addNewContact } from '../store/reducers/contacts';
import { NationalityConstant, CompanyTypeConstant } from '../components/contact/contact';
import '../components/contact/contact.css';
import ReturnedPopup from '../components/contact/popup';
import translation from "../i18n/translate"


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
function getStyles(name, personName, theme) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}
const Contacts = () => {
	const [allCriteria, setAllCriteria] = useState('');
	const [editCriterai, setEditCriterai] = useState('');
	const [visible, setVisible] = useState(false);
	const [checkbox1, setCheckbox1] = useState('');
	const [active, setActive] = useState('all');
	const [anchorEl, setAnchorEl] = React.useState('');
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [classifiedName, setClassifiedName] = useState([]);
	const [nameSearch, setNameSearch] = useState('');
	const [categorySearch, setCategorySearch] = useState('');
	const [phoneSearch, setPhoneSearch] = useState('');
	const [mobileSearch, setMobileSearch] = useState('');
	const [emailSearch, setEmailSearch] = useState('');
	const [addressSearch, setAddressSearch] = useState('');
	const [searchVal, setSearchVal] = useState('');
	const [constantAdd, setConstantAdd] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [page, setId] = useState(1);
	const [pageSearch, setPageSearch] = useState(null);
	const theme = useTheme();
	const { formatMessage } = useIntl();
	const names = [formatMessage({id: "address"}), formatMessage({id: "email"}), formatMessage({id: "mobile"}), formatMessage({id: "telephone"}), formatMessage({id: "category"}),  formatMessage({id: "name"})];

	const dispatch = useDispatch();
	const { allContacts, profile } = useSelector((state) => state.contact);

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => setAnchorEl(null);

	useEffect(() => {
		dispatch(getContacts({ theParams: null })).then((res) => setAllCriteria(res.payload));
	}, [dispatch]);

	const getAllContacts = () => {
		setActive('all');
		dispatch(getContacts({ theParams: null })).then((res) => setAllCriteria(res.payload));
	};

	const getClientsContacts = () => {
		setId(1)
		setActive('clients');
		dispatch(getContacts({ theParams: { classification0: 1 } })).then((res) => setAllCriteria(res.payload));
	};

	const getAntsContacts = () => {
		setId(1)
		setActive('ants');
		dispatch(getContacts({ theParams: { classification0: 7 } })).then((res) => setAllCriteria(res.payload));
	};

	const getAntsLawersContacts = () => {
		setId(1)
		setActive('antsLawers');
		dispatch(getContacts({ theParams: { classification0: 4 } })).then((res) => setAllCriteria(res.payload));
	};

	const getTheClientsContacts = () => {
		setId(1)
		setActive('theClients');
		dispatch(getContacts({ theParams: { classification0: 2 } })).then((res) => setAllCriteria(res.payload));
	};

	const getGenuisContacts = () => {
		setId(1)
		setActive('genuis');
		dispatch(getContacts({ theParams: { classification0: 5 } })).then((res) => setAllCriteria(res.payload));
	};

	const exitSelectModal = () => {
		setVisible(false);
		setEditCriterai(null);
	};

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 },
		},
	};

	// close snack alert
	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenEditSnack(false);
		setOpenAddSnack(false);
	};

	const openAddPopup = () => {
		setVisible(true);
	};

	const contactData = (data) =>
		data?.map((criteria, i) => {
			return {
				id: (
					<>
						<span className="borderContact"></span>
						{criteria?.cli_category == 1 ? (
							<>
								<span className="company"></span>
								<small className={document.body.getAttribute('dir') == 'rtl' ? 'arCategory': 'enCategory'}>{translation('company')}</small>
							</>
						) : criteria?.cli_category == 2 ? (
							<>
								<span className="branch"></span>
								<small className={document.body.getAttribute('dir') == 'rtl' ? 'arCategory': 'enCategory'}>{translation('branch')}</small>
							</>
						) : (
							<>
								<span className="user"></span>
								<small className={document.body.getAttribute('dir') == 'rtl' ? 'arCategory': 'enCategory'}>{translation('individual')}</small>
							</>
						)}
						<Link to={`/Profile/${criteria?.CLI_ID_PK}`} key={i} style={{ display: 'flex' }}>
							<img src={Avatar} width="100%" style={{ marginRight: '10px' }} />
							<div className="name-phone">
								<strong>{document.body.getAttribute('dir') == 'ltr' && criteria.CLI_NAME_ENGLISH ? criteria.CLI_NAME_ENGLISH : criteria.CLI_NAME }</strong>
								<br />
								<small>{criteria?.CLI_MOBILE ? criteria?.CLI_MOBILE?.split(',')[0] : null}</small>
							</div>
						</Link>
						<IconButton
							aria-label="settings"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
							className={document.body.getAttribute("dir") == 'ltr' ? 'enBtn' : null}
						>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button',
							}}
						>
							<MenuItem onClick={handleClose}>
								<Link to={`/Profile/${criteria?.CLI_ID_PK}`}>{translation('profile')}</Link>
							</MenuItem>
							{/* <MenuItem onClick={handleClose}>تعديل </MenuItem> */}
							{/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
						</Menu>
					</>
				),
			};
		});

	const data = {
		columns: [
			{
				label: '',
				field: 'id',
				sort: 'asc',
				width: 50,
			},
		],
		rows: pageSearch ? contactData(pageSearch) : allCriteria?.data?.length > 0 ? contactData(allCriteria.data) : [],
	};

	const handleChangeClassification = React.useMemo(
		() => (event) => {
			const {
				target: { value },
			} = event;
			setClassifiedName(typeof value === 'string' ? value.split(',') : value);
		},
		[classifiedName, searchVal, nameSearch, categorySearch, phoneSearch, emailSearch, addressSearch, mobileSearch]
	);

	const classifiedFun = React.useCallback(() => {
		dispatch(
			getContacts({
				theParams: {
					nameSearch: nameSearch ? nameSearch : undefined,
					categorySearch: categorySearch ? categorySearch : undefined,
					phoneSearch: phoneSearch ? phoneSearch : undefined,
					emailSearch: emailSearch ? emailSearch : undefined,
					addressSearch: addressSearch ? addressSearch : undefined,
					mobileSearch: mobileSearch ? mobileSearch : undefined,
					searchVal: searchVal ? searchVal : undefined,
				},
			})
		).then((res) => setAllCriteria(res.payload));
	}, [classifiedName, searchVal, nameSearch, categorySearch, phoneSearch, emailSearch, addressSearch, mobileSearch]);

	const handelSearchbtn = React.useMemo(
		() => (e) => {
			if (e.key === 'Enter') {
				setPageSearch(null);
				classifiedFun();
			}
		},
		[classifiedName, searchVal, nameSearch, categorySearch, phoneSearch, emailSearch, addressSearch, mobileSearch]
	);

	const searchByChar = (e) => {
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setPageSearch(null);
		} else {
			const newClassifiedArr = allCriteria?.data?.filter((ele) =>
				Object.values(ele).find((ele2) =>
					typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
				)
			);
			setPageSearch(newClassifiedArr);
		}
	};

	const closeClassificationCriteria = () => {
		setClassifiedName([]);
		setNameSearch(undefined);
		setCategorySearch(undefined);
		setPhoneSearch(undefined);
		setMobileSearch(undefined);
		setEmailSearch(undefined);
		setAddressSearch(undefined);
		dispatch(
			getContacts({
				theParams: null,
			})
		).then((res) => setAllCriteria(res.payload));
	};

	const handelChangePgae = React.useCallback(
		(e, val) => {
			setId(val);
			dispatch(
				getContacts({
					theParams: {
						offset: (val - 1) * 10,
						classification0:
							active == 'clients'
								? 1
								: active == 'ants'
								? 7
								: active == 'antsLawers'
								? 4
								: active == 'theClients'
								? 2
								: active == 'genuis'
								? 5
								: undefined,
					},
				})
			).then((res) => setAllCriteria(res.payload));
		},
		[page]
	);

	const pagesNum = allCriteria?.total ? Math.ceil(allCriteria.total / 10) : 1;
	return (
		<div className="contacts">
			<CContainer>
				<div className="headerFiles">
					<div>
						<CButton className="add-contact" onClick={openAddPopup}>
							<CIcon style={{ height: '25px' }} className="icon" customClassName="nav-icon" icon={cilPlus} />
						</CButton>
						<FormControl sx={{ m: 1, width: 300, mt: 3 }} className="classified">
							<Select
								multiple
								displayEmpty
								value={classifiedName}
								onChange={handleChangeClassification}
								input={<OutlinedInput />}
								renderValue={(selected) => {
									if (selected.length === 0) {
										return <span>{formatMessage({id: 'classification'})} </span>;
									}

									return selected.join(', ');
								}}
								MenuProps={MenuProps}
								inputProps={{ 'aria-label': 'Without label' }}
							>
								<MenuItem disabled value="">
								</MenuItem>
								{names.map((name) => (
									<MenuItem key={name} value={name} style={getStyles(name, classifiedName, theme)}>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="search">
						<CFormInput
							type="text"
							value={searchVal}
							onChange={(e) => searchByChar(e)}
							placeholder={`${formatMessage({id: 'search'})}...`}
							onKeyDown={(e) => handelSearchbtn(e)}
						/>
					</div>
				</div>
				<div className={`classified-global-criteria ${classifiedName?.length == 0 && 'hide'}`}>
					{classifiedName?.find((ele) => ele == formatMessage({id: 'name'})) && (
						<TextField style={{ width: '30%' }} label={formatMessage({id: 'name'})} value={nameSearch} onChange={(e) => setNameSearch(e.target.value)} />
					)}
					{classifiedName?.find((ele) => ele == formatMessage({id: 'category'})) && (
						<FormControl sx={{ minWidth: '30%' }} style={{ width: '30%' }}>
							<InputLabel id="demo-simple-select-label">{translation('category')}</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={categorySearch}
								label={formatMessage({id: 'category'})}
								onChange={(e) => setCategorySearch(e.target.value)}
							>
								<MenuItem value={0}>{translation('individual')}</MenuItem>
								<MenuItem value={1}>{translation('company')}</MenuItem>
								<MenuItem value={2}>{translation('branch')}</MenuItem>
							</Select>
						</FormControl>
					)}
					{classifiedName?.find((ele) => ele == formatMessage({id: 'telephone'})) && (
						<TextField style={{ width: '30%' }} label={formatMessage({id: 'telephone'})} value={phoneSearch} onChange={(e) => setPhoneSearch(e.target.value)} />
					)}
					{classifiedName?.find((ele) => ele == formatMessage({id: 'mobile'})) && (
						<TextField style={{ width: '30%' }} label={formatMessage({id: 'mobile'})} value={mobileSearch} onChange={(e) => setMobileSearch(e.target.value)} />
					)}
					{classifiedName?.find((ele) => ele == formatMessage({id: 'email'})) && (
						<TextField style={{ width: '30%' }} label={formatMessage({id: 'email'})} value={emailSearch} onChange={(e) => setEmailSearch(e.target.value)} />
					)}
					{classifiedName?.find((ele) => ele ==formatMessage({id: 'address'})) && (
						<TextField style={{ width: '30%' }} label={formatMessage({id: 'address'})} value={addressSearch} onChange={(e) => setAddressSearch(e.target.value)} />
					)}
					{classifiedName.length > 0 && (
						<div style={{ width: '120px', margin: '20px auto', display: 'block' }}>
							<CButton onClick={classifiedFun}>{translation('apply')}</CButton>
							<CIcon
								style={{ height: '16px', cursor: 'pointer', position: 'absolute', top: '7px', left: '7px' }}
								icon={cilX}
								customClassName="nav-icon"
								onClick={closeClassificationCriteria}
							/>
						</div>
					)}
				</div>
				<CRow>
					<CCol lg={9} md={8} style={{ marginBottom: '20px' }}>
						<MDBDataTable
							responsive
							small
							data={data}
							searching={true}
							noBottomColumns={true}
						/>
						<Stack spacing={2}>
							<Pagination
								count={pagesNum}
								page={page}
								defaultPage={currentPage}
								siblingCount={0}
								shape="rounded"
								color="primary"
								onChange={handelChangePgae}
							/>
						</Stack>
					</CCol>
					<CCol lg={3} md={4}>
						<div className="contacts-classification">
							<CCard>
								<CCardHeader>
									<strong> {translation('classification')} : </strong>
								</CCardHeader>
							{/* {	[
									{ title: "الكل",name:"all",icon:<CIcon style={{ height: '20px' }} icon={cilList} customClassName="nav-icon" />,  clickFun: getAllContacts() },
									{ title: "عملاء",name:"clients",icon: <PeoplesIcon style={{ fontSize: '22px' }} />, clickFun: getClientsContacts() },
									{ title: "موكلون", name:"theClients",icon: <PeopleBranchIcon style={{ fontSize: '22px' }} />, clickFun: getTheClientsContacts() },
									{ title: "خصوم", name:"ants",icon: <PeoplesMapIcon style={{ fontSize: '22px' }} />, clickFun: getAntsContacts() },
									{ title: "محامين الخصوم", name:"antsLawers",icon: <CIcon style={{ height: '20px' }} icon={cilPeople} customClassName="nav-icon" />, clickFun: getAntsLawersContacts() },
									{ title: "خبراء", name:"genuis",icon: <PeopleFliterIcon style={{ fontSize: '22px' }} />,  clickFun: getGenuisContacts() }
									].map((ele, index) => (<h6 key={index} className={`${active == ele.name ? 'active' : null}`} >
									 {translation('theAll')}
								</h6>
									))} */}
								<h6 className={`${active == 'all' ? 'active' : null}`} onClick={() => getAllContacts()}>
									<CIcon style={{ height: '20px' }} icon={cilList} customClassName="nav-icon" /> {translation('theAll')}
								</h6>
								<h6 className={`${active == 'clients' ? 'active' : null}`} onClick={() => getClientsContacts()}>
									<PeoplesIcon style={{ fontSize: '22px' }} /> {translation('clients')}
								</h6>
								<h6 className={`${active == 'theClients' ? 'active' : null}`} onClick={() => getTheClientsContacts()}>
									<PeopleBranchIcon style={{ fontSize: '22px' }} /> {translation('agents')}
								</h6>
								<h6 className={`${active == 'ants' ? 'active' : null}`} onClick={() => getAntsContacts()}>
									<PeoplesMapIcon style={{ fontSize: '22px' }} /> {translation('ants')}
								</h6>
								<h6 className={`${active == 'antsLawers' ? 'active' : null}`} onClick={() => getAntsLawersContacts()}>
									<CIcon style={{ height: '20px' }} icon={cilPeople} customClassName="nav-icon" />{translation('antsLawyers')}
								</h6>
								<h6 className={`${active == 'genuis' ? 'active' : null}`} onClick={() => getGenuisContacts()}>
									<PeopleFliterIcon style={{ fontSize: '22px' }} /> {translation('experts')}
								</h6>
							</CCard>
						</div>
					</CCol>
				</CRow>
			</CContainer>
			{visible ? (
				<ReturnedPopup
					exitSelectModal={() => exitSelectModal()}
					id={null}
					editCriterai={null}
					setOpenAddSnack={setOpenAddSnack}
					setOpenEditSnack={setOpenEditSnack}
				/>
			) : null}

			{openEditSnack || openAddSnack ? (
				<Snackbar open={openEditSnack || openAddSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
						{openEditSnack ? translation('itemUpdated') : translation('itemAdded')}
					</Alert>
				</Snackbar>
			) : null}
			{constantAdd == 1 ? (
				<NationalityConstant exitSelectModal={() => setConstantAdd('')} />
			) : constantAdd == 2 ? (
				<CompanyTypeConstant exitSelectModal={() => setConstantAdd('')} />
			) : null}
		</div>
	);
};

export default React.memo(Contacts);
