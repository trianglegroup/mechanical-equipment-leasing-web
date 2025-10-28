"use client"

import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Product = {
  id: number
  name: string
  pricePerDay: number
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: "GEHL skid steer",
    pricePerDay: 200,
    image: "/1.jpg",
  },
  {
    id: 2,
    name: "14000 lbs Trailer",
    pricePerDay: 100,
    image: "/2.jpg",
  },
  {
    id: 3,
    name: "2008 Dutchman",
    pricePerDay: 200,
    image: "/3.jpg",
  },
  {
    id: 4,
    name: "2022 Cougar Camper",
    pricePerDay: 200,
    image: "/4.jpg",
  },
  {
    id: 5,
    name: "Tree Cutter",
    pricePerDay: 100,
    image: "/5.jpg",
  },
  {
    id: 6,
    name: "Box Trailer",
    pricePerDay: 175,
    image: "/6.jpg",
  },
  {
    id: 7,
    name: "JCB heavy Duty Skid Steer",
    pricePerDay: 200,
    image: "/7.jpg",
  },
  {
    id: 8,
    name: "Heavy Duty Brush hog",
    pricePerDay: 100,
    image: "/8.jpg",
  },
  {
    id: 9,
    name: "2008 Toyota Tundra Truck",
    pricePerDay: 200,
    image: "/9.jpg",
  },
  {
    id: 10,
    name: "Yanmar VIO35-6A Excavator",
    pricePerDay: 200,
    image: "/10.jpg",
  },
  {
    id: 11,
    name: "John Deere Tractor",
    pricePerDay: 200,
    image: "/11.jpg",
  },
  {
    id: 12,
    name: "Heavy Duty Trailer 15000 lbs",
    pricePerDay: 100,
    image: "/12.jpg",
  },
  {
    id: 13,
    name: "F350 Super Duty Truck",
    pricePerDay: 200,
    image: "/13.jpg",
  },
  {
    id: 14,
    name: "JCB excavator",
    pricePerDay: 200,
    image: "/14.jpg",
  },
  {
    id: 15,
    name: "15 seats minibus with wheel-chair access",
    pricePerDay: 200,
    image: "/15.jpg",
  },
]

type Language = "en" | "zh"

