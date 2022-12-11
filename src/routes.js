import React from 'react'
import translation from "./i18n/translate"

// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Contacts = React.lazy(() => import('./pages/contacts'))
const Contracts = React.lazy(() => import('./pages/contracts'))
const Agencies = React.lazy(() => import('./pages/agences'))
const FileManagement = React.lazy(() => import('./pages/filesManagment'))
const FileDetails = React.lazy(() => import('./pages/fileDetails'))
const Profile = React.lazy(() => import('./pages/proflie'))
const Graph = React.lazy(() => import('./components/fileManagement/flowChart/react-flow'))
const Reminders = React.lazy(() => import('./pages/reminder'))
const TheCharts = React.lazy(() => import('./pages/charts'))
const Home = React.lazy(() => import('./pages/home'))
const Reports = React.lazy(() => import('./pages/reports'))
const Appiontments = React.lazy(() => import('./pages/appiontments'))
const Schedule = React.lazy(() => import('./pages/schedule'))
const DailyUpdate = React.lazy(() => import('./pages/dialyUpdate'))
const Agency = React.lazy(() => import('./components/reminders/agency'))
const Contract = React.lazy(() => import('./components/reminders/contract'))
const Execute = React.lazy(() => import('./components/reminders/execute'))
const Session = React.lazy(() => import('./components/reminders/session')) 
const Warning = React.lazy(() => import('./components/reminders/warning')) 
const Work = React.lazy(() => import('./components/reminders/work')) 
const Works = React.lazy(() => import('./pages/works')) 
const BarChart = React.lazy(() => import('./pages/barChart')) 

const routes = [
  { path: '/', exact: true, name: translation('home'), element: Home },
  // { path: '/dashboard', name: translation('dashboard'), element: Dashboard },
  { path: '/contacts', name: translation('contacts'), element: Contacts },
  { path: '/contracts', name: translation('contracts'), element: Contracts },
  { path: '/contracts/:id', name: translation('details'), element: Contracts },
  { path: '/agenceis', name:translation('agencies'), element: Agencies },
  { path: '/agenceis/:id', name: translation('details'), element: Agencies },
  { path: '/reminders', name: translation('remiders'), element: Reminders },
  { path: '/chart', name: translation('charts'), element: TheCharts },
  { path: '/file-management',exact: true, name: translation('Filemanagement'), element: FileManagement },
  { path: '/file-management/:id',exact: true, name: translation('details'), element: FileDetails },
  { path: '/file-management/:id/:name/:speicifiedId',exact: true, name: translation('details'), element: FileDetails },
  { path: '/file-management/:id/graph',exact: true, name: translation('stagechart'), element: Graph },
  { path: '/Profile/:id',exact: true, name: translation('profile'), element: Profile },
  { path: '/reports/:name',exact: true, name: translation('theReports'), element: Reports },
  { path: '/appiontment', name: translation('appiontments'), element: Appiontments },
  { path: '/dailyUpdate', name: translation('dailyUpdates'), element: DailyUpdate },
  { path: '/schedule', name: translation('schedule'), element: Schedule },
  {path: '/agency/:id', name: translation('details') , element: Agency},
  {path: '/contract/:id', name: translation('details') , element: Contract},
  {path: '/execute/:id', name: translation('details') , element: Execute},
  {path: '/session/:id', name: translation('details') , element: Session},
  {path: '/warning/:id', name: translation('details') , element: Warning},
  {path: '/work/:id', name: translation('details') , element: Work},
  {path: '/works', name: translation('worksManagement'), element: Works},
  {path: '/barChart/:name', name: translation('charts') , element: BarChart},
  
]

export default routes
