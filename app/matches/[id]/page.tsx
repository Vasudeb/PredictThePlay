"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin, BarChart3, Calendar } from "lucide-react"
import Link from "next/link"

interface MatchDetails {
  id: string
  team1: string
  team2: string
  team1Logo: string
  team2Logo: string
  format: string
  venue: string
  date: string
  time: string
  status: "live" | "upcoming" | "completed"
  squad1: Array<{ name: string; role: string }>
  squad2: Array<{ name: string; role: string }>
  prediction: number
  keyMatchups: Array<{ player1: string; player2: string; prediction: string }>
}

const mockMatchDetails: MatchDetails = {
  id: "1",
  team1: "India",
  team2: "Australia",
  team1Logo: "🇮🇳",
  team2Logo: "🇦🇺",
  format: "ODI",
  venue: "Melbourne Cricket Ground (MCG)",
  date: "November 7, 2025",
  time: "2:00 PM IST",
  status: "live",
  squad1: [
    { name: "Virat Kohli", role: "Batter" },
    { name: "Rohit Sharma", role: "Opener" },
    { name: "Jasprit Bumrah", role: "Bowler" },
    { name: "Hardik Pandya", role: "All-rounder" },
    { name: "Kuldeep Yadav", role: "Bowler" },
    { name: "Suryakumar Yadav", role: "Batter" },
  ],
  squad2: [
    { name: "Pat Cummins", role: "Bowler" },
    { name: "David Warner", role: "Opener" },
    { name: "Travis Head", role: "Batter" },
    { name: "Glenn Maxwell", role: "All-rounder" },
    { name: "Nathan Lyon", role: "Bowler" },
  ],
  prediction: 65,
  keyMatchups: [
    {
      player1: "Virat Kohli",
      player2: "Pat Cummins",
      prediction: "Kohli likely to dominate",
    },
    {
      player1: "Rohit Sharma",
      player2: "Mitchell Starc",
      prediction: "Close contest expected",
    },
    {
      player1: "Jasprit Bumrah",
      player2: "Travis Head",
      prediction: "Bumrah advantage",
    },
  ],
}

