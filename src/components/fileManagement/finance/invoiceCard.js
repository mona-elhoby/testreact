import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CFormInput } from '@coreui/react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CIcon from '@coreui/icons-react';
import { cilMinus } from '@coreui/icons';


export const InvoiceCard = (props) => {
	// Number Procedure compo
	const newArr = [
		...props?.data1?.map((ele) => ({ ref: 0, id: ele?.STG_ID_PK, number: `قضيه رقم ${ele?.STG_NUMBER}` })),
		...props?.data2?.map((ele) => ({ ref: 2, id: ele?.INR_ID_PK, number: `إنذار رقم ${ele?.INR_NUMBER}`  })),
		...props?.data3?.map((ele) => ({ ref: 1, id: ele?.WRN_ID_PK, number: `بلاغ رقم ${ele?.WRN_NUMBER}`  })),
	];
	// console.log(newArr)
	return (
		<div className="divRow">
			<div className="divCell" align="center" style={{padding: '9.5px 0px 5px'}}>
				<FormControl fullWidth  sx={{ minWidth: '100%'}}>
					<Autocomplete
						id="free-solo-demo"
						sx={{fontSize: 12}}
						freeSolo
						value={props.val1}
						onChange={props.onChange1}
						options={newArr?.map((option) => option.number )}
						renderInput={(params) => <TextField {...params} sx={{fontSize: 12}} required/>}
						name={props.name1}
						// error={!props.val1 ? true : false}
						ref={props.ref0}
						PaperComponent={({ children }) => (
							<div style={{ background: "white", fontSize: "12px" }}>
							  {children}
							</div>
						  )}
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
			</div>
			<div className="divCell" align="center">
				<CFormInput
					type="text"
					defaultValue={props.val2}
					onChange={props.onChange2}
					name={props.name2}
					// required
					// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
				/>
			</div>
			<div className="divCell" align="center">
				<CFormInput
					type="number"
					defaultValue={props.val3}
					onChange={props.onChange3}
					name={props.name3}
					// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
				/>
			</div>
			<div className="divCell" align="center">
				<CFormInput
					type="number"
					defaultValue={props.val4}
					onChange={props.onChange4}
					name={props.name4}
					// required
					// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
				/>
			</div>
			<div className="divCell" align="center">
				<CFormInput
					type="number"
					defaultValue={props.val5}
					onChange={props.onChange5}
					name={props.name5}
					// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
					readOnly
				/>
			</div>
			<div className="divCell" align="center">
				<CFormInput
					type="number"
					defaultValue={props.val6}
					onChange={props.onChange6}
					name={props.name6}
					style={{width: 'calc(100% - 30px) !important', display: 'inline'}}
					readOnly
				/>
				<CIcon
					// onClick={() => openUpdateModal(ele?.WRK_ID_PK)}
					style={{ height: '16px', float: 'left', cursor: 'pointer', marginTop: '10px' }}
					icon={cilMinus}
					customClassName="nav-icon"
					onClick={props.handelRemoveDiv}
				/>
			</div>
		</div>
	);
};
