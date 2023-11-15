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

  return await request(config)
}

// export const demandTransfer = async (demand: string) => {}
