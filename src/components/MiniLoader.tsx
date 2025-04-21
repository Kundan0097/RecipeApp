import React from 'react'

function MiniLoader() {
  return (
    <div style={{
      width:"25px",
      height:"25px",
      border:"3px solid gray",
      borderTop:"3px solid white",
      borderRadius:"50%",
      animation:" spin 0.6s linear infinite",
      margin:"auto",
      }}>
    </div>
  )
}

export default MiniLoader