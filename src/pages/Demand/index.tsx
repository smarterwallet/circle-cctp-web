/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd-mobile'
import './style.css'
import PageLayout from 'layouts/PageLayout'
import Context from './Components/Context'
import { useUSDCBalance } from 'hooks/useUsdcBalance'
import { crossChainAbstraction } from '../../../src/services/index'

const Demand: React.FC<{}> = () => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [context, setContext] = useState([
    { text: 'What would you need?', type: 'response', button: false },
  ])
  const [ops, setOps] = useState([])
  const { goerliUSDC } = useUSDCBalance()
  const { avaxUSDC } = useUSDCBalance()

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
      setOps(() => ops)
      setContext((pre) => [
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
  useEffect(() => {
    setContext(() => context)
  }, [context, ops])
  return (
    <PageLayout>
      <div className="flex h-full w-full flex-col justify-between">
        <div className="ml-[20px] h-[85px] w-[480px] text-left text-[72px] text-[#0D5870]">
          Demand
        </div>
        <div className="mt-3 flex h-full flex-col">
          <div className="max-h-[calc(100vh-250px)] overflow-auto">
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
            <div className="flex-raw flex space-x-1">
              <Input
                className="bg-white-500 input-message h-11 w-full"
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
