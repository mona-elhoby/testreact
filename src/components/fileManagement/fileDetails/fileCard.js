import React from 'react';
import { CCol, CCard, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCardBody } from '@coreui/react';
import { Link } from 'react-router-dom';
import { cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

import translation from '../../../i18n/translate'

export const fileCard = (props) => {
	// console.log("props.file: ", props.file)
	return props.file?.map((data, index) => (
		<CCol lg={3} md={4} sm={6} key={index}>
			<CCard className="mb-4 mt-4 text-center">
				<CCardHeader>
					<Link to={`/file-management/${data.CAS_ID_PK}`}>
						<div>
							<small>{translation('clientName')}</small> <br />
							<h5>{document.body.getAttribute('dir') == 'ltr' && data.CLI_NAME_ENGLISH ? data.CLI_NAME_ENGLISH : data.CLI_NAME}</h5>
						</div>
						<div>
							<small>{translation('fileNum')}</small>
							<br />
							<p>{data.CAS_NUMBER}</p>
						</div>
					</Link>
					<CIcon
						style={{
							height: '16px',
							cursor: 'pointer',
							position: 'absolute',
							top: '3px',
							left: '3px',
							color: 'red',
							boxShadow: '6px 6px 6px rgb(0 0 0 / 5%), -6px -6px 6px rgb(0 0 0 / 5%)',
						}}
						icon={cilX}
						customClassName="nav-icon"
						onClick={()=>props.handleDeleteItem(data.CAS_ID_PK)}
					/>
				</CCardHeader>
				<div className="container-card">
					<div
						className={`front ${
							props.collapseId == data.CAS_ID_PK && props.theClassName !== 'hidden'
								? 'hidden'
								: props.collapseId == data.CAS_ID_PK && props.theClassName == 'hidden'
								? 'visible'
								: 'visible'
						}`}
						onClick={() => props.getStages(data.CAS_ID_PK)}
					>
						<CCardBody>
							<div className="mb-3 pt-2 pb-2">
								<span>{translation('agents')} </span>
								<p>{document.body.getAttribute('dir') == 'ltr' && data.AGENTS_EN ? data.AGENTS_EN : data.AGENTS}</p>
							</div>
							<div className="mb-3 pt-2 pb-2">
								<span>{translation('ants')} </span>
								<p>{document.body.getAttribute('dir') == 'ltr' && data.ANTS_EN ? data.ANTS_EN : data.ANTS}</p>
							</div>
							<div
								className="mb-3 pt-2 pb-2"
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<div style={{ borderLeft: 'none', boxShadow: 'none' }}>
									<span> {translation('fileStatus')} </span>
									<p>{document.body.getAttribute('dir') == 'ltr' && data.FIL_STATUS_NAME_EN ? data.FIL_STATUS_NAME_EN : data.FIL_STATUS_NAME ? data.FIL_STATUS_NAME : translation('notFound')}</p>
								</div>
								<div style={{ borderLeft: 'none', boxShadow: 'none' }}>
									<span>{translation('casType')} </span>
									<p>{document.body.getAttribute('dir') == 'ltr' && data.FIL_TYPE_NAME_EN ? data.FIL_TYPE_NAME_EN : data.FIL_TYPE_NAME ? data.FIL_TYPE_NAME : translation('notFound')}</p>
								</div>
							</div>
							{/* <CIcon style={{height:'20px'}} icon={cilArrowCircleBottom} customClassName="nav-icon" /> */}
						</CCardBody>
					</div>
					<div
						className={`back ${
							props.collapseId == data.CAS_ID_PK && props.theClassName !== 'hidden'
								? 'visible'
								: props.collapseId == data.CAS_ID_PK && props.theClassName == 'hidden'
								? 'hidden'
								: 'hidden'
						} `}
					>
						{/* <CCollapse visible={props.collapseId ==data.CAS_ID_PK ? !visible : false}> */}
						<CTable className="text-center" onClick={() => props.setTheClassName('hidden')}>
							<CTableHead>
								<CTableRow>
									<CTableHeaderCell scope="col">
										<Link to={`/file-management/${data.CAS_NUMBER}`}>#</Link>
									</CTableHeaderCell>
									<CTableHeaderCell scope="col">
										<Link to={`/file-management/${data.CAS_NUMBER}`}>{`${translation('number')} | ${translation('type')}`}</Link>
									</CTableHeaderCell>
									<CTableHeaderCell scope="col">
										<Link to={`/file-management/${data.CAS_NUMBER}`}>{translation('status')}</Link>
									</CTableHeaderCell>
									<CTableHeaderCell scope="col">
										<Link to={`/file-management/${data.CAS_NUMBER}`}>{translation('stage')}</Link>
									</CTableHeaderCell>
								</CTableRow>
							</CTableHead>
							<CTableBody>
								{props.allStages
									? props.allStages?.map((stage, index) => {
											return (
												<CTableRow key={index}>
													<CTableHeaderCell scope="row">{(index += 1)}</CTableHeaderCell>
													<CTableDataCell>
														{stage.STG_NUMBER} | {document.body.getAttribute('dir') == 'ltr' && stage.STG_TYPE_NAME_EN ? stage.STG_TYPE_NAME_EN : stage.STG_TYPE_NAME}
													</CTableDataCell>
													<CTableDataCell>{document.body.getAttribute('dir') == 'ltr' && stage.FIL_STATUS_NAME_EN ? stage.FIL_STATUS_NAME_EN : stage.FIL_STATUS_NAME}</CTableDataCell>
													<CTableDataCell>{document.body.getAttribute('dir') == 'ltr' && stage.STG_KIND_NAME_EN ? stage.STG_KIND_NAME_EN : stage.STG_KIND_NAME}</CTableDataCell>
												</CTableRow>
											);
									  })
									: null}
							</CTableBody>
						</CTable>
						{/* </CCollapse> */}
					</div>
				</div>
			</CCard>
		</CCol>
	));
};
