import request from 'axios'

export const circleAttestations = async (messageHash: string) => {
  return await request.get(
    `https://iris-api-sandbox.circle.com/v1/attestations/${messageHash}`
  )
}
