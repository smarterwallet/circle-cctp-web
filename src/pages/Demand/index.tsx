import './index.css'
import React, { useState } from 'react'
import { Card, Image } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'
import { Ticket, Transfer, Trade, Security, Key } from '../../assets'

const Demand: React.FC<{}> = () => {
  const [btnList, setBtnList] = useState([
    {
      btnText: 'Token Transfer',
      btnImage: Transfer,
      btnWidth: 38,
      btnHeight: 33,
      btnSelected: false,
    },
    {
      btnText: 'Trade to Earn',
      btnImage: Trade,
      btnWidth: 40,
      btnHeight: 35,
      btnSelected: false,
    },
    {
      btnText: 'Login & Recovery',
      btnImage: Key,
      btnWidth: 40,
      btnHeight: 30,
      btnSelected: false,
    },
    {
      btnText: 'Security & Privacy',
      btnImage: Security,
      btnWidth: 50,
      btnHeight: 30,
      btnSelected: false,
    },
  ])

  const btnClick = (index: number) => {
    setBtnList((prevBtnList) =>
      prevBtnList.map((item, i) => ({
        ...item,
        btnSelected: i === index,
      }))
    )
  }
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
          <Image src={Ticket} className="mb-2" height={70} width={88} />
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
      <div className="demand-btn-list mt-10 flex flex-row items-center justify-around">
        {btnList.map((item, index) => (
          <div
            key={item.btnText}
            className={item.btnSelected ? 'sel-demand-btn' : 'demand-btn'}
            onClick={() => {
              btnClick(index)
            }}
          >
            <Image
              className="ml-3"
              src={item.btnImage}
              height={item.btnHeight}
              width={item.btnWidth}
            />
            <div className="btn-txt">{item.btnText}</div>
          </div>
        ))}
      </div>
      <div
        className="mt-10 flex flex-row"
        style={{
          opacity: '50%',
          fontWeight: 'bold',
          fontSize: '20px',
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
