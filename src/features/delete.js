import React from 'react';
import {
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter,
	CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

import translation from '../i18n/translate'

const DeletePopup = props => (
    <CModal visible={true} onClose={() => props.exitSelectModal()} className="delete-profile">
        <CModalHeader>
            <CModalTitle>
                <CIcon style={{ height: '20px' }} icon={cilTrash} customClassName="nav-icon" />
            </CModalTitle>
        </CModalHeader>
        <CModalBody > {translation('confirmMsg')} </CModalBody>
        <CModalFooter>
            <CButton className="btn-modal-save " color="primary" onClick={props.handleDelete}>
            {translation('yes')} 
            </CButton>
            <CButton className="btn-modal-close" color="danger" onClick={() => props.exitSelectModal()}>
            {translation('no')} 
            </CButton>
        </CModalFooter>
    </CModal>
);

export default DeletePopup