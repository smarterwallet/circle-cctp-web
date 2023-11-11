// import { useAccount, useContractRead } from 'wagmi'
// import { useEffect, useState } from 'react'
// import { BigNumber } from 'ethers'
// import { EUsdcAddress } from '../types'
// import ABI from '../abis/USDC.json'

// // USDC ABI - 只包含balanceOf方法
// const USDC_ABI = ['function balanceOf(address owner) view returns (uint256)']

// export function useUSDCBalance(chainName?: string): any {
//   console.log(chainName)

//   const { address, isConnecting, isDisconnected } = useAccount()
//   const { data } = useContractRead({
//     address: EUsdcAddress[chainName as keyof typeof EUsdcAddress] as
//       | `0x${string}`
//       | undefined,
//     abi: ABI,
//     functionName: 'balanceOf',
//     args: [address],
//   })
//   console.log(data)

//   return {}
// }
