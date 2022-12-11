import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CFormInput, CFormTextarea } from '@coreui/react';

export const NoteCard = props => (
	<div className="divRow">
		<div className="divCell" align="center">
			<FormControl fullWidth>
				<Select
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
					value={props.val1}
					onChange={props.onChange1}
					name={props.name1}
					// error={error?.args?.filter((ele) => ele == 'body.EMP_ID_PK is required') ? true : false}
				>
					{/* {allEmployee.map((ele) => (
						<MenuItem value={ele.EMP_ID_PK} key={Math.random() + ele.EMP_ID_PK}>
							{ele.EMP_NAME}
						</MenuItem>
					))} */}
				</Select>
				{/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
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
				type="date"
                defaultValue={props.val3}
                onChange={props.onChange3}
                name={props.name3}
				// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
			/>
		</div>
		<div className="divCell" align="center">
			<CFormInput
				type="text"
                defaultValue={props.val4}
                onChange={props.onChange4}
                name={props.name4}
				// required
				// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
			/>
		</div>
		<div className="divCell" align="center">
			<CFormInput
				type="text"
                defaultValue={props.val5}
                onChange={props.onChange5}
                name={props.name5}
				// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
			/>
		</div>
		{/* <div className="divCell" align="center">
			<CFormInput
				type="text"
                defaultValue={props.val6}
                onChange={props.onChange6}
                name={props.name6}
				// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
			/>
		</div> */}
	</div>
);
