import React from 'react'
import './index.css'
import { Card, Image } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import { Ticket, Transfer, Trade, Security, Key } from '../../assets'

const Demand: React.FC<{}> = () => {
  return (
    <>
      <div className="mb-8 flex space-x-2">
        <p className="pl-3 pt-2 text-5xl" style={{ color: '#0D5870' }}>
          Demand
        </p>
      </div>
      <Card
        title={
          <div
            className="text-2xl"
            style={{ fontWeight: 'bold', color: '#0A3D53' }}
          >
            Automatic Trading
          </div>
        }
        extra={<RightOutline style={{ color: '#1677ff', fontSize: '24px' }} />}
        style={{ borderRadius: '16px' }}
      >
        <div className="flex flex-row items-center justify-between">
          <Image src={Ticket} className="mb-2" height={90} width={118} />
          <div
            className="text-left text-xl"
            style={{
              color: '#0A3D53',
              marginLeft: '10px',
              width: '90%',
            }}
          >
            Swap and stake the tokens with the highest annual return
          </div>
        </div>
        <div className="mt-5 flex flex-row items-center justify-around">
          <div
            className="text-center text-xl"
            style={{
              fontWeight: 'bold',
              color: '#5D9D1D',
            }}
          >
            +5.1%
          </div>
          <div
            className="text-center text-lg"
            style={{
              color: '#5D9D1D',
            }}
          >
            +3.6%
          </div>
          <div
            className="text-center text-xl"
            style={{
              fontWeight: 'bold',
              color: '#5D9D1D',
            }}
          >
            +8.7%
          </div>
        </div>
        <div className="flex flex-row items-center justify-around">
          <div
            className="text-center text-xl"
            style={{
              fontWeight: 'bold',
              color: '#0A3D53',
              marginLeft: '15%',
            }}
          >
            +
          </div>
          <div
            className="text-center text-xl"
            style={{
              fontWeight: 'bold',
              color: '#0A3D53',
              marginRight: '15%',
            }}
          >
            =
          </div>
        </div>
        <div className="flex flex-row items-center justify-around">
          <div
            className="text-center text-xl"
            style={{
              color: '#9D1D1D',
            }}
          >
            -1.3%
          </div>
          <div
            className="text-center text-lg"
            style={{
              color: '#9D1D1D',
              fontWeight: 'bold',
            }}
          >
            -0.8%
          </div>
          <div
            className="text-center text-xl"
            style={{
              color: '#9D1D1D',
              fontWeight: 'bold',
            }}
          >
            -2.1%
          </div>
        </div>
        <div className="mt-2 flex flex-row items-center justify-around">
          <div
            className="text-center text-xl"
            style={{
              color: '#0A3D53',
            }}
          >
            $ARB
          </div>
          <div
            className="text-center text-lg"
            style={{
              color: '#0A3D53',
            }}
          >
            $UNI
          </div>
          <div
            className="text-center text-xl"
            style={{
              color: '#0A3D53',
            }}
          >
            sum
          </div>
        </div>
      </Card>
      <div className="mt-10 flex flex-row items-center justify-around">
        <div className="demand-btn">
          <Image src={Transfer} height={33} width={38} />
          <div className="btn-txt">Token Transfer</div>
        </div>
        <div className="demand-btn">
          <Image src={Trade} height={35} width={40} />
          <div className="btn-txt">Trade to Earn</div>
        </div>
      </div>
      <div className="mt-10 flex flex-row items-center justify-around">
        <div className="demand-btn">
          <Image src={Key} height={30} width={40} />
          <div className="btn-txt">Login & Recovery</div>
        </div>
        <div className="demand-btn">
          <Image src={Security} height={40} width={60} />
          <div className="btn-txt">Security & Privacy</div>
        </div>
      </div>
      <div
        className="mt-10 flex flex-row"
        style={{
          fontWeight: 'bold',
          fontSize: '18px',
          color: '#0A3D53',
        }}
      >
        More...
      </div>
      <div className="bottom-btn mt-10">Type What would you want</div>
    </>
  )
}

export default Demand
