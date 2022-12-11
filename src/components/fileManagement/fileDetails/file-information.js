import React, { useEffect, useState } from 'react';
import { CRow, CCol, CFormLabel, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilFeaturedPlaylist, cilPencil, cilPlus, cilTrash } from '@coreui/icons';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { getcaseAttachment, getcaseAttachmentData, deleteAttachment } from '../../../store/reducers/file-management';
import { ReturnedPopup } from './filePopup';
import AttachedHeadTable from '../../../features/attachedFileHaed';
import translation from '../../../i18n/translate';
import AttachedPopup from '../../../features/attachment';
import DeletePopup from '../../../features/delete';
import './fileInformation.css';
import '../../../assets/style/popupCarousel.css';

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

const FileInformation = (props) => {
	const [attachment, setAttachment] = React.useState([]);
	const [visibleModal, setVisibleModal] = useState(false);
	const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [contantAdd, setConstantAdd] = useState('');
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const { formatMessage } = useIntl();
	const dispatch = useDispatch();

	// for snack alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	//close snack
	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenAttachedSnack(false);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
	};

	useEffect(() => {
		// console.log(props.stage?.CAS_ID_PK, props.stage)
		if(props.stage?.CAS_ID_PK){
			dispatch(getcaseAttachment(props.stage?.CAS_ID_PK)).then((res) => setAttachment(res.payload));
		}
	}, [dispatch]);
	const exitSelectModal = () => {
		setVisibleModal(false);
	};
	const handelAddAttachment = (id) => {
		// console.log(id);
		setConstantAdd(1);
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
				dispatch(getcaseAttachment(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};
	// console.log('stage', props.stage);
	return (
		<div className="file-information box" key={props.stage?.CLI_NAME}>
			<CRow>
				<CCol lg={'5'} md={7} sm={'6'}>
					<div className="card">
						<CRow>
							<CCol md={'4'} className="d-sm-none d-md-block">
								<CIcon style={{ height: '100px' }} icon={cilUser} customClassName="nav-icon" />
							</CCol>
							<CCol md={'8'}>
								<h6>
									<strong> {`${formatMessage({ id: 'clientName' })}: `} </strong>
									<span>
										{props.stage?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr'
											? props.stage?.CLI_NAME_ENGLISH
											: props.stage?.CLI_NAME
											? props.stage?.CLI_NAME
											: formatMessage({ id: 'notFound' })}{' '}
									</span>
								</h6>
								<h6>
									<strong> {`${formatMessage({ id: 'fileNum' })}: `} </strong>
									<span>{props.stage?.CAS_NUMBER ? props.stage?.CAS_NUMBER : formatMessage({ id: 'notFound' })}</span>
								</h6>
								<p>
									<strong>{`${formatMessage({ id: 'casType' })}: `}</strong>
									<span>
										{props.stage?.FIL_TYPE_NAME_EN && document.body.getAttribute('dir') == 'ltr'
											? props.stage?.FIL_TYPE_NAME_EN
											: props.stage?.FIL_TYPE_NAME
											? props.stage?.FIL_TYPE_NAME
											: formatMessage({ id: 'notFound' })}
									</span>
								</p>
								<p>
									<strong> {`${formatMessage({ id: 'nextSess' })}: `}</strong>
									<span>{props.stage?.SESSION_NEXT ? props.stage?.SESSION_NEXT : formatMessage({ id: 'notFound' })}</span>
								</p>
							</CCol>
						</CRow>
					</div>
				</CCol>
				<CCol lg={4} md={5} sm={'6'} className="offset-lg-3">
					<ul className="list">
						<li>
							<h6>{translation('fileCategory')}</h6>
							<p>
								{props.stage?.FIL_CATEGORY_NAME_EN && document.body.getAttribute('dir') == 'ltr'
									? props.stage?.FIL_CATEGORY_NAME_EN
									: props.stage?.FIL_CATEGORY_NAME
									? props.stage?.FIL_CATEGORY_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
							<span style={{ cursor: 'pointer' }} onClick={() => setVisibleModal(true)}>
								{' '}
								<CIcon style={{ height: '18px' }} icon={cilPencil} customClassName="nav-icon" />
							</span>
						</li>
						<li>
							<h6>{translation('fileStatus')}</h6>
							<p>
								{props.stage?.FIL_STATUS_NAME_EN && document.body.getAttribute('dir') == 'ltr'
									? props.stage?.FIL_STATUS_NAME_EN
									: props.stage?.FIL_STATUS_NAME
									? props.stage?.FIL_STATUS_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
							<span>
								{' '}
								<CIcon style={{ height: '20px' }} icon={cilFeaturedPlaylist} customClassName="nav-icon" />
							</span>
						</li>
						<li>
							<h6>{translation('openDate')}</h6>
							<p>{props.stage?.CAS_OPEN_DATE && new Date(props.stage?.CAS_OPEN_DATE).toDateString()}</p>
							<span>
								{' '}
								<CIcon style={{ height: '20px' }} icon={cilFeaturedPlaylist} customClassName="nav-icon" />
							</span>
						</li>
						<li>
							<h6>{translation('closedDate')}</h6>
							<p>{props.stage?.LAST_DATE && new Date(props.stage?.LAST_DATE).toDateString()}</p>
							<span>
								{' '}
								<CIcon style={{ height: '20px' }} icon={cilFeaturedPlaylist} customClassName="nav-icon" />
							</span>
						</li>
					</ul>
				</CCol>
			</CRow>
			<CRow>
				<CCol md={'6'}>
					<div className="group-clients mb-4 mt-4">
						<h2>{translation('agents')}</h2>
						<ul>
							{props.stage?.clients.length > 0 && props.stage?.clients?.find((ele) => ele.CLI_TYPE_ID_PK == 2)
								? props.stage?.clients
										?.filter((ele) => ele.CLI_TYPE_ID_PK == 2)
										?.map((client, index) => {
											return (
												<li key={index}>
													<span>
														{document.body.getAttribute('dir') == 'ltr' && client?.CLI_NAME_ENGLISH
															? client?.CLI_NAME_ENGLISH
															: client.CLI_NAME}
													</span>
												</li>
											);
											// console.log(props.stage?.clients)
										})
								: formatMessage({ id: 'notFound' })}
						</ul>
					</div>
				</CCol>
				<CCol md={'6'}>
					<div className="group-clients mb-4 mt-4">
						<h2>{translation('ants')}</h2>
						<ul>
							{props.stage?.clients.length > 0 && props.stage?.clients?.find((ele) => ele.CLI_TYPE_ID_PK == 7)
								? props.stage?.clients
										?.filter((ele) => ele.CLI_TYPE_ID_PK == 7)
										?.map((client, index) => {
											return (
												<li key={index}>
													<span>
														{document.body.getAttribute('dir') == 'ltr' && client?.CLI_NAME_ENGLISH
															? client?.CLI_NAME_ENGLISH
															: client.CLI_NAME}
													</span>
												</li>
											);
										})
								: formatMessage({ id: 'notFound' })}
						</ul>
					</div>
				</CCol>
				<CCol md={'6'} sm={'6'}>
					<div className="group-clients mb-4 mt-4">
						<h2 htmlFor="inputEmail4"> {translation('followers')}</h2>
						<ul className="mb-4">
							{props.stage?.employees?.length > 0 ? (
								props.stage?.employees.map((emplyee, index) => {
									return (
										<li key={index}>
											<span>{document.body.getAttribute('dir') == 'ltr' ? emplyee.EMP_NAME_ENGLISH : emplyee.EMP_NAME}</span>
										</li>
									);
								})
							) : (
								<p>{formatMessage({ id: 'notFound' })}</p>
							)}
						</ul>
					</div>
				</CCol>
				<CCol md={'6'} sm={'6'}>
					<div className="group-clients mb-4 mt-4">
						<h2 htmlFor="inputEmail4">{translation('stgDesc')}</h2>
						<p className="px-3">
							{' '}
							{props.stage?.CAS_SUBJECT_EN && document.body.getAttribute('dir') == 'ltr'
								? props.stage?.CAS_SUBJECT_EN
								: props.stage?.CAS_SUBJECT
								? props.stage?.CAS_SUBJECT
								: formatMessage({ id: 'notFound' })}
						</p>
					</div>
				</CCol>
			</CRow>
			<CRow className="mt-5">
				<CCol md={'6'} sm={'6'}>
					<CFormLabel htmlFor="inputEmail4">{translation('fileSub')}</CFormLabel>
					<p className="show-item mb-4">
						{props.stage?.SUBJECTS_EN?.length > 1 && document.body.getAttribute('dir') == 'ltr'
							? props.stage?.SUBJECTS_EN
							: props.stage?.SUBJECTS
							? props.stage?.SUBJECTS
							: formatMessage({ id: 'notFound' })}
					</p>
				</CCol>
				<CCol md={'6'} sm={'6'}>
					<CFormLabel htmlFor="inputEmail4"> {translation('meditator')}</CFormLabel>
					<p className="show-item mb-4">
						{' '}
						{props.stage?.FIL_MEDITOR_NAME_EN && document.body.getAttribute('dir') == 'ltr'
							? props.stage?.FIL_MEDITOR_NAME_EN
							: props.stage?.FIL_MEDITOR_NAME
							? props.stage?.FIL_MEDITOR_NAME
							: formatMessage({ id: 'notFound' })}
					</p>
				</CCol>
				<CCol md={'6'} sm={'6'}>
					<CFormLabel htmlFor="inputEmail4">{translation('assignedOffice')}</CFormLabel>
					<p className="show-item mb-4">
						{' '}
						{props.stage?.OFC_NAME_EN && document.body.getAttribute('dir') == 'ltr'
							? props.stage?.OFC_NAME_EN
							: props.stage?.OFC_NAME
							? props.stage?.OFC_NAME
							: formatMessage({ id: 'notFound' })}
					</p>
				</CCol>
				<CCol md={'6'} sm={'6'}>
					<CFormLabel htmlFor="inputEmail4">{translation('source')}</CFormLabel>
					<p className="show-item mb-4">
						{' '}
						{props.stage?.FIL_SOURCE_NAME_EN && document.body.getAttribute('dir') == 'ltr'
							? props.stage?.FIL_SOURCE_NAME_EN
							: props.stage?.FIL_SOURCE_NAME
							? props.stage?.FIL_SOURCE_NAME
							: formatMessage({ id: 'notFound' })}
					</p>
				</CCol>
				<CCol md={'6'} sm={'6'}>
					<CFormLabel htmlFor="inputEmail4">{translation('casPrice')}</CFormLabel>
					<p className="show-item mb-4"> {props.stage?.CAS_PRICE ? props.stage?.CAS_PRICE : formatMessage({ id: 'notFound' })}</p>
				</CCol>
				<CCol md={'12'}>
					<CFormLabel style={{ cursor: 'pointer' }}>
						{translation('attachments')}
						<CIcon
							size={'sm'}
							icon={cilPlus}
							customClassName="nav-icon"
							style={{ height: '16px', width: '16px' }}
							onClick={() => handelAddAttachment(props.stage?.CAS_ID_PK)}
						/>
					</CFormLabel>
					{props.stage?._FILE > 0 ? (
						<CTable bordered>
						<AttachedHeadTable editCiteria={props.stage}/>
							<CTableBody>
								{attachment?.map((ele, i) => (
									<CTableRow
										key={i}
									>
										<CTableHeaderCell scope="row">{i}</CTableHeaderCell>
										<CTableDataCell 
										onClick={() => {
											dispatch(
												getcaseAttachmentData({
													id: props.stage?.CAS_ID_PK,
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
										style={{ cursor: 'pointer' }}>{ele?.ATH_NAME}</CTableDataCell>
										<CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
										<CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
										<CTableDataCell>{new Date(ele?.ATH_DATE).toLocaleDateString()}</CTableDataCell>
										<CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
										<CTableDataCell>
											<CButton color={'danger'} onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, props.stage?.CAS_ID_PK)}>
												<CIcon style={{ height: '16px', marginRight: '-3px' }} icon={cilTrash} customClassName="nav-icon" />
											</CButton>
										</CTableDataCell>
									</CTableRow>
								))}
							</CTableBody>
						</CTable>
					) : (
						<p className="show-item mb-4">{formatMessage({ id: 'notFound' })}</p>
					)}
				</CCol>
			</CRow>
			{visibleModal && (
				<ReturnedPopup
					stage={props.stage}
					exitSelectModal={() => exitSelectModal()}
					setOpenEditSnack={setOpenEditSnack}
					setOpenAddSnack={setOpenAddSnack}
				/>
			)}
			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />) :null}
			{contantAdd == 1 ? <AttachedPopup exitSelectModal={() => setConstantAdd('')} 
					url={`case/${attacmentId}/attachment`}
					id={attacmentId}
					setOpenAddSnack={setOpenAddSnack}
					setOpenAttachedSnack={setOpenAttachedSnack}
					setOpenLargeAttachement={setOpenLargeAttachement}
					callback={() => dispatch(getcaseAttachment(props.stage?.CAS_ID_PK)).then((res) => setAttachment(res.payload))}/> : null}
			{openAttachedSnack || openEditSnack || openAddSnack || openDelSnack ? (
				<Snackbar open={openAttachedSnack || openEditSnack || openAddSnack || openDelSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity={`${openAttachedSnack || openDelSnack ? 'error' : 'success'}`} sx={{ width: '100%' }}>
						{openAttachedSnack ? formatMessage({ id: 'error ' }) :openDelSnack
							? formatMessage({ id: 'itemDeleted' }) : formatMessage({ id: 'itemUpdated' })}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(FileInformation);
