import React, { useState, useEffect } from 'react';
import { CRow, CCol, CNav, CNavItem } from '@coreui/react';
import {
	cilWarning,
	cilWallet,
	cilVector,
	cilInfo,
	cilLayers,
	cilInstitution,
	cilSpreadsheet,
	cilVolumeHigh,
	cilWindow,
	cilNotes,
	cilTask,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import FileInformation from '../components/fileManagement/fileDetails/file-information';
import FileAlerts from '../components/fileManagement/warnings/warning';
import FileReports from '../components/fileManagement/informings/informing';
import FileCosts from '../components/fileManagement/task/task';
import FileConsulting from '../components/fileManagement/consultion/consulting';
import ManagementWork from '../components/fileManagement/works/managementWork';
import FileNotes from '../components/fileManagement/notes/notes';
import FileSession from '../components/fileManagement/sessions/sessions';
import FileCases from '../components/fileManagement/stages/cases';
import FileExecution from '../components/fileManagement/execute/execute';
import FileFinance from '../components/fileManagement/finance/finance.js';
// import TheReactFlowGraph from '../components/fileManagement/flowChart/react-flow';
import { getCaseById } from '../store/reducers/file-management';
import { getEmployeeData } from '../store/reducers/emlpoyee';
import '../components/fileManagement/style.css';
// import style '../css/fileManagement.module.css'

const FileDetails = () => {
	const { id, name } = useParams();
	const { formatMessage } = useIntl();
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const [activeTab, setActiveTab] = useState(name ? name : 'A');
	const [theFile, setTheFile] = useState(null);
	const [warning, setWarning] = useState(null);
	const tabs = [
		{
			index: 'A',
			name: formatMessage({ id: 'fileInfo' }),
			icon: cilInfo,
			routeName: 'info',
		},
		{
			index: 'B',
			name: formatMessage({ id: 'warnings' }),
			icon: cilWarning,
			routeName: 'warning',
		},
		{
			index: 'C',
			name: formatMessage({ id: 'informings' }),
			icon: cilVolumeHigh,
			routeName: 'informing',
		},
		{
			index: 'D',
			name: formatMessage({ id: 'stages' }),
			icon: cilLayers,
			routeName: '',
		},
		{
			index: 'E',
			name: formatMessage({ id: 'sessions' }),
			icon: cilVector,
			routeName: 'session',
		},
		{
			index: 'F',
			name: formatMessage({ id: 'costs' }),
			icon: cilTask,
			routeName: 'costs',
		},
		{
			index: 'G',
			name: formatMessage({ id: 'consulting' }),
			icon: cilSpreadsheet,
			routeName: '',
		},
		{
			index: 'H',
			name: formatMessage({ id: 'finance' }),
			icon: cilWallet,
			routeName: '',
		},
		{
			index: 'I',
			name: formatMessage({ id: 'theNotes' }),
			icon: cilNotes,
			routeName: 'notes',
		},
		{
			index: 'J',
			name: formatMessage({ id: 'procedings' }),
			icon: cilInstitution,
			routeName: 'execute',
		},
		{
			index: 'K',
			name: formatMessage({ id: 'worksManagement' }),
			icon: cilWindow,
			routeName: 'work',
		},
	];
	// console.log(id)
	useEffect(() => {
		dispatch(getCaseById(id)).then((res) => {
			// console.log(res);
			res.payload?.message == 'Case not found.' && Navigate('/404');
			setTheFile(res.payload);
		});
		// get elmokalf and follower
		dispatch(getEmployeeData());
		// window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for Firefox and chrome
		// var pc = new RTCPeerConnection({ iceServers: [] }),
		// 	noop = function () {};
		// pc.createDataChannel(''); //create a bogus data channel
		// pc.createOffer(pc.setLocalDescription.bind(pc), noop); // create offer and set local description
		// pc.onicecandidate = function (ice) {
		// 	if (!ice || !ice.candidate || !ice.candidate.candidate) return;

		// 	var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
		// 	console.log('my IP: ', myIP, 'ice: ', ice, ice.candidate.candidate);
		// 	pc.onicecandidate = noop;
		// };
	}, [dispatch]);

	return (
		<div className="FileDetails">
			<div className="client-details"></div>
			<div className="navs-tab">
				<CRow>
					<CCol xs={'12'}>
						<CNav className="justify-content-center">
							{tabs.map((item, index) => {
								return (
									<CNavItem key={index} className={`${activeTab == item.index || name == item?.routeName ? 'active' : null}`}>
										<p
											onClick={() => {
												setActiveTab(item.index);
												name ? Navigate(`/file-management/${id}`) : null;
												activeTab == 'B' ? setWarning('show') : null;
											}}
										>
											<CIcon style={{ height: '20px' }} icon={item.icon} customClassName="nav-icon" />
											<span>{item.name}</span>
										</p>
									</CNavItem>
								);
							})}
						</CNav>
					</CCol>
				</CRow>
			</div>
			<div className="data-show">
				{
					activeTab == 'A' ? (
						<div className={`file-information ${activeTab == 'A' ? 'show' : 'hide'}`}>
							<FileInformation stage={theFile} />
						</div>
					) : activeTab == 'B' ? (
						<div className={` ${activeTab == 'B' || name == 'warning' ? 'show' : 'hide'}`}>
							<FileAlerts />
						</div>
					) : activeTab == 'C' || name == 'warning' ? (
						<div className={` ${activeTab == 'C' ? 'show' : 'hide'}`}>
							<FileReports />
						</div>
					) : activeTab == 'D' ? (
						<div className={` ${activeTab == 'D' ? 'show' : 'hide'}`}>
							<FileCases />
						</div>
					) : activeTab == 'E' || name == 'session' ? (
						<div className={` ${activeTab == 'E' || name == 'session' ? 'show' : 'hide'}`}>
							<FileSession />
						</div>
					) : activeTab == 'F' ? (
						<div className={` ${activeTab == 'F' ? 'show' : 'hide'}`}>
							<FileCosts />
						</div>
					) : activeTab == 'G' ? (
						<div className={` ${activeTab == 'G' ? 'show' : 'hide'}`}>
							<FileConsulting />
						</div>
					) : activeTab == 'H' ? (
						<div className={` ${activeTab == 'H' ? 'show' : 'hide'}`}>
							<FileFinance />
						</div>
					) : activeTab == 'I' ? (
						<div className={` ${activeTab == 'I' ? 'show' : 'hide'}`}>
							<FileNotes />
						</div>
					) : activeTab == 'J' || name == 'execute' ? (
						<div className={` ${activeTab == 'J' || name == 'execute' ? 'show' : 'hide'}`}>
							<FileExecution />
						</div>
					) : activeTab == 'K' || name == 'work' ? (
						<div className={` ${activeTab == 'K' || name == 'work' ? 'show' : 'hide'}`}>
							<ManagementWork />
						</div>
					) : null
					// (<div className={` ${activeTab == 'l' ? 'show' : 'hide'}`}>
					// 	{/* <Graph /> */}
					// 	{/* <TheGraph /> */}
					// 	<TheReactFlowGraph />
					// </div>)
				}
			</div>
		</div>
	);
};

export default React.memo(FileDetails);
