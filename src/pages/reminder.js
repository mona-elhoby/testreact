import React, { useEffect, useState } from 'react';
import { CTableRow, CTableHeaderCell, CTableDataCell, CRow, CCol, CFormInput } from '@coreui/react';
import AnimatedNumber from 'react-animated-number';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	cilWarning,
	cilWallet,
	cilVector,
	cilInstitution,
	cilWindow,
	cilNotes,
	cilMoney,
	cilUser,
	cilAddressBook,
	cilLibrary,
	cilDiamond,
	cilCalendar
} from '@coreui/icons';
import {  useIntl } from "react-intl";

import RemindersCard from '../components/reminders/cardReminder';
import RemindersDetails from '../components/reminders/remindersDetails';
import {
	getReminderCases,
	getReminderWork,
	getReminderSession,
	getReminderDairy,
	getReminderWarning,
	getReminderFollow,
	getReminderExecute,
	getReminderEmployee,
	getReminderContracts,
	getReminderClients,
	getReminderAppiontments,
	getReminderAgency,
} from '../store/reducers/reminderData';
import "../components/reminders/reminder.css"
import translation from "../i18n/translate"

const Reminders = () => {
	const [showModal, setShowModal] = useState( translation('notFound'));
	const [visible, setVisible] = useState(false);
	const { formatMessage } = useIntl();
	const Navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		reminderCases,
		remiderAgency,
		remiderAppiontment,
		remiderClients,
		reminderContracts,
		reminderDairy,
		reminderEmployee,
		reminderExecute,
		reminderFollow,
		reminderSession,
		reminderWork,
		reminderWarning,
	} = useSelector((state) => state.reminderData);

	useEffect(() => {
		dispatch(getReminderAgency());
		dispatch(getReminderAppiontments());
		dispatch(getReminderCases());
		dispatch(getReminderClients());
		dispatch(getReminderContracts());
		dispatch(getReminderDairy());
		dispatch(getReminderEmployee());
		dispatch(getReminderExecute());
		dispatch(getReminderFollow());
		dispatch(getReminderWarning());
		dispatch(getReminderSession());
		dispatch(getReminderWork());
	}, [dispatch]);

	const agencyHeaderTable = (
		<CTableRow>
			{[formatMessage({id: 'authenticationNumber'}), formatMessage({id: 'place'}), formatMessage({id: 'type'}), formatMessage({id: 'agents'}), formatMessage({id: 'startDate'}), formatMessage({id: 'epiryDate'})].map((ele, i) => (
				<CTableHeaderCell scope="col" key={i}>
					{ele}
				</CTableHeaderCell>
			))}
		</CTableRow>
	);

	const casesHeaderTable = (
		<CTableRow>
			{[formatMessage({id: 'fileNum'}), formatMessage({id: 'category'}),  formatMessage({id: 'client'}), formatMessage({id: 'agents'}),  formatMessage({id: 'ants'}), formatMessage({id: 'authenticationNumber'})].map((ele, i) => (
				<CTableHeaderCell scope="col" key={i}>
					{ele}
				</CTableHeaderCell>
			))}
		</CTableRow>
	);

	const appiontmentsHeaderTable = (
		<CTableRow>
			{[formatMessage({id: 'type'}), formatMessage({id: 'client'}), formatMessage({id: 'employee'}), formatMessage({id: 'date'}), formatMessage({id: 'time'})].map((ele, i) => (
				<CTableHeaderCell scope="col" key={i}>
					{ele}
				</CTableHeaderCell>
			))}
		</CTableRow>
	);

	const clientsHeaderTable = (
		<CTableRow>
			{[formatMessage({id: 'name'}), formatMessage({id: 'nationality'}), formatMessage({id: 'identity'}), formatMessage({id: 'residencyNum'}),  formatMessage({id: 'license'}), formatMessage({id: 'sponserName'})].map((ele, i) => (
				<CTableHeaderCell scope="col" key={i}>
					{ele}
				</CTableHeaderCell>
			))}
		</CTableRow>
	);

	const contractsHeaderTable = (
		<CTableRow>
			{[formatMessage({id: 'contractNum'}), formatMessage({id: 'client'}), formatMessage({id: 'theValue'}), formatMessage({id: 'contractDate'}),  formatMessage({id: 'startDate'}), formatMessage({id: 'epiryDate'})].map((ele, i) => (
				<CTableHeaderCell scope="col" key={i}>
					{ele}
				</CTableHeaderCell>
			))}
		</CTableRow>
	);

	const executeHeaderTable = (
		<CTableRow>
			{[formatMessage({id: 'fileNum'}), formatMessage({id: 'client'}), formatMessage({id: 'stage'}), formatMessage({id: 'proceding'}),  formatMessage({id: 'type'}), formatMessage({id: 'status'})].map((ele, i) => (
				<CTableHeaderCell scope="col" key={i}>
					{ele}
				</CTableHeaderCell>
			))}
		</CTableRow>
	);

	const sessionHeaderTable = (
		<CTableRow>
			{[`${formatMessage({id: 'case'})} ${formatMessage({id: 'theNumber'})}`, formatMessage({id: 'client'}), formatMessage({id: 'stage'}), formatMessage({id: 'place'}), formatMessage({id: 'court'}), formatMessage({id: 'office'}), formatMessage({id: 'sessionRoll'}), formatMessage({id: 'date'})].map((ele, i) => (
				<CTableHeaderCell scope="col" key={i}>
					{ele}
				</CTableHeaderCell>
			))}
		</CTableRow>
	);

	const WarningHeaderTable = (
		<CTableRow>
			{[formatMessage({id: 'fileNum'}), formatMessage({id: 'client'}), `${formatMessage({id: 'warning'})} ${formatMessage({id: 'theNumber'})}`, formatMessage({id: 'method'}),  formatMessage({id: 'status'}), formatMessage({id: 'period'}), formatMessage({id: 'registerDate'}), formatMessage({id: 'epiryDate'})].map((ele, i) => (
				<CTableHeaderCell scope="col" key={i}>
					{ele}
				</CTableHeaderCell>
			))}
		</CTableRow>
	);

	const WorkHeaderTable = (
		<CTableRow>
			{[`${formatMessage({id: 'case'})} ${formatMessage({id: 'theNumber'})}`, formatMessage({id: 'client'}), 'إرتباط العمل', formatMessage({id: 'court'}),  formatMessage({id: 'status'}), formatMessage({id: 'type'}), `${formatMessage({id: 'session'})} ${formatMessage({id: 'date'})}`, `${formatMessage({id: 'status'})} ${formatMessage({id: 'date'})}`].map((ele, i) => (
				<CTableHeaderCell scope="col" key={i}>
					{ele}
				</CTableHeaderCell>
			))}
		</CTableRow>
	);

	return (
		<div className="reminders">
			<CRow>
				<CCol sm={6} md={4}>
					<RemindersCard
						onClick={(e) => setShowModal('agency')}
						titleVals={[
							{
								title: formatMessage({id: 'expired'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderAgency?.AGENCY_END.total} />,
							},
							{
								title: formatMessage({id: 'attached'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderAgency?.AGENCY_FILE.total} />,
							},
						]}
						values={[
							// {
							// 	title: 'الكل',
							// 	value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderAgency?.total} />,
							// },
							{
								title: formatMessage({id: 'using'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderAgency?.AGENCY_UNSTART.total} />,
							},
							{
								title: formatMessage({id: 'notAttached'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderAgency?.AGENCY_ATTACHMENT.total} />,
							},
						]}
						title={formatMessage({id: 'agencies'})}
						icon= {cilDiamond}
					/>
				</CCol>
				<CCol sm={6} md={4}>
					<RemindersCard
						onClick={(e) => setShowModal('cases')}
						titleVals={[
							{
								title: formatMessage({id: 'notUsed'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderCases?.FILE_USE.total} />,
							},
							{
								title: formatMessage({id: 'new'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderCases?.FILE_NEW.total} />,
							},
						]}
						values={[
							// {
							// 	title: 'الكل',
							// 	value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderCases?.total} />,
							// },
							{
								title: formatMessage({id: 'withoutContract'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderCases?.FILE_WITHOUT_CONTRACT.total} />,
							},
							{
								title:formatMessage({id: 'withoutAgency'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderCases?.FILE_WITHOUT_AGENCY.total} />,
							},
						]}
						title={formatMessage({id: 'files'})}
						icon= {cilLibrary}
					/>
				</CCol>
				<CCol sm={6} md={4}>
					<RemindersCard
						onClick={(e) => setShowModal('clients')}
						titleVals={[
							{
								title: formatMessage({id: 'passport'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderClients?.CLIENT_PASSPORT.total} />,
							},
							{
								title: formatMessage({id: 'expiryLicense'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderClients?.CLIENT_LICENCE.total} />,
							},
							{
								title: formatMessage({id: 'theIdentity'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderClients?.CLIENT_IDENTITY.total} />,
							},
						]}
						values={[
							// {
							// 	title: 'الكل',
							// 	value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderClients?.total} />,
							// },
							{
								title: formatMessage({id: 'notAttached'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderClients?.CLIENT_ATTACHMENT.total} />,
							},
						]}
						title={formatMessage({id: 'contacts'})}
						icon={cilAddressBook}
					/>
				</CCol>
				<CCol sm={6} md={4}>
					<RemindersCard
						onClick={(e) => setShowModal('contracts')}
						titleVals={[
							{
								title: formatMessage({id: 'expired'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderContracts?.CONTRACT_END.total} />,
							},
							{
								title: formatMessage({id: 'new'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderContracts?.CONTRACT_NEW.total} />,
							},
						]}
						values={[
							//   {
							//     title: "الكل",
							//     value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderContracts?.total} />,
							//   },
							{
								title: formatMessage({id: 'notAttached'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderContracts?.CONTRACT_ATTCHMENT.total} />,
							},
							{
								title: formatMessage({id: 'stgContract'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderContracts?.CONTRACT_NEW.total} />,
							},
						]}
						title={formatMessage({id: 'contracts'})}
						icon={cilNotes}
					/>
				</CCol>
				<CCol sm={6} md={4}>
					<RemindersCard
						onClick={(e) => setShowModal('sessions')}
						titleVals={[
							{
								title: formatMessage({id: 'updated'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderSession?.SESSION_REMINDER.total} />,
							},
							{
								title: formatMessage({id: 'replayed'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderSession?.SESSION_UNREFRESH.total} />,
							},
						]}
						values={[
							// {
							// 	title: 'الكل',
							// 	value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderSession?.total} />,
							// },
							{
								title: formatMessage({id: 'notAttached'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderSession?.SESSION_ATTACHMENT.total} />,
							},
							{
								title: formatMessage({id: 'notUpdated'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderSession?.SESSION_UNREFRESH.total} />,
							},
						]}
						title={formatMessage({id: 'sessions'})}
						icon={cilVector}
					/>
				</CCol>
				{/* <CCol sm={6} md={4}>
          <RemindersCard
            onClick={(e) => setShowModal("diary")}
            titleVals={[
                {
                    title: "بإنتظار الموافقه",
                    value: (
                      <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)} 
                        value={reminderDairy?.DAIRY_APPROVAL_WAIT.total}
                      />
                    ),
                  }
            ]}
            values={[
              {
                title: "الكل",
                value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderDairy?.total} />,
              },
            ]}
            title="المتابعات اليوميه"
          />
        </CCol> */}
				<CCol sm={6} md={4}>
					<RemindersCard
						onClick={(e) => setShowModal('employee')}
						titleVals={[
							{
								title: formatMessage({id: 'theIdentity'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderEmployee?.EMPLOYEE_IDENTITY.total} />,
							},
							{
								title: formatMessage({id: 'passport'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderEmployee?.EMPLOYEE_PASSPORT.total} />,
							},
						]}
						values={[
							// {
							// 	title: 'الكل',
							// 	value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderEmployee?.total} />,
							// },
							{
								title: formatMessage({id: 'attachments'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderEmployee?.EMPLOYEE_DOCUMENT.total} />,
							},
						]}
						title={formatMessage({id: 'employees'})}
						icon={cilUser}
					/>
				</CCol>
				{/* <CCol sm={6} md={4}>
          <RemindersCard
            onClick={(e) => setShowModal("follow")}
            titleVals={[
                {
                  title: "النتائج",
                  value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderFollow?.FOLLOW_RESULT.total} />,
                },
            ]}
            values={[
              {
                title: "الكل",
                value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderFollow?.total} />,
              },
            ]}
            title="المتابعات"
          />
        </CCol> */}
				<CCol sm={6} md={4}>
					<RemindersCard
						onClick={(e) => setShowModal('warning')}
						titleVals={[
							{
								title: formatMessage({id: 'using'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderWarning?.WARRNING_DURATION.total} />,
							},
						]}
						values={[
							// {
							// 	title: 'الكل',
							// 	value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderWarning?.total} />,
							// },
							{
								title: formatMessage({id: 'delayed'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderWarning?.WARRNING_DURATION_OVER.total} />,
							},
						]}
						title={formatMessage({id: 'warnings'})}
						icon={cilWarning}
					/>
				</CCol>
				<CCol sm={6} md={4}>
					<RemindersCard
						onClick={(e) => setShowModal('work')}
						titleVals={[
							{
								title: formatMessage({id: 'updated'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderWork?.WORK_REMINDER.total} />,
							},
						]}
						values={[
							// {
							// 	title: 'الكل',
							// 	value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderWork?.total} />,
							// },
							{
								title: formatMessage({id: 'notUpdated'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderWork?.WORK_UNREFRESH.total} />,
							},
						]}
						title={formatMessage({id: 'worksManagement'})}
						bgColor="#fb3"
						icon={cilWindow}
					/>
				</CCol>
				<CCol sm={6} md={4}>
					<RemindersCard
						onClick={(e) => setShowModal('appiontment')}
						titleVals={[
							{
								title:formatMessage({id: 'updated'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderAppiontment?.APPOINTMENT_REMINDER.total} />,
							},
						]}
						values={[
							// {
							// 	title: 'الكل',
							// 	value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={remiderAppiontment?.total} />,
							// },
						]}
						title={formatMessage({id: 'appiontments'})}
						icon={cilCalendar}
					/>
				</CCol>
				<CCol sm={6} md={4}>
					<RemindersCard
						onClick={(e) => setShowModal('execute')}
						icon={cilInstitution}
						titleVals={[
							{
								title:  formatMessage({id: 'using'}),
								value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderExecute?.EXECUTE_DURATION.total} />,
							},
						]}
						values={[
							// {
							// 	title: 'الكل',
							// 	value: <AnimatedNumber duration={2500} style={{display: 'block'}} formatValue={n => n.toFixed(0)}  value={reminderExecute?.total} />,
							// },
						]}
						title={formatMessage({id: 'procedings'})}
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm={12}>
					<div className="agency">
						<RemindersDetails
							title={formatMessage({id: 'agencies'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'agency' ? true : false}
							tab1={formatMessage({id: 'expired'})}
							tab2={formatMessage({id: 'using'})}
							tab3={formatMessage({id: 'attached'})}
							tab4={formatMessage({id: 'notAttached'})}
							header={agencyHeaderTable}
							tableBody1={
								remiderAgency?.AGENCY_END.total == 0
									?  translation('notFound')
									: remiderAgency?.AGENCY_END.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/agenceis/${ele?.AGE_ID_PK}`)}>
													<CTableHeaderCell>{ele?.AGE_NUMBER ? ele?.AGE_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.AGE_PLACE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGE_PLACE_NAME_EN : ele?.AGE_PLACE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGE_TYPE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGE_TYPE_NAME_EN : ele?.AGE_TYPE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGENTS_ENGLISH && document.body.getAttribute('dir') == 'ltr'? ele?.AGENTS_ENGLISH.replace('-', ',') : ele?.AGENTS.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>
														{ele?.AGE_START_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.AGE_START_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.AGE_END_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.AGE_END_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody2={
								remiderAgency?.AGENCY_UNSTART.total == 0
									?  translation('notFound')
									: remiderAgency?.AGENCY_UNSTART.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/agenceis/${ele?.AGE_ID_PK}`)}>
													<CTableHeaderCell>{ele?.AGE_NUMBER ? ele?.AGE_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.AGE_PLACE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGE_PLACE_NAME_EN : ele?.AGE_PLACE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGE_TYPE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGE_TYPE_NAME_EN : ele?.AGE_TYPE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGENTS_ENGLISH && document.body.getAttribute('dir') == 'ltr'? ele?.AGENTS_ENGLISH.replace('-', ',') : ele?.AGENTS.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>
														{ele?.AGE_START_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.AGE_START_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.AGE_END_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.AGE_END_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody3={
								remiderAgency?.AGENCY_ATTACHMENT.total == 0
									?  translation('notFound')
									: remiderAgency?.AGENCY_ATTACHMENT.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/agenceis/${ele?.AGE_ID_PK}`)}>
													<CTableHeaderCell>{ele?.AGE_NUMBER ? ele?.AGE_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.AGE_PLACE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGE_PLACE_NAME_EN : ele?.AGE_PLACE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGE_TYPE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGE_TYPE_NAME_EN : ele?.AGE_TYPE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGENTS_ENGLISH && document.body.getAttribute('dir') == 'ltr'? ele?.AGENTS_ENGLISH.replace('-', ',') : ele?.AGENTS.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>
														{ele?.AGE_START_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.AGE_START_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.AGE_END_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.AGE_END_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody4={
								remiderAgency?.AGENCY_FILE.total == 0
									?  translation('notFound')
									: remiderAgency?.AGENCY_FILE.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/agenceis/${ele?.AGE_ID_PK}`)}>
													<CTableHeaderCell>{ele?.AGE_NUMBER ? ele?.AGE_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.AGE_PLACE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGE_PLACE_NAME_EN : ele?.AGE_PLACE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGE_TYPE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGE_TYPE_NAME_EN : ele?.AGE_TYPE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGENTS_ENGLISH && document.body.getAttribute('dir') == 'ltr'? ele?.AGENTS_ENGLISH.replace('-', ',') : ele?.AGENTS.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>
														{ele?.AGE_START_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.AGE_START_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.AGE_END_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.AGE_END_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
						/>
					</div>
				</CCol>
				<CCol sm={12}>
					<div className="appiontment">
						<RemindersDetails
							title={formatMessage({id: 'appiontments'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'appiontment' ? true : false}
							tab1={formatMessage({id: 'updated'})}
							header={appiontmentsHeaderTable}
							tableBody1={
								remiderAppiontment?.APPOINTMENT_REMINDER.total == 0
									?  translation('notFound')
									: remiderAppiontment?.APPOINTMENT_REMINDER.data.map((ele, index) => {
											return (
												<CTableRow key={index}>
													<CTableHeaderCell>{ele?.APP_TYPE_NAME ? ele?.APP_TYPE_NAME : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.EMP_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.EMP_NAME_ENGLISH : ele?.EMP_NAME }</CTableDataCell>
													<CTableDataCell>
														{ele?.APP_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.APP_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>{ele?.APP_TIME ? ele?.APP_TIME : translation('notFound')}</CTableDataCell>
												</CTableRow>
											);
									  })
							}
						/>
					</div>
				</CCol>
				<CCol sm={12}>
					<div className="cases">
						<RemindersDetails
							title={formatMessage({id: 'files'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'cases' ? true : false}
							tab1={formatMessage({id: 'notUsed'})}
							tab2={formatMessage({id: 'withoutAgency'})}
							tab3={formatMessage({id: 'withoutContract'})}
							tab4={formatMessage({id: 'new'})}
							header={ casesHeaderTable}
							tableBody1={
								reminderCases?.FILE_USE.total == 0
									?  translation('notFound')
									: reminderCases?.FILE_USE.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}`)}>
													<CTableHeaderCell>{ele?.cas_number ? ele?.cas_number : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.FIL_CATEGORY_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.FIL_CATEGORY_NAME_EN : ele?.FIL_CATEGORY_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGENTS_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGENTS_EN?.replace('-', ',') : ele?.AGENTS.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>{ele?.ANTS_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.ANTS_EN?.replace('-', ',') : ele?.ANTS?.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>
														{ele?.LAST_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.LAST_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody2={
								reminderCases?.FILE_WITHOUT_AGENCY.total == 0
									?  translation('notFound')
									: reminderCases?.FILE_WITHOUT_AGENCY.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}`)}>
													<CTableHeaderCell>{ele?.cas_number ? ele?.cas_number : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.FIL_CATEGORY_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.FIL_CATEGORY_NAME_EN : ele?.FIL_CATEGORY_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGENTS_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGENTS_EN?.replace('-', ',') : ele?.AGENTS.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>{ele?.ANTS_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.ANTS_EN?.replace('-', ',') : ele?.ANTS?.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>
														{ele?.LAST_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.LAST_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody3={
								reminderCases?.FILE_WITHOUT_CONTRACT.total == 0
									?  translation('notFound')
									: reminderCases?.FILE_WITHOUT_CONTRACT.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}`)}>
													<CTableHeaderCell>{ele?.cas_number ? ele?.cas_number : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.FIL_CATEGORY_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.FIL_CATEGORY_NAME_EN : ele?.FIL_CATEGORY_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGENTS_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGENTS_EN?.replace('-', ',') : ele?.AGENTS.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>{ele?.ANTS_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.ANTS_EN?.replace('-', ',') : ele?.ANTS?.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>
														{ele?.LAST_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.LAST_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody4={
								reminderCases?.FILE_NEW.total == 0
									?  translation('notFound')
									: reminderCases?.FILE_NEW.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}`)}>
													<CTableHeaderCell>{ele?.cas_number ? ele?.cas_number : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.FIL_CATEGORY_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.FIL_CATEGORY_NAME_EN : ele?.FIL_CATEGORY_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.AGENTS_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.AGENTS_EN?.replace('-', ',') : ele?.AGENTS.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>{ele?.ANTS_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.ANTS_EN?.replace('-', ',') : ele?.ANTS?.replace('-', ',') }</CTableDataCell>
													<CTableDataCell>
														{ele?.LAST_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.LAST_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
						/>
					</div>
				</CCol>
				<CCol sm={12}>
					<div className="clients">
						<RemindersDetails
							title={formatMessage({id: 'agents'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'clients' ? true : false}
							tab1={`${formatMessage({id: 'notAttached'})}`}
							tab2={formatMessage({id: 'passport'})}
							tab3={formatMessage({id: 'theIdentity'})}
							tab4={formatMessage({id: 'expiryLicense'})}
							header={clientsHeaderTable}
							tableBody1={
								remiderClients?.CLIENT_ATTACHMENT.total == 0
									?  translation('notFound')
									: remiderClients?.CLIENT_ATTACHMENT.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/profile/${ele?.CLI_ID_PK}`)}>
													<CTableHeaderCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableHeaderCell>
													<CTableDataCell>{ele?.NAT_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.NAT_NAME_EN : ele?.NAT_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.CLI_IDENTITYNO ? ele?.CLI_IDENTITYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_RESIDENCYNO ? ele?.CLI_RESIDENCYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_LICENSE_NO ? ele?.CLI_LICENSE_NO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_SPONSOR_NAME ? ele?.CLI_SPONSOR_NAME : translation('notFound')}</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody2={
								remiderClients?.CLIENT_PASSPORT.total == 0
									?  translation('notFound')
									: remiderClients?.CLIENT_PASSPORT.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/profile/${ele?.CLI_ID_PK}`)}>
													<CTableHeaderCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableHeaderCell>
													<CTableDataCell>{ele?.NAT_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.NAT_NAME_EN : ele?.NAT_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.CLI_IDENTITYNO ? ele?.CLI_IDENTITYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_RESIDENCYNO ? ele?.CLI_RESIDENCYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_LICENSE_NO ? ele?.CLI_LICENSE_NO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_SPONSOR_NAME ? ele?.CLI_SPONSOR_NAME : translation('notFound')}</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody3={
								remiderClients?.CLIENT_IDENTITY.total == 0
									?  translation('notFound')
									: remiderClients?.CLIENT_IDENTITY.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/profile/${ele?.CLI_ID_PK}`)}>
													<CTableHeaderCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableHeaderCell>
													<CTableDataCell>{ele?.NAT_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.NAT_NAME_EN : ele?.NAT_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.CLI_IDENTITYNO ? ele?.CLI_IDENTITYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_RESIDENCYNO ? ele?.CLI_RESIDENCYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_LICENSE_NO ? ele?.CLI_LICENSE_NO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_SPONSOR_NAME ? ele?.CLI_SPONSOR_NAME : translation('notFound')}</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody4={
								remiderClients?.CLIENT_LICENCE.total == 0
									?  translation('notFound')
									: remiderClients?.CCLIENT_LICENCE.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/profile/${ele?.CLI_ID_PK}`)}>
													<CTableHeaderCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableHeaderCell>
													<CTableDataCell>{ele?.NAT_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.NAT_NAME_EN : ele?.NAT_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.CLI_IDENTITYNO ? ele?.CLI_IDENTITYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_RESIDENCYNO ? ele?.CLI_RESIDENCYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_LICENSE_NO ? ele?.CLI_LICENSE_NO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.CLI_SPONSOR_NAME ? ele?.CLI_SPONSOR_NAME : translation('notFound')}</CTableDataCell>
												</CTableRow>
											);
									  })
							}
						/>
					</div>
				</CCol>
				<CCol sm={12}>
					<div className="contracts">
						<RemindersDetails
							title={formatMessage({id: 'contracts'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'contracts' ? true : false}
							tab1={formatMessage({id: 'expired'})}
							tab2={formatMessage({id: 'new'})}
							tab3={formatMessage({id: 'notAttached'})}
							tab4={formatMessage({id: 'paid'})}
							tab5={formatMessage({id: 'stgContract'})}
							header={contractsHeaderTable}
							tableBody1={
								reminderContracts?.CONTRACT_END.total == 0
									?  translation('notFound')
									: reminderContracts?.CONTRACT_END.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/contracts/${ele?.COR_ID_PK}`)}>
													<CTableHeaderCell>{ele?.COR_NUMBER ? ele?.COR_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr'? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.COR_AMOUNT ? ele?.COR_AMOUNT : translation('notFound')}</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_FROM_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_FROM_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_TO_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_TO_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody2={
								reminderContracts?.CONTRACT_NEW.total == 0
									?  translation('notFound')
									: reminderContracts?.CONTRACT_NEW.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/contracts/${ele?.COR_ID_PK}`)}>
													<CTableHeaderCell>{ele?.COR_NUMBER ? ele?.COR_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr'? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.COR_AMOUNT ? ele?.COR_AMOUNT : translation('notFound')}</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_FROM_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_FROM_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_TO_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_TO_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody3={
								reminderContracts?.CONTRACT_ATTCHMENT.total == 0
									?  translation('notFound')
									: reminderContracts?.CONTRACT_ATTCHMENT.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/contracts/${ele?.COR_ID_PK}`)}>
													<CTableHeaderCell>{ele?.COR_NUMBER ? ele?.COR_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr'? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.COR_AMOUNT ? ele?.COR_AMOUNT : translation('notFound')}</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_FROM_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_FROM_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_TO_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_TO_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody4={
								reminderContracts?.CONTRACT_PAYMENT.total == 0
									?  translation('notFound')
									: reminderContracts?.CONTRACT_PAYMENT.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/contracts/${ele?.COR_ID_PK}`)}>
													<CTableHeaderCell>{ele?.COR_NUMBER ? ele?.COR_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr'? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.COR_AMOUNT ? ele?.COR_AMOUNT : translation('notFound')}</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_FROM_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_FROM_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_TO_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_TO_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody5={
								reminderContracts?.CONTRACT_STAGE.total == 0
									?  translation('notFound')
									: reminderContracts?.CONTRACT_STAGE.data.map((ele, index) => {
											return (
												<CTableRow key={index}>
													<CTableHeaderCell>{ele?.COR_NUMBER ? ele?.COR_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr'? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.COR_AMOUNT ? ele?.COR_AMOUNT : translation('notFound')}</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_FROM_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_FROM_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.COR_TO_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.COR_TO_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
						/>
					</div>
				</CCol>
				{/* <CCol sm={12}>
					<div className="diary">
						<RemindersDetails
							title=" الإنابات"
							onClose={() => setVisible(false)}
							visible={showModal == 'diary' ? true : false}
							tab1="بإنتظار الموافقه"
							//   item1=
						/>
					</div>
				</CCol> */}
				<CCol sm={12}>
					<div className="employee">
						<RemindersDetails
							title={formatMessage({id: 'employees'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'employee' ? true : false}
							tab1={formatMessage({id: 'passport'})}
							tab2={formatMessage({id: 'theIdentity'})}
							tab3={formatMessage({id: 'attached'})}
							header={clientsHeaderTable}
							tableBody1={
								reminderEmployee?.EMPLOYEE_PASSPORT.total == 0
									?  translation('notFound')
									: reminderEmployee?.EMPLOYEE_PASSPORT.data.map((ele, index) => {
											return (
												<CTableRow key={index}>
													<CTableHeaderCell>{ele?.EMP_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.EMP_NAME_ENGLISH : ele?.EMP_NAME}</CTableHeaderCell>
													<CTableDataCell>{ele?.NAT_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.NAT_NAME_EN : ele?.NAT_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_IDENTITYNO ? ele?.EMP_IDENTITYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_RESIDENCYNO ? ele?.EMP_RESIDENCYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_LICENSE_NO ? ele?.EMP_LICENSE_NO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_SPONSOR_NAME ? ele?.EMP_SPONSOR_NAME : translation('notFound')}</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody2={
								reminderEmployee?.EMPLOYEE_IDENTITY.total == 0
									?  translation('notFound')
									: reminderEmployee?.EMPLOYEE_IDENTITY.data.map((ele, index) => {
											return (
												<CTableRow key={index}>
													<CTableHeaderCell>{ele?.EMP_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.EMP_NAME_ENGLISH : ele?.EMP_NAME}</CTableHeaderCell>
													<CTableDataCell>{ele?.NAT_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.NAT_NAME_EN : ele?.NAT_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_IDENTITYNO ? ele?.EMP_IDENTITYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_RESIDENCYNO ? ele?.EMP_RESIDENCYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_LICENSE_NO ? ele?.EMP_LICENSE_NO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_SPONSOR_NAME ? ele?.EMP_SPONSOR_NAME : translation('notFound')}</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody3={
								reminderEmployee?.EMPLOYEE_DOCUMENT.total == 0
									?  translation('notFound')
									: reminderEmployee?.EMPLOYEE_DOCUMENT.data.map((ele, index) => {
											return (
												<CTableRow key={index}>
													<CTableHeaderCell>{ele?.EMP_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.EMP_NAME_ENGLISH : ele?.EMP_NAME}</CTableHeaderCell>
													<CTableDataCell>{ele?.NAT_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.NAT_NAME_EN : ele?.NAT_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_IDENTITYNO ? ele?.EMP_IDENTITYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_RESIDENCYNO ? ele?.EMP_RESIDENCYNO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_LICENSE_NO ? ele?.EMP_LICENSE_NO : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.EMP_SPONSOR_NAME ? ele?.EMP_SPONSOR_NAME : translation('notFound')}</CTableDataCell>
												</CTableRow>
											);
									  })
							}
						/>
					</div>
				</CCol>
				<CCol sm={12}>
					<div className="execute">
						<RemindersDetails
							title={formatMessage({id: 'procedings'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'execute' ? true : false}
							tab1={formatMessage({id: 'updated'})}
							header={executeHeaderTable}
							tableBody1={
								reminderExecute?.EXECUTE_DURATION.total == 0
									?  translation('notFound')
									: reminderExecute?.EXECUTE_DURATION.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}/execute/${ele?.EXE_ID_PK}`)}>
													<CTableHeaderCell>{ele?.CAS_NUMBER ? ele?.CAS_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH  && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.FULL_STAGE_NAME_EN  && document.body.getAttribute('dir') == 'ltr' ? ele?.FULL_STAGE_NAME_EN : ele?.FULL_STAGE_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.EXE_PROCEDURE_NAME_EN  && document.body.getAttribute('dir') == 'ltr' ? ele?.EXE_PROCEDURE_NAME_EN : ele?.EXE_PROCEDURE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.EXE_TYPE_NAME_EN  && document.body.getAttribute('dir') == 'ltr' ? ele?.EXE_TYPE_NAME_EN : ele?.EXE_TYPE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.EXE_STATUS_NAME_EN  && document.body.getAttribute('dir') == 'ltr' ? ele?.EXE_STATUS_NAME_EN : ele?.EXE_STATUS_NAME }</CTableDataCell>
												</CTableRow>
											);
									  })
							}
						/>
					</div>
				</CCol>
				<CCol sm={12}>
					<div className="follow">
						<RemindersDetails
							title={formatMessage({id: 'followUp'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'follow' ? true : false}
							tab1={formatMessage({id: 'resultFollowUp'})}
							// item1=
						/>
					</div>
				</CCol>
				<CCol sm={12}>
					<div className="sessions">
						<RemindersDetails
							title={formatMessage({id: 'sessions'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'sessions' ? true : false}
							tab1={formatMessage({id: 'updated'})}
							tab2={formatMessage({id: 'notUpdated'})}
							tab3={formatMessage({id: 'replayed'})}
							tab4={formatMessage({id: 'notAttached'})}
							header={sessionHeaderTable}
							tableBody1={
								reminderSession?.SESSION_REMINDER.total == 0
									?  translation('notFound')
									: reminderSession?.SESSION_REMINDER.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>
													<CTableHeaderCell>{ele?.cas_number ? ele?.cas_number : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.FULL_STAGE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.FULL_STAGE_NAME_EN : ele?.FULL_STAGE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.SES_PLACE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.SES_PLACE_NAME_EN : ele?.SES_PLACE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.COU_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.COU_NAME_EN : ele?.COU_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.OFC_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.OFC_NAME_EN : ele?.OFC_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.SES_ROLL_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.SES_ROLL_NAME_EN : ele?.SES_ROLL_NAME }</CTableDataCell>
													<CTableDataCell>
														{ele?.SES_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.SES_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody2={
								reminderSession?.SESSION_UNREFRESH.total == 0
									?  translation('notFound')
									: reminderSession?.SESSION_UNREFRESH.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>
													<CTableHeaderCell>{ele?.cas_number ? ele?.cas_number : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.FULL_STAGE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.FULL_STAGE_NAME_EN : ele?.FULL_STAGE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.SES_PLACE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.SES_PLACE_NAME_EN : ele?.SES_PLACE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.COU_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.COU_NAME_EN : ele?.COU_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.OFC_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.OFC_NAME_EN : ele?.OFC_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.SES_ROLL_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.SES_ROLL_NAME_EN : ele?.SES_ROLL_NAME }</CTableDataCell>
													<CTableDataCell>
														{ele?.SES_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.SES_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody3={
								reminderSession?.SESSION_REPLAY.total == 0
									?  translation('notFound')
									: reminderSession?.SESSION_REPLAY.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>
													<CTableHeaderCell>{ele?.cas_number ? ele?.cas_number : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.FULL_STAGE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.FULL_STAGE_NAME_EN : ele?.FULL_STAGE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.SES_PLACE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.SES_PLACE_NAME_EN : ele?.SES_PLACE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.COU_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.COU_NAME_EN : ele?.COU_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.OFC_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.OFC_NAME_EN : ele?.OFC_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.SES_ROLL_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.SES_ROLL_NAME_EN : ele?.SES_ROLL_NAME }</CTableDataCell>
													<CTableDataCell>
														{ele?.SES_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.SES_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody4={
								reminderSession?.SESSION_ATTACHMENT.total == 0
									?  translation('notFound')
									: reminderSession?.SESSION_ATTACHMENT.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}/session/${ele?.SES_ID_PK}`)}>
													<CTableHeaderCell>{ele?.cas_number ? ele?.cas_number : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.FULL_STAGE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.FULL_STAGE_NAME_EN : ele?.FULL_STAGE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.SES_PLACE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.SES_PLACE_NAME_EN : ele?.SES_PLACE_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.COU_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.COU_NAME_EN : ele?.COU_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.OFC_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.OFC_NAME_EN : ele?.OFC_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.SES_ROLL_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.SES_ROLL_NAME_EN : ele?.SES_ROLL_NAME }</CTableDataCell>
													<CTableDataCell>
														{ele?.SES_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.SES_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
						/>
					</div>
				</CCol>
				<CCol sm={12}>
					<div className="warning">
						<RemindersDetails
							title={formatMessage({id: 'warnings'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'warning' ? true : false}
							tab1={formatMessage({id: 'updated'})}
							tab2={formatMessage({id: 'delayed'})}
							header={WarningHeaderTable}
							tableBody1={
								reminderWarning?.WARRNING_DURATION.total == 0
									?  translation('notFound')
									: reminderWarning?.WARRNING_DURATION.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}/warning/${ele?.WRN_ID_PK}`)}>
													<CTableHeaderCell>{ele?.CAS_NUMBER ? ele?.CAS_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.WRN_NUMBER ? ele?.WRN_NUMBER : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.WRN_METHOD_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.WRN_METHOD_NAME_EN : ele?.WRN_METHOD_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.WRN_STATUS_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.WRN_STATUS_NAME_EN : ele?.WRN_STATUS_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.WRN_DURATION ? ele?.WRN_DURATION : translation('notFound')}</CTableDataCell>
													<CTableDataCell>
														{ele?.WRN_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.WRN_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.WRN_ENDDATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.WRN_ENDDATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody2={
								reminderWarning?.WARRNING_DURATION_OVER.total == 0
									?  translation('notFound')
									: reminderWarning?.WARRNING_DURATION_OVER.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}/warning/${ele?.WRN_ID_PK}`)}>
													<CTableHeaderCell>{ele?.CAS_NUMBER ? ele?.CAS_NUMBER : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.WRN_NUMBER ? ele?.WRN_NUMBER : translation('notFound')}</CTableDataCell>
													<CTableDataCell>{ele?.WRN_METHOD_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.WRN_METHOD_NAME_EN : ele?.WRN_METHOD_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.WRN_STATUS_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.WRN_STATUS_NAME_EN : ele?.WRN_STATUS_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.WRN_DURATION ? ele?.WRN_DURATION : translation('notFound')}</CTableDataCell>
													<CTableDataCell>
														{ele?.WRN_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.WRN_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.WRN_ENDDATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.WRN_ENDDATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
						/>
					</div>
				</CCol>
				<CCol sm={12}>
					<div className="Work">
						<RemindersDetails
							title={formatMessage({id: 'worksManagement'})}
							onClose={() => setVisible(false)}
							visible={showModal == 'work' ? true : false}
							tab1={formatMessage({id: 'updated'})}
							tab2={formatMessage({id: 'notUpdated'})}
							header={WorkHeaderTable}
							tableBody1={
								reminderWork?.WORK_REMINDER.total == 0
									?  translation('notFound')
									: reminderWork?.WORK_REMINDER.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>
													<CTableHeaderCell>{ele?.cas_number ? ele?.cas_number : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.WRK_KIND_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.WRK_KIND_NAME_EN : ele?.WRK_KIND_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.COU_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.COU_NAME_EN : ele?.COU_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.STATUS_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.STATUS_NAME_EN : ele?.STATUS_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.WRK_TYPE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.WRK_TYPE_NAME_EN : ele?.WRK_TYPE_NAME }</CTableDataCell>
													<CTableDataCell>
														{ele?.SES_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.SES_DATE)) : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.STATUS_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.STATUS_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
							tableBody2={
								reminderWork?.WORK_UNREFRESH.total == 0
									?  translation('notFound')
									: reminderWork?.WORK_UNREFRESH.data.map((ele, index) => {
											return (
												<CTableRow key={index} onClick={() => Navigate(`/file-management/${ele?.CAS_ID_PK}/work/${ele?.WRK_ID_PK}`)}>
													<CTableHeaderCell>{ele?.cas_number ? ele?.cas_number : translation('notFound')}</CTableHeaderCell>
													<CTableDataCell>{ele?.CLI_NAME_ENGLISH && document.body.getAttribute('dir') == 'ltr' ? ele?.CLI_NAME_ENGLISH : ele?.CLI_NAME}</CTableDataCell>
													<CTableDataCell>{ele?.WRK_KIND_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.WRK_KIND_NAME_EN : ele?.WRK_KIND_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.COU_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.COU_NAME_EN : ele?.COU_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.STATUS_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.STATUS_NAME_EN : ele?.STATUS_NAME }</CTableDataCell>
													<CTableDataCell>{ele?.WRK_TYPE_NAME_EN && document.body.getAttribute('dir') == 'ltr' ? ele?.WRK_TYPE_NAME_EN : ele?.WRK_TYPE_NAME }</CTableDataCell>
													<CTableDataCell>
														{/* {console.log(ele?.SES_DATE, ele?.STATUS_DATE)} */}
														{ele?.SES_DATE ? ele?.SES_DATE : translation('notFound')}
													</CTableDataCell>
													<CTableDataCell>
														{ele?.STATUS_DATE ? new Intl.DateTimeFormat('en-US').format(new Date(ele?.STATUS_DATE)) : translation('notFound')}
													</CTableDataCell>
												</CTableRow>
											);
									  })
							}
						/>
					</div>
				</CCol>
			</CRow>
			{/* <div className="arrowClick"><CIcon style={{height:'20px'}} icon={cilChevronTop} customClassName="nav-icon" /></div> */}
		</div>
	);
};

export default React.memo(Reminders);
