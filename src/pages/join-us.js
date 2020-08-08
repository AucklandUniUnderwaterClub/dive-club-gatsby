import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const submit = setData => async e => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.currentTarget))
  console.log(JSON.stringify(data))
  let response = await fetch(
    process.env.GATSBY_URL_SUBMIT_MEMBERSHIP,
    {
      method: "POST",
      cache: "no-cache",
      referrerPolicy: "no-referrer",
      redirect: "follow",
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    // TODO better UI error handle
    console.error("response not ok:", response)
    return
  }
  const responseData = await response.json()
  console.log(responseData)
  setData(responseData)
}

const MembershipForm = ({ dataCallback }) => (
  <form id="test-form" onSubmit={submit(dataCallback)}>
    <div>
      <label>
        name
        <input type="text" name="name" placeholder="name" />
      </label>
    </div>
    <button type="submit">Submit</button>
  </form>
)

const JoinUsPage = () => {
  const [membershipData, setMembershipData] = useState(null)
  return (
    <Layout title="Join Us">
      <SEO title="Join Us" />
      <h1>Hi people</h1>
      <MembershipForm dataCallback={setMembershipData} />
      {membershipData && JSON.stringify(membershipData)}
    </Layout>
  )
}

export default JoinUsPage
