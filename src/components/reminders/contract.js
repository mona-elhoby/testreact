import React, { useEffect, useState } from 'react';
import {
	CRow,
	CCol,
	CModalTitle,
	CFormLabel,
	CTable,
	CTableBody,
	CTableHeaderCell,
	CTableRow,
	CCard,
	CModalHeader,
	CModalBody,
	CTableHead,
	CTableDataCell,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilNotes } from '@coreui/icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getContractById, getcontractAttachment, getcontractAttachmentData } from '../../store/reducers/contract';
import AttachedHeadTable from '../../features/attachedFileHaed';

const Contract = () => {
	const [attachment, setAttachment] = useState([]);
	const [divActive, setDivActive] = useState('info');
	const dispatch = useDispatch();
	const { id } = useParams();

	const { contractById } = useSelector((state) => state.contract);

	useEffect(() => {
		dispatch(getContractById(id));
		dispatch(getcontractAttachment(id)).then((res) => setAttachment(res.payload));
	}, [dispatch]);

	return (
		<CRow>
			<CCol sm={'12'}>
				<CCard style={{ padding: '20px' }} className="detalById">
					<div>
						<CModalTitle>
							<CIcon style={{ height: '20px' }} icon={cilNotes} customClassName="nav-icon" /> <span> العقد رقم {contractById?.COR_NUMBER}</span>
						</CModalTitle>
					</div>
					<CModalBody>
						<div className="contract-tabs">
							<h6 className={divActive == 'info' ? 'activeTabs' : null} onClick={() => setDivActive('info')}>
								بيانات العقد
							</h6>
							<h6 className={divActive == 'payments' ? 'activeTabs' : null} onClick={() => setDivActive('payments')}>
								دفعات العقد
							</h6>
						</div>
						<div className="containerDivTabs">
							<div className={`info ${divActive == 'info' ? 'active' : null}`}>
								<CRow>
									<CCol md={6}>
										<CFormLabel htmlFor="inputEmail4">العميل</CFormLabel>
										<p>{contractById?.CLI_NAME ? contractById?.CLI_NAME : 'لا يوجد'}</p>
									</CCol>
									<CCol md={6}>
										<CFormLabel htmlFor="inputEmail4"> النوع</CFormLabel>
										<p>{contractById?.COR_KIND_NAME ? contractById?.COR_KIND_NAME : 'لا يوجد'}</p>
									</CCol>
									<CCol md={6}>
										<CFormLabel htmlFor="inputEmail4">رقم الإتفاقيه</CFormLabel>
										<p>{contractById?.COR_NUMBER ? contractById?.COR_NUMBER : 'لا يوجد'}</p>
									</CCol>
									<CCol md={6}>
										<CFormLabel htmlFor="inputEmail4">تاريخ الإتفاقيه</CFormLabel>
										<p>{contractById?.COR_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(contractById?.COR_DATE)) : 'لا يوجد'}</p>
									</CCol>
									<CCol md={6}>
										<CFormLabel htmlFor="inputEmail4">قيمه الإتفاقيه</CFormLabel>
										<p>{contractById?.COR_AMOUNT ? contractById?.COR_AMOUNT : 'لا يوجد'}</p>
									</CCol>
									<CCol md={6}>
										<CFormLabel htmlFor="inputEmail4"> مده الإتفاقيه</CFormLabel>
										<p>{contractById?.COR_DURATION_NAME ? contractById?.COR_DURATION_NAME : 'لا يوجد'}</p>
									</CCol>
									<CCol md={6}>
										<CFormLabel htmlFor="inputEmail4"> يبدأ من</CFormLabel>
										<p>
											{contractById?.COR_FROM_DATE
												? new Intl.DateTimeFormat('en-US').format(new Date(contractById?.COR_FROM_DATE))
												: 'لا يوجد'}
										</p>
									</CCol>
									<CCol md={6}>
										<CFormLabel htmlFor="inputEmail4"> ينتهي في</CFormLabel>
										<p>
											{contractById?.COR_TO_DATE
												? new Intl.DateTimeFormat('en-US').format(new Date(contractById?.COR_TO_DATE))
												: 'لا يوجد'}
										</p>
									</CCol>
									<CCol md={12}>
										<CFormLabel htmlFor="inputEmail4"> المرفقات</CFormLabel>
										{contractById?._FILE > 0 ? (
											<CTable bordered>
												<AttachedHeadTable />
												<CTableBody>
													{attachment?.map((ele, i) => (
														<CTableRow
															key={i}
															onClick={() => {
																dispatch(
																	getcontractAttachmentData({
																		id: contractById?.COR_ID_PK,
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
										<CFormLabel htmlFor="inputEmail4"> الملاحظات</CFormLabel>
										<p>{contractById?.COR_NOTES ? contractById?.COR_NOTES : 'لا يوجد'}</p>
									</CCol>
								</CRow>
							</div>
							<div className={`payments ${divActive == 'payments' ? 'active' : null}`}>
								<CRow>
									<CCol md={12}>
										<CFormLabel htmlFor="inputEmail4"> تفاصيل الدفعات</CFormLabel>
										<CTable className="text-center">
											<CTableHead>
												<CTableRow>
													<CTableHeaderCell scope="col">#</CTableHeaderCell>
													<CTableHeaderCell scope="col">النوع</CTableHeaderCell>
													<CTableHeaderCell scope="col">رقم السند</CTableHeaderCell>
													<CTableHeaderCell scope="col">المبلغ</CTableHeaderCell>
													<CTableHeaderCell scope="col">نوع الدفعه</CTableHeaderCell>
													<CTableHeaderCell scope="col">حاله الدفعه</CTableHeaderCell>
													<CTableHeaderCell scope="col">رقم الشيك</CTableHeaderCell>
													<CTableHeaderCell scope="col">تاريخ الشيك</CTableHeaderCell>
													<CTableHeaderCell scope="col">البنك</CTableHeaderCell>
												</CTableRow>
											</CTableHead>
											<CTableBody>
												{contractById?.paymentDates.map((payment, index) => {
													return (
														<CTableRow key={index}>
															<CTableHeaderCell scope="row">{(index += 1)}</CTableHeaderCell>
															<CTableDataCell>no</CTableDataCell>
															<CTableDataCell>no</CTableDataCell>
															<CTableDataCell>{payment.PAY_AMOUNT}</CTableDataCell>
															<CTableDataCell>no</CTableDataCell>
															<CTableDataCell>no</CTableDataCell>
															<CTableDataCell>no</CTableDataCell>
															<CTableDataCell>
																{payment.PAY_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(payment.PAY_DATE)) : null}
															</CTableDataCell>
															<CTableDataCell>no</CTableDataCell>
														</CTableRow>
													);
												})}
											</CTableBody>
										</CTable>
									</CCol>
								</CRow>
							</div>
						</div>
					</CModalBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default Contract;
