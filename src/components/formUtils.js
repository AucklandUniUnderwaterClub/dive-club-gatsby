import React, { useState } from "react"
import { Form } from "react-bulma-components"
const { Field, Control, Label, Radio: ControlledRadio } = Form

export const Input = ({ children, ...rest }) => (
  <input className="input" {...rest} />
)

export const Radio = ({ children, ...rest }) => (
  <label className="radio has-text-weight-medium">
    <input type="radio" {...rest} />
    {children}
  </label>
)

export const Select = ({ children, ...rest }) => (
  <div className="select">
    <select {...rest}>{children}</select>
  </div>
)

export const BooleanFieldRadioWithDetails = ({
  children,
  radioName,
  detailsName,
  detailsLabel,
}) => {
  const [radioBool, setRadioBool] = useState(null)
  return (
    <>
      <Field>
        {children}
        <Control>
          <ControlledRadio
            className="has-text-weight-medium"
            name={radioName}
            value="yes"
            checked={radioBool === true}
            onChange={() => {
              setRadioBool(true)
            }}
          >
            Yes
          </ControlledRadio>
          <ControlledRadio
            className="has-text-weight-medium"
            name={radioName}
            value="no"
            checked={radioBool === false}
            onChange={() => {
              setRadioBool(false)
            }}
          >
            No
          </ControlledRadio>
        </Control>
      </Field>
      {radioBool && (
        <Field>
          <Label>{detailsLabel}</Label>
          <Control>
            <textarea className="textarea" name={detailsName} rows="2" />
          </Control>
        </Field>
      )}
    </>
  )
}
