import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, InputRef } from 'antd-mobile'
import './style.css'
import PageLayout from 'layouts/PageLayout'
import Context from './Components/Context'
import { useUSDCBalance } from 'hooks/useUsdcBalance'
import { crossChainAbstraction, AxiosResult } from '../../../src/services/index'
import Solution from 'components/Solu'
import { useContractWrite } from 'wagmi'
import { erc20ABI } from '@wagmi/core'
import { EUsdcAddress } from 'types'

interface Ops {
  type: string
  source_chain: string
  token: string
  amount: string
  receiver: string
  target_chain: string
}

interface contextProp {
  text: string
  type: string
  button: boolean
}

const Demand: React.FC<{}> = () => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [context, setContext] = useState([
    { text: 'What would you need?', type: 'response', button: false },
  ])
  const [ops, setOps] = useState<Ops[]>([])
  const { goerliUSDC } = useUSDCBalance()
  const { avaxUSDC } = useUSDCBalance()
  const [switchTx, setSwitchTx] = useState(false)
  const { write } = useContractWrite({
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
    setContext((pre: contextProp[]) => [
      ...pre,
      { text: inputMessage, type: 'question', button: false },
    ])
    const demandInput =
      `Current Goerli balance: ${goerliUSDC}USDC, Fuji balance: ${avaxUSDC}USDC. ` +
      inputMessage
    const result: AxiosResult = await crossChainAbstraction(demandInput)
    if (result !== null) {
      const reply: string = result.data.detail.reply
      const ops: Ops[] = result.data.detail.ops
      setReceiver(() => ops[0].receiver)
      setAmount(() => parseInt(ops[0].amount, 10))
      setOps(() => ops)
      setContext((pre: contextProp[]) => [
        ...pre,
        { text: reply, type: 'response', button: true },
      ])
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
      <div className="flex h-full w-full flex-col justify-between">
        <div className="ml-[20px] h-[85px] w-[480px] text-left text-[72px] text-[#0D5870]">
          Demand
        </div>
        <div className="mt-3 flex h-full flex-col">
          <div className="max-h-[calc(80vh-250px)] overflow-auto">
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
            <div className="flex-raw flex space-x-1">
              <Input
                ref={inputRef}
                className="bg-white-500 input-message h-11 w-[85%]"
                style={{ backgroundColor: 'white', fontSize: '60px' }}
                value={inputMessage}
                onChange={(value) => setInputMessage(value)}
              />
              <Button className="h-[66px] w-[60px]" onClick={handleSend}>
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
