import React from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'

const Users = () => {
  return (
   <Layout title={"Dashboard - Users"}>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1>ALL Users</h1>
        </div>
    </div>
   </Layout>
  )
}

export default Users