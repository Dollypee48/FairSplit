

const calculateSplit = (splitType, totalAmount, participants, customShares = {}) => {
  let shares = {}

  if (splitType === 'even') {
    const share = parseFloat((totalAmount / participants.length).toFixed(2))
    participants.forEach((name) => {
      shares[name] = share
    })
  }

  if (splitType === 'custom') {
    const sum = Object.values(customShares).reduce((acc, val) => acc + Number(val), 0)
    if (sum !== Number(totalAmount)) {
      throw new Error(`Custom shares must add up to total amount (₦${totalAmount}). Currently: ₦${sum}`)
    }
    participants.forEach((name) => {
      if (!customShares[name]) {
        throw new Error(`Missing share for participant: ${name}`)
      }
      shares[name] = parseFloat(customShares[name])
    })
  }

  return shares
}

module.exports = calculateSplit
