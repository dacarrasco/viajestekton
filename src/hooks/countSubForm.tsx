import React from 'react'
import { IPasajero } from '../interfaces/pasajeroInterface'

function countSubForm(pasajero:IPasajero[]):boolean {
  return (
    pasajero.length<4 ? true : false
  )
}

export default countSubForm;