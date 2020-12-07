import React from "react"
import { Form } from "react-bulma-components"
import { BooleanFieldRadioWithDetails, Radio } from "../formUtils"
const { Field, Control, Label } = Form

/**
 * Currently unused, was intended to be flexible - getting questions from a google sheet.
 * Will need to be hooked up with yup and react-hook-form to be used
 */
const MiscellaneousQuestions = () => (
  <>
    <BooleanFieldRadioWithDetails
      radioName="has-bach"
      detailsName="bach-location"
      detailsLabel="Where is your bach located? (rough, or exact location)"
    >
      <Label>
        Do you have a bach/holiday home that would potentially be usable for a
        club trip?
      </Label>
      <p>
        We like cheap trips and if we can cram a bunch of tents onto someone's
        lawn it tends to be cheaper than a camp ground!
      </p>
    </BooleanFieldRadioWithDetails>
    <Field>
      <Label>
        Are you interested in becoming a qualified skipper with the club?
      </Label>
      <p>
        We have a set of qualifications to complete before being a skipper of
        the club boat, most of which are relevant outside of the club. Tick yes
        if you're interested to get behind the wheel!
      </p>
      <Control>
        <Radio name="interested-skipper" value="true">
          Yes
        </Radio>
        <Radio name="interested-skipper" value="false">
          No
        </Radio>
      </Control>
    </Field>
  </>
)

export default MiscellaneousQuestions
