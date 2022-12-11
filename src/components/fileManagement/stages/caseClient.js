import { useEffect, useState } from 'react';
import { CRow, CCol, CFormLabel } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { getContacts } from '../../../store/reducers/contacts';
import translation from '../../../i18n/translate'

function sleep(delay = 0) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

export const ClientDiv = (props) => {
	const [options, setOptions] = useState([]);
	const dispatch = useDispatch();

	const { selectedCase } = useSelector((state) => state.fileManagement);
	const { allContacts } = useSelector((state) => state.contact);
	const {theAttributes} = useSelector(state => state.theConstants)
	const theme = useTheme();
	function getStyles(name, personName, theme) {
		return {
			fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
		};
	}
	// console.log(selectedCase)
	const Agents = allContacts?.data?.filter((client) => client.classification?.find((ele) => ele.CLI_TYPE_ID_PK == 2));
	const handleChange = (e) => {
		// console.log(e.target.value);
		dispatch(getContacts({ theParams: { nameSearch: e.target.value, classification0: 1,  classification1: 2 } })).then((res) => setOptions(res.payload.data));
	};
	return (
		<CRow>
			<CCol sm={props.stage ? 6 : 12}>
				<CFormLabel htmlFor="inputEmail4">{translation('principal')}</CFormLabel>
				{/* {console.log('options: ', options)} */}
				{props.stage ? (
					<FormControl fullWidth>
						<Select
							defaultValue={props.defaultValue}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							onChange={(e) => props.onChange(e.target.value)}
							name={props.name1}
						>
							{selectedCase
								? selectedCase?.clients?.map((ele, i) => {
										return (
											ele?.CLI_TYPE_ID_PK == 2 && (
												<MenuItem
													key={Math.random() + i}
													value={document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}
													style={props.defaultValue ? getStyles(ele, props.defaultValue, theme) : null}
												>
													{document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}
												</MenuItem>
											)
										);
								  })
								: Agents?.map((ele, i) => {
										return (
											<MenuItem
												key={Math.random() + i}
												value={document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}
												style={props.defaultValue ? getStyles(ele, props.defaultValue, theme) : null}
											>
											{document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}
											</MenuItem>
										);
								  })}
						</Select>
					</FormControl>
				) : (
					<>
						<Autocomplete
							className="agentAutoCompelete"
							id="free-solo-demo"
							freeSolo
							value={props.defaultValue}
							onChange={(e, value) => props.onChange(value)}
							options={options?.map((option) => document.body.getAttribute('dir') == 'ltr' && option.CLI_NAME_ENGLISH? option.CLI_NAME_ENGLISH : option.CLI_NAME)}
							renderInput={(params) => <TextField {...params} error={props.defaultValue?.length>0 ? false : true} onChange={(e) => handleChange(e)} />}
							getOptionLabel={(option) => option}
							renderOption={(props, option) => {
								return (
									<li {...props} key={option + Math.random()}>
										{option}
									</li>
								);
							}}
						/>

						<CIcon
							style={{ height: '20px', marginTop: '10px', cursor: 'pointer' }}
							className="icon"
							customClassName="nav-icon agentIcon"
							icon={props.icon}
							onClick={props.onClick}
						/>
					</>
				)}
			</CCol>
			{props.stage ? (
				<CCol sm={6}>
						<CFormLabel onClick={props.onClickAdd} style={{ display: 'block', marginTop: '4px',cursor: 'pointer' }}>
							{translation('attribute')}
						</CFormLabel>
						<FormControl fullWidth><Autocomplete
							id="free-solo-demo"
							freeSolo
							value={props.defaultValue2}
							onChange={(e, value) => props.onChange2(value)}
							options={theAttributes?.map((option) => document.body.getAttribute('dir') == 'ltr' && option?.AGE_ATTRBUIT_NAME_EN ? option?.AGE_ATTRBUIT_NAME_EN : option?.AGE_ATTRBUIT_NAME)}
							renderInput={(params) => <TextField {...params} error={props.defaultValue2?.length>0  ? false : true} />}
							getOptionLabel={(option) => option}
							renderOption={(props, option) => {
								return (
									<li {...props} key={option + Math.random()}>
										{option}
									</li>
								);
							}}
							ref={props.agentRef}
							name={props.name2}
						/>
						</FormControl>

					<CIcon
						style={{ height: '20px', marginTop: '10px', cursor: 'pointer' }}
						className="icon"
						customClassName={`nav-icon ${!props.stage ? 'agentIcon' : null }`}
						icon={props.icon}
						onClick={props.onClick}
					/>
				</CCol>
			) : null}
		</CRow>
	);
};

