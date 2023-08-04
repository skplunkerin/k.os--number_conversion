import React, { useState } from 'react'

/**
 * The digits of the k.os base 8 number system.
 */
const base8Digits: { [key: number]: string } = {
  0: '0',
  1: '|',
  2: '>',
  3: '/',
  4: '<',
  5: 'X',
  6: '*',
  7: '#'
}

const Base8Converter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [outputValue, setOutputValue] = useState<string>('')
  const [conversionType, setConversionType] = useState<'toBase8' | 'fromBase8'>(
    'fromBase8'
  )

  /**
   * Converts a decimal value to k.os base 8.
   *
   * @param value the decimal value to convert to k.os base 8
   * @returns the k.os base 8 value
   */
  const convertToBase8 = (value: string): string => {
    let decimalValue = parseInt(value, 10)
    if (isNaN(decimalValue)) {
      return 'Invalid input, are you trying to convert to a decimal?'
    }

    let base8Value = ''
    while (decimalValue >= 8) {
      const remainder = decimalValue % 8
      base8Value = base8Digits[remainder] + base8Value
      decimalValue = Math.floor(decimalValue / 8)
    }
    base8Value = base8Digits[decimalValue] + base8Value
    return base8Value
  }

  /**
   * Converts a k.os base 8 value to decimal.
   *
   * @param value the base 8 value to convert to decimal
   * @returns the decimal value
   */
  const convertFromBase8 = (value: string): string => {
    let decimalValue = 0
    for (let i = 0; i < value.length; i++) {
      const digit = value.charAt(i)
      const digitValue = Object.keys(base8Digits).find(
        (key: string) => base8Digits[parseInt(key)] === digit
      )
      if (digitValue === undefined) {
        return 'Invalid input, are you trying to convert to base 8?'
      }
      decimalValue = decimalValue * 8 + parseInt(digitValue, 10)
    }
    return decimalValue.toString()
  }

  /**
   * Handles the input field change, setting the inputValue state and calling
   * handleConvert() with the new value.
   *
   * @param e the change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    handleConvert(value)
  }

  /**
   * Handles the convert button click.
   *
   * @param value the input field value to convert
   */
  const handleConvert = (value: string) => {
    if (conversionType === 'toBase8') {
      const base8Value = convertToBase8(value)
      setOutputValue(base8Value)
    } else {
      const decimalValue = convertFromBase8(value)
      setOutputValue(decimalValue)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="mb-4">
        <h2>Enter number:</h2>
        {/* Toggle */}
        <div className="mb-4">
          <div className="inline-block">
            <div className="form-control inline-block">
              <label className="label cursor-pointer">
                <span className="label-text">To Base8</span>
                <input
                  checked={conversionType === 'toBase8'}
                  className="radio checked:bg-blue-500"
                  name="radio-10"
                  onChange={() => setConversionType('toBase8')}
                  type="radio"
                  value="toBase8"
                />
              </label>
            </div>
            <div className="form-control inline-block">
              <label className="label cursor-pointer">
                <input
                  checked={conversionType === 'fromBase8'}
                  className="radio checked:bg-red-500"
                  name="radio-10"
                  onChange={() => setConversionType('fromBase8')}
                  type="radio"
                  value="fromBase8"
                />
                <span className="label-text">From Base8</span>
              </label>
            </div>
          </div>
        </div>
        {/* Input field */}
        <div className="mb-4">
          <input
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            placeholder="<X<"
            type="text"
            value={inputValue}
          />
        </div>
        {/* <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleConvert}
        >
          Convert
        </button> */}
      </div>
      <div className="mb-4">
        <div className="mb-4">
          <h2>Output</h2>
          {outputValue}
        </div>
      </div>
    </div>
  )
}

export default Base8Converter
