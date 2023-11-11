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
        className="flex w-full justify-between xs:h-[112px] md:h-[160px]"
      >
        {routes
          .filter((i) => i.nav)
          .map((route) => (
            <Link to={route.path} key={route.label}>
              <div className="flex flex-col items-center justify-center xs:h-[120px] xs:w-[127px] md:h-[160px] md:w-[193px]">
                <Image
                  src={route.icon}
                  className="mb-2 xs:h-[53px] xs:w-[53px] md:h-[83px] md:w-[83px]"
                />
                <div className="text-center text-xl">{route.description}</div>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}

export default ToolBar
