"use client";
import  Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';
const Nav = () => {

  const { data : session } = useSession(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

 const [providers, setProviders] = useState(null);

 useEffect(() => {
  (async () => {
    const res = await getProviders();
    setProviders(res);
  })();
}, []);


  return (
    <nav className="flex-between w-full mb-16 pt-4">
      <Link href="/" className='flex gap-2 flex-center'>
        <Image 
          src="/assets/images/plant-logo.png"
          alt="Quotes Logo"
          width={100}
          height={30}
          className='object-contain'
        />
        <p className="sm:text-xl lg:text-2xl logo-text">QuotesGarden</p>
      </Link>

      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-4'>
            <Link href="/create-quote"
             className='black_btn'>
              Create Post
            </Link>

            <button type="button" 
            onClick={signOut} 
            className="outline_btn">
            Sign Out
            </button>

            <Link href="/profile" >
            <Image
              src= {session?.user.image}
              width={54}
              height={50}
              className="rounded-full"
              alt="profile"
            />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
              <button
                type="Button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
                >
                  Sign In
              </button>
            ))

            }
          </>
        )}
      </div>  
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src= {session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-quote'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Quote
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      
    </nav>
  )
}

export default Nav