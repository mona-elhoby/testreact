import React from 'react'
import { useLocation } from 'react-router-dom'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

import routes from '../../routes'
import translation from '../../i18n/translate'


const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    // console.log(pathname)
    if(pathname.includes("file-management/graph")){
      return translation('stagechart')
    }
    if(pathname.includes("/work")){
      return translation('work')
    }
    if(pathname.includes("/session")){
      return translation('sessions')
    }
    if(pathname.includes("file-management/")){
      return translation('file')
    }
    if(pathname.includes("reports/cases")){
      return translation('stgesreports')
    }
    if(pathname.includes("reports/files")){
      return translation('filesreports')
    }
    if(pathname.includes("reports/sessions")){
      return translation('sessionsreports')
    }
    if(pathname.includes("reports/judgements")){
      return "تقرير الأحكام "
    }
    if(pathname.includes("reports/replays")){
      return "تقرير الردود "
    }
    if(pathname.includes("reports/notes")){
      return translation('notesreports')
    }
    if(pathname.includes("reports/warning")){
      return translation('warningsreports')
    }
    if(pathname.includes("reports/execute")){
      return translation('executesreports')
    }
    if(pathname.includes("reports/informs")){
      return translation('informingsreports')
    }
    if(pathname.includes("reports/outcomeFiles")){
      return "ملفات التحصيل / تقرير الملفات "
    }
    if(pathname.includes("reports/consultation")){
      return translation('consultingsreports')
    }
    if(pathname.includes("reports/outcomesCheeks")){
      return "ملفات التحصيل / تقرير الشيكات "
    }
    if(pathname.includes("reports/outcomesReports")){
      return "ملفات التحصيل / تقرير التحصيلات "
    }
    if(pathname.includes("reports/clientsAccepts")){
      return "ملفات التحصيل / تقرير موافقات العميل "
    }
    if(pathname.includes("reports/indebt")){
      return "ملفات التحصيل / تقرير  المديونيه التجاري"
    }
    if(pathname.includes("reports/outcomesExecute")){
      return "ملفات التحصيل / تقرير إجراءات التحصيل"
    }
    if(pathname.includes("reports/setteled")){
      return "ملفات التحصيل / تقرير التسويات الماليه"
    }
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/">{translation('home')}</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
