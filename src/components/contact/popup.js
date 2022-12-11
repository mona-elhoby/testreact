import React, { useCallback, useEffect, useState } from 'react';
import { CCol, CRow, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilAddressBook, cilPlus, cilMinus } from '@coreui/icons';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormHelperText from '@mui/material/FormHelperText';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Theme, useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {  useIntl } from "react-intl";

import { categoriesName } from '../../contraints/constants';
import { getContacts, addNewContact, updateContact, getProfile } from '../../store/reducers/contacts';
import { getCompanyTypeData, getNationality } from '../../store/reducers/constants/contact';
import { NationalityConstant, CompanyTypeConstant } from './contact';
import './contact.css';
import translation from "../../i18n/translate"


const Contacts = (props) => {
	const [visible, setVisible] = useState(false);
	const [openErrSnack, setOpenErrSnack] = useState(false);
	const [type, setType] = useState(0);
	const [userName, setUserName] = useState('');
	const [userNameEn, setUserNameEn] = useState('');
	const [phone, setPhone] = useState('');
	const [company, setCompany] = useState('');
	const [nationality, setNationality] = useState('');
	const [fax, setFax] = useState('');
	const [catergory, setCategory] = useState([]);
	const [lang, setLang] = useState('');
	const [address, setAddress] = useState('');
	const [identityNum, setIdentityNum] = useState('');
	const [identityDate, setIdentityDate] = useState(null);
	const [identityendDate, setIdentityEndDate] = useState(null);
	const [sponser, setSponser] = useState('');
	const [residenceEndDate, setResidenceEndDate] = useState(null);
	const [passportNum, setPassportNum] = useState('');
	const [passportDate, setPassportDate] = useState(null);
	const [passportEndDate, setPassportEndDate] = useState(null);
	const [notes, setNotes] = useState('');
	const [notesEn, setNotesEn] = useState('');
	const [ResidencyNum, setResidencyNum] = useState('');
	const [licenseNum, setLicenseNum] = useState('');
	const [licenseEndDate, setLicenseEndDate] = useState(null);
	const [taxNum, setTaxNum] = useState('');
	const [theCompanyType, setTheCompanyType] = useState('');
	const [companiesName, setcompaniesName] = useState([]);
	const [error, setError] = useState([]);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [classificationConflict, setClassificationConflict] = useState(false);
	const [categoryids, setCategoryids] = useState([]);
	const [constantAdd, setConstantAdd] = useState('');
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [mobileArrDiv, setMobileArrDiv] = useState([{ id: Date.now(), mobile: '' }]);
	const [divMobileId, setDivMobileId] = useState(Date.now() + 1);
	const [emailArrDiv, setEmailArrDiv] = useState([{ id: Date.now(), email: '' }]);
	const [divEmailId, setDivEmailId] = useState(Date.now() + 1);
	const [emailError, setEmailError] = useState(false)
	const { formatMessage } = useIntl();
	const theme = useTheme();

	const dispatch = useDispatch();
	const { companiesTypes, theNationalities } = useSelector((state) => state.contactConstraint);

	const { contactError, isLoadingContacts } = useSelector((state) => state.contact);

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	useEffect(() => {
		dispatch(getCompanyTypeData());
		dispatch(getNationality());
		dispatch(getContacts({ theParams: { categorySearch: 1 } })).then((res) => {
			//get companies name for individuals
			const newArr = res.payload?.data?.map((ele) => ({ id: ele.CLI_ID_PK, Cname: ele.CLI_NAME, EName: ele.CLI_NAME_ENGLISH }));
			setcompaniesName(newArr);
		});
		if (props.editCriterai) {
			console.log(props.editCriterai);
			setType(props.editCriterai?.CLI_CATEGORY);
			setUserName(props.editCriterai?.CLI_NAME ? props.editCriterai?.CLI_NAME : '');
			setUserNameEn(props.editCriterai?.CLI_NAME_ENGLISH ? props.editCriterai?.CLI_NAME_ENGLISH : '')
			setPhone(props.editCriterai?.CLI_PHONE ? props.editCriterai?.CLI_PHONE : '');
			setEmailArrDiv(props.editCriterai?.CLI_EMAIL ? props.editCriterai?.CLI_EMAIL.split(',').map((ele, i) => ({ id: i, email: ele })) : emailArrDiv);
			setMobileArrDiv(
				props.editCriterai?.CLI_MOBILE ? props.editCriterai?.CLI_MOBILE?.split(',')?.map((ele, i) => ({ id: i, mobile: ele })) : mobileArrDiv
			);
			setFax(props.editCriterai?.CLI_FAX ? props.editCriterai?.CLI_FAX : '');
			setLang(props.editCriterai?.CLI_FAV_LANG_DESC_EN == 'Arabic' ? 0 : props.editCriterai?.CLI_FAV_LANG == 'English' ? 1 : '');
			setAddress(props.editCriterai?.CLI_ADDRESS ? props.editCriterai?.CLI_ADDRESS : '');
			setNotes(props.editCriterai?.CLI_NOTES ? props.editCriterai?.CLI_NOTES : '');
			setNotesEn(props.editCriterai?.CLI_NOTES_EN ? props.editCriterai?.CLI_NOTES_ENS : '');
			setNationality(props.editCriterai?.NAT_ID_PK ? props.editCriterai?.NAT_ID_PK : '');
			setCompany(props.editCriterai?.PARENT_ID ? props.editCriterai?.PARENT_ID : '');
			setCategory(
				props.editCriterai?.classification?.length > 0
					? props.editCriterai?.classification.map((ele) => document.body.getAttribute('dir') == 'ltr' ? ele.CLI_TYPE_NAME_EN : ele.CLI_TYPE_NAME)
					: props.editCriterai?.DT_TYPE
					? props.editCriterai?.DT_TYPE.map((ele1) => categoriesName?.find((ele) => ele.id == ele1)?.arName)
					: []
			);
			setLicenseNum(props.editCriterai?.CLI_LICENSE_NO ? props.editCriterai?.CLI_LICENSE_NO : '');
			setLicenseEndDate(props.editCriterai?.CLI_LICENSE_DATE ? new Date(props.editCriterai?.CLI_LICENSE_DATE).toISOString().split('T')[0] : undefined);
			setTaxNum(props.editCriterai?.CLI_TAX_NUMBER ? props.editCriterai?.CLI_TAX_NUMBER : '');
			setTheCompanyType(props.editCriterai?.CLI_COMPANYTYPE_ID_PK ? props.editCriterai?.CLI_COMPANYTYPE_ID_PK : '');
			setIdentityDate(props.editCriterai?.CLI_ID_ISSUE_DATE ? new Date(props.editCriterai?.CLI_ID_ISSUE_DATE).toISOString().split('T')[0] : undefined);
			setIdentityEndDate(
				props.editCriterai?.CLI_ID_EXPIRY_DATE ? new Date(props.editCriterai?.CLI_ID_EXPIRY_DATE).toISOString().split('T')[0] : undefined
			);
			setResidenceEndDate(
				props.editCriterai?.CLI_RESIDENCY_EXPIRY_DATE ? new Date(props.editCriterai?.CLI_RESIDENCY_EXPIRY_DATE).toISOString().split('T')[0] : undefined
			);
			setPassportDate(
				props.editCriterai?.CLI_PASSPORT_ISSUE_DATE ? new Date(props.editCriterai?.CLI_PASSPORT_ISSUE_DATE).toISOString().split('T')[0] : undefined
			);
			setPassportEndDate(
				props.editCriterai?.CLI_PASSPORT_EXPIRY_DATE ? new Date(props.editCriterai?.CLI_PASSPORT_EXPIRY_DATE).toISOString().split('T')[0] : undefined
			);
			setIdentityNum(props.editCriterai?.CLI_IDENTITYNO ? props.editCriterai?.CLI_IDENTITYNO : '');
			setSponser(props.editCriterai?.CLI_SPONSOR_NAME ? props.editCriterai?.CLI_SPONSOR_NAME : '');
			setPassportNum(props.editCriterai?.CLI_PASSPORT_NO ? props.editCriterai?.CLI_PASSPORT_NO : '');
		}
	}, [dispatch]);
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 },
		},
	};
	const emptyVals = () => {
		setResidencyNum('');
		setPassportNum('');
		setSponser('');
		setIdentityNum('');
		setAddress('');
		setFax('');
		setUserName('');
		setPhone('');
		setCompany('');
		setTaxNum('');
		setNotes('');
		 setUserNameEn('')
		setMobileArrDiv([{ id: Date.now(), mobile: '' }]);
		setEmailArrDiv([{ id: Date.now(), email: '' }]);
	};
	const addContact = () => {
		// console.log(categoryids)
		const mobiles = mobileArrDiv.length > 0 && mobileArrDiv.filter((ele) => ele.mobile && ele.mobile);
		const emails = emailArrDiv.length > 0 && emailArrDiv.filter((ele) => ele.email && ele.email);
		// console.log("mobiles: ", mobiles)
		const sharedObj = {
			CLI_CATEGORY: type,
			CLI_NAME: userName ? userName : undefined,
			CLI_NAME_ENGLISH: userNameEn ? userNameEn : undefined,
			CLI_PHONE: phone ? phone : undefined,
			CLI_FAX: fax ? fax : undefined,
			CLI_MOBILE: mobiles.length > 0 ? mobiles.map(ele => ele.mobile) : undefined,
			CLI_EMAIL: emails.length > 0 ? emails.map(ele => ele.email) : undefined,
			CLI_FAV_LANG: lang >= 0 ? Number(lang) : undefined,
			CLI_ADDRESS: address ? address : undefined,
			CLI_notes: notes ? notes : undefined,
			CLI_notes_EN: notesEn ? notesEn : undefined,
			DT_TYPE: catergory.length >= 0 ? categoryids : undefined,
		};
		const companyBrach = {
			...sharedObj,
			CLI_COMPANYTYPE_ID_PK: theCompanyType ? theCompanyType : undefined,
			CLI_LICENSE_NO: licenseNum ? String(licenseNum) : undefined,
			CLI_LICENSE_DATE: licenseEndDate ? licenseEndDate : undefined,
			CLI_TAX_NUMBER: taxNum ? taxNum : undefined,
		};
		// console.log(ResidencyNum)
		let savedData;
		if (type == 0) {
			savedData = {
				...sharedObj,
				NAT_ID_PK: nationality >= 1 ? Number(nationality) : undefined,
				PARENT_ID: company >= 1 ? Number(company) : undefined,
				CLI_ID_ISSUE_DATE: identityDate ? identityDate : undefined,
				CLI_IDENTITYNO: identityNum ? identityNum : undefined,
				CLI_ID_EXPIRY_DATE: identityendDate ? identityendDate : undefined,
				CLI_PASSPORT_NO: passportNum ? passportNum : undefined,
				CLI_PASSPORT_ISSUE_DATE: passportDate ? passportDate : undefined,
				CLI_PASSPORT_EXPIRY_DATE: passportEndDate ? passportEndDate : undefined,
				CLI_SPONSOR_NAME: sponser ? sponser : undefined,
				CLI_RESIDENCY_EXPIRY_DATE: residenceEndDate ? residenceEndDate : undefined,
				CLI_RESIDENCYNO: ResidencyNum > 0 ? ResidencyNum : undefined,
			};
		} else if (type == '1') {
			savedData = { ...companyBrach };
		} else {
			savedData = {
				...companyBrach,
				PARENT_ID: company > 1 ? Number(company) : undefined,
			};
		}
		// console.log(savedData);
		dispatch(addNewContact(savedData)).then((res) => {
			console.log('res', res.payload);
			if (res.payload?.code) {
				setError(res.payload);
				if(res.payload?.args?.filter(ele => ele.includes('body.CLI_EMAIL'))){
					setEmailError(true)
				}
			} else {
				props.exitSelectModal();
				emptyVals();
				setCategoryids([]);
				props.setOpenAddSnack(true);
				dispatch(getContacts({ theParams: null }));
			}
		});
	};

	const updateClient = () => {
		const sharedObj = {
			CLI_CATEGORY: type,
			CLI_NAME: userName,
			CLI_PHONE: phone ? phone : undefined,
			CLI_FAX: fax ? fax : undefined,
			CLI_MOBILE: mobileArrDiv.length > 0 && mobileArrDiv[0].mobile.length ? mobileArrDiv.map((ele) => ele.mobile.length > 0 && ele.mobile) : undefined,
			CLI_EMAIL: emailArrDiv.length > 0 && emailArrDiv[0].email.length ? emailArrDiv.map((ele) => ele.email.length > 0 && ele.email) : undefined,
			CLI_FAV_LANG: lang >= 0 ? Number(lang) : undefined,
			CLI_ADDRESS: address ? address : undefined,
			CLI_notes: notes ? notes : undefined,
			DT_TYPE:
				categoryids.length > 0
					? categoryids
					: props.editCriterai?.classification
					? props.editCriterai?.classification.map((ele) => ele.CLI_TYPE_ID_PK)
					: props.editCriterai?.DT_TYPE,
		};
		const companyBrach = {
			...sharedObj,
			CLI_COMPANYTYPE_ID_PK: theCompanyType ? theCompanyType : undefined,
			CLI_LICENSE_NO: licenseNum ? String(licenseNum) : undefined,
			CLI_LICENSE_DATE: licenseEndDate ? licenseEndDate : undefined,
			CLI_TAX_NUMBER: taxNum ? taxNum : undefined,
		};
		let savedData;
		if (type == 0) {
			savedData = {
				...sharedObj,
				NAT_ID_PK: nationality >= 1 ? Number(nationality) : undefined,
				PARENT_ID: company >= 1 ? Number(company) : undefined,
				CLI_ID_ISSUE_DATE: identityDate ? identityDate : undefined,
				CLI_IDENTITYNO: identityNum ? identityNum : undefined,
				CLI_ID_EXPIRY_DATE: identityendDate ? identityendDate : undefined,
				CLI_PASSPORT_NO: passportNum ? passportNum : undefined,
				CLI_PASSPORT_ISSUE_DATE: passportDate ? passportDate : undefined,
				CLI_PASSPORT_EXPIRY_DATE: passportEndDate ? passportEndDate : undefined,
				CLI_SPONSOR_NAME: sponser ? sponser : undefined,
				CLI_RESIDENCY_EXPIRY_DATE: residenceEndDate ? residenceEndDate : undefined,
				CLI_RESIDENCYNO: ResidencyNum > 0 ? ResidencyNum : undefined,
			};
		} else if (type == '1') {
			savedData = { ...companyBrach };
		} else {
			savedData = {
				...companyBrach,
				PARENT_ID: company > 1 ? Number(company) : undefined,
			};
		}
		console.log(savedData);
		dispatch(updateContact({ id: props.id, data: savedData })).then((res) => {
			// console.log('res', res.payload);
			if (res.payload?.res?.code) {
				// console.log("res")
				setError(res.payload?.res);
				if(res.payload?.args?.filter(ele => ele.includes('body.CLI_EMAIL'))){
					setEmailError(true)
				}
				// console.log(res.payload.res?.message?.includes('Client classification conflict.'))
				res.payload.res?.message?.includes('Client classification conflict.') ? props.setClassificationConflict(true) : null
			} else {
				dispatch(getProfile(props.id)).then(() => {
					setVisible(false);
					props.setOpenEditSnack(true);
					props.exitSelectModal();
				});
			}
		});
	};
	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenAddSnack(false);
		setOpenEditSnack(false);
	};
	var filterEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	const onChangeEmail = (e, id) => {
		let newArr = emailArrDiv;
		newArr.find((item) => item.id == id)['email'] = e.target.value;
		setDivEmailId(newArr);
		if (!filterEmail.test(e.target.value) ){
			setEmailError(true)
		}else{
			setEmailError(false)
		}
	};
	const onAddEmailClick = () => {
		setEmailArrDiv([...emailArrDiv, { id: divEmailId, mobile: '' }]);
		setDivEmailId(divEmailId + 1);
	};
	const handelRemoveEmail = (id) => {
		setEmailArrDiv(emailArrDiv.filter((item) => item.id != id));
	};
	const handelMobiles = (e, id) => {
		let newArr = mobileArrDiv;
		newArr.find((item) => item.id == id)['mobile'] = e.target.value;
		setMobileArrDiv(newArr);
	};
	const handelRemoveMobile = (id) => {
		setMobileArrDiv(mobileArrDiv.filter((item) => item.id != id));
	};

	const onAddMobileClick = () => {
		setMobileArrDiv([...mobileArrDiv, { id: divMobileId, mobile: '' }]);
		setDivMobileId(divMobileId + 1);
	};

	const changeCategoryVals = (event) => {
		setError(contactError);
		const {
			target: { value },
		} = event;
		// console.log(value);

		setCategory(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
		let theIds = [];
		for (let k = 0; k <= value.length; k++) {
			for (let i = 0; i < categoriesName.length; i++) {
				if (document.body.getAttribute('dir') == 'rtl' && (value[k] == categoriesName[i]?.arName)) {
					theIds.push(categoriesName[i].id);
				}else if (document.body.getAttribute('dir') == 'ltr' && (value[k] == categoriesName[i]?.enName)) {
					theIds.push(categoriesName[i].id);
				}
			}
		}
		// console.log('theIds', theIds);
		setCategoryids(theIds);
	};

	const handelCompanyType = useCallback(
		(event) => {
			dispatch(getCompanyTypeData());
		},
		[constantAdd]
	);
	const handelNationaity = useCallback(
		(event) => {
			dispatch(getNationality());
		},
		[constantAdd]
	);

	return (
		<div className="contacts">
			{openAddSnack || openEditSnack || openErrSnack || classificationConflict ? (
				<Snackbar open={true} autoHideDuration={200} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity={classificationConflict || openErrSnack ? "error" : "success"} sx={{ width: '100%' }}>
						{openAddSnack ? translation('itemAdded') : openErrSnack ? translation('error') : classificationConflict ? translation('classificationConflict') : translation('itemUpdated')}
					</Alert>
				</Snackbar>
			) : null}
			{constantAdd == 1 ? (
				<NationalityConstant exitSelectModal={() => setConstantAdd('')} />
			) : constantAdd == 2 ? (
				<CompanyTypeConstant exitSelectModal={() => setConstantAdd('')} />
			) : null}

			<CModal visible={true} onClose={() => props.exitSelectModal()} className={`modal-contact ${document.body.getAttribute("dir") == 'ltr' ? 'enTextLeftPopup' : null}`}>
				<CModalHeader>
					<CModalTitle>
						<CIcon style={{ height: '20px' }} icon={cilAddressBook} customClassName="nav-icon" /> {props.editCriterai ? translation('update') : translation('add')}
					</CModalTitle>
				</CModalHeader>
				<CModalBody style={{ padding: '40px 10px' }}>
					<CRow>
						<CCol md={6}>
							<CCol md={12}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">{translation('type')}</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={type}
										label={formatMessage({id: 'type'})}
										variant="outlined"
										onChange={(e) => setType(e.target.value)}
									>
										<MenuItem value={0} name="client">
										{translation('individual')}
										</MenuItem>
										<MenuItem value={1} name="company">
										{translation('company')}
										</MenuItem>
										<MenuItem value={2} name="branch">
										{translation('branch')}
										</MenuItem>
									</Select>
								</FormControl>
							</CCol>

							<CCol md={12}>
								<TextField
									fullWidth
									variant="outlined"
									value={userName}
									onChange={(event) => setUserName(event.target.value)}
									label={formatMessage({id: 'name'})}
									error={contactError?.args[0]?.includes('body.CLI_NAME ') ? true : false}
									helperText={contactError?.args[0]?.includes('body.CLI_NAME ') ? formatMessage({id: 'errorEmail'}) : null}
								/>
							</CCol>
							<CCol md={12}>
								<TextField
									fullWidth
									variant="outlined"
									value={userNameEn}
									onChange={(event) => setUserNameEn(event.target.value)}
									label={formatMessage({id: 'nameEn'})}
								/>
							</CCol>
							<CCol md={12}>
								<TextField
									// style={{width: 'calc(100% - "30px")'}}
									fullWidth
									variant="outlined"
									value={phone}
									onChange={(event) => setPhone(event.target.value)}
									label={formatMessage({id: 'telephone'})}
								/>
							</CCol>
							<CCol md={12}>
								{mobileArrDiv.map((ele, i) => (
									<div key={ele.id} id={ele.id}>
										<TextField
											fullWidth
											variant="outlined"
											name="mobile"
											defaultValue={ele.mobile}
											onChange={(e) => handelMobiles(e, ele.id)}
											label={formatMessage({id: 'mobile'})}
										/>
										<CIcon
											style={{
												height: '18px',
												color: '#ff3547',
												margin: '5px 2px auto auto',
												cursor: 'pointer',
											}}
											icon={i == 0 ? cilPlus : cilMinus}
											customClassName="nav-icon"
											onClick={i == 0 ? onAddMobileClick : () => handelRemoveMobile(ele.id)}
										/>
									</div>
								))}
							</CCol>
							<CCol md={12}>
								<TextField fullWidth variant="outlined" value={fax} onChange={(event) => setFax(event.target.value)} label={formatMessage({id: 'fax'})} />
							</CCol>
							<CCol md={12}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">{translation('language')}</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={lang}
										label={formatMessage({id:'language'})}
										variant="outlined"
										onChange={(event) => setLang(event.target.value)}
									>
										{['Arabic', 'English'].map((ele, i) => (
											<MenuItem value={i} key={i}>
												{ele}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</CCol>
							{type != '1' ? (
								<CCol md={12}>
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">{translation('theCompany')}</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={company}
											label={formatMessage({id: 'theCompany'})}
											variant="outlined"
											onChange={(e) => setCompany(e.target.value)}
										>
											{companiesName?.map((ele, i) => (
												<MenuItem value={ele.id} key={i} name="client">
													{ele.EName && document.body.getAttribute('dir') == 'ltr' ? ele.EName : ele.Cname}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</CCol>
							) : null}
							{type == '0' ? (
								<>
									<CCol md={12}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												label={formatMessage({id: 'residencyExpired'})}
												inputFormat="MM/dd/yyyy"
												value={residenceEndDate}
												onChange={(event) => setResidenceEndDate(event)}
												renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
											/>
										</LocalizationProvider>
									</CCol>
									<CCol md={12}>
										<TextField
											fullWidth
											variant="outlined"
											value={passportNum}
											onChange={(event) => setPassportNum(event.target.value)}
											label={formatMessage({id: 'passportNum'})}
										/>
									</CCol>
									<CCol md={12}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
											label={formatMessage({id: 'passportExpired'})}
												inputFormat="MM/dd/yyyy"
												value={passportEndDate}
												onChange={(event) => setPassportEndDate(event)}
												renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
											/>
										</LocalizationProvider>
									</CCol>
								</>
							) : null}
						</CCol>
						<CCol md={6}>
							{type == '0' ? (
								<>
									<CCol md={12}>
										<p className="compantTypeConstraint" onClick={() => setConstantAdd(1)}></p>
										<FormControl fullWidth onClick={() => handelNationaity()}>
											<InputLabel id="demo-simple-select-label">{formatMessage({id: 'nationality'})}</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={nationality}
												label={formatMessage({id: 'nationality'})}
												variant="outlined"
												onChange={(event) => setNationality(event.target.value)}
											>
												{theNationalities.map((ele, i) => (
													<MenuItem value={ele.NAT_ID_PK} key={i} name="client">
														{document.body.getAttribute('dir') == 'ltr' && ele.NAT_NAME_EN ? ele.NAT_NAME_EN : ele.NAT_NAME}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</CCol>
									<CCol md={12}>
										<TextField
											fullWidth
											variant="outlined"
											value={identityNum}
											onChange={(event) => setIdentityNum(event.target.value)}
											label={formatMessage({id: 'identity'})}
										/>
									</CCol>
									<CCol md={12}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												label={formatMessage({id: 'identityIssue'})}
												value={identityDate}
												onChange={(event) => setIdentityDate(event)}
												renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
											/>
										</LocalizationProvider>
									</CCol>
									<CCol md={12}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												label={formatMessage({id: 'identityExpired'})}
												inputFormat="MM/dd/yyyy"
												value={identityendDate}
												onChange={(event) => setIdentityEndDate(event)}
												renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
											/>
										</LocalizationProvider>
									</CCol>
									<CCol md={12}>
										<TextField
											fullWidth
											variant="outlined"
											value={sponser}
											onChange={(event) => setSponser(event.target.value)}
											label={formatMessage({id: 'sponserName'})}
										/>
									</CCol>
								</>
							) : null}
							<CCol md={12}>
								{emailArrDiv.map((ele, i) => (
									<div key={ele.id} id={ele.id}>
										<TextField
											fullWidth
											variant="outlined"
											defaultValue={ele.email}
											name="email"
											onChange={(e) => onChangeEmail(e, ele.id)}
											label={formatMessage({id: 'email'})}
											error={emailError ? true : false}
											helperText={emailError ? formatMessage({id: 'errorEmail'}) : null}
										/>
										<CIcon
											style={{
												height: '18px',
												color: '#ff3547',
												margin: '5px 2px auto auto',
												cursor: 'pointer',
											}}
											icon={i == 0 ? cilPlus : cilMinus}
											customClassName="nav-icon"
											onClick={i == 0 ? onAddEmailClick : () => handelRemoveEmail(ele.id)}
										/>
									</div>
								))}
							</CCol>
							<CCol md={12}>
								{/* {console.log('catergory: ', catergory)} */}
								<FormControl fullWidth>
									<InputLabel id="demo-multiple-checkbox-label">{formatMessage({id: 'category'})}</InputLabel>
									<Select
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										multiple
										value={catergory}
										variant="outlined"
										onChange={changeCategoryVals}
										input={<OutlinedInput label={formatMessage({id: 'category'})} />}
										renderValue={(selected) => selected.join(', ')}
										MenuProps={MenuProps}
										error={catergory.length <= 0 ? true : false}
									>
										{categoriesName.map((ele) => (
											<MenuItem key={ele.id} value={document.body.getAttribute('dir') == 'ltr' ? ele.enName : ele.arName} name={ele.id}>
												<Checkbox checked={catergory.indexOf(ele.arName) > -1} />
												<ListItemText primary={document.body.getAttribute('dir') == 'ltr' ? ele.enName : ele.arName} />
											</MenuItem>
										))}
									</Select>
									{catergory.length <= 0 && <FormHelperText>This is required!</FormHelperText>}
								</FormControl>
							</CCol>
							{type != '0' ? (
								<>
									<CCol md={12}>
										<p className="compantTypeConstraint" onClick={() => setConstantAdd(2)}></p>
										<FormControl fullWidth onClick={() => handelCompanyType()}>
											<InputLabel> {formatMessage({id: 'theCompany'})} {formatMessage({id: 'theType'})}</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={theCompanyType}
												label={formatMessage({id: 'theCompany'}) + ' ' + formatMessage({id: 'theType'})}
												variant="outlined"
												onChange={(event) => setTheCompanyType(event.target.value)}
											>
												{companiesTypes?.map((ele, i) => (
													<MenuItem value={ele.CLI_COMPANYTYPE_ID_PK} key={i}>
														{document.body.getAttribute('dir') == 'ltr' && ele.CLI_COMPANYTYPE_NAME_EN ? ele.CLI_COMPANYTYPE_NAME_EN : ele.CLI_COMPANYTYPE_NAME}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</CCol>
									<CCol md={12}>
										<TextField
											fullWidth
											variant="outlined"
											value={licenseNum}
											onChange={(event) => setLicenseNum(event.target.value)}
											label={formatMessage({id: 'licenseNum'})}
										/>
									</CCol>
									<CCol md={12}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
												label={formatMessage({id: 'licenseExpired'})}
												value={licenseEndDate}
												onChange={(event) => setLicenseEndDate(event)}
												renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
											/>
										</LocalizationProvider>
									</CCol>
									<CCol md={12}>
										<TextField
											fullWidth
											variant="outlined"
											value={taxNum}
											onChange={(event) => setTaxNum(event.target.value)}
											label={formatMessage({id: 'taxNum'})}
										/>
									</CCol>
								</>
							) : null}
							{type == '0' ? (
								<>
									<CCol md={12}>
										<TextField
											fullWidth
											variant="outlined"
											value={ResidencyNum}
											onChange={(event) => setResidencyNum(event.target.value)}
											label={formatMessage({id: 'residencyNum'})}
										/>
									</CCol>
									<CCol md={12}>
										<LocalizationProvider dateAdapter={AdapterDateFns}>
											<DatePicker
											label={formatMessage({id: 'passportIssue'})}
												inputFormat="MM/dd/yyyy"
												value={passportDate}
												onChange={(event) => setPassportDate(event)}
												renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
											/>
										</LocalizationProvider>
									</CCol>
									{/* <CCol md={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
              label={formatMessage({id: 'passportExpired'})}
              inputFormat="MM/dd/yyyy"
              value={passportEndDate}
              onChange={(event) => setPassportEndDate(event)}
                renderInput={(params) => <TextField {...params} fullWidth variant="outlined"/>}
              />
            </LocalizationProvider>
          </CCol> */}
								</>
							) : null}
						</CCol>
							<CCol md={6}>
								<TextField
									fullWidth
									variant="outlined"
									multiline
									maxRows={4}
									value={notes}
									onChange={(event) => setNotes(event.target.value)}
									label={formatMessage({id: 'notes'})}
								/>
							</CCol>
							<CCol md={6}>
								<TextField
									fullWidth
									variant="outlined"
									multiline
									maxRows={4}
									value={notesEn}
									onChange={(event) => setNotesEn(event.target.value)}
									label={formatMessage({id: 'notesEn'})}
								/>
							</CCol>
							<CCol md={6}>
								<TextField
									fullWidth
									variant="outlined"
									multiline
									maxRows={4}
									value={address}
									onChange={(event) => setAddress(event.target.value)}
									label={formatMessage({id: 'address'})}
								/>
							</CCol>
					</CRow>
				</CModalBody>
				<CModalFooter>
					{props.editCriterai ? (
						<CButton className="btn-modal-save" color="primary" onClick={updateClient}>
							{formatMessage({id: 'saveChanges'})}
						</CButton>
					) : (
						<CButton className="btn-modal-save" color="primary" onClick={() => addContact()}>
							{formatMessage({id: 'save'})}
						</CButton>
					)}
					<CButton color="danger" className="btn-modal-close" onClick={() => props.exitSelectModal()}>
					{formatMessage({id: 'close'})}
					</CButton>
				</CModalFooter>
			</CModal>
		</div>
	);
};

export default React.memo(Contacts);
