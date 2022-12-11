import React, {useRef} from 'react';
import { CButton, CCol, CRow, CFormLabel, CFormInput } from '@coreui/react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilPencil } from '@coreui/icons';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useIntl } from 'react-intl';

import translation from '../../../i18n/translate';

export const WorkStatusComponent = (props) => {
	<CRow>
		<CCol md={4}>
			<CFormLabel htmlFor="inputEmail4">{translation('status')}</CFormLabel>
			<p>{props?.statusId ? props?.statusId : translation('notFound')}</p>
		</CCol>
		<CCol md={4}>
			<CFormLabel htmlFor="inputEmail4">{translation('theDate')}</CFormLabel>
			<p>{props?.statusDate ? new Date(props?.statusDate).toLocaleDateString() : translation('notFound')}</p>
		</CCol>
		<CCol md={4}>
			<CFormLabel htmlFor="inputEmail4">{translation('reason')}</CFormLabel>
			<p>{props?.statusReason ? props?.statusReason : translation('notFound')}</p>
		</CCol>
	</CRow>;
};

export const WorkAttrCompo = (props) => (
	<>
		<CFormLabel htmlFor="inputEmail4">{props.title}</CFormLabel>
		<FormControl fullWidth>
			<Select inputProps={{ 'aria-label': 'Without label' }} onChange={props.onChange} value={props.value} error={props.error ? true : false}>
				{props.dataArr?.length > 0 ? props.selectBox : null}
			</Select>
			{props.displayError}
		</FormControl>
	</>
);

export const ComponentWorkStatusAdd = (props) =>{ 
	
	return (
	<div className="sesRequirementDiv" id={props.id}>
		<CRow>
			<CCol md={4}>
				<CFormLabel htmlFor="inputEmail4">{translation('status')}</CFormLabel>
				<FormControl fullWidth>
					<Select displayEmpty onChange={props.onChange1} defaultValue={props.value1} name={props.name1}>
						{props.workStatusIdsList.map((ele) => (
							<MenuItem value={ele?.id} key={ele?.id}>
								{ele?.arName}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</CCol>
			<CCol md={4}>
				<CFormLabel htmlFor="inputEmail4">{translation('theDate')}</CFormLabel>
				<CFormInput type="date" id="inputEmail4" onChange={props.onChange2} defaultValue={props.value2} name={props.name2} />
			</CCol>
			<CCol md={4}>
				<CFormLabel style={{ cursor: 'pointer' }} onClick={props.addStatusReason}>
				{translation('reason')}
				</CFormLabel>

				<FormControl fullWidth onClick={props.handelWorkReason} sx={{ minWidth: '90%'}}>
					<Autocomplete
						id="free-solo-demo"
						freeSolo
						value={props.value3}
						onChange={props.onChange3}
						options={props.workReasonConstant.map((option) => document.body.getAttribute('dir') == 'ltr' && option.WRK_REASON_NAME_EN ? option.WRK_REASON_NAME_EN : option.WRK_REASON_NAME)}
						renderInput={(params) => <TextField {...params} />}
						name={props.name3}
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
				<CIcon
					style={{
						height: '18px',
						color: '#ff3547',
						display: 'inline-blok',
						cursor: 'pointer',
					}}
					icon={props.icon}
					customClassName="nav-icon"
					onClick={props.onClick}
				/>
			</CCol>
		</CRow>
	</div>
)};

export const workCard = ({ data, getItem, showEditModal, deleteTheWork }) =>
	data?.map((ele, index) => {
		return {
			id: (index += 1),
			// wanting: ele?.EXE_TYPE_NAME,
			employer: <span onClick={() => getItem(ele?.WRK_ID_PK)}>{document.body.getAttribute('dir') == 'ltr' && ele?.EMP_NAME_ENGLISH ? ele?.EMP_NAME_ENGLISH : ele?.EMP_NAME}</span>,
			// informNum: ele?.SUBJECTS,
			type: <span onClick={() => getItem(ele?.WRK_ID_PK)}>{document.body.getAttribute('dir') == 'ltr' && ele?.WRK_TYPE_NAME_EN ? ele?.WRK_TYPE_NAME_EN : ele?.WRK_TYPE_NAME}</span>,
			lastDate: (
				<span onClick={() => getItem(ele?.WRK_ID_PK)}>
					{ele?.WRK_DATE_LAST ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.WRK_DATE_LAST)) : null}
				</span>
			),
			regDate: (
				<span onClick={() => getItem(ele?.WRK_ID_PK)}>
					{ele?.CREATE_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.CREATE_DATE)) : null}
				</span>
			),
			// court: ele?.FIL_MEDITOR_NAME,
			status: <span onClick={() => getItem(ele?.WRK_ID_PK)}>{document.body.getAttribute('dir') == 'ltr' && ele?.STATUS_NAME_EN ? ele?.STATUS_NAME_EN : ele?.STATUS_NAME ? ele?.STATUS_NAME : null}</span>,
			// attachment: ele?._FILE,
			DeletEdit: (
				<p>
					<CButton style={{ background: '#1e42a0 !important' }}>
						<CIcon
							onClick={() => showEditModal(ele?.WRK_ID_PK)}
							style={{ height: '16px', marginRight: '-3px' }}
							icon={cilPencil}
							customClassName="nav-icon"
						/>
					</CButton>
					<CButton color={'danger'}>
						<CIcon
							onClick={() => deleteTheWork(ele?.WRK_ID_PK)}
							style={{ height: '16px', marginRight: '-3px' }}
							icon={cilTrash}
							customClassName="nav-icon"
						/>
					</CButton>
				</p>
			),
		};
	});


