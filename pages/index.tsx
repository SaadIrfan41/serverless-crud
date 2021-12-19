import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useAxios from 'axios-hooks'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Home: NextPage = () => {
  const [formlist, setformlist] = useState<any>({})
  // const [{ data, loading, error }, refetch] = useAxios(
  //   '/api/GetAllContactForms'
  // )
  // useEffect(() => {
  //   const api = async () => {
  //     const res = await axios({
  //       method: 'post',
  //       url: '/.netlify/functions/GetAllContactForms',
  //     })
  //     // console.log(res.data.data.findContactFormByID)
  //     setformlist(res.data)
  //   }
  //   api()
  // }, [])
  const loadLinks = async () => {
    try {
      const res = await fetch('/.netlify/functions/GetAllContactForms')
      const links = await res.json()
      setformlist(links)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    loadLinks()
  }, [])

  console.log(formlist?.data?.allContactForms?.data)
  // useEffect(() => {
  //   refetch()
  // }, [])

  // if (loading)
  //   return (
  //     <div className=' min-h-screen flex justify-center items-center'>
  //       <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500'></div>
  //     </div>
  //   )
  // if (error) return <p>Error!</p>
  // console.log(data.data.allContactForms.data)

  const deleteform = async (id: string) => {
    try {
      const res = await axios({
        method: 'delete',
        url: '/api/DeleteContactForm',
        data: {
          id,
        },
      })
      console.log(res)
      toast.success('Contact Deleted')
      loadLinks()
      // refetch()
    } catch (error) {
      console.log(error)
      //@ts-ignore
      toast.error(error.message)
    }
  }
  return (
    <div className='w-screen '>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className=' max-w-7xl mx-auto'>
        <div
          className={` ${
            formlist?.data?.allContactForms?.data.length === 0
              ? 'grid place-items-center h-screen'
              : 'mb-5 mt-5 flex justify-center '
          }`}
        >
          <Link href={`/contactform`} passHref>
            <button
              type='button'
              className='inline-flex  px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 items-start'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
                />
              </svg>
              ADD New Contact
            </button>
          </Link>
        </div>
        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {formlist?.data?.allContactForms?.data.map((form: any) => (
            <li
              key={form._id}
              className='col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200'
            >
              <a>
                <div className='w-full flex items-center justify-between p-6 space-x-6'>
                  <div className='flex-1 truncate'>
                    <p className='mt-1 text-gray-500 font-semibold truncate'>
                      First Name: {form.firstName}
                    </p>
                    <p className='mt-1 text-gray-500 font-semibold truncate'>
                      Last Name: {form.lastName}
                    </p>

                    <p className='mt-1 text-gray-500 font-semibold truncate'>
                      Email: {form.email}
                    </p>
                    <p className='mt-1 text-gray-500 font-semibold truncate'>
                      Phone Number{form.phoneNumber}
                    </p>
                  </div>
                </div>
              </a>

              <div>
                <div className='-mt-px flex divide-x divide-gray-200'>
                  <div className='w-0 flex-1 flex hover:bg-blue-500 transition duration-500 ease-in-out rounded-md'>
                    <Link href={`/updateform/${form._id}/`}>
                      <a className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent  hover:text-white'>
                        <PencilAltIcon
                          className='w-5 h-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='ml-3'>Edit</span>
                      </a>
                    </Link>
                  </div>
                  <div className='-ml-px w-0 flex-1 flex hover:bg-red-500 transition duration-500 ease-in-out rounded-md'>
                    <button
                      onClick={() => deleteform(form._id)}
                      className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-white'
                    >
                      <TrashIcon
                        className='w-5 h-5 text-gray-400 '
                        aria-hidden='true'
                      />
                      <span className='ml-3'>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
