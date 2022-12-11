import React, { useState, useEffect, useMemo } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useParams } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import {
	CTable,
	CTableBody,
	CTooltip,
	CButton,
	CTableRow,
	CCol,
	CRow,
	CModalBody,
	CModalTitle,
	CModalHeader,
	CModal,
	CFormLabel,
	CModalFooter,
	CFormInput,
	CNav,
	CHeaderDivider,
	CCard,
	CCardBody,
} from '@coreui/react';
import { cilWindow, cilTrash,cilX, cilFindInPage, cilPrint, cilAt, cilCursor, cilShareBoxed, cilSave, cilPlus, cilMinus } from '@coreui/icons';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { WorkStatusComponent, WorkAttrCompo } from '../components/fileManagement/works/workFile';
import { workStatusConstant } from '../contraints/constants';
import { getWorkData, getWorkById, addNewWork, updateWork, deleteWork, getWorkAttachment, getWorkAttachmentData } from '../store/reducers/work';
import { getEmployeeData } from '../store/reducers/emlpoyee';
import { getCourtsName } from '../store/reducers/theConstants';
import { getWorkKind, getWorkReasons, getWorkStatusReasons } from '../store/reducers/constants/work';
import { getInformingsData } from '../store/reducers/informings';
import { getWarningsData } from '../store/reducers/warnings';
import { getAllStages } from '../store/reducers/stage';
import { getExecuteData } from '../store/reducers/execute';
import { getSessionData } from '../store/reducers/session';
import AttachedHeadTable from '../features/attachedFileHaed';
import "../components/fileManagement/style.css"


