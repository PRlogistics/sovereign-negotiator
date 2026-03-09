import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mic, Target, MessageSquare, Cpu, Building2, Shield, 
  Sparkles, Play, ChevronRight, Phone, Lock, Globe,
  TrendingUp, FileText, Award, Zap, Users, CheckCircle,
  Volume2, Pause
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Toaster, toast } from 'sonner'

// Sidebar Component
const Sidebar = ({ activeSection, onNavigate }: { activeSection: string, onNavigate: (s: string) => void }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'voice', label: 'Voice Clone', icon: Mic },
    { id: 'strategy', label: 'Strategy', icon: Target },
    { id: 'negotiation', label: 'Live Demo', icon: MessageSquare },
    { id: 'tech', label: 'Tech Stack', icon: Cpu },
    { id: 'launch', label: 'Launch', icon: Building2 },
    { id: 'moat', label: 'Protection', icon: Shield },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d0d10] border-r border-white/[0.06] flex flex-col z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="ml-3 font-semibold text-white">Sovereign</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-xs font-bold">
            SN
          </div>
          <div className="text-sm">
            <p className="text-white font-medium">Sovereign AI</p>
            <p className="text-gray-500 text-xs">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

// Voice Waveform
const VoiceWaveform = ({ isActive }: { isActive: boolean }) => (
  <div className="flex items-center justify-center gap-[3px] h-10">
    {Array.from({ length: 16 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-1 rounded-full bg-cyan-400"
        animate={isActive ? { height: [4, 8 + Math.random() * 20, 4] } : { height: 4 }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.03 }}
      />
    ))}
  </div>
)

// Stat Card
const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="card-dark p-4 text-center hover-lift">
    <p className="text-2xl font-bold text-cyan-400">{value}</p>
    <p className="text-xs text-gray-500 mt-1">{label}</p>
  </div>
)

