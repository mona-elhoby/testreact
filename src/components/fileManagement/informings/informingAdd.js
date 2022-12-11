import React from 'react';
import { CTableHeaderCell, CTableRow, CTableDataCell } from '@coreui/react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CFormInput } from '@coreui/react';
import { useSelector } from 'react-redux';
import CIcon from '@coreui/icons-react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { cilMinus, cilPlus, cilTrash, cilPencil, cilNotes, cilX } from '@coreui/icons';

export const InformingFormAdd = (props) => {
	const { allEmployee } = useSelector((state) => state.employee);
	const { ingormingProcedureList } = useSelector((state) => state.informingConstraint);
	return (
		<div className="divRow" id={props.id}>
			<div className="divCell" align="center" style={{ padding: '10px 0px 13px' }}>
				<CFormInput
					type="date"
					defaultValue={props.val3}
					onChange={props.onChange3}
					name={props.name3}
					required
					className={`${!props.val3 ? 'is-invalid' : null}`}
				/>
			</div>
			<div className="divCell" align="center" style={{ padding: '12px 0px 8.5px' }}>
				<FormControl fullWidth>
					<Select displayEmpty inputProps={{ 'aria-label': 'Without label' }} defaultValue={props.val1} onChange={props.onChange1} name={props.name1}>
						{allEmployee.map((ele) => (
							<MenuItem value={ele.EMP_NAME} key={Math.random() + ele.EMP_ID_PK}>
								{ele.EMP_NAME}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div className="divCell" align="center" style={{ padding: '15px 0px 11px' }}>
				<FormControl fullWidth onClick={props.onClickHandel} sx={{ minWidth: '100%' }}>
					<Autocomplete
						id="free-solo-demo"
						freeSolo
						value={props.val2}
						name={props.name2}
						onChange={props.onChange2}
						options={ingormingProcedureList.map((option) => option.INR_PROCEDURE_NAME)}
						renderInput={(params) => (
							<TextField
								{...params}
								error={props.val2.length > 0 ? false : true}
								// helperText="required"
							/>
						)}
						ref={props.ref0}
						getOptionLabel={(option) => option}
						renderOption={(props, option) => {
							return (
								<li {...props} key={option + Math.random()}>
									{option}
								</li>
							);
						}}
					/>
				</FormControl>
			</div>
			<div className="divCell" align="center"  style={{ padding: '15px 8px 8px' }}>
				<CFormInput
					type="text"
					defaultValue={props.val4}
					onChange={props.onChange4}
					name={props.name4}
					// required
					// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
				/>
				<CIcon
					style={{ height: '16px', float: 'left', cursor: 'pointer', color: 'red', marginTop: '8px' }}
					icon={cilMinus}
					customClassName="nav-icon"
					onClick={props.deleteInformingProcedure}
				/>
			</div>
		</div>
	);
};
