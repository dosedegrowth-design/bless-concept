"use client";

import { useState, useEffect } from "react";
import { Upload, Check, Image as ImageIcon, Film, Loader2, RefreshCw } from "lucide-react";
import { supabase, BUCKET } from "@/lib/supabase";

interface ImageSlot {
  id: string;
  label: string;
  category: string;
  path: string;
  description: string;
  size: string;
  type: "image" | "video";
}

const SLOTS: ImageSlot[] = [
  { id: "hero-bg", label: "Hero — Imagem Principal", category: "Hero", path: "images/hero/hero-bg.webp", description: "Fundo da primeira tela do site.", size: "1920x1080", type: "image" },
  { id: "hero-video", label: "Hero — Vídeo (opcional)", category: "Hero", path: "images/hero/hero-video.mp4", description: "Vídeo curto do salão (10-30s).", size: "1920x1080 máx 10MB", type: "video" },
  { id: "sobre", label: "Sobre — Foto Principal", category: "Sobre Nós", path: "images/about/sobre-interior.webp", description: "Interior do salão ou equipe.", size: "800x1100", type: "image" },
  { id: "srv-cabelos", label: "Cabelos — Capa", category: "Serviços — Capas", path: "images/services/cabelos.webp", description: "Corte, coloração, mechas.", size: "800x600", type: "image" },
  { id: "srv-depilacao", label: "Depilação — Capa", category: "Serviços — Capas", path: "images/services/depilacao.webp", description: "Sala de depilação.", size: "800x600", type: "image" },
  { id: "srv-ec", label: "Estética Corporal — Capa", category: "Serviços — Capas", path: "images/services/estetica-corporal.webp", description: "Tratamento corporal.", size: "800x600", type: "image" },
  { id: "srv-ef", label: "Estética Facial — Capa", category: "Serviços — Capas", path: "images/services/estetica-facial.webp", description: "Tratamento facial.", size: "800x600", type: "image" },
  { id: "srv-manicure", label: "Manicure — Capa", category: "Serviços — Capas", path: "images/services/manicure.webp", description: "Esmaltação, nail art.", size: "800x600", type: "image" },
  { id: "srv-maquiagem", label: "Maquiagem — Capa", category: "Serviços — Capas", path: "images/services/maquiagem.webp", description: "Make social ou noiva.", size: "800x600", type: "image" },
  { id: "srv-massagem", label: "Massagem — Capa", category: "Serviços — Capas", path: "images/services/massagem.webp", description: "Pedras quentes, óleos.", size: "800x600", type: "image" },
  { id: "srv-noivas", label: "Noivas — Capa", category: "Serviços — Capas", path: "images/services/noivas.webp", description: "Noiva sendo produzida.", size: "800x600", type: "image" },
  // Galerias internas de cada serviço
  { id: "srv-cabelos-01", label: "Cabelos — Foto 1", category: "Serviços — Galeria", path: "images/services/cabelos-01.webp", description: "Galeria cabelos.", size: "800x600", type: "image" },
  { id: "srv-cabelos-02", label: "Cabelos — Foto 2", category: "Serviços — Galeria", path: "images/services/cabelos-02.webp", description: "Galeria cabelos.", size: "800x600", type: "image" },
  { id: "srv-cabelos-03", label: "Cabelos — Foto 3", category: "Serviços — Galeria", path: "images/services/cabelos-03.webp", description: "Galeria cabelos.", size: "800x600", type: "image" },
  { id: "srv-depilacao-01", label: "Depilação — Foto 1", category: "Serviços — Galeria", path: "images/services/depilacao-01.webp", description: "Galeria depilação.", size: "800x600", type: "image" },
  { id: "srv-depilacao-02", label: "Depilação — Foto 2", category: "Serviços — Galeria", path: "images/services/depilacao-02.webp", description: "Galeria depilação.", size: "800x600", type: "image" },
  { id: "srv-ec-01", label: "Est. Corporal — Foto 1", category: "Serviços — Galeria", path: "images/services/estetica-corporal-01.webp", description: "Galeria estética corporal.", size: "800x600", type: "image" },
  { id: "srv-ec-02", label: "Est. Corporal — Foto 2", category: "Serviços — Galeria", path: "images/services/estetica-corporal-02.webp", description: "Galeria estética corporal.", size: "800x600", type: "image" },
  { id: "srv-ef-01", label: "Est. Facial — Foto 1", category: "Serviços — Galeria", path: "images/services/estetica-facial-01.webp", description: "Galeria estética facial.", size: "800x600", type: "image" },
  { id: "srv-ef-02", label: "Est. Facial — Foto 2", category: "Serviços — Galeria", path: "images/services/estetica-facial-02.webp", description: "Galeria estética facial.", size: "800x600", type: "image" },
  { id: "srv-ef-03", label: "Est. Facial — Foto 3", category: "Serviços — Galeria", path: "images/services/estetica-facial-03.webp", description: "Galeria estética facial.", size: "800x600", type: "image" },
  { id: "srv-manicure-01", label: "Manicure — Foto 1", category: "Serviços — Galeria", path: "images/services/manicure-01.webp", description: "Galeria manicure.", size: "800x600", type: "image" },
  { id: "srv-manicure-02", label: "Manicure — Foto 2", category: "Serviços — Galeria", path: "images/services/manicure-02.webp", description: "Galeria manicure.", size: "800x600", type: "image" },
  { id: "srv-maquiagem-01", label: "Maquiagem — Foto 1", category: "Serviços — Galeria", path: "images/services/maquiagem-01.webp", description: "Galeria maquiagem.", size: "800x600", type: "image" },
  { id: "srv-maquiagem-02", label: "Maquiagem — Foto 2", category: "Serviços — Galeria", path: "images/services/maquiagem-02.webp", description: "Galeria maquiagem.", size: "800x600", type: "image" },
  { id: "srv-massagem-01", label: "Massagem — Foto 1", category: "Serviços — Galeria", path: "images/services/massagem-01.webp", description: "Galeria massagem.", size: "800x600", type: "image" },
  { id: "srv-massagem-02", label: "Massagem — Foto 2", category: "Serviços — Galeria", path: "images/services/massagem-02.webp", description: "Galeria massagem.", size: "800x600", type: "image" },
  { id: "srv-noivas-01", label: "Noivas — Foto 1", category: "Serviços — Galeria", path: "images/services/noivas-01.webp", description: "Galeria noivas.", size: "800x600", type: "image" },
  { id: "srv-noivas-02", label: "Noivas — Foto 2", category: "Serviços — Galeria", path: "images/services/noivas-02.webp", description: "Galeria noivas.", size: "800x600", type: "image" },
  { id: "srv-noivas-03", label: "Noivas — Foto 3", category: "Serviços — Galeria", path: "images/services/noivas-03.webp", description: "Galeria noivas.", size: "800x600", type: "image" },
  { id: "espaco-01", label: "Recepção (grande)", category: "Galeria Espaço", path: "images/gallery/espaco-01.webp", description: "Entrada do salão.", size: "1200x900", type: "image" },
  { id: "espaco-02", label: "Sala de Corte", category: "Galeria Espaço", path: "images/gallery/espaco-02.webp", description: "Espelhos.", size: "600x600", type: "image" },
  { id: "espaco-03", label: "Detalhes", category: "Galeria Espaço", path: "images/gallery/espaco-03.webp", description: "Decoração.", size: "600x600", type: "image" },
  { id: "espaco-04", label: "Estética", category: "Galeria Espaço", path: "images/gallery/espaco-04.webp", description: "Área de estética.", size: "600x600", type: "image" },
  { id: "espaco-05", label: "Ambiente", category: "Galeria Espaço", path: "images/gallery/espaco-05.webp", description: "Flores, objetos.", size: "600x600", type: "image" },
  { id: "espaco-06", label: "Produtos", category: "Galeria Espaço", path: "images/gallery/espaco-06.webp", description: "Prateleira premium.", size: "1200x600", type: "image" },
  { id: "espaco-07", label: "Bancada", category: "Galeria Espaço", path: "images/gallery/espaco-07.webp", description: "Cadeira.", size: "600x600", type: "image" },
  { id: "espaco-08", label: "Massagem", category: "Galeria Espaço", path: "images/gallery/espaco-08.webp", description: "Sala de massagem.", size: "600x600", type: "image" },
  { id: "team-01", label: "Profissional 1", category: "Equipe", path: "images/team/membro-01.webp", description: "Foto busto.", size: "600x600", type: "image" },
  { id: "team-02", label: "Profissional 2", category: "Equipe", path: "images/team/membro-02.webp", description: "Foto busto.", size: "600x600", type: "image" },
  { id: "team-03", label: "Profissional 3", category: "Equipe", path: "images/team/membro-03.webp", description: "Foto busto.", size: "600x600", type: "image" },
  { id: "team-04", label: "Profissional 4", category: "Equipe", path: "images/team/membro-04.webp", description: "Foto busto.", size: "600x600", type: "image" },
  { id: "team-05", label: "Profissional 5", category: "Equipe", path: "images/team/membro-05.webp", description: "Foto busto.", size: "600x600", type: "image" },
  { id: "cta-bg", label: "CTA — Fundo", category: "CTA Final", path: "images/cta/cta-bg.webp", description: "'Pronta para se transformar?'", size: "1920x800", type: "image" },
  { id: "noivas-hero", label: "Hero (tela cheia)", category: "Página Noivas", path: "images/noivas/noivas-hero.webp", description: "Topo página noivas.", size: "1920x1080", type: "image" },
  { id: "noivas-kate", label: "Exp. Kate Middleton", category: "Página Noivas", path: "images/noivas/experiencia-kate.webp", description: "Elegância clássica.", size: "800x1000", type: "image" },
  { id: "noivas-diana", label: "Exp. Lady Diana", category: "Página Noivas", path: "images/noivas/experiencia-diana.webp", description: "Delicadeza, emoção.", size: "800x1000", type: "image" },
  { id: "noivas-elizabeth", label: "Exp. Rainha Elizabeth", category: "Página Noivas", path: "images/noivas/experiencia-elizabeth.webp", description: "Luxo, exclusividade.", size: "800x1000", type: "image" },
  { id: "noivas-g-01", label: "Galeria 1", category: "Página Noivas", path: "images/noivas/galeria-01.webp", description: "Preparação.", size: "600x800", type: "image" },
  { id: "noivas-g-02", label: "Galeria 2", category: "Página Noivas", path: "images/noivas/galeria-02.webp", description: "Detalhes.", size: "600x800", type: "image" },
  { id: "noivas-g-03", label: "Galeria 3", category: "Página Noivas", path: "images/noivas/galeria-03.webp", description: "Emocional.", size: "600x800", type: "image" },
  { id: "noivas-g-04", label: "Galeria 4", category: "Página Noivas", path: "images/noivas/galeria-04.webp", description: "Produção.", size: "600x800", type: "image" },
  { id: "noivas-g-05", label: "Galeria 5", category: "Página Noivas", path: "images/noivas/galeria-05.webp", description: "Final.", size: "600x800", type: "image" },
  { id: "noivas-g-06", label: "Galeria 6", category: "Página Noivas", path: "images/noivas/galeria-06.webp", description: "Vestido.", size: "600x800", type: "image" },
  { id: "noivas-cta", label: "CTA Final", category: "Página Noivas", path: "images/noivas/noivas-cta.webp", description: "Fundo seção final.", size: "1920x800", type: "image" },
  { id: "logo", label: "Logo PNG", category: "Logo", path: "images/logo/logo.png", description: "Fundo transparente.", size: "1000x1000 mín", type: "image" },
];

