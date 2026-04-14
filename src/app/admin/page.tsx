"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Check, Image as ImageIcon, Film, Download, Package, Loader2, X } from "lucide-react";
import Script from "next/script";

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
  { id: "hero-bg", label: "Hero — Imagem Principal", category: "Hero", path: "public/images/hero/hero-bg.webp", description: "Fundo da primeira tela do site. Foto do interior do salão com iluminação warm.", size: "1920 x 1080 px", ratio: "16:9 (paisagem)", type: "image" },
  { id: "hero-video", label: "Hero — Vídeo (opcional)", category: "Hero", path: "public/images/hero/hero-video.mp4", description: "Vídeo curto do salão (10-30s, loop). Se enviado, substitui a imagem.", size: "1920 x 1080 px — máx 10MB", ratio: "16:9 (paisagem)", type: "video" },
  // SOBRE
  { id: "sobre-interior", label: "Sobre — Foto Principal", category: "Sobre Nós", path: "public/images/about/sobre-interior.webp", description: "Foto do interior do salão ou da equipe reunida.", size: "800 x 1100 px", ratio: "3:4 (retrato)", type: "image" },
  // SERVIÇOS CAPAS
  { id: "srv-cabelos", label: "Cabelos — Capa", category: "Serviços — Capas", path: "public/images/services/cabelos.webp", description: "Resultado de cabelo (corte, coloração, mechas).", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-depilacao", label: "Depilação — Capa", category: "Serviços — Capas", path: "public/images/services/depilacao.webp", description: "Ambiente/sala de depilação.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-estetica-corporal", label: "Estética Corporal — Capa", category: "Serviços — Capas", path: "public/images/services/estetica-corporal.webp", description: "Tratamento corporal.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-estetica-facial", label: "Estética Facial — Capa", category: "Serviços — Capas", path: "public/images/services/estetica-facial.webp", description: "Tratamento facial.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-manicure", label: "Manicure e Pedicure — Capa", category: "Serviços — Capas", path: "public/images/services/manicure.webp", description: "Mãos com esmaltação, nail art.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-maquiagem", label: "Maquiagem — Capa", category: "Serviços — Capas", path: "public/images/services/maquiagem.webp", description: "Rosto com maquiagem social ou noiva.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-massagem", label: "Massagem & Bem-Estar — Capa", category: "Serviços — Capas", path: "public/images/services/massagem.webp", description: "Ambiente de massagem, pedras quentes.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-noivas", label: "Noivas — Capa (listagem)", category: "Serviços — Capas", path: "public/images/services/noivas.webp", description: "Noiva sendo produzida ou resultado.", size: "800 x 600 px", ratio: "4:3", type: "image" },
  // SERVIÇOS GALERIA
  { id: "srv-cabelos-01", label: "Cabelos — Galeria 1", category: "Serviços — Galeria", path: "public/images/services/cabelos-01.webp", description: "Resultado corte/coloração 1", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-cabelos-02", label: "Cabelos — Galeria 2", category: "Serviços — Galeria", path: "public/images/services/cabelos-02.webp", description: "Resultado corte/coloração 2", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-cabelos-03", label: "Cabelos — Galeria 3", category: "Serviços — Galeria", path: "public/images/services/cabelos-03.webp", description: "Resultado mechas/balayage", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-depilacao-01", label: "Depilação — Galeria 1", category: "Serviços — Galeria", path: "public/images/services/depilacao-01.webp", description: "Sala / atendimento", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-depilacao-02", label: "Depilação — Galeria 2", category: "Serviços — Galeria", path: "public/images/services/depilacao-02.webp", description: "Produtos / ambiente", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-estetica-corporal-01", label: "Est. Corporal — Galeria 1", category: "Serviços — Galeria", path: "public/images/services/estetica-corporal-01.webp", description: "Tratamento em andamento", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-estetica-corporal-02", label: "Est. Corporal — Galeria 2", category: "Serviços — Galeria", path: "public/images/services/estetica-corporal-02.webp", description: "Resultado / ambiente", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-estetica-facial-01", label: "Est. Facial — Galeria 1", category: "Serviços — Galeria", path: "public/images/services/estetica-facial-01.webp", description: "Limpeza de pele", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-estetica-facial-02", label: "Est. Facial — Galeria 2", category: "Serviços — Galeria", path: "public/images/services/estetica-facial-02.webp", description: "Aplicação de produto", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-estetica-facial-03", label: "Est. Facial — Galeria 3", category: "Serviços — Galeria", path: "public/images/services/estetica-facial-03.webp", description: "Antes e depois", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-manicure-01", label: "Manicure — Galeria 1", category: "Serviços — Galeria", path: "public/images/services/manicure-01.webp", description: "Esmaltação gel / nail art 1", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-manicure-02", label: "Manicure — Galeria 2", category: "Serviços — Galeria", path: "public/images/services/manicure-02.webp", description: "Esmaltação gel / nail art 2", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-maquiagem-01", label: "Maquiagem — Galeria 1", category: "Serviços — Galeria", path: "public/images/services/maquiagem-01.webp", description: "Make social / evento", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-maquiagem-02", label: "Maquiagem — Galeria 2", category: "Serviços — Galeria", path: "public/images/services/maquiagem-02.webp", description: "Make noiva / editorial", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-massagem-01", label: "Massagem — Galeria 1", category: "Serviços — Galeria", path: "public/images/services/massagem-01.webp", description: "Massagem / pedras quentes", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-massagem-02", label: "Massagem — Galeria 2", category: "Serviços — Galeria", path: "public/images/services/massagem-02.webp", description: "Ambiente de relaxamento", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-noivas-01", label: "Noivas — Galeria 1", category: "Serviços — Galeria", path: "public/images/services/noivas-01.webp", description: "Dia da noiva — preparação", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-noivas-02", label: "Noivas — Galeria 2", category: "Serviços — Galeria", path: "public/images/services/noivas-02.webp", description: "Noiva pronta", size: "800 x 600 px", ratio: "4:3", type: "image" },
  { id: "srv-noivas-03", label: "Noivas — Galeria 3", category: "Serviços — Galeria", path: "public/images/services/noivas-03.webp", description: "Espaço privativo", size: "800 x 600 px", ratio: "4:3", type: "image" },
  // GALERIA ESPAÇO
  { id: "espaco-01", label: "Espaço — Recepção (grande)", category: "Galeria Espaço", path: "public/images/gallery/espaco-01.webp", description: "Recepção / entrada — aparece maior", size: "1200 x 900 px", ratio: "4:3", type: "image" },
  { id: "espaco-02", label: "Espaço — Sala de Corte", category: "Galeria Espaço", path: "public/images/gallery/espaco-02.webp", description: "Espelhos / cadeiras", size: "600 x 600 px", ratio: "1:1", type: "image" },
  { id: "espaco-03", label: "Espaço — Detalhes", category: "Galeria Espaço", path: "public/images/gallery/espaco-03.webp", description: "Iluminação / decoração", size: "600 x 600 px", ratio: "1:1", type: "image" },
  { id: "espaco-04", label: "Espaço — Estética", category: "Galeria Espaço", path: "public/images/gallery/espaco-04.webp", description: "Área de estética", size: "600 x 600 px", ratio: "1:1", type: "image" },
  { id: "espaco-05", label: "Espaço — Ambiente", category: "Galeria Espaço", path: "public/images/gallery/espaco-05.webp", description: "Flores, objetos, detalhes", size: "600 x 600 px", ratio: "1:1", type: "image" },
  { id: "espaco-06", label: "Espaço — Produtos", category: "Galeria Espaço", path: "public/images/gallery/espaco-06.webp", description: "Produtos premium na prateleira", size: "1200 x 600 px", ratio: "2:1", type: "image" },
  { id: "espaco-07", label: "Espaço — Bancada", category: "Galeria Espaço", path: "public/images/gallery/espaco-07.webp", description: "Cadeira / bancada", size: "600 x 600 px", ratio: "1:1", type: "image" },
  { id: "espaco-08", label: "Espaço — Massagem", category: "Galeria Espaço", path: "public/images/gallery/espaco-08.webp", description: "Sala de massagem", size: "600 x 600 px", ratio: "1:1", type: "image" },
  // EQUIPE
  { id: "team-01", label: "Profissional 1", category: "Equipe", path: "public/images/team/membro-01.webp", description: "Foto individual — fundo neutro, busto", size: "600 x 600 px", ratio: "1:1", type: "image" },
  { id: "team-02", label: "Profissional 2", category: "Equipe", path: "public/images/team/membro-02.webp", description: "Foto individual — fundo neutro, busto", size: "600 x 600 px", ratio: "1:1", type: "image" },
  { id: "team-03", label: "Profissional 3", category: "Equipe", path: "public/images/team/membro-03.webp", description: "Foto individual — fundo neutro, busto", size: "600 x 600 px", ratio: "1:1", type: "image" },
  { id: "team-04", label: "Profissional 4", category: "Equipe", path: "public/images/team/membro-04.webp", description: "Foto individual — fundo neutro, busto", size: "600 x 600 px", ratio: "1:1", type: "image" },
  { id: "team-05", label: "Profissional 5", category: "Equipe", path: "public/images/team/membro-05.webp", description: "Foto individual — fundo neutro, busto", size: "600 x 600 px", ratio: "1:1", type: "image" },
  // CTA
  { id: "cta-bg", label: "CTA — Fundo", category: "CTA Final", path: "public/images/cta/cta-bg.webp", description: "Fundo da seção 'Pronta para se transformar?'", size: "1920 x 800 px", ratio: "~2.4:1", type: "image" },
  // PÁGINA NOIVAS
  { id: "noivas-hero", label: "Noivas — Hero (tela cheia)", category: "Página Noivas", path: "public/images/noivas/noivas-hero.webp", description: "Foto fullscreen topo da página de noivas.", size: "1920 x 1080 px", ratio: "16:9", type: "image" },
  { id: "noivas-kate", label: "Noivas — Exp. Kate Middleton", category: "Página Noivas", path: "public/images/noivas/experiencia-kate.webp", description: "Elegância clássica. Prova de maquiagem, ambiente sofisticado.", size: "800 x 1000 px", ratio: "4:5", type: "image" },
  { id: "noivas-diana", label: "Noivas — Exp. Lady Diana", category: "Página Noivas", path: "public/images/noivas/experiencia-diana.webp", description: "Delicadeza. Noiva sorrindo, buquê, emoção.", size: "800 x 1000 px", ratio: "4:5", type: "image" },
  { id: "noivas-elizabeth", label: "Noivas — Exp. Rainha Elizabeth", category: "Página Noivas", path: "public/images/noivas/experiencia-elizabeth.webp", description: "Luxo. Espelho, detalhes premium, VIP.", size: "800 x 1000 px", ratio: "4:5", type: "image" },
  { id: "noivas-galeria-01", label: "Noivas — Galeria 1", category: "Página Noivas", path: "public/images/noivas/galeria-01.webp", description: "Preparação ou resultado", size: "600 x 800 px", ratio: "3:4", type: "image" },
  { id: "noivas-galeria-02", label: "Noivas — Galeria 2", category: "Página Noivas", path: "public/images/noivas/galeria-02.webp", description: "Detalhes (cabelo, make, acessório)", size: "600 x 800 px", ratio: "3:4", type: "image" },
  { id: "noivas-galeria-03", label: "Noivas — Galeria 3", category: "Página Noivas", path: "public/images/noivas/galeria-03.webp", description: "Momento emocional", size: "600 x 800 px", ratio: "3:4", type: "image" },
  { id: "noivas-galeria-04", label: "Noivas — Galeria 4", category: "Página Noivas", path: "public/images/noivas/galeria-04.webp", description: "Espaço ou produção", size: "600 x 800 px", ratio: "3:4", type: "image" },
  { id: "noivas-galeria-05", label: "Noivas — Galeria 5", category: "Página Noivas", path: "public/images/noivas/galeria-05.webp", description: "Resultado final", size: "600 x 800 px", ratio: "3:4", type: "image" },
  { id: "noivas-galeria-06", label: "Noivas — Galeria 6", category: "Página Noivas", path: "public/images/noivas/galeria-06.webp", description: "Vestido ou ambiente", size: "600 x 800 px", ratio: "3:4", type: "image" },
  { id: "noivas-cta", label: "Noivas — CTA Final", category: "Página Noivas", path: "public/images/noivas/noivas-cta.webp", description: "Fundo da seção final da página de noivas.", size: "1920 x 800 px", ratio: "~2.4:1", type: "image" },
  // LOGO
  { id: "logo", label: "Logo — PNG alta resolução", category: "Logo", path: "public/images/logo/logo.png", description: "Logo com fundo transparente.", size: "1000 x 1000 px (mín)", ratio: "Livre", type: "image" },
];

// Store files globally so the download function can access them
const fileStore: Record<string, File> = {};

function UploadSlot({ slot, onFileChange }: { slot: ImageSlot; onFileChange: (id: string, file: File | null) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const processFile = useCallback((f: File) => {
    setFile(f);
    fileStore[slot.id] = f;
    onFileChange(slot.id, f);
    if (f.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(null);
    }
  }, [slot.id, onFileChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) processFile(f);
  }, [processFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  }, [processFile]);

  const handleRemove = useCallback(() => {
    setFile(null);
    setPreview(null);
    delete fileStore[slot.id];
    onFileChange(slot.id, null);
  }, [slot.id, onFileChange]);

  return (
    <div className={`border rounded-xl p-4 transition-colors ${file ? "border-gold/40 bg-gold/[0.03]" : "border-white/10 hover:border-white/20"}`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-display text-sm font-medium text-white leading-tight">{slot.label}</h3>
        {slot.type === "video" ? <Film size={16} className="text-gold shrink-0" /> : <ImageIcon size={16} className="text-gold shrink-0" />}
      </div>
      <p className="font-body text-[11px] text-text-muted mb-2">{slot.description}</p>
      <div className="flex items-center gap-2 mb-2">
        <span className="font-body text-[10px] bg-charcoal px-1.5 py-0.5 rounded text-text-light">{slot.size}</span>
        <span className="font-body text-[10px] bg-charcoal px-1.5 py-0.5 rounded text-text-light">{slot.ratio}</span>
        <span className="font-body text-[10px] bg-gold/10 px-1.5 py-0.5 rounded text-gold font-medium">{slot.path.split("/").pop()}</span>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`relative border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer ${file ? "border-gold/30" : "border-white/10 hover:border-white/20"}`}
      >
        <input type="file" accept={slot.type === "video" ? "video/*" : "image/*"} onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer" />
        {preview ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full h-28 object-cover rounded" />
            <button onClick={handleRemove} className="absolute top-1 right-1 bg-black/70 rounded-full p-1 hover:bg-red-600 transition-colors">
              <X size={12} className="text-white" />
            </button>
          </div>
        ) : file ? (
          <div className="py-3 relative">
            <Check size={20} className="text-green-500 mx-auto mb-1" />
            <p className="font-body text-xs text-green-400">{file.name}</p>
            <p className="font-body text-[10px] text-text-muted">{(file.size / 1024).toFixed(0)} KB</p>
            <button onClick={handleRemove} className="absolute top-1 right-1 bg-black/70 rounded-full p-1 hover:bg-red-600 transition-colors">
              <X size={12} className="text-white" />
            </button>
          </div>
        ) : (
          <div className="py-5">
            <Upload size={20} className="text-text-muted mx-auto mb-1" />
            <p className="font-body text-xs text-text-muted">Arraste ou clique</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const categories = [...new Set(IMAGE_SLOTS.map((s) => s.category))];
  const totalSlots = IMAGE_SLOTS.length;
  const [uploadedCount, setUploadedCount] = useState(0);
  const [generating, setGenerating] = useState(false);
  const uploadedIds = useRef<Set<string>>(new Set());

  const handleFileChange = useCallback((id: string, file: File | null) => {
    if (file) {
      uploadedIds.current.add(id);
    } else {
      uploadedIds.current.delete(id);
    }
    setUploadedCount(uploadedIds.current.size);
  }, []);

  const handleDownloadZip = useCallback(async () => {
    if (uploadedIds.current.size === 0) {
      alert("Nenhuma imagem foi adicionada. Arraste imagens nos slots primeiro.");
      return;
    }

    setGenerating(true);

    try {
      // @ts-expect-error JSZip loaded via CDN
      const JSZipLib = window.JSZip;
      if (!JSZipLib) {
        alert("Erro: biblioteca de ZIP não carregou. Recarregue a página.");
        setGenerating(false);
        return;
      }

      const zip = new JSZipLib();

      for (const slot of IMAGE_SLOTS) {
        const file = fileStore[slot.id];
        if (!file) continue;

        // Remove "public/" prefix for the zip structure
        const zipPath = slot.path.replace("public/", "");
        zip.file(zipPath, file);
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bless-concept-imagens.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar ZIP. Tente novamente.");
    }

    setGenerating(false);
  }, []);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js" strategy="beforeInteractive" />
      <div className="min-h-screen bg-black text-white">
        {/* Header fixo */}
        <div className="sticky top-0 z-50 border-b border-white/5 bg-charcoal/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl font-medium">Painel de Imagens</h1>
              <p className="font-body text-xs text-text-light mt-0.5">
                {uploadedCount} de {totalSlots} imagens adicionadas
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/" className="font-body text-xs text-text-muted hover:text-white transition-colors">
                ← Voltar ao site
              </a>
              <button
                onClick={handleDownloadZip}
                disabled={generating || uploadedCount === 0}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-sm font-medium capitalize transition-all duration-300 ${
                  uploadedCount > 0
                    ? "bg-gold text-black hover:bg-gold-light hover:scale-[1.02]"
                    : "bg-white/5 text-text-muted cursor-not-allowed"
                }`}
              >
                {generating ? (
                  <><Loader2 size={16} className="animate-spin" /> Gerando...</>
                ) : (
                  <><Package size={16} /> Baixar ZIP ({uploadedCount})</>
                )}
              </button>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-0.5 bg-white/5">
            <div className="h-full bg-gold transition-all duration-500" style={{ width: `${(uploadedCount / totalSlots) * 100}%` }} />
          </div>
        </div>

        {/* Instructions */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="bg-charcoal border border-gold/20 rounded-xl p-5 mb-8">
            <h2 className="font-display text-base font-medium text-gold mb-2">Como usar</h2>
            <ol className="font-body text-sm text-text-light space-y-1 list-decimal list-inside">
              <li>Arraste as imagens para os slots correspondentes</li>
              <li>Quando terminar, clique em <strong className="text-gold">&quot;Baixar ZIP&quot;</strong> no topo</li>
              <li>O ZIP vem com todas as imagens já renomeadas e nas pastas corretas</li>
              <li>Descompacte o ZIP na raiz do projeto e faça commit</li>
            </ol>
          </div>

          {/* Slots by category */}
          {categories.map((category) => {
            const slots = IMAGE_SLOTS.filter((s) => s.category === category);
            const filled = slots.filter((s) => uploadedIds.current.has(s.id)).length;
            return (
              <div key={category} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="font-display text-lg font-medium text-white">{category}</h2>
                  <span className={`font-body text-xs px-3 py-1 rounded-full ${filled === slots.length && filled > 0 ? "bg-green-600/20 text-green-400" : "bg-gold/10 text-gold"}`}>
                    {filled}/{slots.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {slots.map((slot) => (
                    <UploadSlot key={slot.id} slot={slot} onFileChange={handleFileChange} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
