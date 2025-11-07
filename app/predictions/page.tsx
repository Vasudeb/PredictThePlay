"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, Brain, BarChart3, LineChart } from "lucide-react"
import Link from "next/link"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
} from "recharts"

interface PredictionFactor {
  name: string
  score: number
  weight: number
  impact: "positive" | "negative" | "neutral"
  description: string
}

interface PredictionData {
  matchId: string
  team1: string
  team2: string
  team1Logo: string
  team2Logo: string
  team1Probability: number
  team2Probability: number
  confidence: number
  lastUpdated: string
  factors: PredictionFactor[]
}

const predictionRunsData = [
  { over: "1", actualRuns: 5, aiPredicted: null },
  { over: "2", actualRuns: 12, aiPredicted: null },
  { over: "3", actualRuns: 18, aiPredicted: null },
  { over: "4", actualRuns: 23, aiPredicted: null },
  { over: "5", actualRuns: 31, aiPredicted: null },
  { over: "6", actualRuns: 38, aiPredicted: null },
  { over: "6.5", actualRuns: 38, aiPredicted: 38 }, // Current over - branching point
  { over: "7", actualRuns: null, aiPredicted: 45 },
  { over: "8", actualRuns: null, aiPredicted: 54 },
  { over: "9", actualRuns: null, aiPredicted: 62 },
  { over: "10", actualRuns: null, aiPredicted: 71 },
  { over: "11", actualRuns: null, aiPredicted: 73 },
  { over: "12", actualRuns: null, aiPredicted: 88 },
  { over: "13", actualRuns: null, aiPredicted: 97 },
  { over: "14", actualRuns: null, aiPredicted: 105 },
  { over: "15", actualRuns: null, aiPredicted: 114 },
  { over: "16", actualRuns: null, aiPredicted: 123 },
  { over: "17", actualRuns: null, aiPredicted: 138 },
  { over: "18", actualRuns: null, aiPredicted: 149 },
  { over: "19", actualRuns: null, aiPredicted: 160 },
  { over: "20", actualRuns: null, aiPredicted: 175 },
]

const mockPrediction: PredictionData = {
  matchId: "1",
  team1: "India",
  team2: "Australia",
  team1Logo: "🇮🇳",
  team2Logo: "🇦🇺",
  team1Probability: 65,
  team2Probability: 35,
  confidence: 87,
  lastUpdated: new Date().toISOString(),
  factors: [
    {
      name: "Batting Form",
      score: 8.2,
      weight: 0.25,
      impact: "positive",
      description: "India showing excellent batting form in recent matches",
    },
    {
      name: "Bowling Strength",
      score: 7.8,
      weight: 0.2,
      impact: "positive",
      description: "Strong bowling attack with recent wicket trends",
    },
    {
      name: "Head to Head",
      score: 6.5,
      weight: 0.15,
      impact: "neutral",
      description: "52% win rate in last 10 matches against Australia",
    },
    {
      name: "Home Ground",
      score: 7.2,
      weight: 0.18,
      impact: "positive",
      description: "Slight advantage with familiar conditions",
    },
    {
      name: "Weather Impact",
      score: 5.9,
      weight: 0.12,
      impact: "neutral",
      description: "Neutral weather conditions with light rain possible",
    },
    {
      name: "Player Injuries",
      score: 6.8,
      weight: 0.1,
      impact: "negative",
      description: "One key player unavailable, minor impact",
    },
  ],
}

