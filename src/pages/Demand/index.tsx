import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd-mobile'
import './style.css'
import PageLayout from 'layouts/PageLayout'
import Context from './Components/Context'
import { useUSDCBalance } from 'hooks/useUsdcBalance'

const Demand: React.FC<{}> = () => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [context, setContext] = useState([
    { text: 'What would you need?', type: 'response' },
  ])
  const { balance } = useUSDCBalance()
  console.log(balance)
  const handleSend = () => {
    if (!inputMessage) {
      return
    }
    setContext((pre) => [...pre, { text: inputMessage, type: 'question' }])

    setInputMessage(() => '')
  }
  console.log(inputMessage)
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
                    button={true}
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
