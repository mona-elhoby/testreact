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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilDiamond } from '@coreui/icons';
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { getAgencyById, getAgencyAttachment, getAgencyAttachmentData } from '../../store/reducers/agency';
import AttachedHeadTable from '../../features/attachedFileHaed';

const Agency = () => {
    const [attachment, setAttachment] = useState([])
    const dispatch =useDispatch()
    const {id} = useParams()

    const {agencyById} = useSelector(state => state.agency)

	useEffect(()=> {
		dispatch(getAgencyById(id))
		dispatch(getAgencyAttachment(id)).then((res) => setAttachment(res.payload));
	}, [dispatch]);


	return (
		<CRow>
            <CCol sm={'12'}>
			<CCard style={{padding: '20px'}} className="detalById">
				<div>
					<CModalTitle>
						<CIcon style={{ height: '20px' }} icon={cilDiamond} customClassName="nav-icon" />
						الوكاله رقم {agencyById?.AGE_NUMBER}
					</CModalTitle>
				</div>
				<div>
					<CRow>
						<CCol md={6}>
							<CFormLabel htmlFor="inputEmail4">الموكلون</CFormLabel>
							<p>{agencyById?.clients.length>0 ? agencyById?.clients.reduce((acc, curr) => curr.CLI_NAME + ' , ' + acc, '') : 'لا يوجد'}</p>
						</CCol>
						<CCol md={6}>
							<CFormLabel htmlFor="inputEmail4">المكان</CFormLabel>
							<p>{agencyById?.AGE_PLACE_NAME ? agencyById?.AGE_PLACE_NAME : 'لا يوجد'}</p>
						</CCol>
						<CCol md={6}>
							<CFormLabel htmlFor="inputEmail4">صفه الموكلين</CFormLabel>
							<p>{agencyById?.AGE_ATTRBUIT_NAME ? agencyById?.AGE_ATTRBUIT_NAME : 'لا يوجد'}</p>
						</CCol>
						<CCol md={6}>
							<CFormLabel htmlFor="inputEmail4"> الفرع</CFormLabel>
							<p>{agencyById?.DEP_NAME ? agencyById?.DEP_NAME : 'لا يوجد'}</p>
						</CCol>
						<CCol md={6}>
							<CFormLabel htmlFor="inputEmail4"> نوع الوكاله</CFormLabel>
							<p>{agencyById?.AGE_TYPE_NAME ? agencyById?.AGE_TYPE_NAME : 'لا يوجد'}</p>
						</CCol>
						<CCol md={6}>
							<CFormLabel htmlFor="inputEmail4"> تاريخ الطباعه</CFormLabel>
							<p>
								{agencyById?.AGE_PRINT_DATE
									? new Intl.DateTimeFormat('en-US').format(new Date(agencyById?.AGE_PRINT_DATE))
									: 'لا يوجد'}
							</p>
						</CCol>
						<CCol md={6}>
							<CFormLabel htmlFor="inputEmail4"> تاريخ البدايه</CFormLabel>
							<p>{agencyById?.AGE_START_DATE ? new Date(agencyById?.AGE_START_DATE).toISOString().split('T')[0] : 'لا يوجد'}</p>
						</CCol>
						<CCol md={6}>
							<CFormLabel htmlFor="inputEmail4"> تاريخ النهايه</CFormLabel>
							<p>
								{agencyById?.AGE_END_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(agencyById?.AGE_END_DATE)) : 'لا يوجد'}
							</p>
						</CCol>
						<CCol md={6}>
							<CFormLabel htmlFor="inputEmail4"> رقم التصديق</CFormLabel>
							<p>{agencyById?.AGE_NUMBER ? agencyById?.AGE_NUMBER : 'لا يوجد'}</p>
						</CCol>
						<CCol md={6}>
							<CFormLabel htmlFor="inputEmail4"> الباركود</CFormLabel>
							<p>{agencyById?.AGE_CODE ? agencyById?.AGE_CODE : 'لا يوجد'}</p>
						</CCol>
						<CCol md={12}>
							<CFormLabel htmlFor="inputEmail4"> الملاحظات</CFormLabel>
							<p>{agencyById?.AGE_NOTES ? agencyById?.AGE_NOTES : 'لا يوجد'}</p>
						</CCol>
						<CCol md={12}>
							<CFormLabel htmlFor="inputEmail4"> المرفقات</CFormLabel>
							{agencyById?._FILE > 0 ? (
								<CTable bordered>
									<AttachedHeadTable />
									<CTableBody>
										{attachment?.map((ele, i) => (
											<CTableRow
												key={i}
												onClick={() => {
													dispatch(
														getAgencyAttachmentData({
															id: agencyById?.AGE_ID_PK,
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
