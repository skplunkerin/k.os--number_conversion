import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Unstable_Grid2'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import TextField from '@mui/material/TextField'

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
  const [conversionType, setConversionType] = useState<string>('fromBase8')

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
    <>
      <Grid xs={12}>
        <Box>
          <h2>Enter number:</h2>
          {/* Toggle */}
          <FormControl>
            <RadioGroup
              row
              name="radio-10"
              value={conversionType}
              onChange={(e) => setConversionType(e.target.value)}
              aria-labelledby="demo-form-control-label-placement"
              defaultValue="toBase8"
            >
              <FormControlLabel
                value="fromBase8"
                control={<Radio />}
                label="From Base8"
                labelPlacement="start"
                sx={{ marginRight: '8px' }}
              />
              <FormControlLabel
                value="toBase8"
                control={<Radio />}
                label="To Base8"
                labelPlacement="end"
              />
            </RadioGroup>
            {/* Input field */}
            <TextField
              label="Number"
              onChange={handleChange}
              placeholder={conversionType === 'fromBase8' ? '<X<' : '300'}
              variant="outlined"
              value={inputValue}
            />
          </FormControl>
          <h2>Output</h2>
          {outputValue}
        </Box>
      </Grid>
    </>
  )
}

export default Base8Converter
