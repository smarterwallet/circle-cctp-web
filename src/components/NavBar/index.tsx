/* eslint-disable tailwindcss/classnames-order */
import React from 'react'

import { Image } from 'antd-mobile'

import { BotIcon, BridgeIcon, IosAppsIcon, WalletIcon } from '../../assets'
// import AppsIcon from '../../'

const NavBar: React.FC<{}> = () => {
  return (
    <>
      <div className="mb-8 flex space-x-2">
        <Image
          src={WalletIcon}
          className="xs:h-[60px] xs:w-[60px] md:h-[90px] md:w-[90px]"
        />
        <p className="xs:pt-4 md:pt-7 xs:text-4xl md:text-6xl">Welcome!</p>
      </div>
      <p className="color: rgba(255,255,255,1) mb-8 flex space-x-2 xs:text-3xl md:text-7xl">
        Directly express what you want in crypto, and we can get and meet them
        for you
      </p>
      <div className="mb-8 flex justify-between">
        <div className="xs:h-[120px] xs:w-[127px] md:h-[200px] md:w-[193px] flex flex-col items-center justify-center">
          <Image
            src={IosAppsIcon}
            className="xs:h-[60px] xs:w-[60px] md:h-[90px] md:w-[90px] mb-2"
          />
          <div className="text-xl text-center">Intent-centric</div>
        </div>
        <div className="xs:h-[120px] xs:w-[127px] md:h-[200px] md:w-[193px] flex flex-col items-center justify-center">
          <Image
            src={BotIcon}
            className="xs:h-[60px] xs:w-[60px] md:h-[90px] md:w-[90px] mb-2"
          />
          <div className="text-xl text-center">Automated trading bot</div>
        </div>
        <div className="xs:h-[120px] xs:w-[127px] md:h-[200px] md:w-[193px] flex flex-col items-center justify-center">
          <Image
            src={BridgeIcon}
            className="xs:h-[60px] xs:w-[60px] md:h-[90px] md:w-[90px] mb-2"
          />
          <div className="text-xl text-center">Seamless cross-chain</div>
        </div>
      </div>
    </>
  )
}

export default NavBar
