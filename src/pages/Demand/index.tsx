import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, InputRef } from 'antd-mobile'
import './style.css'
import PageLayout from 'layouts/PageLayout'
import Context from './Components/Context'
import { useUSDCBalance } from 'hooks/useUsdcBalance'
import {
  crossChainAbstraction,
  demandTransfer,
} from '../../../src/services/index'
import Solution from 'components/Solu'
import { useContractWrite } from 'wagmi'
import { erc20ABI } from '@wagmi/core'
import { EUsdcAddress } from 'types'
import { SendIcon } from 'assets'

interface Ops {
  type: string
  source_chain: string
  token: string
  amount: string
  receiver: string
  target_chain: string
}
type HexString = string

const Demand: React.FC<{}> = () => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [context, setContext] = useState([
    { text: 'What would you need?', type: 'response', button: false },
  ])
  const [ops, setOps] = useState([])
  const { goerliUSDC } = useUSDCBalance()
  const { avaxUSDC } = useUSDCBalance()
  const [switchTx, setSwitchTx] = useState(false)
  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: EUsdcAddress.Goerli,
    abi: erc20ABI,
    functionName: 'transfer',
  })
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState(0)
  const inputRef = useRef<InputRef>(null)

  const handleSend = async () => {
    if (!inputMessage) {
      return
    }
    setContext((pre) => [
      ...pre,
      { text: inputMessage, type: 'question', button: false },
    ])
    const demandInput =
      `Current Goerli balance: ${goerliUSDC}USDC, Fuji balance: ${avaxUSDC}USDC. ` +
      inputMessage
    const result = await crossChainAbstraction(demandInput)
    if (result !== null) {
      const reply = result.data.detail.reply
      const ops = result.data.detail.ops
      setReceiver(() => ops[0].receiver)
      setAmount(() => parseInt(ops[0].amount, 10))
      setOps(() => ops)
      setContext((pre) => [
        ...pre,
        { text: reply, type: 'response', button: true },
      ])
      console.log(context)
    } else {
      setContext((pre) => [
        ...pre,
        {
          text: 'Sorry, insuffienct balance',
          type: 'response',
          button: false,
        },
      ])
    }
    setInputMessage(() => '')
  }
  const confirmTx = (op: Ops) => {
    if (op.type === 'chain-internal-transfer') {
      const receiver = op.receiver.slice(2)
      const amount = BigInt(parseInt(op.amount, 10) * 1e18)
      write({ args: [`0x${receiver}`, amount] })
    } else if (op.type === 'cross-chain-transfer') {
      setSwitchTx((pre) => !pre)
    }
  }
  const Chat = () => {
    return (
      <div className="flex flex-col justify-between h-full w-full">
        <div className="w-[480px] h-[85px] text-left text-[#0D5870] text-[72px] ml-[20px]">
          Demand
        </div>
        <div className="flex flex-col h-full mt-3">
          <div className="overflow-auto max-h-[calc(80vh-250px)]">
            {context.map((item, index) => {
              return (
                <div
                  className={`flex ${
                    item.type === 'response' ? 'justify-start' : 'justify-end'
                  }`}
                  key={index}
                >
                  <Context
                    key={index}
                    text={item.text}
                    type={item.type}
                    button={item.button}
                    confirmTx={confirmTx}
                    op={ops[0]}
                  />
                </div>
              )
            })}
          </div>

          <div
            className="mb-4"
            style={{ position: 'fixed', bottom: 150, width: '90%' }}
          >
            <div className="flex flex-raw space-x-1">
              <Input
                ref={inputRef}
                className="h-11 w-[85%] bg-white-500 input-message"
                style={{ backgroundColor: 'white', fontSize: '60px' }}
                value={inputMessage}
                onChange={(value) => setInputMessage(value)}
              />
              <Button className="w-[60px] h-[66px]" onClick={handleSend}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [inputMessage])
  return (
    <PageLayout>
      {switchTx ? (
        <Solution transactionDetail={{ receiver, amount }} />
      ) : (
        <Chat />
      )}
    </PageLayout>
  )
}

export default Demand
