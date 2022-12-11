
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'

import requestMiddleware from './middlewareRefreshToken'
import sidebarReducer from './reducers/sidebar';
import fileManagementReducer from './reducers/file-management';
import reminderDataSlice from './reducers/reminderData';
import agencyReducer from './reducers/agency';
import contractSlice from './reducers/contract';
import ContactSlice from './reducers/contacts';
import constantSlice from './reducers/theConstants';
import employeeSlice from './reducers/emlpoyee';
import sessionSlice from './reducers/session';
import stageSlice from './reducers/stage';
import workSlice from './reducers/work';
import warningSlice from './reducers/warnings';
import informingSlice from './reducers/informings';
import executeSlice from './reducers/execute.js';
import dailyUpdateSlice from "./reducers/dailyUpdate";
import scheduleSlice from "./reducers/schedule";
import appiontmentsSlice from "./reducers/appiontments"
import chartSlice from './reducers/chart'
import executConstants from './reducers/constants/executs'
import authSlice from './reducers/auth'
import warningConstantSlice from './reducers/constants/warning'
import constantWorkSlice from './reducers/constants/work'
import constantSessionSlice from './reducers/constants/session'
import contactConstantSlice from './reducers/constants/contact'
import informingConstantSlice from './reducers/constants/informings'
import invoiceSlice from './reducers/invoice'
import handleErrors from './reducers/error'
import Consultionslice from './reducers/consultions'
import ConsultionsConstants from './reducers/constants/consultion'
import VoucherConstants from './reducers/constants/voucher'
import Taskslice from "./reducers/task"
import TaskConstants from "./reducers/constants/task"
import CasesConstants from "./reducers/constants/cases"
import StageConstants from "./reducers/constants/stage"
import AgencyConstant from "./reducers/constants/agency"
import ContractConstant from "./reducers/constants/contract"
import Voucher from "./reducers/voucher"

export const store = configureStore({
	reducer: {
		user: authSlice,
		changeState: sidebarReducer,
		fileManagement: fileManagementReducer,
		reminderData: reminderDataSlice,
		agency: agencyReducer,
		contract: contractSlice,
		theConstants: constantSlice,
		contact: ContactSlice,
		employee: employeeSlice,
		session: sessionSlice,
		stage: stageSlice,
		work: workSlice,
		warning: warningSlice,
		informing: informingSlice,
		execute: executeSlice,
		dailyUpdate: dailyUpdateSlice,
		schedule: scheduleSlice,
		appiontments: appiontmentsSlice,
		chart: chartSlice,
		executeConstraint: executConstants,
		warningConstant: warningConstantSlice,
		workConstraint: constantWorkSlice,
		sessionConstraint: constantSessionSlice,
		contactConstraint: contactConstantSlice,
		informingConstraint: informingConstantSlice,
		invoices: invoiceSlice,
		globalErrors: handleErrors,
		Consultion : Consultionslice,
		ConsultionsConstants: ConsultionsConstants,
		VoucherConstants: VoucherConstants,
		task: Taskslice,
		taskContant: TaskConstants,
		CasesConstants: CasesConstants,
		StageConstants: StageConstants,
		AgencyConstant: AgencyConstant,
		ContractConstant: ContractConstant,
		Voucher: Voucher
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),.concat(requestMiddleware())
});

// middleware = [...middleware, c, d]