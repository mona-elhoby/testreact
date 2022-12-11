import React from 'react';
import {
	CCol,
	CRow,
	CFormLabel,
	CFormInput,
	CFormTextarea,
	CCardTitle,
	CCardBody,
	CCardHeader,
	CCard,
	CButton,
	CTable,
	CTableBody,
	CTableHeaderCell,
	CTableRow,
	CTableHead,
	CTableDataCell,
} from '@coreui/react';
import { cilTrash, cilPencil, cilPlus } from '@coreui/icons';
import { useSelector, useDispatch } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import CIcon from '@coreui/icons-react';

import { getexecuteAttachmentData } from '../../../store/reducers/execute';
import translation from '../../../i18n/translate';

export const ResultExecute = (props) => {
	const { theExecuteResultsCompo } = useSelector((state) => state.executeConstraint);
	return (
		<div className="sesRequirementDiv" id={props.id}>
			<CRow>
				<CCol md={4}>
					<CFormLabel style={{ cursor: 'pointer' }} onClick={props.onClickAdd}>
						{translation('result')}
					</CFormLabel>
					<FormControl fullWidth onClick={props.handelExecuteStatus}>
						<Autocomplete
							id="free-solo-demo"
							freeSolo
							value={props.value1}
							onChange={props.onChange1}
							options={theExecuteResultsCompo.map((option) => document.body.getAttribute('dir') == 'ltr' && option.EXE_RESULT_NAME_EN ? option.EXE_RESULT_NAME_EN : option.EXE_RESULT_NAME)}
							renderInput={(params) => <TextField {...params} />}
							name={props.name1}
							ref={props.ref0}
							getOptionLabel={(option) => option}
							renderOption={(props, option) => {
							  return (
								<li {...props} key={option+Math.random()}>
								  {option}
								</li>
							  );
							}}
						/>
					</FormControl>
				</CCol>
				<CCol md={4}>
					<CFormLabel htmlFor="inputEmail4">{translation('theDate')}</CFormLabel>
					<CFormInput type="date" defaultValue={props.value2} onChange={props.onChange2} name={props.name2} />
				</CCol>
				<CCol md={4}>
					<CFormLabel htmlFor="inputEmail4"> {translation('notes')}</CFormLabel>
					<CFormTextarea
						id="exampleFormControlTextarea1"
						rows="4"
						defaultValue={props.value3}
						onChange={props.onChange3}
						name={props.name3}
						style={{ width: 'calc(100% - 30px) !important' }}
					></CFormTextarea>
					<CIcon
						style={{
							height: '18px',
							color: '#ff3547',
							margin: '-25px 2px auto auto',
							cursor: 'pointer',
						}}
						icon={props.icon}
						customClassName="nav-icon"
						onClick={props.onClick}
					/>
				</CCol>
			</CRow>
		</div>
	);
};

