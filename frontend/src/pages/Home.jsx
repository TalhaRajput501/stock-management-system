import { useState } from 'react'
import accessImg from '../assets/profile.png'
import chartImg from '../assets/piechart.png'
import dashboardImg from '../assets/barchart.png'
import { BlurBgShape, Heading } from "../components"
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'




export default function Home() {

  // use this if you want to run counter on when i visible
  // const {ref, inView} = useInView()
  // use this if you want to run it on first visible 
  // This is for Counters
  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true })
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true })
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true })
  const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true })
  const { ref: ref5, inView: inView5 } = useInView({ triggerOnce: true })

  // This is for testimonials to change dynamically
  const [activeTab, setActiveTab] = useState('client1')
  const [activeSideElement, setActiveSideElement] = useState(0)
  const renderedComponent = () => {
    switch (activeTab) {
      case 'client1':
        return (
          <div
            className='text-center sm:w-[72%] mx-auto p-2 dark:text-gray-300 font-semibold'
          >
            “As the owner of a busy medical store, managing stock used to eat up a lot of my time. After switching to this system, I can update and check inventory much faster. It’s not perfect, but it’s definitely made day-to-day tasks easier.”
            <br />
            — Farhan Malik, Al-Hayat Medicos
          </div>
        )
      case 'client2':
        return (
          <div
            className='text-center sm:w-[72%] mx-auto p-2 dark:text-gray-300 font-semibold'
          >
            “Running a cosmetics shop means I have to keep track of a lot of small items. What I really liked about this system is how easily I can see which products are low on stock. It’s helped me plan restocks better without relying on guesswork.”
            <br />
            — Sana Javed, Glow & Glam Store
          </div>
        )
      case 'client3':
        return (
          <div
            className='text-center sm:w-[72%] mx-auto p-2 dark:text-gray-300 font-semibold'
          >
            “I have two employees who also manage sales and stock, and we all use this system from different devices. It works smoothly, and the access levels keep things in control. I don’t need to explain the same thing again and again — it just works.”
            <br />
            — Ali Khan, Speed Mobile Accessories
          </div>
        )
      default:
        return null
    }
  }

  const clients = [
    { name: 'Farhan Malik', business: 'Al-Hayat Medicos' },
    { name: 'Sana Javed', business: 'Glow & Glam Store' },
    { name: 'Ali Khan', business: 'Speed Mobile Accessories' },
  ]

  return (
    <div className="bg-white  dark:bg-gray-900">


      {/* Background shape graddient color */}
      <BlurBgShape />

      {/* Hero Section */}
      <div className="mx-auto  max-w-full pt-32 pb-22 z-50">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-white/10 hover:ring-gray-900/20 dark:hover:ring-white/20">
            Talha our next round of funding.{' '}
            <Link to={'/about'} className="font-semibold text-indigo-600 dark:text-indigo-400">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center">
          {/* Main coloured heading */}
          <Heading className='sm:text-6xl text-4xl justify-center font-semibold md:text-5xl lg:text-6xl'>
            Effortless Inventory Management for Small Businesses
          </Heading>

          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 dark:text-gray-300 sm:text-xl/8">
            Track stock, manage users, and visualize your business — all in one dashboard.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={'/account/register'}
              className="bg-gradient-to-l dark:to-emerald-600 dark:from-sky-900 to-emerald-400 from-sky-300 dark:hover:to-emerald-400 dark:hover:from-sky-300 hover:to-emerald-600 hover:from-sky-900 text-white font-semibold px-6 py-3 rounded-xl shadow transition "
            >
              Get started
            </Link>
          </div>
        </div>
      </div>


      {/* Why Us Section  */}
      <section className="py-9 px-4 sm:px-8 bg-white dark:bg-gray-900">
        <Heading className='sm:text-6xl pb- text-center h-20 text-4xl justify-center font-extrabold md:text-5xl lg:text-6xl'>
          Why Us
        </Heading>

        {/* Text & Dashboard Pictures  */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Part of why us*/}
          <div>
            <h2 className="text-3xl text-center font-bold text-gray-900 dark:text-white mb-4">
              A Modern Dashboard Experience
            </h2>
            <p className="text-gray-700 text-center dark:text-gray-300 text-lg mb-6">
              Our system empowers businesses with real-time inventory tracking,
              user roles (admin & employees), and insightful charts. It’s
              accessible, clean, and designed for growth.
            </p>
            <ul className="space-y-2  ml-4 text-gray-700 dark:text-gray-300 mx-auto font-bold">
              <li className='list-disc'>Product Monitoring</li>
              <li className='list-disc'>Admin & Employee Access</li>
              <li className='list-disc'>Category-wise Analytics</li>
              <li className='list-disc'>Pie Chart</li>
              <li className='list-disc'>Secure & Fast</li>
              <li className='list-disc'>Users Monitoring</li>
            </ul>
          </div>

          {/* Image Stack Part of why us*/}
          <div className="relative w-full flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
            {/* Behind Image 1 */}
            <img
              src={chartImg}
              alt="Chart"
              className="absolute top-2 left-2 w-24 h-24 sm:w-32 sm:h-32 md:w-60 md:h-40 rounded-2xl shadow-lg object-cover border-4 border-white dark:border-gray-800 rotate-[-6deg] z-14 hover:shadow-2xl"
            />

            {/* Behind Image 2 */}
            <img
              src={accessImg}
              alt="Access Control"
              className="absolute bottom-2 right-2 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl shadow-lg object-cover border-4 border-white dark:border-gray-800 rotate-[5deg] z-0 hover:shadow-2xl"
            />

            {/* Main Front Image */}
            <img
              src={dashboardImg}
              alt="Dashboard"
              className="relative w-48 sm:w-64 md:w-100 rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 z-10 object-cover hover:shadow-2xl"
            />
          </div>
        </div>


        {/* Counters Starts here */}
        <div
          className='  py-3 flex flex-wrap justify-evenly items-center '
        >

          {/* Shops Using System */}
          <div
            ref={ref1}
            className=' p-2  w-auto my-2  '
          >
            <div className="text-4xl text-center sm:text-5xl font-bold text-gray-900 dark:text-white  mb-4">
              <CountUp
                start={0}
                end={inView1 && 259}
                duration='2'
              />+
            </div>
            <div>
              <p
                className='text-gray-900 font-bold dark:text-white'
              >Shops Using System</p>
            </div>
          </div>

          {/* Inventory Value Managed */}
          <div
            ref={ref2}
            className=' p-2  w-auto my-2  '
          >
            <div className="text-4xl text-center sm:text-5xl font-bold text-gray-900 dark:text-white  mb-4">
              $<CountUp
                start={0}
                end={inView2 && 800}
                duration='2'
              />K+
            </div>
            <div>
              <p
                className='text-gray-900 font-bold dark:text-white'
              >Inventory Value Managed</p>
            </div>
          </div>

          {/* Products Tracked */}
          <div
            ref={ref3}
            className=' p-2 w-auto my-2 '
          >
            <div className="text-4xl text-center sm:text-5xl font-bold text-gray-900 dark:text-white  mb-4">
              <CountUp
                start={0}
                end={inView3 && 8}
                duration='2'
              />K+
            </div>
            <div>
              <p
                className='text-gray-900 font-bold dark:text-white'
              >Products Tracked</p>
            </div>
          </div>

          {/* Active Clients */}
          <div
            ref={ref4}
            className=' p-2 w-auto my-2 '
          >
            <div className="text-4xl text-center sm:text-5xl font-bold text-gray-900 dark:text-white  mb-4">
              <CountUp
                start={0}
                end={inView4 && 324}
                duration='2'
              />+
            </div>
            <div>
              <p
                className='text-gray-900 font-bold dark:text-white'
              >Active Clients</p>
            </div>
          </div>

          {/* Employees Active */}
          <div
            ref={ref5}
            className=' p-2 w-auto my-2 '
          >
            <div className="text-4xl text-center sm:text-5xl font-bold text-gray-900 dark:text-white  mb-4">
              <CountUp
                start={0}
                end={inView5 && 139}
                duration='2'
              />+
            </div>
            <div>
              <p
                className='text-gray-900 font-bold dark:text-white'
              >Employees Active</p>
            </div>
          </div>


        </div>


        {/* Testimonials Starts here */}
        <div>
          {/* Heading of what client say */}
          <div className="text-center m-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 dark:text-gray-200 font-semibold mt-2">
              Real stories from businesses who use our system daily.
            </p>
          </div>

          {/* Clients & Feedbacks */}
          <div
            className=' w-[90%] flex flex-col md:flex-row mx-auto p-5 text-gray-800 border-1 rounded-xl border-gray-950 dark:border-gray-600  dark:text-white'
          >

            {/* Clients */}
            <div
              className='md:w-[30%]  mr-4 border-amber-100  '
            >
              {
                clients.map((each, index) => (
                  <div
                    key={index}
                    className={`list-none p-3 my-2  mx-1 cursor-pointer  hover:bg-gray-300  dark:hover:bg-gray-700  rounded-lg ${activeSideElement === index ? 'dark:bg-gray-700 bg-gray-300' : ''}`}
                    onClick={() => {
                      setActiveTab(`client${index + 1}`)
                      setActiveSideElement(index) 
                    }
                    }
                  >
                    {/* Client Name */}
                    <h1
                      className='font-bold text-2xl'
                    >
                      {each.name}
                    </h1>
                    {/* Business name */}
                    <li
                      className='text-gray-600 font-semibold dark:text-gray-400 '
                    >
                      {each.business}
                    </li>
                  </div>
                ))
              }
            </div>

            {/* Feedbacks  */}
            <div
              className=' md:w-[70%] lg:p-3 '
            >
              <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
              </svg>
              {renderedComponent()}
            </div>

          </div>
        </div>

      </section >


      {/* Other section */}
      


    </div >
  )
}
