import { Button, Input } from 'antd-mobile'
import '../style.css'

interface Ops {
  type: string
  source_chain: string
  token: string
  amount: string
  receiver: string
  target_chain: string
}

interface ContextProp {
  text: string
  type?: string
  button?: boolean
  confirmTx: (op: Ops) => void
  op: Ops
}

const Context = (props: ContextProp) => {
  const handleConfirm = () => {
    console.log('confirm')
    props.confirmTx(props.op)
  }
  const handleChange = () => {
    console.log('change')
  }
  return (
    <div className="w-full overflow-x-hidden">
      <div
        className={`text-[#053346CC] bg-[#13B6EA4D] max-w-fullmx-1 my-1 inline-block ${
          props.type === 'response' ? 'rounded-r-lg' : 'rounded-l-lg'
        } px-2 py-2
        ${
          props.type === 'response' ? 'ml-auto' : 'mr-auto'
        } max-w-full overflow-auto break-words `}
        style={{ fontSize: '36px' }}
      >
        {props.text}
      </div>
      {props.button && (
        <div className="flex flex-col sm:flex-row">
          <Button
            className="demand-button"
            style={{ backgroundColor: 'white' }}
            onClick={handleChange}
          >
            Change
          </Button>
          <Button
            className="demand-button"
            style={{ backgroundColor: 'white' }}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      )}
    </div>
  )
}

export default Context
