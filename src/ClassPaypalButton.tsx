import React from 'react'
import ReactDOM from 'react-dom'
import { connect, FormikContextType } from 'formik'
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
type PayPalButtonProps = { formik: FormikContextType<PayPalFormValues> }

class ClassPayPalButton extends React.Component<PayPalButtonProps> {
  createOrderOrBillingAgreement = async () => {
    this.props.formik.submitForm() // submit will call api with form values and inject _paypal_token into the form values
    await this.sleepUntilSubmitted()
    return this.props.formik.values._paypal_token!
  }

  sleepUntilSubmitted = async () => {
    const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
    await sleep(4000)
  }

  onApprove = async () => {
    // do something on success
  }

  render = () => {
    const paypal = window['paypal']
    if (!paypal) return null

    const Button = (paypal.Buttons! as any).driver('react', {
      React,
      ReactDOM,
    }) as PayPalButtonComponent
    const { isSubmitting } = this.props.formik

    return (
      <div>
        <div style={(isSubmitting && { display: 'none' }) || {}}>
          <Button
            commit
            env="sandbox"
            createBillingAgreement={this.createOrderOrBillingAgreement}
            onApprove={this.onApprove}
            onCancel={() => this.props.formik.setSubmitting(false)}
            onError={() => this.props.formik.setSubmitting(false)}
            style={buttonStyle}
          />
        </div>
      </div>
    )
  }
}

export type PayPalFormValues = { _paypal_token?: string }

export default connect<{}, PayPalFormValues>(ClassPayPalButton)
