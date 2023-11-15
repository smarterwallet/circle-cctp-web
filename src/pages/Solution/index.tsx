import Result from 'components/Result'
import React from 'react'
// import { truncateString } from 'utils'
import { Image } from 'antd-mobile'
import { CircleIcon, TransferIcon } from 'assets'
import { DownOutline } from 'antd-mobile-icons'

type Props = {
  transactionDetail: {
    nickName?: string
    amount: number
    receipt: string
    transactionFees: string
    processingTime: string
  }
}

const Solution: React.FC<Props> = ({ transactionDetail }) => {
  // const { receipt } = transactionDetail

  const renderExtra = () => {
    return (
      <>
        <div className="mb-2 text-lg font-semibold text-circle-green">
          Sequence of operations:
        </div>
        <div className="flex justify-between">
          <div className="text-center text-circle-green">
            <span className="font-semibold">Transfer</span> 100 $USDC in
            Avalance to 99.76 $USDC in Ethereum
          </div>
          <div className="flex w-12 flex-col items-center px-12">
            <Image src={CircleIcon} width={24} height={24} />
            <div className="mt-1 text-circle-green">CCTP</div>
          </div>
        </div>
        <DownOutline className="mx-auto my-4 text-xl text-circle-green" />
        <div className="flex justify-between">
          <div className="text-center text-circle-green">
            <span className="font-semibold">Send</span> 99.76 $USDC to Alice on
            Ethereum
          </div>
          <div className="flex w-12 flex-col items-center px-12">
            <Image src={TransferIcon} width={24} height={24} />
            <div className="mt-1 text-circle-green">Transfer</div>
          </div>
        </div>
      </>
    )
  }
  return (
    <div>
      {/* <p>Send $USDC to {nickName ? nickName : truncateString(receipt)}</p> */}
      <p className=" mx-auto mb-4 w-11/12 text-xl font-semibold text-circle-green">
        Send $USDC to 0x1234567890
      </p>
      <Result
        title="Estimated Results:"
        needFooter
        extra={renderExtra()}
        // transactionDetail={transactionDetail}
        transactionDetail={{
          amount: 100,
          receipt: '0x1234567890',
          transactionFees: '0.0001',
          processingTime: '10 minutes',
        }}
      />
    </div>
  )
}

export default Solution
