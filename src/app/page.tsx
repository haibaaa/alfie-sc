/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { Search, ArrowRight, ChevronDown, Star, Clock, Check, Menu, X, User } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent } from "~/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const categories = [
    "Digital Marketing",
    "Graphics & Design",
    "Writing & Translation",
    "Video & Animation",
    "Programming & Tech",
    "Data",
    "Business",
    "Music & Audio"
  ]
  
  const popularServices = [
    {
      id: 1,
      title: "I will design modern UI UX for your web application",
      price: "120",
      deliveryTime: 3,
      rating: 4.9,
      reviews: 352,
      image: "/api/placeholder/600/400",
      seller: {
        name: "Ritwik Bhattacharyya",
        avatar: "/api/placeholder/50/50",
        level: "Top Rated"
      }
    },
    {
      id: 2,
      title: "I will develop a full-stack web application with React and Node",
      price: "450",
      deliveryTime: 7,
      rating: 4.8,
      reviews: 189,
      image: "/api/placeholder/600/400",
      seller: {
        name: "Samarth Patel",
        avatar: "/api/placeholder/50/50",
        level: "Level 2"
      }
    },
    {
      id: 3,
      title: "I will create custom illustrations for your brand",
      price: "85",
      deliveryTime: 2,
      rating: 5.0,
      reviews: 124,
      image: "/api/placeholder/600/400",
      seller: {
        name: "Neil",
        avatar: "/api/placeholder/50/50",
        level: "Level 1"
      }
    },
    {
      id: 4,
      title: "I will write SEO optimized content for your website",
      price: "60",
      deliveryTime: 1,
      rating: 4.7,
      reviews: 218,
      image: "/api/placeholder/600/400",
      seller: {
        name: "Nandini Menon",
        avatar: "/api/placeholder/50/50",
        level: "Top Rated"
      }
    }
  ]

  return (
    <div className="min-h-screen bg-[#141414] text-white">

      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find the perfect <span className="text-green-500">freelance</span> services for your business</h1>
            <p className="text-xl text-gray-300 mb-8">Connect with talented freelancers within minutes. Maintain full control of your projects.</p>
            <div className="flex max-w-xl">
              <Input 
                placeholder="Try 'web design' or 'logo design'" 
                className="bg-gray-800 border-gray-700 rounded-r-none focus-visible:ring-green-500" 
              />
              <Button className="bg-green-500 hover:bg-green-600 text-black rounded-l-none px-8">
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <span className="text-gray-400">Popular:</span>
              {["Website Design", "Logo Design", "Copywriting", "App Development"].map((tag, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] to-transparent z-10"></div>
            <img 
              src="/api/placeholder/600/800" 
              alt="Freelancer" 
              className="object-cover h-full w-full opacity-40"
            />
          </div>
        </div>
      </section>
      
      {/* Trusted By */}
      {/* <section className="py-8 bg-[#1c1c1c]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm">Trusted by:</p>
          </div>
          <div className="flex justify-center flex-wrap gap-8 md:gap-16 opacity-50">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="h-10">
                <div className="h-full w-24 bg-gray-600 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

<section className="py-8 bg-[#1c1c1c]">
  <div className="container mx-auto px-4">
    <div className="text-center mb-8">
      <p className="text-gray-400 text-sm">Trusted by:</p>
    </div>
    <div className="flex justify-center flex-wrap gap-8 md:gap-16 opacity-80">
      {[
        "https://snu.edu.in/site/templates/images/logo.svg",
        "https://via.placeholder.com/96x40?text=Logo+2",
        "https://via.placeholder.com/96x40?text=Logo+3",
        "https://via.placeholder.com/96x40?text=Logo+4",
        "https://via.placeholder.com/96x40?text=Logo+5",
      ].map((src, index) => (
        <div key={index} className="h-10 w-24">
          <img src={src} alt={`Logo ${index + 1}`} className="h-full w-full object-contain" />
        </div>
      ))}
    </div>
  </div>
</section>

      
      {/* Popular Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Popular Services</h2>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              See All <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((service) => (
              <Card key={service.id} className="bg-[#1c1c1c] border-0 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-3 relative h-48">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="object-cover h-full w-full"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex gap-3 items-center mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={service.seller.avatar} />
                      <AvatarFallback className="bg-gray-800">
                        {service.seller.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{service.seller.name}</div>
                      <div className="text-xs text-gray-400">{service.seller.level}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-sm mb-3 line-clamp-2 h-10">
                    {service.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-yellow-400 text-xs mb-3">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <span>{service.rating}</span>
                    <span className="text-gray-400">({service.reviews})</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.deliveryTime} day{service.deliveryTime > 1 ? 's' : ''}
                    </div>
                    <div className="font-medium">
                      <span className="text-xs text-gray-400">From</span>
                      <span className="text-green-500"> ${service.price}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-[#1c1c1c]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">How alfie Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Connect with freelancers offering business services at competitive prices and get high quality work delivered on time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Find the perfect service",
                description: "Browse through thousands of services in various categories.",
                icon: <Search className="h-6 w-6" />
              },
              {
                title: "Connect with the right freelancer",
                description: "Chat with freelancers before hiring and collaborate easily.",
                icon: <User className="h-6 w-6" />
              },
              {
                title: "Pay when you're satisfied",
                description: "Payment is released to the freelancer once you approve the work.",
                icon: <Check className="h-6 w-6" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Banner */}
      <section className="py-16 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join the <span className="text-green-500">alfie</span> community</h2>
            <p className="text-gray-300 mb-8">
              Find freelancers for your projects or offer your skills to clients worldwide
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-green-500 hover:bg-green-600 text-black px-8 py-6" onClick={() => window.location.href = "/auth/sign-up"}>
            Join as a Client
            </Button>

            <Button
            variant="outline"
            className="border-green-500 text-green-500 hover:bg-green-500/10 px-8 py-6"
            onClick={() => window.location.href = "/auth/sign-up/"}
            >
                Join as a Freelancer
            </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#1c1c1c] border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.slice(0, 5).map((category, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">About</h3>
              <ul className="space-y-2">
                {["Careers", "Press & News", "Partnerships", "Privacy Policy", "Terms of Service"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Support</h3>
              <ul className="space-y-2">
                {["Help & Support", "Trust & Safety", "Selling on alfie", "Buying on alfie"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Community</h3>
              <ul className="space-y-2">
                {["Events", "Blog", "Forum", "Podcast", "Become a Seller"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">More</h3>
              <ul className="space-y-2">
                {["alfie Business", "alfie Pro", "alfie Logo Maker", "Get Inspired"].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <a href="#" className="text-2xl font-bold text-green-500">alfie</a>
              <p className="text-sm text-gray-400 mt-2">© 2025 alfie Inc.</p>
            </div>
            
            <div className="flex gap-4">
              {["twitter", "facebook", "instagram", "linkedin", "pinterest"].map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-70"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}