// Feature Card
const FeatureCard = ({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) => (
  <Card className="card-dark hover-lift">
    <CardContent className="p-5">
      <div className={`w-10 h-10 rounded-lg bg-${color}-500/10 flex items-center justify-center mb-4`}>
        <Icon className={`w-5 h-5 text-${color}-400`} />
      </div>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </CardContent>
  </Card>
)

function App() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isPlaying, setIsPlaying] = useState(false)

  const navigateTo = (section: string) => {
    setActiveSection(section)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex">
      <Toaster position="top-center" richColors />
      <Sidebar activeSection={activeSection} onNavigate={navigateTo} />
      
      <main className="flex-1 ml-64">
        {/* Overview / Hero Section */}
        <section id="overview" className="min-h-screen p-8 flex items-center">
          <div className="max-w-5xl mx-auto w-full">
            {/* Background glow */}
            <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 left-80 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20">
                <Sparkles className="w-3 h-3 mr-1" />
                Singapore's First Sovereign AI Negotiator
              </Badge>
              
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                The <span className="text-gradient">Sovereign</span><br />
                Negotiator
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 max-w-xl">
                Conduct high-stakes business in any language with your cloned voice. 
                Total privacy. Total control.
              </p>

              <div className="flex gap-4 mb-12">
                <Button 
                  onClick={() => navigateTo('voice')}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 h-11"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Demo
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigateTo('tech')}
                  className="border-white/10 hover:bg-white/5 h-11"
                >
                  View Architecture
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-4 max-w-2xl">
                <StatCard value="<200ms" label="Voice Latency" />
                <StatCard value="100%" label="Local Processing" />
                <StatCard value="50+" label="Languages" />
                <StatCard value="SG" label="Sovereign Host" />
              </div>
            </div>
          </div>
        </section>

        {/* Voice Enrollment */}
        <section id="voice" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-violet-500/10 text-violet-400 border-violet-500/20">Step 1</Badge>
              <h2 className="text-3xl font-bold">Clone Your Voice</h2>
              <p className="text-gray-400 mt-1">Record and clone your voice for negotiations</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card-dark">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                      <Mic className="w-12 h-12 text-white" />
                    </div>
                    <Progress value={0} className="h-2 mb-6 bg-white/10" />
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6">
                      <Mic className="w-4 h-4 mr-2" />
                      Start Recording
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">Record for at least 30 seconds</p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="card-dark">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2 text-gray-300">
                      <FileText className="w-4 h-4 text-violet-400" />
                      Recording Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm text-gray-400">
                      {['Record in a quiet environment', 'Speak clearly and naturally', 'Include varied intonation', 'Minimum 30 seconds recommended'].map((tip, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-dark border-emerald-500/20">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-emerald-400">Voice Passport Ready</p>
                      <p className="text-sm text-gray-500">Your voice is encrypted and secure</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy */}
        <section id="strategy" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Step 2</Badge>
              <h2 className="text-3xl font-bold">Define Strategy</h2>
              <p className="text-gray-400 mt-1">Set your negotiation parameters</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card-dark">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    Negotiation Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-400">Units to Purchase</label>
                      <span className="text-cyan-400 font-mono">1,000</span>
                    </div>
                    <Slider defaultValue={[1000]} max={5000} step={100} className="flex-1" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-400">Maximum Price</label>
                      <span className="text-cyan-400 font-mono">$50</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} className="flex-1" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-400">Target Price</label>
                      <span className="text-emerald-400 font-mono">$42</span>
                    </div>
                    <Slider defaultValue={[42]} max={50} step={1} className="flex-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
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

              <Card className="card-dark border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    AI Strategy Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white/[0.03] rounded-lg">
                    <p className="text-sm text-cyan-400 mb-1">Opening Anchor</p>
                    <p className="text-white font-medium">$36 per unit</p>
                    <p className="text-xs text-gray-500 mt-1">Creates negotiation room</p>
                  </div>
                  <div className="p-4 bg-white/[0.03] rounded-lg">
                    <p className="text-sm text-cyan-400 mb-1">Concession Strategy</p>
                    <p className="text-gray-400 text-sm">Gradual concessions to build rapport</p>
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

        {/* Live Negotiation */}
        <section id="negotiation" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Step 3</Badge>
              <h2 className="text-3xl font-bold">Live Negotiation</h2>
              <p className="text-gray-400 mt-1">AI negotiates in real-time</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="card-dark h-full">
                  <CardHeader className="border-b border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Active Negotiation</p>
                          <p className="text-xs text-gray-500">Shanghai Manufacturing Co.</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                        LIVE
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-6">
                      <VoiceWaveform isActive={true} />
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-violet-400 font-medium">AI (Your Voice)</span>
                          <Badge variant="outline" className="text-[10px]">ZH</Badge>
                        </div>
                        <p className="text-sm">你好，我想了解一下你们的产品价格。</p>
                        <p className="text-xs text-gray-500 mt-1 italic">Hello, I would like to know about your product pricing.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.03]">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-gray-400 font-medium">Counterparty</span>
                          <Badge variant="outline" className="text-[10px]">ZH</Badge>
                        </div>
                        <p className="text-sm">我们的价格是每件50美元。</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 border-white/10 hover:bg-white/5">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Suggest Compromise
                      </Button>
                      <Button variant="destructive">End Call</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="card-dark">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      Verification Gate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Lock className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                      <p className="text-sm text-gray-400">All deal points require</p>
                      <p className="text-sm text-gray-400">your explicit approval</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-dark">
                  <CardContent className="p-4">
                    <p className="text-xs text-gray-500 mb-3">Target Language</p>
                    <select className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
                      <option>🇨🇳 Mandarin (Chinese)</option>
                      <option>🇩🇪 German</option>
                      <option>🇯🇵 Japanese</option>
                      <option>🇫🇷 French</option>
                    </select>
                  </CardContent>
                </Card>

                <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                    <span className="text-sm text-amber-400 font-medium">Approval Required</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">Offer $43/unit to close deal?</p>
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
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Technical</Badge>
              <h2 className="text-3xl font-bold">Three-Layer Stack</h2>
              <p className="text-gray-400 mt-1">Built for privacy and performance</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Privacy Layer', icon: Lock, color: 'cyan', items: ['Llama-3-70B', 'Whisper-v3', 'Singtel RE:AI', 'Singapore Sovereign'] },
                { title: 'Identity Layer', icon: Target, color: 'violet', items: ['ElevenLabs API', 'Sub-200ms TTS', 'Encrypted Biometric', 'Prosody Preservation'] },
                { title: 'Action Layer', icon: Cpu, color: 'emerald', items: ['OpenAI GPT-4', 'DeepL API', 'Swipe-to-Approve', '50+ Languages'] }
              ].map((layer, i) => (
                <Card key={i} className="card-dark">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-${layer.color}-500/10 flex items-center justify-center mb-4`}>
                      <layer.icon className={`w-6 h-6 text-${layer.color}-400`} />
                    </div>
                    <CardTitle className="text-lg">{layer.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {layer.items.map((item, j) => (
                        <div key={j} className="p-3 bg-white/[0.03] rounded-lg text-sm text-gray-300">{item}</div>
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
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Singapore</Badge>
              <h2 className="text-3xl font-bold">Launch Strategy</h2>
              <p className="text-gray-400 mt-1">Built in Singapore, for the world</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Building2, title: 'Incorporate', desc: 'Pte Ltd', status: 'done' },
                { icon: FileText, title: 'IP Protection', desc: 'File Patent', status: 'progress' },
                { icon: Award, title: 'Funding', desc: 'S$50,000', status: 'pending' },
                { icon: Zap, title: 'Scaling', desc: 'GPU Credits', status: 'pending' }
              ].map((step, i) => (
                <Card key={i} className={`card-dark ${step.status === 'done' ? 'border-emerald-500/30' : ''}`}>
                  <CardContent className="p-5 text-center">
                    <div className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${step.status === 'done' ? 'bg-emerald-500/10' : step.status === 'progress' ? 'bg-amber-500/10' : 'bg-white/5'}`}>
                      <step.icon className={`w-6 h-6 ${step.status === 'done' ? 'text-emerald-400' : step.status === 'progress' ? 'text-amber-400' : 'text-gray-500'}`} />
                    </div>
                    <p className="font-medium mb-1">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.desc}</p>
                    {step.status === 'done' && <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto mt-2" />}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="card-dark p-6 text-center">
                <p className="text-3xl font-bold text-emerald-400">#1</p>
                <p className="text-sm text-gray-500 mt-1">AI Readiness Index</p>
              </div>
              <div className="card-dark p-6 text-center">
                <p className="text-3xl font-bold text-cyan-400">S$500M+</p>
                <p className="text-sm text-gray-500 mt-1">Gov AI Investment</p>
              </div>
              <div className="card-dark p-6 text-center">
                <p className="text-3xl font-bold text-violet-400">100%</p>
                <p className="text-sm text-gray-500 mt-1">Data Sovereignty</p>
              </div>
            </div>
          </div>
        </section>

        {/* Moat */}
        <section id="moat" className="min-h-screen p-8 pt-24 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-violet-500/10 text-violet-400 border-violet-500/20">Protection</Badge>
              <h2 className="text-3xl font-bold">Competitive Moat</h2>
              <p className="text-gray-400 mt-1">Three layers of protection</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'Technical', icon: Cpu, color: 'cyan', points: ['Invisible audio watermarking', 'Sub-200ms latency', 'Local processing', 'Proprietary algorithms'] },
                { title: 'Legal', icon: Shield, color: 'violet', points: ['Singapore-governed DPAs', 'Pending patent protection', 'Biometric sovereignty', 'PDPA/GDPR compliance'] },
                { title: 'Market', icon: TrendingUp, color: 'emerald', points: ['First-mover advantage', 'SME procurement focus', 'Government partnerships', 'High-stakes niche'] }
              ].map((moat, i) => (
                <Card key={i} className="card-dark">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-${moat.color}-500/10 flex items-center justify-center mb-4`}>
                      <moat.icon className={`w-6 h-6 text-${moat.color}-400`} />
                    </div>
                    <CardTitle>{moat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {moat.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                          <ChevronRight className={`w-4 h-4 text-${moat.color}-400 mt-0.5 flex-shrink-0`} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="card-dark border-cyan-500/30 max-w-xl mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Ready to Negotiate?</h3>
                <p className="text-gray-400 mb-6">Join the waitlist for early access to The Sovereign Negotiator</p>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8 h-11">
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
