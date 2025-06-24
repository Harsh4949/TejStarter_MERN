import React from 'react'
import {Container, Logo} from '../index'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Header() {
  
   const navigate = useNavigate()

  const navItems = [
          {
              name: 'Home',
              slug: "/",
          }, 
          {
              name: "Launchpad",
              slug: "/Launchpad",
          },
          {
              name: "About",
              slug: "/About",
          },
          {
              name: "Collaboration",
              slug: "/all-posts",
          },
          {
              name: "Stories",
              slug: "/Stories",
          },
    ] 


  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
            <div className='mr-4'>
              <Link to='/'>
                <Logo width='70px'   />

                </Link>
            </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) => 

              <li key={item.name}>
                <button
                 onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            )}
            
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header