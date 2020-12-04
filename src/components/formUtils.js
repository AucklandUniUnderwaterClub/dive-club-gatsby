import React from "react"
import { Form } from "react-bulma-components"
const { Field, Control, Help, Label } = Form

export const Input = ({ children, domRef, color, ...rest }) => (
  <input
    ref={domRef}
    className={`input ${color ? `is-${color}` : ""}`}
    {...rest}
  />
)

export const Radio = ({ children, domRef, ...rest }) => (
  <label className="radio has-text-weight-medium">
    <input ref={domRef} type="radio" {...rest} />
    {children}
  </label>
)

export const Select = ({ children, domRef, color, ...rest }) => (
  <div className={`select ${color ? `is-${color}` : ""}`}>
    <select ref={domRef} {...rest}>
      {children}
    </select>
  </div>
)

export const BooleanFieldRadioWithDetails = ({
  formContext: { watch, register, errors },
  children,
  radioName,
  detailsName,
  detailsLabel,
}) => {
  const radioBool = watch(radioName)
  return (
    <>
      <Field>
        {children}
        <Control>
          <Radio domRef={register} name={radioName} value="true">
            Yes
          </Radio>
          <Radio domRef={register} name={radioName} value="false">
            No
          </Radio>
          <Help color="danger">{errors?.[radioName]?.message}</Help>
        </Control>
      </Field>
      {radioBool === "true" && (
        <Field>
          <Label>{detailsLabel}</Label>
          <Control>
            <textarea
              ref={register}
              className={`textarea ${errors?.[detailsName] ? `is-danger` : ""}`}
              name={detailsName}
              rows="2"
            />
            <Help color="danger">{errors?.[detailsName]?.message}</Help>
          </Control>
        </Field>
      )}
    </>
  )
}
