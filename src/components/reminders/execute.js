import React, { useEffect, useState } from 'react';
import {
	CRow,
	CCol,
	CModalTitle,
	CFormLabel,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHeaderCell,
	CCard,
	CTableHead,
	CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilInstitution } from '@coreui/icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getExecuteById, getexecuteAttachment, getexecuteAttachmentData } from '../../store/reducers/execute';
import AttachedHeadTable from '../../features/attachedFileHaed';

const Execute = () => {
	const [attachment, setAttachment] = useState([]);
	const [activeTab, setActiveTab] = useState('div1');
	const dispatch = useDispatch();
	const { id } = useParams();

	const { selectedExecute } = useSelector((state) => state.execute);

	useEffect(() => {
		dispatch(getExecuteById(id));
		dispatch(getexecuteAttachment(id)).then((res) => setAttachment(res.payload));
	}, [dispatch]);

	return (
		<CRow>
			<CCol sm={'12'}>
				<CCard style={{ padding: '20px' }} className="detalById">
					<div>
						<CModalTitle>
							<CIcon style={{ height: '20px' }} icon={cilInstitution} customClassName="nav-icon" />
							إجراء رقم {}
						</CModalTitle>
					</div>
					<div>
						<div className="">
							<div className="executeRelativeDiv">
								<div className={`absDiv ${activeTab == 'div1' ? 'active' : null}`}>
									<CRow>
										<CCol md={6}>
											<CFormLabel htmlFor="inputEmail4">الإجراء</CFormLabel>
											<p>{selectedExecute?.SUBJECTS}</p>
										</CCol>
										<CCol md={6}>
											<CFormLabel htmlFor="inputEmail4">تاريخ الإجراء</CFormLabel>
											<p>{selectedExecute?.EXE_DATE ? new Date(selectedExecute?.EXE_DATE).toISOString().split('T')[0] : 'لا يوجد'}</p>
										</CCol>
										<CCol md={6}>
											<CFormLabel htmlFor="inputEmail4">رقم القضيه</CFormLabel>
											<p>{selectedExecute?.CAS_NUMBER}</p>
										</CCol>
										<CCol md={6}>
											<CFormLabel htmlFor="inputEmail4"> نوع الإجراء</CFormLabel>
											<p>{selectedExecute?.EXE_TYPE_NAME ? selectedExecute?.EXE_TYPE_NAME : 'لا يوجد'}</p>
										</CCol>
										<CCol md={6}>
											<CFormLabel htmlFor="inputEmail4">الحاله</CFormLabel>
											<p>{selectedExecute?.EXE_STATUS_NAME ? selectedExecute?.EXE_STATUS_NAME : 'لا يوجد'}</p>
										</CCol>
										<CCol md={6}>
											<CFormLabel htmlFor="inputEmail4"> مده الإجراء</CFormLabel>
											<p>{selectedExecute?.EXE_DURATION ? selectedExecute?.EXE_DURATION : 'لا يوجد'}</p>
										</CCol>
										<CCol md={6}>
											<CFormLabel htmlFor="inputEmail4"> المكلفين</CFormLabel>
											<p>{selectedExecute?.employees ? selectedExecute?.employees.map((ele) => ele?.EMP_NAME) : 'لا يوجد'}</p>
										</CCol>
										<CCol md={6}>
											<CFormLabel htmlFor="inputEmail4"> الملاحظات</CFormLabel>
											<p>{selectedExecute?.EXE_NOTES ? selectedExecute?.EXE_NOTES : 'لا يوجد'}</p>
										</CCol>
										<CCol sm={12}>
											<CFormLabel htmlFor="inputEmail4"> النتائج</CFormLabel>
											<CTable bordered>
												<CTableHead className="attachedHeader">
													<CTableRow>
														<CTableHeaderCell scope="col">#</CTableHeaderCell>
														<CTableHeaderCell scope="col">النتيجه</CTableHeaderCell>
														<CTableHeaderCell scope="col">التاريخ</CTableHeaderCell>
														<CTableHeaderCell scope="col">الملاحظات</CTableHeaderCell>
													</CTableRow>
												</CTableHead>
												<CTableBody>
													{selectedExecute?.results?.map((ele, i) => (
														<CTableRow key={i}>
															<CTableHeaderCell scope="row">{i}</CTableHeaderCell>
															<CTableDataCell>{ele?.EXE_RESULT_NAME}</CTableDataCell>
															<CTableDataCell>{new Date(ele?.RESULT_DATE).toLocaleDateString()}</CTableDataCell>
															<CTableDataCell>{ele?.RESULT_NOTE}</CTableDataCell>
														</CTableRow>
													))}
												</CTableBody>
											</CTable>
										</CCol>
									</CRow>
								</div>
								<div>
									<CFormLabel htmlFor="inputEmail4"> الوصف</CFormLabel>
									<p
										dangerouslySetInnerHTML={{ __html: selectedExecute?.EXE_DESCRIPTION }}
										style={{ minHeight: '100px', width: 'calc(100% - 20px)' }}
									/>
								</div>
								<div>
									<CFormLabel htmlFor="inputEmail4"> المرفقات</CFormLabel>
									{selectedExecute?._FILE > 0 ? (
										<CTable bordered>
											<AttachedHeadTable />
											<CTableBody>
												{attachment?.map((ele, i) => (
													<CTableRow
														key={i}
														onClick={() => {
															dispatch(
																getexecuteAttachmentData({
																	id: selectedExecute?.AGE_ID_PK,
																	attachedId: ele?.ATH_ID_PK,
																	fileName: ele?.ATH_NAME,
																})
															).then((res) => {
																if (res?.payload.status == 404) {
																	// console.log(res);
																	// setOpenAttachedSnack(true);
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
													</CTableRow>
												))}
											</CTableBody>
										</CTable>
									) : (
										<p>لا يوجد</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Execute;
