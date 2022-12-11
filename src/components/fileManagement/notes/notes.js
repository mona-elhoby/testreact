import React, { useState, useRef, useEffect } from 'react';
import { MDBDataTable } from 'mdbreact';
import {
	CRow,
	CCol,
	CAlert,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
	CFormLabel,
	CButton,
	CFormInput,
	CFormFeedback,
	CFormTextarea,
} from '@coreui/react';
import { cilSpreadsheet, cilPlus, cilTrash, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';

import AttachedHeadTable from '../../../features/attachedFileHaed';
import { NoteCard } from './notesCard';
import { relNotesSelectBox } from '../../../contraints/constants';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

const names = ['رقم التصديق', 'تاريخ التصديق', 'تاريخ الإنتهاء', 'مكان الوكاله', 'نوع الوكاله', 'الصفه', 'الموكلين', 'ملاحظات', 'الباركود'];
function getStyles(name, personName, theme) {
	return {
		fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

const FileConsulting = () => {
	const [visible, setVisible] = useState(false);
	const [searchVal, setSearchVal] = useState('');
	const [classifiedName, setClassifiedName] = useState([]);
	const [searchedDiv, setSearchedDiv] = useState(null);
	const [noteDate, setNoteDate] = useState('');
	const [noteRel, setNoteRel] = useState('0');
	const [selectedCriteria, setSelectedCriteria] = useState(null);
	const [editCriterai, setEditCriterai] = useState(null);
	const [attached, setAttached] = useState([]);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
	const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [noteType, setNoteType] = useState('');
	const [noteStatusAddList, stNoteStatusAddList] = useState([]);
	const [notes, setNotes] = useState('');
	const [noteStatus, setNoteStatus] = useState('');
	const [employee, setEmployee] = useState('');
	const [noteStatusDate, setNoteStatusDate] = useState('');
	const [lastDate, setLastDate] = useState('');
	const [thenotes, setTheNotes] = useState('');
	const [sesDate, setSesDate] = useState('');
	const [stageNum, setStageNum] = useState('');
	const [warningNum,setWarningNum] = useState('')
	const [informingNum,setInformingNum] = useState('')
	const [exeNum,setExeNum] = useState('')
	const { selectedCase } = useSelector((state) => state.fileManagement);

	const [error, setError] = useState(null);
	const theme = useTheme();
	const dispatc = useDispatch();

	useEffect(() => {}, []);

	const searchByChar = (e) => {
		console.log(e.target.value);
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setSearchedDiv(null);
			setSearchedDiv(allWarnings);
		} else {
			const newClassifiedArr = allWarnings?.filter(
				(ele) =>
					ele &&
					Object.values(ele).find((ele2) =>
						typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
					)
			);
			setSearchedDiv(newClassifiedArr);
		}
	};

	const classifiedFun = () => {
		// dispatch(
		// 	getWarningsData({
		// 		theParams: {
		// 			warNumSearch: warNumSearch ? warNumSearch : undefined,
		// 			warSearchDateFrom: warSearchDateFrom ? warSearchDateFrom : undefined,
		// 			warSearchDateTo: warSearchDateTo ? warSearchDateTo : undefined,
		// 			searchVal: searchVal ? searchVal : undefined,
		// 			id: id ? id : undefined,
		// 		},
		// 	})
		// );
	};

	const handelSearchbtn = (e) => {
		if (e.key === 'Enter') {
			classifiedFun();
		}
	};
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setClassifiedName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	// for snack alert
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	const exitSelectModal = () => {
		setVisible(false);
		setSelectedCriteria(null);
		setEditCriterai(null);
	};
	const handelAddMoreInvoice = () => {
		stNoteStatusAddList(
			noteStatusAddList.concat(
				<NoteCard
					key={`invoice${noteStatusAddList.length}`}
					val1={noteStatus}
					onChange1={(e) => setNoteStatus(e.target.value)}
					val2={employee}
					onChange2={(e) => setEmployee(e.target.value)}
					val3={noteStatusDate}
					onChange3={(e) => setNoteStatusDate(e.target.value)}
					val4={lastDate}
					onChange4={(e) => setLastDate(e.target.value)}
					val5={thenotes}
					onChange5={(e) => setTheNotes(e.target.value)}
					name1={`invoice${noteStatusAddList.length}`}
					name5={`invoice${noteStatusAddList.length}`}
					name4={`invoice${noteStatusAddList.length}`}
					name3={`invoice${noteStatusAddList.length}`}
					name2={`invoice${noteStatusAddList.length}`}
				/>
			)
		);
	};
	//  modal
	let ReturnedPopup = null;
	ReturnedPopup = () => (
		<CModal visible={visible} onClose={() => exitSelectModal()} className="finance-modal note-modal">
			<CModalHeader>
				<CModalTitle>
					<CIcon style={{ height: '20px' }} icon={cilSpreadsheet} customClassName="nav-icon" />
					{selectedCriteria || editCriterai ? 'فاتوره' : 'إضافه'}
				</CModalTitle>
			</CModalHeader>
			<CModalBody>
				{/* {console.log(allAppiontments,sortAppiontment ,)} */}
				<CRow>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> نوع المذكره </CFormLabel>
						{selectedCriteria ? (
							<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : 'لا يوجد'}</p>
						) : (
							<FormControl fullWidth>
								<Select
									displayEmpty
									inputProps={{ 'aria-label': 'Without label' }}
									value={noteType}
									onChange={(e) => setNoteType(e.target.value)}
									error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
								>
									{/* {allEmployee.map((ele) => (
                                <MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
                                    {ele.EMP_NAME}
                                </MenuItem>
                            ))} */}
								</Select>
								{/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<CFormLabel>تاريخ المذاكره</CFormLabel>
						{selectedCriteria ? (
							<p style={{ width: '45%' }}>{selectedCriteria ? new Date(selectedCriteria?.APP_DATE).toLocaleDateString() : 'لا يوجد'}</p>
						) : (
							<FormControl fullWidth>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DateTimePicker
										defaultValue={editCriterai ? new Date(editCriterai?.APP_DATE).toISOString().split('T')[0] : noteDate}
										onChange={(e) => setNoteDate(e)}
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>
							</FormControl>
						)}
					</CCol>
					<CCol md={6}>
						<div>
							<CFormLabel htmlFor="inputEmail4">العائديه</CFormLabel>
							{selectedCriteria ? (
								<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : 'لا يوجد'}</p>
							) : (
								<FormControl fullWidth>
									<Select
										displayEmpty
										inputProps={{ 'aria-label': 'Without label' }}
										onChange={(e) => setNoteRel(e.target.value)}
										value={noteRel}
										// error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
									>
										{relNotesSelectBox.map((ele) => (
											<MenuItem value={ele.id} key={Math.random() + ele.id}>
												{ele.arName}
											</MenuItem>
										))}
									</Select>
									{/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
								</FormControl>
							)}
						</div>
						{noteRel == '1' || noteRel == '5' ? (
							<div>
							<div>
								<CFormLabel htmlFor="inputEmail4">رقم القضيه</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : 'لا يوجد'}</p>
								) : (
									<FormControl fullWidth>
										<Select
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											value={stageNum}
											onChange={(e) => setStageNum(e.target.value)}
											// error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
										>
											{/* {allEmployee.map((ele) => (
												<MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
													{ele.EMP_NAME}
												</MenuItem>
											))} */}
										</Select>
										{/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
									</FormControl>
								)}
							</div>
							</div>
						) : noteRel == '3' ? (
							<div>
								<CFormLabel htmlFor="inputEmail4">رقم الإنذار</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : 'لا يوجد'}</p>
								) : (
									<FormControl fullWidth>
										<Select
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											value={warningNum}
											onChange={(e) => setWarningNum(e.target.value)}
											// error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
										>
											{/* {allEmployee.map((ele) => (
												<MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
													{ele.EMP_NAME}
												</MenuItem>
											))} */}
										</Select>
										{/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
									</FormControl>
								)}
							</div>
						) : noteRel == '4' ? (
							<div>
								<CFormLabel htmlFor="inputEmail4">رقم البلاغ</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : 'لا يوجد'}</p>
								) : (
									<FormControl fullWidth>
										<Select
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											value={informingNum}
											onChange={(e) => setInformingNum(e.target.value)}
											// error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
										>
											{/* {allEmployee.map((ele) => (
												<MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
													{ele.EMP_NAME}
												</MenuItem>
											))} */}
										</Select>
										{/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
									</FormControl>
								)}
							</div>
						) : noteRel == '2' ? (
							<div>
								<CFormLabel htmlFor="inputEmail4">رقم الإجراء</CFormLabel>
								{selectedCriteria ? (
									<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : 'لا يوجد'}</p>
								) : (
									<FormControl fullWidth>
										<Select
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											value={exeNum}
											onChange={(e) => setExeNum(e.target.value)}
											// error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
										>
											{/* {allEmployee.map((ele) => (
												<MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
													{ele.EMP_NAME}
												</MenuItem>
											))} */}
										</Select>
										{/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
									</FormControl>
								)}
							</div>) : null}
							{
								noteRel == '1' && (
									<div>
										<CFormLabel htmlFor="inputEmail4"> تاريخ الجلسه</CFormLabel>
										{selectedCriteria ? (
											<p>{selectedCriteria.EMP_NAME ? selectedCriteria.EMP_NAME : 'لا يوجد'}</p>
										) : (
											<CFormInput
												type="date"
												defaultValue={sesDate}
												onChange={(e) => setSesDate(e.target.value)}
												// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
											/>
										)}
									</div>
								)
							}
					</CCol>
					<CCol md={6}>
						<CFormLabel htmlFor="inputEmail4"> الملاحظات</CFormLabel>
						<CFormTextarea rows={8} value={notes} onChange={(e) => setNotes(e.target.value)} />
					</CCol>
					<CCol md={12}>
					<hr />
						<CFormLabel>حالات المذكره</CFormLabel>
						<form id="form1">
							<div className="divTable">
								<div className="headRow">
									<div className="divCell" align="center">
										الحاله
									</div>
									<div className="divCell" align="center">
										الموظف{' '}
									</div>
									<div className="divCell" align="center">
										التاريخ{' '}
									</div>
									<div className="divCell" align="center">
										تاريخ أخر تحرير
									</div>
									<div className="divCell" align="center">
										ملاحظات
									</div>
								</div>
								{noteStatusAddList}
								<CIcon
									// onClick={() => openUpdateModal(ele?.WRK_ID_PK)}
									style={{ height: '16px', float: 'left', cursor: 'pointer' }}
									icon={cilPlus}
									customClassName="nav-icon"
									onClick={handelAddMoreInvoice}
								/>
							</div>
						</form>
					</CCol>
				</CRow>
			</CModalBody>
			<CModalFooter>
				<CButton color="danger" className="btn-modal-close" onClick={() => exitSelectModal()}>
					إغلاق
				</CButton>
				{selectedCriteria ? null : editCriterai ? (
					<CButton className="btn-modal-save" color="primary" onClick={updateConsult}>
						حفظ التغيرات
					</CButton>
				) : (
					<CButton className="btn-modal-save" color="primary" onClick={addConsult}>
						إضافه
					</CButton>
				)}
			</CModalFooter>
		</CModal>
	);
	const showData = () => {
		setSelectedCriteria(null);
		setEditCriterai(null);
		setVisible(true);
	};
	const emptyInputsVals = () => {
		setNoteDate('');
		setNoteRel('');
		DurationTo(undefined);
		setAmount('');
	};
	const openAddPopup = () => {
		setSelectedCriteria(null);
		setEditCriterai(null);
		setVisible(true);
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		setOpenAttachedSnack(false);
	};

	const addConsult = () => {
		//dispatch().then((res) => {
		// 	if (res?.payload?.result?.code) {
		// 		// console.log(res?.payload?.result);
		// 		setError(res?.payload?.result);
		// 	} else {
		// 		setVisible(false);
		// 		setOpenAddSnack(true);
		// 		emptyInputsVals();
		// 	}
		// });
	};
	const openUpdateModal = (id) => {
		setOpenDelSnack(false);
		setOpenDelErrorSnack(false);
		setOpenEditSnack(false);
		setOpenAddSnack(false);
		setOpenAttachedSnack(false);
	};
	const updateConsult = (editId) => {
		console.log(editId);
		//dispatch().then((res) => {
		// console.log(res);
		// 	setOpenAddSnack(true);
		// 	setVisible(false);
		// 	setOpenEditSnack(true);
		// 	emptyInputsVals();
		// });
	};

	// delete Stage
	// const deleteTheStage = (id) => {
	// 	dispatch(deleteStage(id)).then((res) => (res?.payload?.result?.status == 200 ? setOpenDelSnack(true) : setOpenDelErrorSnack(true)));
	// };

	const consultData = [
		{
			id: <span onClick={showData}>1</span>,
			type: <span onClick={showData}> 4344</span>,
			date: <span onClick={showData}> '12/2/2322'</span>,
			step: <span onClick={showData}> 'tgFGJUKUHUJKIHFUHR'</span>,
			// setNotes:(<span onClick={showData}> "tgFGJUKUHUJKIHFUHR"</span>),
			period: <span onClick={showData}> gdjnks</span>,
			case: <span onClick={showData}> '40 '</span>,
			chequNum: <span onClick={showData}> 865</span>,
			session: <span onClick={showData}> '12/2/2322'</span>,
			alert: <span onClick={showData}> '12/2/2322'</span>,
			report: <span onClick={showData}> 4344</span>,
			// attachment:(<span onClick={showData}> 0</span>),
			DeletEdit: (
				<p>
					<CButton style={{ background: '#1e42a0 !important' }}>
						<CIcon
							// onClick={() => openUpdateModal(ele?.WRK_ID_PK)}
							style={{ height: '16px', marginRight: '-3px' }}
							icon={cilPencil}
							customClassName="nav-icon"
						/>
					</CButton>
					<CButton color={'danger'}>
						<CIcon
							// onClick={() => deleteTheWork(ele?.WRK_ID_PK)}
							style={{ height: '16px', marginRight: '-3px' }}
							icon={cilTrash}
							customClassName="nav-icon"
						/>
					</CButton>
				</p>
			),
		},
		{
			id: <span onClick={showData}>1</span>,
			type: <span onClick={showData}> 4344</span>,
			date: <span onClick={showData}> '12/2/2322'</span>,
			step: <span onClick={showData}> 'tgFGJUKUHUJKIHFUHR'</span>,
			// setNotes:(<span onClick={showData}> "tgFGJUKUHUJKIHFUHR"</span>),
			period: <span onClick={showData}> gdjnks</span>,
			case: <span onClick={showData}> '40 '</span>,
			chequNum: <span onClick={showData}> 865</span>,
			session: <span onClick={showData}> '12/2/2322'</span>,
			alert: <span onClick={showData}> '12/2/2322'</span>,
			report: <span onClick={showData}> 4344</span>,
			// attachment:(<span onClick={showData}> 0</span>),
			DeletEdit: (
				<p>
					<CButton style={{ background: '#1e42a0 !important' }}>
						<CIcon
							// onClick={() => openUpdateModal(ele?.WRK_ID_PK)}
							style={{ height: '16px', marginRight: '-3px' }}
							icon={cilPencil}
							customClassName="nav-icon"
						/>
					</CButton>
					<CButton color={'danger'}>
						<CIcon
							// onClick={() => deleteTheWork(ele?.WRK_ID_PK)}
							style={{ height: '16px', marginRight: '-3px' }}
							icon={cilTrash}
							customClassName="nav-icon"
						/>
					</CButton>
				</p>
			),
		},
		{
			id: <span onClick={showData}>1</span>,
			type: <span onClick={showData}> 4344</span>,
			date: <span onClick={showData}> '12/2/2322'</span>,
			step: <span onClick={showData}> 'tgFGJUKUHUJKIHFUHR'</span>,
			// setNotes:(<span onClick={showData}> "tgFGJUKUHUJKIHFUHR"</span>),
			period: <span onClick={showData}> gdjnks</span>,
			case: <span onClick={showData}> '40 '</span>,
			chequNum: <span onClick={showData}> 865</span>,
			session: <span onClick={showData}> '12/2/2322'</span>,
			alert: <span onClick={showData}> '12/2/2322'</span>,
			report: <span onClick={showData}> 4344</span>,
			// attachment:(<span onClick={showData}> 0</span>),
			DeletEdit: (
				<p>
					<CButton style={{ background: '#1e42a0 !important' }}>
						<CIcon
							// onClick={() => openUpdateModal(ele?.WRK_ID_PK)}
							style={{ height: '16px', marginRight: '-3px' }}
							icon={cilPencil}
							customClassName="nav-icon"
						/>
					</CButton>
					<CButton color={'danger'}>
						<CIcon
							// onClick={() => deleteTheWork(ele?.WRK_ID_PK)}
							style={{ height: '16px', marginRight: '-3px' }}
							icon={cilTrash}
							customClassName="nav-icon"
						/>
					</CButton>
				</p>
			),
		},
	];

	const datatable = {
		columns: [
			{
				label: '#',
				field: 'id',
				sort: 'asc',
				width: 50,
			},
			{
				label: 'تاريخ المذكره',
				field: 'date',
				sort: 'asc',
				width: 200,
			},
			{
				label: ' نوع المذكره   ',
				field: 'type',
				sort: 'asc',
				width: 100,
			},
			{
				label: ' الإجراء   ',
				field: 'step',
				sort: 'asc',
				width: 100,
			},
			{
				label: 'القضيه',
				field: 'case',
				sort: 'asc',
				width: 100,
			},
			{
				label: 'الجلسه',
				field: 'session',
				sort: 'asc',
				width: 100,
			},
			{
				label: 'الإنذار',
				field: 'alert',
				sort: 'asc',
				width: 100,
			},
			{
				label: 'البلاغ',
				field: 'report',
				sort: 'asc',
				width: 100,
			},
			{
				label: 'مده العمل',
				field: 'period',
				sort: 'asc',
				width: 100,
			},
			// {
			//     label: 'ملاحظات',
			//     field: 'notes',
			//     sort: 'asc',
			//     width: 100
			// },
			// {
			//     label: 'مرفقات',
			//     field: 'attachment',
			//     sort: 'asc',
			//     width: 100
			// },
			{
				label: '',
				field: 'DeletEdit',
				width: 100,
			},
		],
		rows: consultData,
	};
	return (
		<div className="file-alerts consulting box">
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
									return <span>تصنيف حسب</span>;
								}

								return selected.join(', ');
							}}
							MenuProps={MenuProps}
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
			{selectedCriteria ? ReturnedPopup(selectedCriteria) : !selectedCriteria && editCriterai ? ReturnedPopup(editCriterai) : (!editCriterai && !!selectedCriteria && visible) ? ReturnedPopup() : null}
			{openAddSnack || openDelSnack || openDelErrorSnack ? (
				<Snackbar open={openAddSnack || openDelSnack || openDelErrorSnack || OpenAttachedSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity={`${openDelSnack || openDelErrorSnack ? 'error' : 'success'}`} sx={{ width: '100%' }}>
						{OpenEditSnack
							? 'تم التعديل بنجاح'
							: openDelSnack
							? 'تم إزاله الجلسه'
							: openDelErrorSnack
							? 'لا يمكن ازاله الجلسه'
								? OpenAttachedSnack
								: 'يوجد خطأ بالملف'
							: 'تمت الإضافه بنجاح'}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(FileConsulting);
