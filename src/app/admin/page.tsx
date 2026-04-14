"use client";

import { useState, useCallback } from "react";
import { Upload, Check, Image as ImageIcon, Film, Download } from "lucide-react";

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
  {
    id: "hero-bg",
    label: "Hero — Vídeo ou Imagem Principal",
    category: "Hero",
    path: "public/images/hero/hero-bg.webp",
    description: "Fundo da primeira tela do site. Foto do interior do salão com iluminação warm ou vídeo curto do salão.",
    size: "1920 x 1080 px",
    ratio: "16:9 (paisagem)",
    type: "image",
  },
  {
    id: "hero-video",
    label: "Hero — Vídeo (opcional, substitui a imagem)",
    category: "Hero",
    path: "public/images/hero/hero-video.mp4",
    description: "Vídeo curto do salão (10-30 segundos, loop). Se enviado, substitui a imagem de fundo do Hero.",
    size: "1920 x 1080 px — máx 10MB",
    ratio: "16:9 (paisagem)",
    type: "video",
  },

  // SOBRE
  {
    id: "sobre-interior",
    label: "Sobre — Foto Principal",
    category: "Sobre Nós",
    path: "public/images/about/sobre-interior.webp",
    description: "Foto do interior do salão ou da proprietária/equipe reunida.",
    size: "800 x 1100 px",
    ratio: "3:4 (retrato/vertical)",
    type: "image",
  },

  // SERVIÇOS — CAPAS
  {
    id: "srv-cabelos",
    label: "Cabelos — Capa",
    category: "Serviços",
    path: "public/images/services/cabelos.webp",
    description: "Foto de resultado de cabelo (corte, coloração, mechas).",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-depilacao",
    label: "Depilação — Capa",
    category: "Serviços",
    path: "public/images/services/depilacao.webp",
    description: "Ambiente/sala de depilação ou imagem representativa.",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-estetica-corporal",
    label: "Estética Corporal — Capa",
    category: "Serviços",
    path: "public/images/services/estetica-corporal.webp",
    description: "Tratamento corporal (drenagem, massagem modeladora).",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-estetica-facial",
    label: "Estética Facial — Capa",
    category: "Serviços",
    path: "public/images/services/estetica-facial.webp",
    description: "Tratamento facial (limpeza de pele, peeling).",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-manicure",
    label: "Manicure e Pedicure — Capa",
    category: "Serviços",
    path: "public/images/services/manicure.webp",
    description: "Mãos com esmaltação bonita, nail art.",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-maquiagem",
    label: "Maquiagem — Capa",
    category: "Serviços",
    path: "public/images/services/maquiagem.webp",
    description: "Maquiagem social ou noiva — rosto com make.",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-massagem",
    label: "Massagem & Bem-Estar — Capa",
    category: "Serviços",
    path: "public/images/services/massagem.webp",
    description: "Ambiente de massagem, pedras quentes, óleos.",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-noivas",
    label: "Experiência Noivas — Capa",
    category: "Serviços",
    path: "public/images/services/noivas.webp",
    description: "Noiva sendo produzida ou resultado final.",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },

  // SERVIÇOS — GALERIA INTERNA
  {
    id: "srv-cabelos-01",
    label: "Cabelos — Galeria 1",
    category: "Galeria Serviços",
    path: "public/images/services/cabelos-01.webp",
    description: "Resultado de corte/coloração 1",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-cabelos-02",
    label: "Cabelos — Galeria 2",
    category: "Galeria Serviços",
    path: "public/images/services/cabelos-02.webp",
    description: "Resultado de corte/coloração 2",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-cabelos-03",
    label: "Cabelos — Galeria 3",
    category: "Galeria Serviços",
    path: "public/images/services/cabelos-03.webp",
    description: "Resultado de mechas/balayage",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-depilacao-01",
    label: "Depilação — Galeria 1",
    category: "Galeria Serviços",
    path: "public/images/services/depilacao-01.webp",
    description: "Sala de depilação / atendimento",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-depilacao-02",
    label: "Depilação — Galeria 2",
    category: "Galeria Serviços",
    path: "public/images/services/depilacao-02.webp",
    description: "Produtos / ambiente",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-estetica-corporal-01",
    label: "Estética Corporal — Galeria 1",
    category: "Galeria Serviços",
    path: "public/images/services/estetica-corporal-01.webp",
    description: "Tratamento em andamento",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-estetica-corporal-02",
    label: "Estética Corporal — Galeria 2",
    category: "Galeria Serviços",
    path: "public/images/services/estetica-corporal-02.webp",
    description: "Resultado / ambiente",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-estetica-facial-01",
    label: "Estética Facial — Galeria 1",
    category: "Galeria Serviços",
    path: "public/images/services/estetica-facial-01.webp",
    description: "Limpeza de pele / tratamento",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-estetica-facial-02",
    label: "Estética Facial — Galeria 2",
    category: "Galeria Serviços",
    path: "public/images/services/estetica-facial-02.webp",
    description: "Aplicação de produto",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-estetica-facial-03",
    label: "Estética Facial — Galeria 3",
    category: "Galeria Serviços",
    path: "public/images/services/estetica-facial-03.webp",
    description: "Resultado / antes e depois",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-manicure-01",
    label: "Manicure — Galeria 1",
    category: "Galeria Serviços",
    path: "public/images/services/manicure-01.webp",
    description: "Esmaltação em gel / nail art 1",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-manicure-02",
    label: "Manicure — Galeria 2",
    category: "Galeria Serviços",
    path: "public/images/services/manicure-02.webp",
    description: "Esmaltação em gel / nail art 2",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-maquiagem-01",
    label: "Maquiagem — Galeria 1",
    category: "Galeria Serviços",
    path: "public/images/services/maquiagem-01.webp",
    description: "Make social / evento",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-maquiagem-02",
    label: "Maquiagem — Galeria 2",
    category: "Galeria Serviços",
    path: "public/images/services/maquiagem-02.webp",
    description: "Make noiva / editorial",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-massagem-01",
    label: "Massagem — Galeria 1",
    category: "Galeria Serviços",
    path: "public/images/services/massagem-01.webp",
    description: "Massagem relaxante / pedras quentes",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-massagem-02",
    label: "Massagem — Galeria 2",
    category: "Galeria Serviços",
    path: "public/images/services/massagem-02.webp",
    description: "Ambiente de relaxamento",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-noivas-01",
    label: "Noivas — Galeria 1",
    category: "Galeria Serviços",
    path: "public/images/services/noivas-01.webp",
    description: "Dia da noiva — preparação",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-noivas-02",
    label: "Noivas — Galeria 2",
    category: "Galeria Serviços",
    path: "public/images/services/noivas-02.webp",
    description: "Noiva pronta — resultado",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "srv-noivas-03",
    label: "Noivas — Galeria 3",
    category: "Galeria Serviços",
    path: "public/images/services/noivas-03.webp",
    description: "Espaço privativo / detalhes",
    size: "800 x 600 px",
    ratio: "4:3",
    type: "image",
  },

  // GALERIA DO ESPAÇO
  {
    id: "espaco-01",
    label: "Espaço — Recepção (foto grande)",
    category: "Galeria Espaço",
    path: "public/images/gallery/espaco-01.webp",
    description: "Recepção / entrada do salão — aparece maior no grid",
    size: "1200 x 900 px",
    ratio: "4:3",
    type: "image",
  },
  {
    id: "espaco-02",
    label: "Espaço — Sala de Corte",
    category: "Galeria Espaço",
    path: "public/images/gallery/espaco-02.webp",
    description: "Sala de corte / espelhos",
    size: "600 x 600 px",
    ratio: "1:1",
    type: "image",
  },
  {
    id: "espaco-03",
    label: "Espaço — Iluminação / Detalhes",
    category: "Galeria Espaço",
    path: "public/images/gallery/espaco-03.webp",
    description: "Iluminação / detalhes decorativos",
    size: "600 x 600 px",
    ratio: "1:1",
    type: "image",
  },
  {
    id: "espaco-04",
    label: "Espaço — Área de Estética",
    category: "Galeria Espaço",
    path: "public/images/gallery/espaco-04.webp",
    description: "Área de estética",
    size: "600 x 600 px",
    ratio: "1:1",
    type: "image",
  },
  {
    id: "espaco-05",
    label: "Espaço — Detalhes (flores, objetos)",
    category: "Galeria Espaço",
    path: "public/images/gallery/espaco-05.webp",
    description: "Detalhes do ambiente",
    size: "600 x 600 px",
    ratio: "1:1",
    type: "image",
  },
  {
    id: "espaco-06",
    label: "Espaço — Produtos Premium",
    category: "Galeria Espaço",
    path: "public/images/gallery/espaco-06.webp",
    description: "Produtos premium na prateleira",
    size: "1200 x 600 px",
    ratio: "2:1",
    type: "image",
  },
  {
    id: "espaco-07",
    label: "Espaço — Cadeira / Bancada",
    category: "Galeria Espaço",
    path: "public/images/gallery/espaco-07.webp",
    description: "Cadeira de atendimento / bancada",
    size: "600 x 600 px",
    ratio: "1:1",
    type: "image",
  },
  {
    id: "espaco-08",
    label: "Espaço — Sala de Massagem",
    category: "Galeria Espaço",
    path: "public/images/gallery/espaco-08.webp",
    description: "Ambiente relaxante / sala de massagem",
    size: "600 x 600 px",
    ratio: "1:1",
    type: "image",
  },

  // EQUIPE
  {
    id: "team-01",
    label: "Equipe — Profissional 1",
    category: "Equipe",
    path: "public/images/team/membro-01.webp",
    description: "Foto individual — fundo neutro, busto. Hair Stylist.",
    size: "600 x 600 px",
    ratio: "1:1 (quadrada)",
    type: "image",
  },
  {
    id: "team-02",
    label: "Equipe — Profissional 2",
    category: "Equipe",
    path: "public/images/team/membro-02.webp",
    description: "Foto individual — fundo neutro, busto. Esteticista.",
    size: "600 x 600 px",
    ratio: "1:1 (quadrada)",
    type: "image",
  },
  {
    id: "team-03",
    label: "Equipe — Profissional 3",
    category: "Equipe",
    path: "public/images/team/membro-03.webp",
    description: "Foto individual — fundo neutro, busto. Nail Designer.",
    size: "600 x 600 px",
    ratio: "1:1 (quadrada)",
    type: "image",
  },
  {
    id: "team-04",
    label: "Equipe — Profissional 4",
    category: "Equipe",
    path: "public/images/team/membro-04.webp",
    description: "Foto individual — fundo neutro, busto. Massoterapeuta.",
    size: "600 x 600 px",
    ratio: "1:1 (quadrada)",
    type: "image",
  },
  {
    id: "team-05",
    label: "Equipe — Profissional 5",
    category: "Equipe",
    path: "public/images/team/membro-05.webp",
    description: "Foto individual — fundo neutro, busto. Maquiadora.",
    size: "600 x 600 px",
    ratio: "1:1 (quadrada)",
    type: "image",
  },

  // CTA
  {
    id: "cta-bg",
    label: "CTA — Fundo",
    category: "CTA Final",
    path: "public/images/cta/cta-bg.webp",
    description: "Fundo da seção 'Pronta para se transformar?' — detalhe do salão ou mãos trabalhando.",
    size: "1920 x 800 px",
    ratio: "~2.4:1 (paisagem larga)",
    type: "image",
  },

  // LOGO
  {
    id: "logo",
    label: "Logo — PNG alta resolução",
    category: "Logo",
    path: "public/images/logo/logo.png",
    description: "Logo do Espaço Bless Concept em alta resolução (fundo transparente).",
    size: "1000 x 1000 px (mínimo)",
    ratio: "Livre",
    type: "image",
  },
];

