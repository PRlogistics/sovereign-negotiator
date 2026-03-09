import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mic, Target, MessageSquare, Cpu, Building2, Shield, 
  Sparkles, Play, ChevronRight, Phone, Lock, CheckCircle,
  TrendingUp, FileText, Award, Zap, Users, Globe,
  Volume2, Pause, BarChart3, Settings
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'

// Sidebar Navigation
const Sidebar = ({ active, onNavigate }: { active: string, onNavigate: (s: string) => void }) => {
  const items = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'voice', label: 'Voice Clone', icon: Mic },
    { id: 'strategy', label: 'Strategy', icon: Target },
    { id: 'demo', label: 'Live Demo', icon: MessageSquare },
    { id: 'tech', label: 'Tech Stack', icon: Cpu },
    { id: 'launch', label: 'Launch', icon: Building2 },
    { id: 'moat', label: 'Protection', icon: Shield },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d0d10] border-r border-white/[0.06] z-50 flex flex-col">
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="ml-3 font-semibold text-white">Sovereign</span>
      </div>
      
      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
            SN
          </div>
          <div>
            <p className="text-white text-sm font-medium">Sovereign AI</p>
            <p className="text-gray-500 text-xs">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

// Voice Waveform
const Waveform = ({ active }: { active: boolean }) => (
  <div className="flex items-center justify-center gap-[2px] h-8">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-cyan-400 rounded-full"
        animate={active ? { height: [3, 6 + Math.random() * 16, 3] } : { height: 3 }}
        transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.02 }}
      />
    ))}
  </div>
)

// Stat Card
const Stat = ({ value, label }: { value: string, label: string }) => (
  <div className="card p-4 text-center">
    <p className="text-2xl font-bold text-cyan-400">{value}</p>
    <p className="text-xs text-gray-500 mt-1">{label}</p>
  </div>
)

