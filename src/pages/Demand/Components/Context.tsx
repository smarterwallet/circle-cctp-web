/* eslint-disable no-console */
import { Button } from 'antd-mobile'
import '../style.css'

interface ContextProp {
  text: string
  type?: string
  button?: boolean
}

const Context = (props: ContextProp) => {
  const handleConfirm = () => {
    console.log('confirm')
  }
  const handleChange = () => {
    console.log('change')
  }
  return (
    <div>
      <div
        className={`inline-block rounded-lg bg-[#13B6EA4D] p-2 text-[#053346CC]${
          props.type === 'response' ? 'ml-auto' : 'mr-auto'
        }`}
        style={{ fontSize: '36px' }}
      >
        {props.text}
      </div>
      {props.button && (
        <div className="flex">
          <Button className="demand-button" onClick={handleChange}>
            Change
          </Button>
          <Button className="demand-button" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      )}
    </div>
  )
}

export default Context