export default function MatchDetailsPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
              Match Details
            </div>
          </div>
          {mockMatchDetails.status === "live" && <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Match Header */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-slate-400 text-sm mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                {mockMatchDetails.date} at {mockMatchDetails.time}
              </p>
              <p className="text-slate-400 text-sm">
                <MapPin className="w-4 h-4 inline mr-1" />
                {mockMatchDetails.venue}
              </p>
            </div>
            <Badge className="bg-slate-700 text-slate-300">{mockMatchDetails.format}</Badge>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Team 1 */}
            <div className="text-center">
              <div className="text-6xl mb-2">{mockMatchDetails.team1Logo}</div>
              <p className="text-white font-bold text-xl">{mockMatchDetails.team1}</p>
            </div>

            {/* Prediction */}
            <div className="bg-slate-900/50 rounded-lg p-6 text-center">
              <p className="text-slate-400 text-sm mb-2">PREDICTION</p>
              <div className="mb-4">
                <p className="text-red-500 font-bold text-3xl">{mockMatchDetails.prediction}%</p>
                <p className="text-slate-400 text-sm">Team 1 to win</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{mockMatchDetails.team1}</span>
                  <span>{mockMatchDetails.prediction}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${mockMatchDetails.prediction}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700">
                  <span>{mockMatchDetails.team2}</span>
                  <span>{100 - mockMatchDetails.prediction}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${100 - mockMatchDetails.prediction}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Team 2 */}
            <div className="text-center">
              <div className="text-6xl mb-2">{mockMatchDetails.team2Logo}</div>
              <p className="text-white font-bold text-xl">{mockMatchDetails.team2}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-700">
            <div className="bg-slate-900/50 rounded p-3 text-center">
              <p className="text-slate-400 text-xs mb-1">Squad</p>
              <p className="text-white font-bold">{mockMatchDetails.squad1.length} Players</p>
            </div>
            <div className="bg-slate-900/50 rounded p-3 text-center">
              <p className="text-slate-400 text-xs mb-1">Format</p>
              <p className="text-white font-bold">{mockMatchDetails.format}</p>
            </div>
            <div className="bg-slate-900/50 rounded p-3 text-center">
              <p className="text-slate-400 text-xs mb-1">Status</p>
              <p className="text-white font-bold capitalize">{mockMatchDetails.status}</p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-slate-700 overflow-x-auto">
          {["overview", "squads", "matchups", "statistics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold text-sm whitespace-nowrap transition border-b-2 ${
                activeTab === tab ? "border-red-500 text-red-500" : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6 mb-12">
            <Card className="bg-slate-800/30 border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-red-500" />
                Key Factors
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Recent Form", team1: 85, team2: 72 },
                  { name: "Bowling Attack", team1: 82, team2: 88 },
                  { name: "Batting Depth", team1: 88, team2: 79 },
                  { name: "Head to Head", team1: 68, team2: 62 },
                ].map((factor, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-700 last:border-0">
                    <p className="text-white font-semibold text-sm mb-2">{factor.name}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{mockMatchDetails.team1}</span>
                          <span className="text-red-500 font-bold">{factor.team1}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${factor.team1}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{mockMatchDetails.team2}</span>
                          <span className="text-blue-500 font-bold">{factor.team2}</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${factor.team2}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === "squads" && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { team: mockMatchDetails.team1, squad: mockMatchDetails.squad1, logo: mockMatchDetails.team1Logo },
              { team: mockMatchDetails.team2, squad: mockMatchDetails.squad2, logo: mockMatchDetails.team2Logo },
            ].map((squad, idx) => (
              <Card key={idx} className="bg-slate-800/30 border-slate-700 p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-3xl">{squad.logo}</span>
                  {squad.team} Squad
                </h3>
                <div className="space-y-3">
                  {squad.squad.map((player, pidx) => (
                    <div key={pidx} className="flex items-center justify-between bg-slate-900/50 rounded p-3">
                      <p className="text-white font-semibold">{player.name}</p>
                      <Badge className="bg-red-500/20 text-red-400 text-xs border-red-500/30">{player.role}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "matchups" && (
          <div className="space-y-4 mb-12">
            {mockMatchDetails.keyMatchups.map((matchup, idx) => (
              <Card key={idx} className="bg-slate-800/30 border-slate-700 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-white font-bold mb-1">{matchup.player1}</p>
                    <p className="text-slate-400 text-xs">{mockMatchDetails.team1}</p>
                  </div>
                  <div className="px-4 text-center">
                    <p className="text-slate-300 font-semibold text-sm">vs</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-white font-bold mb-1">{matchup.player2}</p>
                    <p className="text-slate-400 text-xs">{mockMatchDetails.team2}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700 text-center">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{matchup.prediction}</Badge>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "statistics" && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-slate-800/30 border-slate-700 p-6">
              <h3 className="text-white font-bold mb-4">Prediction Confidence</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">AI Model</span>
                    <span className="text-green-400">87%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Community</span>
                    <span className="text-blue-400">85%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-slate-800/30 border-slate-700 p-6">
              <h3 className="text-white font-bold mb-4">Head to Head Record</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Last 5 Matches</span>
                  <span className="text-white font-bold">{mockMatchDetails.team1}: 3-2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Overall</span>
                  <span className="text-white font-bold">{mockMatchDetails.team1}: 24-18</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Historical Data */}
        <Card className="bg-slate-800/30 border-slate-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-500" />
            Historical Performance
          </h3>
          <div className="space-y-3">
            {[
              { date: "3 Nov 2025", opponent: "New Zealand", result: "Won", margin: "5 wickets" },
              { date: "1 Nov 2025", opponent: "England", result: "Won", margin: "23 runs" },
              { date: "28 Oct 2025", opponent: "Pakistan", result: "Won", margin: "8 wickets" },
            ].map((record, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-900/50 rounded p-3">
                <div>
                  <p className="text-white font-semibold text-sm">
                    {mockMatchDetails.team1} vs {record.opponent}
                  </p>
                  <p className="text-slate-400 text-xs">{record.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${record.result === "Won" ? "text-green-400" : "text-red-400"}`}>
                    {record.result}
                  </p>
                  <p className="text-slate-400 text-xs">{record.margin}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}
