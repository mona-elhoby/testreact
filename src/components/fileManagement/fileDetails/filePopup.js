import React, { useEffect, useState } from 'react';
import {
	CRow,
	CCol,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
	CFormLabel,
	CButton,
	CFormInput,
	CFormTextarea,
	CCarousel,
	CCarouselItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLibrary, cilPlus, cilMinus } from '@coreui/icons';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {  useIntl } from "react-intl";

import './fileInformation.css';
import { getEmployeeData } from '../../../store/reducers/emlpoyee';
import { ClientAttrDiv, ClientDiv } from '../stages/caseClient';
import {
	CasesConstantStatus,
	CasesConstantCategory,
	CasesConstantType,
	CasesConstantsource,
	CasesConstantsubject,
	CasesConstantMediator,
	CasesConstantCloseType,
	CasesConstantCompanyOffice
} from './fileConstant';
import {
	getCasesType,
	getCasescategory,
	getCasescloseType,
	getCasesMediator,
	getCasesStatus,
	getCasesSource,
	getCasesSubject,
	getCasesCompanyOffice
} from '../../../store/reducers/constants/cases';
import { getContacts } from '../../../store/reducers/contacts';
import { addNewFile, updateFile, getCaseById } from '../../../store/reducers/file-management';
import translation from '../../../i18n/translate'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

