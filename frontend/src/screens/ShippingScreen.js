import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { connect } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({
  saveShippingAddress,
  cart: { shippingAddress },
  history,
}) => {
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = e => {
    e.preventDefault()
    saveShippingAddress({ address, city, postalCode, country })
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Address'
            value={address}
            onChange={e => setAddress(e.target.value)}
            required></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className='my-3'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='City'
            value={city}
            onChange={e => setCity(e.target.value)}
            required></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode' className='my-3'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Postal Code'
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            required></Form.Control>
        </Form.Group>

        <Form.Group controlId='country' className='my-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Country'
            value={country}
            onChange={e => setCountry(e.target.value)}
            required></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

const mapStateToProps = state => ({
  cart: state.cart,
})

export default connect(mapStateToProps, { saveShippingAddress })(ShippingScreen)
