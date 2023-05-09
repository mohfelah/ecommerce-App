import React from 'react'
import UserMenu from '../../Layout/UserMenu'
import Layout from '../../Layout/Layout'

const Orders = () => {
  return (
    <Layout title={"Dashboard - Orders"}>
    <div className='row'>
        <div className='col-md-3'>
           <UserMenu/>
        </div>
        <div className='col-md-9'>
            <h1>Orders</h1>
        </div>
    </div>
   </Layout>
  )
}

export default Orders