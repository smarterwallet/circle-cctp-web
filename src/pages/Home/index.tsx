import React from 'react'

import { ConnectButton, NavBar } from '../../components'
import { useAccount, useNetwork } from 'wagmi'
import TransactionDetail from './components/TransactionDetail'

// type Props = {}

const Home: React.FC<{}> = () => {
  const { isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  if (isConnected && chain?.id === 5) return <TransactionDetail />
  return (
    <>
      <NavBar />
      <ConnectButton />
    </>
  )
}

export default Home
