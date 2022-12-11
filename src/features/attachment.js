import React, { useState } from 'react';
import {
	CModalHeader,
	CModalFooter,
	CModalTitle,
    CFormInput,
	CModalBody,
	CButton,
	CModal,
} from '@coreui/react';
import axios from 'axios';

import translation from '../i18n/translate'
import { api_url } from '../store/config';

const AttachedPopup = props => {
    
	const [attachmentVal, setAttachmentVal] = React.useState('');
    const [attachedFile, setAttachedFile] = useState('')

    const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: JSON.parse(localStorage.getItem('userInfo'))?.accessToken
        },
      };

	const handleAttachmentValue = (e)=> {
		// console.log(e.target.files[0])
        setAttachedFile(e.target.files[0])
		setAttachmentVal(e.target.value)
	}

	const saveAttachment = () => {
        console.log(attachedFile)
        if(attachedFile.size > (1024 * 1024 * 10 * 10)){
            props.setOpenLargeAttachement(true)
        }else{
            const formData = new FormData();
            formData.append(
                "file",
                attachedFile,
              );
              axios.post(`${api_url}/${props.url}`, formData, config).then(res => {
                if(res.status == 200){
                    props.exitSelectModal();
                    props.setOpenAddSnack(true)
                    props.callback()
                }else{
                    props.setOpenAttachedSnack(true)
                }
             })
        }
    }

 return (
    <CModal visible={true} onClose={() => props.exitSelectModal()} className="delete-profile">
        <CModalHeader>
            <CModalTitle>
                {translation('add')}
            </CModalTitle>
        </CModalHeader>
        <CModalBody > 
                {/* <CFormLabel htmlFor="formFile">Default file input example</CFormLabel> */}
                <CFormInput type="file" id="formFile" value={attachmentVal} onChange={handleAttachmentValue}/>
                 </CModalBody>
        <CModalFooter>
            <CButton className="btn-modal-save " color="primary" onClick={saveAttachment}>
            {translation('save')} 
            </CButton>
            <CButton className="btn-modal-close" color="danger" onClick={() => props.exitSelectModal()}>
            {translation('close')} 
            </CButton>
        </CModalFooter>
    </CModal>
);
 }

export default AttachedPopup