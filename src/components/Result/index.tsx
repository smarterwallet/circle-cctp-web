/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable promise/param-names */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  GOERLI_USDC_ADDR,
  AVAX_USDC_ADDR,
  ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS,
  AVAX_DESTINATION_DOMAIN,
  ETH_MESSAGE_CONTRACT_ADDRESS,
  AVAX_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
} from '../../constants'
import React, { useEffect, useState } from 'react'
import { truncateString } from 'utils'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useContractEvent,
  useSwitchNetwork,
} from 'wagmi'
import USDC_ABI from '../../abis/Usdc.json'
import TOKEN_MESSENGER_ABI from '../../abis/TokenMessenger.json'
import MESSAGE_ABI from '../../abis/Message.json'
import MESSAGE_TRANSMITTER_ABI from '../../abis/MessageTransmitter.json'
import { keccak256 } from 'viem'
// import { circleAttestations } from 'services'
// import { useRequest } from 'ahooks'

type Props = {
  needFooter?: boolean
  title: string
  transactionDetail: {
    amount: number
    receipt: string
    transactionFees: string
    processingTime: string
  }
  extra?: React.ReactNode
}

const Result: React.FC<Props> = ({
  title,
  transactionDetail,
  extra,
  needFooter = false,
}) => {
  const jieshou = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
  const { amount, receipt, transactionFees, processingTime } = transactionDetail
  const { chain } = useNetwork()
  const { address } = useAccount()
  // const { switchNetwork } = useSwitchNetwork()
  const [isFetching, setIsFetching] = useState(false)
  const [signature, setSignature] = useState<any>('')
  const [messageBytes, setMessageBytes] = useState<any>('')

  const {
    data: bytesTransformResult,
    isLoading: isTransformLoading,
    isSuccess: isTransformSuccess,
  } = useContractRead({
    address: ETH_MESSAGE_CONTRACT_ADDRESS,
    abi: MESSAGE_ABI,
    functionName: 'addressToBytes32',
    args: [jieshou],
  })
  const { config: approveConfig } = usePrepareContractWrite({
    address: GOERLI_USDC_ADDR,
    abi: USDC_ABI,
    functionName: 'approve',
    args: [ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS, 10],
  })

  const {
    data: approveResult,
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    write: approve,
  } = useContractWrite(approveConfig)

  const { config: burnConfig } = usePrepareContractWrite({
    address: ETH_TOKEN_MESSENGER_CONTRACT_ADDRESS,
    abi: TOKEN_MESSENGER_ABI,
    functionName: 'depositForBurn',
    args: [10, AVAX_DESTINATION_DOMAIN, bytesTransformResult, GOERLI_USDC_ADDR],
    onSuccess(data) {
      console.log('burnConfig succress', data)
    },
  })

  const { write: transmitter } = useContractWrite({
    address: AVAX_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
    abi: MESSAGE_TRANSMITTER_ABI,
    functionName: 'receiveMessage',
    chainId: 43113,
    onSuccess(data) {
      console.log('transmitter succress', data)
    },
  })

  const {
    data: burnResult,
    isLoading: isBurnLoading,
    isSuccess: isBurnSuccess,
    write: burn,
  } = useContractWrite(burnConfig)

  // useEffect(() => {
  //   if (!isTransformLoading && isTransformSuccess) {
  //     console.log('bytesTransformResult', bytesTransformResult)
  //   }
  // }, [isTransformLoading, isTransformSuccess, bytesTransformResult])

  // useEffect(() => {
  //   if (!isBurnLoading && isBurnSuccess) {
  //     console.log('burnResult', burnResult)
  //   }
  // }, [isBurnLoading, isBurnSuccess, burnResult])
  const handleTransmitter = () => {
    transmitter({ args: [messageBytes, signature] })
  }

  // useEffect(() => {
  //   if (signature !== '' && messageBytes !== '' && chain?.id !== 43113) {
  //     switchNetwork?.(43113)
  //   }
  //   if (signature !== '' && messageBytes !== '' && chain?.id === 43113) {
  //     console.log(chain?.id)
  //     transmitter({ args: [messageBytes, signature] })
  //   }
  // }, [signature, messageBytes, chain?.id, switchNetwork, transmitter])

  useContractEvent({
    address: AVAX_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
    abi: MESSAGE_TRANSMITTER_ABI,
    eventName: 'MessageSent',
    async listener(log: any[]) {
      console.log('listening......', log)
      setMessageBytes(log[log.length - 1].args.message)
      const _messageHash = keccak256(log[log.length - 1].args.message)
      console.log('_messageHash', _messageHash)
      // STEP 4: Fetch attestation signature
      let attestationResponse: { status: string; attestation: string } = {
        status: 'pending',
        attestation: '',
      }
      while (attestationResponse.status !== 'complete') {
        const response = await fetch(
          `https://iris-api-sandbox.circle.com/v1/attestations/${_messageHash}`
        )
        attestationResponse = await response.json()
        await new Promise((r) => setTimeout(r, 2000))
      }
      const attestationSignature = attestationResponse.attestation
      console.log(`Signature: ${attestationSignature}`)
      setSignature(attestationSignature)
    },
  })

  const handleChange = () => {
    history.back()
  }

  /**
   * @dev
   * STEP 1: Approve messenger contract to withdraw from our active eth address
   */
  const handleApprove = () => {
    approve?.()
  }

  const handleBurn = () => {
    burn?.()
  }

  const handleConfirm = () => {
    handleApprove()
    handleBurn()
    console.log('confirm')
  }
  return (
    <div
      style={{
        boxShadow:
          '9.057971000671387px 9.057971000671387px 36.23188400268555px 0px rgba(0, 0, 0, 0.25)',
      }}
      className=" mx-auto w-11/12 rounded-lg"
    >
      <div className="rounded-t-lg p-4" style={{ backgroundColor: '#e7ece6' }}>
        {extra}
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
        <div className="mb-2 flex justify-between">
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
      {needFooter && (
        <div
          style={{
            backgroundColor: '#fafbfa',
          }}
          className="flex h-12  w-full items-center rounded-b-lg text-center text-lg font-semibold text-circle-green"
        >
          <div
            style={{ borderRight: '1px solid rgba(168, 165, 169, 0.5)' }}
            className="flex-1 py-2"
            onClick={handleTransmitter}
          >
            Change
          </div>
          <div className="flex-1" onClick={handleConfirm}>
            Confirm
          </div>
        </div>
      )}
    </div>
  )
}

export default Result