export const ClientAttrDiv = (props) => {
	const [options, setOptions] = useState([]);
	const dispatch = useDispatch();
	const { selectedCase } = useSelector((state) => state.fileManagement);
	const { allContacts } = useSelector((state) => state.contact);
	const {theAttributes} = useSelector(state => state.theConstants)
	const Ants = allContacts?.data?.filter((client) => client.classification?.find((ele) => ele.CLI_TYPE_ID_PK == 7));
	const handleChange = (e) => {
		// console.log(e.target.value);
		dispatch(getContacts({ theParams: { nameSearch: e.target.value, classification0: 7 } })).then((res) => setOptions(res.payload.data));
	};
	return (
		<CRow>
			<CCol md={props.defaultValue3 ? '4' : '6'}>
				<CFormLabel htmlFor="inputEmail4"> {translation('secondAttr')}</CFormLabel>
				<FormControl fullWidth>
					{props.stage  ? (
						<Select
							defaultValue={props.defaultValue1}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							onChange={(e) => props.onChange1(e)}
							name={props.name1}
						>
							{selectedCase
								? selectedCase?.clients?.map((ele, i) => {
										return (
											ele?.CLI_TYPE_ID_PK == 7 && (
												<MenuItem key={Math.random() + i} value={document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}>
												{document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}
												</MenuItem>
											)
										);
								  })
								: Ants?.map((ele, i) => (
									<MenuItem key={Math.random() + i} value={document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}>
									{document.body.getAttribute('dir') == 'ltr' && ele.CLI_NAME_ENGLISH? ele.CLI_NAME_ENGLISH : ele.CLI_NAME}
									</MenuItem>
								  ))}
						</Select>
					) : (
						<Autocomplete
							id="free-solo-demo"
							freeSolo
							value={props.defaultValue1}
							onChange={(e, value) => props.onChange1(value)}
							options={options?.map((option) => document.body.getAttribute('dir') == 'ltr' && option.CLI_NAME_ENGLISH? option.CLI_NAME_ENGLISH : option.CLI_NAME)}
							renderInput={(params) => <TextField {...params} error={props.defaultValue1?.length>0  ? false : true} onChange={(e) => handleChange(e)} />}
							getOptionLabel={(option) => option}
							renderOption={(props, option) => {
								return (
									<li {...props} key={option + Math.random()}>
										{option}
									</li>
								);
							}}
						/>
					)}
				</FormControl>
			</CCol>
			<CCol md={props.defaultValue3 ? '4' : '6'}>
				<CFormLabel style={{cursor: 'pointer'}} onClick={props.onClickAdd}>{translation('attribute')}</CFormLabel>
				<FormControl fullWidth>
					{
						!props.stage ? <Select
						defaultValue={props.defaultValue2}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
						onChange={(e) => props.onChange2(e)}
						name={props.name2}
						error={!props.defaultValue2 ? true : false}
					>
						{!props.stage ? props.antAttrs?.map((ele) => (
							<MenuItem value={ele.id} key={Math.random() + ele.id}>
								{document.body.getAttribute('dir') == 'ltr' ? ele.enName : ele.arName}
							</MenuItem>
						)) : []}
					</Select> : <Autocomplete
							id="free-solo-demo"
							freeSolo
							value={props.defaultValue2}
							onChange={(e, value) => props.onChange2(value)}
							options={theAttributes?.map((option) => document.body.getAttribute('dir') == 'ltr' && option?.AGE_ATTRBUIT_NAME_EN ? option?.AGE_ATTRBUIT_NAME_EN : option?.AGE_ATTRBUIT_NAME)}
							renderInput={(params) => <TextField {...params} error={props.defaultValue2?.length>0  ? false : true} />}
							getOptionLabel={(option) => option}
							renderOption={(props, option) => {
								return (
									<li {...props} key={option + Math.random()}>
										{option}
									</li>
								);
							}}
							ref={props.antRef}
							name={props.name2}
						/>
					}
					
				</FormControl>
				{!props.defaultValue3 ? (
					<CIcon
						style={{ height: '20px', marginTop: '10px', cursor: 'pointer' }}
						className="icon"
						customClassName="nav-icon"
						icon={props.icon}
						onClick={props.onClick}
					/>
				) : null}
			</CCol>
			{props.defaultValue3 ? (
				<CCol md="4">
					<CFormLabel htmlFor="inputEmail4" style={{ display: 'block', marginBottom: '0 ' }}>
						{translation('attorney')}
					</CFormLabel>
					<FormControl sx={{ m: 1, minWidth: `calc(100% - 40px)` }}>
						<Select
							defaultValue={props.defaultValue3}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
							onChange={(e) => props.onChange3(e)}
							name={props.name3}
						>
							{/* {allStages?.map((ele) => (
								<MenuItem value={ele.CAS_NUMBER} key={Math.random() + ele.CAS_NUMBER}>
									{ele.CAS_NUMBER}
								</MenuItem>
							))} */}
						</Select>
					</FormControl>
					<CIcon
						style={{ height: '20px', marginTop: '10px', cursor: 'pointer' }}
						className="icon"
						customClassName="nav-icon"
						icon={props.icon}
						onClick={props.onClick}
					/>
				</CCol>
			) : null}
		</CRow>
	);
};
