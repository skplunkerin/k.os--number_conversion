import React, { useState } from 'react'

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
    'toBase8'
  )

  const convertToBase8 = (value: string): string => {
    let decimalValue = parseInt(value, 10)
    if (isNaN(decimalValue)) {
      return 'Invalid input'
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

  const convertFromBase8 = (value: string): string => {
    let decimalValue = 0
    for (let i = 0; i < value.length; i++) {
      const digit = value.charAt(i)
      const digitValue = Object.keys(base8Digits).find(
        (key: string) => base8Digits[parseInt(key)] === digit
      )
      if (digitValue === undefined) {
        return 'Invalid input'
      }
      decimalValue = decimalValue * 8 + parseInt(digitValue, 10)
    }
    return decimalValue.toString()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleToggle = (value: 'toBase8' | 'fromBase8') => {
    setConversionType(value)
  }

  const renderConversionInput = (): JSX.Element => {
    if (conversionType === 'toBase8') {
      return <input type="text" value={inputValue} onChange={handleChange} />
    } else {
      return <input type="text" value={inputValue} onChange={handleChange} />
    }
  }

  const handleConvert = () => {
    if (conversionType === 'toBase8') {
      const base8Value = convertToBase8(inputValue)
      setOutputValue(base8Value)
    } else {
      const decimalValue = convertFromBase8(inputValue)
      setOutputValue(decimalValue)
    }
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="mb-4">
        <label className="mr-2">Convert:</label>
        <div className="inline-block">
          <input
            type="radio"
            value="toBase8"
            checked={conversionType === 'toBase8'}
            onChange={() => handleToggle('toBase8')}
          />
          <span className="ml-2 mr-4">Decimal to Base8</span>
        </div>
        <div className="inline-block">
          <input
            type="radio"
            value="fromBase8"
            checked={conversionType === 'fromBase8'}
            onChange={() => handleToggle('fromBase8')}
          />
          <span className="ml-2">Base8 to Decimal</span>
        </div>
      </div>
      <div className="mb-4">
        <label>Enter value:</label>
        {renderConversionInput()}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleConvert}
      >
        Convert
      </button>
      <div className="mb-4">
        <h3>Output</h3>
        {outputValue}
      </div>
    </div>
  )
}

export default Base8Converter
