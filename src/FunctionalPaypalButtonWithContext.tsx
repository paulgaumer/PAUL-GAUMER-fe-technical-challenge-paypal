import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useFormikContext } from 'formik'
import type PayPal from '@paypal/paypal-js'

const buttonStyle = {
  color: 'gold',
  fundingicons: false,
  label: 'checkout',
  shape: 'rect',
  size: 'responsive',
  tagline: false,
} as PayPal.PayPalButtonsComponentOptions['style']

type PayPalButtonComponent = React.ComponentType<
  PayPal.PayPalButtonsComponentOptions & { commit: boolean; env: string }
>

export type PayPalFormValues = { _paypal_token?: string }

export default function FunctionalPaypalButtonWithContext() {
  const { values, setSubmitting, submitForm, errors } = useFormikContext<PayPalFormValues>()

  const createOrderOrBillingAgreement = async () => {
    return values._paypal_token!
  }

  const onApprove = async () => {
    // do something on success
  }

  useEffect(() => {
    submitForm()
  }, [])

  const paypal = window['paypal']
  if (!paypal) return null

  const Button = (paypal.Buttons! as any).driver('react', {
    React,
    ReactDOM,
  }) as PayPalButtonComponent

  if (errors) {
    return <p>An error occured. Please reload the page.</p>
  }

  return (
    <div>
      {values._paypal_token ? (
        <Button
          commit
          env="sandbox"
          createBillingAgreement={createOrderOrBillingAgreement}
          onApprove={onApprove}
          onCancel={() => setSubmitting(false)}
          onError={() => setSubmitting(false)}
          style={buttonStyle}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
