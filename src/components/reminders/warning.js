import React, { useEffect, useState } from 'react';
import { CRow, CCol, CModalTitle, CFormLabel, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow, CCard } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWarning } from '@coreui/icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getWarningById, getwarningAttachment, getwarningAttachmentData } from '../../store/reducers/warnings';
import AttachedHeadTable from '../../features/attachedFileHaed';

const Agency = () => {
	const [attachment, setAttachment] = useState([]);
	const dispatch = useDispatch();
	const { id } = useParams();

	const { selectedWarning } = useSelector((state) => state.warning);

	useEffect(() => {
		dispatch(getWarningById(id));
		dispatch(getwarningAttachment(id)).then((res) => setAttachment(res.payload));
	}, [dispatch]);

	return (
		<CRow>
			<CCol sm={'12'}>
				<CCard style={{ padding: '20px' }} className="detalById">
					<div>
						<CModalTitle>
							<CIcon style={{ height: '20px' }} icon={cilWarning} customClassName="nav-icon" />
							رقم الملف:  {selectedWarning?.CAS_NUMBER} 
						</CModalTitle>
					</div>
					<div>
						<CRow>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">رقم الاإنذار</CFormLabel>
									<p>{selectedWarning?.WRN_NUMBER ? selectedWarning?.WRN_NUMBER : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> المده</CFormLabel>
									<p>{selectedWarning?.WRN_DURATION ? selectedWarning?.WRN_DURATION : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">تاريخ التسجيل</CFormLabel>
									<p>{selectedWarning?.WRN_DATE ? new Date(selectedWarning?.WRN_DATE).toLocaleDateString() : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> تاريخ الإعلان</CFormLabel>
									<p>{selectedWarning?.WRN_ADV_DATE ? new Date(selectedWarning?.WRN_ADV_DATE).toLocaleDateString() : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> الحاله</CFormLabel>
									<p>{selectedWarning?.WRN_STATUS_NAME ? selectedWarning?.WRN_STATUS_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> الطريقه</CFormLabel>
									<p>{selectedWarning?.WRN_METHOD_NAME ? selectedWarning?.WRN_METHOD_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> المتابع</CFormLabel>
									<p>{selectedWarning?.EMP_NAME ? selectedWarning?.EMP_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> الموكلون</CFormLabel>
									<p>{selectedWarning?.AGENTS ? selectedWarning?.AGENTS : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> الخصوم</CFormLabel>
									<p>{selectedWarning?.ANTS ? selectedWarning?.ANTS : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> الموضوع</CFormLabel>
									<p>{selectedWarning?.WRN_SUBJECT_NAME ? selectedWarning?.WRN_SUBJECT_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> النتيجه</CFormLabel>
									<p>{selectedWarning?.WRN_RESULT_NAME ? selectedWarning?.WRN_RESULT_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> الملاحظات</CFormLabel>
									<p>{selectedWarning?.WRN_NOTES ? selectedWarning?.WRN_NOTES : 'لا يوجد'}</p>
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> المرفقات</CFormLabel>
								{selectedWarning?._FILE > 0 ? (
										<CTable bordered>
											<AttachedHeadTable />
											<CTableBody>
												{attachment?.map((ele, i) => (
													<CTableRow
														key={i}
														onClick={() => {
															dispatch(
																getwarningAttachmentData({
																	id: selectedWarning?.WRN_ID_PK,
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
							</CCol>
						</CRow>
					</div>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Agency;