ChartJS.register(ArcElement, Tooltip, Legend);
const names = ['حاله العمل', 'تاريخ إنشاء العمل', 'تاريخ نهايه العمل', 'نوع العمل'];
const FileExecution = () => {
	const [stage, setStage] = useState([]);
	const [editItem, setEditItem] = useState(null);
	const [item, setItem] = useState(null);
	const [visible, setVisible] = useState(false);
	const { id, name, speicifiedId } = useParams();

	const [WRKReason, setWRKReason] = useState('');
	const [WRKImportance, setWRKImportance] = useState('');
	const [DeptClient, setDeptClient] = useState('');
	const [theClient, setTheClient] = useState('');
	const [theCourt, setTheCourt] = useState('');
	const [theCourtBranch, setTheCourtBranch] = useState('');
	const [ExEndDate, setExEndDate] = useState('');
	const [WRKOrigin, setWRKOrigin] = useState('');
	const [WRKOriginDate, setWRKOriginDate] = useState('');
	const [WRKRequired, setWRKRequired] = useState('');
	const [WRKNotes, setWRKNotes] = useState('');
	const [WRAttr, setWRKAttr] = useState(2);
	const [cliName, setcliName] = useState('');
	const [FileNum, setFileNum] = useState('');
	const [WarningNum, setWarningNum] = useState('');
	const [WorkStatus, setWorkStatus] = useState([]);
	const [workKind, setWorkKind] = useState([]);
	const [workStatusReasonConstant, setWorkStatusReasonConstant] = useState([])
	const [informingId, setInformingId] = useState('');
	const [ExecuteId, setExecuteId] = useState('');
	const [StageId, setStageId] = useState('');
	const [chequId, setChequId] = useState('');
	const [sessionDate, setSessionDate] = useState('');
	const [workReasonConstant, setWorReasonConstant] = useState([]);
	const [theEmployer, setTheEmployer] = useState([]);
	const [theCourtsName, setTheCourtsName] = useState([]);
	const [informingsNum, setInformingsNum] = useState([]);
	const [warningsNum, setWarningsNum] = useState([]);
	const [chequisNum, setChequisNum] = useState([]);
	const [stagesNum, setStagesNum] = useState([]);
	const [exesNum, setExesNum] = useState([]);
	const [workStatusList, setWorkStatusList] = useState([]);
	const [workStatusIds, setWorkStatusIds] = useState('');
	const [workStatusReasons, setworkStatusReasons] = useState('');
	const [workStatusDate, setWorkStatusDate] = useState('');
	const [workStatusIdsList, setworkStatusIdsList] = useState([]);
	const [errorAdd, setErrorAdd] = useState([]);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [errDelete, setErrDelete] = useState(false);
	const [stgSessions, setStgSessions] = useState(null);
	const [sessionId, setSessionId] = useState('');
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
	const [classifiedName, setClassifiedName] = useState([]);
	const [clientNameSearch, setClientNameSearch] = useState('');
	const [wrkCreatDateSearchFrom, setWrkCreatDateSearchFrom] = useState(undefined);
	const [wrkCreatDateSearchTo, setWrkCreatDateSearchTo] = useState(undefined);
	const [wrkLastDateSearchTo, setWrkLastDateSearchTo] = useState(undefined);
	const [wrkLastDateSearchFrom, setWrkLastDateSearchFrom] = useState(undefined);
	const [wrkTypeSearch, setWrkTypeSearch] = useState('');
	const [searchedDiv, setSearchedDiv] = useState(null);
	const [searchVal, setSearchVal] = useState('');
	const [statusWorkSearch, setStatusWorkSearch] = useState('');
	const [attachment, setAttachment] = useState('');
	const [page, setId] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedVal, setSelectedVal] = useState('1');
	const [chartVisible, setChartVisible] = useState(false);
	const dispatch = useDispatch();
	const theme = useTheme();

	const { allWorks, isLoadingWork } = useSelector((state) => state.work);
	const { allExecute } = useSelector((state) => state.execute);
	const { selectedCase } = useSelector((state) => state.fileManagement);
	const { theCourtsNames } = useSelector((state) => state.theConstants);
	const { allWarnings } = useSelector((state) => state.warning);

	//TODO chequ nums

	useEffect(() => {
		dispatch(getWorkData({ theParams: { offset: 0, limit: '10' } })).then((res) => setcliName(res.payload?.data[0]?.CLI_NAME));
		// setcliName(stage[0]?.CLI_NAME);
		// setFileNum(stage?[0].CAS_NUMBER);
		// elmokalfeen
		dispatch(getEmployeeData()).then((res) => setTheEmployer(res.payload));
		//get courts name
		dispatch(getCourtsName()).then((res) => setTheCourtsName(res.payload));
		// get work kind
		dispatch(getWorkKind()).then((res) => setWorkKind(res.payload));
		// get work reasons
		dispatch(getWorkReasons()).then((res) => setWorReasonConstant(res.payload));
		// get reason for work  status
		dispatch(getWorkStatusReasons()).then((res) => setWorkStatusReasonConstant(res.payload));
		// get Informing Numbers
		dispatch(getInformingsData(id)).then((res) => setInformingsNum(res.payload));
		// get Warning Numbers
		dispatch(getWarningsData(id)).then((res) => console.log(res.payload));
		// get stage
		dispatch(getAllStages({ theparams: null })).then((res) => setStagesNum(res.payload?.data));
		// get execute number
		dispatch(getExecuteData({ theParams: { id: id } })).then((res) => setExesNum(res.payload));

		setworkStatusIdsList(workStatusConstant);
		//get work from other location
		name == 'work' && speicifiedId && !isLoadingWork && showEditModal(speicifiedId);
	}, [dispatch]);

	//get session for stage
	const setStgSession = (e) => {
		setStageId(e.target.value);
		dispatch(getSessionData(e.target.value)).then((res) => setStgSessions(res.payload));
		dispatch(getWorkAttachment(id)).then((res) => setAttachment(res.payload));
	};

	useMemo(() => {
		setFileNum(selectedCase?.CAS_NUMBER);
		// setcliName(stage[0]?.CLI_NAME);
		setWRKOriginDate(new Date().toISOString().split('T')[0]);
		setWRKOrigin('المدير');
		setWRKAttr(WRAttr);
		setStagesNum(
			Array.from(new Set(stagesNum?.map((a) => a?.STG_ID_PK))).map((id) => {
				return stagesNum?.find((a) => a?.STG_ID_PK == id);
			})
		);
		// console.log(stagesNum)
	}, [stage, WRAttr]);

	// snack for delete edit add alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	// material ui style for dropdown many select
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuPropsForClient = {
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
	// close snack alert
	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenAddSnack(false);
		setOpenEditSnack(false);
	};

	// get work by id
	const getItem = (id) => {
		setEditItem(null);
		dispatch(getWorkById(id)).then((res) => {
			setItem(res.payload);
			setFileNum(res?.payload?.CAS_NUMBER);
		});
		setVisible(true);
	};

	// close modal
	const exitSelectModal = () => {
		setVisible(false);
		setEditItem(null);
		setItem(null);
	};

	const onChangeWorkStatusId = (e) => {
		let value = e.target.value;
		setWorkStatusIds({
			...workStatusIds,
			[e.target.name]: value,
		});
	};

	const onChangeWorkStatusDate = (e) => {
		let value = e.target.value;
		setWorkStatusDate({
			...workStatusDate,
			[e.target.name]: value,
		});
	};

	const onChangeworkStatusReasons = (e) => {
		let value = e.target.value;
		setworkStatusReasons({
			...workStatusReasons,
			[e.target.name]: value,
		});
	};

	//add work status
	const handelWorkStatusList = () => {
		setWorkStatusList(
			workStatusList.concat(
				<div className="sesRequirementDiv" id={`workSt${workStatusList.length}`} key={workStatusList.length}>
					<CRow>
						<CCol md={4}>
							<CFormLabel htmlFor="inputEmail4">الحاله</CFormLabel>
							<FormControl fullWidth>
								<Select defaultValue={workStatusIds} displayEmpty onChange={onChangeWorkStatusId} name={workStatusList.length.toString()}>
									{workStatusIdsList.map((ele) => (
										<MenuItem value={ele?.id} key={ele?.id}>
											{ele?.arName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</CCol>
						<CCol md={4}>
							<CFormLabel htmlFor="inputEmail4">التاريخ</CFormLabel>
							<CFormInput
								type="date"
								defaultValue={workStatusDate}
								onChange={onChangeWorkStatusDate}
								id="inputEmail4"
								name={workStatusList.length.toString()}
							/>
						</CCol>
						<CCol md={4}>
							<CFormLabel htmlFor="inputEmail4">السبب</CFormLabel>
							<FormControl fullWidth>
								<Select onChange={onChangeworkStatusReasons} value={workStatusReasons} name={workStatusList.length.toString()}>
									{workReasonConstant?.map((ele) => (
										<MenuItem value={ele?.WRK_TYPE_ID_PK} key={ele?.WRK_TYPE_ID_PK}>
											{ele?.WRK_TYPE_NAME}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<CIcon
								style={{
									height: '18px',
									color: '#ff3547',
									display: 'inline-blok',
									cursor: 'pointer',
								}}
								icon={cilMinus}
								customClassName="nav-icon"
								onClick={() => {
									document.getElementById(`workSt${workStatusList.length}`).remove();
									setWorkStatusIds(workStatusIds);
									setWorkStatusDate(workStatusDate);
									setworkStatusReasons(workStatusReasons);
								}}
							/>
						</CCol>
					</CRow>
				</div>
			)
		);
	};

	//empty all input field
	const emptyInputsVals = () => {
		// console.log(stage[0].CLI_NAME);
		setWRKReason('');
		setWRKImportance('');
		setDeptClient('');
		setTheClient('');
		setTheCourt('');
		setTheCourtBranch('');
		setExEndDate('');
		setWRKOrigin('');
		setWRKOriginDate('');
		setWRKRequired('');
		setWRKNotes('');
		setWRKAttr('');
		// setcliName(stage[0].CLI_NAME);
		// setFileNum('');
		setWarningNum('');
		setWorkStatus('');
		setSessionDate('');
		setWarningNum('');
		setInformingId('');
		setExecuteId('');
		setStageId('');
		setSessionId('');
		setChequId('');
	};

	// post work
	const addNew = () => {
		setOpenAddSnack(false);
		setOpenEditSnack(false);
		let newWorkStatus = [];
		newWorkStatus =
			workStatusIds &&
			Object.entries(workStatusIds).map((ele1) => {
				const theDate = Object.entries(workStatusDate).find((ele2) => ele1[0] == ele2[0]);
				const theReason = Object.entries(workStatusReasons).find((ele3) => ele1[0] == ele3[0]);
				return {
					STATUS_ID: ele1[1],
					STATUS_DATE: theDate ? theDate[1] : new Date(),
					WRK_REASON_ID_PK: theReason ? theReason[1] : null,
				};
			});
		dispatch(
			addNewWork({
				WRK_TYPE_ID_PK: WRKReason ? WRKReason : undefined,
				WRK_DESCRIPTION: WRKRequired ? WRKRequired : undefined,
				WRK_NOTES: WRKNotes ? WRKNotes : undefined,
				EMP_ID_PK: theClient ? theClient : undefined,
				COU_ID_PK: theCourt ? theCourt : undefined,
				WRK_KIND_ID_PK: WRAttr ? WRAttr : 2,
				CLI_ID_PK: allWorks?.data[0].CLI_ID_PK,
				CAS_ID_PK: FileNum ? 1 : undefined,
				STG_ID_PK: StageId ? StageId : undefined,
				// CHQ_ID_PK: 1,
				INR_ID_PK: informingId ? informingId : undefined,
				SES_ID_PK: sessionId ? sessionId : undefined,
				WRN_ID_PK: WarningNum ? WarningNum : undefined,
				EXE_ID_PK: ExecuteId ? ExecuteId : undefined,
				CHQ_ID_PK: chequId ? chequId : undefined,
				WRK_DATE_LAST: ExEndDate ? ExEndDate : undefined,
				CAS_ID_PK: id,
				DT_STATUS:
					newWorkStatus.length > 0
						? newWorkStatus
						: [
								{
									STATUS_ID: 0,
									STATUS_DATE: new Date().toLocaleDateString(),
									WRK_REASON_ID_PK: undefined,
								},
						  ],
				// "USR_ID_PK2": 1
			})
		).then((res) => {
			// console.log(res)
			if (res?.payload?.result?.code) {
				console.log(res?.payload?.result);
				setErrorAdd(res?.payload?.result);
			} else {
				setVisible(false);
				setOpenAddSnack(true);
				setOpenEditSnack(false);
				emptyInputsVals();
				dispatch(getWorkData({ theParams: { id: id } })).then((res) => setStage(res.payload?.data));
			}
		});
	};

	// edit popup
	const showEditModal = (editId) => {
		setItem(null);
		setVisible(true);
		dispatch(getWorkById(editId)).then((res) => {
			setEditItem(res.payload);
			const theCourtName = theCourtsName.find((ele) => ele?.COU_NAME == res.payload?.COU_NAME);
			const WRKEditStatus =
				res.payload?.details?.length > 0 &&
				res.payload?.details?.map((ele, index) => (
					<div className="sesRequirementDiv" id={`workSt${index}`} key={index}>
						<CRow>
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4">الحاله</CFormLabel>
								<FormControl fullWidth>
									<Select
										defaultValue={workStatusIds ? workStatusIds : ele?.STATUS_ID}
										displayEmpty
										onChange={onChangeWorkStatusId}
										name={index.toString()}
									>
										{workStatusIdsList.map((ele) => (
											<MenuItem value={ele?.id} key={ele?.id}>
												{ele?.arName}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</CCol>
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4">التاريخ</CFormLabel>
								<CFormInput
									type="date"
									defaultValue={ele?.STATUS_DATE ? new Date(ele?.STATUS_DATE).toISOString().split('T')[0] : workStatusDate}
									onChange={onChangeWorkStatusDate}
									id="inputEmail4"
									name={index.toString()}
								/>
							</CCol>
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4">السبب</CFormLabel>
								<FormControl fullWidth>
									<Select
										onChange={onChangeworkStatusReasons}
										defaultValue={
											ele?.WRK_REASON_NAME
												? workReasonConstant?.find((ele2) => ele2?.WRK_TYPE_NAME == ele?.WRK_REASON_NAME)?.WRK_TYPE_ID_PK
												: workStatusReasons
										}
										name={index.toString()}
									>
										{workReasonConstant?.map((ele) => (
											<MenuItem value={ele?.WRK_TYPE_ID_PK} key={ele?.WRK_TYPE_ID_PK}>
												{ele?.WRK_TYPE_NAME}
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<CIcon
									style={{
										height: '18px',
										color: '#ff3547',
										display: 'inline-blok',
										cursor: 'pointer',
									}}
									icon={cilMinus}
									customClassName="nav-icon"
									onClick={() => {
										document.getElementById(`workSt${workStatusList.length}`).remove();
										setWorkStatusIds(workStatusIds);
										setWorkStatusDate(workStatusDate);
										setworkStatusReasons(workStatusReasons);
									}}
								/>
							</CCol>
						</CRow>
					</div>
				));
			if (res.payload?.details.length > 0) {
				setWorkStatusIds({ ...res.payload?.details.map((ele) => ele?.STATUS_ID) });
				setworkStatusReasons({
					...res.payload?.details.map((ele) => workReasonConstant?.find((ele2) => ele2?.WRK_TYPE_NAME == ele?.WRK_REASON_NAME)?.WRK_TYPE_ID_PK),
				});
				res.payload?.details.length > 0 && setWorkStatusDate({ ...res.payload?.details.map((ele) => new Date(ele?.STATUS_DATE).toLocaleDateString()) });
				setWorkStatusList(WRKEditStatus);
			}
			setWRKReason(res.payload?.WRK_TYPE_ID_PK ? res.payload?.WRK_TYPE_ID_PK : '');
			setWRKImportance(res.payload?.WRK_DEGREE ? res.payload?.WRK_DEGREE : '');
			setDeptClient(res.payload?.DEP_NAME ? res.payload?.DEP_NAME : '');
			setTheClient(res.payload?.EMP_ID_PK ? res.payload?.EMP_ID_PK : '');
			setTheCourt(res.payload?.COU_NAME ? theCourtName?.COU_ID_PK : '');
			setTheCourtBranch('');
			setExEndDate(res.payload?.WRK_DATE_LAST ? new Date(res.payload?.WRK_DATE_LAST).toISOString().split('T')[0] : '');
			setWRKOrigin(res.payload?.USR_NAME ? res.payload?.USR_NAME : '');
			setWRKOriginDate(res.payload?.CREATE_DATE ? new Date(res.payload?.CREATE_DATE).toISOString().split('T')[0] : '');
			setWRKRequired(res.payload?.WRK_DESCRIPTION ? res.payload?.WRK_DESCRIPTION : '');
			setWRKNotes(res.payload?.WRK_NOTES ? res.payload?.WRK_NOTES : '');
			setWRKAttr(res.payload?.WRK_KIND_ID_PK ? res.payload?.WRK_KIND_ID_PK : '');
			setcliName(allWorks?.data[0].CLI_NAME ? allWorks?.data[0].CLI_NAME : '');
			setFileNum(res.payload?.CAS_NUMBER ? res.payload?.CAS_NUMBER : '');
			setWarningNum(res.payload?.WRN_NUMBER ? res.payload?.WRN_NUMBER : '');
			setWorkStatus(res.payload?.details.length > 0 ? res.payload?.details : []);
			setSessionDate(res.payload?.SES_DATE ? new Date(res.payload?.SES_DATE).toISOString().split('T')[0] : '');
			setWarningNum(res.payload?.WRN_ID_PK ? res.payload?.WRN_ID_PK : '');
			setInformingId(res.payload?.INR_ID_PK ? res.payload?.INR_ID_PK : '');
			setExecuteId(res.payload?.EXE_ID_PK ? res.payload?.EXE_ID_PK : '');
			setStageId(res.payload?.STG_ID_PK ? res.payload?.STG_ID_PK : '');
			setSessionId(res.payload?.SES_ID_PK ? res.payload?.SES_ID_PK : '');
			setChequId(res.payload?.CHQ_ID_PK ? res.payload?.CHQ_ID_PK : '');
		});
	};

	// update work
	const saveUpdate = (editId) => {
		console.log({ ...workStatusIds }, { ...workStatusReasons }, { ...workStatusDate });
		let newWorkStatus = [];
		newWorkStatus =
			workStatusIds &&
			Object.entries(workStatusIds).map((ele1) => {
				const theDate = Object.entries(workStatusDate).find((ele2) => ele1[0] == ele2[0]);
				const theReason = Object.entries(workStatusReasons).find((ele3) => ele1[0] == ele3[0]);
				return {
					STATUS_ID: ele1[1],
					STATUS_DATE: theDate ? theDate[1] : new Date(),
					WRK_REASON_ID_PK: theReason ? theReason[1] : null,
				};
			});
		dispatch(
			updateWork({
				id: editId,
				data: {
					WRK_TYPE_ID_PK: WRKReason ? WRKReason : undefined,
					WRK_DESCRIPTION: WRKRequired ? WRKRequired : undefined,
					WRK_NOTES: WRKNotes ? WRKNotes : undefined,
					EMP_ID_PK: theClient ? theClient : undefined,
					COU_ID_PK: theCourt ? theCourt : undefined,
					WRK_KIND_ID_PK: WRAttr ? WRAttr : undefined,
					CLI_ID_PK: cliName ? 1 : undefined,
					CAS_ID_PK: FileNum ? 1 : undefined,
					STG_ID_PK: StageId ? StageId : undefined,
					SES_ID_PK: 21,
					EXE_ID_PK: 9,
					//TODO:CHQ_ID_PK "CHQ_ID_PK": 1,
					INR_ID_PK: informingId ? informingId : undefined,
					WRN_ID_PK: WarningNum ? WarningNum : undefined,
					EXE_ID_PK: ExecuteId ? ExecuteId : undefined,
					CHQ_ID_PK: chequId ? chequId : undefined,
					WRK_DATE_LAST: ExEndDate ? ExEndDate : undefined,
					SES_ID_PK: sessionId ? sessionId : undefined,
					DT_STATUS:
						newWorkStatus.length > 0
							? newWorkStatus
							: [
									{
										STATUS_ID: 0,
										STATUS_DATE: new Date().toDateString(),
										WRK_REASON_ID_PK: undefined,
									},
							  ],
					// "USR_ID_PK2": 1
				},
			})
		).then((res) => {
			// console.log(res)
			if (res?.payload?.result?.code) {
				console.log(res?.payload?.result);
				setErrorAdd(res?.payload?.result);
			} else {
				setVisible(false);
				setOpenAddSnack(true);
				setOpenEditSnack(true);
				emptyInputsVals();
				dispatch(getWorkData({ theParams: { id: id } })).then((res) => setStage(res.payload?.data));
			}
		});
	};
	//TODO مشكله فى سبب حاله العمل
	// delete Work
	const deleteTheWork = (id) => {
		// console.log(id);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		dispatch(deleteWork(id)).then((res) => (res?.payload?.result?.status == 200 ? setOpenDelSnack(true) : setOpenDelErrorSnack(true)));
	};

	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal visible={visible} onClose={() => exitSelectModal()}>
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilWindow} customClassName="nav-icon" />
					{editItem ? 'تعديل العمل' : setItem ? 'عرض العمل' : 'إضافه عمل'}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">سبب العمل</CFormLabel>
						{item ? (
							<p>{item?.WRK_TYPE_NAME ? item?.WRK_TYPE_NAME : 'لا يوجد'}</p>
						) : (
							<FormControl fullWidth>
								<Select onChange={(e) => setWRKReason(e.target.value)} value={WRKReason}>
									{workReasonConstant?.map((ele) => (
										<MenuItem value={ele?.WRK_TYPE_ID_PK} key={ele?.WRK_TYPE_ID_PK}>
											{ele?.WRK_TYPE_NAME}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">أهميه العمل</CFormLabel>
						{item ? (
							<p>{item?.WRK_DEGREE ? item?.WRK_DEGREE : 'لا يوجد'}</p>
						) : (
							<FormControl fullWidth>
								<Select
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
									onChange={(e) => setWRKImportance(e.target.value)}
									value={WRKImportance}
								>
									{/* {theSessionRequirment.map((ele) => (
                    <MenuItem value={ele?.RTYPE_ID_PK} key={ele?.RTYPE_ID_PK}>
                      {ele?.RTYPE_NAME}
                    </MenuItem>
                  ))} */}
								</Select>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> القسم المكلف</CFormLabel>
						{item ? (
							<p>{item?.DEP_NAME ? item?.DEP_NAME : 'لا يوجد'}</p>
						) : (
							<FormControl fullWidth>
								<Select
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
									onChange={(e) => setDeptClient(e.target.value)}
									value={DeptClient}
								>
									{/* {theSessionRequirment.map((ele) => (
                    <MenuItem value={ele?.RTYPE_ID_PK} key={ele?.RTYPE_ID_PK}>
                      {ele?.RTYPE_NAME}
                    </MenuItem>
                  ))} */}
								</Select>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						{/* {console.log('editItem', editItem)} */}
						<CFormLabel htmlFor="inputEmail4"> إرتباط العمل</CFormLabel>
						{item ? (
							<p>{item?.WRK_FLAG ? item?.WRK_FLAG : 'لا يوجد'}</p>
						) : (
							<FormControl fullWidth>
								<Select displayEmpty inputProps={{ 'aria-label': 'Without label' }} onChange={(e) => setWRKAttr(e.target.value)} value={WRAttr}>
									{workKind?.map((ele) => (
										<MenuItem value={ele?.WRK_KIND_ID_PK} key={ele?.WRK_KIND_ID_PK}>
											{ele?.WRK_KIND_NAME}
										</MenuItem>
									))}
								</Select>
								{/* {console.log(WRAttr)} */}
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">المكلفين</CFormLabel>
						{item ? (
							<p>{item?.EMP_NAME ? item?.EMP_NAME : 'لا يوجد'}</p>
						) : (
							<FormControl fullWidth>
								<Select
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
									onChange={(e) => setTheClient(e.target.value)}
									value={theClient}
								>
									{theEmployer?.map((ele) => (
										<MenuItem value={ele?.EMP_ID_PK} key={ele?.EMP_ID_PK}>
											{ele?.EMP_NAME}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						{/* {console.log(cliName)} */}
						<CFormLabel htmlFor="inputEmail4"> إسم العميل</CFormLabel>
						{item ? (
							<p>{item?.CLI_NAME ? item?.CLI_NAME : 'لا يوجد'}</p>
						) : editItem ? (
							<CFormInput
								type="text"
								// onChange={e => setcliName(e.target.value)}
								value={cliName}
								readOnly
							/>
						) : (
							<CFormInput
								type="text"
								// onChange={e => setcliName(e.target.value)}
								value={cliName}
								readOnly
							/>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> إسم المحكمه</CFormLabel>
						{item ? (
							<p>{item?.COU_NAME ? item?.COU_NAME : 'لا يوجد'}</p>
						) : (
							<FormControl fullWidth>
								<Select
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
									onChange={(e) => setTheCourt(e.target.value)}
									value={theCourt}
								>
									{theCourtsName?.map((ele) => (
										<MenuItem value={ele?.COU_ID_PK} key={ele?.COU_ID_PK}>
											{ele?.COU_NAME}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">رقم الملف</CFormLabel>
						{item ? (
							<p>{FileNum}</p>
						) : (
							<CFormInput
								type="text"
								// onChange={(e) => setFileNum(e.target.value)}
								value={FileNum}
								readOnly
							/>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">أخر موعد للتنفيذ</CFormLabel>
						{item ? (
							<p>{item?.WRK_DATE_LAST ? new Date(item?.WRK_DATE_LAST).toLocaleDateString() : 'لا يوجد'}</p>
						) : (
							<CFormInput type="date" value={ExEndDate} onChange={(e) => setExEndDate(e.target.value)} id="inputEmail4" />
						)}
					</CCol>
					<CCol md={6}>
						{item?.INR_NUMBER ? (
							<>
								<CFormLabel htmlFor="inputEmail4">رقم البلاغ</CFormLabel>
								<p>{item?.INR_NUMBER}</p>
							</>
						) : null}
						{item?.CHQ_NUMBER ? (
							<>
								<CFormLabel htmlFor="inputEmail4">رقم الشيك</CFormLabel>
								<p>{item?.CHQ_NUMBER}</p>
							</>
						) : null}
						{item?.EXE_PROCEDURE_NAME ? (
							<>
								<CFormLabel htmlFor="inputEmail4">الإجراء</CFormLabel>
								<p>{item?.EXE_PROCEDURE_NAME}</p>
							</>
						) : null}
						{item?.WRN_NUMBER ? (
							<>
								<CFormLabel htmlFor="inputEmail4">رقم الإنذار</CFormLabel>
								<p>{item?.WRN_NUMBER}</p>
							</>
						) : null}
						{item?.STG_NUMBER ? (
							<>
								<CFormLabel htmlFor="inputEmail4">رقم القضيه</CFormLabel>
								<p>{item?.STG_NUMBER}</p>
							</>
						) : null}
						{!item ? (
							WRAttr == 3 ? (
								<WorkAttrCompo
									title="رقم البلاغ"
									onChange={(e) => setInformingId(e.target.value)}
									value={informingId}
									error={errorAdd?.args?.find((ele) => ele == 'body.WRN_ID_PK is required') ? true : false}
									dataArr={informingsNum}
									selectBox={informingsNum.map((ele) => (
										<MenuItem value={ele?.INR_ID_PK} key={ele?.INR_ID_PK}>
											{ele?.INR_NUMBER}
										</MenuItem>
									))}
									displayError={
										errorAdd?.args?.find((ele) => (ele = 'body.WRN_ID_PK is required')) && <FormHelperText>الحقل مطلوب!</FormHelperText>
									}
								/>
							) : WRAttr == 4 ? (
								<WorkAttrCompo
									title="رقم الشيك"
									onChange={(e) => setChequId(e.target.value)}
									value={chequId}
									error={errorAdd?.args?.find((ele) => ele == 'body.CHQ_ID_PK is required') ? true : false}
									dataArr={chequisNum}
									selectBox={null}
									displayError={
										errorAdd?.args?.find((ele) => (ele = 'body.CHQ_ID_PK is required')) && <FormHelperText>الحقل مطلوب!</FormHelperText>
									}
								/>
							) : WRAttr == 5 ? (
								<WorkAttrCompo
									title="الإجراء"
									onChange={(e) => setExecuteId(e.target.value)}
									value={ExecuteId}
									error={errorAdd?.args?.find((ele) => ele == 'body.EXE_ID_PK is required') ? true : false}
									dataArr={allExecute}
									selectBox={allExecute?.map((ele) => (
										<MenuItem value={ele?.EXE_ID_PK} key={ele?.EXE_ID_PK}>
											{ele?.SUBJECTS}
										</MenuItem>
									))}
									displayError={
										errorAdd?.args?.find((ele) => (ele = 'body.EXE_ID_PK is required')) && <FormHelperText>الحقل مطلوب!</FormHelperText>
									}
								/>
							) : WRAttr == 6 ? (
								<WorkAttrCompo
									title="رقم الإنذار"
									onChange={(e) => setWarningNum(e.target.value)}
									value={WarningNum}
									error={errorAdd?.args?.find((ele) => ele == 'body.WRN_ID_PK is required') ? true : false}
									dataArr={allWarnings}
									selectBox={allWarnings?.map((ele) => (
										<MenuItem value={ele?.WRN_ID_PK} key={ele?.WRN_ID_PK}>
											{ele?.WRN_NUMBER}
										</MenuItem>
									))}
									displayError={
										errorAdd?.args?.find((ele) => (ele = 'body.WRN_ID_PK is required')) && <FormHelperText>الحقل مطلوب!</FormHelperText>
									}
								/>
							) : WRAttr == 7 || WRAttr == 8 ? (
								<>
									<WorkAttrCompo
										title="رقم القضيه"
										onChange={setStgSession}
										value={StageId}
										error={errorAdd ? (errorAdd?.args?.find((ele) => ele == 'body.STG_ID_PK is required') ? true : false) : false}
										dataArr={stagesNum}
										selectBox={stagesNum?.map((ele) => (
											<MenuItem value={ele?.STG_ID_PK} key={ele?.STG_ID_PK}>
												{ele?.STG_NUMBER}
											</MenuItem>
										))}
										displayError={
											errorAdd?.args?.find((ele) => (ele = 'body.STG_ID_PK is required')) && <FormHelperText>الحقل مطلوب!</FormHelperText>
										}
									/>
								</>
							) : null
						) : null}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">المنشأ</CFormLabel>
						{item ? (
							<p>{item?.USR_NAME ? item?.USR_NAME : 'لا يوجد'}</p>
						) : (
							<CFormInput
								type="text"
								// onChange={(e) => setWRKOrigin(e.target.value)}
								value={WRKOrigin}
								readOnly
							/>
						)}
					</CCol>
					<CCol md={6}>
						{WRAttr == 8 ? (
							<>
								{StageId ? (
									<WorkAttrCompo
										title="رقم الجلسه"
										onChange={(e) => setSessionId(e.target.value)}
										value={sessionId}
										error={errorAdd?.args?.find((ele) => ele == 'body.SES_ID_PK is required') ? true : false}
										dataArr={stgSessions}
										selectBox={stgSessions?.map((ele) => (
											<MenuItem value={ele?.SES_ID_PK} key={ele?.SES_ID_PK}>
												{ele?.SES_TYPE_NAME}
											</MenuItem>
										))}
										displayError={
											errorAdd?.args?.find((ele) => (ele = 'body.SES_ID_PK is required')) && <FormHelperText>الحقل مطلوب!</FormHelperText>
										}
									/>
								) : null}
								<CFormLabel htmlFor="inputEmail4">تاريخ الجلسه</CFormLabel>
								{item ? (
									<p>{item?.SES_DATE ? item?.SES_DATE : 'لا يوجد'}</p>
								) : (
									<CFormInput type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} id="inputEmail4" />
								)}
							</>
						) : null}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">تاريخ الإنشاء</CFormLabel>
						{item ? (
							<p>{item?.CREATE_DATE ? new Date(item?.CREATE_DATE).toLocaleDateString() : 'لا يوجد'}</p>
						) : (
							<CFormInput
								type="date"
								value={WRKOriginDate}
								// onChange={() => setWRKOriginDate(e.target.value)}
								id="inputEmail4"
								readOnly
							/>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">المطلوب</CFormLabel>
						{item ? (
							<p>{item?.WRK_TYPE_NAME ? item?.WRK_TYPE_NAME : 'لا يوجد'}</p>
						) : (
							<CFormInput type="text" value={WRKRequired} onChange={(e) => setWRKRequired(e.target.value)} id="inputEmail4" />
						)}
					</CCol>
					<CCol md={12}>
						<CFormLabel htmlFor="inputEmail4"> الملاحظات</CFormLabel>
						{item ? (
							<p>{item?.WRK_NOTES ? item?.WRK_NOTES : 'لا يوجد'}</p>
						) : (
							<CFormInput type="text" value={WRKNotes} onChange={(e) => setWRKNotes(e.target.value)} id="inputEmail4" />
						)}
					</CCol>
					<CCol md={12}>
						<CFormLabel htmlFor="inputEmail4"> المرفقات</CFormLabel>
						{item?._FILE > 0 ? (
							<CTable bordered>
								<AttachedHeadTable />
								<CTableBody>
									{/* {attachment?.map((ele, i) => (
										<CTableRow
											key={i}
											onClick={() => {
												dispatch(
													getWorkAttachmentData({
														id: selectedCriteria?.WRK_ID_PK,
														attachedId: ele?.ATH_ID_PK,
														fileName: ele?.ATH_NAME,
													})
												).then((res) => {
													if (res?.payload.status == 404) {
														// console.log(res);
														setOpenAttachedSnack(true);
													}
												});
											}}
											style={{ cursor: 'pointer' }}
										>
											<CTableHeaderCell scope="row">{i}</CTableHeaderCell>
											<CTableDataCell>{ele?.ATH_NAME}</CTableDataCell>
											<CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
											<CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
											<CTableDataCell>{new Date(ele?.ATH_DATE).toLocaleDateString()}</CTableDataCell>
											<CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
										</CTableRow>
									))} */}
								</CTableBody>
							</CTable>
						) : (
							<p>لا يوجد</p>
						)}
					</CCol>
					{/* <CCol md={12}>
            <CFormLabel htmlFor="inputEmail4"> المطلوب</CFormLabel>
            {item ? (
              <p>{item?.WRK_NOTES  ? item?.WRK_NOTES : "لا يوجد"}</p>
            ) : (
              <CFormInput
                type="date"
                value={editItem ? editItem?.WRK_NOTES: ""}
                id="inputEmail4"
              />
            )}
          </CCol> */}
					<CCol md={12}>
						{item ? (
							item?.details.map((st, i) => (
								<WorkStatusComponent key={i} statusId={st?.STATUS_ID} statusDate={st?.STATUS_DATE} statusReason={st?.WRK_REASON_NAME} />
							))
						) : (
							<>
								<CFormLabel htmlFor="inputEmail4">
									{' '}
									حاله العمل{' '}
									<CIcon
										style={{
											height: '18px',
											color: '#142f76',
											margin: '5px 2px auto auto',
											cursor: 'pointer',
										}}
										icon={cilPlus}
										customClassName="nav-icon"
										onClick={handelWorkStatusList}
									/>
								</CFormLabel>
								{workStatusList}
							</>
						)}
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton color="danger" className="btn-modal-close" onClick={() => exitSelectModal()}>
					إغلاق
				</CButton>
				{editItem ? (
					<CButton className="btn-modal-close btn-modal-save" onClick={() => saveUpdate(editItem?.WRK_ID_PK)}>
						حفظ التغيرات
					</CButton>
				) : !editItem && !item ? (
					<CButton className="btn-modal-close btn-modal-save" onClick={addNew}>
						حفظ
					</CButton>
				) : null}
			</CModalFooter>
		</CModal>
	);
	const workCard = (data) =>
		data?.map((ele, index) => {
			return {
				id: (index += 1),
				// wanting: ele?.EXE_TYPE_NAME,
				employer: <span onClick={() => getItem(ele?.WRK_ID_PK)}>{ele?.EMP_NAME}</span>,
				// informNum: ele?.SUBJECTS,
				type: <span onClick={() => getItem(ele?.WRK_ID_PK)}>{ele?.WRK_TYPE_NAME}</span>,
				lastDate: (
					<span onClick={() => getItem(ele?.WRK_ID_PK)}>
						{ele?.WRK_DATE_LAST ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.WRK_DATE_LAST)) : null}
					</span>
				),
				regDate: (
					<span onClick={() => getItem(ele?.WRK_ID_PK)}>
						{ele?.CREATE_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.CREATE_DATE)) : null}
					</span>
				),
				// court: ele?.FIL_MEDITOR_NAME,
				status: <span onClick={() => getItem(ele?.WRK_ID_PK)}>{ele?.STATUS_NAME ? ele?.STATUS_NAME : null}</span>,
				// attachment: ele?._FILE,
				DeletEdit: (
					<p>
						{/* <CButton style={{ background: '#1e42a0 !important' }}>
							<CIcon
								onClick={() => showEditModal(ele?.WRK_ID_PK)}
								style={{ height: '16px', marginRight: '-3px' }}
								icon={cilPencil}
								customClassName="nav-icon"
							/>
						</CButton> */}
						<CButton color={'danger'}>
							<CIcon
								onClick={() => deleteTheWork(ele?.WRK_ID_PK)}
								style={{ height: '16px', marginRight: '-3px' }}
								icon={cilTrash}
								customClassName="nav-icon"
							/>
						</CButton>
					</p>
				),
			};
		});

	const datatable = {
		columns: [
			{
				label: '#',
				field: 'id',
				sort: 'asc',
				width: 100,
			},
			{
				label: 'المطلوب',
				field: 'type',
				sort: 'asc',
				width: 150,
			},
			{
				label: 'المكلف',
				field: 'employer',
				sort: 'asc',
				width: 150,
			},
			// {
			//     label: ' رقم القضيه   ',
			//     field: 'caseNum',
			//     sort: 'asc',
			//     width: 100
			// },
			// {
			//     label: 'رقم البلاغ',
			//     field: 'informNum',
			//     sort: '',
			//     width: 100
			// },
			{
				label: ' أخر موعد   ',
				field: 'lastDate',
				sort: 'asc',
				width: 100,
			},
			{
				label: ' تاريخ التسجيل   ',
				field: 'regDate',
				sort: 'asc',
				width: 100,
			},
			// {
			//     label: 'المحكمه',
			//     field: 'court',
			//     sort: '',
			//     width: 100
			// },
			{
				label: 'حاله العمل',
				field: 'status',
				sort: '',
				width: 100,
			},
			{
				label: '',
				field: 'DeletEdit',
				sort: '',
				width: 80,
			},
		],
		rows: searchedDiv ? workCard(searchedDiv) : workCard(allWorks?.data),
	};
	const classifiedFun = React.useCallback(() => {
		dispatch(
			getWorkData({
				theParams: {
					clientNameSearch: clientNameSearch ? clientNameSearch : undefined,
					statusWorkSearch: statusWorkSearch ? statusWorkSearch : undefined,
					wrkTypeSearch: wrkTypeSearch ? wrkTypeSearch : undefined,
					wrkCreatDateSearchFrom: wrkCreatDateSearchFrom ? wrkCreatDateSearchFrom : undefined,
					wrkCreatDateSearchTo: wrkCreatDateSearchTo ? wrkCreatDateSearchTo : undefined,
					wrkCreatDateSearchFrom: wrkCreatDateSearchFrom ? wrkCreatDateSearchFrom : undefined,
					wrkCreatDateSearchTo: wrkCreatDateSearchTo ? wrkCreatDateSearchTo : undefined,
					searchVal: searchVal ? searchVal : undefined,
					id: id ? id : undefined,
				},
			})
		);
	}, [
		classifiedName,
		clientNameSearch,
		statusWorkSearch,
		wrkTypeSearch,
		wrkCreatDateSearchFrom,
		wrkCreatDateSearchTo,
		wrkCreatDateSearchFrom,
		wrkCreatDateSearchTo,
		searchVal,
		id,
	]);

	const handelSearchbtn = React.useMemo(()=>(e) => {
		if (e.key === 'Enter') {
			classifiedFun();
		}
	}, [
		classifiedName,
		clientNameSearch,
		statusWorkSearch,
		wrkTypeSearch,
		wrkCreatDateSearchFrom,
		wrkCreatDateSearchTo,
		wrkCreatDateSearchFrom,
		wrkCreatDateSearchTo,
		searchVal,
		id,
	]);
	const handleChange = React.useMemo(()=>(event) => {
		const {
			target: { value },
		} = event;
		setClassifiedName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	}, [
		classifiedName,
		clientNameSearch,
		statusWorkSearch,
		wrkTypeSearch,
		wrkCreatDateSearchFrom,
		wrkCreatDateSearchTo,
		wrkCreatDateSearchFrom,
		wrkCreatDateSearchTo,
		searchVal,
		id,
	]);
	const openAddPopup = () => {
		setEditItem(null);
		setItem(null);
		setVisible(true);
	};
	const handelChangePgae = React.useCallback((e, val) => {
		setId(val);
		dispatch(
			getWorkData({
				theParams: {
					offset: val * 10,
					limit: '10',
				},
			})
		)
	},[page]);
	

	const searchByChar = (e) => {
		console.log(e.target.value);
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setSearchedDiv(null);
			setSearchedDiv(allWorks);
		} else {
			const newClassifiedArr = allWorks?.data?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setSearchedDiv(newClassifiedArr);
		}
	};
	const pagesNum = allWorks.total ? Math.floor(allWorks.total / 10) : 1;
	return (
		<div className="file-alerts work-management works-page">
			<CRow>
				<CCol>
					{}
					<div className="agency-navs card-inputs-flex mb-2">
						<div className=" ">
							<div className="classification">
								<FormControl>
									<Select
										labelId="demo-customized-select-label"
										id="demo-customized-select"
										value={selectedVal}
										// onChange={(e) => fetchDataSelectedByAttached(e)}
										// input={<BootstrapInput />}
									>
										<MenuItem value={'1'}>الكل</MenuItem>
										<MenuItem value={'2'}>للتنفيذ</MenuItem>
										<MenuItem value={'3'}>تم التنفيذ </MenuItem>
										<MenuItem value={'4'}>لم تحدث</MenuItem>
										<MenuItem value={'5'}>مؤجله</MenuItem>
										<MenuItem value={'6'}>تذكير</MenuItem>
										<MenuItem value={'7'}>غير منفذه</MenuItem>
									</Select>
								</FormControl>
							</div>
						</div>
						<CNav className="">
							{/* <p>
                        <CTooltip content="إضافه وكاله" placement="bottom">
                            <CIcon onClick={() => setVisible(true)} size={'sm'} icon={cilPlus} customClassName="nav-icon" />
                        </CTooltip>
                    </p>
                    <p>
                        <CTooltip content="تحديث" placement="bottom">
                            <CIcon size={'sm'} icon={cilReload} customClassName="nav-icon" />
                        </CTooltip>
                    </p> */}
							<p>
								<CTooltip content="معاينه" placement="bottom">
									<CIcon size={'sm'} icon={cilFindInPage} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content="طباعه" placement="bottom">
									<CIcon size={'sm'} icon={cilPrint} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content="تصدير pdf" placement="bottom">
									<CIcon size={'xl'} icon={cilSave} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content="طباعه لاحقا" placement="bottom">
									<CIcon size={'sm'} icon={cilShareBoxed} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content="إرسال" placement="bottom">
									<CIcon size={'sm'} icon={cilCursor} customClassName="nav-icon" />
								</CTooltip>
							</p>
							<p>
								<CTooltip content="outlook" placement="bottom">
									<CIcon size={'sm'} icon={cilAt} customClassName="nav-icon" />
								</CTooltip>
							</p>
						</CNav>
					</div>
				</CCol>
			</CRow>
			<div className="checkboxBtn">
				<label className="switch" onClick={(e) => setChartVisible(e.target.checked)}>
					<input type="checkbox" />
					<span className="slider round"></span>
				</label>
				<span
					style={{
						marginRight: '10px',
						display: 'inline-block',
						marginTop: '-5px',
					}}
				>
					{' '}
					الإحصائيات{' '}
				</span>
			</div>
			<CHeaderDivider className="mb-3 mt-2" />
			<CRow className={`${chartVisible ? 'showChart' : 'hideChart'}`}>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<Doughnut
								data={{
									labels: ['ااتنفيذ', 'تم التنفيذ'],
									datasets: [
										{
											data: [4, 2],
											backgroundColor: ['#36A2EB', '#FF6384'],
											hoverBackgroundColor: ['#36A2EB', '#FF6384'],
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
								<div>
									<span className="allChart"></span>
									<span>تم التنفيذ</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>لم تنفذ</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<Doughnut
								data={{
									labels: ['الكل', ' لم تحدث'],
									datasets: [
										{
											data: [4, 2],
											backgroundColor: ['#36A2EB', '#FFCE56'],
											hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
								<div>
									<span className="allChart"></span>
									<span>الكل</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span>لم تحدث</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<Doughnut
								data={{
									labels: ['الكل', 'غير منفذه'],
									datasets: [
										{
											data: [4, 2],
											backgroundColor: ['#36A2EB', '#FF6384'],
											hoverBackgroundColor: ['#36A2EB', '#FF6384'],
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
								<div>
									<span className="allChart"></span>
									<span>الكل</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>غير منفذه</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<Doughnut
								data={{
									labels: ['للتذكير', 'مؤجله'],
									datasets: [
										{
											data: [4, 2],
											backgroundColor: ['#36A2EB', '#FFCE56'],
											hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
										},
									],
								}}
								options={{
									plugins: {
										legend: {
											display: false,
										},
									},
								}}
							/>
							<div
								style={{
									display: 'flex',
									fontSize: '10px',
									justifyContent: 'space-between',
								}}
							>
								<div>
									<span className="allChart"></span>
									<span>مؤجله</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span>للتذكير</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
			<div className="headerFiles">
				<div>
					{/* <CButton onClick={openAddPopup} className="add-contact">
						<CIcon style={{ height: '25px' }} className="icon" customClassName="nav-icon" icon={cilPlus} />
					</CButton> */}
					<FormControl sx={{ m: 1, width: 300, mt: 3 }} className="classified">
						<Select
							multiple
							displayEmpty
							value={classifiedName}
							onChange={handleChange}
							input={<OutlinedInput />}
							renderValue={(selected) => {
								if (selected.length === 0) {
									return <span>تصنيف حسب</span>;
								}

								return selected.join(', ');
							}}
							MenuProps={MenuPropsForClient}
							inputProps={{ 'aria-label': 'Without label' }}
						>
							<MenuItem disabled value="">
								<em>تصنيف حسب</em>
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
					<CFormInput type="text" value={searchVal} onChange={(e) => searchByChar(e)} placeholder="بحث..." onKeyDown={(e) => handelSearchbtn(e)} />
				</div>
			</div>
			<div className={`classified-global-criteria ${classifiedName?.length == 0 && 'hide'}`}>
				{classifiedName?.find((ele) => ele == 'حاله العمل') && (
					<>
						<FormControl style={{ width: '30%' }}>
							<InputLabel id="demo-simple-select-label">حاله العمل</InputLabel>
							<Select value={statusWorkSearch} displayEmpty onChange={(e) => setStatusWorkSearch(e.target.value)}>
								{workStatusIdsList.map((ele) => (
									<MenuItem value={ele?.id} key={ele?.id}>
										{ele?.arName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</>
				)}
				{classifiedName?.find((ele) => ele == 'إسم العميل') && (
					<TextField style={{ width: '30%' }} label="إسم العميل" value={clientNameSearch} onChange={(e) => setClientNameSearch(e.target.value)} />
				)}
				{classifiedName?.find((ele) => ele == 'تاريخ إنشاء العمل') && (
					<>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label="تاريخ العمل من"
								value={wrkCreatDateSearchFrom}
								onChange={setWrkCreatDateSearchFrom}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label="تاريخ العمل إلى"
								value={wrkCreatDateSearchTo}
								onChange={setWrkCreatDateSearchTo}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</>
				)}
				{classifiedName?.find((ele) => ele == 'تاريخ نهايه العمل') && (
					<>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label="تاريخ العمل من"
								value={wrkLastDateSearchFrom}
								onChange={setWrkLastDateSearchFrom}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label="تاريخ العمل إلى"
								value={wrkLastDateSearchTo}
								onChange={setWrkLastDateSearchTo}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
					</>
				)}
				{classifiedName?.find((ele) => ele == 'نوع العمل') && (
					<TextField style={{ width: '30%' }} label="نوع العمل" value={wrkTypeSearch} onChange={(e) => setWrkTypeSearch(e.target.value)} />
				)}
				{classifiedName.length > 0 && (
					<div style={{ width: '120px', margin: '20px auto', display: 'block' }}>
						<CButton onClick={classifiedFun}>تطبيق</CButton>
						<CIcon
							style={{ height: '16px', cursor: 'pointer', position: 'absolute', top: '7px', left: '7px' }}
							icon={cilX}
							customClassName="nav-icon"
							onClick={() => setClassifiedName([])}
						/>
					</div>
				)}
			</div>
			<CRow>
				<CCol sm={12}>
					<MDBDataTable
						striped
						// bordered
						responsive
						small
						hover
						data={datatable}
					/>
				</CCol>
				<CCol md={12}>
					<Stack spacing={2}>
						<Pagination
							count={pagesNum == 0 ? 1 : pagesNum}
							page={page}
							defaultPage={currentPage}
							siblingCount={0}
							// variant="outlined"
							shape="rounded"
							color="primary"
							onChange={handelChangePgae}
						/>
					</Stack>
				</CCol>
			</CRow>
			{editItem ? ReturnedPopup(editItem) : item ? ReturnedPopup(item) : ReturnedPopup()}
			{openAddSnack || openDelSnack || openDelErrorSnack ? (
				<Snackbar open={openAddSnack || openDelSnack || openDelErrorSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity={`${openDelSnack || openDelErrorSnack ? 'error' : 'success'}`} sx={{ width: '100%' }}>
						{openEditSnack
							? 'تم التعديل بنجاح'
							: openDelSnack
							? 'تم إزاله العمل الإدارى'
							: openDelErrorSnack
							? 'لا يمكن إزاله العمل'
							: 'تمت الإضافه بنجاح'}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(FileExecution);
