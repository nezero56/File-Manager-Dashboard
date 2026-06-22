import { useState, useRef, useEffect } from 'react'
import { MdMenu, MdShoppingCart, MdNotifications, MdSettings, MdLock, MdLogout } from 'react-icons/md'

function Dropdown({ trigger, children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(v => !v)} className="flex items-center">{trigger}</button>
      {open && (
        <div className="absolute right-0 top-10 bg-white rounded-xl shadow-lg border border-gray-100 w-44 py-1 z-50">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Left: hamburger (mobile) */}
      <button
        className="lg:hidden text-gray-500 hover:text-primary mr-2"
        onClick={onMenuClick}
      >
        <MdMenu size={24} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-xs hidden sm:block">
        <input
          type="text"
          placeholder="Search…"
          className="w-full text-sm bg-pageBg rounded-lg px-4 py-2 outline-none text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Cart */}
        <Dropdown
          trigger={
            <span className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 block">
              <MdShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
            </span>
          }
        >
          <p className="px-4 py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Cart</p>
          <p className="px-4 py-3 text-sm text-gray-500">No items in cart.</p>
        </Dropdown>

        {/* Notifications */}
        <Dropdown
          trigger={
            <span className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 block">
              <MdNotifications size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </span>
          }
        >
          <p className="px-4 py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Notifications</p>
          <p className="px-4 py-3 text-sm text-gray-500">No new notifications.</p>
        </Dropdown>

        {/* Profile */}
        <Dropdown
          trigger={
            <img src="https://i.pravatar.cc/32?img=3" alt="Profile" className="w-8 h-8 rounded-full object-cover cursor-pointer ring-2 ring-primary/30" />
          }
        >
          <p className="px-4 py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Account</p>
          {[
            { icon: MdSettings, label: 'Profile' },
            { icon: MdLock,     label: 'Privacy Settings' },
            { icon: MdLogout,   label: 'Logout' },
          ].map(({ icon: Icon, label }) => (
            <button key={label} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary">
              <Icon size={15} />{label}
            </button>
          ))}
        </Dropdown>
      </div>
    </header>
  )
}
