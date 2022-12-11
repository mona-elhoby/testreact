import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CHeaderDivider, CButton, CCol, CRow, CFormInput } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilMinus, cilX } from '@coreui/icons';
import { Theme, useTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {  useIntl } from "react-intl";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { getCases } from '../store/reducers/file-management';
import { getStageById, getStageData } from '../store/reducers/stage';
import { getReminderCases } from '../store/reducers/reminderData';
import { ReturnedPopup } from '../components/fileManagement/fileDetails/filePopup';
import { fileCard } from '../components/fileManagement/fileDetails/fileCard';
import { deleteFile } from '../store/reducers/file-management';
import '../components/fileManagement/fileManagement.css';
import '../assets/style/popupCarousel.css';
import DeletePopup from "../features/delete";
import translation from '../i18n/translate'

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
ChartJS.register(ArcElement, Tooltip, Legend);
//TODO calssification for agent not work
const FilesManagment = () => {
	const [visible, setVisible] = useState(false);
	const [visibleModal, setVisibleModal] = useState(false);
	const [collapseId, setCollapseId] = useState(null);
	const [theClassName, setTheClassName] = useState(null);
	const [chartVisible, setChartVisible] = useState(false);
	const [openEditSnack, setOpenEditSnack] = useState(false);
	const [openAddSnack, setOpenAddSnack] = useState(false);
	const [openDelSnack, setOpenDelSnack] = useState(false);
	const [openAttachedSnack, setOpenAttachedSnack] = useState(false);
	const [openErrorSnack, setOpenErrorSnack] = useState(false);
	const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
	const [openDelErrorSnack, setOpenDelErrorSnack] = useState(false);
	const [classifiedName, setClassifiedName] = useState([]);
	const [searchVal, setSearchVal] = useState('');
	const [casNumberSearch, setCasNumberSearch] = useState('');
	const [antsSearch, setAntsSearch] = useState('');
	const [agentSearch, setAgentSearch] = useState('');
	const [fileTypeSearch, setFileTypeSearch] = useState('');
	const [caseOpenFromSearch, setCaseOpenFromSearch] = useState(undefined);
	const [caseOpenToSearch, setCaseOpeToSearch] = useState(undefined);
	const [subCasSearch, setSubCasSearch] = useState('');
	const [categorySearch, setCategorySearch] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [page, setId] = useState(1);
	const [pageSearch, setPageSearch] = useState(null);
	const [deletedItemId, setDeletedItemId]= useState(null)
	const [classifiedValdiation, setClassifiedValdiation] = useState(false);
		const theme = useTheme(); 
	const dispatch = useDispatch();
	const { formatMessage } = useIntl();
	const { allCases, isLoadingFileManagment } = useSelector((state) => state.fileManagement);
	const { allStages } = useSelector((state) => state.stage);
	const { reminderCases, isLoadingReminder } = useSelector((state) => state.reminderData);
	const names = [formatMessage({id: 'fileCategory'}), formatMessage({id: 'casType'}), formatMessage({id: 'ants'}), formatMessage({id: 'agents'}), formatMessage({id: 'case'}), formatMessage({id: 'openDate'}), formatMessage({id:'fileNum'})];
//TODO: search return server internal error
	useEffect(() => {
		dispatch(getCases({ theParams: null }));
		// console.log(allCases)
		dispatch(getReminderCases());
		// console.log("reminderCases", reminderCases)
	}, [dispatch]);

	const getStages = (id) => {
		// console.log('id', id, 'allStages', allStages);
		dispatch(getStageData(id));
		// getStageData(id).then(res => console.log(res))
		setCollapseId(id);
		setVisible(!visible);
		setTheClassName(null);
	};
	const openDeletePopup = (id) => {
		setDeletedItemId(id)
		setVisibleDeleteModal(true)
	}
	const handleDeleteItem = (id) => {
		// console.log(id)
		dispatch(deleteFile(deletedItemId)).then((res) => {
			console.log(res.payload)
			if (res?.payload?.result?.status == 200) {
				setOpenDelSnack(true);
			} else {
				setOpenDelErrorSnack(true);
				dispatch(getCases({ theParams: null }));
				setVisibleDeleteModal(false)
			}
		});
	};
	const exitSelectModal = () => {
		setVisibleModal(false);
		// setVisibleDeleteModal(false)
	};
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
		setOpenEditSnack(false)
		setOpenAddSnack(false)
		setOpenDelErrorSnack(false)
	};
	// classification function
	const handleChangeClassification = React.useMemo(
		() => (event) => {
			const {
				target: { value },
			} = event;
			setClassifiedName(typeof value === 'string' ? value.split(',') : value);
		},
		[classifiedName, searchVal, casNumberSearch, antsSearch, fileTypeSearch, caseOpenFromSearch, subCasSearch, categorySearch]
	);

	const classifiedFun = React.useCallback(() => {
		if(caseOpenFromSearch > caseOpenToSearch){
			setClassifiedValdiation(true)
		}
		dispatch(
			getCases({
				theParams: {
					casNumberSearch: casNumberSearch ? casNumberSearch : undefined,
					antsSearch: antsSearch ? antsSearch : undefined,
					agentSearch: agentSearch ? agentSearch : undefined,
					fileTypeSearch: fileTypeSearch ? fileTypeSearch : undefined,
					caseOpenFromSearch: caseOpenFromSearch ? caseOpenFromSearch : undefined,
					caseOpenToSearch: caseOpenToSearch ? caseOpenToSearch : undefined,
					subCasSearch: subCasSearch ? subCasSearch : undefined,
					categorySearch: categorySearch ? categorySearch : undefined,
					searchVal: searchVal ? searchVal : undefined,
				},
			})
		);
	}, [classifiedName, searchVal, casNumberSearch, antsSearch, fileTypeSearch, caseOpenFromSearch, subCasSearch, categorySearch]);

	const closeClassificationCriteria = () => {
		setClassifiedName([]);
		setCasNumberSearch('');
		setAntsSearch('');
		setAgentSearch('');
		setFileTypeSearch('');
		setCaseOpenFromSearch(undefined);
		setCaseOpeToSearch(undefined);
		setSubCasSearch('');
		setCategorySearch('');
		dispatch(getCases({ theParams: null }));
	};
	const handelSearchbtn = React.useMemo(
		() => (e) => {
			setSearchVal(e.target.value);
			if (e.key === 'Enter') {
				setPageSearch(null);
				classifiedFun();
			}
		},
		[classifiedName, searchVal, casNumberSearch, antsSearch, fileTypeSearch, caseOpenFromSearch, subCasSearch, categorySearch]
	);
	// console.log(allContacts);
	const searchByChar = (e) => {
		setSearchVal(e.target.value);
		if (!e.target.value) {
			setPageSearch(null);
		} else {
			const newClassifiedArr = allCases?.data?.filter((ele) =>
				Object.values(ele).find((ele2) =>
					typeof ele2 == 'string' || typeof ele2 == 'object' ? ele2?.includes(e.target.value) : ele2.toString()?.includes(e.target.value)
				)
			);
			// console.log(newClassifiedArr);
			// console.log(e.target.value);
			setPageSearch(newClassifiedArr);
		}
	};

	const handelChangePgae = React.useCallback(
		(e, val) => {
			// console.log(val)
			setId(val);
			dispatch(
				getCases({
					theParams: {
						offset: (val - 1) * 10,
					},
				})
			);
		},
		[page]
	);

	const pagesNum = allCases.total ? Math.ceil(allCases?.total / 10) : 1;
	return (
		<div className="file-management box">
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
					{formatMessage({id: 'charts'})}
				</span>
			</div>
			<CHeaderDivider className="mb-3 mt-2" />
			<CRow className={`${chartVisible ? 'showChart' : 'hideChart'}`}>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<Doughnut
								data={{
									labels: [formatMessage({id: 'theAll'}), formatMessage({id: 'new'})],
									datasets: [
										{
											data: [reminderCases?.total, reminderCases?.FILE_NEW?.total],
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
									<span>{formatMessage({id: 'theAll'})}</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>{formatMessage({id: 'new'})}</span>
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
									labels: [formatMessage({id: 'new'}), formatMessage({id: 'withoutAgency'})],
									datasets: [
										{
											data: [reminderCases?.total, reminderCases?.FILE_WITHOUT_AGENCY.total],
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
									<span>{formatMessage({id: 'new'})}</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span>{formatMessage({id: 'withoutAgency'})}</span>
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
									labels: [formatMessage({id: 'new'}), formatMessage({id: 'notUsed'})],
									datasets: [
										{
											data: [reminderCases?.total, reminderCases?.FILE_USE?.total],
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
									<span>{formatMessage({id: 'new'})}</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>{formatMessage({id: 'notUsed'})}</span>
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
									labels: [formatMessage({id: 'new'}), formatMessage({id: 'withoutContract'})],
									datasets: [
										{
											data: [reminderCases?.total, reminderCases?.FILE_WITHOUT_CONTRACT?.total],
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
									<span>{formatMessage({id: 'new'})}</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span>{formatMessage({id: 'withoutContract'})}</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
			<CRow>
				<CCol md={12}>
					<div className="headerFiles">
						<div>
							<CButton className="add-contact" onClick={() => setVisibleModal(true)}>
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
											return <span>{translation('classification')}</span>;
										}

										return selected.join(', ');
									}}
									MenuProps={MenuProps}
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
							<CFormInput type="text" value={searchVal} onChange={searchByChar} placeholder="بحث..." onKeyDown={(e) => handelSearchbtn(e)} />
						</div>
					</div>
					<div className={`classified-global-criteria ${classifiedName?.length == 0 && 'hide'}`}>
						{classifiedName?.find((ele) => ele == formatMessage({id:'fileNum'})) && (
							<TextField
								style={{ width: '30%' }}
								label={formatMessage({id:'fileNum'})}
								value={casNumberSearch}
								onChange={(e) => setCasNumberSearch(e.target.value)}
							/>
						)}
						{classifiedName?.find((ele) => ele == formatMessage({id: 'ants'})) && (
							<TextField style={{ width: '30%' }} label={formatMessage({id: 'ants'})} value={antsSearch} onChange={(e) => setAntsSearch(e.target.value)} />
						)}
						{classifiedName?.find((ele) => ele == formatMessage({id: 'agents'})) && (
							<TextField style={{ width: '30%' }} label={formatMessage({id: 'agents'})} value={agentSearch} onChange={(e) => setAgentSearch(e.target.value)} />
						)}
						{classifiedName?.find((ele) => ele == formatMessage({id: 'openDate'})) && (
							<>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label={formatMessage({id: 'from'})}
										value={caseOpenFromSearch}
										onChange={setCaseOpenFromSearch}
										renderInput={(params) => <TextField {...params} helperText={classifiedValdiation ?  formatMessage({id: 'notCorrect'}): null}/>}
									/>
								</LocalizationProvider>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										label={formatMessage({id: 'to'})}
										value={caseOpenToSearch}
										onChange={setCaseOpeToSearch}
										renderInput={(params) => <TextField {...params} helperText={classifiedValdiation ?  formatMessage({id: 'notCorrect'}): null}/>}
									/>
								</LocalizationProvider>
							</>
						)}
						{classifiedName?.find((ele) => ele == formatMessage({id: 'case'})) && (
							<TextField style={{ width: '30%' }} label={formatMessage({id: 'case'})} value={subCasSearch} onChange={(e) => setSubCasSearch(e.target.value)} />
						)}
						{classifiedName?.find((ele) => ele == formatMessage({id: 'fileCategory'})) && (
							<TextField
								style={{ width: '30%' }}
								label={formatMessage({id: 'fileCategory'})}
								value={categorySearch}
								onChange={(e) => setCategorySearch(e.target.value)}
							/>
						)}
						{classifiedName?.find((ele) => ele == formatMessage({id: 'casType'})) && (
							<TextField style={{ width: '30%' }} label={formatMessage({id: 'casType'})} value={fileTypeSearch} onChange={(e) => setFileTypeSearch(e.target.value)} />
						)}
						{classifiedName.length > 0 && (
							<div style={{ width: '120px', margin: '20px auto', display: 'block' }}>
								<CButton onClick={classifiedFun}>{formatMessage({id: 'apply'})}</CButton>
								<CIcon
									style={{ height: '16px', cursor: 'pointer', position: 'absolute', top: '7px', left: '7px' }}
									icon={cilX}
									customClassName="nav-icon"
									onClick={closeClassificationCriteria}
								/>
							</div>
						)}
					</div>
				</CCol>
				{pageSearch
					? fileCard({ file: pageSearch, getStages, setTheClassName, allStages, collapseId, theClassName, handleDeleteItem: openDeletePopup })
					: fileCard({ file: allCases.data, getStages, setTheClassName, allStages, collapseId, theClassName, handleDeleteItem: openDeletePopup })}
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
			{visibleModal && (
				<ReturnedPopup
					stage={null}
					exitSelectModal={() => exitSelectModal()}
					setOpenAddSnack={setOpenAddSnack}
					setOpenEditSnack={setOpenEditSnack}
					setOpenDelSnack={setOpenDelSnack}
					setOpenAttachedSnack={setOpenAttachedSnack}
					setOpenErrorSnack={setOpenErrorSnack}
					setOpenDelErrorSnack={setOpenDelErrorSnack}
				/>
			)}
			{
				visibleDeleteModal ? <DeletePopup exitSelectModal={() => setVisibleDeleteModal(false)} handleDelete={handleDeleteItem}/> : null
			}
			{openDelErrorSnack || openAddSnack || openDelSnack || openAttachedSnack ? (
				<Snackbar open={openDelErrorSnack || openAddSnack || openDelSnack || openAttachedSnack} autoHideDuration={2000} onClose={handleCloseSnack}>
					<Alert onClose={handleCloseSnack} severity={`${openDelSnack || openAttachedSnack || openDelErrorSnack ? 'error' : 'success'}`} sx={{ width: '100%' }}>
						{openEditSnack ? formatMessage({id: 'itemUpdated'}) : openDelErrorSnack ? formatMessage({id: 'itemDeleted'}) : openAttachedSnack ? formatMessage({id: 'error'}) : formatMessage({id: 'itemAdded'})}
					</Alert>
				</Snackbar>
			) : null}
		</div>
	);
};

export default React.memo(FilesManagment);
