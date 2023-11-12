import React from 'react'
import { truncateString } from 'utils'
import { useAccount } from 'wagmi'

type Props = {
  title: string
  transactionDetail: {
    amount: number
    receipt: string
    transactionFees: string
    processingTime: string
  }
}

const Result: React.FC<Props> = ({ title, transactionDetail }) => {
  const { address } = useAccount()
  const { amount, receipt, transactionFees, processingTime } = transactionDetail
  return (
    <div
      style={{
        boxShadow:
          '9.057971000671387px 9.057971000671387px 36.23188400268555px 0px rgba(0, 0, 0, 0.25)',
      }}
      className=" mx-auto my-0 h-56 w-11/12 rounded-lg p-2"
    >
      <div className="text-lg font-semibold text-circle-green">{title}</div>
      <div className="flex py-2">
        <div className="flex flex-1 items-center justify-center text-circle-green">
          <p>You</p>
        </div>
        <div className="flex flex-1 items-center justify-center text-lg font-medium text-redhot-500">
          <p>- {amount}</p>
        </div>
        <div className="flex flex-1 items-center justify-center text-circle-green">
          <p>$USDC</p>
        </div>
      </div>
      <div className="flex py-2">
        <div className="flex flex-1 items-center justify-center text-circle-green">
          <p>Receipt</p>
        </div>
        <div className="flex flex-1 items-center justify-center text-lg font-medium text-apple-400">
          <p>+ {amount - 2}</p>
        </div>
        <div className="flex flex-1 items-center justify-center text-circle-green">
          <p>$USDC</p>
        </div>
      </div>
      <div>
        <span className="font-medium text-circle-green">Receipt</span>
        <span className=" ml-6 text-circle-green">{receipt}</span>
      </div>
      <div>
        <span className="font-medium text-circle-green">Address</span>
        <span className=" ml-6 text-circle-green">
          {truncateString(address)}
        </span>
      </div>
      <div className="flex justify-between">
        <div>
          <div>
            <span className="font-medium text-circle-green">
              Transaction fees
            </span>
            <span className=" ml-6 text-circle-green">{transactionFees}</span>
          </div>
        </div>
        <div>
          <span className="font-semibold text-circle-green text-redhot-frosting-primary">
            No.1
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <div>
            <span className="font-medium text-circle-green">
              Processing time
            </span>
            <span className=" ml-6 text-circle-green">{processingTime}</span>
          </div>
        </div>
        <div>
          <span className="font-semibold text-circle-green text-redhot-frosting-primary">
            No.1
          </span>
        </div>
      </div>
    </div>
  )
}

export default Result