type TranslationCopy = {
  dialogTitle: string
  dialogSubtitle: (product: Product) => string
  selectLabel: string
  selectPlaceholder: string
  totalLabel: string
  totalHelper: (params: { pricePerDay: string; days: number }) => string
  emailButton: string
  emailSubject: (product: Product) => string
  emailBody: (params: {
    product: Product
    days: number
    pricePerDay: string
    total: string
  }) => string
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

const rentalDayOptions = Array.from({ length: 31 }, (_, index) => index + 1)

const translations: Record<Language, TranslationCopy> = {
  en: {
    dialogTitle: "Rent Equipment",
    dialogSubtitle: (product) =>
      `You are preparing to rent the ${product.name}. Select the number of days to get a total estimate.`,
    selectLabel: "Rental duration",
    selectPlaceholder: "Select days",
    totalLabel: "Estimated total",
    totalHelper: ({ pricePerDay, days }) =>
      `${pricePerDay} × ${days} ${days === 1 ? "day" : "days"}`,
    emailButton: "Compose Email",
    emailSubject: (product) => `Rental Inquiry: ${product.name}`,
    emailBody: ({ product, days, pricePerDay, total }) =>
      `Hello,\n\nI would like to rent the ${product.name} for ${days} ${
        days === 1 ? "day" : "days"
      }.\nDaily price: ${pricePerDay}\nEstimated total: ${total}.\n\nPlease let me know about availability.\n\nThank you.`,
  },
  zh: {
    dialogTitle: "设备租赁咨询",
    dialogSubtitle: (product) =>
      `您正在咨询租赁 ${product.name}，请选择租赁天数以查看预估总价。`,
    selectLabel: "租赁天数",
    selectPlaceholder: "选择天数",
    totalLabel: "预估总价",
    totalHelper: ({ pricePerDay, days }) =>
      `${pricePerDay} × ${days} 天`,
    emailButton: "编辑邮件",
    emailSubject: (product) => `租赁咨询：${product.name}`,
    emailBody: ({ product, days, pricePerDay, total }) =>
      `您好，\n\n我想租赁 ${product.name} ${days} 天。\n日租价格：${pricePerDay}\n预估总价：${total}。\n\n请告知是否有空档，谢谢！`,
  },
}

export default function Page() {
  const [activeLanguage, setActiveLanguage] = useState<Language>("en")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [rentalDays, setRentalDays] = useState<number>(1)
  const closeCleanupRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = translations[activeLanguage]

  const totalPrice = selectedProduct ? selectedProduct.pricePerDay * rentalDays : 0
  const formattedDailyPrice = selectedProduct
    ? formatCurrency(selectedProduct.pricePerDay)
    : ""
  const formattedTotalPrice = selectedProduct ? formatCurrency(totalPrice) : ""

  const getDayLabel = (days: number) =>
    activeLanguage === "en"
      ? `${days} ${days === 1 ? "day" : "days"}`
      : `${days} 天`

  const handleOpenRental = (product: Product) => {
    setSelectedProduct(product)
    setRentalDays(1)
    setIsDialogOpen(true)
  }

  const handleDialogChange = (open: boolean) => {
    if (closeCleanupRef.current) {
      clearTimeout(closeCleanupRef.current)
      closeCleanupRef.current = null
    }

    setIsDialogOpen(open)
    if (!open) {
      closeCleanupRef.current = setTimeout(() => {
        setSelectedProduct(null)
        closeCleanupRef.current = null
      }, 220)
    }
  }

  useEffect(() => {
    return () => {
      if (closeCleanupRef.current) {
        clearTimeout(closeCleanupRef.current)
      }
    }
  }, [])

  const handleComposeEmail = () => {
    if (!selectedProduct) {
      return
    }

    const subject = encodeURIComponent(copy.emailSubject(selectedProduct))
    const body = encodeURIComponent(
      copy.emailBody({
        product: selectedProduct,
        days: rentalDays,
        pricePerDay: formattedDailyPrice,
        total: formattedTotalPrice,
      }),
    )

    window.location.href = `mailto:niusteve16@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <Tabs
      value={activeLanguage}
      onValueChange={(value) => setActiveLanguage(value as Language)}
    >
      <div className="font-sans">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center space-x-4">
              <span className="font-semibold">Triangle</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm hover:underline cursor-pointer"
              >
                Contact Us
              </button>
              <TabsList>
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="zh">中文</TabsTrigger>
              </TabsList>
              <button className="flex flex-col space-y-1">
                <span className="h-0.5 w-6 bg-black"></span>
                <span className="h-0.5 w-6 bg-black"></span>
                <span className="h-0.5 w-6 bg-black"></span>
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16 md:px-6">
          <TabsContent value="en">
            <div className="relative">
              <h1 className="max-w-3xl text-6xl font-light leading-tight tracking-tight">
                Triangle Rental
              </h1>

              <div className="mt-24 flex justify-between">
                <div className="max-w-md">
                  <Button
                    variant="outline"
                    className="relative rounded-full border-black px-8 py-6 text-sm font-normal"
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
                <h2 className="text-4xl font-light mb-8">Equipment List</h2>
                <p className="max-w-xl text-sm leading-relaxed text-gray-600 mb-16">
                  We offer a wide range of professional construction machinery. All our equipment undergoes rigorous inspection and maintenance to ensure reliable support for your project. Click on any equipment card to select rental duration (1-31 days), view real-time price calculations, and send us an inquiry email.
                </p>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleOpenRental(product)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault()
                          handleOpenRental(product)
                        }
                      }}
                      className="cursor-pointer transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      aria-label={`${product.name} - ${formatCurrency(product.pricePerDay)}/day`}
                    >
                      <CardContent className="p-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-60 w-full object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(product.pricePerDay)}/day
                          </p>
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
                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-8 w-8 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Phone Consultation</h3>
                      <p className="text-sm text-gray-600 mb-3">Weekdays 9:00-18:00</p>
                      <p className="text-lg font-light">919-949-6226</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-8 w-8 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Email Contact</h3>
                      <p className="text-sm text-gray-600 mb-3">24/7 Online Reception</p>
                      <p className="text-lg font-light">niusteve16@gmail.com</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-8 w-8 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Company Address</h3>
                      <p className="text-sm text-gray-600 mb-3">Welcome to visit</p>
                      <p className="text-lg font-light">1094 Silk Hope Liberty Road, Liberty, NC 27298</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500">© 2024 Professional Mechanical Equipment Leasing. All rights reserved.</p>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="zh">
            <div className="relative">
              <h1 className="max-w-3xl text-6xl font-light leading-tight tracking-tight">
                三角租赁
              </h1>

              <div className="mt-24 flex justify-between">
                <div className="max-w-md">
                  <Button
                    variant="outline"
                    className="relative rounded-full border-black px-8 py-6 text-sm font-normal"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <span className="relative">
                      咨询租赁方案
                      <div className="absolute -left-4 -right-4 -top-4 -bottom-4 animate-spin-slow rounded-full border border-black opacity-50"></div>
                    </span>
                  </Button>
                  <p className="mt-8 text-sm leading-relaxed text-gray-600">
                    我们提供各类工程机械设备租赁服务，包括挖掘机、装载机、起重机等专业设备。以优质的设备状态、合理的租赁价格和专业的技术支持，为您的工程项目保驾护航。
                  </p>
                </div>
              </div>

              <section className="mt-32">
                <h2 className="text-4xl font-light mb-8">设备展示</h2>
                <p className="max-w-xl text-sm leading-relaxed text-gray-600 mb-16">
                  我们提供各类专业工程机械设备，所有设备均经过严格检测和维护，确保为您的项目提供可靠的机械支持。点击任意设备卡片可选择租赁天数（1-31天），实时查看价格计算，并发送咨询邮件。
                </p>

                {/* Products Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleOpenRental(product)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault()
                          handleOpenRental(product)
                        }
                      }}
                      className="cursor-pointer transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      aria-label={`${product.name} - ${formatCurrency(product.pricePerDay)}/天`}
                    >
                      <CardContent className="p-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-60 w-full object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(product.pricePerDay)}/天
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="mt-32 mb-16">
                <h2 className="text-4xl font-light mb-8 text-center">联系我们</h2>
                <p className="max-w-xl text-sm leading-relaxed text-gray-600 mb-16 text-center mx-auto">
                  我们随时为您提供专业的机械设备租赁咨询服务。无论您有任何问题或需求，都可以通过以下方式联系我们。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {/* Contact Cards */}
                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-8 w-8 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-2">电话咨询</h3>
                      <p className="text-sm text-gray-600 mb-3">工作日 9:00-18:00</p>
                      <p className="text-lg font-light">919-949-6226</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-8 w-8 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-2">邮箱联系</h3>
                      <p className="text-sm text-gray-600 mb-3">24小时在线接收</p>
                      <p className="text-lg font-light">sniusanjiaoacc@gmail.com</p>
                    </CardContent>
                  </Card>
                  <Card className="text-center">
                    <CardContent className="p-8">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <svg
                          className="h-8 w-8 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium mb-2">公司地址</h3>
                      <p className="text-sm text-gray-600 mb-3">欢迎实地考察</p>
                      <p className="text-lg font-light">1601 Walnut St Ste 201<br />Cary, NC 27511</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500">© 2024 专业机械设备租赁. 保留所有权利.</p>
                </div>
              </section>
            </div>
          </TabsContent>
        </main>

        <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
          <DialogContent className="sm:max-w-lg">
            {selectedProduct ? (
              <div className="space-y-6">
                <DialogHeader>
                  <DialogTitle>{copy.dialogTitle}</DialogTitle>
                  <DialogDescription>
                    {copy.dialogSubtitle(selectedProduct)}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{selectedProduct.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formattedDailyPrice}
                      {activeLanguage === "en" ? "/day" : "/天"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-foreground">
                    {copy.selectLabel}
                  </span>
                  <Select
                    value={String(rentalDays)}
                    onValueChange={(value) => setRentalDays(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={copy.selectPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {rentalDayOptions.map((day) => (
                        <SelectItem key={day} value={String(day)}>
                          {getDayLabel(day)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">
                    {copy.totalLabel}
                  </p>
                  <p className="text-2xl font-semibold">
                    {formattedTotalPrice}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {copy.totalHelper({
                      pricePerDay: formattedDailyPrice,
                      days: rentalDays,
                    })}
                  </p>
                </div>

                <DialogFooter>
                  <Button
                    className="w-full sm:w-auto sm:ml-auto"
                    onClick={handleComposeEmail}
                  >
                    {copy.emailButton}
                  </Button>
                </DialogFooter>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </Tabs>
  )
}
