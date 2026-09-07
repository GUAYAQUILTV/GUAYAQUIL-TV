import React, { useState } from 'react';
import { Mail, CheckCircle, Send, ShieldCheck, Newspaper, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [preferences, setPreferences] = useState({
    guayaquil: true,
    deportes: true,
    urgentes: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
  };

  return (
    <section className="py-14 bg-black text-slate-100 border-b-2 border-cyan-500/20 relative overflow-hidden">
      
      {/* Background neon ambient lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Header Badge */}
        <div className="flex items-center justify-center gap-2 mb-2 font-mono">
          <Newspaper className="w-4 h-4 text-[#00f0ff]" />
          <span className="px-2.5 py-0.5 bg-[#080d1a] border border-cyan-500/40 text-[#00f0ff] text-[10px] font-bold tracking-widest uppercase">
            SERVICIO INFORMATIVO POR SUSCRIPCIÓN
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-cyber font-black text-white tracking-tight">
          EL BOLETÍN EDITORIAL DE GYE <span className="text-[#00f0ff] neon-text-cyan">TV</span><span className="text-[#ff6600] neon-text-orange">+</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2 font-sans leading-relaxed">
          Reciba a primera hora de la mañana el resumen con los hechos más relevantes de Guayaquil, análisis económico y alertas de última hora.
        </p>

        {isSubmitted ? (
          <div className="mt-6 p-6 bg-[#080d1a] border-2 border-[#00f0ff] max-w-md mx-auto animate-in zoom-in-95 duration-200 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
            <CheckCircle className="w-8 h-8 text-[#00f0ff] mx-auto mb-2" />
            <h3 className="text-sm font-headline font-bold text-white">Suscripción Registrada Exitosamente</h3>
            <p className="text-xs text-slate-300 mt-1 font-sans">
              Se ha incorporado la dirección <strong className="text-[#00f0ff]">{email}</strong> al padrón de distribución informativa matutina.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setEmail('');
              }}
              className="mt-4 text-xs text-[#ff6600] hover:text-white underline font-mono cursor-pointer"
            >
              Registrar otra suscripción
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto">
            {/* Input & Subscribe Button */}
            <div className="flex flex-col sm:flex-row gap-0 border-2 border-cyan-500/50 bg-[#080d1a] shadow-[0_0_20px_rgba(0,240,255,0.15)] focus-within:border-[#00f0ff]">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese su dirección de correo electrónico..."
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-white text-xs sm:text-sm focus:outline-none placeholder:text-slate-500 font-sans"
                />
              </div>

              <button
                type="submit"
                id="btn-newsletter-subscribe"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00f0ff] hover:bg-white text-black font-cyber font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 border-t sm:border-t-0 sm:border-l border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                <span>SUSCRIBIRME</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Topic Checkboxes */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-slate-300 font-mono">
              <label className="flex items-center gap-1.5 cursor-pointer hover:text-[#00f0ff]">
                <input
                  type="checkbox"
                  checked={preferences.guayaquil}
                  onChange={(e) => setPreferences({ ...preferences, guayaquil: e.target.checked })}
                  className="accent-[#00f0ff]"
                />
                <span>Actualidad Guayaquil</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-[#ff6600]">
                <input
                  type="checkbox"
                  checked={preferences.deportes}
                  onChange={(e) => setPreferences({ ...preferences, deportes: e.target.checked })}
                  className="accent-[#ff6600]"
                />
                <span>Suplemento Deportivo</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                <input
                  type="checkbox"
                  checked={preferences.urgentes}
                  onChange={(e) => setPreferences({ ...preferences, urgentes: e.target.checked })}
                  className="accent-white"
                />
                <span>Ediciones Extraordinarias</span>
              </label>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 flex items-center justify-center gap-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
              <span>Garantía de confidencialidad editorial. Cero publicidad invasiva.</span>
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
