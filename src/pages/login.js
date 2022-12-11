import React, { useState } from 'react';
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CRow } from '@coreui/react';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../assets/style/login.css';
import { loginUser } from '../store/reducers/auth';

const Login = () => {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const Navigate = useNavigate();

	const handelLogin = () => {
		dispatch(loginUser({ username, password, IMEI: 'monapc' })).then((res) => {
			// console.log(res)
			if (res.payload?.res?.data.code) {
				setError(res.payload.res.data);
			} else {
				Navigate('/');
				localStorage.setItem('dir', 'rtl');
				localStorage.setItem('locale', 'ar');
			}
		});
	};
	return (
		<div className="bg-light min-vh-100 d-flex flex-row align-items-center authentication">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md={6}>
						<CCardGroup>
							<CCard className="p-4 login-box">
								<CCardBody>
									<CForm>
										<div className="user-box">
											<TextField
												required
												style={{ width: '100%' }}
												type="text"
												label={document.body.getAttribute('dir') === 'ltr' ? 'User Name' : 'إسم المستخدم'}
												value={username}
												onChange={(e) => setUserName(e.target.value)}
												error={error ? true : false}
												helperText={
													(document.body.getAttribute('dir') ==='ltr') &&!username
														? 'user name not correct'
														: !username && document.body.getAttribute('dir') === 'rtl'
														? 'إسم المستخدم غير صحيح'
														: null
												}
											/>
										</div>
										<div className="user-box">
											<TextField
												required
												style={{ width: '100%' }}
												type="password"
												label={document.body.getAttribute('dir') === 'ltr' ? 'Password' : 'كلمه السر'}
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												error={error ? true : false}
												helperText={
													!password && (document.body.getAttribute('dir') === 'ltr' && error)
														? 'Password not correct'
														: !password && document.body.getAttribute('dir') === 'rtl'
														? ' كلمه المرور غير صحيحه'
														: null
												}
											/>
										</div>
										<CRow>
											<CCol xs={12}>
												<a onClick={handelLogin} color="primary" className="px-4 loginbtn">
													<span></span>
													<span></span>
													<span></span>
													<span></span>
													{document.body.getAttribute('dir') == 'ltr' ? 'Login' : 'دخول'}
												</a>
											</CCol>
											<CCol xs={6} className="text-right">
											</CCol>
										</CRow>
									</CForm>
								</CCardBody>
							</CCard>
						</CCardGroup>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	);
};

export default React.memo(Login);
