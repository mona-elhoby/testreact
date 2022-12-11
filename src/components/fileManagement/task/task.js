import React, { useState, useRef, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import { CRow, CCol, CButton, CFormInput } from '@coreui/react';
import { cilPlus, cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import ReturnedPopup from './popup';
import './task.css';
import { getTasksData, getTasksById, deleteTasks, getTasksAttachment, getTasksAttachmentData, deleteAttachment } from '../../../store/reducers/task';
import DeletePopup from "../../../features/delete"
import translation from '../../../i18n/translate'



const FileCosts = () => {
	const [visible, setVisible] = useState(false);
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [deletedItemId, setDeletedItemId] = useState(null);
	const [searchVal, setSearchVal] = useState('');
	const [classifiedName, setClassifiedName] = useState([]);
	const [searchedDiv, setSearchedDiv] = useState(null);
	const [selectedCriteria, setSelectedCriteria] = useState(null);
	const [editCriterai, setEditCriterai] = useState(null);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [OpenEditSnack, setOpenEditSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [attachment, setAttachment] = useState([]);
	const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
	const [OpenAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const theme = useTheme();
	const dispatch = useDispatch();
	const { id } = useParams();
	const {formatMessage} = useIntl()
	const { allEmployee } = useSelector((state) => state.employee);
	const { allTasks } = useSelector((state) => state.task);

	useEffect(() => {
		dispatch(getTasksData({ theParams: { id: id } }));
	}, []);

	// for snack alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	const searchByChar = (e) => {
		console.log(e.target.value);
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setSearchedDiv(null);
			setSearchedDiv(allTasks);
		} else {
			const newClassifiedArr = allTasks?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setSearchedDiv(newClassifiedArr);
		}
	};

	const handelSearchbtn = (e) => {
		
	};

	const exitSelectModal = () => {
		setSelectedCriteria(null);
		setEditCriterai(null);
		setVisible(false);
	};

	const showData = (id) => {
		setEditCriterai(null);
		dispatch(getTasksAttachment(id)).then((res) => setAttachment(res?.payload));
		dispatch(getTasksById(id))
			.then((res) => setSelectedCriteria(res.payload))
			.then(() => setVisible(true));
	};

	const openAddPopup = () => {
		setSelectedCriteria(null);
		setEditCriterai(null);
		setVisible(true);
	};
	const openUpdateModal = (id) => {
		setSelectedCriteria(null);
		dispatch(getTasksById(id))
			.then((res) => setEditCriterai(res.payload))
			.then(() => setVisible(true));
	};

	const handledeleteTheTask = id => {
		setVisibleDeleteModal(true)
		setDeletedItemId(id)
	}
	// delete Task
	const deleteTheTask = () => {
		// console.log(deletedItemId)
		dispatch(deleteTasks(deletedItemId)).then((res) => {
			if (res?.payload?.result?.status == 200){
				setOpenDelSnack(true)
				setVisibleDeleteModal(false)
			}else{
				setOpenDelErrorSnack(true)
			}})
	};
	const handleCloseSnack = () => {
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		setOpenAttachedSnack(false);
	};
	const costData = allTasks?.data?.map((ele, i) => ({
		id: <span onClick={() => showData(ele.TSK_ID_PK)}>{i + 1}</span>,
		CostDate: <span onClick={() => showData(ele.TSK_ID_PK)}> {ele.TSK_DATE ? new Date(ele.TSK_DATE).toLocaleDateString() : null}</span>,
		session: <span onClick={() => showData(ele.TSK_ID_PK)}>{ele.SES_DATE ? new Date(ele.SES_DATE).toLocaleDateString() : null}</span>,
		costType: <span onClick={() => showData(ele.TSK_ID_PK)}> {document.body.getAttribute('dir') == 'ltr' && ele.TSK_TYPE_NAME_EN ? ele.TSK_TYPE_NAME_EN : ele.TSK_TYPE_NAME} </span>,
		// subject:(<span onClick={()=>showData(ele.TSK_ID_PK)}> "tgFGJUKUHUJKIHFUHR"</span>),
		// brief:(<span onClick={()=>showData(ele.TSK_ID_PK)}> "gdjnks"</span>),
		period: <span onClick={() => showData(ele.TSK_ID_PK)}>{ele.TSK_DURATION}</span>,
		elmokalf: <span onClick={() => showData(ele.TSK_ID_PK)}>{ele.EMP_NAME}</span>,
		theAmount: <span onClick={() => showData(ele.TSK_ID_PK)}>{ele.TSK_COST}</span>,
		fromWhen: <span onClick={() => showData(ele.TSK_ID_PK)}>{ele.TSK_FROM}</span>,
		toWhen: <span onClick={() => showData(ele.TSK_ID_PK)}>{ele.TSK_TO}</span>,
		theCase: <span onClick={() => showData(ele.TSK_ID_PK)}>{ele.STG_NUMBER}</span>,
		// attachment:(<span onClick={showData}> 0</span>),
		DeletEdit: (
			<p>
				<CButton style={{ background: '#1e42a0 !important' }}>
					<CIcon
						onClick={() => openUpdateModal(ele?.TSK_ID_PK)}
						style={{ height: '16px', marginRight: '-3px' }}
						icon={cilPencil}
						customClassName="nav-icon"
					/>
				</CButton>
				<CButton color={'danger'}>
					<CIcon
						onClick={() => handledeleteTheTask(ele?.TSK_ID_PK)}
						style={{ height: '16px', marginRight: '-3px' }}
						icon={cilTrash}
						customClassName="nav-icon"
					/>
				</CButton>
			</p>
		),
	}));

	const datatable = {
		columns: [
			{
				label: '#',
				field: 'id',
				sort: 'asc',
				width: 50,
			},
			{
				label: formatMessage({id: 'taskDate'}),
				field: 'CostDate',
				sort: 'asc',
				width: 150,
			},
			{
				label: formatMessage({id: 'theSession'}),
				field: 'session',
				sort: 'asc',
				width: 200,
			},
			{
				label: formatMessage({id: 'case'}),
				field: 'theCase',
				sort: 'asc',
				width: 150,
			},
			{
				label: formatMessage({id: 'taskType'}),
				field: 'costType',
				sort: 'asc',
				width: 100,
			},
			{
				label: formatMessage({id: 'theEmployee'}),
				field: 'elmokalf',
				sort: '',
				width: 100,
			},
			{
				label: formatMessage({id: 'from'}),
				field: 'fromWhen',
				sort: 'asc',
				width: 100,
			},
			{
				label: formatMessage({id: 'to'}),
				field: 'toWhen',
				sort: '',
				width: 100,
			},
			{
				label: formatMessage({id: 'period'}),
				field: 'period',
				sort: '',
				width: 100,
			},
			{
				label: formatMessage({id: 'amount'}),
				field: 'theAmount',
				sort: '',
				width: 100,
			},
			// {
			//     label: 'ملاحظات',
			//     field: 'notes',
			//     sort: '',
			//     width: 100
			// },
			// {
			//     label: 'مرفقات',
			//     field: 'attachment',
			//     sort: '',
			//     width: 100
			// },
			{
				label: '',
				field: 'DeletEdit',
				sort: '',
				width: 80,
			},
		],
		rows: costData,
	};
	return (
		<div className="file-alerts consulting box">
			<div className="headerFiles">
				<div>
					<CButton onClick={openAddPopup} className="add-contact">
						<CIcon style={{ height: '25px' }} className="icon" customClassName="nav-icon" icon={cilPlus} />
					</CButton>
				</div>
				<div className="search">
					<CFormInput type="text" value={searchVal} onChange={(e) => searchByChar(e)} placeholder={`${formatMessage({id: 'search'})}...`} onKeyDown={(e) => handelSearchbtn(e)} />
				</div>
			</div>
			<MDBDataTable
				striped
				// bordered
				responsive
				//   scrollX
				//   scrollY
				small
				data={datatable}
				searching={true}
			/>
			{selectedCriteria && !editCriterai && visible ? (
				<ReturnedPopup selectedCriteria={selectedCriteria} exitSelectModal={() => exitSelectModal()} />
			) : !selectedCriteria && editCriterai && visible ? (
				<ReturnedPopup editCriterai={editCriterai} exitSelectModal={() => exitSelectModal()} 
				setOpenEditSnack={setOpenEditSnack}
				setOpenAddSnack={setOpenAddSnack}
				setOpenAttachedSnack={setOpenAttachedSnack}
				setOpenDelSnack={setOpenDelSnack} />
			) : !selectedCriteria && !editCriterai && visible ? (
				<ReturnedPopup exitSelectModal={() => exitSelectModal()} setOpenEditSnack={setOpenEditSnack}
				setOpenAddSnack={setOpenAddSnack}
				setOpenAttachedSnack={setOpenAttachedSnack}
				setOpenLargeAttachement={setOpenLargeAttachement} />
			) : null}
			
			{/* alert */}
			{visibleDeleteModal ? <DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheTask} /> : null}
			{openAddSnack || openDelSnack || openDelErrorSnack ? (
				<Snackbar open={openAddSnack || openDelSnack || openDelErrorSnack || OpenAttachedSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity={`${openDelSnack || openDelErrorSnack ? 'error' : 'success'}`} sx={{ width: '100%' }}>
						{OpenEditSnack
							? translation('itemUpdated')
							: openDelSnack
							? translation('itemDeleted')
							: openLargeAttachement
							? formatMessage({ id: 'largeAttachment' })
							: openDelErrorSnack
							? translation('alreadyUSed')
								? OpenAttachedSnack
								: translation('error')
							: translation('itemAdded')}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(FileCosts);