const UPLOAD_FN_URL = "https://hkjukobqpjezhpxzplpj.supabase.co/functions/v1/bless-upload";

// Upload via Edge Function (detecta HEIC por magic bytes no servidor)
async function uploadToSupabase(file: File, path: string): Promise<{ url: string | null; errorMsg?: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("path", path);

  try {
    const res = await fetch(UPLOAD_FN_URL, { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
      if (data.error === "HEIC_NOT_SUPPORTED") {
        return { url: null, errorMsg: data.message };
      }
      return { url: null, errorMsg: data.error || "Erro no upload" };
    }

    return { url: data.url };
  } catch (err) {
    console.error("Upload error:", err);
    return { url: null, errorMsg: "Erro de conexão" };
  }
}

function Slot({ slot, existingUrl }: { slot: ImageSlot; existingUrl: string | null }) {
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(existingUrl);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sync when parent finishes loading existing URLs
  useEffect(() => {
    if (existingUrl) setUrl(existingUrl);
  }, [existingUrl]);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(false);
    setErrorMsg("");

    const result = await uploadToSupabase(file, slot.path);

    if (result.url) {
      setUrl(result.url + "?t=" + Date.now());
      setError(false);
    } else {
      setError(true);
      setErrorMsg(result.errorMsg || "Falhou — clique para tentar de novo");
    }

    setUploading(false);
    e.target.value = "";
  }

  const saved = !!url && !error;

  return (
    <div className={`border rounded-xl p-3 transition-colors ${saved ? "border-green-600/40 bg-green-600/[0.03]" : error ? "border-red-500/40 bg-red-500/[0.03]" : "border-white/10 hover:border-white/20"}`}>
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-display text-sm font-medium text-white leading-tight">{slot.label}</h3>
        {saved ? <Check size={14} className="text-green-500 shrink-0" />
        : uploading ? <Loader2 size={14} className="text-gold animate-spin shrink-0" />
        : slot.type === "video" ? <Film size={14} className="text-text-muted shrink-0" />
        : <ImageIcon size={14} className="text-text-muted shrink-0" />}
      </div>
      <div className="flex items-center gap-1.5 mb-2">
        <span className="font-body text-[10px] bg-charcoal px-1.5 py-0.5 rounded text-text-muted">{slot.size}</span>
        <span className="font-body text-[10px] bg-gold/10 px-1.5 py-0.5 rounded text-gold font-medium">{slot.path.split("/").pop()}</span>
      </div>

      <label className={`relative block border border-dashed rounded-lg text-center cursor-pointer transition-colors ${error ? "border-red-500/30" : "border-white/10 hover:border-white/20"}`}>
        <input
          type="file"
          accept={slot.type === "video" ? "video/*" : "image/*"}
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
          disabled={uploading}
        />
        {uploading ? (
          <div className="py-6 flex flex-col items-center gap-2">
            <Loader2 size={24} className="text-gold animate-spin" />
            <p className="font-body text-[11px] text-gold">Enviando...</p>
          </div>
        ) : saved && url ? (
          slot.type === "video" ? (
            <div className="relative">
              <video src={url} className="w-full h-24 object-cover rounded" muted playsInline />
              <div className="absolute inset-0 flex items-center justify-center">
                <Film size={20} className="text-white/80 drop-shadow" />
              </div>
              <div className="absolute bottom-1 left-1">
                <span className="font-body text-[9px] bg-black/60 text-green-400 px-1.5 py-0.5 rounded">Vídeo salvo</span>
              </div>
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={url} alt="" className="w-full h-24 object-cover rounded" />
          )
        ) : (
          <div className="py-5">
            <Upload size={18} className={`mx-auto mb-1 ${error ? "text-red-400" : "text-text-muted"}`} />
            <p className={`font-body text-[11px] ${error ? "text-red-400" : "text-text-muted"}`}>
              {error ? errorMsg || "Falhou — clique para tentar de novo" : "Arraste ou clique"}
            </p>
            {!error && <p className="font-body text-[9px] text-text-muted/50 mt-0.5">JPG, PNG ou WebP</p>}
          </div>
        )}
      </label>
    </div>
  );
}

