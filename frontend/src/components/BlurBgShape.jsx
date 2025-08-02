import React from 'react'

function BlurBgShape() {
  return (
    <>
      {/* Top blur background shape */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 z-1 transform-gpu overflow-hidden  blur-3xl lg:top-18 sm:-top-80 pointer-events-none"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 border border-red-500 -translate-x-23 -translate-y-15 rotate-45 bg-gradient-to-tr from-[#8088ff] to-[#271bc9]  opacity-50 dark:opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </>
  )
}

export default BlurBgShape
