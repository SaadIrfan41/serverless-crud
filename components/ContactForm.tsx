import * as yup from 'yup'
import { Formik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
const ContactForm = () => {
  const router = useRouter()

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Enter Your First Name'),
    lastName: yup.string().required('Enter Your Last Name'),
    email: yup.string().email('Invalid email address'),
    phoneNumber: yup
      .string()
      .min(11, "Min 11 Digit's required")
      .required('Phone Number is required'),
  })
  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values)
          try {
            // await axios('api/CreateContactForm',{
            //   method: 'POST',

            //   // body:values
            // })
            const res = await axios({
              method: 'post',
              url: '/api/CreateContactForm',
              data: values,
            })
            console.log(res)
            toast.success('Contact Created')
            router.push(`/`)
          } catch (error) {
            console.log(error)
            //@ts-ignore
            toast.error(error.message)
          }
        }}
      >
        {({
          errors,

          touched,

          handleChange,

          handleBlur,

          handleSubmit,

          isSubmitting,
        }) => (
          <div className='w-screen max-w-4xl h-screen mx-auto pt-8'>
            <h2 className='text-center text-4xl font-bold'>
              Enter Your Contact Info
            </h2>
            <form className='space-y-6 ' onSubmit={handleSubmit}>
              <div className=''>
                <label
                  htmlFor='text'
                  className={`${
                    errors.firstName && touched.firstName && errors.firstName
                      ? 'text-red-500 '
                      : 'text-black '
                  }  text-sm font-medium `}
                >
                  First Name
                </label>
                <div className='mt-1'>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='firstName'
                    name='firstName'
                    type='text'
                    required
                    className={`${
                      errors.firstName && touched.firstName && errors.firstName
                        ? 'border-2 border-red-500  focus:ring-red-500 '
                        : 'border-2 focus:border-indigo-500  focus:ring-indigo-500 '
                    } appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm bg-gray-100 focus:bg-white `}
                  />
                </div>
                <span className=' text-red-500'>
                  {errors.firstName && touched.firstName && errors.firstName}
                </span>
              </div>
              <div className=''>
                <label
                  htmlFor='text'
                  className={`${
                    errors.lastName && touched.lastName && errors.lastName
                      ? 'text-red-500 '
                      : 'text-black '
                  }  text-sm font-medium `}
                >
                  Last Name
                </label>
                <div className='mt-1'>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='lastName'
                    name='lastName'
                    type='text'
                    required
                    className={`${
                      errors.lastName && touched.lastName && errors.lastName
                        ? 'border-2 border-red-500  focus:ring-red-500 '
                        : 'border-2 focus:border-indigo-500  focus:ring-indigo-500 '
                    } appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm bg-gray-100 focus:bg-white `}
                  />
                </div>
                <span className=' text-red-500'>
                  {errors.lastName && touched.lastName && errors.lastName}
                </span>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className={`${
                    errors.email && touched.email && errors.email
                      ? 'text-red-500 '
                      : 'text-black'
                  }  text-sm font-medium `}
                >
                  Email
                </label>
                <div className='mt-1  '>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='email'
                    name='email'
                    type='email'
                    required
                    className={`${
                      errors.email && touched.email && errors.email
                        ? 'border-2 border-red-500 border-opacity-100 focus:ring-red-500 '
                        : 'border-2 focus:border-indigo-500 border-opacity-100 focus:ring-indigo-500 '
                    } appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm bg-gray-100 focus:bg-white`}
                  />
                </div>
                <span className=' text-red-500'>
                  {errors.email && touched.email && errors.email}
                </span>
              </div>

              <div className=''>
                <label
                  htmlFor='text'
                  className={`${
                    errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber
                      ? 'text-red-500 '
                      : 'text-black '
                  }  text-sm font-medium `}
                >
                  Phone Number
                </label>
                <div className='mt-1'>
                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='phoneNumber'
                    name='phoneNumber'
                    type='text'
                    required
                    className={`${
                      errors.phoneNumber &&
                      touched.phoneNumber &&
                      errors.phoneNumber
                        ? 'border-2 border-red-500  focus:ring-red-500 '
                        : 'border-2 focus:border-indigo-500  focus:ring-indigo-500 '
                    } appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm bg-gray-100 focus:bg-white `}
                  />
                </div>
                <span className=' text-red-500'>
                  {errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber}
                </span>
              </div>

              <div className='flex justify-center '>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  {isSubmitting ? 'Loading...' : 'Enter Contact'}
                </button>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  )
}

export default ContactForm
