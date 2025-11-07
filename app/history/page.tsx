"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, BarChart3, TrendingUp } from "lucide-react"
import Link from "next/link"

interface HistoricalMatch {
  id: string
  date: string
  team1: string
  team2: string
  team1Logo: string
  team2Logo: string
  format: string
  prediction: number
  actualResult: string
  accuracy: boolean
  venue: string
}

const mockHistoricalMatches: HistoricalMatch[] = [
  {
    id: "1",
    date: "Nov 3, 2025",
    team1: "India",
    team2: "New Zealand",
    team1Logo: "🇮🇳",
    team2Logo: "🇳🇿",
    format: "ODI",
    prediction: 72,
    actualResult: "India Won",
    accuracy: true,
    venue: "Arun Jaitley Stadium",
  },
  {
    id: "2",
    date: "Nov 1, 2025",
    team1: "Australia",
    team2: "England",
    team1Logo: "🇦🇺",
    team2Logo: "🇬🇧",
    format: "T20",
    prediction: 58,
    actualResult: "England Won",
    accuracy: false,
    venue: "Lord's",
  },
  {
    id: "3",
    date: "Oct 28, 2025",
    team1: "Pakistan",
    team2: "South Africa",
    team1Logo: "🇵🇰",
    team2Logo: "🇿🇦",
    format: "ODI",
    prediction: 65,
    actualResult: "Pakistan Won",
    accuracy: true,
    venue: "National Stadium",
  },
  {
    id: "4",
    date: "Oct 25, 2025",
    team1: "West Indies",
    team2: "Sri Lanka",
    team1Logo: "🇼🇮",
    team2Logo: "🇱🇰",
    format: "T20",
    prediction: 54,
    actualResult: "Sri Lanka Won",
    accuracy: false,
    venue: "Kensington Oval",
  },
]

export default function HistoryPage() {
  const [filterFormat, setFilterFormat] = useState("All")
  const [filterAccuracy, setFilterAccuracy] = useState("All")

  const filteredMatches = mockHistoricalMatches.filter((match) => {
    const formatMatch = filterFormat === "All" || match.format === filterFormat
    const accuracyMatch =
      filterAccuracy === "All" ||
      (filterAccuracy === "Correct" && match.accuracy) ||
      (filterAccuracy === "Incorrect" && !match.accuracy)
    return formatMatch && accuracyMatch
  })

  const correctPredictions = mockHistoricalMatches.filter((m) => m.accuracy).length
  const accuracy = Math.round((correctPredictions / mockHistoricalMatches.length) * 100)

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Prediction History
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-red-500" />
              <p className="text-slate-400 text-sm">Total Predictions</p>
            </div>
            <p className="text-4xl font-bold text-white">{mockHistoricalMatches.length}</p>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <p className="text-slate-400 text-sm">Accuracy Rate</p>
            </div>
            <p className="text-4xl font-bold text-green-500">{accuracy}%</p>
            <p className="text-slate-400 text-xs mt-2">{correctPredictions} correct predictions</p>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <p className="text-slate-400 text-sm">Latest Update</p>
            </div>
            <p className="text-white font-bold">Nov 3, 2025</p>
            <p className="text-slate-400 text-xs mt-2">Updated 2 hours ago</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800/30 border-slate-700 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 font-semibold mb-3 text-sm">Format</label>
              <div className="flex gap-2">
                {["All", "ODI", "T20"].map((format) => (
                  <Button
                    key={format}
                    variant={filterFormat === format ? "default" : "outline"}
                    className={`text-sm ${
                      filterFormat === format
                        ? "bg-red-500 text-white border-red-500"
                        : "border-slate-600 text-slate-300"
                    }`}
                    onClick={() => setFilterFormat(format)}
                  >
                    {format}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-3 text-sm">Accuracy</label>
              <div className="flex gap-2">
                {["All", "Correct", "Incorrect"].map((status) => (
                  <Button
                    key={status}
                    variant={filterAccuracy === status ? "default" : "outline"}
                    className={`text-sm ${
                      filterAccuracy === status
                        ? "bg-red-500 text-white border-red-500"
                        : "border-slate-600 text-slate-300"
                    }`}
                    onClick={() => setFilterAccuracy(status)}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Historical Matches */}
        <div className="space-y-4">
          {filteredMatches.map((match) => (
            <Card key={match.id} className="bg-slate-800/30 border-slate-700 p-6 hover:border-red-500/50 transition">
              <div className="flex items-center justify-between">
                {/* Match Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <Badge className="bg-slate-700 text-slate-300 text-xs">{match.format}</Badge>
                    <p className="text-slate-400 text-sm">{match.date}</p>
                    <p className="text-slate-400 text-sm">{match.venue}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl mb-1">{match.team1Logo}</div>
                      <p className="text-white font-semibold text-sm">{match.team1}</p>
                    </div>
                    <p className="text-slate-500">vs</p>
                    <div className="text-center">
                      <div className="text-3xl mb-1">{match.team2Logo}</div>
                      <p className="text-white font-semibold text-sm">{match.team2}</p>
                    </div>
                  </div>
                </div>

                {/* Prediction vs Result */}
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs mb-1">PREDICTED</p>
                    <p className="text-red-500 font-bold text-lg">{match.prediction}%</p>
                  </div>

                  <div className="text-center">
                    <p className="text-slate-400 text-xs mb-1">RESULT</p>
                    <p className="text-white font-bold text-sm">{match.actualResult}</p>
                    <Badge
                      className={`mt-2 text-xs ${
                        match.accuracy
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {match.accuracy ? "✓ Correct" : "✗ Incorrect"}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No predictions found matching your filters.</p>
          </div>
        )}
      </div>
    </main>
  )
}
