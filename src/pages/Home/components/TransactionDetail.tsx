import React from 'react'
import { AvatarInfo, DetailTab } from '../../../components'

type Props = {}

const TransactionDetail: React.FC<{}> = (props: Props) => {
  const renderOverview = () => {
    return (
      <>
        <div className="mt-8 text-center text-5xl font-semibold text-circle-green">
          48.21
        </div>
        <div className="mt-1 text-center text-xl font-semibold text-circle-green">
          $USDC
        </div>
        <div className="mt-8 flex justify-between">
          <div className=" flex-1 text-center">
            <div className="text-base text-redhot-400">-100</div>
            <div className="text-lg text-circle-green">Past Day</div>
          </div>
          <div className=" flex-1 text-center">
            <div className="text-base text-apple-400">+2.49</div>
            <div className="text-lg text-circle-green">In Total</div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <AvatarInfo />
      {renderOverview()}
      <DetailTab />
    </>
  )
}

export default TransactionDetail
