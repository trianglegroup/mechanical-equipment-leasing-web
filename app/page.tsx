"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const products = [
  {
    id: 1,
    name: "Gehl v420 Skid Steer",
    price: "$150/day",
    image: "/1.jpg",
  },
  {
    id: 2,
    name: "14000 lbs Capacity Trailer",
    price: "$100/day",
    image: "/2.jpg",
  },
  {
    id: 3,
    name: "RV Camper",
    price: "$200/day",
    image: "/3.jpg",
  },
  {
    id: 4,
    name: "Trailer",
    price: "$150/day",
    image: "/4.jpg",
  },
  {
    id: 5,
    name: "Tree Cutter",
    price: "$100/day",
    image: "/5.jpg",
  },
  {
    id: 6,
    name: "Utility Trailer",
    price: "$100/day",
    image: "/6.jpg",
  },
  {
    id: 7,
    name: "Skid Steer",
    price: "$150/day",
    image: "/7.jpg",
  },
  {
    id: 8,
    name: "Bush Hog",
    price: "$100/day",
    image: "/8.jpg",
  },
  {
    id: 9,
    name: "Toyota Tundra",
    price: "$100/day",
    image: "/9.jpg",
  },
  {
    id: 10,
    name: "Yanmar excavator",
    price: "$175/day",
    image: "/10.jpg",
  },
  {
    id: 11,
    name: "John Deere Tractor",
    price: "$120/day",
    image: "/11.jpg",
  },
  {
    id: 12,
    name: "Large Trailer",
    price: "$100/day",
    image: "/12.jpg",
  },
  {
    id: 13,
    name: "2018 Ford F-350 Super Duty XL Crew Cab 4WD",
    price: "$200/day",
    image: "/13.jpg",
  },
  {
    id: 14,
    name: "JCB excavator",
    price: "$175/day",
    image: "/14.jpg",
  },
  {
    id: 15,
    name: "15 seats minibus with wheelchair lift",
    price: "$150/day",
    image: "/15.jpg",
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <header className="flex items-center justify-between p-6">
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-black"></div>
          <div className="h-2 w-2 rounded-full bg-black"></div>
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="text-sm hover:underline cursor-pointer"
          >
            Contact Us
          </button>
          <button className="flex flex-col space-y-1">
            <span className="h-0.5 w-6 bg-black"></span>
            <span className="h-0.5 w-6 bg-black"></span>
          </button>
        </div>
      </header>

      <main className="relative px-6 pt-12">
        {/* Gradient blob */}
        <div
          className="absolute right-0 top-0 h-[300px] w-[300px] animate-pulse rounded-full bg-gradient-to-br from-pink-400 via-orange-300 to-yellow-200 opacity-70 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative">
          <h1 className="max-w-3xl text-6xl font-light leading-tight tracking-tight">
            Mechanical Equipment
            <br />
            Rental Service
          </h1>

          <div className="mt-24 flex justify-between">
            <div className="max-w-md">
              <Button
                variant="outline"
                className="rounded-full border-2 px-8 bg-transparent"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <span className="relative">
                  Consult Rental Plan
                  <div className="absolute -left-4 -right-4 -top-4 -bottom-4 animate-spin-slow rounded-full border border-black opacity-50"></div>
                </span>
              </Button>
              <p className="mt-8 text-sm leading-relaxed text-gray-600">
                We provide a variety of construction machinery and equipment rental services, including excavators, loaders, cranes, and other professional equipment. With high-quality equipment, reasonable rental prices, and professional technical support, we ensure the success of your engineering projects.
              </p>
            </div>


          </div>


          <section className="mt-32">
            <h2 className="text-4xl font-light mb-8">Equipment Display</h2>
            <p className="max-w-xl text-sm leading-relaxed text-gray-600 mb-16">
              We offer a wide range of professional construction machinery. All our equipment undergoes rigorous inspection and maintenance to ensure reliable support for your project.
            </p>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {products.map((product) => (
                <Card key={product.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-[3/2] overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                      <p className="text-2xl font-light text-orange-500">{product.price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          </section>

          {/* Contact Section */}
          <section id="contact" className="mt-32 mb-16">
            <h2 className="text-4xl font-light mb-8 text-center">Contact Us</h2>
            <p className="max-w-xl text-sm leading-relaxed text-gray-600 mb-16 text-center mx-auto">
              We are always ready to provide you with professional consulting services for mechanical equipment leasing. If you have any questions or needs, you can contact us in the following ways.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Contact Cards */}
              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Phone Consultation</h3>
                  <p className="text-sm text-gray-600 mb-3">Weekdays 9:00-18:00</p>
                  <p className="text-lg font-light">919-949-6226</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email Contact</h3>
                  <p className="text-sm text-gray-600 mb-3">24/7 Online Reception</p>
                  <p className="text-lg font-light">sniusanjiaoacc@gmail.com</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Company Address</h3>
                  <p className="text-sm text-gray-600 mb-3">Welcome to visit</p>
                  <p className="text-lg font-light">1601 Walnut St Ste 201<br />Cary, NC 27511</p>
                </CardContent>
              </Card>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">© 2024 Professional Mechanical Equipment Leasing. All rights reserved.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
