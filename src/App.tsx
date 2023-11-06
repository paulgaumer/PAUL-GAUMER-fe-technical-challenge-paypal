import PayPalButton, { PayPalFormValues } from './PayPalButton'
import ClassPaypalButton from './ClassPaypalButton'
import FunctionalPaypalButtonWithContext from './FunctionalPaypalButtonWithContext'
import { Formik, FormikConfig } from 'formik'
import './App.css'

const submitHandler: FormikConfig<PayPalFormValues>['onSubmit'] = (_, formik) => {
  setTimeout(() => {
    formik.setValues({ _paypal_token: 'fake_paypal_token' })
    formik.setSubmitting(false)
  }, 3000)
}

function App() {
  return (
    <>
      <Formik<PayPalFormValues> onSubmit={submitHandler} initialValues={{}}>
        {/* <PayPalButton /> */}
        {/* <ClassPaypalButton /> */}
        <FunctionalPaypalButtonWithContext />
      </Formik>
    </>
  )
}

export default App
