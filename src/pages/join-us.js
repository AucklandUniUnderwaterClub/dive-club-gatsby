import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import MembershipForm from "../components/membershipForm"

const submit = setData => async e => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.currentTarget))
  console.log(JSON.stringify(data))
  let response = await fetch(process.env.GATSBY_URL_SUBMIT_MEMBERSHIP, {
    method: "POST",
    cache: "no-cache",
    referrerPolicy: "no-referrer",
    redirect: "follow",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    // TODO better UI error handle
    console.error("response not ok:", response)
    return
  }
  const responseData = await response.json()
  console.log(responseData)
  setData(responseData)
}

const JoinUsPage = () => {
  const [membershipData, setMembershipData] = useState(null)
  return (
    <Layout title="Join Us">
      <SEO title="Join Us" />
      <MembershipForm submit={submit(setMembershipData)} />
      {membershipData && JSON.stringify(membershipData)}
    </Layout>
  )
}

export default JoinUsPage
