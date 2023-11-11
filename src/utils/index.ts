/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 *
 * @param str string to truncate
 * @returns truncated string
 * @dev truncates string to 8 characters(using for address)
 */
function truncateString(str: `0x${string}` | undefined | string): string {
  if (!str) return ''
  if (str.length > 8) {
    return str.substring(0, 4) + '...' + str.substring(str.length - 4)
  }
  return str
}

function isSupportedNetwork(chainId?: number) {
  if (chainId === undefined) return false
  const supportedNetworks = [5, 31337, 43113] // goerli, hardhat, avalancheFuji
  return supportedNetworks.includes(chainId)
}

export { truncateString, isSupportedNetwork }
