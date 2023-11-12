import React from 'react'
import { Link } from 'react-router-dom'

import { Image } from 'antd-mobile'

import { routes } from '../../pages/Router'

const ToolBar: React.FC<{}> = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: '#363636',
          zIndex: 999,
          position: 'fixed',
          bottom: 0,
        }}
        className="h-42 flex w-full justify-between px-2"
      >
        {routes
          .filter((i) => i.nav)
          .map((route) => (
            <Link to={route.path} key={route.label}>
              <div className="flex flex-1 flex-col items-center justify-center py-2">
                <Image src={route.icon} className="h-18 mb-2 w-20 px-4" />
                <div className="text-center text-xl">{route.description}</div>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}

export default ToolBar
