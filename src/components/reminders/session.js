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
	CTableRow,
	CCard,
	CTableHead,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLayers } from '@coreui/icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getSessionById, getsessionAttachment, getsessionAttachmentData } from '../../store/reducers/session';
import AttachedHeadTable from '../../features/attachedFileHaed';

const Session = () => {
	const [attachment, setAttachment] = useState([]);
	const dispatch = useDispatch();
	const { id } = useParams();

	const { selectedSession } = useSelector((state) => state.session);

	useEffect(() => {
		dispatch(getSessionById(id));
		dispatch(getsessionAttachment(id)).then((res) => setAttachment(res.payload));
	}, [dispatch]);

	return (
		<CRow>
			<CCol sm={'12'}>
				<CCard style={{ padding: '20px' }} className="detalById">
					<div>
						<CModalTitle>
							<CIcon style={{ height: '20px' }} icon={cilLayers} customClassName="nav-icon" />
								<span>القضيه رقم {selectedSession?.STG_NUMBER}</span>
						</CModalTitle>
					</div>
					<div>
						<CRow>
							<CCol md={8}>
								{/* {console.log(editItem)} */}
								<CFormLabel htmlFor="inputEmail4">تاريخ الجلسه</CFormLabel>
								<CRow className="sesTime">
									<CCol md={6}>
										<p>
											{selectedSession?.SES_DATE
												? new Intl.DateTimeFormat('en-US').format(new Date(selectedSession?.SES_DATE))
												: 'لا يوجد'}
										</p>
									</CCol>

									<CCol md={6}>
										<p>{selectedSession?.SES_TIME}</p>
									</CCol>
								</CRow>
							</CCol>
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4">القضيه </CFormLabel>
								<p>{selectedSession?.FULL_STAGE_NAME ? selectedSession?.FULL_STAGE_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4"> نوع الجلسه </CFormLabel>
								<p>{selectedSession?.SES_TYPE_NAME ? selectedSession?.SES_TYPE_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4"> المكلف بالحضور</CFormLabel>
								<p>{selectedSession?.EMP_NAME ? selectedSession?.EMP_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4"> مكان الجلسه</CFormLabel>
								<p>{selectedSession?.SES_PLACE_NAME ? selectedSession?.SES_PLACE_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4"> رول المحكمه</CFormLabel>
								<p>{selectedSession?.SES_ROLL_NAME ? selectedSession?.SES_ROLL_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4">حضر الجلسه</CFormLabel>
								<p>{selectedSession?.EMP_NAME2 ? selectedSession?.EMP_NAME2 : 'لا يوجد'}</p>
							</CCol>
							<CCol md={4}>
								<CFormLabel htmlFor="inputEmail4"> الرابط</CFormLabel>
								<p>{selectedSession?.SES_LINK ? selectedSession?.SES_LINK : 'لا يوجد'}</p>
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4">ملاحظات</CFormLabel>
								<p>{selectedSession?.SES_NOTES ? selectedSession?.SES_NOTES : 'لا يوجد'}</p>
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4"> المرفقات</CFormLabel>
								{selectedSession?._FILE > 0 ? (
									<CTable bordered>
										<AttachedHeadTable />
										<CTableBody>
											{attachment?.map((ele, i) => (
												<CTableRow
													key={i}
													onClick={() => {
														dispatch(
															getsessionAttachmentData({
																id: selectedSession?.SES_ID_PK,
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
							<hr style={{ margin: '20px auto 30px' }} />

							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">قرار الجلسه</CFormLabel>
								<p>{selectedSession?.SES_DECISION_NAME ? selectedSession?.SES_DECISION_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4">الحكم</CFormLabel>
								<p>{selectedSession?.ADJ_TYPE_NAME ? selectedSession?.ADJ_TYPE_NAME : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> تفاصيل القرار</CFormLabel>
								<p>{selectedSession?.SES_DECISION ? selectedSession?.SES_DECISION : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> تفاصيل الحكم</CFormLabel>
								<p>{selectedSession?.ADJ_DETAILS ? selectedSession?.ADJ_DETAILS : 'لا يوجد'}</p>
							</CCol>
							<CCol md={6}>
								<CFormLabel htmlFor="inputEmail4"> مبلغ الحكم</CFormLabel>
								<p>{selectedSession?.ADJ_AMOUNT ? selectedSession?.ADJ_AMOUNT : 'لا يوجد'}</p>
							</CCol>
							<CCol md={12}>
								<CFormLabel htmlFor="inputEmail4">الطلبات </CFormLabel>
                                {
                                    selectedSession?.requirement?.length>0 ? (<CTable bordered>
                                        <CTableHead className="attachedHeader">
                                            <CTableRow>
                                                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">الطلب</CTableHeaderCell>
                                                <CTableHeaderCell scope="col">الملاحظات</CTableHeaderCell>
                                            </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {selectedSession?.requirement?.map((ele, i) => (
                                                <CTableRow key={i}>
                                                    <CTableHeaderCell scope="row">{i}</CTableHeaderCell>
                                                    <CTableDataCell>{ele?.RTYPE_NAME}</CTableDataCell>
                                                    <CTableDataCell>{ele?.REQ_NOTES}</CTableDataCell>
                                                </CTableRow>
                                            ))}
                                        </CTableBody>
                                    </CTable>): (<p>لا يوجد</p>)
                                }
							</CCol>
							<hr style={{ margin: '20px auto 30px' }} />
							<CRow>
								<CCol md={6}>
									<CFormLabel htmlFor="inputEmail4">تاريخ الجلسه القادمه</CFormLabel>
									<p>
										{selectedSession?.SES_NEXT ? new Date(selectedSession?.SES_NEXT).toLocaleDateString() : 'لا يوجد'}
									</p>
								</CCol>
							</CRow>
						</CRow>
					</div>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Session;
