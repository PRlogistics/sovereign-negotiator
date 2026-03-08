import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, Shield, Zap, Lock, Cpu, 
  ChevronRight, Play, Pause, Volume2,
  Target, MessageSquare, Phone, CheckCircle,
  TrendingUp, Building2, FileText, Award, Users,
  ArrowRight, Sparkles, Radio, Fingerprint, Server
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Toaster, toast } from 'sonner'

// Voice Waveform
const VoiceWaveform = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-cyan-400"
          animate={isActive ? {
            height: [4, Math.random() * 30 + 6, 4],
            opacity: [0.5, 1, 0.5]
          } : { height: 4, opacity: 0.3 }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
  )
}

// Hero Section
const HeroSection = ({ onStartDemo }: { onStartDemo: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 grid-pattern" />
      <motion.div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" 
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }} />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Badge variant="outline" className="mb-4 border-cyan-400/30 text-cyan-400">
          <Sparkles className="w-3 h-3 mr-1 inline" />
          Singapore's First Sovereign AI Negotiator
        </Badge>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-white">The </span>
          <span className="text-gradient">Sovereign</span>
          <br />
          <span className="text-white">Negotiator</span>
        </h1>

        <p className="text-lg text-muted-foreground mb-6">
          Conduct high-stakes business in any language with your cloned voice.
          <br />
          <span className="text-cyan-400">Total privacy. Total control.</span>
        </p>

        <Card className="glass max-w-lg mx-auto mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-white">AI Voice Preview</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </Button>
            </div>
            <VoiceWaveform isActive={isPlaying} />
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onStartDemo} className="bg-gradient-to-r from-cyan-400 to-teal-400 text-black">
            <Play className="w-4 h-4 mr-2" />
            Start Live Demo
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-4 gap-4">
          {[{v:'<200ms',l:'Latency'},{v:'100%',l:'Local'},{v:'50+',l:'Languages'},{v:'SG',l:'Host'}].map((s,i) => (
            <div key={i} className="text-center">
              <p className="text-xl font-bold text-gradient">{s.v}</p>
              <p className="text-xs text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Voice Enrollment
const VoiceEnrollmentSection = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (isRecording && progress < 100) {
      const timer = setTimeout(() => setProgress(p => Math.min(p + 2, 100)), 100)
      return () => clearTimeout(timer)
    } else if (progress >= 100 && !isComplete) {
      setIsComplete(true)
      setIsRecording(false)
      toast.success('Voice clone created!')
    }
  }, [isRecording, progress, isComplete])

  return (
    <section id="voice-section" className="py-16 px-4 relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 border-violet-400/30 text-violet-400">
            Step 1: Voice Enrollment
          </Badge>
          <h2 className="text-3xl font-bold text-gradient-purple">Clone Your Voice</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center">
              <Mic className={`w-10 h-10 text-white ${isRecording ? 'animate-pulse' : ''}`} />
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex gap-2 justify-center">
              {!isRecording && !isComplete && (
                <Button onClick={() => {setIsRecording(true); setProgress(0);}} className="bg-cyan-400 text-black">
                  <Mic className="w-4 h-4 mr-1" /> Start
                </Button>
              )}
              {isRecording && <Button variant="destructive" onClick={() => setIsRecording(false)}>Stop</Button>}
              {isComplete && <Button variant="outline" className="border-green-400 text-green-400"><CheckCircle className="w-4 h-4 mr-1" /> Cloned</Button>}
            </div>
          </Card>

          <Card className="glass p-4">
            <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400" /> Ethics Script
            </h3>
            <p className="text-xs text-muted-foreground font-mono">
              I authorize this system to create a digital voice clone for sovereign business negotiation. My biometric data will be encrypted and stored locally.
            </p>
            {isComplete && (
              <div className="mt-4 p-3 bg-green-400/10 rounded-lg border border-green-400/30">
                <Fingerprint className="w-5 h-5 text-green-400 inline mr-2" />
                <span className="text-sm text-green-400">Voice Passport Created</span>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}

// Strategy Section
const StrategySection = () => {
  const [targets, setTargets] = useState({ units: 1000, maxPrice: 50, targetPrice: 42 })
  const [style, setStyle] = useState<'aggressive' | 'collaborative'>('collaborative')

  return (
    <section className="py-16 px-4 relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 border-emerald-400/30 text-emerald-400">
            Step 2: Strategy
          </Badge>
          <h2 className="text-3xl font-bold text-gradient">Define Strategy</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass p-4 space-y-4">
            <h3 className="text-sm font-medium flex items-center gap-2"><Target className="w-4 h-4 text-cyan-400" /> Goals</h3>
            
            <div>
              <label className="text-xs text-muted-foreground">Units</label>
              <div className="flex items-center gap-3">
                <Slider value={[targets.units]} onValueChange={([v]) => setTargets(t => ({ ...t, units: v }))} max={5000} step={100} />
                <span className="text-cyan-400 text-sm w-12">{targets.units}</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Max Price</label>
              <div className="flex items-center gap-3">
                <Slider value={[targets.maxPrice]} onValueChange={([v]) => setTargets(t => ({ ...t, maxPrice: v }))} max={100} />
                <span className="text-cyan-400 text-sm w-12">${targets.maxPrice}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant={style === 'aggressive' ? 'default' : 'outline'} onClick={() => setStyle('aggressive')} className={style === 'aggressive' ? 'bg-orange-400' : ''}>
                <Zap className="w-3 h-3 mr-1" /> Aggressive
              </Button>
              <Button size="sm" variant={style === 'collaborative' ? 'default' : 'outline'} onClick={() => setStyle('collaborative')} className={style === 'collaborative' ? 'bg-cyan-400 text-black' : ''}>
                <Users className="w-3 h-3 mr-1" /> Collaborative
              </Button>
            </div>
          </Card>

          <Card className="glass p-4">
            <h3 className="text-sm font-medium flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-violet-400" /> AI Analysis</h3>
            <div className="space-y-2">
              <div className="p-2 bg-black/30 rounded">
                <p className="text-xs text-cyan-400">Opening Anchor</p>
                <p className="text-xs text-muted-foreground">Start at ${Math.round(targets.targetPrice * 0.85)}</p>
              </div>
              <div className="p-2 bg-black/30 rounded">
                <p className="text-xs text-cyan-400">Success Probability</p>
                <p className="text-xl font-bold text-emerald-400">{style === 'collaborative' ? '87%' : '72%'}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Negotiation Section
const NegotiationSection = () => {
  const [isActive, setIsActive] = useState(false)
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Ready to initiate call. Press Start.' }])
  const [pendingApproval, setPendingApproval] = useState<string | null>(null)

  const startNegotiation = () => {
    setIsActive(true)
    setMessages([{ role: 'other', text: 'Hello, interested in purchasing units?' }])
  }

  return (
    <section className="py-16 px-4 relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 border-cyan-400/30 text-cyan-400">Step 3: Live Call</Badge>
          <h2 className="text-3xl font-bold text-gradient">The Live Call</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Card className="glass">
              <CardHeader className="border-b border-white/10 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm\">Shanghai Manufacturing</span>
                  </div>
                  <Badge className={isActive ? 'bg-green-400 text-black' : ''}>{isActive ? 'LIVE' : 'STANDBY'}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                  {messages.map((m: any, i) => (
                    <div key={i} className={`p-2 rounded text-xs ${m.role === 'ai' ? 'bg-violet-400/20' : 'bg-white/5'}`}>
                      {m.text}
                    </div>
                  ))}
                </div>
                {!isActive ? (
                  <Button onClick={startNegotiation} className="w-full bg-cyan-400 text-black"><Play className="w-3 h-3 mr-1" /> Start</Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPendingApproval('Offer $43/unit?')}><MessageSquare className="w-3 h-3 mr-1" /> Compromise</Button>
                    <Button variant="destructive" size="sm" onClick={() => setIsActive(false)}>End</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="glass p-4">
            <h3 className="text-xs font-medium flex items-center gap-2 mb-3"><Shield className="w-4 h-4 text-emerald-400" /> Verification</h3>
            {pendingApproval ? (
              <div className="p-3 bg-amber-400/10 rounded border border-amber-400/30">
                <p className="text-xs mb-2">{pendingApproval}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-emerald-400 text-black" onClick={() => {toast.success('Approved!'); setPendingApproval(null);}}>Approve</Button>
                  <Button size="sm" variant="outline" onClick={() => setPendingApproval(null)}>Reject</Button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-4">All deals require approval</p>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}

// Architecture Section
const ArchitectureSection = () => {
  const layers = [
    { title: 'Privacy', icon: Lock, color: 'cyan', items: ['Llama-3-70B', 'Whisper-v3', 'Singtel RE:AI'] },
    { title: 'Identity', icon: Fingerprint, color: 'violet', items: ['CosyVoice 2', '<200ms TTS', 'Encrypted'] },
    { title: 'Action', icon: Cpu, color: 'emerald', items: ['LangGraph', '50+ Languages', 'Swipe-Approve'] }
  ]

  return (
    <section className="py-16 px-4 relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3 border-cyan-400/30 text-cyan-400">Architecture</Badge>
          <h2 className="text-3xl font-bold text-gradient">Three-Layer Stack</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {layers.map((l, i) => (
            <Card key={i} className="glass p-4">
              <l.icon className={`w-6 h-6 mb-2 text-${l.color}-400`} />
              <h3 className="font-medium mb-2">{l.title}</h3>
              {l.items.map((item, j) => (
                <div key={j} className="text-xs text-muted-foreground py-1">{item}</div>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Launch Section
const LaunchSection = () => (
  <section className="py-16 px-4 relative">
    <div className="absolute inset-0 grid-pattern opacity-50" />
    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <Badge variant="outline" className="mb-3 border-emerald-400/30 text-emerald-400">Singapore Launch</Badge>
      <h2 className="text-3xl font-bold text-gradient mb-6">Built in Singapore</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[{i:Building2,t:'Incorporate',d:'Pte Ltd'},{i:FileText,t:'IP',d:'Patent'},{i:Award,t:'Funding',d:'S$50K'},{i:Server,t:'Scale',d:'GPU Credits'}].map((s,i) => (
          <Card key={i} className="glass p-3 text-center">
            <s.i className="w-5 h-5 mx-auto mb-2 text-cyan-400" />
            <p className="text-sm font-medium\">{s.t}</p>
            <p className="text-xs text-muted-foreground\">{s.d}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

// Moat Section
const MoatSection = () => (
  <section className="py-16 px-4 relative">
    <div className="absolute inset-0 grid-pattern opacity-50" />
    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <Badge variant="outline" className="mb-3 border-violet-400/30 text-violet-400">Competitive Moat</Badge>
      <h2 className="text-3xl font-bold text-gradient-purple mb-6\">Three Layers of Protection</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[{t:'Technical',i:Cpu,p:['Audio watermarking','Sub-200ms latency']},{t:'Legal',i:Shield,p:['Singapore DPAs','Patent pending']},{t:'Market',i:TrendingUp,p:['First-mover','SME focus']}].map((m,i) => (
          <Card key={i} className="glass p-4 text-left">
            <m.i className="w-5 h-5 mb-2 text-cyan-400" />
            <h3 className="font-medium mb-2\">{m.t}</h3>
            {m.p.map((pt,j) => <p key={j} className="text-xs text-muted-foreground\">{pt}</p>)}
          </Card>
        ))}
      </div>
      <Card className="glass max-w-md mx-auto p-6">
        <h3 className="text-xl font-bold mb-3\">Ready to Negotiate?</h3>
        <Button className="bg-cyan-400 text-black" onClick={() => toast.success('Added to waitlist!')}>
          <Sparkles className="w-4 h-4 mr-2" /> Join Waitlist
        </Button>
      </Card>
    </div>
  </section>
)

// Footer
const Footer = () => (
  <footer className="py-8 px-4 border-t border-white/10 text-center">
    <p className="text-sm font-medium\">The Sovereign Negotiator</p>
    <p className="text-xs text-muted-foreground\">© 2026 | Made with sovereignty in Singapore</p>
  </footer>
)

// Main App
function App() {
  const scrollToVoice = () => document.getElementById('voice-section')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <HeroSection onStartDemo={scrollToVoice} />
      <VoiceEnrollmentSection />
      <StrategySection />
      <NegotiationSection />
      <ArchitectureSection />
      <LaunchSection />
      <MoatSection />
      <Footer />
    </div>
  )
}

export default App
