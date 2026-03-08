import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Mic, Shield, Zap, Lock, Cpu, 
  Play, Pause, Volume2, Target, 
  MessageSquare, Phone, CheckCircle,
  TrendingUp, Building2, FileText, Award, Users,
  Sparkles, Fingerprint, Server, Globe,
  ChevronRight, Radio, Lock as LockIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Toaster, toast } from 'sonner'
import { Sidebar } from '@/components/Sidebar'

// Voice Waveform - simplified
const VoiceWaveform = ({ isActive }: { isActive: boolean }) => (
  <div className="flex items-center justify-center gap-1 h-12">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-1.5 rounded-full bg-cyan-400"
        animate={isActive ? { height: [4, 16 + Math.random() * 16, 4] } : { height: 4 }}
        transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
      />
    ))}
  </div>
)

// Main Dashboard Layout
function App() {
  const [activeSection, setActiveSection] = useState('hero')
  const contentRef = useRef<HTMLDivElement>(null)

  const navigateTo = (section: string) => {
    setActiveSection(section)
    const el = document.getElementById(section)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex">
      <Toaster position="top-center" richColors />
      <Sidebar activeSection={activeSection} onNavigate={navigateTo} />
      
      <main ref={contentRef} className="flex-1 ml-64 overflow-y-auto">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center p-8 relative">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-10 max-w-3xl text-center">
            <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Singapore's First Sovereign AI Negotiator
            </Badge>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              The <span className="text-cyan-400">Sovereign</span><br />
              Negotiator
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Conduct high-stakes business in any language with your cloned voice. 
              Total privacy. Total control.
            </p>

            <div className="flex gap-4 justify-center mb-12">
              <Button 
                onClick={() => navigateTo('voice')}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-6"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Demo
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigateTo('architecture')}
                className="border-white/10 hover:bg-white/5"
              >
                View Architecture
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-6 max-w-2xl mx-auto">
              {[
                { value: '<200ms', label: 'Latency' },
                { value: '100%', label: 'Local' },
                { value: '50+', label: 'Languages' },
                { value: 'SG', label: 'Sovereign' }
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voice Enrollment */}
        <section id="voice" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-violet-500/10 text-violet-400 border-violet-500/20">Step 1</Badge>
              <h2 className="text-3xl font-bold">Clone Your Voice</h2>
              <p className="text-gray-400">Record and clone your voice for negotiations</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-[#111118] border-white/5">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                    <Mic className="w-10 h-10 text-white" />
                  </div>
                  <Progress value={0} className="h-2 mb-4 bg-white/10" />
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-[#111118] border-white/5">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-violet-400" />
                    Recording Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5" />
                      Record in a quiet environment
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5" />
                      Speak clearly and naturally
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5" />
                      Minimum 30 seconds recommended
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Strategy */}
        <section id="strategy" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Step 2</Badge>
              <h2 className="text-3xl font-bold">Define Strategy</h2>
              <p className="text-gray-400">Set your negotiation parameters</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-[#111118] border-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    Negotiation Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Units to Purchase</label>
                    <div className="flex items-center gap-4">
                      <Slider defaultValue={[1000]} max={5000} step={100} className="flex-1" />
                      <span className="text-cyan-400 font-mono w-16">1000</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Maximum Price ($)</label>
                    <div className="flex items-center gap-4">
                      <Slider defaultValue={[50]} max={100} step={1} className="flex-1" />
                      <span className="text-cyan-400 font-mono w-16">$50</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
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

              <Card className="bg-[#111118] border-white/5 border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-sm text-cyan-400 mb-1">Opening Anchor</p>
                    <p className="text-sm text-gray-400">Start at $36 to create room</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-sm text-cyan-400 mb-1">Success Probability</p>
                    <p className="text-2xl font-bold text-emerald-400">87%</p>
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
              <p className="text-gray-400">AI negotiates in real-time</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-[#111118] border-white/5 h-full">
                  <CardHeader className="border-b border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">Active Negotiation</p>
                          <p className="text-xs text-gray-500">Shanghai Manufacturing</p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">LIVE</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex justify-center mb-4">
                      <VoiceWaveform isActive={true} />
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                        <p className="text-xs text-violet-400 mb-1">AI (Your Voice)</p>
                        <p className="text-sm">Hello, interested in purchasing units?</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 border-white/10">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Suggest
                      </Button>
                      <Button variant="destructive">End</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-[#111118] border-white/5">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <LockIcon className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                    <p className="text-sm text-gray-500">All deals require approval</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <p className="text-xs text-gray-500 mb-2">Target Language</p>
                    <select className="w-full bg-black/50 border border-white/10 rounded px-2 py-1 text-sm">
                      <option>Mandarin (Chinese)</option>
                      <option>German</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Technical</Badge>
              <h2 className="text-3xl font-bold">Three-Layer Stack</h2>
              <p className="text-gray-400">Built for privacy and performance</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Privacy Layer', icon: Lock, color: 'cyan', items: ['Llama-3-70B', 'Whisper-v3', 'Singtel RE:AI'] },
                { title: 'Identity Layer', icon: Fingerprint, color: 'violet', items: ['ElevenLabs API', '<200ms TTS', 'Encrypted'] },
                { title: 'Action Layer', icon: Cpu, color: 'emerald', items: ['OpenAI GPT-4', 'DeepL API', '50+ Languages'] }
              ].map((layer, i) => (
                <Card key={i} className="bg-[#111118] border-white/5">
                  <CardHeader>
                    <div className={`w-10 h-10 rounded-lg bg-${layer.color}-500/10 flex items-center justify-center mb-3`}>
                      <layer.icon className={`w-5 h-5 text-${layer.color}-400`} />
                    </div>
                    <CardTitle className="text-lg">{layer.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {layer.items.map((item, j) => (
                        <div key={j} className="p-2 bg-white/5 rounded text-sm">{item}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Launch Strategy */}
        <section id="launch" className="min-h-screen p-8 pt-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Singapore</Badge>
              <h2 className="text-3xl font-bold">Launch Strategy</h2>
              <p className="text-gray-400">Built in Singapore, for the world</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Building2, title: 'Incorporate', desc: 'Pte Ltd', status: 'done' },
                { icon: FileText, title: 'IP Protection', desc: 'Patent', status: 'progress' },
                { icon: Award, title: 'Funding', desc: 'S$50K', status: 'pending' },
                { icon: Server, title: 'Scaling', desc: 'GPU Credits', status: 'pending' }
              ].map((step, i) => (
                <Card key={i} className={`bg-[#111118] border-white/5 ${step.status === 'done' ? 'border-emerald-500/20' : ''}`}>
                  <CardContent className="p-4 text-center">
                    <div className={`w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center ${step.status === 'done' ? 'bg-emerald-500/10' : 'bg-white/5'}`}>
                      <step.icon className={`w-5 h-5 ${step.status === 'done' ? 'text-emerald-400' : 'text-gray-500'}`} />
                    </div>
                    <p className="font-medium text-sm">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Moat */}
        <section id="moat" className="min-h-screen p-8 pt-24 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-2 bg-violet-500/10 text-violet-400 border-violet-500/20">Protection</Badge>
              <h2 className="text-3xl font-bold">Competitive Moat</h2>
              <p className="text-gray-400">Three layers of protection</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'Technical', icon: Cpu, color: 'cyan', points: ['Audio watermarking', 'Sub-200ms latency', 'Local processing'] },
                { title: 'Legal', icon: Shield, color: 'violet', points: ['Singapore DPAs', 'Patent pending', 'GDPR compliance'] },
                { title: 'Market', icon: TrendingUp, color: 'emerald', points: ['First-mover', 'SME focus', 'Gov partnerships'] }
              ].map((moat, i) => (
                <Card key={i} className="bg-[#111118] border-white/5">
                  <CardHeader>
                    <div className={`w-10 h-10 rounded-lg bg-${moat.color}-500/10 flex items-center justify-center mb-3`}>
                      <moat.icon className={`w-5 h-5 text-${moat.color}-400`} />
                    </div>
                    <CardTitle>{moat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {moat.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                          <ChevronRight className={`w-4 h-4 text-${moat.color}-400 mt-0.5`} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-[#111118] border-cyan-500/20 max-w-lg mx-auto">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-2">Ready to Negotiate?</h3>
                <p className="text-sm text-gray-400 mb-6">Join the waitlist for early access</p>
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-8">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join Waitlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-8 border-t border-white/5">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">The Sovereign Negotiator</span>
            </div>
            <p className="text-xs text-gray-500">© 2026 | Made with sovereignty in Singapore</p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
