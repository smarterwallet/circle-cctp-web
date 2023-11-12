/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unneeded-ternary */
import { useAccount, useContractRead, useNetwork } from 'wagmi'
import { EUsdcAddress } from '../types'
import { erc20ABI } from '@wagmi/core'
import { formatUnits } from 'viem'

export function useUSDCBalance(): { balance: string } {
  const { chain } = useNetwork()
  const { address, isConnecting } = useAccount()
  if (isConnecting) return { balance: 'Loading...' }
  if (!address) return { balance: '0' }

  const { data } = useContractRead({
    address: EUsdcAddress[chain?.name as keyof typeof EUsdcAddress] as
      | `0x${string}`
      | undefined,
    abi: erc20ABI,
    chainId: chain?.id,
    functionName: 'balanceOf',
    args: [address],
  })

  return {
    balance: formatUnits(data || BigInt(0), 6),
  }
}
