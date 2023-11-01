# Frontend Engineer: Technical Challenge PayPal Button

## Task

Take a look at the component `PayPalButton`, located in `/src/PayPalButton.tsx`.

1. What issues with it can you spot?

    *Answer*: ...

2. Re-factor the class component into a functional component, while applying improvements regarding the problems you noted before and any other optimizations.
3. Bonus: Get rid of the HOC connect component (perhaps by utilising other available APIs).
4. Bonus: There is an issue with running the current implementation in `React.StrictMode` - the PayPal button will be duplicated, how would you go about solving this problem?

    *Answer*: ...

### Additional notes

- The component uses [PayPal SDK](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/). Keep in mind that due to the mock returning a fake value, `onAccept` will never be executed in this demo and the expected result is the SDK failing with `500` while trying to call `https://www.sandbox.paypal.com/smart/api/payment/fake_paypal_token/ectoken`
- The component also utilises [formik](https://formik.org/) as form/state management library.

## Submit your solution

You can provide your solution either

- as a zipped file containing the code or
- as a link to a fork of this repository.
