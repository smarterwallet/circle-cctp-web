import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd-mobile'
import './style.css'
import PageLayout from 'layouts/PageLayout'
import Context from './Components/Context'
import { useUSDCBalance } from 'hooks/useUsdcBalance'
import { crossChainAbstraction } from '../../../src/services/index'
type Chain = 'Fuji' | 'Goerli'

interface CrossChainTransfer {
  type: 'cross-chain-transfer'
  source_chain: Chain
  token: string
  amount: string
  receiver: string
  target_chain: Chain
}

interface ChainInternalTransfer {
  type: 'chain-internal-transfer'
  source_chain: Chain
  token: string
  amount: string
  receiver: string
  target_chain: Chain
}

type Operation = CrossChainTransfer | ChainInternalTransfer

interface Detail {
  reply: string
  ops: Operation[]
}

interface Response {
  category: string
  detail: Detail
}

const Demand: React.FC<{}> = () => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [context, setContext] = useState([
    { text: 'What would you need?', type: 'response', button: false },
  ])
  const [ops, setOps] = useState([])
  const { goerliUSDC } = useUSDCBalance()
  const { avaxUSDC } = useUSDCBalance()

  console.log(`goerli ${goerliUSDC} avax ${avaxUSDC}`)

  const handleSend = async () => {
    if (!inputMessage) {
      return
    }
    console.log(inputMessage)
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
  useEffect(() => {
    setContext(() => context)
    console.log(context)
  }, [context, ops])
  return (
    <PageLayout>
      <div className="flex flex-col justify-between h-full w-full">
        <div className="w-[480px] h-[85px] text-left text-[#0D5870] text-[72px] ml-[20px]">
          Demand
        </div>
        <div className="flex flex-col h-full mt-3">
          <div className="overflow-auto max-h-[calc(100vh-250px)]">
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
                    button={false}
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
                className="h-11 w-full bg-white-500 input-message"
                style={{ backgroundColor: 'white', fontSize: '60px' }}
                value={inputMessage}
                onChange={(value) => setInputMessage(value)}
              />
              <Button onClick={handleSend}>send</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default Demand
