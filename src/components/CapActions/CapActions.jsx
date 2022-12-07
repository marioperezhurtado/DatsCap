import { useState, useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'

export default function CapActions() {
  const [isReactionsOpen, setIsReactionsOpen] = useState(false)

  const openReactionsHandler = () => setIsReactionsOpen(true)
  const closeReactionsHandler = () => setIsReactionsOpen(false)

  const reactionsRef = useRef()

  useOnClickOutside({ ref: reactionsRef, handler: closeReactionsHandler })

  if (isReactionsOpen) {
    return (
      <div className="relative">
        <ul
          ref={reactionsRef}
          onMouseLeave={closeReactionsHandler}
          className="absolute flex text-xl rounded-md shadow-md -right-11 -top-5 bg-slate-300">
          <li className="flex items-center">
            <button className="p-1">😍</button>
          </li>
          <li className="flex items-center">
            <button className="p-1">😂</button>
          </li>
          <li className="flex items-center">
            <button className="p-1">😯</button>
          </li>
          <li className="flex items-center">
            <button className="p-1">😭</button>
          </li>
          <li className="flex items-center">
            <button className="p-1">😡</button>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <ul className="flex items-center gap-2">
      <li className="flex items-center group">
        <button onClick={openReactionsHandler}>
          <img src="/like.svg" alt="React" className="w-8 h-8 p-2" />
        </button>
      </li>
      <li className="flex items-center">
        <button>
          <img src="/comment.svg" alt="Comment" className="p-2 w-9 h-9" />
        </button>
      </li>
      <li className="flex items-center">
        <button>
          <img src="/save.svg" alt="Save" className="p-2 w-9 h-9" />
        </button>
      </li>
    </ul>
  )
}
