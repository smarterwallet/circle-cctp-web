import React, { useState } from 'react'
import { Input, List, Button, Toast, Form } from 'antd-mobile'

const Demand: React.FC<{}> = () => {
  const [messages, setMessages] = useState<
    Array<{ content: string; type: string }>
  >([])
  const [inputValue, setInputValue] = useState('')
  const handleSendMessage = () => {
    if (inputValue.trim() === '') {
      Toast.show('请输入消息内容')
      return
    }

    const newMessages = [...messages, { content: inputValue, type: 'sent' }]
    setMessages(newMessages)
    setInputValue('')
  }

  return (
    <>
      <div className="flex h-full flex-col items-center">
        <div className="w-full grow">
          <List className="h-full w-full">
            {messages.map((message, index) => (
              <List.Item
                key={index}
                className={`message-item ${
                  message.type === 'sent' ? 'sent' : 'received'
                }`}
              >
                {message.content}
              </List.Item>
            ))}
          </List>
        </div>
        <div className="flex w-full flex-col  items-center">
          <Form className="w-full">
            <Form.Item
              className="form-item"
              extra={
                <Button
                  className="send-btn"
                  size="middle"
                  color="primary"
                  onClick={handleSendMessage}
                >
                  发送
                </Button>
              }
            >
              <Input
                className="input-item"
                placeholder="请输入消息"
                value={inputValue}
                onChange={(value) => setInputValue(value)}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Demand
