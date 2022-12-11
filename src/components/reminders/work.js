import React, { useEffect, useState } from 'react';
import { CRow, CCol, CModalTitle, CFormLabel, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow, CCard } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilWindow  } from '@coreui/icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getWorkById, getWorkAttachment, getWorkAttachmentData } from '../../store/reducers/work';
import AttachedHeadTable from '../../features/attachedFileHaed';
import { WorkStatusComponent } from '../fileManagement/works/workFile';

const Work = () => {
	const [attachment, setAttachment] = useState([]);
	const [WRAttr, setWRKAttr] = useState(2);
	const dispatch = useDispatch();
	const { id } = useParams();

	const { selectedWork } = useSelector((state) => state.work);

	useEffect(() => {
		dispatch(getWorkById(id));
		dispatch(getWorkAttachment(id)).then((res) => setAttachment(res.payload));
	}, [dispatch]);

	return (
		<CRow>
			<CCol sm={'12'}>
				<CCard style={{ padding: '20px' }} className="detalById">
					<div>
						<CModalTitle>
							<CIcon style={{ height: '20px' }} icon={cilWindow} customClassName="nav-icon" />
							<span>ملف رقم {selectedWork?.CAS_NUMBER}</span>
						</CModalTitle>
					</div>
					<div>
						<CRow>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">سبب العمل</CFormLabel>
								<p>{selectedWork?.WRK_TYPE_NAME ? selectedWork?.WRK_TYPE_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">أهميه العمل</CFormLabel>
								<p>{selectedWork?.WRK_DEGREE ? selectedWork?.WRK_DEGREE : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> القسم المكلف</CFormLabel>
								<p>{selectedWork?.DEP_NAME ? selectedWork?.DEP_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> إرتباط العمل</CFormLabel>
								<p>{selectedWork?.WRK_FLAG ? selectedWork?.WRK_FLAG : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">المكلفين</CFormLabel>
								<p>{selectedWork?.EMP_NAME ? selectedWork?.EMP_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								{/* {console.log(cliName)} */}
								<CFormLabel htmlFor="inputEmail4"> إسم العميل</CFormLabel>
								<p>{selectedWork?.CLI_NAME ? selectedWork?.CLI_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> إسم المحكمه</CFormLabel>
								<p>{selectedWork?.COU_NAME ? selectedWork?.COU_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">رقم الملف</CFormLabel>
								<p>{selectedWork?.CAS_NUMBER ? selectedWork?.CAS_NUMBER : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">أخر موعد للتنفيذ</CFormLabel>
								<p>{selectedWork?.WRK_DATE_LAST ? new Date(selectedWork?.WRK_DATE_LAST).toLocaleDateString() : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								{selectedWork?.INR_NUMBER ? (
									<>
										<CFormLabel htmlFor="inputEmail4">رقم البلاغ</CFormLabel>
										<p>{selectedWork?.INR_NUMBER}</p>
									</>
								) : null}
								{selectedWork?.CHQ_NUMBER ? (
									<>
										<CFormLabel htmlFor="inputEmail4">رقم الشيك</CFormLabel>
										<p>{selectedWork?.CHQ_NUMBER}</p>
									</>
								) : null}
								{selectedWork?.EXE_PROCEDURE_NAME ? (
									<>
										<CFormLabel htmlFor="inputEmail4">الإجراء</CFormLabel>
										<p>{selectedWork?.EXE_PROCEDURE_NAME}</p>
									</>
								) : null}
								{selectedWork?.WRN_NUMBER ? (
									<>
										<CFormLabel htmlFor="inputEmail4">رقم الإنذار</CFormLabel>
										<p>{selectedWork?.WRN_NUMBER}</p>
									</>
								) : null}
								{selectedWork?.STG_NUMBER ? (
									<>
										<CFormLabel htmlFor="inputEmail4">رقم القضيه</CFormLabel>
										<p>{selectedWork?.STG_NUMBER}</p>
									</>
								) : null}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">المنشأ</CFormLabel>
								<p>{selectedWork?.USR_NAME ? selectedWork?.USR_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								{WRAttr == 8 ? (
									<>
										<CFormLabel htmlFor="inputEmail4">تاريخ الجلسه</CFormLabel>
										<p>{selectedWork?.SES_DATE ? selectedWork?.SES_DATE : 'لا يوجد'}</p>
									</>
								) : null}
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">تاريخ الإنشاء</CFormLabel>
								<p>{selectedWork?.CREATE_DATE ? new Date(selectedWork?.CREATE_DATE).toLocaleDateString() : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">المطلوب</CFormLabel>
								<p>{selectedWork?.WRK_TYPE_NAME ? selectedWork?.WRK_TYPE_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> الملاحظات</CFormLabel>
								<p>{selectedWork?.WRK_NOTES ? selectedWork?.WRK_NOTES : 'لا يوجد'}</p>
							</CCol>

							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> المرفقات</CFormLabel>
								{selectedWork?._FILE > 0 ? (
									<CTable bordered>
										<AttachedHeadTable />
										<CTableBody>
											{attachment?.map((ele, i) => (
												<CTableRow
													key={i}
													onClick={() => {
														dispatch(
															getWorkAttachmentData({
																id: selectedWork?.WRK_ID_PK,
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
							<CCol md={12}>
								{selectedWork?.details.map((st, i) => (
									<WorkStatusComponent key={i} statusId={st?.STATUS_ID} statusDate={st?.STATUS_DATE} statusReason={st?.WRK_REASON_NAME} />
								))}
							</CCol>
						</CRow>
					</div>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Work;
