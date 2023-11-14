interface ContextProp {
  text: string
  type?: string
}

const Context = (props: ContextProp) => {
  return (
    <div
      className={`text-[#053346CC] bg-[#13B6EA4D] inline-block rounded-lg px-2 py-2
      ${props.type === 'response' ? 'ml-auto' : 'mr-auto'}`}
      style={{ fontSize: '36px' }}
    >
      {props.text}
    </div>
  )
}

export default Context
