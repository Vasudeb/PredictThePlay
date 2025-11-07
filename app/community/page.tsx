"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, ThumbsUp, MessageCircle, TrendingUp, Share2, BarChart3 } from "lucide-react"
import Link from "next/link"

interface CommunityPrediction {
  id: string
  username: string
  avatar: string
  team: string
  confidence: number
  reasoning: string
  votes: number
  comments: number
  timestamp: string
  accuracy: number
  isYourPrediction?: boolean
}

interface MatchComparison {
  matchId: string
  team1: string
  team2: string
  team1Logo: string
  team2Logo: string
  team1Votes: number
  team2Votes: number
  aiPrediction: number
  communityAverage: number
}

const mockMatch: MatchComparison = {
  matchId: "1",
  team1: "India",
  team2: "Australia",
  team1Logo: "🇮🇳",
  team2Logo: "🇦🇺",
  team1Votes: 1248,
  team2Votes: 612,
  aiPrediction: 65,
  communityAverage: 67,
}

const mockPredictions: CommunityPrediction[] = [
  {
    id: "1",
    username: "CricketAnalyst92",
    avatar: "👨‍💼",
    team: "India",
    confidence: 72,
    reasoning:
      "Strong batting lineup and excellent form. Bowling attack is also in great shape. Home advantage plays a role.",
    votes: 342,
    comments: 28,
    timestamp: "2h ago",
    accuracy: 84,
  },
  {
    id: "2",
    username: "StatsWizard",
    avatar: "👨‍🔬",
    team: "India",
    confidence: 68,
    reasoning:
      "Based on historical data and weather patterns. India dominates in similar conditions. Low risk prediction.",
    votes: 298,
    comments: 15,
    timestamp: "3h ago",
    accuracy: 81,
    isYourPrediction: true,
  },
  {
    id: "3",
    username: "AussieFan88",
    avatar: "👨‍🎤",
    team: "Australia",
    confidence: 58,
    reasoning: "Cummins has been bowling brilliantly. Depth in batting order is underestimated by many.",
    votes: 156,
    comments: 42,
    timestamp: "4h ago",
    accuracy: 72,
  },
  {
    id: "4",
    username: "DataDriven",
    avatar: "👩‍💻",
    team: "India",
    confidence: 70,
    reasoning: "Predictive model shows 70% probability. Variance in outcomes is minimal.",
    votes: 289,
    comments: 8,
    timestamp: "5h ago",
    accuracy: 87,
  },
]

