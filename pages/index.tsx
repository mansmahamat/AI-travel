/* eslint-disable react/no-children-prop */
import Head from "next/head"
import Image from "next/image"
import styles from "@component/styles/Home.module.css"
import ReactMarkdown from "react-markdown"
import { Fragment, SetStateAction, useState } from "react"
import remarkGfm from "remark-gfm"
import { Dialog, Transition } from "@headlessui/react"
import {
  CalendarIcon,
  HomeIcon,
  MapIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  SpeakerWaveIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid"

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Teams", href: "#", icon: UserGroupIcon, current: false },
  { name: "Directory", href: "#", icon: PlusCircleIcon, current: false },
  { name: "Announcements", href: "#", icon: SpeakerWaveIcon, current: false },
  { name: "Office Map", href: "#", icon: MapIcon, current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

const options = {
  travelStyles: [
    "Cultural",
    "Adventure",
    "Relaxation",
    "Beach",
    "City Break",
    "Road Trip",
    "Wildlife Safari",
    "Ski",
  ],
  interestsNew: [
    { name: "History", emoji: "🏛️" },
    { name: "Art", emoji: "🎨" },
    { name: "Food", emoji: "🍴" },
    { name: "Music", emoji: "🎵" },
    { name: "Nature", emoji: "🌳" },
    { name: "Sports", emoji: "⚽" },
    { name: "Photography", emoji: "📷" },
    { name: "Architecture", emoji: "🏰" },
    { name: "Literature", emoji: "📚" },
  ],

  interests: [
    "History",
    "Art",
    "Food",
    "Music",
    "Nature",
    "Sports",
    "Photography",
    "Architecture",
    "Literature",
  ],

  accommodationTypes: [
    "Hotel",
    "Boutique Hotel",
    "Hostel",
    "Resort",
    "Vacation Rental",
    "Camping",
    "Homestay",
    "Bed and Breakfast",
  ],
  activityTypes: [
    "Outdoor",
    "Sightseeing",
    "Shopping",
    "Nightlife",
    "Museums",
    "Theme Parks",
    "Water Sports",
    "Yoga and Wellness",
  ],
  cuisineTypes: [
    { name: "Traditional", emoji: "😋" },
    { name: "Japanese", emoji: "🍱" },
    { name: "Italian", emoji: "🍝" },
    { name: "American", emoji: "🍔" },
    { name: "Korean", emoji: "🍜" },
    { name: "Mexican", emoji: "🌮" },
    { name: "Thai", emoji: "🍲" },
    { name: "Turkish", emoji: "🥙" },
    { name: "Indian", emoji: "🍛" },
    { name: "French", emoji: "🥐" },
    { name: "Spanish", emoji: "🥘" },
    { name: "Greek", emoji: "🍗" },
    { name: "Chinese", emoji: "🥡" },
    { name: "Halal", emoji: "☪️" },
    { name: "Vegan", emoji: "🥬" },
    { name: "Kosher", emoji: "✡️" },
    { name: "Gluten-free", emoji: "♨️" },
  ],

  specialRegime: [
    { name: "Halal", emoji: "☪️" },
    { name: "Vegan", emoji: "🥬" },
    { name: "Kosher", emoji: "✡️" },
    { name: "Gluten-free", emoji: "♨️" },
  ],

  languages: [
    { value: "en", label: "English", icon: "🇺🇸" },
    //   { value: "tr", label: "Türkçe", icon: "🇹🇷" },
    { value: "fr", label: "Français", icon: "🇫🇷" },
    { value: "es", label: "Español", icon: "🇪🇸" },
    // { value: "de", label: "Deutsch", icon: "🇩🇪" },
    // { value: "it", label: "Italiano", icon: "🇮🇹" },
    // { value: "pt", label: "Português", icon: "🇵🇹" },
    // { value: "ru", label: "Русский", icon: "🇷🇺" },
    // { value: "ja", label: "日本語", icon: "🇯🇵" },
  ],
}

const topLocations = [
  { name: "Seoul, Korea", value: "Seoul/Korea" },
  { name: "Stockholm, Sweden", value: "Stockholm/Sweden" },
  { name: "Los Angeles, CA", value: "Los Angeles/California" },
  // add more top locations as needed
]

const defaultValues = {
  destinationCountry: "",
  budget: "250 USD",
  travelStyle: options.travelStyles[0],
  interestsNew: [],
  accommodationType: options.accommodationTypes[0],
  transportationType: "Bus",
  activityType: [options.activityTypes[0]],
  cuisineType: options.cuisineTypes[0],
  tripDuration: "3",
  language: options.languages[0].value,
  specialRegime: [],
}

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [values, setValues] = useState(defaultValues)
  const [selectedInterests, setSelectedInterests] = useState([])
  const [selectedCuisineTypes, setSelectedCuisineTypes] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState(options.languages[0])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const ResponseData = ({ response }: any) => {
    return (
      <div className="flex text-black flex-col justify-center items-center">
        <h2 onClick={() => setResponse("")} className="text-2xl font-normal">
          <span role="img" aria-label="emoji"></span> RESET
        </h2>
        <div className="w-4/5 text-base font-normal text-black rounded-md p-4 m-8">
          <ReactMarkdown children={response} remarkPlugins={[remarkGfm]} />
        </div>
        <div>
          <button
            className="rounded text-xs font-bold cursor-pointer text-black bg-white"
            onClick={() => {
              const blob = new Blob([response], {
                type: "text/plain;charset=utf-8",
              })
              const url = URL.createObjectURL(blob)
              const link = document.createElement("a")
              link.setAttribute("href", url)
              link.setAttribute("download", "travel-plan.txt")
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              URL.revokeObjectURL(url)
              return false
            }}
          >
            Download
          </button>
        </div>
      </div>
    )
  }

  const handleCuisineTypeClick = (cuisineType: any) => {
    //@ts-ignore
    if (selectedCuisineTypes.includes(cuisineType)) {
      setSelectedCuisineTypes(
        selectedCuisineTypes.filter((item) => item !== cuisineType)
      )
      //@ts-ignore

      setValues((prevState) => ({
        ...prevState,
        cuisineType: selectedCuisineTypes.filter(
          (item) => item !== cuisineType
        ),
      }))
    } else {
      if (selectedCuisineTypes.length >= 3) {
        //@ts-ignore

        setSelectedCuisineTypes((prevSelectedCuisineTypes) => {
          const newSelectedCuisineTypes = [
            ...prevSelectedCuisineTypes.slice(1),
            cuisineType,
          ]
          //@ts-ignore

          setValues((prevState) => ({
            ...prevState,
            cuisineType: newSelectedCuisineTypes,
          }))
          return newSelectedCuisineTypes
        })
      } else {
        //@ts-ignore

        setSelectedCuisineTypes((prevSelectedCuisineTypes) => {
          const newSelectedCuisineTypes = [
            ...prevSelectedCuisineTypes,
            cuisineType,
          ]
          //@ts-ignore

          setValues((prevState) => ({
            ...prevState,
            cuisineType: newSelectedCuisineTypes,
          }))
          return newSelectedCuisineTypes
        })
      }
    }
  }

  const handleInterestClick = (interest: any) => {
    //@ts-ignore

    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      )
    } else {
      if (selectedInterests.length >= 3) {
        //@ts-ignore

        setSelectedInterests((prevSelectedInterests) => {
          const newSelectedInterests = [
            ...prevSelectedInterests.slice(1),
            interest,
          ]
          //@ts-ignore

          setValues((prevState) => ({
            ...prevState,
            interestsNew: newSelectedInterests,
          }))
          return newSelectedInterests
        })
      } else {
        //@ts-ignore

        setSelectedInterests((prevSelectedInterests) => {
          const newSelectedInterests = [...prevSelectedInterests, interest]
          //@ts-ignore

          setValues((prevState) => ({
            ...prevState,
            interestsNew: newSelectedInterests,
          }))
          return newSelectedInterests
        })
      }
    }
  }

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleLocationClick = (location: { name: any }) => {
    setValues((prevState) => ({
      ...prevState,
      destinationCountry: location.name,
    }))
  }

  const handleMultiSelectChange = (e: {
    target: { name: any; options: any }
  }) => {
    const { name, options } = e.target
    const selectedOptions: any[] = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value)
      }
    }
    setValues((prevState) => ({
      ...prevState,
      [name]: selectedOptions,
    }))
  }

  const handleLanguageClick = (option: {
    value: SetStateAction<{ value: string; label: string; icon: string }>
    label: any
  }) => {
    setSelectedLanguage(option.value)

    setValues((prevState) => ({
      ...prevState,
      language: option.label,
    }))
  }

  // const handleSubmit = (
  //   e: { preventDefault: () => void },
  //   values: {
  //     destinationCountry: any
  //     budget: any
  //     travelStyle: any
  //     interestsNew: any
  //     accommodationType: any
  //     transportationType: any
  //     activityType: any
  //     cuisineType: any
  //     tripDuration: any
  //     language: any
  //   }
  // ) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   // let prompt = `Generate a personalized travel itinerary for a trip to ${values.destinationCountry} with a budget of ${values.budget}. The traveler is interested in a ${values.travelStyle} vacation and enjoys ${values.interestsNew}. They are looking for ${values.accommodationType} accommodations and prefer ${values.transportationType} transportation. The itinerary should include ${values.activityType} activities and ${values.cuisineType} dining options. Please provide a detailed itinerary with daily recommendations for ${values.tripDuration} days, including suggested destinations, activities, and dining options. The itinerary should be written in ${values.language}. `

  //   fetch(`/api/trip`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setResponse(data.result)
  //       console.log("RES", data)

  //       setLoading(false)
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //       setLoading(false)
  //     })
  // }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoading(true)
    let prompt = `Generate a personalized travel itinerary for a trip to ${values.destinationCountry} with a budget of ${values.budget}. The traveler is interested in a ${values.travelStyle} vacation and enjoys ${values.interestsNew}. They are looking for ${values.accommodationType} accommodations and prefer ${values.transportationType} transportation. The itinerary should include ${values.activityType} activities and ${values.cuisineType} dining options. Please provide a detailed itinerary with daily recommendations for ${values.tripDuration} days, including suggested destinations, activities, and dining options. The itinerary should be written in ${values.language}. `

    fetch(`https://c3-na.altogic.com/e:6407519d2f0b61e4d9dda50f/travel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.choices[0].message.content)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }

  console.log("Value", values)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XCircleIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg"
                      alt="Workflow"
                    />
                  </div>
                  <nav aria-label="Sidebar" className="mt-5">
                    <div className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
                <div className="flex-shrink-0 flex border-t  p-4">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                          Whitney Francis
                        </p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                          View profile
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}

        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex-1 flex flex-col min-h-0 border-r  bg-gray-100">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center flex-shrink-0 px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-900-text.svg"
                    alt="Workflow"
                  />
                </div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t  p-4">
                <a href="#" className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        Whitney Francis
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col min-w-0 flex-1 ">
          <div className="lg:hidden">
            <div className="flex items-center justify-between bg-gray-50 border-b  px-4 py-1.5">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MinusCircleIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 relative z-0 flex ">
            <main className="flex-1 relative z-0 flex-shrink-0 overflow-y-auto focus:outline-none xl:order-last">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div className="h-full   rounded-lg">
                  {loading
                    ? "LOADING"
                    : response && <ResponseData response={response} />}
                </div>
              </div>
              {/* End main area */}
            </main>
            <aside className=" relative xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r  ">
              {/* Start secondary column (hidden on smaller screens) */}

              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div className="h-full   rounded-lg">
                  {!response ? (
                    <form className=" h-full" onSubmit={handleSubmit}>
                      <label htmlFor="destinationCountry">
                        Destination Country
                      </label>
                      <input
                        className="rounded-md  border border-indigo-600  text-xs text-black"
                        type="text"
                        placeholder="e.g. San Francisco/USA, Paris/France, Istanbul/Turkey, etc."
                        id="destinationCountry"
                        name="destinationCountry"
                        value={values.destinationCountry}
                        onChange={handleChange}
                        required
                      />
                      {/* <div>
                <label htmlFor="topDestinations">🔥Top Destionations:</label>
                {topLocations.map((location) => (
                  <div
                    key={location.value}
                    onClick={() => handleLocationClick(location)}
                  >
                    {location.name}
                  </div>
                ))}
              </div> */}
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-start flex-wrap w-full">
                          <label htmlFor="budget">
                            Budget
                            <p
                              style={{
                                display: "inline-block",
                                color: "#666",
                                fontSize: "10px",
                              }}
                            >
                              (with currency)
                            </p>
                          </label>
                          <input
                            className="rounded-md  border border-indigo-600  text-xs text-black"
                            type="text"
                            placeholder="e.g. $1000 USD, 1000 EUR, etc."
                            id="budget"
                            name="budget"
                            value={values.budget}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="flex flex-row items-start flex-wrap w-full">
                          <label htmlFor="tripDuration">
                            Trip Duration
                            <p
                              style={{
                                display: "inline-block",
                                color: "#666",
                                fontSize: "10px",
                              }}
                            >
                              (in days)
                            </p>
                          </label>
                          <input
                            className="rounded-md  border border-indigo-600  text-xs text-black"
                            type="number"
                            id="tripDuration"
                            name="tripDuration"
                            value={values.tripDuration}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <label htmlFor="interests">Interests</label>
                      <div className="flex flex-row items-start flex-wrap w-full">
                        {options.interestsNew.map((interest, index) => (
                          <div
                            key={index}
                            className={
                              //@ts-ignore
                              selectedInterests.includes(interest?.name)
                                ? "flex border border-emerald-600 text-xs items-center p-1 mr-1 mb-1 cursor-pointer rounded-md"
                                : "flex text-xs items-center p-1 mr-1 mb-1 cursor-pointer rounded-md"
                            }
                            onClick={() => {
                              handleInterestClick(interest.name)
                            }}
                            //@ts-ignore

                            value={interest}
                          >
                            <span aria-label="emoji">{interest.emoji}</span>
                            <span>{interest.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-start flex-wrap w-full">
                          <label htmlFor="accommodationType">
                            Accommodation
                          </label>
                          <select
                            id="accommodationType"
                            name="accommodationType"
                            value={values.accommodationType}
                            onChange={handleChange}
                          >
                            {options.accommodationTypes.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-row  items-center flex-wrap w-full">
                          <label
                            className="text-xs font-bold p-2"
                            htmlFor="travelStyle"
                          >
                            Travel Style
                          </label>
                          <select
                            id="travelStyle"
                            name="travelStyle"
                            value={values.travelStyle}
                            onChange={handleChange}
                            className="rounded-lg text-xs text-black"
                          >
                            {options.travelStyles.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <label htmlFor="transportationType">
                        Transportation Type
                        <p
                          style={{
                            display: "inline-block",
                            fontSize: "10px",

                            color: "#666",
                          }}
                        >
                          (e.g. car, train, bus, etc.)
                        </p>
                      </label>
                      <input
                        className="rounded-md  border border-indigo-600  text-xs text-black"
                        type="text"
                        id="transportationType"
                        name="transportationType"
                        value={values.transportationType}
                        onChange={handleChange}
                        required
                      />

                      <label
                        className="text-xs font-bold p-2"
                        htmlFor="activityType"
                      >
                        Activity Type
                        <p
                          style={{
                            display: "inline-block",
                            fontSize: "10px",

                            color: "#666",
                          }}
                        >
                          (select multiple options)
                        </p>
                      </label>
                      <select
                        id="activityType"
                        name="activityType"
                        multiple
                        value={values.activityType}
                        className="rounded-lg text-xs text-black"
                        onChange={handleMultiSelectChange}
                      >
                        {options.activityTypes.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="cuisineType">Cuisine Type</label>
                      <div className="flex flex-row items-center flex-wrap">
                        {options.cuisineTypes.map((cuisineType) => (
                          <div
                            multiple
                            value={values.cuisineType}
                            //@ts-ignore

                            onChange={handleMultiSelectChange}
                            key={cuisineType.name}
                            className={
                              //@ts-ignore

                              selectedCuisineTypes.includes(cuisineType.name)
                                ? "border border-emerald-600 flex flex-row justify-center items-center cursor-pointer text-xs p-2 mb-1 mr-1 rounded-md"
                                : "flex flex-row justify-center items-center cursor-pointer text-xs p-2 mb-1 mr-1 rounded-md"
                            }
                            onClick={() => {
                              handleCuisineTypeClick(cuisineType.name)
                            }}
                          >
                            <span role="img" aria-label={cuisineType.name}>
                              {cuisineType.emoji}
                            </span>

                            <br />

                            <span>{cuisineType.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className=" flex flex-col">
                        <label>Language</label>
                        <div className="flex flex-row justify-start items-center flex-wrap">
                          {options.languages.map((option) => (
                            <div
                              key={option.value}
                              onClick={() => {
                                //@ts-ignore

                                handleLanguageClick(option)
                              }}
                              //@ts-ignore

                              value={values.language}
                              className={
                                //@ts-ignore

                                selectedLanguage === option.value
                                  ? "flex border border-emerald-600  text-2xl flex-col items-center mr-1 p-2 rounded-md cursor-pointer"
                                  : "flex text-2xl flex-col items-center mr-1 p-2 rounded-md cursor-pointer"
                              }
                            >
                              <span role="img" aria-label={option.label}>
                                {option.icon}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        //@ts-ignore

                        loading={loading}
                        type="submit"
                        disabled={loading}
                        className="bg-red-600 py-2 px-2 cursor-pointer"
                      >
                        SUBMIT
                      </button>
                    </form>
                  ) : (
                    <ResponseData response={response} />
                  )}
                </div>
              </div>
              {/* End secondary column */}
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