function App() {
  const [active, setActive] = useState('overview')
  const [playing, setPlaying] = useState(false)

  const navigate = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex">
      <Sidebar active={active} onNavigate={navigate} />
      
      <main className="flex-1 ml-64">
        {/* Overview Section */}
        <section id="overview" className="min-h-screen p-8 flex items-center relative overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
          
          <div className="max-w-4xl relative z-10">
            <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Singapore's First Sovereign AI Negotiator
            </Badge>
            
            <h1 className="text-6xl font-bold mb-6">
              The <span className="text-gradient">Sovereign</span><br />
              Negotiator
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-xl">
              Conduct high-stakes business in any language with your cloned voice. 
              Total privacy. Total control.
            </p>

            <div className="flex gap-4 mb-10">
              <Button onClick={() => navigate('voice')} className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6">
                <Play className="w-4 h-4 mr-2" />
                Start Demo
              </Button>
              <Button variant="outline" onClick={() => navigate('tech')} className="border-white/10 hover:bg-white/5">
                View Architecture
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-2xl">
              <Stat value="<200ms" label="Voice Latency" />
              <Stat value="100%" label="Local Processing" />
              <Stat value="50+" label="Languages" />
              <Stat value="SG" label="Sovereign Host" />
            </div>
          </div>
        </section>

        {/* Voice Section */}
        <section id="voice" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl">
            <Badge className="mb-2 bg-violet-500/10 text-violet-400 border-violet-500/20">Step 1</Badge>
            <h2 className="text-3xl font-bold mb-1">Clone Your Voice</h2>
            <p className="text-gray-400 mb-8">Record and clone your voice for negotiations</p>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card">
                <CardContent className="p-8 text-center">
                  <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                    <Mic className="w-12 h-12 text-white" />
                  </div>
                  <Progress value={0} className="h-2 mb-6 bg-white/10" />
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording
                  </Button>
                  <p className="text-sm text-gray-500 mt-4">Record for at least 30 seconds</p>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="card">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-medium text-gray-300 mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-400" />
                      Recording Tips
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                      {['Record in a quiet environment', 'Speak clearly and naturally', 'Include varied intonation', 'Minimum 30 seconds'].map((t, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="card p-4 flex items-center gap-4 border-emerald-500/30">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-400">Voice Passport Ready</p>
                    <p className="text-sm text-gray-500">Your voice is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section id="strategy" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl">
            <Badge className="mb-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Step 2</Badge>
            <h2 className="text-3xl font-bold mb-1">Define Strategy</h2>
            <p className="text-gray-400 mb-8">Set your negotiation parameters</p>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card">
                <CardContent className="p-6 space-y-6">
                  <h3 className="font-medium flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    Negotiation Goals
                  </h3>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Units to Purchase</span>
                      <span className="text-cyan-400 font-mono">1,000</span>
                    </div>
                    <Slider defaultValue={[1000]} max={5000} step={100} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400">Maximum Price</span>
                      <span className="text-cyan-400 font-mono">$50</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" className="border-white/10">
                      <Zap className="w-4 h-4 mr-2" />
                      Aggressive
                    </Button>
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
                      <Users className="w-4 h-4 mr-2" />
                      Collaborative
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="card border-cyan-500/20">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    AI Analysis
                  </h3>
                  
                  <div className="p-4 bg-white/[0.03] rounded-lg">
                    <p className="text-sm text-cyan-400 mb-1">Opening Anchor</p>
                    <p className="text-white font-medium">$36 per unit</p>
                  </div>
                  
                  <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400">Success Probability</span>
                    </div>
                    <p className="text-3xl font-bold text-emerald-400">87%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl">
            <Badge className="mb-2 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Step 3</Badge>
            <h2 className="text-3xl font-bold mb-1">Live Negotiation</h2>
            <p className="text-gray-400 mb-8">AI negotiates in real-time</p>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="card h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Active Negotiation</p>
                          <p className="text-xs text-gray-500">Shanghai Manufacturing</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                        LIVE
                      </Badge>
                    </div>

                    <div className="flex justify-center mb-6">
                      <Waveform active={true} />
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                        <p className="text-xs text-violet-400 mb-1">AI (Your Voice) · ZH</p>
                        <p className="text-sm">你好，我想了解一下你们的产品价格。</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.03]">
                        <p className="text-xs text-gray-400 mb-1">Counterparty · ZH</p>
                        <p className="text-sm">我们的价格是每件50美元。</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 border-white/10">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Suggest
                      </Button>
                      <Button variant="destructive">End</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="card">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-medium flex items-center gap-2 mb-4">
                      <Lock className="w-4 h-4 text-emerald-400" />
                      Verification Gate
                    </h3>
                    <div className="text-center py-6">
                      <Lock className="w-10 h-10 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm text-gray-400">All deals require approval</p>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <p className="text-sm text-amber-400 font-medium mb-2">Approval Required</p>
                  <p className="text-sm text-gray-400 mb-3">Offer $43/unit to close?</p>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/10">Reject</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl">
            <Badge className="mb-2 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Technical</Badge>
            <h2 className="text-3xl font-bold mb-1">Three-Layer Stack</h2>
            <p className="text-gray-400 mb-8">Built for privacy and performance</p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Privacy Layer', icon: Lock, color: 'cyan', items: ['Llama-3-70B', 'Whisper-v3', 'Singtel RE:AI'] },
                { title: 'Identity Layer', icon: Target, color: 'violet', items: ['ElevenLabs API', '<200ms TTS', 'Encrypted'] },
                { title: 'Action Layer', icon: Cpu, color: 'emerald', items: ['OpenAI GPT-4', 'DeepL API', '50+ Languages'] }
              ].map((layer, i) => (
                <Card key={i} className="card">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-${layer.color}-500/10 flex items-center justify-center mb-4`}>
                      <layer.icon className={`w-6 h-6 text-${layer.color}-400`} />
                    </div>
                    <h3 className="font-semibold mb-4">{layer.title}</h3>
                    <div className="space-y-2">
                      {layer.items.map((item, j) => (
                        <div key={j} className="p-3 bg-white/[0.03] rounded-lg text-sm">{item}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Launch */}
        <section id="launch" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl">
            <Badge className="mb-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Singapore</Badge>
            <h2 className="text-3xl font-bold mb-1">Launch Strategy</h2>
            <p className="text-gray-400 mb-8">Built in Singapore, for the world</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Building2, title: 'Incorporate', desc: 'Pte Ltd', done: true },
                { icon: FileText, title: 'IP Protection', desc: 'Patent', done: false },
                { icon: Award, title: 'Funding', desc: 'S$50K', done: false },
                { icon: Zap, title: 'Scaling', desc: 'GPU Credits', done: false }
              ].map((step, i) => (
                <Card key={i} className={`card ${step.done ? 'border-emerald-500/30' : ''}`}>
                  <CardContent className="p-5 text-center">
                    <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${step.done ? 'bg-emerald-500/10' : 'bg-white/5'}`}>
                      <step.icon className={`w-6 h-6 ${step.done ? 'text-emerald-400' : 'text-gray-500'}`} />
                    </div>
                    <p className="font-medium text-sm">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="card p-6 text-center">
                <p className="text-3xl font-bold text-emerald-400">#1</p>
                <p className="text-sm text-gray-500 mt-1">AI Readiness</p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-3xl font-bold text-cyan-400">S$500M+</p>
                <p className="text-sm text-gray-500 mt-1">Gov Investment</p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-3xl font-bold text-violet-400">100%</p>
                <p className="text-sm text-gray-500 mt-1">Data Sovereignty</p>
              </div>
            </div>
          </div>
        </section>

        {/* Moat */}
        <section id="moat" className="min-h-screen p-8 pt-24 pb-24">
          <div className="max-w-5xl">
            <Badge className="mb-2 bg-violet-500/10 text-violet-400 border-violet-500/20">Protection</Badge>
            <h2 className="text-3xl font-bold mb-1">Competitive Moat</h2>
            <p className="text-gray-400 mb-8">Three layers of protection</p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'Technical', icon: Cpu, color: 'cyan', points: ['Audio watermarking', 'Sub-200ms latency', 'Local processing'] },
                { title: 'Legal', icon: Shield, color: 'violet', points: ['Singapore DPAs', 'Patent pending', 'GDPR compliance'] },
                { title: 'Market', icon: TrendingUp, color: 'emerald', points: ['First-mover', 'SME focus', 'Gov partnerships'] }
              ].map((moat, i) => (
                <Card key={i} className="card">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-${moat.color}-500/10 flex items-center justify-center mb-4`}>
                      <moat.icon className={`w-6 h-6 text-${moat.color}-400`} />
                    </div>
                    <h3 className="font-semibold mb-4">{moat.title}</h3>
                    <ul className="space-y-2">
                      {moat.points.map((p, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                          <ChevronRight className={`w-4 h-4 text-${moat.color}-400 flex-shrink-0`} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="card border-cyan-500/30 max-w-xl mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Ready to Negotiate?</h3>
                <p className="text-gray-400 mb-6">Join the waitlist for early access</p>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join Waitlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-8 border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">The Sovereign Negotiator</span>
            </div>
            <p className="text-sm text-gray-500">© 2026 | Made with sovereignty in Singapore</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
