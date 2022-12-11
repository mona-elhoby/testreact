
import {
	CCol,
	CButton,
	CTable,
	CTableHead,
	CTableRow,
	CTableHeaderCell,
	CTableBody,
	CTableDataCell,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilPencil, } from '@coreui/icons';

import translation from '../../../i18n/translate'

export const dataStage = ({data,getCaseById,editCase, deleteTheStage}) =>
data?.map((ele, k) => {
    return (
        <CCol md={12} key={k}>
            <div className="data-wrapper" key={k}>
                <div className="data">
                    <div className="date text-center" onClick={() => getCaseById(ele.STG_ID_PK)}>
                        {ele.STG_NUMBER}
                    </div>
                    <div className="table-div">
                        <CTable className="text-center bordered" responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col" onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {' '}
                                        {ele?.PARENT_NAME ? translation('basicCase') : translation('issueOfLiaison')}
                                    </CTableHeaderCell>
                                    {/* <CTableHeaderCell scope="col" onClick={() => getCaseById(ele.STG_ID_PK)}> رقم القضيه</CTableHeaderCell> */}
                                    <CTableHeaderCell scope="col" onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {translation('case')} {translation('theType')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {translation('office')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {translation('status')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {translation('stage')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {translation('court')}
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" style={{ width: '95px' }}></CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableDataCell>
                                        {ele.PARENT_NAME
                                            ? ele.PARENT_NAME
                                            : ele.linkStages.length > 0
                                            ? ele.linkStages.map((ele, i) => <span key={i}>{ele.STG_NUMBER}, </span>)
                                            : translation('notFound')}
                                    </CTableDataCell>
                                    {/* <CTableDataCell>{ele.STG_NUMBER ? ele.STG_NUMBER : "لا يوجد"}</CTableDataCell> */}
                                    <CTableDataCell onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {document.body.getAttribute('dir') == 'ltr' && ele.STG_TYPE_NAME_EN ? ele.STG_TYPE_NAME_EN : ele.STG_TYPE_NAME ? ele.STG_TYPE_NAME : translation('notFound')}
                                    </CTableDataCell>
                                    <CTableDataCell onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {document.body.getAttribute('dir') == 'ltr' && ele.OFC_NAME_EN ? ele.OFC_NAME_EN : ele.OFC_NAME ? ele.OFC_NAME : translation('notFound')}
                                    </CTableDataCell>
                                    <CTableDataCell onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {document.body.getAttribute('dir') == 'ltr' && ele.STG_STATUS_NAME_EN ? ele.STG_STATUS_NAME_EN : ele.STG_STATUS_NAME ? ele.STG_STATUS_NAME : translation('notFound')}
                                    </CTableDataCell>
                                    <CTableDataCell onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {document.body.getAttribute('dir') == 'ltr' && ele.STG_KIND_NAME_EN ? ele.STG_KIND_NAME_EN : ele.STG_KIND_NAME ? ele.STG_KIND_NAME : translation('notFound')}
                                    </CTableDataCell>
                                    <CTableDataCell onClick={() => getCaseById(ele.STG_ID_PK)}>
                                        {document.body.getAttribute('dir') == 'ltr' && ele.COU_NAME_EN ? ele.COU_NAME_EN : ele.COU_NAME ? ele.COU_NAME : translation('notFound')}
                                    </CTableDataCell>
                                    <CTableDataCell>
                                        <CButton style={{ background: '#1e42a0 !important' }} onClick={() => editCase(ele.STG_ID_PK)}>
                                            <CIcon style={{ height: '12px', marginRight: '-3px' }} icon={cilPencil} customClassName="nav-icon" />
                                        </CButton>
                                        <CButton color={'danger'} onClick={() => deleteTheStage(ele.STG_ID_PK)}>
                                            <CIcon style={{ height: '12px', marginRight: '-3px' }} icon={cilTrash} customClassName="nav-icon" />
                                        </CButton>
                                    </CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </div>
                </div>
            </div>
        </CCol>
    );
});