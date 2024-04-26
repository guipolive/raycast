#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title generateCreditCard
// @raycast.mode silent

// Optional parameters:
// @raycast.icon 💳
// @raycast.argument1 { "type": "text", "placeholder": "Last digit", "optional": true}
// @raycast.packageName GenerateCreditCard

// Documentation:
// @raycast.description Generate a valid Visa credit card.
// @raycast.author guipolive
// @raycast.authorURL https://raycast.com/guipolive

const child_process = require('child_process')

function generateCreditCardNumber() {
  const bin = '400000' // Example BIN for a Visa card
  let randomNum = Math.floor(Math.random() * 900000) + 100000 // Generate a random 6-digit number
  randomNum = randomNum.toString().padStart(9, '0') // Pad the random number to make it 10 digits
  const checksum = generateChecksum(bin + randomNum) // Calculate the checksum

  return bin + randomNum + checksum
}

function generateChecksum(cardNumber) {
  const digits = cardNumber.split('').map(Number)
  const oddSum = digits
    .filter((_, index) => index % 2 !== 0)
    .reduce((acc, curr) => acc + curr, 0)
  const evenSum = digits
    .filter((_, index) => index % 2 === 0)
    .map((digit) => {
      let doubled = digit * 2
      return doubled > 9 ? doubled - 9 : doubled
    })
    .reduce((acc, curr) => acc + curr, 0)

  const totalSum = oddSum + evenSum
  const checksumDigit = (10 - (totalSum % 10)) % 10

  return checksumDigit.toString()
}

function generateCreditCardWithLastDigit(lastDigit) {
  let generatedNumber = ''
  let tries = 0

  do {
    generatedNumber = generateCreditCardNumber()
    tries += 1
  } while (
    generatedNumber[generatedNumber.length - 1] !== lastDigit &&
    tries < 100
  )
  return generatedNumber
}

// Function to copy data to clipboard
function pbcopy(data) {
  return new Promise(function (resolve, reject) {
    const child = child_process.spawn('pbcopy')

    child.on('error', function (err) {
      reject(err)
    })

    child.on('close', function (err) {
      resolve(data)
    })

    child.stdin.write(data)
    child.stdin.end()
  })
}

const [lastDigit] = process.argv.slice(2)

const generatedNumber = generateCreditCardWithLastDigit(lastDigit || '1')

pbcopy(generatedNumber)
  .then(console.log(generatedNumber))
  .catch((err) => {
    console.log(err)
  })
