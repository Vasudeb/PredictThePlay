"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, TrendingUp, BarChart3, Search } from "lucide-react"
import Link from "next/link"

interface PlayerStats {
  id: string
  name: string
  role: "Batter" | "Bowler" | "All-rounder"
  team: string
  flag: string
  jersey: number
  image: string
  stats: {
    matches: number
    runs: number
    avg: number
    sr: number
    wickets?: number
    economy?: number
  }
  form: number
  consistency: number
  score: number
}

const mockPlayers: PlayerStats[] = [
  {
    id: "1",
    name: "Virat Kohli",
    role: "Batter",
    team: "India",
    flag: "🇮🇳",
    jersey: 18,
    image: "👤",
    stats: { matches: 254, runs: 13848, avg: 48.75, sr: 91.5 },
    form: 92,
    consistency: 88,
    score: 94,
  },
  {
    id: "2",
    name: "Pat Cummins",
    role: "Bowler",
    team: "Australia",
    flag: "🇦🇺",
    jersey: 11,
    image: "👤",
    stats: { matches: 44, wickets: 78, avg: 24.2, economy: 3.8 },
    form: 85,
    consistency: 81,
    score: 87,
  },
  {
    id: "3",
    name: "Babar Azam",
    role: "Batter",
    team: "Pakistan",
    flag: "🇵🇰",
    jersey: 56,
    image: "👤",
    stats: { matches: 96, runs: 5420, avg: 61.13, sr: 88.7 },
    form: 88,
    consistency: 92,
    score: 91,
  },
  {
    id: "4",
    name: "Jasprit Bumrah",
    role: "Bowler",
    team: "India",
    flag: "🇮🇳",
    jersey: 93,
    image: "👤",
    stats: { matches: 74, wickets: 121, avg: 21.5, economy: 4.1 },
    form: 90,
    consistency: 89,
    score: 93,
  },
  {
    id: "5",
    name: "Joe Root",
    role: "All-rounder",
    team: "England",
    flag: "🇬🇧",
    jersey: 66,
    image: "👤",
    stats: { matches: 194, runs: 8862, avg: 51.21, sr: 92.3 },
    form: 83,
    consistency: 85,
    score: 86,
  },
  {
    id: "6",
    name: "Rashid Khan",
    role: "All-rounder",
    team: "Afghanistan",
    flag: "🇦🇫",
    jersey: 19,
    image: "👤",
    stats: { matches: 58, runs: 724, avg: 16.9, sr: 125.5 },
    form: 87,
    consistency: 86,
    score: 89,
  },
]

export default function PlayersPage() {
  const [selectedRole, setSelectedRole] = useState("All")
  const [selectedTeam, setSelectedTeam] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPlayers = mockPlayers.filter((player) => {
    const roleMatch = selectedRole === "All" || player.role === selectedRole
    const teamMatch = selectedTeam === "All" || player.team === selectedTeam
    const searchMatch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    return roleMatch && teamMatch && searchMatch
  })

  const teams = ["All", ...new Set(mockPlayers.map((p) => p.team))]
  const roles = ["All", "Batter", "Bowler", "All-rounder"]

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
              Player Stats & Analysis
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filters */}
        <Card className="bg-slate-800/30 border-slate-700 p-6 mb-8">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Role Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Role</label>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <Button
                      key={role}
                      variant={selectedRole === role ? "default" : "outline"}
                      className={`text-sm ${
                        selectedRole === role
                          ? "bg-red-500 text-white border-red-500"
                          : "border-slate-600 text-slate-300 hover:border-red-500"
                      }`}
                      onClick={() => setSelectedRole(role)}
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Team Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Team</label>
                <div className="flex flex-wrap gap-2">
                  {teams.map((team) => (
                    <Button
                      key={team}
                      variant={selectedTeam === team ? "default" : "outline"}
                      className={`text-sm ${
                        selectedTeam === team
                          ? "bg-red-500 text-white border-red-500"
                          : "border-slate-600 text-slate-300 hover:border-red-500"
                      }`}
                      onClick={() => setSelectedTeam(team)}
                    >
                      {team === "All" ? "All Teams" : team}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Showing {filteredPlayers.length} of {mockPlayers.length} players
            </p>
          </div>
        </Card>

        {/* Player Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPlayers.map((player) => (
            <Card
              key={player.id}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-6 hover:border-red-500/50 transition-all hover:shadow-lg hover:shadow-red-500/10 cursor-pointer"
            >
              {/* Player Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{player.flag}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{player.name}</h3>
                      <p className="text-xs text-slate-400">{player.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-300">#{player.jersey}</div>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">{player.role}</Badge>
                  </div>
                </div>

                {/* Overall Score */}
                <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-xs font-semibold">OVERALL RATING</span>
                    <span className="text-red-500 font-bold text-lg">{player.score}</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${player.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="space-y-3 mb-6 pb-6 border-b border-slate-700">
                {player.role === "Batter" ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Matches</span>
                      <span className="text-white font-semibold">{player.stats.matches}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Total Runs</span>
                      <span className="text-white font-semibold">{player.stats.runs.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Average</span>
                      <span className="text-white font-semibold">{player.stats.avg}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Strike Rate</span>
                      <span className="text-white font-semibold">{player.stats.sr}</span>
                    </div>
                  </>
                ) : player.role === "Bowler" ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Matches</span>
                      <span className="text-white font-semibold">{player.stats.matches}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Wickets</span>
                      <span className="text-white font-semibold">{player.stats.wickets}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Average</span>
                      <span className="text-white font-semibold">{player.stats.avg}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Economy</span>
                      <span className="text-white font-semibold">{player.stats.economy}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Matches</span>
                      <span className="text-white font-semibold">{player.stats.matches}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Runs</span>
                      <span className="text-white font-semibold">{player.stats.runs.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Average</span>
                      <span className="text-white font-semibold">{player.stats.avg}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Strike Rate</span>
                      <span className="text-white font-semibold">{player.stats.sr}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Form Indicators */}
              <div className="space-y-3 mb-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-xs font-semibold flex items-center gap-2">
                      <TrendingUp className="w-3 h-3" />
                      CURRENT FORM
                    </span>
                    <span className="text-green-400 font-bold text-sm">{player.form}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${player.form}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-xs font-semibold flex items-center gap-2">
                      <Award className="w-3 h-3" />
                      CONSISTENCY
                    </span>
                    <span className="text-blue-400 font-bold text-sm">{player.consistency}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${player.consistency}%` }}></div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0">
                View Full Profile
              </Button>
            </Card>
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No players found matching your filters.</p>
          </div>
        )}

        {/* Legend */}
        <Card className="bg-slate-800/30 border-slate-700 p-6 mt-8">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-red-500" />
            What These Stats Mean
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-slate-300 font-semibold mb-1">Overall Rating</p>
              <p className="text-slate-400">
                Composite score based on recent form, consistency, and historical performance
              </p>
            </div>
            <div>
              <p className="text-slate-300 font-semibold mb-1">Current Form</p>
              <p className="text-slate-400">Performance in last 5-10 matches - how well they're playing recently</p>
            </div>
            <div>
              <p className="text-slate-300 font-semibold mb-1">Consistency</p>
              <p className="text-slate-400">
                How reliable a player is - lower variance in performance = higher consistency
              </p>
            </div>
            <div>
              <p className="text-slate-300 font-semibold mb-1">Strike Rate (Batters)</p>
              <p className="text-slate-400">Number of runs scored per 100 balls faced - measures aggressive batting</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
