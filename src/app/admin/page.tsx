"use client";

import { useState, useCallback, useEffect } from "react";
import { Upload, Check, Image as ImageIcon, Film, Loader2, X, RefreshCw } from "lucide-react";

interface ImageSlot {
  id: string;
  label: string;
  category: string;
  path: string;
  description: string;
  size: string;
  ratio: string;
  type: "image" | "video";
}

const IMAGE_SLOTS: ImageSlot[] = [
  // HERO
  { id: "hero-bg", label: "Hero — Imagem Principal", category: "Hero", path: "public/images/hero/hero-bg.webp", description: "Fundo da primeira tela. Interior do salão.", size: "1920 x 1080 px", ratio: "16:9", type: "image" },
  { id: "hero-video", label: "Hero — Vídeo (opcional)", category: "Hero", path: "public/images/hero/hero-video.mp4", description: "Vídeo curto do salão (10-30s, loop).", size: "1920x1080 — máx 10MB", ratio: "16:9", type: "video" },
  // SOBRE
  { id: "sobre-interior", label: "Sobre — Foto Principal", category: "Sobre Nós", path: "public/images/about/sobre-interior.webp", description: "Interior do salão ou equipe.", size: "800 x 1100 px", ratio: "3:4", type: "image" },
  // SERVIÇOS CAPAS
  { id: "srv-cabelos", label: "Cabelos — Capa", category: "Serviços — Capas", path: "public/images/services/cabelos.webp", description: "Corte, coloração, mechas.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-depilacao", label: "Depilação — Capa", category: "Serviços — Capas", path: "public/images/services/depilacao.webp", description: "Sala de depilação.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-estetica-corporal", label: "Estética Corporal — Capa", category: "Serviços — Capas", path: "public/images/services/estetica-corporal.webp", description: "Tratamento corporal.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-estetica-facial", label: "Estética Facial — Capa", category: "Serviços — Capas", path: "public/images/services/estetica-facial.webp", description: "Tratamento facial.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-manicure", label: "Manicure e Pedicure — Capa", category: "Serviços — Capas", path: "public/images/services/manicure.webp", description: "Esmaltação, nail art.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-maquiagem", label: "Maquiagem — Capa", category: "Serviços — Capas", path: "public/images/services/maquiagem.webp", description: "Make social ou noiva.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-massagem", label: "Massagem — Capa", category: "Serviços — Capas", path: "public/images/services/massagem.webp", description: "Pedras quentes, óleos.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-noivas", label: "Noivas — Capa", category: "Serviços — Capas", path: "public/images/services/noivas.webp", description: "Noiva sendo produzida.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  // SERVIÇOS GALERIA
  { id: "srv-cabelos-01", label: "Cabelos — Gal. 1", category: "Serviços — Galeria", path: "public/images/services/cabelos-01.webp", description: "Resultado 1", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-cabelos-02", label: "Cabelos — Gal. 2", category: "Serviços — Galeria", path: "public/images/services/cabelos-02.webp", description: "Resultado 2", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-cabelos-03", label: "Cabelos — Gal. 3", category: "Serviços — Galeria", path: "public/images/services/cabelos-03.webp", description: "Mechas/balayage", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-depilacao-01", label: "Depilação — Gal. 1", category: "Serviços — Galeria", path: "public/images/services/depilacao-01.webp", description: "Atendimento", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-depilacao-02", label: "Depilação — Gal. 2", category: "Serviços — Galeria", path: "public/images/services/depilacao-02.webp", description: "Ambiente", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-ec-01", label: "Est. Corporal — Gal. 1", category: "Serviços — Galeria", path: "public/images/services/estetica-corporal-01.webp", description: "Tratamento", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-ec-02", label: "Est. Corporal — Gal. 2", category: "Serviços — Galeria", path: "public/images/services/estetica-corporal-02.webp", description: "Resultado", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-ef-01", label: "Est. Facial — Gal. 1", category: "Serviços — Galeria", path: "public/images/services/estetica-facial-01.webp", description: "Limpeza", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-ef-02", label: "Est. Facial — Gal. 2", category: "Serviços — Galeria", path: "public/images/services/estetica-facial-02.webp", description: "Produto", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-ef-03", label: "Est. Facial — Gal. 3", category: "Serviços — Galeria", path: "public/images/services/estetica-facial-03.webp", description: "Resultado", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-manicure-01", label: "Manicure — Gal. 1", category: "Serviços — Galeria", path: "public/images/services/manicure-01.webp", description: "Nail art 1", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-manicure-02", label: "Manicure — Gal. 2", category: "Serviços — Galeria", path: "public/images/services/manicure-02.webp", description: "Nail art 2", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-maquiagem-01", label: "Maquiagem — Gal. 1", category: "Serviços — Galeria", path: "public/images/services/maquiagem-01.webp", description: "Social", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-maquiagem-02", label: "Maquiagem — Gal. 2", category: "Serviços — Galeria", path: "public/images/services/maquiagem-02.webp", description: "Noiva", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-massagem-01", label: "Massagem — Gal. 1", category: "Serviços — Galeria", path: "public/images/services/massagem-01.webp", description: "Relaxante", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-massagem-02", label: "Massagem — Gal. 2", category: "Serviços — Galeria", path: "public/images/services/massagem-02.webp", description: "Ambiente", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-noivas-01", label: "Noivas — Gal. 1", category: "Serviços — Galeria", path: "public/images/services/noivas-01.webp", description: "Preparação", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-noivas-02", label: "Noivas — Gal. 2", category: "Serviços — Galeria", path: "public/images/services/noivas-02.webp", description: "Resultado", size: "800x600", ratio: "4:3", type: "image" },
  { id: "srv-noivas-03", label: "Noivas — Gal. 3", category: "Serviços — Galeria", path: "public/images/services/noivas-03.webp", description: "Espaço", size: "800x600", ratio: "4:3", type: "image" },
  // GALERIA ESPAÇO
  { id: "espaco-01", label: "Recepção (grande)", category: "Galeria Espaço", path: "public/images/gallery/espaco-01.webp", description: "Entrada do salão", size: "1200x900", ratio: "4:3", type: "image" },
  { id: "espaco-02", label: "Sala de Corte", category: "Galeria Espaço", path: "public/images/gallery/espaco-02.webp", description: "Espelhos", size: "600x600", ratio: "1:1", type: "image" },
  { id: "espaco-03", label: "Detalhes", category: "Galeria Espaço", path: "public/images/gallery/espaco-03.webp", description: "Decoração", size: "600x600", ratio: "1:1", type: "image" },
  { id: "espaco-04", label: "Estética", category: "Galeria Espaço", path: "public/images/gallery/espaco-04.webp", description: "Área de estética", size: "600x600", ratio: "1:1", type: "image" },
  { id: "espaco-05", label: "Ambiente", category: "Galeria Espaço", path: "public/images/gallery/espaco-05.webp", description: "Flores, objetos", size: "600x600", ratio: "1:1", type: "image" },
  { id: "espaco-06", label: "Produtos", category: "Galeria Espaço", path: "public/images/gallery/espaco-06.webp", description: "Prateleira premium", size: "1200x600", ratio: "2:1", type: "image" },
  { id: "espaco-07", label: "Bancada", category: "Galeria Espaço", path: "public/images/gallery/espaco-07.webp", description: "Cadeira", size: "600x600", ratio: "1:1", type: "image" },
  { id: "espaco-08", label: "Massagem", category: "Galeria Espaço", path: "public/images/gallery/espaco-08.webp", description: "Sala de massagem", size: "600x600", ratio: "1:1", type: "image" },
  // EQUIPE
  { id: "team-01", label: "Profissional 1", category: "Equipe", path: "public/images/team/membro-01.webp", description: "Foto busto, fundo neutro", size: "600x600", ratio: "1:1", type: "image" },
  { id: "team-02", label: "Profissional 2", category: "Equipe", path: "public/images/team/membro-02.webp", description: "Foto busto, fundo neutro", size: "600x600", ratio: "1:1", type: "image" },
  { id: "team-03", label: "Profissional 3", category: "Equipe", path: "public/images/team/membro-03.webp", description: "Foto busto, fundo neutro", size: "600x600", ratio: "1:1", type: "image" },
  { id: "team-04", label: "Profissional 4", category: "Equipe", path: "public/images/team/membro-04.webp", description: "Foto busto, fundo neutro", size: "600x600", ratio: "1:1", type: "image" },
  { id: "team-05", label: "Profissional 5", category: "Equipe", path: "public/images/team/membro-05.webp", description: "Foto busto, fundo neutro", size: "600x600", ratio: "1:1", type: "image" },
  // CTA
  { id: "cta-bg", label: "CTA — Fundo", category: "CTA Final", path: "public/images/cta/cta-bg.webp", description: "'Pronta para se transformar?'", size: "1920x800", ratio: "~2.4:1", type: "image" },
  // NOIVAS
  { id: "noivas-hero", label: "Hero (tela cheia)", category: "Página Noivas", path: "public/images/noivas/noivas-hero.webp", description: "Topo da página noivas.", size: "1920x1080", ratio: "16:9", type: "image" },
  { id: "noivas-kate", label: "Exp. Kate Middleton", category: "Página Noivas", path: "public/images/noivas/experiencia-kate.webp", description: "Elegância clássica.", size: "800x1000", ratio: "4:5", type: "image" },
  { id: "noivas-diana", label: "Exp. Lady Diana", category: "Página Noivas", path: "public/images/noivas/experiencia-diana.webp", description: "Delicadeza, emoção.", size: "800x1000", ratio: "4:5", type: "image" },
  { id: "noivas-elizabeth", label: "Exp. Rainha Elizabeth", category: "Página Noivas", path: "public/images/noivas/experiencia-elizabeth.webp", description: "Luxo, exclusividade.", size: "800x1000", ratio: "4:5", type: "image" },
  { id: "noivas-g-01", label: "Galeria 1", category: "Página Noivas", path: "public/images/noivas/galeria-01.webp", description: "Preparação", size: "600x800", ratio: "3:4", type: "image" },
  { id: "noivas-g-02", label: "Galeria 2", category: "Página Noivas", path: "public/images/noivas/galeria-02.webp", description: "Detalhes", size: "600x800", ratio: "3:4", type: "image" },
  { id: "noivas-g-03", label: "Galeria 3", category: "Página Noivas", path: "public/images/noivas/galeria-03.webp", description: "Emocional", size: "600x800", ratio: "3:4", type: "image" },
  { id: "noivas-g-04", label: "Galeria 4", category: "Página Noivas", path: "public/images/noivas/galeria-04.webp", description: "Produção", size: "600x800", ratio: "3:4", type: "image" },
  { id: "noivas-g-05", label: "Galeria 5", category: "Página Noivas", path: "public/images/noivas/galeria-05.webp", description: "Final", size: "600x800", ratio: "3:4", type: "image" },
  { id: "noivas-g-06", label: "Galeria 6", category: "Página Noivas", path: "public/images/noivas/galeria-06.webp", description: "Vestido", size: "600x800", ratio: "3:4", type: "image" },
  { id: "noivas-cta", label: "CTA Final", category: "Página Noivas", path: "public/images/noivas/noivas-cta.webp", description: "Fundo seção final noivas.", size: "1920x800", ratio: "~2.4:1", type: "image" },
  // LOGO
  { id: "logo", label: "Logo PNG", category: "Logo", path: "public/images/logo/logo.png", description: "Fundo transparente.", size: "1000x1000 mín", ratio: "Livre", type: "image" },
];

type SlotStatus = "empty" | "uploading" | "saved" | "error";

function UploadSlot({
  slot,
  savedUrl,
  onUpload,
}: {
  slot: ImageSlot;
  savedUrl: string | null;
  onUpload: (id: string) => void;
}) {
  const [status, setStatus] = useState<SlotStatus>(savedUrl ? "saved" : "empty");
  const [preview, setPreview] = useState<string | null>(savedUrl);

  useEffect(() => {
    if (savedUrl) {
      setStatus("saved");
      setPreview(savedUrl);
    }
  }, [savedUrl]);

  const handleFile = useCallback(
    async (file: File) => {
      setStatus("uploading");
      const localPreview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
      if (localPreview) setPreview(localPreview);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("path", slot.path);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (!res.ok || !data.success) {
          console.error("Upload error:", data);
          setStatus("error");
          return;
        }

        setPreview(data.url + "?t=" + Date.now());
        setStatus("saved");
        onUpload(slot.id);
      } catch (err) {
        console.error("Upload exception:", err);
        setStatus("error");
      }
    },
    [slot.path, slot.id, onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) {
        setStatus("empty"); // Reset error state
        handleFile(f);
      }
    },
    [handleFile]
  );

  const borderColor =
    status === "saved" ? "border-green-600/40 bg-green-600/[0.03]"
    : status === "uploading" ? "border-gold/40 bg-gold/[0.03]"
    : status === "error" ? "border-red-500/40 bg-red-500/[0.03]"
    : "border-white/10 hover:border-white/20";

  return (
    <div className={`border rounded-xl p-3 transition-colors ${borderColor}`}>
      <div className="flex items-start justify-between mb-1.5">
        <h3 className="font-display text-sm font-medium text-white leading-tight">{slot.label}</h3>
        {status === "saved" ? <Check size={14} className="text-green-500 shrink-0" />
        : status === "uploading" ? <Loader2 size={14} className="text-gold animate-spin shrink-0" />
        : slot.type === "video" ? <Film size={14} className="text-text-muted shrink-0" />
        : <ImageIcon size={14} className="text-text-muted shrink-0" />}
      </div>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="font-body text-[10px] bg-charcoal px-1.5 py-0.5 rounded text-text-muted">{slot.size}</span>
        <span className="font-body text-[10px] bg-gold/10 px-1.5 py-0.5 rounded text-gold font-medium">{slot.path.split("/").pop()}</span>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="relative border border-dashed border-white/10 rounded-lg text-center cursor-pointer hover:border-white/20 transition-colors"
      >
        <input type="file" accept={slot.type === "video" ? "video/*" : "image/*"} onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
        {preview && status === "saved" ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={preview} alt="" className="w-full h-24 object-cover rounded" />
        ) : status === "error" ? (
          <div className="py-4">
            <Upload size={18} className="text-red-400 mx-auto mb-1" />
            <p className="font-body text-[11px] text-red-400">Falhou — clique para tentar de novo</p>
          </div>
        ) : status === "uploading" && preview ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={preview} alt="" className="w-full h-24 object-cover rounded opacity-50" />
        ) : (
          <div className="py-4">
            <Upload size={18} className="text-text-muted mx-auto mb-1" />
            <p className="font-body text-[11px] text-text-muted">Arraste ou clique</p>
          </div>
        )}
        {status === "uploading" && (
          <div className="absolute inset-0 bg-black/60 rounded flex items-center justify-center">
            <Loader2 size={24} className="text-gold animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const categories = [...new Set(IMAGE_SLOTS.map((s) => s.category))];
  const totalSlots = IMAGE_SLOTS.length;
  const [savedCount, setSavedCount] = useState(0);
  const [blobUrls, setBlobUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Load existing images from Blob on mount
  useEffect(() => {
    fetch("/api/images")
      .then((r) => r.json())
      .then((data: Record<string, string>) => {
        setBlobUrls(data);
        setSavedCount(Object.keys(data).length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = useCallback((id: string) => {
    setSavedCount((c) => c + 1);
    // Refresh blob urls
    fetch("/api/images").then(r => r.json()).then(setBlobUrls).catch(() => {});
  }, []);

  const getSavedUrl = useCallback(
    (slot: ImageSlot): string | null => {
      const key = slot.path.replace("public/", "");
      return blobUrls[key] || null;
    },
    [blobUrls]
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header fixo */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-charcoal/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-medium">Painel de Imagens</h1>
            <p className="font-body text-xs text-text-light mt-0.5">
              {loading ? "Carregando..." : `${savedCount} de ${totalSlots} publicadas`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-body text-xs text-text-muted hover:text-white transition-colors"
            >
              <RefreshCw size={14} /> Atualizar
            </button>
            <a href="/" className="font-body text-xs text-gold hover:text-gold-light transition-colors">
              ← Voltar ao site
            </a>
          </div>
        </div>
        <div className="h-0.5 bg-white/5">
          <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${(savedCount / totalSlots) * 100}%` }} />
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-charcoal border border-gold/20 rounded-xl p-5 mb-8">
          <h2 className="font-display text-base font-medium text-gold mb-2">Como usar</h2>
          <ol className="font-body text-sm text-text-light space-y-1 list-decimal list-inside">
            <li>Arraste a imagem no slot correspondente</li>
            <li>A imagem é <strong className="text-green-400">salva automaticamente</strong> — sem precisar de botão</li>
            <li>O ícone <Check size={12} className="inline text-green-500" /> verde confirma que está publicada no site</li>
            <li>Pode trocar uma imagem a qualquer momento — é só arrastar a nova</li>
          </ol>
        </div>

        {/* Slots by category */}
        {categories.map((category) => {
          const slots = IMAGE_SLOTS.filter((s) => s.category === category);
          const filled = slots.filter((s) => getSavedUrl(s) !== null).length;
          return (
            <div key={category} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="font-display text-lg font-medium text-white">{category}</h2>
                <span className={`font-body text-xs px-3 py-1 rounded-full ${filled === slots.length && filled > 0 ? "bg-green-600/20 text-green-400" : "bg-white/5 text-text-muted"}`}>
                  {filled}/{slots.length}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {slots.map((slot) => (
                  <UploadSlot key={slot.id} slot={slot} savedUrl={getSavedUrl(slot)} onUpload={handleUpload} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
