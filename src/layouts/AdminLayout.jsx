import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from "../components/admin/Sidebar.jsx"

function AdminLayout() {

  return (
    <>
      <div className="min-h-screen bg-[#fafafa] dark:bg-black">

        <Sidebar />

        <main className="lg:ml-72 p-5 md:p-8 xl:p-10">
          <Outlet />
        </main>

      </div>
    </>
  )
}

export default AdminLayout