export const executeCard = ({
	showResultExecute,
	selectedCriteria,
	showDiscription,
	showAttachments,
	setConstantAdd,
	attachment,
	editExecut,
	delExecute,
	checked1,
	checked2,
	checked3,
	data,
	setOpenAttachedSnack,
	dispatch
}) => {
	return data?.map((ele, i) => (
		<CCol md={6} key={Math.random() + i}>
			<div className="execute-card">
				<CCard>
					<CCardHeader component="h5">
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<div>
								<strong>{translation('proceding')}: {ele.EXE_PROCEDURE_NAME}</strong>
								{/* <small>{ele.CAS_NUMBER}</small> */}
							</div>
							<div>
								<CButton style={{ background: '#1e42a0 !important' }}>
									<CIcon onClick={() => editExecut(ele.EXE_ID_PK)} style={{ height: '16px' }} icon={cilPencil} customClassName="nav-icon" />
								</CButton>
								<CButton color={'danger'} onClick={() => delExecute(ele.EXE_ID_PK)}>
									<CIcon style={{ height: '16px' }} icon={cilTrash} customClassName="nav-icon" />
								</CButton>
							</div>
						</div>
					</CCardHeader>
					<CCardBody>
						<div>
							<CCardTitle> {translation('case')}: {ele.CAS_NUMBER}</CCardTitle>
							<CTable responsive>
								<CTableHead>
									<CTableRow>
										<CTableHeaderCell scope="col">#</CTableHeaderCell>
										<CTableHeaderCell scope="col">Class</CTableHeaderCell>
										<CTableHeaderCell scope="col">Heading</CTableHeaderCell>
										<CTableHeaderCell scope="col">Heading</CTableHeaderCell>
										<CTableHeaderCell scope="col">Heading</CTableHeaderCell>
									</CTableRow>
								</CTableHead>
								<CTableBody>
									<CTableRow>
										<CTableDataCell>
											<strong>{translation('executeDate')}</strong>
											<span>{ele.EXE_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele.EXE_DATE)) : null}</span>
										</CTableDataCell>
										<CTableDataCell>
											<strong>{translation('executeType')}</strong>
											<span>{ele.EXE_TYPE_NAME}</span>
										</CTableDataCell>
										<CTableDataCell>
											<strong>{translation('period')}</strong>
											<span>{ele.EXE_DURATION}</span>
										</CTableDataCell>
										<CTableDataCell>
											<strong>{translation('status')}</strong>
											<span>{ele.EXE_STATUS_NAME}</span>
										</CTableDataCell>
										<CTableDataCell>
											<strong>{translation('theEmployees')}</strong>
											<span>{ele.EMP_NAME}</span>
										</CTableDataCell>
									</CTableRow>
								</CTableBody>
							</CTable>

							<CButton className="execute-flipflop" onClick={() => showResultExecute(ele.EXE_ID_PK)}>
								{translation('executeResults')}
							</CButton>
							<CButton className="execute-flipflop" onClick={() => showAttachments(ele.EXE_ID_PK)}>
								{translation('attachments')}
							</CButton>
							<CButton className="execute-flipflop" onClick={() => showDiscription(ele.EXE_ID_PK)}>
								{translation('description')}
							</CButton>
						</div>
						<Collapse in={checked1 == ele.EXE_ID_PK}>
							{ele.results?.length > 0 ? (
								<CTable responsive>
									<CTableBody>
										{ele.results?.map((res, k) => (
											<CTableRow key={Math.random() + k}>
												<CTableDataCell>
													<strong> {translation('result')}</strong>
													<span>{res.EXE_RESULT_NAME}</span>
												</CTableDataCell>
												<CTableDataCell>
													<strong> {translation('theDate')}</strong>
													<span>{new Date(res.RESULT_DATE).toLocaleString()}</span>
												</CTableDataCell>
												<CTableDataCell>
													<strong> {translation('notes')}</strong>
													<span>{res.RESULT_NOTE}</span>
												</CTableDataCell>
											</CTableRow>
										))}
									</CTableBody>
								</CTable>
							) : (
								<p>{translation('notFound')}</p>
							)}
						</Collapse>
						<Collapse in={checked2 == ele.EXE_ID_PK}>
						{/* <CButton onClick={() => setConstantAdd(5)} className="add">
						<CIcon style={{ height: '25px' }} className="icon" customClassName="nav-icon" icon={cilPlus} />
					</CButton> */}
							{ele?._FILE > 0 ? (
								<CTable bordered>
									<attachedHeadTable />
									<CTableBody>
										{attachment?.map((ele1, i) => (
											<CTableRow
												key={i}
												onClick={() => {
													dispatch(
														getexecuteAttachmentData({
															id: selectedCriteria?.AGE_ID_PK,
															attachedId: ele1?.ATH_ID_PK,
															fileName: ele1?.ATH_NAME,
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
												<CTableDataCell>{ele1?.ATH_NAME}</CTableDataCell>
												<CTableDataCell>{ele1?.TYP_NAME}</CTableDataCell>
												<CTableDataCell>{ele1?.ATH_SIZE}</CTableDataCell>
												<CTableDataCell>{new Date(ele1?.ATH_DATE).toLocaleDateString()}</CTableDataCell>
												<CTableDataCell>{ele1?.USR_NAME}</CTableDataCell>
											</CTableRow>
										))}
									</CTableBody>
								</CTable>
							) : (
								<p>{translation('notFound')}</p>
							)}
						</Collapse>
						<Collapse in={checked3 == ele.EXE_ID_PK}>
							<p className="data-show" dangerouslySetInnerHTML={{ __html: ele?.EXE_DESCRIPTION }} />
						</Collapse>
					</CCardBody>
				</CCard>
			</div>
		</CCol>
	));
};
