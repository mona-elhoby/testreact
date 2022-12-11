
import React from 'react';
import { useParams } from 'react-router-dom';
import { CRow } from '@coreui/react';

import AccountBarChart from '../components/barChart/account';
import FileBarChart from "../components/barChart/file"
import SessionBarChart from "../components/barChart/session"
import StageBarChart from "../components/barChart/stage"
import WorkBarChart from "../components/barChart/work"
import "../components/barChart/barChart.css"


const App = () => {
	const { name } = useParams();
    
	return (
		<div className="">
			<CRow>
				{name == 'account' ? (
					<AccountBarChart />
				) : name == 'file' ? (
					<FileBarChart />
				) : name == 'session' ? (
					<SessionBarChart />
				) : name == 'stage' ? (
					<StageBarChart />
				) : name == 'work' ? (
					<WorkBarChart />
				): null}
			</CRow>
		</div>
	);
};

export default React.memo(App);
