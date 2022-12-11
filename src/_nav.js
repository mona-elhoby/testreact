import React from 'react';
import CIcon from '@coreui/icons-react';
import {
	cilBell,
	cilChartPie,
	cilNotes,
	cilLibrary,
	cilAddressBook,
	cilDiamond,
	cilSpeedometer,
	cilIndustry,
	cilCalendarCheck,
	cilCalendar,
	cilGrid,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';

import translation from "./i18n/translate"

const _nav = [
	{
		component: CNavItem,
		name: translation('dashboard'),
		to: '/',
		icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
		badge: {
			color: 'info',
			// text: 'NEW',
		},
	},
	{
		component: CNavItem,
		name: translation('contacts'),
		to: '/contacts',
		icon: <CIcon icon={cilAddressBook}  customClassName="nav-icon" />,
	},
	{
		component: CNavItem,
		name: translation('agencies'),
		to: '/agenceis',
		icon: <CIcon icon={cilDiamond} customClassName="nav-icon" />,
	},
	{
		component: CNavItem,
		name: translation('contracts'),
		to: '/contracts',
		icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
	},
	{
		component: CNavItem,
		name: translation('Filemanagement'),
		to: '/file-management',
		icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
	},
	{
		component: CNavItem,
		name: translation('worksManagement'),
		to: '/works',
		icon: <ApartmentRoundedIcon style={{ marginLeft: '10px', height: '1.7rem', width: '1.7rem' }} />,
	},
	{
		component: CNavGroup,
		name: translation('theReports'),
		icon: <CIcon icon={cilIndustry} customClassName="nav-icon" />,
		items: [
			// {
			//   component: CNavGroup,
			//   name: ' ملفات تحصيل',
			//   to: '/icons/coreui-icons',
			//   icon: <CIcon icon={cilStar} height={18} customClassName="nav-icon" />,
			//   items: [
			//     {
			//       component: CNavItem,
			//       name: 'تقرير الملفات',
			//       to: '/reports/outcomeFiles',
			//     },
			//     {
			//       component: CNavItem,
			//       name: 'تقرير الشيكات',
			//       to: '/reports/outcomesCheeks',
			//     },
			//     {
			//       component: CNavItem,
			//       name: 'تقرير التحصيلات',
			//       to: '/reports/outcomesReports',
			//     },
			//     {
			//       component: CNavItem,
			//       name: 'تقرير موافقات العميل',
			//       to: '/reports/clientsAccepts',
			//     },
			//     {
			//       component: CNavItem,
			//       name: 'تقرير المديونيه التجارى',
			//       to: '/reports/indebt',
			//     },
			//     {
			//       component: CNavItem,
			//       name: 'تقرير إجراءات التحصيل',
			//       to: '/reports/outcomesExecute',
			//     },
			//     {
			//       component: CNavItem,
			//       name: 'تقرير التسويات الماليه',
			//       to: '/reports/setteled',
			//     },
			//   ]
			// },
			{
				component: CNavItem,
				name: translation('filesreports'),
				to: '/reports/files',
			},
			{
				component: CNavItem,
				name: translation('stgesreports'),
				to: '/reports/cases',
			},
			{
				component: CNavItem,
				name: translation('sessionsreports'),
				to: '/reports/sessions',
			},
			{
				component: CNavItem,
				name: translation('notesreports'),
				to: '/reports/notes',
			},
			{
				component: CNavItem,
				name: translation('warningsreports'),
				to: '/reports/warning',
			},
			{
				component: CNavItem,
				name: translation('executesreports'),
				to: '/reports/execute',
			},
			{
				component: CNavItem,
				name: translation('informingsreports'),
				to: '/reports/informs',
			},
			{
				component: CNavItem,
				name: translation('chequesreports'),
				to: '/reports/cheeks',
			},
			{
				component: CNavItem,
				name: translation('accountsreports'),
				to: '/reports/calculations',
			},
			{
				component: CNavItem,
				name: translation('consultingsreports'),
				to: '/reports/consultation',
			},
			{
				component: CNavItem,
				name: translation('costsreports'),
				to: '/reports/costs',
			},
			{
				component: CNavItem,
				name: translation('attachmentsreports'),
				to: '/reports/attaches',
			},
		],
	},
	{
		component: CNavItem,
		name: translation('remiders'),
		to: '/reminders',
		icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
	},
	{
		component: CNavGroup,
		name: translation('charts'),
		to: '/chart',
		icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
		items: [
			{
				component: CNavItem,
				name: translation('account'),
				to: '/barChart/account',
			},
			{
				component: CNavItem,
				name: translation('file'),
				to: '/barChart/file',
			},
			{
				component: CNavItem,
				name: translation('session'),
				to: '/barChart/session',
			},
			{
				component: CNavItem,
				name: translation('stage'),
				to: '/barChart/stage',
			},
			{
				component: CNavItem,
				name: translation('work'),
				to: '/barChart/work',
			},
			{
				component: CNavItem,
				name: translation('chart'),
				to: '/chart',
			}
		]
	},
	{
		component: CNavItem,
		name: translation('appiontments'),
		to: '/appiontment',
		icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
	},
	{
		component: CNavItem,
		name: translation('schedule'),
		to: '/schedule',
		icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
	},
	{
		component: CNavItem,
		name: translation('dailyUpdates'),
		to: '/dailyUpdate',
		icon: <CIcon icon={cilCalendarCheck} customClassName="nav-icon" />,
	},
	
	// {
	//   component: CNavItem,
	//   name: 'Colors',
	//   to: '/theme/colors',
	//   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
	// },
	// {
	//   component: CNavItem,
	//   name: 'Typography',
	//   to: '/theme/typography',
	//   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
	// },
	// {
	// 	component: CNavGroup,
	// 	name: 'Base',
	// 	to: '/base',
	// 	icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
	// 	items: [
	// 		{
	// 			component: CNavItem,
	// 			name: 'Accordion',
	// 			to: '/base/accordion',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Breadcrumb',
	// 			to: '/base/breadcrumbs',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Cards',
	// 			to: '/base/cards',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Carousel',
	// 			to: '/base/carousels',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Collapse',
	// 			to: '/base/collapses',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'List group',
	// 			to: '/base/list-groups',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Navs & Tabs',
	// 			to: '/base/navs',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Pagination',
	// 			to: '/base/paginations',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Placeholders',
	// 			to: '/base/placeholders',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Popovers',
	// 			to: '/base/popovers',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Progress',
	// 			to: '/base/progress',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Spinners',
	// 			to: '/base/spinners',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Tables',
	// 			to: '/base/tables',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Tooltips',
	// 			to: '/base/tooltips',
	// 		},
	// 	],
	// },
	// {
	// 	component: CNavGroup,
	// 	name: 'Buttons',
	// 	to: '/buttons',
	// 	icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
	// 	items: [
	// 		{
	// 			component: CNavItem,
	// 			name: 'Buttons',
	// 			to: '/buttons/buttons',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Buttons groups',
	// 			to: '/buttons/button-groups',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Dropdowns',
	// 			to: '/buttons/dropdowns',
	// 		},
	// 	],
	// },
	// {
	// 	component: CNavGroup,
	// 	name: 'Forms',
	// 	icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
	// 	items: [
	// 		{
	// 			component: CNavItem,
	// 			name: 'Form Control',
	// 			to: '/forms/form-control',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Select',
	// 			to: '/forms/select',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Checks & Radios',
	// 			to: '/forms/checks-radios',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Range',
	// 			to: '/forms/range',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Input Group',
	// 			to: '/forms/input-group',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Floating Labels',
	// 			to: '/forms/floating-labels',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Layout',
	// 			to: '/forms/layout',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Validation',
	// 			to: '/forms/validation',
	// 		},
	// 	],
	// },
	// {
	// 	component: CNavItem,
	// 	name: 'Charts',
	// 	to: '/charts',
	// 	icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
	// },
	// {
	// 	component: CNavGroup,
	// 	name: 'Icons',
	// 	icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
	// 	items: [
	// 		{
	// 			component: CNavItem,
	// 			name: 'CoreUI Free',
	// 			to: '/icons/coreui-icons',
	// 			badge: {
	// 				color: 'success',
	// 				text: 'NEW',
	// 			},
	// 			icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'CoreUI Flags',
	// 			to: '/icons/flags',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'CoreUI Brands',
	// 			to: '/icons/brands',
	// 		},
	// 	],
	// },
	// {
	// 	component: CNavGroup,
	// 	name: 'Notifications',
	// 	icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
	// 	items: [
	// 		{
	// 			component: CNavItem,
	// 			name: 'Alerts',
	// 			to: '/notifications/alerts',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Badges',
	// 			to: '/notifications/badges',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Modal',
	// 			to: '/notifications/modals',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Toasts',
	// 			to: '/notifications/toasts',
	// 		},
	// 	],
	// },
	// {
	// 	component: CNavItem,
	// 	name: 'Widgets',
	// 	to: '/widgets',
	// 	icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
	// 	badge: {
	// 		color: 'info',
	// 		text: 'NEW',
	// 	},
	// },
	// {
	// 	component: CNavTitle,
	// 	name: 'Extras',
	// },
	// {
	// 	component: CNavGroup,
	// 	name: 'Pages',
	// 	icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
	// 	items: [
	// 		{
	// 			component: CNavItem,
	// 			name: 'Login',
	// 			to: '/login',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Register',
	// 			to: '/register',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Error 404',
	// 			to: '/404',
	// 		},
	// 		{
	// 			component: CNavItem,
	// 			name: 'Error 500',
	// 			to: '/500',
	// 		},
	// 	],
	// },
];

export default _nav;
