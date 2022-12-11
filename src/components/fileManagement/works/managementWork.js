import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { MDBDataTable } from 'mdbreact';
import { useParams } from 'react-router-dom';
import {
	CButton,
	CCol,
	CRow,
	CModalBody,
	CModalTitle,
	CModalHeader,
	CModal,
	CFormLabel,
	CModalFooter,
	CFormInput,
	CTable,
	CTableBody,
	CTableRow,
	CTableHeaderCell,
	CTableDataCell,
	CCarousel,
	CCarouselItem,
} from '@coreui/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { cilWindow, cilPlus, cilMinus, cilX, cilTrash } from '@coreui/icons';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import CIcon from '@coreui/icons-react';
import { useIntl } from 'react-intl';

import { getWorkData, getWorkById, addNewWork, updateWork, deleteWork, getWorkAttachment, getWorkAttachmentData, deleteAttachment } from '../../../store/reducers/work';
import { getWorkKind, getWorkReasons, getWorkStatusReasons } from '../../../store/reducers/constants/work';
import { WorkStatusComponent, WorkAttrCompo, ComponentWorkStatusAdd, workCard } from './workFile';
import { WorkConstantStatusReason, WorkConstantReason } from './workConstant';
import { getInformingsData } from '../../../store/reducers/informings';
import { getCourtsName } from '../../../store/reducers/theConstants';
import AttachedHeadTable from '../../../features/attachedFileHaed';
import { workStatusConstant } from '../../../contraints/constants';
import { getEmployeeData } from '../../../store/reducers/emlpoyee';
import { getWarningsData } from '../../../store/reducers/warnings';
import { getExecuteData } from '../../../store/reducers/execute';
import { getStageData } from '../../../store/reducers/stage';
import { getSessionData } from '../../../store/reducers/session';
import AttachedPopup from "../../../features/attachment";
import DeletePopup from '../../../features/delete';
import translation from '../../../i18n/translate';
//TODO اهميه العمل سيليكت  القسم المكلف , حاله العمل بالعربى مش مظبوطه
const FileExecution = () => {
	const [stage, setStage] = useState([]);
	const [editItem, setEditItem] = useState(null);
	const [item, setItem] = useState(null);
	const [visible, setVisible] = useState(false);
	const { id, name, speicifiedId } = useParams();
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [deletedItemId, setDeletedItemId] = useState(null);

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
	const [WRKNotesEn, setWRKNotesEn] = useState('');
	const [WRAttr, setWRKAttr] = useState(2);
	const [cliName, setcliName] = useState('');
	const [FileNum, setFileNum] = useState('');
	const [WarningNum, setWarningNum] = useState('');
	const [WorkStatus, setWorkStatus] = useState([]);
	const [workKind, setWorkKind] = useState([]);
	const [informingId, setInformingId] = useState('');
	const [ExecuteId, setExecuteId] = useState('');
	const [StageId, setStageId] = useState('');
	const [chequId, setChequId] = useState('');
	const [sessionDate, setSessionDate] = useState('');
	const [workReasonConstant, setWorReasonConstant] = useState([]);
	const [workStatusReasonConstant, setWorkStatusReasonConstant] = useState([]);
	const [theEmployer, setTheEmployer] = useState([]);
	const [theCourtsName, setTheCourtsName] = useState([]);
	const [informingsNum, setInformingsNum] = useState([]);
	const [warningsNum, setWarningsNum] = useState([]);
	const [chequisNum, setChequisNum] = useState([]);
	const [stagesNum, setStagesNum] = useState([]);
	const [exesNum, setExesNum] = useState([]);
	const [workStatusList, setWorkStatusList] = useState([]);
	const [workStatusIdsList, setworkStatusIdsList] = useState([]);
	const [errorAdd, setErrorAdd] = useState([]);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
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
	const [constantAdd, setConstantAdd] = useState('');
	const [arrayOfDivs, setArrayOfDivs] = useState([]);
	const [divId, setDivId] = useState(Date.now());
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const [wrkCreatDateValidation, setwrkCreatDateValidation]= useState(false) 
	const [wrkLastDateValidation, setwrkLastDateValidation]= useState(false)
	const { formatMessage } = useIntl();
	
	const names = [formatMessage({id: 'workStatus'}), formatMessage({id: 'workDate'}), formatMessage({id: 'workEndDate'}), formatMessage({id: 'workType'})];
	const ref0 = useRef();
	const dispatch = useDispatch();
	const theme = useTheme();

	const { allWorks, isLoadingWork } = useSelector((state) => state.work);
	const { allExecute } = useSelector((state) => state.execute);
	const { selectedCase } = useSelector((state) => state.fileManagement);
	const { theCourtsNames } = useSelector((state) => state.theConstants);
	const { allWarnings } = useSelector((state) => state.warning);

	//TODO chequ nums

	useEffect(() => {
		dispatch(getWorkData({ theParams: { id: id } })).then((res) => setStage(res.payload?.data));
		setcliName(stagesNum[0]?.CLI_NAME);
		// setFileNum(stage?[0].CAS_NUMBER);
		// elmokalfeen
		dispatch(getEmployeeData()).then((res) => setTheEmployer(res.payload));
		//get courts name
		dispatch(getCourtsName()).then((res) => setTheCourtsName(res.payload));
		// get Informing Numbers
		dispatch(getInformingsData({ theParams: { id: id } })).then((res) => setInformingsNum(res.payload.data));
		// get Warning Numbers
		dispatch(getWarningsData({ theParams: { id: id } })).then((res) => setWarningsNum(res.payload.data));
		// get stage
		dispatch(getStageData(id)).then((res) => setStagesNum(res.payload.data));
		// get execute number
		dispatch(getExecuteData({ theParams: { id: id } })).then((res) => setExesNum(res.payload.data));
		dispatch(getWorkKind()).then((res) => setWorkKind(res.payload));
		dispatch(getWorkReasons()).then((res) => setWorReasonConstant(res.payload));
		dispatch(getWorkStatusReasons()).then((res) => setWorkStatusReasonConstant(res.payload));
		setworkStatusIdsList(workStatusConstant);
		//get work from other location
		name == 'work' && speicifiedId && !isLoadingWork && showEditModal(speicifiedId);
	}, [dispatch]);

		
 const WorkTableColumn = [
	{
		label: '#',
		field: 'id',
		sort: 'asc',
		width: 100,
	},
	{
		label: formatMessage({id: 'required'}),
		field: 'type',
		sort: 'asc',
		width: 150,
	},
	{
		label: formatMessage({id: 'theEmployee'}),
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
		label: formatMessage({id: 'lastAppiontment'}),
		field: 'lastDate',
		sort: 'asc',
		width: 100,
	},
	{
		label: formatMessage({id: 'registerDate'}),
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
		label: formatMessage({id: 'workStatus'}),
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
];

	// get work kind
	const handelWorkKind = useCallback(() => {
		dispatch(getWorkKind()).then((res) => setWorkKind(res.payload));
	}, [constantAdd]);
	// get work reasons
	const handelWorkReason = useCallback(() => {
		dispatch(getWorkReasons()).then((res) => setWorReasonConstant(res.payload));
	}, [constantAdd]);
	// get reason for work  status
	const handelWorkStatusReason = useCallback(() => {
		dispatch(getWorkStatusReasons()).then((res) => setWorkStatusReasonConstant(res.payload));
	}, [constantAdd]);
	//get session for stage
	const setStgSession = (e) => {
		console.log(e.target.value);
		setStageId(e.target.value);
		dispatch(getSessionData({ theParams: { stgNumSearch: e.target.value } })).then((res) => setStgSessions(res.payload));
	};

	useMemo(() => {
		setFileNum(selectedCase?.CAS_NUMBER);
		setcliName(stage[0]?.CLI_NAME);
		setWRKOriginDate(new Date().toISOString().split('T')[0]);
		setWRKOrigin('المدير');
		setWRKAttr(WRAttr);
		setStagesNum(
			Array.from(new Set(stagesNum?.map((a) => a.STG_ID_PK))).map((id) => {
				return stagesNum?.find((a) => a.STG_ID_PK == id);
			})
		);
		document.querySelectorAll('.work-modal .carousel-control-next')[0]?.setAttribute('disabled', true);
	}, [stage, WRAttr, visible]);

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
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenAttachedSnack(false);
	};

	//empty all input field
	const emptyInputsVals = () => {
		// console.log(stage[0].CLI_NAME);
		setWorkStatusList([]);
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
		setWRKNotesEn('')
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
		setArrayOfDivs([]);
	};
	// close modal
	const exitSelectModal = () => {
		setVisible(false);
		setEditItem(null);
		setItem(null);
		emptyInputsVals();
	};

	const handelChangeStatusWork = (e, id) => {
		let newArrOfDivs = arrayOfDivs;
		if (e.target.name == 'workStatusIds') {
			newArrOfDivs.find((item) => item.id === id)['workStatusIds'] = e.target.value;
		} else if (e.target.name == 'workStatusDate') {
			newArrOfDivs.find((item) => item.id === id)['workStatusDate'] = e.target.value;
		}
		setArrayOfDivs(newArrOfDivs);
	};
	const handelChangeResonsWrkStatus = (e, value, id) => {
		let newArrOfDivs = arrayOfDivs;
		// console.log(newArrOfDivs.find((item) => item.id === id),ref0.current.getAttribute('name'))
		newArrOfDivs.find((item) => item.id === id)[ref0.current?.getAttribute('name')] = value;
		setArrayOfDivs(newArrOfDivs);
	};
	//add work status
	const handelWorkStatusList = () => {
		setArrayOfDivs([...arrayOfDivs, { id: divId + 1, workStatusIds: '', workStatusDate: '', workStatusReasons: '' }]);
		setDivId(divId + 1);
	};
	// remove work status
	const handelRemoveArrStatus = (id) => {
		// console.log(id, arrayOfDivs)
		setArrayOfDivs((prevState) => {
			let newArr = prevState?.filter((item) => item.id !== id);
			return newArr;
		});
	};

	// get work by id
	const getItem = (id) => {
		setEditItem(null);
		dispatch(getWorkAttachment(id)).then((res) => setAttachment(res.payload));
		dispatch(getWorkById(id)).then((res) => {
			setItem(res.payload);
			setFileNum(res?.payload?.CAS_NUMBER);
			setVisible(true);
		});
	};
	// add modal
	const openAddPopup = () => {
		emptyInputsVals();
		setEditItem(null);
		setItem(null);
		setVisible(true);

		document.querySelectorAll('.work-modal .carousel-control-next')[0]?.setAttribute('disabled', true);
	};
	// post work
	const addNew = () => {
		setOpenAddSnack(false);
		setOpenEditSnack(false);
		const newArr =
			arrayOfDivs.length == 0
				? [
						{
							STATUS_ID: 3,
							STATUS_DATE: new Date().toLocaleDateString(),
							WRK_REASON_ID_PK: undefined,
						},
				  ]
				: arrayOfDivs.map((ele) => ({
						STATUS_ID: ele.workStatusIds ? ele.workStatusIds : ele.workStatusIds == 0 ? 0 : undefined,
						WRK_REASON_ID_PK: ele.workStatusReasons
							? workStatusReasonConstant?.find((ele1) => ele1?.WRK_REASON_NAME || ele1?.WRK_REASON_NAME_EN == ele.workStatusReasons)?.WRK_REASON_ID_PK
							: undefined,
						STATUS_DATE: ele.workStatusDate ? ele.workStatusDate : null,
				  }));
		const WRKReasonId = workReasonConstant?.find((ele) => ele?.WRK_TYPE_NAME || ele?.WRK_TYPE_NAME_EN == WRKReason)?.WRK_TYPE_ID_PK;
		const theCourtId = theCourtsName?.find((ele) => ele?.COU_NAME || ele?.COU_NAME_EN == theCourt)?.COU_ID_PK;
		// console.log('arrayOfDivs: ', newArr, arrayOfDivs.length == 0);
		dispatch(
			addNewWork({
				WRK_TYPE_ID_PK: WRKReason ? WRKReasonId : undefined,
				WRK_DESCRIPTION: WRKRequired ? WRKRequired : undefined,
				WRK_NOTES: WRKNotes ? WRKNotes : undefined,
				WRK_NOTES_EN: WRKNotesEn ? WRKNotesEn : undefined,
				EMP_ID_PK: theClient ? theClient : undefined,
				COU_ID_PK: theCourt ? theCourtId : undefined,
				WRK_KIND_ID_PK: WRAttr ? WRAttr : 2,
				CLI_ID_PK: stagesNum[0]?.CLI_ID_PK,
				CAS_ID_PK: FileNum ? 1 : undefined,
				STG_ID_PK: StageId ? StageId : undefined,
				// CHQ_ID_PK: undefined,
				INR_ID_PK: informingId ? informingId : undefined,
				SES_ID_PK: sessionId ? sessionId : undefined,
				WRN_ID_PK: WarningNum ? WarningNum : undefined,
				EXE_ID_PK: ExecuteId ? ExecuteId : undefined,
				CHQ_ID_PK: chequId ? chequId : undefined,
				WRK_DATE_LAST: ExEndDate ? ExEndDate : undefined,
				CAS_ID_PK: id,
				DT_STATUS: newArr,
				WRK_DEGREE: WRKImportance ? WRKImportance : undefined,
				// "USR_ID_PK2": undefined
			})
		).then((res) => {
			console.log(res.payload?.res);
			if (!WRKRequired) {
				setErrorAdd(res.payload?.res?.data);
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
		dispatch(getWorkAttachment(editId)).then((res) => setAttachment(res.payload));
		dispatch(getWorkById(editId)).then((res) => {
			// console.log(res.payload);
			setEditItem(res.payload);
			const WRKEditStatus =
				res.payload?.details?.length > 0
					? res.payload?.details?.map((ele, index) => ({
							id: index + Date.now(),
							workStatusIds: ele?.STATUS_ID ? ele?.STATUS_ID : ele.STATUS_ID == 0 ? 0 : '',
							workStatusDate: ele?.STATUS_DATE ? new Date(ele?.STATUS_DATE).toISOString().split('T')[0] : '',
							workStatusReasons: ele?.WRK_REASON_NAME ? ele?.WRK_REASON_NAME : '',
					  }))
					: [];
			// console.log(WRKEditStatus)
			setWRKReason(res.payload?.WRK_TYPE_NAME ? res.payload?.WRK_TYPE_NAME : '');
			setWRKImportance(res.payload?.WRK_DEGREE ? res.payload?.WRK_DEGREE : '');
			setDeptClient(res.payload?.DEP_NAME ? res.payload?.DEP_NAME : '');
			setTheClient(res.payload?.EMP_ID_PK ? res.payload?.EMP_ID_PK : '');
			setTheCourt(res.payload?.COU_NAME ? res.payload?.COU_NAME : '');
			setTheCourtBranch('');
			setExEndDate(res.payload?.WRK_DATE_LAST ? new Date(res.payload?.WRK_DATE_LAST).toISOString().split('T')[0] : '');
			setWRKOrigin(res.payload?.USR_NAME ? res.payload?.USR_NAME : '');
			setWRKOriginDate(res.payload?.CREATE_DATE ? new Date(res.payload?.CREATE_DATE).toISOString().split('T')[0] : '');
			setWRKRequired(res.payload?.WRK_DESCRIPTION ? res.payload?.WRK_DESCRIPTION : '');
			setWRKNotes(res.payload?.WRK_NOTES ? res.payload?.WRK_NOTES : '');
			setWRKNotesEn(res.payload?.WRK_NOTES_EN ? res.payload?.WRK_NOTES_EN : '');
			setWRKAttr(res.payload?.WRK_KIND_ID_PK ? res.payload?.WRK_KIND_ID_PK : '');
			setcliName(stage[0].CLI_NAME ? stage[0].CLI_NAME : '');
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
			setArrayOfDivs(WRKEditStatus);
		});
	};

	// update work
	const saveUpdate = (editId) => {
		let newWorkStatus = [];
		newWorkStatus = arrayOfDivs.map((ele) => ({
			STATUS_ID: ele.workStatusIds ? ele.workStatusIds : ele.workStatusIds == 0 ? 0 : undefined,
			WRK_REASON_ID_PK: ele.workStatusReasons
				? workStatusReasonConstant?.find((ele1) => ele1?.WRK_REASON_NAME == ele.workStatusReasons)?.WRK_REASON_ID_PK
				: undefined,
			STATUS_DATE: ele.workStatusDate ? ele.workStatusDate : null,
		}));
		const WRKReasonId = workReasonConstant?.find((ele) => ele?.WRK_TYPE_NAME || ele?.WRK_TYPE_NAME_EN == WRKReason)?.WRK_TYPE_ID_PK;
		const theCourtId = theCourtsName?.find((ele) => ele?.COU_NAME || ele?.COU_NAME_EN == theCourt)?.COU_ID_PK;
		// console.log(newWorkStatus)
		dispatch(
			updateWork({
				id: editId,
				data: {
					WRK_TYPE_ID_PK: WRKReason ? WRKReasonId : undefined,
					WRK_DESCRIPTION: WRKRequired ? WRKRequired : undefined,
					WRK_NOTES: WRKNotes ? WRKNotes : undefined,
					WRK_NOTES_EN: WRKNotesEn ? WRKNotesEn : undefined,
					EMP_ID_PK: theClient ? theClient : undefined,
					COU_ID_PK: theCourt ? theCourtId : undefined,
					WRK_KIND_ID_PK: WRAttr ? WRAttr : undefined,
					CLI_ID_PK: stage[0]?.CLI_ID_PK,
					CAS_ID_PK: id,
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
					WRK_DEGREE: WRKImportance ? WRKImportance : undefined,
					// "USR_ID_PK2": 1
				},
			})
		).then((res) => {
			// console.log(res)
			if (res.payload?.response?.data?.code) {
				console.log(res.payload?.response?.data);
				setErrorAdd(res.payload?.response?.data);
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
	//TODO مسح العمل فيه مشكله
	// delete Work
	const handleDeleteTheWork = (id) => {
		setVisibleDeleteModal(true);
		setDeletedItemId(id);
	};
	const deleteTheWork = () => {
		// console.log(id);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		dispatch(deleteWork(deletedItemId)).then((res) => {
			if (res.payload?.res?.status == 200) {
				setOpenDelSnack(true);
				setVisibleDeleteModal(false);
			} else {
				setOpenDelErrorSnack(true);
			}
		});
	};
	const handelNextSlide = (active, dir) => {
		// console.log(active, dir)
		if ((dir == 'next' && active == 0) || (dir == 'prev' && active == 0)) {
			// document.querySelectorAll('.modal-sessions .carousel-control-next')[0]?.setAttribute('id', 'carousel-control-next');
			document.querySelectorAll('.work-modal .carousel-control-next')[0]?.setAttribute('disabled', true);
			document.querySelectorAll('.work-modal .carousel-control-prev')[0]?.removeAttribute('disabled');
		} else if ((dir == 'prev' && active == 1) || (dir == 'next' && active == 1)) {
			document.querySelectorAll('.work-modal .carousel-control-prev')[0]?.setAttribute('disabled', true);
			document.querySelectorAll('.work-modal .carousel-control-next')[0]?.removeAttribute('disabled');
		}
	};
	const handelAddAttachment = (id) => {
		// console.log(id);
		setConstantAdd(3);
		setAttacmentId(id);
	};
	const handleDeleteAttachment = (id, criteriaId) => {
		// console.log(id);
		setVisibleDeleteModal(true);
		setDeleteAttacmentId(id);
		setCriteriaForDeletedAttached(criteriaId);
	};

	const deleteTheAttachment = () => {
		dispatch(deleteAttachment({ id: criteriaForDeletedAttached, deletedId: deleteAttacmentId })).then((res) => {
			if (res?.payload?.res?.status == 200) {
				setOpenDelSnack(true);
				setVisibleDeleteModal(false);
				dispatch(getWorkAttachmentData(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};
	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal visible={visible} onClose={() => exitSelectModal()} className={`work-modal ${document.body.getAttribute('dir') == 'ltr' ? 'enTextLeftPopup' : null}`}>
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilWindow} customClassName="nav-icon" />
					{editItem ? <span>{translation('fileNum')} {editItem?.CAS_NUMBER}</span> : <span>{translation('add')} </span>}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CCarousel controls interval={false} wrap={false} onSlide={handelNextSlide}>
					<CCarouselItem>
						<CRow>
							<CCol md={6}>
								<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(1)}>
									{translation('wrkReason')}
								</CFormLabel>
								{item ? (
									<p>{item?.WRK_TYPE_NAME ? item?.WRK_TYPE_NAME : formatMessage({id: 'notFound'})}</p>
								) : (
									<FormControl fullWidth onClick={() => handelWorkReason()} sx={{ minWidth: '100%' }}>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={WRKReason}
											onChange={(e, value) => setWRKReason(value)}
											options={workReasonConstant.map((option) => document.body.getAttribute('dir') == 'ltr' && option.WRK_TYPE_NAME_EN ? option.WRK_TYPE_NAME_EN : option.WRK_TYPE_NAME)}
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
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('wrkImportance')}</CFormLabel>
								{item ? (
									<p>{item?.WRK_DEGREE ? item?.WRK_DEGREE : formatMessage({id: 'notFound'})}</p>
								) : (
									<FormControl fullWidth>
										<Select
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={(e) => setWRKImportance(e.target.value)}
											value={WRKImportance}
										>
											{[
												{ id: 0, arName: 'عادي', enName: 'Normal' },
												{ id: 1, arName: 'مستعجل', enName: 'Urgent' },
											].map((ele) => (
												<MenuItem value={ele?.id} key={ele?.id}>
													{document.body.getAttribute('dir') == 'ltr' ? ele?.enName : ele?.arName}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('theEmployees')}</CFormLabel>
								{item ? (
									<p>{item?.EMP_NAME ? item?.EMP_NAME : formatMessage({id: 'notFound'})}</p>
								) : (
									<FormControl fullWidth>
										<Select
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={(e) => setTheClient(e.target.value)}
											value={theClient}
										>
											{theEmployer.map((ele) => (
												<MenuItem value={ele?.EMP_ID_PK} key={ele?.EMP_ID_PK}>
													{document.body.getAttribute('dir') == 'ltr' && ele?.EMP_NAME_ENGLISH ? ele?.EMP_NAME_ENGLISH : ele?.EMP_NAME}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							</CCol>
							<CCol md={6}>
								{/* {console.log(cliName)} */}
								<CFormLabel htmlFor="inputEmail4">{translation('clientName')}</CFormLabel>
								{item ? (
									<p>{document.body.getAttribute('dir') == 'ltr' && item?.CLI_NAME_ENGLISH ? item?.CLI_NAME_ENGLISH : item?.CLI_NAME ? item?.CLI_NAME : formatMessage({id: 'notFound'})}</p>
								) : (
									<CFormInput
										type="text"
										// onChange={e => setcliName(e.target.value)}
										value={stagesNum[0]?.CLI_NAME}
										readOnly
									/>
								)}
							</CCol><CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('required')}</CFormLabel>
								{item ? (
									<p>{item?.WRK_TYPE_NAME ? item?.WRK_TYPE_NAME : formatMessage({id: 'notFound'})}</p>
								) : (
									<CFormInput
										type="text"
										value={WRKRequired}
										onChange={(e) => setWRKRequired(e.target.value)}
										id="inputEmail4"
										required
										className={`${!WRKRequired ? 'is-invalid' : null}`}
									/>
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('origin')}</CFormLabel>
								{item ? (
									<p>{item?.USR_NAME ? item?.USR_NAME : formatMessage({id: 'notFound'})}</p>
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
								<CFormLabel htmlFor="inputEmail4">{translation('createdDate')}</CFormLabel>
								{item ? (
									<p>{item?.CREATE_DATE ? new Date(item?.CREATE_DATE).toLocaleDateString() : formatMessage({id: 'notFound'})}</p>
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
							<CCol md={12}>
								{item || editItem ? (<CFormLabel style={{cursor: 'pointer'}}> {translation('attachments')} {editItem?.WRK_ID_PK ? (
								<CIcon
									size={'sm'}
									icon={cilPlus}
									customClassName="nav-icon"
									style={{ height: '16px', width: '16px' }}
									onClick={() => handelAddAttachment(editItem?.WRK_ID_PK)}
								/>
							) : null}</CFormLabel>) : null}
								{item || editItem ? item?._FILE > 0 || editItem?._FILE > 0 ? (
									<CTable bordered>
										<AttachedHeadTable />
										<CTableBody>
											{/* {console.log('attachment', attachment)} */}
											{attachment?.map((ele, i) => (
												<CTableRow
													key={i}
												>
													<CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
													<CTableDataCell 
													onClick={() => {
														dispatch(
															getWorkAttachmentData({
																id: item?.WRK_ID_PK,
																attachedId: ele?.ATH_ID_PK,
																fileName: ele?.ATH_NAME,
															})
														).then((res) => {
															console.log(res);
															if (res?.error.message) {
																// console.log(res);
																setOpenAttachedSnack(true);
															}
														});
													}}
													style={{ cursor: 'pointer' }}>{ele?.ATH_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
													<CTableDataCell>{new Date(ele?.ATH_DATE).toLocaleDateString()}</CTableDataCell>
													<CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
														{item?.WRK_ID_PK ? (
															<CTableDataCell>
																<CButton
																	color={'danger'}
																	onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, item?.WRK_ID_PK)}
																>
																	<CIcon
																		style={{ height: '16px', marginRight: '-3px' }}
																		icon={cilTrash}
																		customClassName="nav-icon"
																	/>
																</CButton>
															</CTableDataCell>
														) : null}
												</CTableRow>
											))}
										</CTableBody>
									</CTable>
								) : (
									<p> {formatMessage({id: 'notFound'})} </p>
								): null}
							</CCol>
							{/* <CCol md={12}>
						<CFormLabel htmlFor="inputEmail4"> المطلوب</CFormLabel>
						{item ? (
						<p>{item?.WRK_NOTES  ? item?.WRK_NOTES : "{formatMessage({id: 'notFound'})}"}</p>
						) : (
						<CFormInput
							type="date"
							value={editItem ? editItem?.WRK_NOTES: ""}
							id="inputEmail4"
						/>
						)}
					</CCol> */}
						</CRow>
					</CCarouselItem>
					<CCarouselItem>
						<CRow>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> {translation('lastDatEcecute')} </CFormLabel>
								{item ? (
									<p>{item?.WRK_DATE_LAST ? new Date(item?.WRK_DATE_LAST).toLocaleDateString() : formatMessage({id: 'notFound'})}</p>
								) : (
									<CFormInput type="date" value={ExEndDate} onChange={(e) => setExEndDate(e.target.value)} id="inputEmail4" />
								)}
							</CCol>
							
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> {translation('court')}</CFormLabel>
								{item ? (
									<p>{item?.COU_NAME ? item?.COU_NAME : formatMessage({id: 'notFound'})}</p>
								) : (
									<FormControl fullWidth sx={{ minWidth: '100%' }}>
										<Autocomplete
											id="free-solo-demo"
											freeSolo
											value={theCourt}
											onChange={(e, value) => setTheCourt(value)}
											options={theCourtsName.map((option) => document.body.getAttribute('dir') == 'ltr' && option.COU_NAME_EN ? option.COU_NAME_EN : option.COU_NAME)}
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
								)}
							</CCol>
							<CCol md={6}>
								{/* {console.log('editItem', editItem)} */}
								<CFormLabel htmlFor="inputEmail4"> {translation('actionLiaison')}</CFormLabel>
								{item ? (
									<p>{item?.WRK_FLAG ? item?.WRK_FLAG : formatMessage({id: 'notFound'})}</p>
								) : (
									<FormControl fullWidth onClick={() => handelWorkKind()}>
										<Select
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											onChange={(e) => setWRKAttr(e.target.value)}
											value={WRAttr}
										>
											{workKind?.map((ele) => (
												<MenuItem value={ele?.WRK_KIND_ID_PK} key={ele?.WRK_KIND_ID_PK}>
													{document.body.getAttribute('dir') == 'ltr' && ele?.WRK_KIND_NAME_EN ? ele?.WRK_KIND_NAME_EN : ele?.WRK_KIND_NAME}
												</MenuItem>
											))}
										</Select>
										{/* {console.log(WRAttr)} */}
									</FormControl>
								)}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">{translation('fileNum')}</CFormLabel>
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
								{item?.INR_NUMBER ? (
									<>
										<CFormLabel htmlFor="inputEmail4">{translation('warningNum')}</CFormLabel>
										<p>{item?.INR_NUMBER}</p>
									</>
								) : null}
								{item?.CHQ_NUMBER ? (
									<>
										<CFormLabel htmlFor="inputEmail4">{translation('chequeNum')}</CFormLabel>
										<p>{item?.CHQ_NUMBER}</p>
									</>
								) : null}
								{item?.EXE_PROCEDURE_NAME ? (
									<>
										<CFormLabel htmlFor="inputEmail4">{translation('proceding')}</CFormLabel>
										<p>{item?.EXE_PROCEDURE_NAME}</p>
									</>
								) : null}
								{item?.WRN_NUMBER ? (
									<>
										<CFormLabel htmlFor="inputEmail4">{translation('warningNumber')}</CFormLabel>
										<p>{item?.WRN_NUMBER}</p>
									</>
								) : null}
								{item?.STG_NUMBER ? (
									<>
										<CFormLabel htmlFor="inputEmail4">{translation('stageNum')}</CFormLabel>
										<p>{item?.STG_NUMBER}</p>
									</>
								) : null}
								{!item ? (
									WRAttr == 3 ? (
										<WorkAttrCompo
											title={formatMessage({id: 'informingNum'})}
											onChange={(e) => setInformingId(e.target.value)}
											value={informingId}
											error={errorAdd?.args?.find((ele) => ele == 'body.WRN_ID_PK is required') ? true : false}
											dataArr={informingsNum}
											selectBox={informingsNum?.map((ele) => (
												<MenuItem value={ele?.INR_ID_PK} key={ele?.INR_ID_PK}>
													{ele?.INR_NUMBER}
												</MenuItem>
											))}
											displayError={
												errorAdd?.args?.find((ele) => (ele = 'body.WRN_ID_PK is required')) && (
													<FormHelperText>required !</FormHelperText>
												)
											}
										/>
									) : WRAttr == 4 ? (
										<WorkAttrCompo
											title={formatMessage({id: 'chequeNum'})}
											onChange={(e) => setChequId(e.target.value)}
											value={chequId}
											error={errorAdd?.args?.find((ele) => ele == 'body.CHQ_ID_PK is required') ? true : false}
											dataArr={chequisNum}
											selectBox={null}
											displayError={
												errorAdd?.args?.find((ele) => (ele = 'body.CHQ_ID_PK is required')) && (
													<FormHelperText>required !</FormHelperText>
												)
											}
										/>
									) : WRAttr == 5 ? (
										<WorkAttrCompo
											title={formatMessage({id: 'proceding'})}
											onChange={(e) => setExecuteId(e.target.value)}
											value={ExecuteId}
											error={errorAdd?.args?.find((ele) => ele == 'body.EXE_ID_PK is required') ? true : false}
											dataArr={exesNum}
											selectBox={exesNum?.map((ele) => (
												<MenuItem value={ele?.EXE_ID_PK} key={ele?.EXE_ID_PK}>
													{ele?.SUBJECTS}
												</MenuItem>
											))}
											displayError={
												errorAdd?.args?.find((ele) => (ele = 'body.EXE_ID_PK is required')) && (
													<FormHelperText>required !</FormHelperText>
												)
											}
										/>
									) : WRAttr == 6 ? (
										<WorkAttrCompo
											title={formatMessage({id: 'warningNumber'})}
											onChange={(e) => setWarningNum(e.target.value)}
											value={WarningNum}
											error={errorAdd?.args?.find((ele) => ele == 'body.WRN_ID_PK is required') ? true : false}
											dataArr={warningsNum}
											selectBox={warningsNum?.map((ele) => (
												<MenuItem value={ele?.WRN_ID_PK} key={ele?.WRN_ID_PK}>
													{ele?.WRN_NUMBER}
												</MenuItem>
											))}
											displayError={
												errorAdd?.args?.find((ele) => (ele = 'body.WRN_ID_PK is required')) && (
													<FormHelperText>required !</FormHelperText>
												)
											}
										/>
									) : WRAttr == 7 || WRAttr == 8 ? (
										<>
											<WorkAttrCompo
												title={formatMessage({id: 'stageNum'})}
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
													errorAdd?.args?.find((ele) => (ele = 'body.STG_ID_PK is required')) && (
														<FormHelperText>required !</FormHelperText>
													)
												}
											/>
										</>
									) : null
								) : null}
							</CCol>
							<CCol md={6}>
								{WRAttr == 8 ? (
									<>
										{StageId ? (
											<WorkAttrCompo
												title={formatMessage({id: 'sessionNum'})}
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
													errorAdd?.args?.find((ele) => (ele = 'body.SES_ID_PK is required')) && (
														<FormHelperText>required !</FormHelperText>
													)
												}
											/>
										) : null}
										<CFormLabel htmlFor="inputEmail4">{formatMessage({id: 'sessionDate'})}</CFormLabel>
										{item ? (
											<p>{item?.SES_DATE ? item?.SES_DATE : formatMessage({id: 'notFound'})}</p>
										) : (
											<CFormInput type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} id="inputEmail4" />
										)}
									</>
								) : null}
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> {translation('notes')}</CFormLabel>
								{item ? (
									<p>{item?.WRK_NOTES ? item?.WRK_NOTES : formatMessage({id: 'notFound'})}</p>
								) : (
									<CFormInput type="text" value={WRKNotes} onChange={(e) => setWRKNotes(e.target.value)} id="inputEmail4" />
								)}
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> {translation('notesEn')}</CFormLabel>
								{item ? (
									<p>{item?.WRK_NOTES_EN ? item?.WRK_NOTES_EN : formatMessage({id: 'notFound'})}</p>
								) : (
									<CFormInput type="text" value={WRKNotesEn} onChange={(e) => setWRKNotesEn(e.target.value)} id="inputEmail4" />
								)}
							</CCol>
							<CCol md={12}>
								{item ? (
									item?.details?.map((st, i) => (
										<WorkStatusComponent key={i} statusId={st?.STATUS_ID} statusDate={st?.STATUS_DATE} statusReason={document.body.getAttribute('dir') == 'ltr' && st?.WRK_REASON_NAME_EN? st?.WRK_REASON_NAME_EN: st?.WRK_REASON_NAME} />
									))
								) : (
									<div>
										<CFormLabel htmlFor="inputEmail4">
											{translation('workStatus')}
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
										{/* {console.log("arrayOfDivs", arrayOfDivs)} */}
										{arrayOfDivs?.map((ele) => (
											<ComponentWorkStatusAdd
												id={ele.id}
												key={ele.id}
												value1={ele.workStatusIds}
												onChange1={(e) => handelChangeStatusWork(e, ele.id)}
												name1="workStatusIds"
												value2={ele.workStatusDate}
												onChange2={(e) => handelChangeStatusWork(e, ele.id)}
												name2="workStatusDate"
												workReasonConstant={workStatusReasonConstant}
												workStatusIdsList={workStatusIdsList}
												onChange3={(e, value) => handelChangeResonsWrkStatus(e, value, ele.id)}
												value3={ele.workStatusReasons}
												name3="workStatusReasons"
												icon={cilMinus}
												onClick={() => handelRemoveArrStatus(ele.id)}
												addStatusReason={() => setConstantAdd(2)}
												handelWorkStatusReason={() => handelWorkStatusReason()}
												ref0={ref0}
											/>
										))}
									</div>
								)}
							</CCol>
						</CRow>
					</CCarouselItem>
				</CCarousel>
			</CModalBody>
			<CModalFooter>
				{editItem ? (
					<CButton className="btn-modal-close btn-modal-save" onClick={() => saveUpdate(editItem?.WRK_ID_PK)}>
						{translation('saveChanges')}
					</CButton>
				) : !editItem && !item ? (
					<CButton className="btn-modal-close btn-modal-save" onClick={addNew}>
					{translation('save')}
					</CButton>
				) : null}
				<CButton color="danger" className="btn-modal-close" onClick={() => exitSelectModal()}>
						{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);

	const datatable = {
		columns: WorkTableColumn,
		rows: searchedDiv
			? workCard({ data: searchedDiv, getItem, showEditModal, deleteTheWork: handleDeleteTheWork })
			: workCard({ data: allWorks?.data, getItem, showEditModal, deleteTheWork: handleDeleteTheWork }),
	};
	// calssification and search
	const classifiedFun = React.useCallback(() => {
		// console.log(statusWorkSearch)
		if(wrkCreatDateSearchFrom > wrkCreatDateSearchTo){
			setwrkCreatDateValidation(true)
		}else if(wrkCreatDateSearchFrom > wrkCreatDateSearchTo){
			setwrkLastDateValidation(true)
		}
		dispatch(
			getWorkData({
				theParams: {
					clientNameSearch: clientNameSearch ? clientNameSearch : undefined,
					statusWorkSearch: statusWorkSearch || statusWorkSearch == 0 ? statusWorkSearch : undefined,
					wrkTypeSearch: wrkTypeSearch ? wrkTypeSearch : undefined,
					wrkCreatDateSearchFrom: wrkCreatDateSearchFrom ? wrkCreatDateSearchFrom : undefined,
					wrkCreatDateSearchTo: wrkCreatDateSearchTo ? wrkCreatDateSearchTo : undefined,
					wrkLastDateSearchFrom: wrkLastDateSearchFrom ? wrkLastDateSearchFrom : undefined,
					wrkLastDateSearchTo: wrkLastDateSearchTo ? wrkLastDateSearchTo : undefined,
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
		wrkLastDateSearchFrom,
		wrkLastDateSearchTo,
		searchVal,
		id,
	]);

	const handelSearchbtn = React.useMemo(
		() => (e) => {
			if (e.key === 'Enter') {
				classifiedFun();
			}
		},
		[
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
		]
	);
	const handleChange = React.useMemo(
		() => (event) => {
			const {
				target: { value },
			} = event;
			setClassifiedName(typeof value === 'string' ? value.split(',') : value);
		},
		[
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
		]
	);
	const closeClassificationCriteria = () => {
		setClassifiedName([]);
		setClientNameSearch('');
		setWrkCreatDateSearchFrom(undefined);
		setWrkCreatDateSearchTo(undefined);
		setWrkLastDateSearchTo(undefined);
		setWrkLastDateSearchFrom(undefined);
		setWrkTypeSearch(undefined);
		dispatch(
			getWorkData({
				theParams: {
					id: id,
					clientNameSearch: undefined,
					statusWorkSearch: undefined,
					wrkTypeSearch: undefined,
					wrkCreatDateSearchFrom: undefined,
					wrkCreatDateSearchTo: undefined,
					wrkCreatDateSearchFrom: undefined,
					wrkCreatDateSearchTo: undefined,
				},
			})
		).then((res) => setStage(res.payload?.data));
	};
	const searchByChar = (e) => {
		console.log(e.target.value);
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setSearchedDiv(null);
			setSearchedDiv(allWorks);
		} else {
			const newClassifiedArr = allWorks?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setSearchedDiv(newClassifiedArr);
		}
	};
	return (
		<div className="file-alerts work-management box">
			<div className="headerFiles">
				<div>
					<CButton onClick={openAddPopup} className="add-contact">
						<CIcon style={{ height: '25px' }} className="icon" customClassName="nav-icon" icon={cilPlus} />
					</CButton>
					<FormControl sx={{ m: 1, width: 300, mt: 3 }} className="classified">
						<Select
							multiple
							displayEmpty
							value={classifiedName}
							onChange={handleChange}
							input={<OutlinedInput />}
							renderValue={(selected) => {
								if (selected.length === 0) {
									return <span>{translation('classification')}</span>;
								}

								return selected.join(', ');
							}}
							MenuProps={MenuPropsForClient}
							inputProps={{ 'aria-label': 'Without label' }}
						>
							{names.map((name) => (
								<MenuItem key={name} value={name} style={getStyles(name, classifiedName, theme)}>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="search">
					<CFormInput type="text" value={searchVal} onChange={(e) => searchByChar(e)} placeholder={`${formatMessage({id: 'search'})}...`} onKeyDown={(e) => handelSearchbtn(e)} />
				</div>
			</div>
			<div className={`classified-global-criteria ${classifiedName?.length == 0 && 'hide'}`}>
				{classifiedName?.find((ele) => ele == formatMessage({id: 'workStatus'})) && (
					<>
						<FormControl style={{ width: '30%' }}>
							<InputLabel id="demo-simple-select-label">{formatMessage({id: 'workStatus'})} </InputLabel>
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
				{classifiedName?.find((ele) => ele == formatMessage({id: 'workDate'})) && (
					<>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({id: 'from'})}
								value={wrkCreatDateSearchFrom}
								onChange={setWrkCreatDateSearchFrom}
								renderInput={(params) => <TextField {...params} helperText={wrkCreatDateValidation ? formatMessage({id: 'notCorrect'}) : null}/>}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({id: 'to'})}
								value={wrkCreatDateSearchTo}
								onChange={setWrkCreatDateSearchTo}
								renderInput={(params) => <TextField {...params} helperText={wrkCreatDateValidation ? formatMessage({id: 'notCorrect'}) : null}/>}
							/>
						</LocalizationProvider>
					</>
				)}
				{classifiedName?.find((ele) => ele == formatMessage({id: 'workEndDate'})) && (
					<>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({id: 'from'})}
								value={wrkLastDateSearchFrom}
								onChange={setWrkLastDateSearchFrom}
								renderInput={(params) => <TextField {...params} helperText={wrkLastDateValidation ? formatMessage({id: 'notCorrect'}) : null}/>}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DatePicker
								label={formatMessage({id: 'to'})}
								value={wrkLastDateSearchTo}
								onChange={setWrkLastDateSearchTo}
								renderInput={(params) => <TextField {...params} helperText={wrkLastDateValidation ? formatMessage({id: 'notCorrect'}) : null}/>}
							/>
						</LocalizationProvider>
					</>
				)}
				{classifiedName?.find((ele) => ele == formatMessage({id: 'workType'})) && (
					<TextField style={{ width: '30%' }} label={formatMessage({id: 'workType'})} value={wrkTypeSearch} onChange={(e) => setWrkTypeSearch(e.target.value)} />
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
			<MDBDataTable
				striped
				// bordered
				responsive
				small
				hover
				data={datatable}
			/>
			{editItem ? ReturnedPopup(editItem) : item ? ReturnedPopup(item) : visible && !editItem && !item ? ReturnedPopup() : null}
			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : visibleDeleteModal && !criteriaForDeletedAttached && !deleteAttacmentId ? <DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheWork} /> : null}
			{openAddSnack || openDelSnack || openDelErrorSnack || openAttachedSnack ? (
				<Snackbar open={openAddSnack || openDelSnack || openAttachedSnack || openDelErrorSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert
						onClose={handleCloseSnack}
						severity={`${openDelSnack || openDelErrorSnack || openAttachedSnack ? 'error' : 'success'}`}
						sx={{ width: '100%' }}
					>
						{openEditSnack
							? translation('itemUpdated')
							: openDelSnack
							? translation('itemDeleted')
							: openDelErrorSnack
							? translation('alreadyUSed')
							: openAttachedSnack
							? translation('error')
							: openLargeAttachement
							? formatMessage({ id: 'largeAttachment' })
							: translation('itemAdded')}
					</Alert>
				</Snackbar>
			) : null}
			{constantAdd == 1 ? (
				<WorkConstantReason exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 2 ? (
				<WorkConstantStatusReason exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 3 ? (
				<AttachedPopup exitSelectModal={() => setConstantAdd('')}
				url={`Work/${attacmentId}/attachment`}
				id={attacmentId}
				setOpenAddSnack={setOpenAddSnack}
				setOpenAttachedSnack={setOpenAttachedSnack}
				setOpenLargeAttachement={setOpenLargeAttachement}
				callback={() => dispatch(getWorkAttachmentData(editItem?.WRK_ID_PK)).then((res) => setAttachment(res.payload))}/>
			) : null}
		</div>
	);
};

export default React.memo(FileExecution);