export default function AdminPage() {
  const categories = [...new Set(SLOTS.map((s) => s.category))];
  const [existingUrls, setExistingUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExisting() {
      const urls: Record<string, string> = {};
      const dirCache: Record<string, string[]> = {};
      const ts = Date.now();

      // Get unique directories
      const dirs = [...new Set(SLOTS.map((s) => s.path.split("/").slice(0, -1).join("/")))];

      // List each directory once
      await Promise.all(
        dirs.map(async (dir) => {
          const { data } = await supabase.storage.from(BUCKET).list(dir, { limit: 100 });
          dirCache[dir] = data?.map((f) => f.name) || [];
        })
      );

      // Check which slots have files
      for (const slot of SLOTS) {
        const dir = slot.path.split("/").slice(0, -1).join("/");
        const fileName = slot.path.split("/").pop()!;

        if (dirCache[dir]?.includes(fileName)) {
          const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(slot.path);
          urls[slot.id] = urlData.publicUrl + "?t=" + ts;
        }
      }

      setExistingUrls(urls);
      setLoading(false);
    }

    loadExisting();
  }, []);

  const savedCount = Object.keys(existingUrls).length;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="sticky top-0 z-50 border-b border-white/5 bg-charcoal/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-medium">Painel de Imagens</h1>
            <p className="font-body text-xs text-text-light mt-0.5">
              {loading ? "Carregando..." : `${savedCount} de ${SLOTS.length} publicadas`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.location.reload()} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full font-body text-xs text-text-muted hover:text-white transition-colors">
              <RefreshCw size={14} /> Atualizar
            </button>
            <a href="/" className="font-body text-xs text-gold hover:text-gold-light transition-colors">← Voltar ao site</a>
          </div>
        </div>
        <div className="h-0.5 bg-white/5">
          <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${(savedCount / SLOTS.length) * 100}%` }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-charcoal border border-gold/20 rounded-xl p-5 mb-8">
          <h2 className="font-display text-base font-medium text-gold mb-2">Como usar</h2>
          <ol className="font-body text-sm text-text-light space-y-1 list-decimal list-inside">
            <li>Clique no slot e selecione a imagem do seu computador</li>
            <li>A imagem é enviada <strong className="text-green-400">direto para o servidor</strong> — sem limite de tamanho</li>
            <li>O ícone <Check size={12} className="inline text-green-500" /> verde confirma que está salva</li>
            <li>Para trocar, é só clicar de novo e selecionar outra imagem</li>
          </ol>
        </div>

        {categories.map((category) => {
          const slots = SLOTS.filter((s) => s.category === category);
          const filled = slots.filter((s) => existingUrls[s.id]).length;
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
                  <Slot key={slot.id} slot={slot} existingUrl={existingUrls[slot.id] || null} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
