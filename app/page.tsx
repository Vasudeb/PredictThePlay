"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Users, Trophy } from "lucide-react"

interface Match {
  id: string
  team1: string
  team2: string
  startTime: string
  status: "live" | "upcoming" | "completed"
  prediction: number
  format: string
  venue: string
  team1Logo: string
  team2Logo: string
}

const mockMatches: Match[] = [
  {
    id: "1",
    team1: "India",
    team2: "Australia",
    startTime: "2025-11-07T14:00:00",
    status: "live",
    prediction: 65,
    format: "ODI",
    venue: "MCG, Melbourne",
    team1Logo: "🇮🇳",
    team2Logo: "🇦🇺",
  },
  {
    id: "2",
    team1: "Pakistan",
    team2: "England",
    startTime: "2025-11-08T10:00:00",
    status: "upcoming",
    prediction: 52,
    format: "T20",
    venue: "Lord's, London",
    team1Logo: "🇵🇰",
    team2Logo: "🇬🇧",
  },
  {
    id: "3",
    team1: "South Africa",
    team2: "West Indies",
    startTime: "2025-11-08T15:30:00",
    status: "upcoming",
    prediction: 71,
    format: "T20",
    venue: "Wanderers, Johannesburg",
    team1Logo: "🇿🇦",
    team2Logo: "🇼🇮",
  },
  {
    id: "4",
    team1: "New Zealand",
    team2: "Sri Lanka",
    startTime: "2025-11-06T09:00:00",
    status: "completed",
    prediction: 58,
    format: "ODI",
    venue: "Eden Park, Auckland",
    team1Logo: "🇳🇿",
    team2Logo: "🇱🇰",
  },
]

export default function Home() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null)
  const liveMatch = mockMatches.find((m) => m.status === "live")

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              🏏 PredictThePlay
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-slate-300 hover:text-white transition">
              Matches
            </a>
            <a href="/predictions" className="text-slate-300 hover:text-white transition">
              Predictions
            </a>
            <a href="/players" className="text-slate-300 hover:text-white transition">
              Analytics
            </a>
            <Link
              href="/ball-by-ball"
              className="text-slate-300 hover:text-white transition font-semibold text-orange-500 hover:text-orange-400"
            >
              Ball by Ball
            </Link>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0">
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Live Match */}
      {liveMatch && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="text-red-500 font-semibold">LIVE NOW</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {liveMatch.team1} vs {liveMatch.team2}
                </h1>
                <div className="space-y-3 mb-6">
                  <p className="text-slate-300 text-lg">
                    {liveMatch.format} Match • {liveMatch.venue}
                  </p>
                  <div className="flex items-center gap-4">
                    <Badge className="bg-red-500 text-white">LIVE</Badge>
                    <span className="text-slate-400">Started 45 minutes ago</span>
                  </div>
                </div>
                <Link href="/ball-by-ball">
                  <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-lg px-8 py-6 border-0">
                    View Live Prediction
                  </Button>
                </Link>
              </div>
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-8">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-red-500 mb-2">{liveMatch.prediction}%</div>
                  <p className="text-slate-300">Predicted Win Probability</p>
                </div>
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-700">
                  <div className="text-center flex-1">
                    <div className="text-3xl font-bold text-white mb-2">{liveMatch.team1Logo}</div>
                    <p className="text-slate-400">{liveMatch.team1}</p>
                  </div>
                  <div className="text-slate-500 font-bold text-2xl">vs</div>
                  <div className="text-center flex-1">
                    <div className="text-3xl font-bold text-white mb-2">{liveMatch.team2Logo}</div>
                    <p className="text-slate-400">{liveMatch.team2}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">AI Confidence</span>
                    <span className="text-green-400 font-semibold">High</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Live Matches Feed */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="w-8 h-8 text-red-500" />
            Live Matches & Predictions
          </h2>
          <a href="#" className="text-red-500 hover:text-red-400 transition font-semibold">
            View All →
          </a>
        </div>

        <div className="grid gap-4">
          {mockMatches.map((match) => (
            <Card
              key={match.id}
              className={`border transition-all cursor-pointer ${
                selectedMatch === match.id
                  ? "border-red-500 bg-slate-800/50"
                  : "border-slate-700 bg-slate-800/30 hover:border-red-500/50 hover:bg-slate-800/50"
              }`}
              onClick={() => setSelectedMatch(selectedMatch === match.id ? null : match.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {match.status === "live" && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-red-500">LIVE</span>
                      </div>
                    )}
                    {match.status === "upcoming" && <Badge className="bg-slate-700 text-slate-300">UPCOMING</Badge>}
                    {match.status === "completed" && <Badge className="bg-slate-700 text-slate-400">COMPLETED</Badge>}
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {match.format}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-500">{match.prediction}%</div>
                    <p className="text-xs text-slate-400">Confidence</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 items-center">
                  <div className="flex items-center justify-between md:justify-start gap-4">
                    <div className="text-center">
                      <div className="text-3xl mb-1">{match.team1Logo}</div>
                      <p className="text-sm font-semibold text-white">{match.team1}</p>
                    </div>
                    <p className="text-slate-500">vs</p>
                    <div className="text-center">
                      <div className="text-3xl mb-1">{match.team2Logo}</div>
                      <p className="text-sm font-semibold text-white">{match.team2}</p>
                    </div>
                  </div>

                  <div className="hidden md:block text-center">
                    <p className="text-sm text-slate-400">{match.venue}</p>
                    <p className="text-xs text-slate-500 mt-1">{new Date(match.startTime).toLocaleString()}</p>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <Button
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:border-red-500 hover:text-red-500 bg-transparent"
                    >
                      Details
                    </Button>
                    <Link href="/ball-by-ball">
                      <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0">
                        Predict
                      </Button>
                    </Link>
                  </div>
                </div>

                {selectedMatch === match.id && (
                  <div className="mt-6 pt-6 border-t border-slate-700 grid md:grid-cols-3 gap-4">
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-2">Expected Outcome</p>
                      <p className="text-white font-semibold">{match.team1} Likely to Win</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-2">Key Factors</p>
                      <p className="text-white font-semibold">Strong Batting Form</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-slate-400 text-sm mb-2">Ball-by-Ball Analysis</p>
                      <Link href="/ball-by-ball" className="text-orange-500 hover:text-orange-400 font-semibold">
                        View →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-transparent to-slate-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Choose CricketPredict</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "AI-Powered Analysis",
                description: "Advanced machine learning models analyze every match factor",
              },
              {
                icon: Zap,
                title: "Real-Time Updates",
                description: "Live predictions updated every 15 minutes during matches",
              },
              {
                icon: Users,
                title: "Community Insights",
                description: "Compare your predictions with thousands of cricket fans",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="bg-slate-800/50 border-slate-700 p-6 hover:border-red-500/50 transition">
                <feature.icon className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2025 CricketPredict. All rights reserved. | AI-Powered Cricket Predictions</p>
        </div>
      </footer>
    </main>
  )
}
