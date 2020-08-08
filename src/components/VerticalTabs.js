import React from "react"
import { Tabs } from "react-bulma-components"

const VerticalTabs = ({ tabs, activeIndex, setActiveIndex }) => (
  <Tabs type="boxed">
    {tabs.map((tab, index) => (
      <Tabs.Tab
        active={index === activeIndex}
        onClick={() => setActiveIndex(index)}
        key={index}
      >
        {tab}
      </Tabs.Tab>
    ))}
  </Tabs>
)

export default VerticalTabs
