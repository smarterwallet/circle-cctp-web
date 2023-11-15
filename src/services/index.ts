import request from 'axios'

export const circleAttestations = async (messageHash: string) => {
  return await request.get(
    `https://iris-api-sandbox.circle.com/v1/attestations/${messageHash}`
  )
}

export const crossChainAbstraction = async (demand: string) => {
  const data = { category: 'crossChainAbstraction', demand }

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://smarter-api-da.web3idea.xyz/v1/demand',
    headers: {},
    data,
  }

  const result = await request(config)
  console.log(result)
  return result
}

export const demandTransfer = async (demand: string) => {
  const data = { category: 'chainAbstraction-transfer', demand }

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://smarter-api-da.web3idea.xyz/v1/demand',
    headers: {},
    data,
  }

  const result = await request(config)
  console.log(result)
  return result
}
