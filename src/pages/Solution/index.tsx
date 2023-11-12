import Result from 'components/Result'
import React from 'react'

type Props = {}

const Solution: React.FC<Props> = () => {
  return (
    <div>
      <Result
        title="Transfer Result"
        transactionDetail={{
          amount: 100,
          receipt: '接收人地址',
          transactionFees: '0.0001',
          processingTime: '1分钟',
        }}
      />
    </div>
  )
}

export default Solution
