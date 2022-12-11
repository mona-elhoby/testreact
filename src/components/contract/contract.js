import React from 'react';
import { CTableHeaderCell, CTableRow, CTableDataCell } from '@coreui/react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CFormInput } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { cilMinus } from '@coreui/icons';

export const ContractCard = (props) => (
	<div className="divRow">
		<div className="divCell" align="center" style={{ height: '50px' }}>
			<CFormInput
				type="number"
				defaultValue={props.val5}
				onChange={props.onChange5}
				name={props.name5}
				// required
				// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
			/>
		</div>
		<div className="divCell" align="center" style={{ height: '50px' }}>
			<FormControl fullWidth>
				<Select
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
					value={props.val1}
					onChange={props.onChange1}
					name={props.name1}
					required
					error={!props.val1 ? true : false}
				>
					{[
						{ id: 0, arName: 'تاريخ محدد' },
						{ id: 1, arName: 'بدايه القضيه' },
						{ id: 2, arName: 'نهايه القضيه' },
					].map((ele) => (
						<MenuItem value={ele.id} key={Math.random() + ele.id}>
							{ele.arName}
						</MenuItem>
					))}
				</Select>
				{/* {error?.args?.find((ele) => ele == 'body.EMP_ID_PK is required') ? <FormHelperText>الحقل مطلوب!</FormHelperText> : null} */}
			</FormControl>
		</div>
		<div className="divCell" align="center" style={{ height: '50px' }}>
			<CFormInput
				type="date"
				defaultValue={props.val3}
				onChange={props.onChange3}
				name={props.name3}
				// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
			/>
		</div>
		<div className="divCell" align="center" style={{ height: '50px' }}>
			<FormControl fullWidth>
				<Autocomplete
					// multiple={true}
					fullWidth
					id="free-solo-demo"
					freeSolo
					value={props.val2}
					onChange={props.onChange2}
					name={props.name2}
					options={props.theStageKindCompo?.map((option) => option.STG_KIND_NAME)}
					renderInput={(params) => <TextField {...params} />}
					getOptionLabel={(option) => option}
					renderOption={(props, option) => {
						return (
							<li {...props} key={option + Math.random()}>
								{option}
							</li>
						);
					}}
					style={{ marginBottom: '20px' }}
				/>
			</FormControl>
		</div>
		<div className="divCell" align="center" style={{ height: '50px' }}>
			<CFormInput
				type="number"
				defaultValue={props.val4}
				onChange={props.onChange4}
				name={props.name4}
				// required
				// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
			/>
		</div>
		<div className="divCell" align="center" style={{ height: '50px', paddingRight: '10px' }}>
			<CFormInput
				style={{ width: 'calc(100% - 40px) !important', display: 'inline-block'}}
				type="number"
				defaultValue={props.val6}
				onChange={props.onChange6}
				name={props.name6}
				// required
				// className={`${error?.args?.filter((ele) => ele == 'body.APP_DATE must be a valid date') ? 'is-invalid' : null}`}
			/>
			<CIcon style={{ height: '20px' }} icon={cilMinus} customClassName="nav-icon" />
		</div>
	</div>
);

export const paidDetail = (props) =>
	props.data?.map((payment, index) => (
		<CTableRow key={index}>
			<CTableHeaderCell scope="row">{(index += 1)}</CTableHeaderCell>
			<CTableDataCell onClick={() => props.openReceiptVoucher(payment?.PAY_ID_PK)} style={{ cursor: 'pointer' }}>
				{payment.PAY_KIND == 0 ? "سند قبض" : "سند صرف"}
			</CTableDataCell>
			<CTableDataCell onClick={() => props.openReceiptVoucher(payment?.PAY_ID_PK)} style={{ cursor: 'pointer' }}>
				{payment.PAY_NUMBER}
			</CTableDataCell>
			<CTableDataCell onClick={() => props.openReceiptVoucher(payment?.PAY_ID_PK)} style={{ cursor: 'pointer' }}>
				{payment.PAY_AMOUNT}
			</CTableDataCell>
			<CTableDataCell onClick={() => props.openReceiptVoucher(payment?.PAY_ID_PK)} style={{ cursor: 'pointer' }}>
				{payment.PAY_TYPE_NAME}
			</CTableDataCell>
			<CTableDataCell onClick={() => props.openReceiptVoucher(payment?.PAY_ID_PK)} style={{ cursor: 'pointer' }}>
				{payment.PAY_STATUS_NAME}
			</CTableDataCell>
			<CTableDataCell onClick={() => props.openReceiptVoucher(payment?.PAY_ID_PK)} style={{ cursor: 'pointer' }}>
				{payment.PAY_CHEQUE_NUMBER}
			</CTableDataCell>
			<CTableDataCell onClick={() => props.openReceiptVoucher(payment?.PAY_ID_PK)} style={{ cursor: 'pointer' }}>
				{payment.PAY_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(payment.PAY_DATE)) : null}
			</CTableDataCell>
			<CTableDataCell onClick={() => props.openReceiptVoucher(payment?.PAY_ID_PK)} style={{ cursor: 'pointer' }}>
				{payment.BNK_NAME}
			</CTableDataCell>
		</CTableRow>
	));
