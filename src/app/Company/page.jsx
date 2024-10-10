import React from 'react'
import {Card,CardBody} from '@nextui-org/react';
function Company() {
  return (
    <div>
        <Card clasName = 'w-full max-w-lg p-4'>
            <CardBody>
                <div className = 'flex justify-center items-center'>
                    <h3>Company Info</h3>
                    <p>BrandCenter</p>
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default Company;