export default function CommunityPage() {
  const [userVote, setUserVote] = useState<string | null>(null)
  const [userConfidence, setUserConfidence] = useState(65)
  const [userReasoning, setUserReasoning] = useState("")
  const [votedPredictions, setVotedPredictions] = useState<Set<string>>(new Set())
  const [showForm, setShowForm] = useState(false)

  const totalVotes = mockMatch.team1Votes + mockMatch.team2Votes
  const team1Percentage = Math.round((mockMatch.team1Votes / totalVotes) * 100)
  const team2Percentage = Math.round((mockMatch.team2Votes / totalVotes) * 100)

  const handleVote = (predictionId: string) => {
    const newVoted = new Set(votedPredictions)
    if (newVoted.has(predictionId)) {
      newVoted.delete(predictionId)
    } else {
      newVoted.add(predictionId)
    }
    setVotedPredictions(newVoted)
  }

  const handleSubmitPrediction = () => {
    if (userVote && userReasoning.trim()) {
      // Submit prediction logic here
      setShowForm(false)
      setUserReasoning("")
      setUserVote(null)
    }
  }

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
              Community Predictions
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Users className="w-5 h-5" />
            <span className="text-sm">{mockPredictions.length} predictions</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Match Overview */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-8 mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">India vs Australia</h2>
            <div className="flex items-center justify-between gap-4">
              <div className="text-center">
                <div className="text-5xl mb-2">{mockMatch.team1Logo}</div>
                <p className="text-white font-semibold">{mockMatch.team1}</p>
              </div>
              <div className="flex-1">
                <div className="bg-slate-900/50 rounded-lg p-4 text-center">
                  <p className="text-slate-400 text-sm mb-2">Community Prediction</p>
                  <p className="text-white font-bold text-2xl mb-3">{mockMatch.communityAverage}%</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-400 text-xs">{mockMatch.team1}</span>
                        <span className="text-white font-bold">{team1Percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                          style={{ width: `${team1Percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-400 text-xs">{mockMatch.team2}</span>
                        <span className="text-white font-bold">{team2Percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                          style={{ width: `${team2Percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-2">{mockMatch.team2Logo}</div>
                <p className="text-white font-semibold">{mockMatch.team2}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-6 border-t border-slate-700">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <p className="text-slate-400 text-xs mb-1">AI PREDICTION</p>
              <p className="text-white font-bold text-xl">
                {mockMatch.team1} {mockMatch.aiPrediction}%
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <p className="text-slate-400 text-xs mb-1">VOTES CAST</p>
              <p className="text-white font-bold text-xl">{totalVotes.toLocaleString()} users</p>
            </div>
          </div>
        </Card>

        {/* Add Your Prediction */}
        {!showForm ? (
          <Button
            onClick={() => setShowForm(true)}
            className="w-full mb-8 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-6 text-lg border-0"
          >
            + Add Your Prediction
          </Button>
        ) : (
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-8 mb-8">
            <h3 className="text-lg font-bold text-white mb-6">Share Your Prediction</h3>

            {/* Team Selection */}
            <div className="mb-6">
              <label className="block text-slate-300 font-semibold mb-3">Who will win?</label>
              <div className="flex gap-4">
                {[mockMatch.team1, mockMatch.team2].map((team) => (
                  <button
                    key={team}
                    onClick={() => setUserVote(team)}
                    className={`flex-1 py-4 rounded-lg border-2 font-semibold transition ${
                      userVote === team
                        ? "border-red-500 bg-red-500/10 text-red-500"
                        : "border-slate-600 bg-slate-700/30 text-slate-300 hover:border-red-500/50"
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>

            {/* Confidence Slider */}
            <div className="mb-6">
              <label className="block text-slate-300 font-semibold mb-3">
                Your Confidence: <span className="text-red-500">{userConfidence}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={userConfidence}
                onChange={(e) => setUserConfidence(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            {/* Reasoning */}
            <div className="mb-6">
              <label className="block text-slate-300 font-semibold mb-3">Why do you think this?</label>
              <textarea
                value={userReasoning}
                onChange={(e) => setUserReasoning(e.target.value)}
                placeholder="Share your analysis and reasoning..."
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 resize-none h-24"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleSubmitPrediction}
                disabled={!userVote || !userReasoning.trim()}
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 disabled:opacity-50"
              >
                Submit Prediction
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Community Predictions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-red-500" />
            Community Predictions
          </h2>

          <div className="space-y-4">
            {mockPredictions.map((prediction) => (
              <Card
                key={prediction.id}
                className={`border transition-all ${
                  prediction.isYourPrediction
                    ? "border-red-500 bg-red-500/5"
                    : "border-slate-700 bg-slate-800/30 hover:border-red-500/50"
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-3xl">{prediction.avatar}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-bold">{prediction.username}</h3>
                          {prediction.isYourPrediction && (
                            <Badge className="bg-red-500/20 text-red-400 text-xs border-red-500/30">
                              Your Prediction
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-400 text-sm">
                          {prediction.accuracy}% accuracy • {prediction.timestamp}
                        </p>
                      </div>
                    </div>

                    {/* Prediction Card */}
                    <div className="bg-slate-900/50 rounded-lg px-4 py-2 text-center">
                      <p className="text-slate-400 text-xs mb-1">Predicts</p>
                      <p className="text-white font-bold text-lg">{prediction.team}</p>
                      <p className="text-red-500 font-bold text-sm">{prediction.confidence}%</p>
                    </div>
                  </div>

                  {/* Reasoning */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{prediction.reasoning}</p>

                  {/* Stats Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleVote(prediction.id)}
                        className={`flex items-center gap-2 transition ${
                          votedPredictions.has(prediction.id) ? "text-red-500" : "text-slate-400 hover:text-red-500"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          {prediction.votes + (votedPredictions.has(prediction.id) ? 1 : 0)}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">{prediction.comments}</span>
                      </button>
                    </div>
                    <button className="text-slate-400 hover:text-slate-300 transition">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <Card className="bg-slate-800/30 border-slate-700 p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Top Predictors This Month
          </h3>
          <div className="space-y-3">
            {[
              { name: "CricketAnalyst92", score: 1240, accuracy: 87 },
              { name: "DataDriven", score: 1156, accuracy: 85 },
              { name: "StatsWizard", score: 1089, accuracy: 83 },
            ].map((user, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/20 text-red-400 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{user.name}</p>
                    <p className="text-slate-400 text-xs">{user.accuracy}% accuracy</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-red-500 font-bold">{user.score} pts</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  )
}
