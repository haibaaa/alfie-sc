/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
"use client"

import { useAuth } from "@clerk/nextjs/";
import { redirect } from "next/navigation";
import { useState } from "react"
import { ChevronLeft, ChevronRight, Minus, Plus, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { Line, Bar, LineChart, BarChart, ResponsiveContainer } from "recharts" 




const revenueData = [
  { value: 30 },
  { value: 40 },
  { value: 35 },
  { value: 45 },
  { value: 40 },
  { value: 30 },
  { value: 35 },
  { value: 55 },
]

const subscriptionData = [
  { value: 35 },
  { value: 55 },
  { value: 40 },
  { value: 60 },
  { value: 50 },
  { value: 65 },
  { value: 45 },
  { value: 60 },
]

const caloriesData = [
  { value: 80 },
  { value: 40 },
  { value: 20 },
  { value: 55 },
  { value: 30 },
  { value: 40 },
  { value: 25 },
  { value: 35 },
  { value: 55 },
  { value: 30 },
  { value: 45 },
  { value: 30 },
  { value: 70 },
]

const exerciseData = [
  { value: 10 },
  { value: 30 },
  { value: 50 },
  { value: 80 },
  { value: 100 },
  { value: 80 },
  { value: 50 },
  { value: 30 },
  { value: 10 },
]

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const teamMembers = [
  { name: "Sofia Davis", email: "m@example.com", role: "Owner" },
  { name: "Jackson Lee", email: "p@example.com", role: "Member" },
  { name: "Isabella Nguyen", email: "i@example.com", role: "Member" },
]

export default async function DashboardPage() {

  const { userId } = useAuth();

  if (!userId) {
    redirect("/auth/sign-in"); // protect the route
  }

  const [currentMonth] = useState("June 2023")

  return (
    <div className="min-h-screen bg-[#141414] p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Revenue Card - Now 2 columns wide */}
        <Card className="bg-[#1c1c1c] border-0 text-white md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-400">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$15,231.89</div>
            <div className="text-xs text-green-500 mt-1">+20.1% from last month</div>
            <div className="h-20 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#10b981", stroke: "#10b981" }}
                    activeDot={{ r: 6, fill: "#10b981", stroke: "#10b981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Card - Still 1 column wide */}
        <Card className="bg-[#1c1c1c] border-0 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-400">Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+2350</div>
            <div className="text-xs text-green-500 mt-1">+180.1% from last month</div>
            <div className="h-20 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subscriptionData}>
                  <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Card - Now spans 1 column */}
        <Card className="bg-[#1c1c1c] border-0 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-sm font-normal">{currentMonth}</CardTitle>
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {days.map((day) => (
                <div key={day} className="text-xs text-gray-400 w-8">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {[28, 29, 30, 31, 1, 2, 3].map((day) => (
                <div
                  key={`week1-${day}`}
                  className={`text-xs p-2 rounded-md w-8 ${day < 28 ? "text-white" : "text-gray-500"}`}
                >
                  {day}
                </div>
              ))}
              {[4, 5, 6, 7, 8, 9, 10].map((day) => (
                <div
                  key={`week2-${day}`}
                  className={`text-xs p-2 rounded-md w-8 ${day === 5 ? "bg-green-500 text-black" : "text-white"}`}
                >
                  {day}
                </div>
              ))}
              {[11, 12, 13, 14, 15, 16, 17].map((day) => (
                <div
                  key={`week3-${day}`}
                  className={`text-xs p-2 rounded-md w-8 ${day === 13 ? "bg-green-500 text-black" : "text-white"}`}
                >
                  {day}
                </div>
              ))}
              {[18, 19, 20, 21, 22, 23, 24].map((day) => (
                <div key={`week4-${day}`} className="text-xs p-2 rounded-md w-8 text-white">
                  {day}
                </div>
              ))}
              {[25, 26, 27, 28, 29, 30, 1].map((day) => (
                <div
                  key={`week5-${day}`}
                  className={`text-xs p-2 rounded-md w-8 ${day > 24 ? "text-white" : "text-gray-500"}`}
                >
                  {day}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Members Card - Spans 2 columns */}
        <Card className="bg-[#1c1c1c] border-0 text-white md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Team Members</CardTitle>
            <CardDescription className="text-gray-400">Invite your team members to collaborate.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 bg-gray-800">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gray-800 text-white">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-xs text-gray-400">{member.email}</div>
                  </div>
                </div>
                <Badge variant="outline" className="border-gray-700 text-white">
                  {member.role}
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Exercise Minutes Card - Spans 2 columns */}
        <Card className="bg-[#1c1c1c] border-0 text-white md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Performance</CardTitle>
            <CardDescription className="text-gray-400">
              Your performance so far
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={exerciseData}>
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}