import React from 'react'

export const createSplitSpaceComponent = (text: string) => {
  const spaceList = text.split('\n')

  return (
    <>
      {spaceList.map((space, index) => {
        return <div key={index}>{space}</div>
      })}
    </>
  )
}
