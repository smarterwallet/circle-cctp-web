import { Button, Input } from 'antd-mobile'
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
        className={`text-[#053346CC] bg-[#13B6EA4D] inline-block rounded-lg px-2 py-2
        ${props.type === 'response' ? 'ml-auto' : 'mr-auto'}`}
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
