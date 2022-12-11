import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import {FormControl, FormHelperText} from '@mui/material';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import HorizontalTimeline from 'react-horizontal-timeline';
import Autocomplete from '@mui/material/Autocomplete';
import {
	CHeaderDivider,
	CButton,
	CRow,
	CCol,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
	CFormLabel,
	CFormInput,
	CFormTextarea,
	CCard,
	CCardBody,
	CTable,
	CTableBody,
	CFormFeedback,
	CTableDataCell,
	CTableHeaderCell,
	CTableRow,
} from '@coreui/react';
import { MDBDataTable } from 'mdbreact';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilCalendar, cilPencil, cilTrash, cilX } from '@coreui/icons';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

//TODO search not found
import {
	getappiontments,
	getappiontmentById,
	getappiontmentAttachment,
	getappiontmentAttachmentData,
	addNewAppiontment,
	deleteApptiontment,
	UpdateAppiontment,
	deleteAttachment,
} from '../store/reducers/appiontments';
import { getEmployeeData } from '../store/reducers/emlpoyee';
import { getApionType } from '../store/reducers/theConstants';
import { getContacts } from '../store/reducers/contacts';
import AttachedHeadTable from '../features/attachedFileHaed';
import { AppiontmentConstant } from '../components/appiontments/appiontmant';
import { colorsChart } from '../contraints/colorChart';
import '../components/appiontments/appiontments.css';
import { convertTime } from '../features/convertTime';
import DeletePopup from '../features/delete';
import AttachedPopup from '../features/attachment';
import translation from '../i18n/translate';

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
ChartJS.register(ArcElement, Tooltip, Legend);
const HorizontalLinearStepper = () => {
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [deletedItemId, setDeletedItemId] = useState(null);
	const [appiontmentSteps, setAppiontmentSteps] = React.useState([]);
	const [chartVisible, setChartVisible] = React.useState(false);
	const [selectedCriteria, setSelectedCriteria] = useState(null);
	const [editCriterai, setEditCriterai] = useState(null);
	const [visible, setVisible] = useState(false);
	const [attached, setAttached] = useState([]);
	const [appiontments, setAppiontments] = React.useState([]);
	const [classSesTime, setClassSesTime] = useState(false);
	const [appTime, setAppTime] = useState('');
	const [date, setDate] = useState('');
	const [clients, setClients] = useState([]);
	const [appiontmentReason, setAppiontmentReason] = useState('');
	const [employee, setEmployee] = useState('');
	const [attachment, setAttachment] = useState([]);
	const [appDateToSearch, setAppDateToSearch] = useState(undefined);
	const [empSearch, setEmpSearch] = useState('');
	const [appTypeSearch, setAppTypeSearch] = useState('');
	const [nameSearch, setNameSearch] = useState('');
	const [descSearch, setDescSearch] = useState('');
	const [appDateFromSearch, setAppDateFromSearch] = useState(undefined);
	const [description, setDescription] = useState('');
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [openErrorSnack, setOpenErrorSnack] = useState(false);
	const [searchVal, setSearchVal] = useState('');
	const [error, setError] = useState('');
	const [curIdx, setCurIdx] = useState(0);
	const [constantAdd, setConstantAdd] = useState('');
	const [prevIdx, setPrevIdx] = useState(-1);
	const [classifiedName, setClassifiedName] = useState([]);
	const [classifiedValdiation, setClassifiedValdiation] = useState(false);
	const [openLargeAttachement, setOpenLargeAttachement] = useState(false);
	const [deleteAttacmentId, setDeleteAttacmentId] = useState('');
	const [attacmentId, setAttacmentId] = useState('');
	const [criteriaForDeletedAttached, setCriteriaForDeletedAttached] = useState(false);
	const dispatch = useDispatch();
	const { allAppiontments, sortAppiontment, allAppiontmentsperEmp, allAppiontmentsperType, steps } = useSelector((state) => state.appiontments);
	const { allEmployee } = useSelector((state) => state.employee);
	const { theAppiontmentType } = useSelector((state) => state.theConstants);
	const { allContacts } = useSelector((state) => state.contact);
	useEffect(() => {
		dispatch(getappiontments({ theParams: null })).then((res) => {
			setAppiontments(res.payload);
		});

		dispatch(getEmployeeData());
		dispatch(getContacts({theParams: null})).then(res => console.log("res: ", res.payload))
	}, [dispatch]);

	const { formatMessage } = useIntl();
	const names = [
		formatMessage({ id: 'client' }),
		formatMessage({ id: 'description' }),
		formatMessage({ id: 'theEmployee' }),
		formatMessage({ id: 'appType' }),
		formatMessage({ id: 'appiontment' }),
	];
	const spanbg = document.getElementsByClassName('spanVariant');
	const spanbg2 = document.getElementsByClassName('spanVariant2');
	useMemo(() => {
		setAppiontmentSteps(steps.slice(0, 2));
		Array.prototype.forEach.call(spanbg, (child, m) => {
			colorsChart.forEach((c, k) => {
				if (m == k) {
					child.style.backgroundColor = c;
				}
			});
		});
		Array.prototype.forEach.call(spanbg2, (child, m) => {
			colorsChart.forEach((c, k) => {
				if (m == k) {
					child.style.backgroundColor = c;
				}
			});
		});
	}, [steps, spanbg.length, spanbg2.length]);

	// for snack alert
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
	const theme = useTheme();
	function getStyles(name, personName, theme) {
		return {
			fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
		};
	}
	const handleChangeClients = (event) => {
		const {
			target: { value },
		} = event;
		setClients(typeof value === 'string' ? value.split(',') : value);
	};

	//open selected appiontment
	const gettheAppiontment = (id) => {
		setEditCriterai(null);
		setVisible(true);
		dispatch(getappiontmentById(id)).then((res) => setSelectedCriteria(res.payload));
		dispatch(getappiontmentAttachment(id)).then((res) => setAttachment(res.payload));
	};

	//close modal
	const exitSelectModal = () => {
		setSelectedCriteria(null);
		setEditCriterai(null);
		setVisible(false);
	};
	// close snack alert
	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		setOpenDelSnack(false);
		setOpenAttachedSnack(false);
	};

	//empty inputs field
	const emptyInputs = () => {
		setEditCriterai(null);
		setClients([]);
		setAppiontmentReason('');
		setEmployee('');
		setAppTime('');
		setDate('');
	};

	const openAddPopup = () => {
		setSelectedCriteria(null);
		setEditCriterai(null);
		setVisible(true);
	};
	// add new appiontment
	const addAppiontment = () => {
		const clientsIds = clients.map((ele) => allContacts.data?.find((ele2) => ele == ele2.CLI_NAME)).map((finalEle) => finalEle.CLI_ID_PK);
		let theTime = appTime && new Date(appTime).toLocaleTimeString();
		if (theTime) {
			if (theTime.slice(0, 2).includes(':')) {
				theTime = `0${theTime}`;
			}
		}
		const appiontmentReasonId = theAppiontmentType?.find((ele) => ele.APP_TYPE_NAME == appiontmentReason)?.APP_TYPE_ID_PK;
		dispatch(
			addNewAppiontment({
				APP_TYPE_ID_PK: appiontmentReason ? appiontmentReasonId : undefined,
				APP_DESCRIPTION: description ? description : undefined,
				EMP_ID_PK: employee,
				APP_DATE: date,
				APP_TIME: appTime ? theTime.slice(0, 5).concat(' ').concat(theTime.slice(9)) : undefined,
				DT_CLIENT: clientsIds ? clientsIds : undefined,
			})
		).then((res) => {
			if (res.payload?.res.data?.code) {
				console.log(res.payload?.res.data);
				setError(res.payload?.res.data);
			} else {
				dispatch(getappiontments({ theParams: null })).then((res) => {
					setAppiontments(res.payload);
					setOpenAddSnack(true);
					setVisible(false);
					emptyInputs();
				});
			}
		});
	};

	//open edit modal
	const editTheAppiontment = (id) => {
		setSelectedCriteria(null);

		dispatch(getappiontmentById(id))
			.then((res) => {
				const employeeId = allEmployee?.find((ele) => ele?.EMP_NAME == res.payload?.EMP_NAME);
				setDate(res.payload?.APP_DATE ? new Date(res.payload?.APP_DATE).toISOString().split('T')[0] : '');
				setEditCriterai(res.payload);
				setClients(res.payload.clients?.map((ele) => ele?.CLI_NAME));
				setAppiontmentReason(res.payload.APP_TYPE_NAME);
				setAppTime(res.payload?.APP_TIME ? `2014-08-18T${convertTime(res.payload?.APP_TIME)}:00` : '');
				setEmployee(employeeId?.EMP_ID_PK);
				setDescription(res.payload?.APP_DESCRIPTION);
			})
			.then(() => setVisible(true));
		dispatch(getappiontmentAttachment(id)).then((res) => setAttached(res.payload));
	};

	//update appiontment
	const updateTheApp = () => {
		const clientsIds = clients.map((ele) => allContacts.data?.find((ele2) => ele == ele2.CLI_NAME)).map((finalEle) => finalEle.CLI_ID_PK);

		let time = appTime && new Date(appTime).toLocaleTimeString();
		if (time) {
			if (time.slice(0, 2).includes(':')) {
				time = `0${time}`;
			}
		}
		const appiontmentReasonId = theAppiontmentType?.find((ele) => ele.APP_TYPE_NAME == appiontmentReason)?.APP_TYPE_ID_PK;
		// console.log(time)
		dispatch(
			UpdateAppiontment({
				id: editCriterai?.APP_ID_PK,
				data: {
					APP_TYPE_ID_PK: appiontmentReason ? appiontmentReasonId : editCriterai.APP_TYPE_ID_PK,
					APP_DESCRIPTION: description ? description : undefined,
					EMP_ID_PK: employee,
					APP_DATE: date ? date : editCriterai?.APP_DATE,
					APP_TIME: appTime ? time.slice(0, 5).concat(' ').concat(time.slice(9)) : editCriterai?.APP_TIME,
					DT_CLIENT: clientsIds ? clientsIds : undefined,
				},
			})
		).then((res) => {
			// console.log(res);
			if (res.payload?.result?.args) {
				setError(res.payload?.result);
			} else {
				dispatch(getappiontments({ theParams: null })).then((res) => {
					setAppiontments(res.payload);
					setOpenEditSnack(true);
					setVisible(false);
					emptyInputs();
				});
			}
		});
	};

	//delete appiontment
	const handleDeleteTheAppiontment = (id) => {
		setDeletedItemId(id);
		setVisibleDeleteModal(true);
	};
	const deleteTheAppiontment = () => {
		// console.log(id);
		dispatch(deleteApptiontment(deletedItemId))
			.then((res) => {
				if (res?.payload?.result?.status == 200) {
					setVisibleDeleteModal(false);
					setOpenDelSnack(true);
				}
			})
			.then(() => {
				dispatch(getappiontments({ theParams: null })).then((res) => {
					setAppiontments(res.payload);
				});
			});
	};
	const handelReasonAppiontment = React.useCallback(
		(e) => {
			//get appiontments type
			dispatch(getApionType());
		},
		[constantAdd]
	);

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
				dispatch(getappiontmentAttachment(criteriaForDeletedAttached)).then((res) => setAttachment(res.payload));
				setAttacmentId('');
			} else {
				setOpenAttachedSnack(true);
			}
		});
	};
	// appiontment modal
	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal visible={visible} onClose={() => exitSelectModal()} className="appiontment-modal">
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilCalendar} customClassName="nav-icon" />
					{selectedCriteria || editCriterai ? formatMessage({ id: 'appiontment' }) : formatMessage({ id: 'add' })}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				<CRow>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('theDate')}</CFormLabel>
						{selectedCriteria ? (
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<p style={{ width: '45%' }}>
									{selectedCriteria ? new Date(selectedCriteria?.APP_DATE).toLocaleDateString() : formatMessage({ id: 'notFound' })}
								</p>
								<p style={{ width: '45%' }}>{selectedCriteria ? selectedCriteria?.APP_TIME : formatMessage({ id: 'notFound' })}</p>
							</div>
						) : (
							<CRow className="appiontmentrow">
								<CCol md={6}>
									<CFormInput
										type="date"
										defaultValue={editCriterai ? new Date(editCriterai?.APP_DATE).toISOString().split('T')[0] : date}
										onChange={(e) => setDate(e.target.value)}
										required
										className={`${error?.args?.find((ele) => ele.includes('body.APP_DATE must be a valid date')) ? 'is-invalid' : null}`}
									/>
									<CFormFeedback
										invalid={error?.args?.find((ele) => ele.includes('body.APP_DATE must be a valid date')) ? true : false}
										valid={error?.args?.find((ele) => ele.includes('body.APP_DATE must be a valid date')) ? false : true}
									>
										{formatMessage({ id: 'notCorrect' })}
									</CFormFeedback>
								</CCol>
								<CCol md={6}>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<TimePicker
											onChange={setAppTime}
											value={appTime}
											renderInput={(params) => <TextField {...params} error={!appTime ? true : false} />}
										/>
									</LocalizationProvider>
								</CCol>
							</CRow>
						)}
					</CCol>{console.log("allContacts: ", allContacts)}
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4">{translation('clientName')}</CFormLabel>
						{selectedCriteria ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && selectedCriteria?.EMP_NAME_ENGLISH
									? selectedCriteria?.EMP_NAME_ENGLISH
									: selectedCriteria.EMP_NAME
									? selectedCriteria.EMP_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth>
								<Select
									multiple
									displayEmpty
									value={clients}
									onChange={handleChangeClients}
									input={<OutlinedInput />}
									renderValue={(selected) => (
										<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
											{selected && selected?.map((value) => <Chip key={Math.random() + value} label={value} />)}
										</Box>
									)}
									MenuProps={MenuPropsForClient}
									inputProps={{ 'aria-label': 'Without label' }}
								>
									{allContacts?.data?.map((name, i) => (
										<MenuItem
											key={Math.random() + i}
											value={document.body.getAttribute('dir') == 'ltr' && name.CLI_NAME_ENGLISH ? name.CLI_NAME_ENGLISH : name.CLI_NAME}
											style={clients ? getStyles(name, clients, theme) : null}
										>
											{document.body.getAttribute('dir') == 'ltr' && name.CLI_NAME_ENGLISH ? name.CLI_NAME_ENGLISH : name.CLI_NAME}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel style={{ cursor: 'pointer' }} onClick={() => setConstantAdd(1)}>
							{translation('reason')}
						</CFormLabel>
						{selectedCriteria ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && selectedCriteria.APP_TYPE_NAME_EN
									? selectedCriteria.APP_TYPE_NAME_EN
									: selectedCriteria.APP_TYPE_NAME
									? selectedCriteria.APP_TYPE_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth onClick={() => handelReasonAppiontment()}>
								<Autocomplete
									id="free-solo-demo"
									freeSolo
									value={appiontmentReason}
									onChange={(e, value) => setAppiontmentReason(value)}
									options={theAppiontmentType.map((option) =>
										document.body.getAttribute('dir') == 'ltr' ? option.APP_TYPE_NAME_EN : option.APP_TYPE_NAME
									)}
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
						<CFormLabel htmlFor="inputEmail4"> {translation('theEmployee')}</CFormLabel>
						{selectedCriteria ? (
							<p>
								{document.body.getAttribute('dir') == 'ltr' && selectedCriteria.EMP_NAME_ENGLISH
									? selectedCriteria.EMP_NAME_ENGLISH
									: selectedCriteria.EMP_NAME
									? selectedCriteria.EMP_NAME
									: formatMessage({ id: 'notFound' })}
							</p>
						) : (
							<FormControl fullWidth>
								<Select
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
									onChange={(e) => setEmployee(e.target.value)}
									value={employee}
									error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
								>
									{allEmployee?.map((ele) => (
										<MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
											{document.body.getAttribute('dir') == 'ltr' && ele?.EMP_NAME_ENGLISH ? ele?.EMP_NAME_ENGLISH : ele.EMP_NAME}
										</MenuItem>
									))}
								</Select>
								{error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? (
									<FormHelperText>{translation('required')}</FormHelperText>
								) : null}
							</FormControl>
						)}
					</CCol>
					<CCol md={12}>
						<CFormLabel htmlFor="inputEmail4"> {translation('description')}</CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria?.APP_DESCRIPTION ? selectedCriteria?.APP_DESCRIPTION : formatMessage({ id: 'notFound' })}</p>
						) : (
							<CFormTextarea
								rows="5"
								defaultValue={editCriterai?.APP_DESCRIPTION ? editCriterai?.APP_DESCRIPTION : ''}
								onChange={(e) => setDescription(e.target.value)}
							/>
						)}
					</CCol>
					<CCol md={12}>
						{editCriterai || selectedCriteria ? (<CFormLabel style={{ cursor: 'pointer' }}>
							{translation('attachments')}
							{editCriterai?.APP_ID_PK ? (
								<CIcon
									size={'sm'}
									icon={cilPlus}
									customClassName="nav-icon"
									style={{ height: '16px', width: '16px' }}
									onClick={() => handelAddAttachment(editCriterai?.APP_ID_PK)}
								/>
							) : null}
						</CFormLabel>) : null}
						{selectedCriteria || editCriterai ? editCriterai?._FILE > 0 || selectedCriteria?._FILE > 0 ? (
								<CTable bordered responsive>
									<AttachedHeadTable editCiteria={editCriterai}/>
									<CTableBody>
										{attachment
											? attachment?.map((ele, i) => (
													<CTableRow key={i}>
														<CTableHeaderCell scope="row">{i}</CTableHeaderCell>
														<CTableDataCell
															onClick={() => {
																dispatch(
																	getappiontmentAttachmentData({
																		id: selectedCriteria?.APP_ID_PK || editCriterai?.APP_ID_PK,
																		attachedId: ele?.ATH_ID_PK,
																		fileName: ele?.ATH_NAME,
																	})
																).then((res) => {
																	if (res?.payload.status == 404) {
																		console.log(res);
																		setOpenAttachedSnack(true);
																	}
																});
															}}
															style={{ cursor: 'pointer' }}
														>
															{ele?.ATH_NAME}
														</CTableDataCell>
														<CTableDataCell>{ele?.TYP_NAME}</CTableDataCell>
														<CTableDataCell>{ele?.ATH_SIZE}</CTableDataCell>
														<CTableDataCell>{new Date(ele?.ATH_DATE).toLocaleDateString()}</CTableDataCell>
														<CTableDataCell>{ele?.USR_NAME}</CTableDataCell>
														{editCriterai?.APP_ID_PK ? (
															<CTableDataCell>
																<CButton
																	color={'danger'}
																	onClick={() => handleDeleteAttachment(ele?.ATH_ID_PK, editCriterai?.APP_ID_PK)}
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
											  ))
											: null}
									</CTableBody>
								</CTable>
							) : (
								<p>{translation('notFound')}</p>
							) : null}
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				{selectedCriteria ? null : editCriterai ? (
					<CButton className="btn-modal-save" color="primary" onClick={updateTheApp}>
						{translation('saveChanges')}
					</CButton>
				) : (
					<CButton className="btn-modal-save" color="primary" onClick={addAppiontment}>
						{translation('add')}
					</CButton>
				)}
				<CButton color="danger" className="btn-modal-close" onClick={() => exitSelectModal()}>
					{translation('close')}
				</CButton>
			</CModalFooter>
		</CModal>
	);

	const dataColumns = [
		{
			field: 'id',
			label: '#',
			sort: 'asc',
			width: 50,
		},
		{
			field: 'time',
			label: formatMessage({ id: 'time' }),
			sort: 'asc',
		},
		{
			field: 'description',
			label: formatMessage({ id: 'description' }),
			sort: 'asc',
		},
		{
			field: 'reason',
			label: formatMessage({ id: 'reason' }),
			sort: 'asc',
		},
		{
			field: 'emp',
			label: formatMessage({ id: 'theEmployee' }),
			sort: 'asc',
		},
		{
			field: 'client',
			label: formatMessage({ id: 'clientName' }),
			sort: 'asc',
		},
		{
			label: '    ',
			field: 'DeletEdit',
			sort: '',
			width: 100,
		},
	];

	const dataRows = (data) =>
		data.map((ele, i) => {
			return {
				id: (
					<span onClick={() => gettheAppiontment(ele.APP_ID_PK)} key={i}>
						{(i += 1)}
					</span>
				),
				time: <span onClick={() => gettheAppiontment(ele.APP_ID_PK)}>{ele.APP_TIME}</span>,
				description: (
					<span onClick={() => gettheAppiontment(ele.APP_ID_PK)}>
						{document.body.getAttribute('dir') == 'ltr' && ele.APP_DESCRIPTION_EN ? ele.APP_DESCRIPTION_EN : ele.APP_DESCRIPTION}
					</span>
				),
				reason: (
					<span onClick={() => gettheAppiontment(ele.APP_ID_PK)}>
						{document.body.getAttribute('dir') == 'ltr' && ele?.APP_TYPE_NAME_EN ? ele?.APP_TYPE_NAME_EN : ele.APP_TYPE_NAME}
					</span>
				),
				emp: (
					<span onClick={() => gettheAppiontment(ele.APP_ID_PK)}>
						{ele?.EMP_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.EMP_NAME_ENGLISH : ele.EMP_NAME}
					</span>
				),
				client: <span onClick={() => gettheAppiontment(ele.APP_ID_PK)}>{ele?.clients?.reduce((acc, curr) => curr.CLI_NAME + ',' + acc, '')}</span>,
				DeletEdit: (
					<p>
						<CButton style={{ background: '#1e42a0 !important' }}>
							<CIcon
								onClick={() => editTheAppiontment(ele.APP_ID_PK)}
								style={{ height: '16px', marginRight: '-3px' }}
								icon={cilPencil}
								customClassName="nav-icon"
							/>
						</CButton>
						<CButton color={'danger'} onClick={() => handleDeleteTheAppiontment(ele.APP_ID_PK)}>
							<CIcon style={{ height: '16px', marginRight: '-3px' }} icon={cilTrash} customClassName="nav-icon" />
						</CButton>
					</p>
				),
			};
		});

	const handleChangeClassification = React.useMemo(
		() => (event) => {
			const {
				target: { value },
			} = event;
			setClassifiedName(
				typeof value === 'string' ? value.split(',') : value
			);
		},
		[classifiedName, searchVal, descSearch, nameSearch, empSearch, appTypeSearch, appDateFromSearch, appDateToSearch]
	);

	const classifiedFun = React.useCallback(() => {
		if (appDateFromSearch > appDateToSearch) {
			setClassifiedValdiation(true);
		}
		dispatch(
			getappiontments({
				theParams: {
					descSearch: descSearch ? descSearch : undefined,
					nameSearch: nameSearch ? nameSearch : undefined,
					empSearch: empSearch ? empSearch : undefined,
					appTypeSearch: appTypeSearch ? appTypeSearch : undefined,
					appDateFromSearch: appDateFromSearch ? appDateFromSearch?.toLocaleDateString() : undefined,
					appDateToSearch: appDateToSearch ? appDateToSearch?.toLocaleDateString() : undefined,
					searchVal: searchVal ? searchVal : undefined,
				},
			})
		).then((data) => setAppiontments(data.payload));
	}, [classifiedName, searchVal, descSearch, nameSearch, empSearch, appTypeSearch, appDateFromSearch, appDateToSearch]);

	const handelSearchbtn = React.useMemo(
		() => (e) => {
			if (e.key === 'Enter') {
				classifiedFun();
			}
		},
		[classifiedName, searchVal, descSearch, nameSearch, empSearch, appTypeSearch, appDateFromSearch, appDateToSearch]
	);
	//TODO global search
	const closeClassificationCriteria = () => {
		setClassifiedName([]);
		setEmpSearch('');
		setAppTypeSearch('');
		setNameSearch('');
		setDescSearch('');
		setAppDateToSearch(undefined);
		setAppDateFromSearch(undefined);
		dispatch(getappiontments({ theParams: null })).then((data) => setAppiontments(data.payload));
	};
	const searchByChar = (e) => {
		setSearchVal(e.target.value);
	};
	return (
		<div className="appiontments">
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
					{translation('charts')}
				</span>
			</div>
			<CHeaderDivider className="mb-3 mt-2 mb-5" />
			<CRow className={`${chartVisible ? 'showChart' : 'hideChart'}`}>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<Doughnut
								data={{
									labels: [formatMessage({ id: 'theAll' }), formatMessage({ id: 'currentMonth' })],
									datasets: [
										{
											data: [
												appiontments?.length,
												sortAppiontment?.filter((ele) => new Date(ele[0]).getTime() <= new Date(Date.now() + 2419200000).getTime())
													.length,
											],
											backgroundColor: ['#36A2EB', '#FFCE56'],
											hoverBackgroundColor: ['#36A2EB', '#FFCE56'],
											text: 'km',
										},
									],
								}}
								options={{
									responsive: true,
									maintainAspectRatio: true,
									plugins: {
										legend: {
											display: false,
										},
										labels: {
											render: 'percentage',
											fontColor: ['green', 'white', 'red'],
											precision: 2,
										},
										datalabels: {
											color: '#36A2EB',
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
									<span>{formatMessage({ id: 'theAll' })}</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span> {formatMessage({ id: 'currentMonth' })}</span>
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
									labels: [formatMessage({ id: 'nextMonth' }), formatMessage({ id: 'theAll' })],
									datasets: [
										{
											data: [
												appiontments?.length,
												sortAppiontment?.filter(
													(ele) =>
														new Date(ele[0]).getTime() <= new Date(Date.now() + 4838400000).getTime() &&
														new Date(ele[0]).getTime() >= new Date(Date.now() + 2419200000).getTime()
												).length,
											],
											backgroundColor: ['#FF6384', '#36A2EB'],
											hoverBackgroundColor: ['#FF6384', '#36A2EB'],
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
									<span>{formatMessage({ id: 'theAll' })}</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>{formatMessage({ id: 'nextMonth' })} </span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-5 customchart">
						<CCardBody className="">
							<Doughnut
								data={{
									labels: Object.keys(allAppiontmentsperType).map((ele) => ele),
									datasets: [
										{
											data: Object.values(allAppiontmentsperType).map((ele) => ele.length),
											backgroundColor: colorsChart.slice(0, Object.keys(allAppiontmentsperType).length),
											hoverBackgroundColor: colorsChart.slice(0, Object.keys(allAppiontmentsperType).length),
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
									flexWrap: 'wrap',
								}}
							>
								{Object.keys(allAppiontmentsperType)
									.slice(0, 2)
									.map((ele, i) => (
										<div style={{ display: 'block' }} key={i}>
											<span className="spanVariant"></span>
											<span>{ele}</span>
										</div>
									))}
								<div className="chartLabel">
									{Object.keys(allAppiontmentsperType)
										.slice(2)
										.map((ele, i) => (
											<div style={{ display: 'block', width: '50%' }} key={i}>
												<span className="spanVariant"></span>
												<span>({ele})</span>
											</div>
										))}
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-5 customchart2">
						<CCardBody>
							<Doughnut
								data={{
									labels: Object.keys(allAppiontmentsperEmp).map((ele, i) => ele),
									datasets: [
										{
											data: Object.values(allAppiontmentsperEmp).map((ele) => ele.length),
											backgroundColor: colorsChart.slice(0, Object.keys(allAppiontmentsperEmp).length),
											hoverBackgroundColor: colorsChart.slice(0, Object.keys(allAppiontmentsperEmp).length),
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
								{Object.keys(allAppiontmentsperEmp)
									.slice(0, 2)
									.map((ele, i) => (
										<div key={i}>
											<span className="spanVariant2"></span>
											<span>{ele}</span>
										</div>
									))}
								<div className="chartLabel2">
									{Object.keys(allAppiontmentsperEmp)
										.slice(2)
										.map((ele, i) => (
											<div style={{ display: 'block', width: '50%' }} key={i}>
												<span className="spanVariant2"></span>
												<span>({ele})</span>
											</div>
										))}
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CHeaderDivider
					className="mb-5 mt-4
				
				"
				/>
			</CRow>
			<CRow className="mt-5">
				{' '}
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
										return <span>{formatMessage({ id: 'classification' })}</span>;
									}

									return selected.join(', ');
								}}
								MenuProps={MenuProps}
								inputProps={{ 'aria-label': 'Without label' }}
							>
								<MenuItem disabled value=""></MenuItem>
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
							placeholder={`${formatMessage({ id: 'search' })}...`}
							onKeyDown={(e) => handelSearchbtn(e)}
						/>
					</div>
				</div>
				<div className={`classified-global-criteria ${classifiedName?.length == 0 && 'hide'}`}>
					{classifiedName?.find((ele) => ele == formatMessage({ id: 'clientName' })) && (
						<TextField
							style={{ width: '30%' }}
							label={formatMessage({ id: 'clientName' })}
							value={nameSearch}
							onChange={(e) => setNameSearch(e.target.value)}
						/>
					)}
					{classifiedName?.find((ele) => ele == formatMessage({ id: 'description' })) && (
						<TextField
							style={{ width: '30%' }}
							label={formatMessage({ id: 'description' })}
							value={descSearch}
							onChange={(e) => setDescSearch(e.target.value)}
						/>
					)}
					{classifiedName?.find((ele) => ele == formatMessage({ id: 'appiontment' })) && (
						<>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									label={formatMessage({ id: 'from' })}
									value={appDateFromSearch}
									onChange={setAppDateFromSearch}
									renderInput={(params) => (
										<TextField {...params} helperText={classifiedValdiation ? formatMessage({ id: 'notCorrect' }) : null} />
									)}
								/>
							</LocalizationProvider>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									label={formatMessage({ id: 'to' })}
									value={appDateToSearch}
									onChange={setAppDateToSearch}
									renderInput={(params) => (
										<TextField {...params} helperText={classifiedValdiation ? formatMessage({ id: 'notCorrect' }) : null} />
									)}
								/>
							</LocalizationProvider>
						</>
					)}
					{classifiedName?.find((ele) => ele == formatMessage({ id: 'theEmployee' })) && (
						<>
							<TextField
								style={{ width: '30%' }}
								label={formatMessage({ id: 'theEmployee' })}
								value={empSearch}
								onChange={(e) => setEmpSearch(e.target.value)}
							/>
						</>
					)}
					{classifiedName?.find((ele) => ele == formatMessage({ id: 'appType' })) && (
						<>
							<TextField
								style={{ width: '30%' }}
								label={formatMessage({ id: 'appType' })}
								value={appTypeSearch}
								onChange={(e) => setAppTypeSearch(e.target.value)}
							/>
						</>
					)}
					{classifiedName.length > 0 && (
						<div style={{ width: '120px', margin: '20px auto', display: 'block' }}>
							<CButton onClick={classifiedFun}>{formatMessage({ id: 'apply' })}</CButton>
							<CIcon
								style={{ height: '16px', cursor: 'pointer', position: 'absolute', top: '7px', left: '7px' }}
								icon={cilX}
								customClassName="nav-icon"
								onClick={closeClassificationCriteria}
							/>
						</div>
					)}
				</div>
				<div>
					<div
						style={{
							width: '100%',
							height: '100px',
							margin: '0 auto',
							marginTop: '20px',
							fontSize: '15px',
						}}
					>
						<HorizontalTimeline
							styles={{
								background: '#f8f8f8',
								foreground: '#1A79AD',
								outline: '#dfdfdf',
								width: '100%',
							}}
							index={curIdx}
							indexClick={(index) => {
								const theCurIdx = curIdx;
								setCurIdx(index);
								setPrevIdx(theCurIdx);
							}}
							values={steps.map((x) => x)}
						/>
					</div>
					<div className="text-center">
						<div>
							{sortAppiontment?.map(([key, value], index) => {
								if (index == curIdx) {
									return (
										<div key={Math.random() + key + Math.random()}>
											<MDBDataTable
												striped
												responsive
												small
												data={{ columns: dataColumns, rows: dataRows(value) }}
												searching={false}
											/>
										</div>
									);
								}
							})}
						</div>
					</div>
				</div>
			</CRow>
			{selectedCriteria
				? ReturnedPopup(selectedCriteria)
				: editCriterai
				? ReturnedPopup(editCriterai)
				: !editCriterai && !selectedCriteria && visible
				? ReturnedPopup()
				: null}
			{visibleDeleteModal && criteriaForDeletedAttached && deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAttachment} />
			) : visibleDeleteModal && !deleteAttacmentId ? (
				<DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={deleteTheAppiontment} />
			) : null}
			{constantAdd == 1 ? (
				<AppiontmentConstant exitSelectModal={() => setConstantAdd('')} setOpenAddSnack={setOpenAddSnack} />
			) : constantAdd == 4 ? (
				<AttachedPopup
					exitSelectModal={() => setConstantAdd('')}
					url={`appointment/${attacmentId}/attachment`}
					id={attacmentId}
					setOpenAddSnack={setOpenAddSnack}
					setOpenAttachedSnack={setOpenAttachedSnack}
					setOpenLargeAttachement={setOpenLargeAttachement}
					callback={() => dispatch(getappiontmentAttachment(editCriterai?.APP_ID_PK)).then((res) => setAttachment(res.payload))}
				/>
			) : null}
			{openEditSnack || openAddSnack || openDelSnack || openAttachedSnack || openLargeAttachement ? (
				<Snackbar open={openEditSnack || openAddSnack || openDelSnack || openAttachedSnack || openLargeAttachement} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity={`${openDelSnack || openAttachedSnack || openLargeAttachement? 'error' : 'success'}`} sx={{ width: '100%' }}>
						{openEditSnack
							? formatMessage({ id: 'itemUpdated' })
							: openDelSnack
							? formatMessage({ id: 'itemDeleted' })
							: openAttachedSnack
							? formatMessage({ id: 'error' })
							: openLargeAttachement
							? formatMessage({ id: 'largeAttachment' })
							: formatMessage({ id: 'itemAdded' })}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default HorizontalLinearStepper;
