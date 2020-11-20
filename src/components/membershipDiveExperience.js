import React from "react"
import { Form } from "react-bulma-components"
import { Radio, Input } from "./formUtils"
const { Field, Control, Label, Help } = Form

const DiveExperience = () => (
  <>
    <Field>
      <Label>Diving Agency</Label>
      <Control>
        <Input name="dive-agency" list="list-dive-agencies" />
        <datalist id="list-dive-agencies">
          <option>Not yet certified</option>
          <option>PADI</option>
          <option>GUE</option>
          <option>SDI</option>
          <option>SSI</option>
          <option>TDI</option>
        </datalist>
      </Control>
    </Field>
    {/* TODO: change so that the following fields are hidden if "Not yet Certified"
    is selected - add a radio to above? or put certification as first field */}
    <p>to-do: hide all the following if not Certified</p>
    <Field>
      <Label>Certification</Label>
      <Control>
        <Input name="dive-certification" />
      </Control>
    </Field>
    <Field>
      <Label>Number of dives</Label>
      <Control>
        <Radio name="n-dives" value="0-25">
          0 - 25
        </Radio>
        <Radio name="n-dives" value="26-50">
          26-50
        </Radio>
        <Radio name="n-dives" value="51-100">
          51-100
        </Radio>
        <Radio name="n-dives" value="100+">
          100+
        </Radio>
      </Control>
    </Field>
    <Field>
      <Label>Date of last dive</Label>
      <Control>
        <input type="date" className="input" name="last-dive" />
      </Control>
      <Help>A rough estimate is fine</Help>
    </Field>
  </>
)

export default DiveExperience
