//https://www.ag-grid.com/react-data-grid/column-sizing/
//https://www.ag-grid.com/react-data-grid/global-style-customisation-compactness/

// https://rsuitejs.com/en/components/table/   ==>>
//https://www.ag-grid.com/react-data-grid/printing/

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { CRow } from '@coreui/react';

import StgReport from '../components/reports/stages';
import Sessions from '../components/reports/sessions';
import Files from '../components/reports/files';
import Warning from '../components/reports/warnings';
import Informings from '../components/reports/informings';
import Notes from '../components/reports/notes';
import Execute from '../components/reports/execute';
import Consultation from '../components/reports/consultaion';
import Costs from "../components/reports/costs"
// import '../rsuite.css';
import "../components/reports/reports.css"

const App = () => {
	const { name } = useParams();
	
	return (
		<div className="reports">
			<CRow>
				{name == 'cases' ? (
					<StgReport />
				) : name == 'sessions' ? (
					<Sessions />
				) : name == 'files' ? (
					<Files />
				) : name == 'warning' ? (
					<Warning />
				) : name == 'notes' ? (
					<Notes />
				) : name == 'execute' ? (
					<Execute />
				) : name == 'informs' ? (
					<Informings />
				) : name == 'consultation' ? (
					<Consultation />
				) : name == 'costs' ? (
					<Costs />
				) :null}
			</CRow>
		</div>
	);
};

export default React.memo(App);
