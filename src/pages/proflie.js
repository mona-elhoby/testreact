import React, { useEffect , useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	CCol,
	CRow,
	CCard,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
	CFormLabel,
	CButton,
	CTableHeaderCell,
	CTableRow,
	CTable,
	CTableBody,
	CTableDataCell,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPhone, cilHome, cilEnvelopeClosed, cilFax, cilUser, cilTrash, cilPencil, cilPlus } from '@coreui/icons';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {  useIntl } from "react-intl";

import Avatar from '../assets/images/avatar/2.jpg';
import AttachedHeadTable from '../features/attachedFileHaed';
import { categoriesName } from '../contraints/constants';
import { getProfile, deleteContact, getContacts, getclientAttachment, getclientAttachmentData, deleteAttachment } from '../store/reducers/contacts';
import { NationalityConstant, CompanyTypeConstant } from '../components/contact/contact';
import '../components/contact/contact.css';
import ReturnedPopup from '../components/contact/popup';
import DeletePopup from "../features/delete"
import AttachedPopup from '../features/attachment'
import translation from "../i18n/translate"


const Profile = () => {
	const [client, setClient] = useState(null);
	const [visible, setVisible] = useState(false);
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [open, setOpen] = useState(false);
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [delError, setDelError] = useState(null);
	const { id } = useParams();
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [attachment, setAttachment] = useState('');
	const [constantAdd, setConstantAdd] = useState('');
	const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const [openErrSnack, setOpenErrSnack] = useState(false);
	const [classificationConflict, setClassificationConflict] = useState(false);
	const { formatMessage } = useIntl();

	const dispatch = useDispatch();
	const { profile } = useSelector((state) => state.contact);

	const Navigate = useNavigate();

	// alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	useEffect(() => {
		dispatch(getContacts());
		dispatch(getProfile(id)).then((res) => {
			if (res.payload?.message == 'Client not found.') {
				Navigate('/404');
			} else {
				setClient(res.payload);
			}
		});
		dispatch(getclientAttachment(id)).then((res) => setAttachment(res.payload));
	}, []);

	// close snack alert
	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenEditSnack(false);
		setOpenErrSnack(false);
	};

	const exitSelectModal = () => {
		setVisible(false);
	};

	// confirmation modal delete
	const deletePopup = () => (
		<CModal visible={visibleDeleteModal} onClose={() => setVisibleDeleteModal(false)} className="delete-profile">
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilTrash} customClassName="nav-icon" />
				</CModalTitle>
			</CModalHeader>
			<CModalBody style={{ padding: '40px 10px' }}>{translation('confirmMsg')}</CModalBody>
			<CModalFooter>
				<CButton color="danger" className="btn-modal-close" onClick={deleteClient}>
					{translation('yes')}
				</CButton>
				<CButton className="btn-modal-save" color="primary" onClick={() => setVisibleDeleteModal(false)}>
					{translation('no')}
				</CButton>
			</CModalFooter>
		</CModal>
	);

	const deleteClient = () => {
		dispatch(deleteContact(id)).then((res) => {
			// console.log(data)
			if (res.payload?.res.data?.message?.includes('Client cannot be deleted.')) {
				// console.log("ERROR")
				setDelError(res.payload?.res.data);
				setOpen(true);
				setVisibleDeleteModal(false);
			} else {
				Navigate(`/contacts`);
			}
		});
		setOpen(true);
	};


	const handelAddAttachment = (id) => {
		// console.log(id);
		setConstantAdd(4);
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
				dispatch(getclientAttachment(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};

	return (
		<div className="profile">
			<CRow>
				<CCol lg={8} md={7}>
					<CRow>
						<CCol md={12}>
							<div className="cover">
								<div className="cover-bg">{/* <img src={Cover} /> */}</div>
								<div className="profile-pic list">
									<div style={{ display: 'flex', alignItems: 'flex-end' }}>
										<div className="float-right">
											<div className="img">
												<img src={Avatar} width="100%" />
											</div>
										</div>
										<div className="float-left" style={{ paddingBottom: '10px' }}>
											<strong>{document.body.getAttribute('dir') == 'ltr' && profile?.CLI_NAME_ENGLISH ? profile?.CLI_NAME_ENGLISH : profile?.CLI_NAME}</strong>
											{/* {console.log(typeof profile?.CLI_MOBILE)} */}
											<p>
												{typeof profile?.CLI_MOBILE == 'string'
													? profile?.CLI_MOBILE?.split(',')[0]
													: typeof profile?.CLI_MOBILE == 'object'
													? profile?.CLI_MOBILE[0]
													: '... '}
											</p>
											<p>
												{profile?.classification?.length > 0
													? profile?.classification.map((ele) => document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_TYPE_NAME_EN : ele.CLI_TYPE_NAME + ', ')
													: profile?.DT_TYPE
													? profile?.DT_TYPE.map((ele1) => categoriesName?.find((ele) => ele.id == ele1)?.arName + ', ')
													: '...'}
											</p>
										</div>
									</div>
									<div className="btns">
										<CButton className="btn-modal-close" onClick={() => setVisible(true)}>
											<CIcon style={{ height: '20px' }} icon={cilPencil} customClassName="nav-icon" />
											{translation('update')}
										</CButton>
										<CButton color="danger" className="btn-modal-close" onClick={() => setVisibleDeleteModal(true)}>
											<CIcon style={{ height: '20px' }} icon={cilTrash} customClassName="nav-icon" />
											{translation('delete')}
										</CButton>{' '}
									</div>
								</div>
							</div>
						</CCol>
					</CRow>
				</CCol>
				<CCol lg={4} md={5}>
					<div className="info-detail">
						<p>
							<CIcon style={{ height: '20px' }} icon={cilEnvelopeClosed} customClassName="nav-icon" />
							<span>
								{typeof profile?.CLI_EMAIL == 'string' && profile?.CLI_EMAIL
									? profile?.CLI_EMAIL?.split(',')[0]
									: typeof profile?.CLI_EMAIL == 'object'
									? profile?.CLI_EMAIL[0]
									: '...'}
							</span>
						</p>
						<p>
							<CIcon style={{ height: '20px' }} icon={cilPhone} customClassName="nav-icon" />
							<span>{profile?.CLI_PHONE ? profile?.CLI_PHONE : '...'}</span>
						</p>
						<p>
							<CIcon style={{ height: '20px' }} icon={cilFax} customClassName="nav-icon" />
							<span>{profile?.CLI_FAX ? profile?.CLI_FAX : '...'}</span>
						</p>
						<p>
							<CIcon style={{ height: '20px' }} icon={cilHome} customClassName="nav-icon" />
							<span>{profile?.CLI_ADDRESS ? profile?.CLI_ADDRESS : '...'}</span>
						</p>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol lg={8} md={7}>
					<h6 className="info-title">
						{' '}
						<CIcon style={{ height: '20px' }} icon={cilUser} customClassName="nav-icon" /> {translation('personalInfo')}
					</h6>
					<div className="info-details">
						<CRow>
							{profile?.CLI_CATEGORY == 0 ? (
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4">{translation('nationality')} </CFormLabel>
									<p>{document.body.getAttribute('dir') == 'ltr' && profile?.NAT_NAME_EN ? profile?.NAT_NAME_EN : profile?.NAT_NAME}</p>
								</CCol>
							) : null}
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4">{translation('type')} </CFormLabel>
								<p>{document.body.getAttribute('dir') == 'ltr' && profile?.CLI_CATEGORY_NAME_EN ? profile?.CLI_CATEGORY_NAME_EN : profile?.CLI_CATEGORY_NAME}</p>
							</CCol>
							{profile?.CLI_CATEGORY == 0 ? (
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4">{translation('sponserName')}</CFormLabel>
									<p>{profile?.CLI_SPONSOR_NAME ? profile?.CLI_SPONSOR_NAME : translation('notFound')}</p>
								</CCol>
							) : null}
							{profile?.CLI_CATEGORY == 0 ? (
								<CCol md={6}>
									<CCard>
										<CRow>
											<CCol md={12}>
												<CFormLabel htmlFor="inputEmail4">{translation('identity')}</CFormLabel>
												<p>{profile?.CLI_IDENTITYNO ? profile?.CLI_IDENTITYNO : translation('notFound')}</p>
											</CCol>
											<CCol md={12}>
												<CFormLabel htmlFor="inputEmail4"> {translation('identityIssue')}</CFormLabel>
												<p>{profile?.CLI_ID_ISSUE_DATE ? new Date(profile?.CLI_ID_ISSUE_DATE).toDateString() : translation('notFound')}</p>
											</CCol>
											<CCol md={12}>
												<CFormLabel htmlFor="inputEmail4"> {translation('identityExpired')}</CFormLabel>
												<p>{profile?.CLI_ID_EXPIRY_DATE ? new Date(profile?.CLI_ID_EXPIRY_DATE).toDateString() : translation('notFound')}</p>
											</CCol>
										</CRow>
									</CCard>
								</CCol>
							) : null}
							{profile?.CLI_CATEGORY == 0 ? (
								<CCol md={6}>
									<CCard>
										<CCol md={12}>
											<CFormLabel htmlFor="inputEmail4"> {translation('passportNum')}</CFormLabel>
											<p>{profile?.CLI_PASSPORT_NO ? profile?.CLI_PASSPORT_NO : translation('notFound')}</p>
										</CCol>
										<CCol>
											<CFormLabel htmlFor="inputEmail4"> {translation('passportIssue')}</CFormLabel>
											<p>{profile?.CLI_PASSPORT_ISSUE_DATE ? new Date(profile?.CLI_PASSPORT_ISSUE_DATE).toDateString() : translation('notFound')}</p>
										</CCol>
										<CCol>
											<CFormLabel htmlFor="inputEmail4">  {translation('passportExpired')}</CFormLabel>
											<p>{profile?.CLI_PASSPORT_EXPIRY_DATE ? new Date(profile?.CLI_PASSPORT_EXPIRY_DATE).toDateString() : translation('notFound')}</p>
										</CCol>
									</CCard>
								</CCol>
							) : null}
							{profile?.CLI_CATEGORY == 0 ? (
								<CCol md={6}>
									<CCard>
										<CCol>
											<CFormLabel htmlFor="inputEmail4">  {translation('residencyNum')}</CFormLabel>
											<p>{profile?.CLI_RESIDENCYNO ? profile?.CLI_RESIDENCYNO : translation('notFound')}</p>
										</CCol>
										<CCol>
											<CFormLabel htmlFor="inputEmail4"> {translation('residencyExpired')}</CFormLabel>
											<p>
												{profile?.CLI_RESIDENCY_EXPIRY_DATE ? new Date(profile?.CLI_RESIDENCY_EXPIRY_DATE).toDateString() : translation('notFound')}
											</p>
										</CCol>
									</CCard>
								</CCol>
							) : null}
							{!profile?.CLI_CATEGORY == 0 ? (
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4">{translation('theCompany')} </CFormLabel>
									<p>{profile?.CLI_COMPANYTYPE_NAME ? profile?.CLI_COMPANYTYPE_NAME : translation('notFound')}</p>
								</CCol>
							) : null}
							{!profile?.CLI_CATEGORY == 0 ? (
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4">{translation('licenseNum')}  </CFormLabel>
									<p>{profile?.CLI_LICENSE_NO ? profile?.CLI_LICENSE_NO : translation('notFound')}</p>
								</CCol>
							) : null}
							{!profile?.CLI_CATEGORY == 0 ? (
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4">{translation('licenseExpired')}  </CFormLabel>
									<p>{profile?.CLI_LICENSE_DATE ? profile?.CLI_LICENSE_DATE : translation('notFound')}</p>
								</CCol>
							) : null}
							{!profile?.CLI_CATEGORY == 0 ? (
								<CCol md={4}>
									<CFormLabel htmlFor="inputEmail4"> {translation('taxNum')} </CFormLabel>
									<p>{profile?.CLI_TAX_NUMBER ? profile?.CLI_TAX_NUMBER : translation('notFound')}</p>
								</CCol>
							) : null}
							<CCol md={!profile?.CLI_CATEGORY == 0 ? 4 : 6}>
								{profile?.CLI_CATEGORY == 0 ? (
									<CCol md={12}>
										<CFormLabel htmlFor="inputEmail4"> {translation('unifiedNumber')}</CFormLabel>
										<p>{profile?.CLI_IDENTITYNO ? profile?.CLI_IDENTITYNO : translation('notFound')}</p>
									</CCol>
								) : null}
								<CCol md={12}>
									<CFormLabel htmlFor="inputEmail4"> {translation('language')} </CFormLabel>
									<p>{profile?.CLI_FAV_LANG_DESC ? profile?.CLI_FAV_LANG_DESC : translation('notFound')}</p>
								</CCol>
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> {translation('notes')}  </CFormLabel>
								<p>{document.body.getAttribute('dir') == 'ltr' ? profile?.CLI_NOTES_EN :  profile?.CLI_NOTES}</p>
							</CCol>
							<CCol md={12}>
								<CFormLabel > {translation('attachments')} <CIcon
									size={'sm'}
									icon={cilPlus}
									customClassName="nav-icon"
									style={{ height: '16px', width: '16px' }}
									onClick={() => handelAddAttachment(profile?.APP_ID_PK)}
								/></CFormLabel>
								{profile?._FILE > 0 && attachment.length > 0 ? (
									<CTable bordered responsive>
										<AttachedHeadTable />
										<CTableBody>
											{attachment?.map((ele, i) => (
												<CTableRow
													key={i}
													onClick={() => {
														dispatch(
															getclientAttachmentData({
																id: profile?.CLI_ID_PK,
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
														{profile?.CLI_ID_PK ? (
															<CTableDataCell>
																<CButton
																	color={'danger'}
																	onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, profile?.CLI_ID_PK)}
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
								) : (<p>{translation('notFound')}</p>)}
							</CCol>
						</CRow>
					</div>
				</CCol>
			</CRow>
			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : !visibleDeleteModal && !criteriaForDeletedAttached && !deleteAttacmentId ? deletePopup() : null}
			{visible ? (
				<ReturnedPopup
					editCriterai={client}
					exitSelectModal={() => exitSelectModal()}
					id={client?.CLI_ID_PK}
					setOpenAddSnack={setOpenAddSnack}
					setOpenEditSnack={setOpenEditSnack}
					setClassificationConflict= {setClassificationConflict}
				/>
			) : null}
			{
				delError?.code ? (
					<Snackbar open={open} autoHideDuration={2000} onClose={handleCloseSnack}>
						<Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
							{translation('alreadyUSed')}
						</Alert>
					</Snackbar>
				) : openEditSnack || openAttachedSnack || openLargeAttachement || classificationConflict? (
					<Snackbar open={true} autoHideDuration={2000} onClose={handleCloseSnack}>
						<Alert onClose={handleCloseSnack} severity={openAttachedSnack || openLargeAttachement || classificationConflict || openErrSnack? "error" : "success"} sx={{ width: '100%' }}>
							{openEditSnack ? translation('itemUpdated') : classificationConflict ? translation('classificationConflict') : openAttachedSnack ? translation('error')
							: openLargeAttachement
							? formatMessage({ id: 'largeAttachment' }) : openErrSnack ? translation('error')  : translation('itemAdded')}
						</Alert>
					</Snackbar>
				) : null

				// : (
				//   <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
				//     <Alert
				//       onClose={handleClose}
				//       severity="success"
				//       sx={{ width: "100%" }}
				//     >
				//       تمت الإزاله بنجاح
				//     </Alert>
				//   </Snackbar>
				// )
			}
			{constantAdd == 1 ? (
				<NationalityConstant exitSelectModal={() => setConstantAdd('')} />
			) : constantAdd == 2 ? (
				<CompanyTypeConstant exitSelectModal={() => setConstantAdd('')} />
			) :  constantAdd == 4 ? (<AttachedPopup exitSelectModal={() => setConstantAdd('')} 
			url={`client/${attacmentId}/attachment`}
			id={attacmentId}
			setOpenAddSnack={setOpenAddSnack}
			setOpenAttachedSnack={setOpenAttachedSnack}
			setOpenLargeAttachement={setOpenLargeAttachement}
			callback={() => dispatch(getclientAttachment(profile?.CLI_ID_PK)).then((res) => setAttachment(res.payload))}/>) :null}
		</div>
	);
};

export default React.memo(Profile);
