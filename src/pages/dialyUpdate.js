import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CRow, CHeaderDivider, CCol, CFormInput } from '@coreui/react';
import UpdateIcon from '@mui/icons-material/Update';
import { MDBDataTable } from 'mdbreact';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  useIntl } from "react-intl";

import { getWorkDailyUpdates, getSessionsDailyUpdates } from '../store/reducers/dailyUpdate';
import translation from '../i18n/translate'
import "../assets/style/dailyUpdate.css"

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const DailyUpdate = () => {
	const theme = useTheme();
	const [value, setValue] = useState(0);
	const [works, setWorks] = useState([]);
	const [visible, setVisible] = useState('work');
	const [sessions, setSessions] = useState([]);
	const [chartVisible, setChartVisible] = useState(false);
	const [sessionDate, setSessionDate] = useState('2022-07-30');
	const [workDate, setWorkDate] = useState('2022-03-17');
	const { formatMessage } = useIntl();
	const dispatch = useDispatch();
	const Navigate = useNavigate();

	useEffect(() => {
		dispatch(getWorkDailyUpdates(workDate)).then((res) => (res?.payload ? setWorks(res.payload) : null));
		dispatch(getSessionsDailyUpdates(sessionDate)).then((res) => (res?.payload ? setSessions(res.payload) : null));
	}, []);

	const getWorksData = (date) => {
		setWorkDate(new Date(date).toISOString().split('T')[0]);
		dispatch(getWorkDailyUpdates(new Date(date).toISOString().split('T')[0])).then((res) => setWorks(res.payload));
	};

	const getSessionsData = (date) => {
		setSessionDate(new Date(date).toISOString().split('T')[0]);
		dispatch(getSessionsDailyUpdates(new Date(date).toISOString().split('T')[0])).then((res) => setSessions(res.payload));
	};

	const worksData = {
		columns: [
			{
				field: 'id',
				label: '#',
				sort: 'asc',
				width: 50,
			},
			{
				field: 'casNumber',
				label: formatMessage({id: 'stageNum'}),
				sort: 'asc',
			},
			{
				field: 'stage',
				label: formatMessage({id: 'stage'}),
				sort: 'asc',
			},
			{
				field: 'clientName',
				label: formatMessage({id: 'clientName'}),
				sort: 'asc',
			},
			{
				field: 'court',
				label: formatMessage({id: 'court'}),
				sort: 'asc',
			},
			{
				field: 'infoNum',
				label: formatMessage({id: 'warningNum'}),
				sort: 'asc',
			},
			// {
			// 	field: 'description',
			// 	label: 'الوصف',
			// 	sort: 'asc',
			// },
			{
				field: 'workType',
				label: formatMessage({id: 'workType'}),
				sort: 'asc',
			},
			{
				field: 'reasons',
				label: formatMessage({id: 'wrkReason'}),
				sort: 'asc',
			},
			{
				field: 'ants',
				label: formatMessage({id: 'ants'}),
				sort: 'asc',
			},
			{
				field: 'clients',
				label: formatMessage({id: 'agents'}),
				sort: 'asc',
			},
		],
		rows:
			works?.length > 0
				? works?.map((ele, i) => {
						return {
							id: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{(i += 1)}</span>,
							casNumber: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{ele.CAS_NUMBER}</span>,
							stage: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele.STG_KIND_NAME_EN ? ele.STG_KIND_NAME_EN : ele.STG_KIND_NAME}</span>,
							clientName: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISh ? ele.CLI_NAME_ENGLISh : ele.CLI_NAME }</span>,
							court: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele.COU_NAME_EN ? ele.COU_NAME_EN : ele.COU_NAME}</span>,
							infoNum: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{ele.INR_NUMBER}</span>,
							// description: (<span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{ele.WRK_DESCRIPTION}</span>),
							workType: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele.WRK_TYPE_NAME_EN ? ele.WRK_TYPE_NAME_EN : ele.WRK_TYPE_NAME}</span>,
							reasons: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele.WRK_REASON_NAME_EN ? ele.WRK_REASON_NAME_EN : ele.WRK_REASON_NAME}</span>,
							ants: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele.ANTS_EN ? ele.ANTS_EN : ele.ANTS}</span>,
							clients: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele.AGENTS_EN ? ele.AGENTS_EN : ele.AGENTS}</span>,
						};
				  })
				: [],
	};

	const sessionsData = {
		columns: [
			{
				field: 'id',
				label: '#',
				sort: 'asc',
				width: 50,
			},
			{
				field: 'casNumber',
				label: formatMessage({id: 'stageNum'}),
				sort: 'asc',
			},
			{
				field: 'sessionType',
				label: formatMessage({id: 'theSession'}),
				sort: 'asc',
			},
			{
				field: 'sessDate',
				label: formatMessage({id: 'sessionDate'}),
				sort: 'asc',
			},
			// {
			// 	field: 'sessPlace',
			// 	label: ' مكان الجلسه',
			// 	sort: 'asc',
			// },
			// {
			// 	field: 'SessAttend',
			// 	label: ' حضر الجلسه',
			// 	sort: 'asc',
			// },
			{
				field: 'court',
				label: formatMessage({id: 'court'}),
				sort: 'asc',
			},
			// {
			// 	field: 'rollCourt',
			// 	label: ' رول الجلسه',
			// 	sort: 'asc',
			// },
			// {
			// 	field: 'office',
			// 	label: 'الدائره',
			// 	sort: 'asc',
			// },
			{
				field: 'clientName',
				label: formatMessage({id: 'clientName'}),
				sort: 'asc',
			},
			{
				field: 'ants',
				label: formatMessage({id: 'ants'}),
				sort: 'asc',
			},
			{
				field: 'clients',
				label: formatMessage({id: 'agents'}),
				sort: 'asc',
			},
		],
		rows:
			sessions?.length > 0
				? sessions?.map((ele, i) => {
						return {
							id: (i += 1),
							casNumber: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>{ele?.CAS_NUMBER}</span>,
							sessionType: (
								<span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele?.CAS_TYPE_NAME_EN ? ele?.CAS_TYPE_NAME_EN :  ele?.CAS_TYPE_NAME}</span>
							),
							sessDate: (
								<span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>
									{ele?.SES_DATE ? new Date(ele?.SES_DATE)?.toISOString().split('T')[0] : null}
								</span>
							),
							// sessPlace: ele?.CAS_PLACE_NAME,
							// SessAttend: 'ay 7aga',
							court: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele?.COU_NAME_EN ? ele?.COU_NAME_EN : ele?.COU_NAME}</span>,
							// rollCourt: ele?.CAS_ROLL_NAME,
							// office: ele?.OFC_NAME,
							clientName: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele?.CLI_NAME_ENGLISh ? ele?.CLI_NAME_ENGLISh : ele?.CLI_NAME}</span>,
							ants: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele?.ANTS_EN ? ele?.ANTS_EN : ele?.ANTS}</span>,
							clients: <span onClick={() => Navigate(`/file-management/${ele.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>{document.body.getAttribute('dir') == 'ltr' && ele?.AGENTS_EN ? ele?.AGENTS_EN : ele?.AGENTS}</span>,
						};
				  })
				: [],
	};

	return (
		<div className="daily-update">
			{/* <div className="checkboxBtn">
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
							<CChartDoughnut
								data={{
									labels: ['تنتهي فى الشهر', 'كل الجلسات'],
									datasets: [
										{
											data: [5, 2],
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
									<span>كل الجلسات</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span>تنتهي فى شهر</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<CChartDoughnut
								data={{
									labels: ['كل الجلسات', 'منتهيه فى ملفات مغلقه'],
									datasets: [
										{
											data: [5, 3],
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
									<span>كل الجلسات</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span> منتهيه فى ملفات مغلقه</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<CChartDoughnut
								data={{
									labels: ['كل الأعمال ', 'منتهيه فى ملفات مفتوحه'],
									datasets: [
										{
											data: [5, 4],
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
									<span>كل الأعمال</span>
								</div>
								<div>
									<span className="allChart thirdSpecified"></span>
									<span> منتهيه فى ملفات مفتوحه</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CCol md={3} sm={6}>
					<CCard className="mb-4">
						<CCardBody>
							<CChartDoughnut
								data={{
									labels: ['كل الأعمال', ' غير مرفقه'],
									datasets: [
										{
											data: [5, 1],
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
									<span>كل الأعمال</span>
								</div>
								<div>
									<span className="allChart secondSpeicified"></span>
									<span> غير مرفقه</span>
								</div>
							</div>
						</CCardBody>
					</CCard>
				</CCol>
				<CHeaderDivider className="mb-5 mt-3" />
			</CRow> */}
			<CRow>
				<CCol xs={12}>
					<Box sx={{ bgcolor: 'background.paper' }} className="daily-update-wrapper mt-1">
						<div className="dailySection">
							<div className="daily-wrapper">
								<div className="header">
									<UpdateIcon />
									<div className="name">
										<div onClick={() => setVisible('work')} className={`${visible == "work" ? 'active' : null} shiftWorkSession`}>
											<h4>{formatMessage({id: 'work'})}</h4>
											<small style={{ display: 'flex', alignItems: 'baseline', height: '40px' }}>
												{' '}
												<span>{formatMessage({id: 'forDay'})}</span>{' '}
												<CFormInput type="date" id="inputEmail4" value={workDate} onChange={(e) => getWorksData(e.target.value)} />
											</small>
										</div>
										<div onClick={() => setVisible('session')} className={`${visible == "session" ? 'active' : null} shiftWorkSession`}>
											<h4>{formatMessage({id: 'sessions'})} </h4>
											<small style={{ display: 'flex', alignItems: 'baseline', height: '25px' }}>
												{' '}
												<span>{formatMessage({id: 'forDay'})}</span>{' '}
												<CFormInput
													type="date"
													id="inputEmail4"
													value={sessionDate}
													onChange={(e) => getSessionsData(e.target.value)}
												/>
											</small>
										</div>
									</div>
								</div>
								{visible == 'work' ? <p>{` (${works?.total}) ${formatMessage({id: 'work'})}`}</p> : <p>{`(${sessions?.total}) جلسه`}</p>}
								<div className="body">
									<UpdateIcon />
									<div className="body-data">
										<div className="daily-update-table">
											{visible == 'work' ? (
												<MDBDataTable
													striped
													bordered
													responsive
													//   scrollX
													//   scrollY
													small
													data={worksData}
													searching={false}
												/>
											) : (
												<MDBDataTable
													striped
													bordered
													responsive
													//   scrollX
													//   scrollY
													small
													data={sessionsData}
													searching={false}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</Box>
				</CCol>
			</CRow>
		</div>
	);
}

export default React.memo(DailyUpdate)
