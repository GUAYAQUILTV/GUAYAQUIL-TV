import React, { useState } from 'react';
import { X, Send, CheckCircle, MapPin, Phone, Mail, FileText, ShieldCheck, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'Denuncia Ciudadana & Reporte Comunitario',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 font-mono">
      
      <div className="bg-[#080d1a] max-w-xl w-full shadow-[0_0_50px_rgba(0,240,255,0.3)] overflow-hidden border-2 border-[#00f0ff] animate-in zoom-in-95 duration-200 relative">
        
        {/* Header */}
        <div className="p-5 bg-black text-white flex items-center justify-between border-b border-cyan-500/40">
          <div>
            <span className="px-2.5 py-0.5 bg-[#080d1a] border border-cyan-500/40 text-[#00f0ff] text-[10px] font-bold uppercase tracking-widest">
              CORRESPONDENCIA & REDACCIÓN
            </span>
            <h3 className="text-xl font-cyber font-black text-white mt-1">
              GYE <span className="text-[#00f0ff] neon-text-cyan">TV</span><span className="text-[#ff6600] neon-text-orange">+</span> | MESA EDITORIAL
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-[#ff6600] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 bg-[#050811]">
          {isSent ? (
            <div className="text-center py-6">
              <CheckCircle className="w-12 h-12 text-[#00f0ff] mx-auto mb-3 drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]" />
              <h4 className="text-lg font-headline font-bold text-white">Despacho Recibido en Redacción</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-sm mx-auto font-sans leading-relaxed">
                Estimado(a) <strong className="text-[#00f0ff]">{formData.name}</strong>, su comunicación ha sido ingresada al registro de correspondencia editorial bajo estricto principio de reserva de fuente.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  onClose();
                }}
                className="mt-6 px-6 py-2.5 bg-[#00f0ff] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                Cerrar Notificación
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 text-xs">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Juan Carlos Pérez"
                    className="w-full px-3 py-2.5 bg-black border border-cyan-500/30 focus:outline-none focus:border-[#00f0ff] text-white text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 text-xs">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2.5 bg-black border border-cyan-500/30 focus:outline-none focus:border-[#00f0ff] text-white text-xs font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 text-xs">
                    Teléfono / Celular
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+593 9..."
                    className="w-full px-3 py-2.5 bg-black border border-cyan-500/30 focus:outline-none focus:border-[#00f0ff] text-white text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1 text-xs">
                    Asunto Editorial
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black border border-cyan-500/30 focus:outline-none focus:border-[#00f0ff] text-white text-xs font-sans"
                  >
                    <option>Denuncia Ciudadana & Reporte Comunitario</option>
                    <option>Publicidad & Pauta Institucional</option>
                    <option>Entrevistas & Agenda Informativa</option>
                    <option>Consultas a la Dirección General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 text-xs">
                  Detalle del Reporte o Mensaje *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Especifique lugar en Guayaquil, hechos y antecedentes comprobables..."
                  className="w-full px-3 py-2.5 bg-black border border-cyan-500/30 focus:outline-none focus:border-[#00f0ff] text-white text-xs font-sans resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-cyan-500/20">
                <span className="text-[11px] text-slate-400 font-sans">
                  Confidencialidad amparada por la Ley de Comunicación.
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00f0ff] hover:bg-white text-black font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                >
                  <span>ENVIAR DESPACHO</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