export const ReturnedPopup = (props) => {
	const [fileNum, setFileNum] = useState('');
	const [fileOpenDate, setFileOpenDate] = useState('');
	const [fileCategory, setFileCategory] = useState('');
	const [fileType, setFileType] = useState('');
	const [fileStatus, setFileStatus] = useState('');
	const [reasonClosed, setReasonClosed] = useState('');
	const [fileClosedDate, setFileClosedDate] = useState('');
	const [fileSubject, setFileSubject] = useState([]);
	const [fileFollow, setFileFollow] = useState([]);
	const [subjectDetail, setSubjectDetail] = useState('');
	const [subjectDetailEn, setSubjectDetailEn] = useState('');
	const [officeName, setOfficeName] = useState('');
	const [fileMeditor, setFileMeditor] = useState('');
	const [stageSoure, setStageSoure] = useState('');
	const [wantedAmount, setWantedAmount] = useState('');
	const [clients, setClients] = useState('');
	const [clientName, setClientName] = useState('');
	const [clientsAttr, setClientsAttr] = useState('');
	const [secondAttr, setSecondAttr] = useState('');
	const [secondPartAttr, setSecondPartAttr] = useState('');
	const [clientsAddList, setClientsAddList] = useState([{ id: Date.now() + 1, clients: '', clientsAttr: '' }]);
	const [secondClientAddList, setSecondClientAddList] = useState([{ id: Date.now() + 1, secondAttr: '', secondPartAttr: '' }]);
	const [antId, setAntId] = useState(Date.now());
	const [agentId, setAgentId] = useState(Date.now());
	const [constantAdd, setConstantAdd] = useState('');
	const [error, setError] = useState(null);
	const [theAllContactsAnts, setTheAllContactsAnts] = useState([]);
	const [theAllContactsAgents, setTheAllContactsAgents] = useState([]);
	const dispatch = useDispatch();
	const { formatMessage } = useIntl();
	const {
		theCasesTypeCompo,
		theCasesCloseTypeCompo,
		theCasesCategoryCompo,
		theCasesMediatorCompo,
		theCasesStatusCompo,
		theCasesSourceCompo,
		theCasesSubjectCompo,
		theCasesCompanyOfficeCompo
	} = useSelector((state) => state.CasesConstants);
	const { allEmployee } = useSelector((state) => state.employee);
	const { allContacts } = useSelector((state) => state.contact);
	useEffect(() => {
		dispatch(getEmployeeData());
		dispatch(getCasesType());
		dispatch(getCasescategory());
		dispatch(getCasescloseType());
		dispatch(getCasesMediator());
		dispatch(getCasesStatus());
		dispatch(getCasesSource());
		dispatch(getCasesSubject());
		dispatch(getCasesCompanyOffice())
		dispatch(getContacts({ theParams: { limit: '50' } })).then((res) => {
			setTheAllContactsAgents(res.payload?.data?.filter((client) => client.classification?.find((ele) => ele.CLI_TYPE_ID_PK == 2)));
			setTheAllContactsAnts(res.payload?.data?.filter((client) => client.classification?.find((ele) => ele.CLI_TYPE_ID_PK == 7)));
		});
		if (props.stage) {
			const agents = props.stage?.clients?.filter((ele, i) => ele?.CLI_TYPE_ID_PK == 2);
			const ants = props.stage?.clients?.filter((ele, i) => ele?.CLI_TYPE_ID_PK == 7 || ele.CLI_TYPE_ID_PK == 4);
			console.log(agents, ants)
			setFileNum(props.stage?.CAS_NUM);
			setFileOpenDate(props.stage?.CAS_OPEN_DATE ? new Date(props.stage?.CAS_OPEN_DATE).toISOString().split('T')[0] : '');
			setFileCategory(document.body.getAttribute('dir') == 'ltr' && props.stage?.FIL_CATEGORY_NAME_EN ? props.stage?.FIL_CATEGORY_NAME_EN : props.stage?.FIL_CATEGORY_NAME ? props.stage?.FIL_CATEGORY_NAME : '');
			setFileType(document.body.getAttribute('dir') == 'ltr' && props.stage?.FIL_TYPE_NAME_EN ? props.stage?.FIL_TYPE_NAME_EN : props.stage?.FIL_TYPE_NAME ? props.stage?.FIL_TYPE_NAME : '');
			setFileStatus(document.body.getAttribute('dir') == 'ltr' && props.stage?.FIL_STATUS_NAME_EN ? props.stage?.FIL_STATUS_NAME_EN : props.stage?.FIL_STATUS_NAME ? props.stage?.FIL_STATUS_NAME : '');
			setReasonClosed(document.body.getAttribute('dir') == 'ltr' && props.stage?.FIL_CLOSE_TYPE_NAME_EN ? props.stage?.FIL_CLOSE_TYPE_NAME_EN : props.stage?.FIL_CLOSE_TYPE_NAME);
			setFileClosedDate(props.stage?.CAS_CLOSE_DATE ? new Date(props.stage?.CAS_CLOSE_DATE)?.toISOString()?.split('T')[0] : '');
			setFileSubject(document.body.getAttribute('dir') == 'ltr' && props.stage?.SUBJECTS_EN.length> 2 ? props.stage?.SUBJECTS_EN?.split('-') : props.stage?.SUBJECTS ? props.stage?.SUBJECTS?.split('-') : []);
			setFileFollow(props.stage?.employees ? props.stage?.employees?.map((ele) => document.body.getAttribute('dir') == 'ltr' && ele?.EMP_NAME_ENGLISH ? ele?.EMP_NAME_ENGLISH : ele?.EMP_NAME) : []);
			setSubjectDetail(props.stage?.CAS_SUBJECT ? props.stage?.CAS_SUBJECT : '');
			setSubjectDetailEn(props.stage?.CAS_SUBJECT_EN ? props.stage?.CAS_SUBJECT_EN : '');
			setOfficeName(document.body.getAttribute('dir') == 'ltr' && props.stage?.FIL_OFFICE_NAME_EN ? props.stage?.FIL_OFFICE_NAME_EN : props.stage?.FIL_OFFICE_NAME ? props.stage?.FIL_OFFICE_NAME : '');
			setFileMeditor(document.body.getAttribute('dir') == 'ltr' && props.stage?.FIL_MEDITOR_NAME_EN ? props.stage?.FIL_MEDITOR_NAME_EN : props.stage?.FIL_MEDITOR_NAME ? props.stage?.FIL_MEDITOR_NAME : '');
			setStageSoure(document.body.getAttribute('dir') == 'ltr' && props.stage?.FIL_SOURCE_NAME_EN ? props.stage?.FIL_SOURCE_NAME_EN : props.stage?.FIL_SOURCE_NAME ? props.stage?.FIL_SOURCE_NAME : '');
			setWantedAmount(props.stage?.CAS_PRICE ? props.stage?.CAS_PRICE : '');
			setClientName(props.stage?.CLI_ID_PK ? props.stage?.CLI_ID_PK : '');
			setSecondClientAddList(
				props.stage?.clients?.length > 0 ? ants?.map((ele, i) => ({ id: i, secondAttr: document.body.getAttribute('dir') == 'ltr' && ele?.CLI_NAME_ENGLISH ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME, secondPartAttr: ele.CLI_TYPE_ID_PK })) : []
			);
			setClientsAddList(props.stage?.clients?.length > 0 ? agents?.map((ele, i) => ({ id: i, clients: document.body.getAttribute('dir') == 'ltr' && ele?.CLI_NAME_ENGLISH ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME, clientsAttr: '' })) : []);
		} else {
			emptyInputVals();
		}
	}, [dispatch]);
	const onChangeClients = (value, id) => {
		console.log('value: ', value);
		let newArr = clientsAddList;
		newArr.find((item) => item.id == id)['clients'] = value;
		setClientsAddList(newArr);
	};

	const onChangeClientsAttr = (e, id) => {
		let newArr = clientsAddList;
		newArr.find((item) => item.id == id)['clientsAttr'] = e.target.value;
		setClientsAddList(newArr);
	};

	const onChangeSecondParts = (value, id) => {
		// console.log("value: ", value)
		let newArr = secondClientAddList;
		newArr.find((item) => item.id == id)['secondAttr'] = value;
		setSecondClientAddList(newArr);
	};

	const onChangeSecondPartsAttr = (e, id) => {
		let newArr = secondClientAddList;
		newArr.find((item) => item.id == id)['secondPartAttr'] = e.target.value;
		setSecondClientAddList(newArr);
	};
	const handleFileFollow = (event) => {
		const {
			target: { value },
		} = event;
		setFileFollow(typeof value === 'string' ? value.split(',') : value);
	};

	//add more agents
	const handelCleintsList = () => {
		setClientsAddList([...clientsAddList, { id: agentId, clients: '', clientsAttr: '' }]);
		setAgentId(agentId + 1);
	};
	const handelRemoveAgents = (id) => {
		setClientsAddList(clientsAddList.filter((item) => item.id != id));
	};
	//add more second part
	const handelSecondAttrList = () => {
		setSecondClientAddList([...secondClientAddList, { id: antId, secondAttr: '', secondPartAttr: '' }]);
		setAntId(antId + 1);
	};
	const handelRemoveAnts = (id) => {
		setSecondClientAddList(secondClientAddList.filter((item) => item.id != id));
	};
	const emptyInputVals = () => {
		setFileNum('');
		setFileOpenDate('');
		setFileCategory('');
		setFileType('');
		setFileStatus('');
		setReasonClosed('');
		setFileClosedDate('');
		setFileSubject([]);
		setOfficeName('');
		setFileFollow([]);
		setSubjectDetail('');
		setSubjectDetailEn('');
		setSecondAttr('');
		setSecondPartAttr('');
		setStageSoure('');
		setWantedAmount('');
		setClients('');
		setClientsAttr('');
		setClientsAddList([{ id: Date.now() + 1, clients: '', clientsAttr: '' }]);
		setSecondClientAddList([{ id: Date.now() + 1, secondAttr: '', secondPartAttr: '' }]);
	};

	//post file to server
	const handelAddNewFile = () => {
		console.log("theAllContactsAgents: ", theAllContactsAgents.find((age) => age.CLI_NAME == clientsAddList[0].clients)?.CLI_ID_PK, {	AGENTS:
			clientsAddList.length > 0
				? clientsAddList.map((ele) => theAllContactsAgents.find((age) => age.CLI_NAME || age.CLI_NAME_ENGLISH == ele.clients)?.CLI_ID_PK)
				: undefined,
		ANTS:
			secondClientAddList.length > 0
				? secondClientAddList.map((ele) => ({
						CLI_ID_PK: theAllContactsAnts?.find((ant) => ant.CLI_NAME || ant.CLI_NAME_ENGLISH == ele.secondAttr)?.CLI_ID_PK,
						CLI_TYPE_ID_PK: 7,
				  }))
				: undefined,});
		dispatch(
			addNewFile({
				CLI_ID_PK: theAllContactsAgents.find((age) => age.CLI_NAME == clientsAddList[0].clients)?.CLI_ID_PK,
				CAS_NUMBER: fileNum ? fileNum : undefined,
				CAS_NUM: fileNum ? Number(fileNum) : undefined,
				FIL_STATUS_ID_PK: fileStatus ? theCasesStatusCompo?.find((ele) => ele.FIL_STATUS_NAME == fileStatus)?.FIL_STATUS_ID_PK : undefined,
				CAS_OPEN_DATE: fileOpenDate ? fileOpenDate : undefined,
				CAS_CLOSE_DATE: fileClosedDate ? fileClosedDate : undefined,
				CAS_SUBJECT: subjectDetail ? subjectDetail : undefined,
				CAS_SUBJECT_EN: subjectDetailEn ? subjectDetailEn : undefined,
				FIL_MEDITOR_ID_PK: fileMeditor ? theCasesMediatorCompo?.find((ele) => ele.FIL_MEDITOR_NAME == fileMeditor)?.FIL_MEDITOR_ID_PK : undefined,
				FIL_CATEGORY_NAME: fileCategory ? theCasesCategoryCompo?.find((ele) => ele.FIL_CATEGORY_NAME == fileCategory)?.FIL_CATEGORY_ID_PK : undefined,
				FIL_TYPE_ID_PK: fileType ? theCasesTypeCompo?.find((ele) => ele.FIL_TYPE_NAME == fileType)?.FIL_TYPE_ID_PK : undefined,
				OFC_ID_PK: officeName ? theCasesCompanyOfficeCompo.find((option) => option.OFC_NAME == officeName)?.OFC_ID_PK : undefined,
				FIL_SOURCE_ID_PK: stageSoure ? theCasesSourceCompo?.find((ele) => ele.FIL_SOURCE_NAME == stageSoure)?.FIL_SOURCE_ID_PK : undefined,
				FIL_CLOSE_TYPE_ID_PK: reasonClosed
					? theCasesCloseTypeCompo?.find((ele) => ele.FIL_CLOSE_TYPE_NAME == reasonClosed)?.FIL_CLOSE_TYPE_ID_PK
					: undefined,
				CAS_PRICE: wantedAmount ? Number(wantedAmount) : undefined,
				FIL_HIDE: 0,
				AGENTS:
					clientsAddList.length > 0
						? clientsAddList.map((ele) => theAllContactsAgents.find((age) => age.CLI_NAME || age.CLI_NAME_ENGLISH == ele.clients)?.CLI_ID_PK)
						: undefined,
				ANTS:
					secondClientAddList.length > 0
						? secondClientAddList.map((ele) => ({
								CLI_ID_PK: theAllContactsAnts?.find((ant) => ant.CLI_NAME || ant.CLI_NAME_ENGLISH == ele.secondAttr)?.CLI_ID_PK,
								CLI_TYPE_ID_PK: 7,
						  }))
						: undefined,
				SUBJECT:  theCasesSubjectCompo.find((option) => option.FIL_SUBJECT_NAME == fileSubject)?.FIL_SUBJECT_ID_PK,
				EMPLOYEE: fileFollow ? fileFollow.map((ele) => allEmployee.find((ele2) => ele2.EMP_NAME == ele)?.EMP_ID_PK) : undefined,
			})
		).then((res) => {
			console.log('res.payload: ', res.payload);
			if (res.payload?.code) {
				setError(res.payload);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				emptyInputVals();
			}
		});
	};

	//update file to server
	const handelUpdateFile = () => {
		console.log(officeName);
		dispatch(
			updateFile({
				data: {
					CLI_ID_PK: clientName,
					CAS_NUMBER: fileNum ? String(fileNum) : undefined,
					CAS_NUM: fileNum ? Number(fileNum) : undefined,
					FIL_STATUS_ID_PK: fileStatus ? theCasesStatusCompo?.find((ele) => ele.FIL_STATUS_NAME == fileStatus)?.FIL_STATUS_ID_PK : undefined,
					CAS_OPEN_DATE: fileOpenDate ? fileOpenDate : undefined,
					CAS_CLOSE_DATE: fileClosedDate ? fileClosedDate : undefined,
					CAS_SUBJECT: subjectDetail ? subjectDetail : undefined,
					CAS_SUBJECT_EN: subjectDetailEn ? subjectDetailEn : undefined,
					FIL_MEDITOR_ID_PK: fileMeditor ? theCasesMediatorCompo?.find((ele) => ele.FIL_MEDITOR_NAME == fileMeditor)?.FIL_MEDITOR_ID_PK : undefined,
					FIL_CATEGORY_NAME: fileCategory
						? theCasesCategoryCompo?.find((ele) => ele.FIL_CATEGORY_NAME == fileCategory)?.FIL_CATEGORY_ID_PK
						: undefined,
					FIL_TYPE_ID_PK: fileType ? theCasesTypeCompo?.find((ele) => ele.FIL_TYPE_NAME == fileType)?.FIL_TYPE_ID_PK : undefined,
					OFC_ID_PK: officeName ? theCasesCompanyOfficeCompo.find((option) => option.OFC_NAME == officeName)?.OFC_ID_PK : undefined,
					FIL_SOURCE_ID_PK: stageSoure ? theCasesSourceCompo?.find((ele) => ele.FIL_SOURCE_NAME == stageSoure)?.FIL_SOURCE_ID_PK : undefined,
					FIL_CLOSE_TYPE_ID_PK: reasonClosed
						? theCasesCloseTypeCompo?.find((ele) => ele.FIL_CLOSE_TYPE_NAME == reasonClosed)?.FIL_CLOSE_TYPE_ID_PK
						: undefined,
					CAS_PRICE: wantedAmount ? Number(wantedAmount) : undefined,
					FIL_HIDE: 0,
					AGENTS:
						clientsAddList.length > 0
							? clientsAddList.map((ele) => theAllContactsAgents.find((age) => age.CLI_NAME || age.CLI_NAME_ENGLISH == ele.clients)?.CLI_ID_PK)
							: undefined,
					ANTS:
						secondClientAddList.length > 0
							? secondClientAddList.map((ele) => ({
									CLI_ID_PK: theAllContactsAnts.find((ant) => ant.CLI_NAME || ant.CLI_NAME_ENGLISH == ele.secondAttr)?.CLI_ID_PK,
									CLI_TYPE_ID_PK: 7,
							  }))
							: undefined,
					SUBJECT:  theCasesSubjectCompo.find((option) => option.FIL_SUBJECT_NAME == fileSubject)?.FIL_SUBJECT_ID_PK,
					EMPLOYEE: fileFollow ? fileFollow.map((ele) => allEmployee.find((ele2) => ele2.EMP_NAME == ele)?.EMP_ID_PK) : undefined,
				},
				id: Number(props.stage?.CAS_ID_PK),
			})
		).then((res) => {
			// console.log("res.payload: ", res.payload)
			if (res.payload?.res.data?.code) {
				setError(res.payload.res.data);
			} else {
				props.setOpenAddSnack(true);
				props.exitSelectModal();
				props.setOpenEditSnack(true);
				emptyInputVals();
				window.location.reload()
			}
		});
	};

	//slide arrows
	const handelNextSlide = (active, dir) => {
		// console.log(active, dir);
		if (dir == 'next' && active == 0) {
			// document.querySelectorAll('.modal-sessions .carousel-control-next')[0]?.setAttribute('id', 'carousel-control-next');
			document.querySelectorAll('.case-modal .carousel-control-next')[0]?.setAttribute('disabled', true);
			document.querySelectorAll('.case-modal .carousel-control-prev')[0]?.removeAttribute('disabled');
		} else if (dir == 'prev' && active == 1) {
			document.querySelectorAll('.case-modal .carousel-control-prev')[0]?.setAttribute('disabled', true);
			document.querySelectorAll('.case-modal .carousel-control-next')[0]?.removeAttribute('disabled');
		}
	};

	return (
		<div>
			<CModal visible={true} onClose={() => props.exitSelectModal()} className={`case-modal ${document.body.getAttribute('dir') == 'ltr' ? 'enTextLeftPopup' : null}`}>
				<CModalHeader>
					<CModalTitle>
						<CIcon style={{ height: '20px' }} icon={cilLibrary} customClassName="nav-icon" />
						{translation('add')}
					</CModalTitle>
				</CModalHeader>
				<CModalBody>
					<CCarousel controls interval={false} wrap={false} onSlide={handelNextSlide}>
						<CCarouselItem>
							<CRow>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4">{translation('fileNum')}</CFormLabel>
									<CFormInput
										type="number"
										value={fileNum}
										onChange={(e) => setFileNum(e.target.value)}
										className={!fileNum ? 'is-invalid' : null}
									/>
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4">{translation('openDate')}</CFormLabel>
									<CFormInput type="date" value={fileOpenDate} onChange={(e) => setFileOpenDate(e.target.value)} />
								</CCol>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(1)}>
									{translation('fileCategory')}
									</CFormLabel>
									<Autocomplete
										id="free-solo-demo"
										freeSolo
										value={fileCategory}
										onChange={(e, value) => setFileCategory(value)}
										options={theCasesCategoryCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.FIL_CATEGORY_NAME_EN ? option.FIL_CATEGORY_NAME_EN : option.FIL_CATEGORY_NAME)}
										renderInput={(params) => <TextField {...params} error={fileCategory?.length > 0 ? false : true} />}
										getOptionLabel={(option) => option}
										renderOption={(props, option) => {
											return (
												<li {...props} key={option + Math.random()}>
													{option}
												</li>
											);
										}}
									/>
								</CCol>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(2)}>
										{translation('casType')}
									</CFormLabel>
									<Autocomplete
										id="free-solo-demo"
										freeSolo
										value={fileType}
										onChange={(e, value) => setFileType(value)}
										options={theCasesTypeCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.FIL_TYPE_NAME_EN ? option.FIL_TYPE_NAME_EN : option.FIL_TYPE_NAME)}
										renderInput={(params) => <TextField {...params} />}
										getOptionLabel={(option) => option}
										renderOption={(props, option) => {
											return (
												<li {...props} key={option + Math.random()}>
													{option}
												</li>
											);
										}}
									/>
								</CCol>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(3)}>
										{translation('fileStatus')}
									</CFormLabel>
									<Autocomplete
										id="free-solo-demo"
										freeSolo
										value={fileStatus}
										onChange={(e, value) => setFileStatus(value)}
										options={theCasesStatusCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.FIL_STATUS_NAME_EN ? option.FIL_STATUS_NAME_EN : option.FIL_STATUS_NAME)}
										renderInput={(params) => <TextField {...params} />}
										getOptionLabel={(option) => option}
										renderOption={(props, option) => {
											return (
												<li {...props} key={option + Math.random()}>
													{option}
												</li>
											);
										}}
									/>
								</CCol>
								<hr style={{ marginTop: '20px' }} />
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(4)}>
										{translation('reason')}
									</CFormLabel>
									<Autocomplete
										id="free-solo-demo"
										freeSolo
										value={reasonClosed}
										onChange={(e, value) => setReasonClosed(value)}
										options={theCasesCloseTypeCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.FIL_CLOSE_TYPE_NAME_EN ? option.FIL_CLOSE_TYPE_NAME_EN : option.FIL_CLOSE_TYPE_NAME)}
										renderInput={(params) => <TextField {...params} />}
										getOptionLabel={(option) => option}
										renderOption={(props, option) => {
											return (
												<li {...props} key={option + Math.random()}>
													{option}
												</li>
											);
										}}
										disabled={theCasesStatusCompo?.find((ele) => ele.FIL_STATUS_NAME == fileStatus || ele.FIL_STATUS_NAME_EN == fileStatus)?.FIL_STATUS_LOCK ? false : true}
									/>
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4">{translation('closedDate')} </CFormLabel>
									<CFormInput
										type="date"
										value={fileClosedDate}
										onChange={(e) => setFileClosedDate(e.target.value)}
										disabled={theCasesStatusCompo?.find((ele) => ele.FIL_STATUS_NAME == fileStatus || ele.FIL_STATUS_NAME_EN == fileStatus)?.FIL_STATUS_LOCK ? false : true}
									/>
								</CCol>
								<hr style={{ marginTop: '20px' }} />
								<CCol md={12}>
									<CButton onClick={handelCleintsList} className="sesREquirement">
										<CIcon
											style={{
												height: '18px',
												color: '#fff',
												margin: '5px 2px auto auto',
												cursor: 'pointer',
											}}
											icon={cilPlus}
											customClassName="nav-icon"
										/>
										{translation('addClient')}
									</CButton>
									<CButton onClick={handelSecondAttrList} className="sesREquirement">
										<CIcon
											style={{
												height: '18px',
												color: '#fff',
												margin: '5px 2px auto auto',
												cursor: 'pointer',
											}}
											icon={cilPlus}
											customClassName="nav-icon"
										/>
										{translation('addAnt')}
									</CButton>
								</CCol>
								<CCol md={6}>
									{clientsAddList.map((ele) => (
										<div id={ele.id} key={ele.id}>
											<ClientDiv
												defaultValue={ele.clients}
												onChange={(value) => onChangeClients(value, ele.id)}
												defaultValue2={ele.clientsAttr}
												onChange2={(e) => onChangeClientsAttr(e, ele.id)}
												icon={cilMinus}
												onClick={() => handelRemoveAgents(ele.id)}
												name1="clients"
												name2="clientsAttr"
											/>
										</div>
									))}
								</CCol>
								<CCol md={6}>
									{secondClientAddList.map((ele) => (
										<div id={ele.id} key={ele.id}>
											<ClientAttrDiv
												defaultValue1={ele.secondAttr}
												onChange1={(value) => onChangeSecondParts(value, ele.id)}
												defaultValue2={ele.secondPartAttr}
												onChange2={(e) => onChangeSecondPartsAttr(e, ele.id)}
												icon={cilMinus}
												onClick={() => handelRemoveAnts(ele.id)}
												name1="secondAttr"
												name2="secondPartAttr"
												antAttrs={[
													{ arName: 'محامى خصم', enName: 'opponentLawyer', id: 4 },
													{
														arName: 'خصم',
														enName: 'opponent',
														id: 7,
													},
												]}
												stage={false}
											/>
										</div>
									))}
								</CCol>
							</CRow>
						</CCarouselItem>
						<CCarouselItem>
							<CRow>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(5)}>
										{translation('fileSub')}
									</CFormLabel>
									<Autocomplete
									multiple
										id="free-solo-demo"
										freeSolo
										value={fileSubject}
										onChange={(e, value) => setFileSubject(value)}
										options={theCasesSubjectCompo.map((option) => document.body.getAttribute('dir') == 'ltr' ? option.FIL_SUBJECT_NAME_EN : option.FIL_SUBJECT_NAME)}
										renderInput={(params) => <TextField {...params} />}
										getOptionLabel={(option) => option}
										renderOption={(props, option) => {
											return (
												<li {...props} key={option + Math.random()}>
													{option}
												</li>
											);
										}}
									/>
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4"> {translation('followers')}</CFormLabel>
									<FormControl fullWidth>
										<Select
											multiple
											displayEmpty
											value={fileFollow}
											onChange={handleFileFollow}
											input={<OutlinedInput />}
											renderValue={(selected) => (
												<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
													{typeof selected == 'object'
														? selected?.map((value) => <Chip key={Math.random() + value} label={value} />)
														: null}
												</Box>
											)}
											MenuProps={MenuProps}
											inputProps={{ 'aria-label': 'Without label' }}
										>
											{allEmployee?.map((ele, i) => {
												return (
													<MenuItem key={Math.random() + i} value={ele?.EMP_NAME}>
														{document.body.getAttribute('dir') == 'ltr' && ele.EMP_NAME_ENGLISH?  ele.EMP_NAME_ENGLISH : ele.EMP_NAME}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								</CCol>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(6)}>
										{translation('meditator')}
									</CFormLabel>
									<Autocomplete
										id="free-solo-demo"
										freeSolo
										value={fileMeditor}
										onChange={(e, value) => setFileMeditor(value)}
										options={theCasesMediatorCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.FIL_MEDITOR_NAME_EN ? option.FIL_MEDITOR_NAME_EN : option.FIL_MEDITOR_NAME)}
										renderInput={(params) => <TextField {...params} />}
										getOptionLabel={(option) => option}
										renderOption={(props, option) => {
											return (
												<li {...props} key={option + Math.random()}>
													{option}
												</li>
											);
										}}
									/>
								</CCol>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(8)}>{translation('assignedOffice')} </CFormLabel>
									<FormControl fullWidth>
									<Autocomplete
										id="free-solo-demo"
										freeSolo
										value={officeName}
										onChange={(e, value) => setOfficeName(value)}
										options={theCasesCompanyOfficeCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.OFC_NAME_EN ? option.OFC_NAME_EN : option.OFC_NAME)}
										renderInput={(params) => <TextField {...params} />}
										getOptionLabel={(option) => option}
										renderOption={(props, option) => {
											return (
												<li {...props} key={option + Math.random()}>
													{option}
												</li>
											);
										}}
									/>
									</FormControl>
								</CCol>
								<CCol md={6}>
									<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(7)}>
										{translation('source')}
									</CFormLabel>
									<Autocomplete
										id="free-solo-demo"
										freeSolo
										value={stageSoure}
										onChange={(e, value) => setStageSoure(value)}
										options={theCasesSourceCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.FIL_SOURCE_NAME_EN ? option.FIL_SOURCE_NAME_EN : option.FIL_SOURCE_NAME)}
										renderInput={(params) => <TextField {...params} />}
										getOptionLabel={(option) => option}
										renderOption={(props, option) => {
											return (
												<li {...props} key={option + Math.random()}>
													{option}
												</li>
											);
										}}
									/>
								</CCol>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4">{translation('casPrice')} </CFormLabel>
									<CFormInput type="number" value={wantedAmount} onChange={(e) => setWantedAmount(e.target.value)} />
								</CCol>
								<hr style={{ marginTop: '20px' }} />
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4"> {formatMessage({id: 'details'}) + ' ' + formatMessage({id: 'subject'})}</CFormLabel>
									<CFormTextarea rows={4} value={subjectDetail} onChange={(e) => setSubjectDetail(e.target.value)} />
								</CCol>
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4"> {formatMessage({id: 'details'}) + ' ' + formatMessage({id: 'subject'}) + 'EN'}</CFormLabel>
									<CFormTextarea rows={4} value={subjectDetailEn} onChange={(e) => setSubjectDetailEn(e.target.value)} />
								</CCol>
							</CRow>
						</CCarouselItem>
					</CCarousel>
				</CModalBody>
				<CModalFooter>
					{props.stage ? (
						<CButton className="btn-modal-save" color="primary" onClick={handelUpdateFile}>
							{translation('saveChanges')}
						</CButton>
					) : (
						<CButton className="btn-modal-save" color="primary" onClick={handelAddNewFile}>
						{translation('add')}
						</CButton>
					)}

					<CButton color="danger" className="btn-modal-close" onClick={() => props.exitSelectModal()}>
						{translation('close')}
					</CButton>
				</CModalFooter>
			</CModal>
			{constantAdd == 1 ? (
				<CasesConstantCategory exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={props.setOpenAddSnack} />
			) : constantAdd == 2 ? (
				<CasesConstantType exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={props.setOpenAddSnack} />
			) : constantAdd == 3 ? (
				<CasesConstantStatus exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={props.setOpenAddSnack} />
			) : constantAdd == 4 ? (
				<CasesConstantCloseType exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={props.setOpenAddSnack} />
			) : constantAdd == 5 ? (
				<CasesConstantsubject exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={props.setOpenAddSnack} />
			) : constantAdd == 6 ? (
				<CasesConstantMediator exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={props.setOpenAddSnack} />
			) : constantAdd == 7 ? (
				<CasesConstantsource exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={props.setOpenAddSnack} />
			) :  constantAdd == 8 ? <CasesConstantCompanyOffice exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={props.setOpenAddSnack} /> : null}
		</div>
	);
};