export default function PredictionsPage() {
  const [timeRange, setTimeRange] = useState("24h")
  const [expanded, setExpanded] = useState<string | null>(null)

  const getImpactColor = (impact: "positive" | "negative" | "neutral") => {
    switch (impact) {
      case "positive":
        return "text-green-400"
      case "negative":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  const getImpactBg = (impact: "positive" | "negative" | "neutral") => {
    switch (impact) {
      case "positive":
        return "bg-green-500/10"
      case "negative":
        return "bg-red-500/10"
      default:
        return "bg-slate-500/10"
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
              AI Prediction Engine
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">LIVE ANALYSIS</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Match Header */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Teams */}
          <Card className="md:col-span-1 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-8">
            <div className="text-center">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-700">
                <div className="text-center flex-1">
                  <div className="text-5xl mb-2">{mockPrediction.team1Logo}</div>
                  <p className="text-white font-semibold">{mockPrediction.team1}</p>
                </div>
                <div className="text-slate-500 font-bold text-xl">vs</div>
                <div className="text-center flex-1">
                  <div className="text-5xl mb-2">{mockPrediction.team2Logo}</div>
                  <p className="text-white font-semibold">{mockPrediction.team2}</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Last updated {new Date(mockPrediction.lastUpdated).toLocaleTimeString()}
              </p>
            </div>
          </Card>

          {/* Main Prediction */}
          <Card className="md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-8">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-red-500" />
                <span className="text-slate-300 font-semibold">AI PREDICTION</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">
                {mockPrediction.team1} {mockPrediction.team1Probability > 50 ? "Likely to Win" : "May Face Challenge"}
              </h3>
            </div>

            <div className="space-y-4">
              {/* Probability Bars */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{mockPrediction.team1}</span>
                  <span className="text-red-500 font-bold text-lg">{mockPrediction.team1Probability}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${mockPrediction.team1Probability}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{mockPrediction.team2}</span>
                  <span className="text-blue-500 font-bold text-lg">{mockPrediction.team2Probability}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
                    style={{ width: `${mockPrediction.team2Probability}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300 font-semibold">AI Confidence Score</span>
                <span className="text-green-400 font-bold text-lg">{mockPrediction.confidence}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${mockPrediction.confidence}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {mockPrediction.confidence > 85
                  ? "Very High Confidence - Strong patterns detected"
                  : "Good Confidence - Multiple factors aligned"}
              </p>
            </div>
          </Card>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <LineChart className="w-6 h-6 text-red-500" />
              AI Prediction Runs Per Over
            </h2>
          </div>

          <Card className="bg-slate-800/30 border-slate-700 p-6">
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={predictionRunsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(71, 85, 105)" />
                  <XAxis
                    dataKey="over"
                    stroke="rgb(148, 163, 184)"
                    style={{ fontSize: "12px" }}
                    label={{ value: "Over Number", position: "insideBottomRight", offset: -5 }}
                  />
                  <YAxis
                    stroke="rgb(148, 163, 184)"
                    style={{ fontSize: "12px" }}
                    label={{ value: "Cumulative Runs", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(15, 23, 42)",
                      border: "1px solid rgb(71, 85, 105)",
                      borderRadius: "8px",
                      color: "rgb(226, 232, 240)",
                    }}
                    labelStyle={{ color: "rgb(226, 232, 240)" }}
                    formatter={(value) => {
                      if (value === null) return "—"
                      return value
                    }}
                    labelFormatter={(label) => `Over ${label}`}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" height={36} />
                  <Line
                    type="monotone"
                    dataKey="actualRuns"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Actual Runs (Historical)"
                    isAnimationActive={true}
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="aiPredicted"
                    stroke="#ef4444"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: "#ef4444", r: 5 }}
                    activeDot={{ r: 7 }}
                    name="AI Predicted Runs (Future)"
                    isAnimationActive={true}
                    connectNulls={false}
                  />
                  <ReferenceDot x="6.5" y={38} r={8} fill="#fbbf24" stroke="#f59e0b" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-slate-300 text-sm mb-3">
                <span className="font-semibold text-green-400">Solid green line</span> shows actual cumulative runs
                scored through 6 overs. The <span className="font-semibold text-red-400">dashed red line</span> branches
                from the current point (over 6.5) showing AI predicted cumulative runs for the remaining overs. The{" "}
                <span className="font-semibold text-yellow-400">gold dot</span> marks the branching point where
                predictions begin.
              </p>
            </div>
          </Card>
        </div>

        {/* Analysis Factors */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-red-500" />
              Key Prediction Factors
            </h2>
            <div className="flex items-center gap-2">
              {["24h", "7d", "30d"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  className={`text-xs ${
                    timeRange === range ? "bg-red-500 text-white border-red-500" : "border-slate-600 text-slate-300"
                  }`}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {mockPrediction.factors.map((factor, idx) => (
              <Card
                key={idx}
                className={`border transition-all cursor-pointer ${
                  expanded === factor.name
                    ? "border-red-500 bg-slate-800/50"
                    : "border-slate-700 bg-slate-800/30 hover:border-red-500/50"
                }`}
                onClick={() => setExpanded(expanded === factor.name ? null : factor.name)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-1">{factor.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 max-w-xs bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-gradient-to-r ${
                              factor.impact === "positive"
                                ? "from-green-500 to-emerald-500"
                                : factor.impact === "negative"
                                  ? "from-red-500 to-orange-500"
                                  : "from-slate-500 to-slate-600"
                            }`}
                            style={{ width: `${(factor.score / 10) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-400">{factor.score.toFixed(1)}/10</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${getImpactBg(factor.impact)} ${getImpactColor(factor.impact)} text-xs border-0`}
                      >
                        {factor.impact === "positive"
                          ? "↑ Positive"
                          : factor.impact === "negative"
                            ? "↓ Negative"
                            : "→ Neutral"}
                      </Badge>
                      <p className="text-xs text-slate-400 mt-1">Weight: {(factor.weight * 100).toFixed(0)}%</p>
                    </div>
                  </div>

                  {expanded === factor.name && (
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-slate-300 text-sm leading-relaxed">{factor.description}</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="bg-slate-900/50 rounded p-2">
                          <p className="text-xs text-slate-400 mb-1">Historical Average</p>
                          <p className="text-white font-semibold text-sm">7.2/10</p>
                        </div>
                        <div className="bg-slate-900/50 rounded p-2">
                          <p className="text-xs text-slate-400 mb-1">Trend</p>
                          <p className="text-green-400 font-semibold text-sm">+12% ↑</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Historical Accuracy */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="bg-slate-800/30 border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <LineChart className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-white">Model Accuracy</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 text-sm">24-Hour Accuracy</span>
                  <span className="text-green-400 font-bold">87%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 text-sm">7-Day Accuracy</span>
                  <span className="text-green-400 font-bold">84%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "84%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 text-sm">30-Day Accuracy</span>
                  <span className="text-green-400 font-bold">81%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "81%" }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-white">Prediction Updates</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <p className="text-white font-semibold text-sm">Latest Update</p>
                  <p className="text-slate-400 text-xs">Just now</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">+2%</Badge>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <div>
                  <p className="text-white font-semibold text-sm">Previous (15 mins ago)</p>
                  <p className="text-slate-400 text-xs">India: 63%</p>
                </div>
                <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">-1%</Badge>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Updates every 15 minutes</p>
                <p className="text-slate-400 text-xs">During live match only</p>
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-lg px-8 py-6 border-0">
              Back to Matches
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
