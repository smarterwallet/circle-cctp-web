import { Solu } from 'components'
import React from 'react'

const Setting: React.FC<{}> = () => {
  // mock data
  const transactionDetail = {
    amount: 10,
    receiver: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    // token: 'USDC',
  }

  return (
    <>
      <Solu transactionDetail={transactionDetail} />
    </>
  )
}

export default Setting
