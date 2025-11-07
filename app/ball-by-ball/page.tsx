"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, TrendingUp, Zap, BarChart3, Users, Trophy } from "lucide-react"

interface BallVote {
  type: "dot" | "single" | "boundary" | "wicket"
  confidence: number
}

interface Ball {
  ballNumber: number
  bowler: string
  batter: string
  runs: number
  prediction: {
    type: "dot" | "single" | "boundary" | "wicket"
    confidence: number
    runsPredict: number
  }
  actual: {
    type: "dot" | "single" | "boundary" | "wicket" | null
    runs: number | null
  }
  status: "live" | "upcoming" | "completed"
  userVotes?: {
    dot: number
    single: number
    boundary: number
    wicket: number
  }
}

interface Over {
  overNumber: number
  bowler: string
  balls: Ball[]
  totalRuns: number
  wickets: number
}

const mockOvers: Over[] = [
  {
    overNumber: 1,
    bowler: "Bumrah",
    balls: [
      {
        ballNumber: 1,
        bowler: "Bumrah",
        batter: "Warner",
        runs: 0,
        prediction: { type: "dot", confidence: 92, runsPredict: 0 },
        actual: { type: "dot", runs: 0 },
        status: "completed",
        userVotes: { dot: 245, single: 18, boundary: 2, wicket: 8 },
      },
      {
        ballNumber: 2,
        bowler: "Bumrah",
        batter: "Warner",
        runs: 1,
        prediction: { type: "single", confidence: 78, runsPredict: 1 },
        actual: { type: "single", runs: 1 },
        status: "completed",
        userVotes: { dot: 89, single: 156, boundary: 12, wicket: 5 },
      },
      {
        ballNumber: 3,
        bowler: "Bumrah",
        batter: "Smith",
        runs: 0,
        prediction: { type: "dot", confidence: 85, runsPredict: 0 },
        actual: { type: "dot", runs: 0 },
        status: "completed",
        userVotes: { dot: 198, single: 34, boundary: 8, wicket: 12 },
      },
      {
        ballNumber: 4,
        bowler: "Bumrah",
        batter: "Smith",
        runs: 4,
        prediction: { type: "boundary", confidence: 45, runsPredict: 0 },
        actual: { type: "boundary", runs: 4 },
        status: "completed",
        userVotes: { dot: 120, single: 67, boundary: 65, wicket: 3 },
      },
      {
        ballNumber: 5,
        bowler: "Bumrah",
        batter: "Smith",
        runs: 0,
        prediction: { type: "dot", confidence: 88, runsPredict: 0 },
        actual: { type: "dot", runs: 0 },
        status: "completed",
        userVotes: { dot: 212, single: 28, boundary: 5, wicket: 10 },
      },
      {
        ballNumber: 6,
        bowler: "Bumrah",
        batter: "Smith",
        runs: 0,
        prediction: { type: "dot", confidence: 91, runsPredict: 0 },
        actual: { type: "wicket", runs: 0 },
        status: "completed",
        userVotes: { dot: 134, single: 22, boundary: 8, wicket: 89 },
      },
    ],
    totalRuns: 5,
    wickets: 1,
  },
  {
    overNumber: 2,
    bowler: "Siraj",
    balls: [
      {
        ballNumber: 1,
        bowler: "Siraj",
        batter: "Labuschagne",
        runs: 1,
        prediction: { type: "single", confidence: 72, runsPredict: 1 },
        actual: { type: "single", runs: 1 },
        status: "completed",
        userVotes: { dot: 76, single: 134, boundary: 14, wicket: 8 },
      },
      {
        ballNumber: 2,
        bowler: "Siraj",
        batter: "Green",
        runs: 0,
        prediction: { type: "dot", confidence: 81, runsPredict: 0 },
        actual: { type: "dot", runs: 0 },
        status: "completed",
        userVotes: { dot: 167, single: 31, boundary: 6, wicket: 4 },
      },
      {
        ballNumber: 3,
        bowler: "Siraj",
        batter: "Green",
        runs: 2,
        prediction: { type: "single", confidence: 68, runsPredict: 1 },
        actual: { type: "boundary", runs: 2 },
        status: "completed",
        userVotes: { dot: 89, single: 98, boundary: 45, wicket: 2 },
      },
      {
        ballNumber: 4,
        bowler: "Siraj",
        batter: "Green",
        runs: 0,
        prediction: { type: "dot", confidence: 86, runsPredict: 0 },
        actual: { type: "dot", runs: 0 },
        status: "completed",
        userVotes: { dot: 201, single: 26, boundary: 4, wicket: 5 },
      },
      {
        ballNumber: 5,
        bowler: "Siraj",
        batter: "Green",
        runs: 1,
        prediction: { type: "dot", confidence: 73, runsPredict: 0 },
        actual: { type: "single", runs: 1 },
        status: "completed",
        userVotes: { dot: 112, single: 89, boundary: 9, wicket: 3 },
      },
      {
        ballNumber: 6,
        bowler: "Siraj",
        batter: "Labuschagne",
        runs: 0,
        prediction: { type: "dot", confidence: 89, runsPredict: 0 },
        actual: { type: "dot", runs: 0 },
        status: "completed",
        userVotes: { dot: 178, single: 19, boundary: 3, wicket: 6 },
      },
    ],
    totalRuns: 4,
    wickets: 0,
  },
  {
    overNumber: 3,
    bowler: "Kuldeep",
    balls: [
      {
        ballNumber: 1,
        bowler: "Kuldeep",
        batter: "Labuschagne",
        runs: 0,
        prediction: { type: "dot", confidence: 84, runsPredict: 0 },
        actual: { type: "dot", runs: 0 },
        status: "completed",
        userVotes: { dot: 189, single: 24, boundary: 5, wicket: 7 },
      },
      {
        ballNumber: 2,
        bowler: "Kuldeep",
        batter: "Labuschagne",
        runs: 1,
        prediction: { type: "dot", confidence: 55, runsPredict: 0 },
        actual: { type: "single", runs: 1 },
        status: "completed",
        userVotes: { dot: 98, single: 112, boundary: 8, wicket: 3 },
      },
      {
        ballNumber: 3,
        bowler: "Kuldeep",
        batter: "Green",
        runs: 0,
        prediction: { type: "dot", confidence: 80, runsPredict: 0 },
        actual: { type: "dot", runs: 0 },
        status: "completed",
        userVotes: { dot: 156, single: 28, boundary: 4, wicket: 5 },
      },
      {
        ballNumber: 4,
        bowler: "Kuldeep",
        batter: "Green",
        runs: 6,
        prediction: { type: "boundary", confidence: 38, runsPredict: 4 },
        actual: { type: "boundary", runs: 6 },
        status: "completed",
        userVotes: { dot: 76, single: 45, boundary: 62, wicket: 2 },
      },
      {
        ballNumber: 5,
        bowler: "Kuldeep",
        batter: "Green",
        runs: 0,
        prediction: { type: "dot", confidence: 77, runsPredict: 0 },
        actual: null,
        status: "upcoming",
        userVotes: { dot: 134, single: 31, boundary: 8, wicket: 4 },
      },
      {
        ballNumber: 6,
        bowler: "Kuldeep",
        batter: "Green",
        runs: 0,
        prediction: { type: "dot", confidence: 82, runsPredict: 0 },
        actual: null,
        status: "upcoming",
        userVotes: { dot: 112, single: 22, boundary: 5, wicket: 6 },
      },
    ],
    totalRuns: 7,
    wickets: 0,
  },
]

