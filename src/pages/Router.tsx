import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AppLayout from 'layouts/AppLayout'

import { IosAppsIcon, SettingsIcon, WalletIcon } from '../assets'

import { Demand, Home, Settings } from './index'

// import Redeem from './Redeem/Redeem'
// import Send from './Send/Send'
// import Transactions from './Transactions/Transactions'

export interface RouteConfig {
  path: string
  label: string
  component: React.ComponentType
  nav: boolean
  icon?: string
  description?: string
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    label: 'Home',
    component: Home,
    nav: true,
    icon: WalletIcon,
    description: 'Wallet',
  },
  {
    path: '/demand',
    label: 'Demand',
    component: Demand,
    nav: true,
    icon: IosAppsIcon,
    description: 'Demand',
  },
  {
    path: '/settings',
    label: 'Settings',
    component: Settings,
    nav: true,
    icon: SettingsIcon,
    description: 'Settings',
  },
]

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => {
        const Page = route.component
        return <Route key={route.path} path={route.path} element={<Page />} />
      })}
    </Routes>
  )
}

function Router() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </BrowserRouter>
  )
}

export default Router