function UploadSlot({ slot }: { slot: ImageSlot }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      if (f.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(f));
      } else {
        setPreview(null);
      }
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      if (f.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(f));
      } else {
        setPreview(null);
      }
    }
  }, []);

  const handleDownloadInfo = useCallback(() => {
    if (!file) return;
    const info = `Arquivo: ${slot.path.split("/").pop()}\nOriginal: ${file.name}\nTamanho: ${(file.size / 1024).toFixed(0)}KB\nDestino: ${slot.path}`;
    alert(info);
  }, [file, slot.path]);

  return (
    <div className="border border-white/10 rounded-xl p-5 hover:border-gold/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display text-base font-medium text-white">{slot.label}</h3>
          <p className="font-body text-xs text-text-muted mt-1">{slot.description}</p>
        </div>
        {slot.type === "video" ? (
          <Film size={20} className="text-gold shrink-0" />
        ) : (
          <ImageIcon size={20} className="text-gold shrink-0" />
        )}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <span className="font-body text-[11px] bg-charcoal px-2 py-1 rounded text-text-light">{slot.size}</span>
        <span className="font-body text-[11px] bg-charcoal px-2 py-1 rounded text-text-light">{slot.ratio}</span>
        <span className="font-body text-[11px] bg-charcoal px-2 py-1 rounded text-gold">{slot.path.split("/").pop()}</span>
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
          file ? "border-gold/40 bg-gold/5" : "border-white/10 hover:border-white/20"
        }`}
      >
        <input
          type="file"
          accept={slot.type === "video" ? "video/*" : "image/*"}
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />

        {preview ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded" />
            <div className="absolute top-2 right-2 bg-green-600 rounded-full p-1">
              <Check size={14} className="text-white" />
            </div>
          </div>
        ) : file ? (
          <div className="py-4">
            <Check size={24} className="text-green-500 mx-auto mb-2" />
            <p className="font-body text-sm text-green-400">{file.name}</p>
            <p className="font-body text-xs text-text-muted">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
        ) : (
          <div className="py-6">
            <Upload size={24} className="text-text-muted mx-auto mb-2" />
            <p className="font-body text-sm text-text-muted">
              Arraste ou clique para enviar
            </p>
          </div>
        )}
      </div>

      {file && (
        <button
          onClick={handleDownloadInfo}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2 font-body text-xs text-gold hover:text-gold-light transition-colors"
        >
          <Download size={12} />
          Ver informações do arquivo
        </button>
      )}
    </div>
  );
}

export default function AdminPage() {
  const categories = [...new Set(IMAGE_SLOTS.map((s) => s.category))];
  const totalSlots = IMAGE_SLOTS.length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-charcoal">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-medium">
              Painel de Imagens
            </h1>
            <p className="font-body text-sm text-text-light mt-1">
              Espaço Bless Concept — {totalSlots} imagens necessárias
            </p>
          </div>
          <a
            href="/"
            className="font-body text-sm text-gold hover:text-gold-light transition-colors"
          >
            ← Voltar ao site
          </a>
        </div>
      </div>

      {/* Instructions */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-charcoal border border-gold/20 rounded-xl p-6 mb-10">
          <h2 className="font-display text-lg font-medium text-gold mb-3">Como usar</h2>
          <ol className="font-body text-sm text-text-light space-y-2 list-decimal list-inside">
            <li>Encontre o slot da imagem que deseja enviar</li>
            <li>Arraste a imagem para o slot ou clique para selecionar</li>
            <li>O nome do arquivo de destino está indicado em <span className="text-gold">dourado</span> em cada slot</li>
            <li>Após selecionar, renomeie manualmente o arquivo para o nome indicado e coloque na pasta correta do projeto</li>
            <li>Formatos aceitos: WebP (preferido), JPG, PNG. Vídeos: MP4</li>
          </ol>
        </div>

        {/* Slots by category */}
        {categories.map((category) => {
          const slots = IMAGE_SLOTS.filter((s) => s.category === category);
          return (
            <div key={category} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="font-display text-xl font-medium text-white">
                  {category}
                </h2>
                <span className="font-body text-xs bg-gold/10 text-gold px-3 py-1 rounded-full">
                  {slots.length} {slots.length === 1 ? "imagem" : "imagens"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slots.map((slot) => (
                  <UploadSlot key={slot.id} slot={slot} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