export default function BallByBallPage() {
  const [expandedOver, setExpandedOver] = useState<number | null>(0)
  const [selectedBall, setSelectedBall] = useState<string | null>(null)
  const [userBallVotes, setUserBallVotes] = useState<Record<string, BallVote | null>>({})
  const [showVotePanel, setShowVotePanel] = useState<string | null>(null)

  const getPredictionColor = (accuracy: number) => {
    if (accuracy >= 85) return "bg-green-500/20 border-green-500/50"
    if (accuracy >= 70) return "bg-blue-500/20 border-blue-500/50"
    if (accuracy >= 55) return "bg-yellow-500/20 border-yellow-500/50"
    return "bg-red-500/20 border-red-500/50"
  }

  const getPredictionLabel = (accuracy: number) => {
    if (accuracy >= 85) return "High"
    if (accuracy >= 70) return "Medium"
    if (accuracy >= 55) return "Low"
    return "Very Low"
  }

  const getAccuracyBadgeColor = (prediction: Ball["prediction"], actual: Ball["actual"]) => {
    if (!actual.type) return "bg-slate-700"
    if (prediction.type === actual.type && prediction.runsPredict === actual.runs) {
      return "bg-green-600"
    }
    return "bg-red-600"
  }

  const handleVoteBall = (ballKey: string, voteType: "dot" | "single" | "boundary" | "wicket") => {
    setUserBallVotes((prev) => {
      const current = prev[ballKey]
      if (current?.type === voteType) {
        return { ...prev, [ballKey]: null }
      }
      return { ...prev, [ballKey]: { type: voteType, confidence: 70 } }
    })
  }

  const getUserVoteAccuracy = (ballKey: string, actual: Ball["actual"]) => {
    const userVote = userBallVotes[ballKey]
    if (!userVote || !actual.type) return null
    return userVote.type === actual.type ? "correct" : "incorrect"
  }

  const getTotalVotesForBall = (ball: Ball) => {
    if (!ball.userVotes) return 0
    return ball.userVotes.dot + ball.userVotes.single + ball.userVotes.boundary + ball.userVotes.wicket
  }

  const calculateAccuracyStats = () => {
    let totalVotes = 0
    let correctVotes = 0
    Object.entries(userBallVotes).forEach(([ballKey, vote]) => {
      if (vote) {
        totalVotes++
        const [overNum, ballNum] = ballKey.split("-").map(Number)
        const ball = mockOvers.find((o) => o.overNumber === overNum)?.balls.find((b) => b.ballNumber === ballNum)
        if (ball && ball.actual.type && ball.actual.type === vote.type) {
          correctVotes++
        }
      }
    })
    return totalVotes > 0 ? Math.round((correctVotes / totalVotes) * 100) : 0
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">India vs Australia - Ball by Ball</h1>
              <p className="text-slate-400">ODI Match | MCG, Melbourne | Currently in Over 3</p>
            </div>
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              ← Back to Match
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Runs</p>
              <p className="text-3xl font-bold text-white">16</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Wickets</p>
              <p className="text-3xl font-bold text-red-500">1</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">AI Accuracy</p>
              <p className="text-3xl font-bold text-green-500">83%</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Your Accuracy</p>
              <p className="text-3xl font-bold text-blue-500">{calculateAccuracyStats()}%</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Balls Bowled</p>
              <p className="text-3xl font-bold text-orange-500">16/18</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ball by Ball Breakdown */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-red-500" />
          Over-by-Over Predictions
        </h2>

        <div className="space-y-4">
          {mockOvers.map((over) => (
            <Card key={over.overNumber} className="border-slate-700 bg-slate-800/50 overflow-hidden">
              <button
                onClick={() => setExpandedOver(expandedOver === over.overNumber ? null : over.overNumber)}
                className="w-full"
              >
                <div className="p-4 hover:bg-slate-700/50 transition flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        expandedOver === over.overNumber ? "rotate-180" : ""
                      }`}
                    />
                    <div className="text-left">
                      <p className="text-lg font-bold text-white">Over {over.overNumber}</p>
                      <p className="text-sm text-slate-400">Bowler: {over.bowler}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">{over.totalRuns}</p>
                      <p className="text-xs text-slate-400">Runs</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-500">{over.wickets}</p>
                      <p className="text-xs text-slate-400">Wickets</p>
                    </div>
                  </div>
                </div>
              </button>

              {/* Ball Details */}
              {expandedOver === over.overNumber && (
                <div className="border-t border-slate-700 p-4 bg-slate-900/50">
                  <div className="grid gap-3">
                    {over.balls.map((ball) => {
                      const ballKey = `${over.overNumber}-${ball.ballNumber}`
                      const isExpanded = selectedBall === ballKey
                      const userVote = userBallVotes[ballKey]
                      const isCorrect =
                        ball.actual.type === ball.prediction.type && ball.actual.runs === ball.prediction.runsPredict
                      const userAccuracy = getUserVoteAccuracy(ballKey, ball.actual)
                      const totalVotes = getTotalVotesForBall(ball)

                      return (
                        <div key={ballKey}>
                          <button onClick={() => setSelectedBall(isExpanded ? null : ballKey)} className="w-full">
                            <div
                              className={`border rounded-lg p-3 transition ${getPredictionColor(
                                ball.prediction.confidence,
                              )} hover:border-opacity-100 cursor-pointer`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="text-center min-w-12">
                                    <p className="text-sm font-semibold text-white">Ball {ball.ballNumber}</p>
                                  </div>
                                  <div className="text-left">
                                    <p className="text-sm text-slate-200">{ball.batter}</p>
                                    <p className="text-xs text-slate-400">vs {ball.bowler}</p>
                                  </div>
                                </div>

                                {/* AI Prediction Card */}
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs font-semibold text-yellow-400">
                                        {getPredictionLabel(ball.prediction.confidence)}
                                      </span>
                                      <Zap className="w-3 h-3 text-yellow-400" />
                                    </div>
                                    <div className="text-lg font-bold text-white">
                                      {ball.prediction.runsPredict > 0 ? "+" : ""} {ball.prediction.runsPredict} runs
                                    </div>
                                    <p className="text-xs text-slate-400">{ball.prediction.type}</p>
                                  </div>

                                  {/* Status Indicator */}
                                  {ball.status === "completed" && (
                                    <div className="text-right">
                                      {isCorrect ? (
                                        <Badge className="bg-green-600 text-white">✓ AI Correct</Badge>
                                      ) : (
                                        <Badge className="bg-red-600 text-white">✗ AI Wrong</Badge>
                                      )}
                                    </div>
                                  )}
                                  {ball.status === "upcoming" && (
                                    <Badge className="bg-slate-700 text-slate-300">Upcoming</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </button>

                          {/* Expanded Details with Voting */}
                          {isExpanded && (
                            <div className="mt-2 p-3 bg-slate-800 rounded-lg border border-slate-600 text-sm space-y-4">
                              {/* AI Prediction vs Actual */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-slate-400 mb-2 font-semibold">AI Prediction</p>
                                  <div className="space-y-1 text-slate-200">
                                    <p>
                                      Type: <span className="font-semibold capitalize">{ball.prediction.type}</span>
                                    </p>
                                    <p>
                                      Expected Runs:{" "}
                                      <span className="font-semibold">{ball.prediction.runsPredict}</span>
                                    </p>
                                    <p>
                                      Confidence:{" "}
                                      <span className="font-semibold text-yellow-400">
                                        {ball.prediction.confidence}%
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                {ball.actual.type && (
                                  <div>
                                    <p className="text-slate-400 mb-2 font-semibold">Actual Outcome</p>
                                    <div className="space-y-1 text-slate-200">
                                      <p>
                                        Type: <span className="font-semibold capitalize">{ball.actual.type}</span>
                                      </p>
                                      <p>
                                        Actual Runs: <span className="font-semibold">{ball.actual.runs}</span>
                                      </p>
                                      <p>
                                        Result:{" "}
                                        <span
                                          className={`font-semibold ${isCorrect ? "text-green-400" : "text-red-400"}`}
                                        >
                                          {isCorrect ? "Accurate" : "Inaccurate"}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {totalVotes > 0 && (
                                <div className="pt-4 border-t border-slate-700">
                                  <p className="text-slate-400 mb-3 font-semibold flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Community Predictions ({totalVotes} votes)
                                  </p>
                                  <div className="space-y-2">
                                    {[
                                      { type: "dot", label: "Dot Ball" },
                                      { type: "single", label: "Single" },
                                      { type: "boundary", label: "Boundary" },
                                      { type: "wicket", label: "Wicket" },
                                    ].map((option) => {
                                      const votes = ball.userVotes?.[option.type as keyof typeof ball.userVotes] || 0
                                      const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0
                                      return (
                                        <div key={option.type}>
                                          <div className="flex justify-between items-center mb-1">
                                            <span className="text-slate-300 text-xs">{option.label}</span>
                                            <span className="text-white font-semibold text-xs">
                                              {votes} votes ({Math.round(percentage)}%)
                                            </span>
                                          </div>
                                          <div className="w-full bg-slate-700 rounded-full h-2">
                                            <div
                                              className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                                              style={{ width: `${percentage}%` }}
                                            ></div>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}

                              {ball.status === "upcoming" && (
                                <div className="pt-4 border-t border-slate-700">
                                  <p className="text-slate-400 mb-3 font-semibold">Your Prediction</p>
                                  <div className="grid grid-cols-4 gap-2">
                                    {[
                                      { type: "dot", label: "Dot" },
                                      { type: "single", label: "Single" },
                                      { type: "boundary", label: "Boundary" },
                                      { type: "wicket", label: "Wicket" },
                                    ].map((option) => (
                                      <Button
                                        key={option.type}
                                        onClick={() =>
                                          handleVoteBall(
                                            ballKey,
                                            option.type as "dot" | "single" | "boundary" | "wicket",
                                          )
                                        }
                                        className={`text-xs py-2 border transition ${
                                          userVote?.type === option.type
                                            ? "bg-red-500 border-red-500 text-white"
                                            : "bg-slate-700 border-slate-600 text-slate-300 hover:border-red-500 hover:bg-red-500/20"
                                        }`}
                                      >
                                        {option.label}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* User Vote Result */}
                              {userVote && ball.actual.type && (
                                <div className="pt-4 border-t border-slate-700">
                                  <div className="bg-slate-900/50 rounded p-3">
                                    <p className="text-slate-400 mb-2 font-semibold">Your Prediction Result</p>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="text-slate-300 text-sm">
                                          You predicted:{" "}
                                          <span className="font-semibold capitalize">{userVote.type}</span>
                                        </p>
                                      </div>
                                      {userAccuracy === "correct" ? (
                                        <Badge className="bg-green-600 text-white">✓ Correct!</Badge>
                                      ) : (
                                        <Badge className="bg-red-600 text-white">✗ Incorrect</Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Key Factors */}
                              <div className="pt-4 border-t border-slate-700">
                                <p className="text-slate-400 mb-2 font-semibold">Key Factors</p>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-xs">
                                    <span>Batter Form</span>
                                    <span className="text-green-400">Strong</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span>Bowler's Line</span>
                                    <span className="text-blue-400">Accurate</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span>Field Setup</span>
                                    <span className="text-orange-400">Aggressive</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span>Recent History</span>
                                    <span className="text-purple-400">Similar Pattern</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Balls Alert */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/50">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Next Ball Prediction</h3>
                <p className="text-slate-300 mb-4">
                  Over 3.5 - Green facing Kuldeep with an off-stump line. AI predicts a dot ball with 82% confidence
                  based on recent bowling patterns and batter stance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-slate-700">Dot Ball: 82%</Badge>
                  <Badge className="bg-slate-700">Single: 12%</Badge>
                  <Badge className="bg-slate-700">Boundary: 4%</Badge>
                  <Badge className="bg-slate-700">Wicket: 2%</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Real-time Updates */}
      <section className="max-w-7xl mx-auto px-4 py-8 pb-16">
        <h2 className="text-2xl font-bold text-white mb-6">AI vs Community Analysis</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              AI Accuracy Trend
            </h3>
            <div className="space-y-3">
              {[
                { over: "Over 1", accuracy: 83, correct: 5 },
                { over: "Over 2", accuracy: 80, correct: 5 },
                { over: "Over 3 (In Progress)", accuracy: 83, correct: 4 },
              ].map((item) => (
                <div key={item.over}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-300 text-sm">{item.over}</span>
                    <span className="text-white font-semibold">{item.accuracy}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                      style={{ width: `${item.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Community Accuracy
            </h3>
            <div className="space-y-3">
              {[
                { over: "Over 1", accuracy: 76, votes: 273 },
                { over: "Over 2", accuracy: 71, votes: 268 },
                { over: "Over 3 (In Progress)", accuracy: 74, votes: 145 },
              ].map((item) => (
                <div key={item.over}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-300 text-sm">{item.over}</span>
                    <span className="text-white font-semibold">{item.accuracy}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${item.accuracy}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.votes} predictions</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-500" />
              Your vs AI
            </h3>
            <div className="space-y-4">
              <div className="bg-slate-900/50 rounded p-3">
                <p className="text-slate-400 text-xs mb-1">Your Accuracy</p>
                <p className="text-2xl font-bold text-blue-500">{calculateAccuracyStats()}%</p>
              </div>
              <div className="bg-slate-900/50 rounded p-3">
                <p className="text-slate-400 text-xs mb-1">AI Accuracy</p>
                <p className="text-2xl font-bold text-green-500">83%</p>
              </div>
              <div className="pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-400">
                  You've made {Object.keys(userBallVotes).filter((k) => userBallVotes[k]).length} predictions
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
