import React from 'react';
import { CButton, CRow, CCol, CCollapse, CFormLabel, CFormTextarea } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilAlbum, cilX } from '@coreui/icons';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import translation from '../../../i18n/translate'

export const cardSessions = ({ data, getSession, showEditSession, deleteTheSession }) => {
	return data?.map((ele, index) => {
		return (
			<CRow key={Math.random() + index}>
				<CCol md={6} className={`${index % 2 == 0 ? null : ' offset-md-6'}`}>
					<div className={`${index % 2 == 0 ? 'sesData' : 'borderRight'}`}>
						<p className="sesDate" onClick={() => getSession(ele?.SES_ID_PK)}>
							{ele?.SES_DATE && new Intl.DateTimeFormat('en-US').format(new Date(ele?.SES_DATE))}
						</p>
						<div className="data-container">
							<span
								className="icon"
								style={{
									borderColor: ele.SES_FINAL ? 'red' : '#42b53f',
								}}
							>
								<CIcon
									className="icon"
									style={{
										height: '15px',
										color: ele.SES_FINAL ? 'red' : '#42b53f',
									}}
									icon={ele.SES_FINAL ? cilX : cilAlbum}
									customClassName="nav-icon"
								/>
							</span>
							<div className="data" onClick={() => getSession(ele?.SES_ID_PK)}>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
									}}
								>
									<div>
										<small> {translation('stageNum')}: </small>
										<h3>{ele?.STG_NUMBER ? ele?.STG_NUMBER : translation('notFound')}</h3>
									</div>
									<div>
										<small>{translation('sessionType')}: </small>
										<p style={{ marginTop: '-5px' }}>{document.body.getAttribute('dir') == 'ltr' && ele?.SES_TYPE_NAME_EN ? ele?.SES_TYPE_NAME_EN : ele?.SES_TYPE_NAME ? ele?.SES_TYPE_NAME :  translation('notFound')}</p>
									</div>
								</div>
								<div style={{ display: 'flex', justifyContent: 'space-between' }}>
									<div>
										{ele?.SES_DECISION_NAME || ele?.SES_DECISION ? <small>{translation('sessionDecision')}: </small> : null}
										<span>{document.body.getAttribute('dir') == 'ltr' && ele?.SES_DECISION_NAME_EN ? ele?.SES_DECISION_NAME_EN : ele?.SES_DECISION_NAME ? ele?.SES_DECISION_NAME : null}</span>
										{/* <div>
											{ele?.SES_DECISION ? (
												<span>
													{ele?.SES_DECISION.slice(0, 25)}
													{ele?.SES_DECISION.length > 25
														? visibleCollapse == ele.SES_ID_PK + ele?.SES_DECISION_NAME && (
																<span
																	style={{
																		cursor: 'pointer',
																	}}
																	onClick={() => setVisibleCollapse(ele.SES_ID_PK + ele?.SES_DECISION_NAME)}
																>
																	...
																</span>
														  )
														: null}
													<CCollapse visible={visibleCollapse == ele.SES_ID_PK + ele?.SES_DECISION_NAME ? true : false}>
														{ele?.SES_DECISION.slice(25)}
													</CCollapse>
												</span>
											) : null}
										</div> */}
									</div>
									<div>
										{ele?.ADJ_TYPE_NAME || ele?.ADJ_DETAILS ? <small>{translation('judgement')}: </small> : null}
										<span>{document.body.getAttribute('dir') == 'ltr' && ele?.ADJ_TYPE_NAME_EN ? ele?.ADJ_TYPE_NAME_EN : ele?.ADJ_TYPE_NAME ? ele?.ADJ_TYPE_NAME : null}</span>
										{/* <div>
											{ele?.ADJ_DETAILS ? (
												<span>
													{ele?.ADJ_DETAILS.slice(0, 25)}
													{ele?.ADJ_DETAILS.length > 25 ? (
														<span
															style={{
																cursor: 'pointer',
																display: visibleCollapse == ele.SES_ID_PK + ele?.ADJ_TYPE_NAME ? 'none' : 'inline-block',
															}}
															onClick={() => setVisibleCollapse(ele.SES_ID_PK + ele?.ADJ_TYPE_NAME)}
														>
															...
														</span>
													) : null}
													<CCollapse visible={visibleCollapse == ele.SES_ID_PK + ele?.ADJ_TYPE_NAME ? true : false}>
														{ele?.ADJ_DETAILS.slice(25)}
													</CCollapse>
												</span>
											) : null}
										</div> */}
									</div>
								</div>
							</div>
							<div className="editDeleteDiv">
								<CButton onClick={() => showEditSession(ele?.SES_ID_PK)} className="btn-modal-save">
									{translation('update')}
								</CButton>
								<CButton color="danger" onClick={() => deleteTheSession(ele.SES_ID_PK)}>
									{translation('delete')}
								</CButton>
							</div>
						</div>
					</div>
				</CCol>
				{index % 2 == 0 ? <CCol md={6}></CCol> : null}
			</CRow>
		);
	});
};

export const SessionRequirements = (props) => {
	return (
	<div className="sesRequirementDiv" id={props.id}>
		<CRow>
			<CCol md={6}>
				<CFormLabel style={{ cursor: 'pointer' }} onClick={props.onClickAddNewRequirement}>
					{translation('requirement')}
				</CFormLabel>
				<FormControl fullWidth onClick={props.onClickAddRequirList} sx={{ minWidth: '90%' }}>
					<Autocomplete
						id="free-solo-demo"
						freeSolo
						value={props.value1}
						onChange={props.onChange1}
						options={props.theSessionRequirements.map((option) => document.body.getAttribute('dir') == 'ltr' && option.RTYPE_NAME_EN ? option.RTYPE_NAME_EN : option.RTYPE_NAME)}
						renderInput={(params) => <TextField {...params} />}
						name={props.name1}
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
			</CCol>
			<CCol md={6}>
				<CFormLabel htmlFor="inputEmail4">{translation('notes')}</CFormLabel>
				<CFormTextarea
					id="exampleFormControlTextarea1"
					rows="4"
					onChange={props.onChange2}
					defaultValue={props.value2}
					name={props.name2}
					style={{ width: 'calc(100% - 30px) !important' }}
				></CFormTextarea>
				<CIcon
					style={{
						height: '18px',
						color: '#ff3547',
						margin: '-45px 2px auto auto',
						cursor: 'pointer',
					}}
					icon={props.icon}
					customClassName="nav-icon"
					onClick={props.onClick1}
				/>
			</CCol>
		</CRow>
	</div>
	)
				};
