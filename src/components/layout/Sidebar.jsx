import { NavLink } from 'react-router-dom'
import {
  MdDashboard, MdImage, MdVideoLibrary, MdDescription,
  MdFolder, MdDelete, MdLogout, MdHelpOutline,
} from 'react-icons/md'

const groups = [
  {
    label: 'File Manager',
    items: [
      { to: '/file-manager/dashboard',  icon: MdDashboard,    label: 'Dashboard' },
      { to: '/file-manager/images',     icon: MdImage,        label: 'Images' },
      { to: '/file-manager/videos',     icon: MdVideoLibrary, label: 'Videos' },
      { to: '/file-manager/documents',  icon: MdDescription,  label: 'Documents' },
      { to: '/file-manager/all-files',  icon: MdFolder,       label: 'All Files' },
      { to: '/file-manager/trash',      icon: MdDelete,       label: 'Trash' },
    ],
  },
  {
    label: 'Other',
    items: [
      { to: '/sign-out', icon: MdLogout,      label: 'Sign Out' },
      { to: '/help',     icon: MdHelpOutline, label: 'Help' },
    ],
  },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-30
          flex flex-col transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          <span className="text-[#232d42] font-bold text-lg tracking-wide">Hope UI</span>
        </div>

        {/* User mini-profile */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <img
            src="https://i.pravatar.cc/40?img=3"
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-[#232d42] leading-tight">Barry Tech</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {groups.map(group => (
            <div key={group.label}>
              <p className="text-[11px] font-semibold uppercase text-gray-400 tracking-widest px-3 mb-2">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map(({ to, icon: Icon, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                        ${isActive
                          ? 'bg-primary/10 text-primary border-l-4 border-primary pl-2'
                          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                        }`
                      }
                    >
                      <Icon size={18} />
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}
