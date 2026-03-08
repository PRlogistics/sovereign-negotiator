import { useState } from 'react';
import { 
  Mic, Target, MessageSquare, Cpu, Building2, Shield, 
  ChevronLeft, ChevronRight, Sparkles 
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'hero', label: 'Overview', icon: Sparkles },
  { id: 'voice', label: 'Voice Clone', icon: Mic },
  { id: 'strategy', label: 'Strategy', icon: Target },
  { id: 'negotiation', label: 'Live Demo', icon: MessageSquare },
  { id: 'architecture', label: 'Tech Stack', icon: Cpu },
  { id: 'launch', label: 'Launch', icon: Building2 },
  { id: 'moat', label: 'Protection', icon: Shield },
];

export const Sidebar = ({ activeSection, onNavigate }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-[#0d0d12] border-r border-white/5 transition-all duration-300 z-50 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="ml-3 font-semibold text-white text-sm">Sovereign</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-cyan-400' : 'group-hover:text-white'}`} />
              {!collapsed && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute bottom-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
};
