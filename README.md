# Frontend Engineer: Technical Challenge PayPal Button

## Task

Take a look at the component `PayPalButton`, located in `/src/PayPalButton.tsx`.

1. What issues with it can you spot?

   _**Answer**_:

   When clicking the `debit or credit card` button, the paypal window closes immediately for the following reasons:

   L.22 can be removed. Based on the docs, the Formik `submitForm()` function automatically sets `setSubmitting(true)`, which happens before Formik sets `isValid` to true or false.

   The while loop at l.28 and l.30 can also be removed, as the updated value of `this.props.formik.isSubmitting` is not accessed after being set to true in the `submitHandler`.

   Consequently, as the `submitHandler` (in `App.tsx`) doesn't return a promise, `sleepUntilSubmitted` is used to avoid sending an undefined token to Paypal. However it only sleeps for 100ms while the `submitForm` function takes 3000ms to execute due to `setTimeout`. In the absence of the while loop, it is needeed to adjust the sleep duration to a matching value in order for the function to work (l.29 `await sleep(3000)`).

   The `ClassPaypalButton.tsx` component contains an updated version of the PaypalButton component solving the above. It returns a correct `_paypal_token` value. However the sleep value is hardcoded, which is not ideal.

   ***

2. Re-factor the class component into a functional component, while applying improvements regarding the problems you noted before and any other optimizations.
3. Bonus: Get rid of the HOC connect component (perhaps by utilising other available APIs).

   _**Answer**_:

   The `FunctionalPaypalButtonWithContext.tsx` component is the refactored version. It replaces the `connect` HOC with the `useFormikContext()` hook.

   Due to the async nature of the function, as both `submitForm()` and the final return were called in the same `createOrderOrBillingAgreement`, the updated Formik `values` property couldn't be accessed after being modified in the `submitHandler`. However, I believe there are no benefits from a UX perspective in displaying the button if its associated token could not be retrieved.

   This is the reasons why `submitForm()` is now called on mount, as the token should be retrieved as soon as possible. This allows to get rid of the `sleepUntilSubmitted` function. Now the button only shows if a valid `_paypal_token` is identified. Otherwise, a loading state is displayed. If the form submission fails, an error state is displayed.

   ***

4. Bonus: There is an issue with running the current implementation in `React.StrictMode` - the PayPal button will be duplicated, how would you go about solving this problem?

   _**Answer**_:

   The `paypal-js` package references an older JS API. It is recommended to use the updated `@paypal/react-paypal-js` in a React context, which solves the issue in strict mode.

### Additional notes

- The component uses [PayPal SDK](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/). Keep in mind that due to the mock returning a fake value, `onAccept` will never be executed in this demo and the expected result is the SDK failing with `500` while trying to call `https://www.sandbox.paypal.com/smart/api/payment/fake_paypal_token/ectoken`
- The component also utilises [formik](https://formik.org/) as form/state management library.

## Submit your solution

You can provide your solution either

- as a zipped file containing the code or
- as a link to a fork of this repository.
