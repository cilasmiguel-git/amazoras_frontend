import React from 'react'

const CheckoutSteps = (props) => {
  return (
    <div className='checkout-steps'>
        <div className={props.step1?'active': ''}>Signin</div>
        <div className={props.step2?'active': ''}>shipping</div>
        <div className={props.step3?'active': ''}>payment</div>
        <div className={props.step4?'active': ''}>place Order</div>
    </div>
  )
}

export default CheckoutSteps