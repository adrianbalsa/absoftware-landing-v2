"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants, useInView } from "framer-motion";
import {
  Shield,
  Smartphone,
  BarChart3,
  Check,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronRight,
  Zap,
  Play,
  Star,
  Users,
  Truck,
  Clock,
  Award,
  MessageCircle,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const APP_URL = "https://app.ablogistics-os.com";
const WHATSAPP_NUMBER = "34643747195";
const WHATSAPP_MESSAGE = "Hola, me gustaría obtener más información sobre AB Logistics OS";

const NAV_LINKS = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Cómo Funciona", href: "#como-funciona" },
  { label: "Precios", href: "#precios" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "FAQ", href: "#faq" },
];

const TRUSTED_LOGOS = [
  { name: "DHL", logo: "DHL" },
  { name: "SEUR", logo: "SEUR" },
  { name: "MRW", logo: "MRW" },
  { name: "GLS", logo: "GLS" },
  { name: "Correos Express", logo: "CORREOS" },
];

const STATS = [
  { value: 500, suffix: "+", label: "Empresas activas", icon: Users },
  { value: 12000, suffix: "+", label: "Vehículos gestionados", icon: Truck },
  { value: 99.9, suffix: "%", label: "Uptime garantizado", icon: Clock },
  { value: 4.9, suffix: "/5", label: "Valoración media", icon: Star },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Regístrate en minutos",
    description: "Crea tu cuenta gratuita sin tarjeta de crédito. Configura tu flota y empieza a trabajar en menos de 10 minutos.",
    icon: Sparkles,
  },
  {
    step: "02",
    title: "Conecta tu operativa",
    description: "Integra conductores, vehículos y rutas. Nuestro portal móvil permite a tus chóferes subir documentos al instante.",
    icon: Smartphone,
  },
  {
    step: "03",
    title: "Optimiza y crece",
    description: "Analiza márgenes, automatiza facturas VeriFactu y toma decisiones basadas en datos reales de tu negocio.",
    icon: TrendingUp,
  },
];

const TESTIMONIALS = [
  {
    name: "Carlos Méndez",
    role: "Director de Operaciones",
    company: "Transportes Galicia Norte",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    quote: "Desde que implementamos AB Logistics OS, hemos reducido un 35% el tiempo de gestión administrativa. La facturación VeriFactu es impecable.",
    rating: 5,
  },
  {
    name: "María García",
    role: "Gerente",
    company: "Logística Express Coruña",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    quote: "El dashboard de EBITDA me permitió identificar rutas que perdían dinero. En 3 meses recuperamos la inversión del software.",
    rating: 5,
  },
  {
    name: "Antonio Rodríguez",
    role: "Autónomo",
    company: "Transportes Rodríguez",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    quote: "Como autónomo, necesitaba algo simple. El portal del conductor es genial: mis liquidaciones están listas en segundos.",
    rating: 5,
  },
];

const FAQS = [
  {
    question: "¿Qué es VeriFactu y por qué lo necesito?",
    answer: "VeriFactu es el nuevo sistema de facturación electrónica obligatorio en España desde 2026. AB Logistics OS genera facturas con hash encadenado y registro inmutable, cumpliendo automáticamente con la Ley Antifraude sin que tengas que preocuparte por nada.",
  },
  {
    question: "¿Puedo probar el software antes de pagar?",
    answer: "Sí, ofrecemos 14 días de prueba gratuita con acceso completo a todas las funcionalidades. No necesitas tarjeta de crédito para empezar.",
  },
  {
    question: "¿Cómo funciona el portal del conductor?",
    answer: "Cada conductor recibe un enlace único con QR. Desde su móvil puede subir tickets de gasoil, CMRs y otros documentos escaneándolos. Todo se sincroniza al instante con tu panel de administración.",
  },
  {
    question: "¿Se integra con mi software de contabilidad?",
    answer: "Sí, ofrecemos integración con los principales ERPs y software contable del mercado. En el plan Enterprise incluimos integración personalizada con cualquier sistema.",
  },
  {
    question: "¿Qué soporte ofrecéis?",
    answer: "Todos los planes incluyen soporte por email. Los planes Pro y Enterprise incluyen soporte prioritario con tiempos de respuesta garantizados. Enterprise además incluye un gestor de cuenta dedicado.",
  },
  {
    question: "¿Puedo cambiar de plan en cualquier momento?",
    answer: "Sí, puedes subir o bajar de plan cuando quieras. Los cambios se aplican de forma prorrateada en tu siguiente factura.",
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Certificación VeriFactu",
    description:
      "Emisión de facturas con hash encadenado y registro inmutable, listas para la Agencia Tributaria. Cumple la Ley Antifraude desde el primer día.",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
  {
    icon: Smartphone,
    title: "Portal del Conductor Móvil",
    description:
      "Los chóferes suben tickets de gasoil y CMRs escaneando un QR desde su móvil. Sin papel, sin pérdidas, sin retrasos en la liquidación.",
    color: "text-indigo-700",
    bg: "bg-indigo-50",
  },
  {
    icon: BarChart3,
    title: "Dashboard de EBITDA",
    description:
      "Descubre qué rutas son rentables y cuáles te están descapitalizando. Visualiza impuestos trimestrales y proyecciones de flujo de caja.",
    color: "text-sky-700",
    bg: "bg-sky-50",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "19",
    description: "Para autónomos y microempresas",
    popular: false,
    features: [
      "1 vehículo",
      "Facturación VeriFactu",
      "Portal conductor básico",
      "Soporte por email",
      "Exportación a Excel",
    ],
  },
  {
    name: "Pro",
    price: "49",
    description: "Para flotas de 2 a 20 vehículos",
    popular: true,
    features: [
      "Hasta 20 vehículos",
      "Dashboard EBITDA completo",
      "Portal conductor ilimitado",
      "Calculadora ROI por porte",
      "Integración AEAT automática",
      "Soporte prioritario",
      "API REST incluida",
    ],
  },
  {
    name: "Enterprise",
    price: "89",
    description: "Para grandes operadores logísticos",
    popular: false,
    features: [
      "Vehículos ilimitados",
      "Multi-empresa y multi-delegación",
      "SLA 99.9% garantizado",
      "Onboarding dedicado",
      "Integración ERP corporativo",
      "Gestor de cuenta exclusivo",
    ],
  },
];

// ─── FADE-UP ANIMATION VARIANT ────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-900/5 border-b border-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-base tracking-tight">
                AB Logistics OS
              </span>
              <span className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
                Software de Gestión Logística
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-slate-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-700 border border-slate-200 rounded-xl px-4 py-2.5 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all duration-200 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar
            </a>
            <a
              href={APP_URL}
              className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-5 py-2.5 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2"
            >
              Acceso Clientes
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pb-6 overflow-hidden"
          >
            <div className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-slate-700 py-3 px-4 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="border-t border-slate-100 mt-4 pt-4 flex flex-col gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center text-sm font-medium text-green-600 border border-green-200 bg-green-50 rounded-xl px-4 py-3 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={APP_URL}
                  className="text-center text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-4 py-3"
                >
                  Acceso Clientes
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 overflow-hidden pt-20">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/25 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]" />
      </div>
      
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center z-10">
        {/* Badge with glow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-blue-300 text-xs font-semibold px-5 py-2 rounded-full mb-8 shadow-lg shadow-blue-500/10"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Nuevo: Adaptado a VeriFactu 2026
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight max-w-5xl mx-auto text-balance"
        >
          Inteligencia Logística para{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Flotas Rentables
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          El ERP que protege la rentabilidad de tu flota, automatiza la facturación
          y cumple con la Ley Antifraude. Usado por más de 500 empresas en España.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={APP_URL}
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-semibold text-base px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            <span className="relative flex items-center gap-2">
              Empezar Prueba Gratuita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="#como-funciona"
            className="group inline-flex items-center gap-2 text-white/90 font-semibold text-base px-8 py-4 rounded-2xl border-2 border-white/20 hover:border-white/40 hover:bg-white/5 backdrop-blur-sm transition-all duration-300"
          >
            <Play className="w-5 h-5 text-blue-400" />
            Ver Cómo Funciona
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500"
        >
          {[
            { icon: Check, text: "Sin tarjeta de crédito" },
            { icon: Clock, text: "14 días gratis" },
            { icon: Shield, text: "Cumple VeriFactu" },
          ].map((t) => (
            <span key={t.text} className="flex items-center gap-2">
              <t.icon className="w-4 h-4 text-blue-400" />
              <span className="text-slate-400">{t.text}</span>
            </span>
          ))}
        </motion.div>

        {/* Dashboard mockup with glassmorphism frame */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="mt-16 lg:mt-20 max-w-5xl mx-auto relative"
        >
          {/* Glow effect behind */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-3xl scale-95" />
          
          {/* Main container */}
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-2 shadow-2xl">
            <div className="rounded-xl lg:rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" 
                alt="Dashboard de AB Logistics OS mostrando métricas de flota" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating stats cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -left-4 lg:-left-8 top-1/4 bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-slate-200/50 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Margen Mensual</p>
                  <p className="text-lg font-bold text-green-600">+23.5%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -right-4 lg:-right-8 bottom-1/4 bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-slate-200/50 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Vehículos Activos</p>
                  <p className="text-lg font-bold text-slate-900">1,247</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── TRUSTED BY LOGOS ──────────────────────────────────────────────────────────
function TrustedBy() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Subtle floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 right-20 w-40 h-40 bg-indigo-200/30 rounded-full blur-3xl animate-float-reverse" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-slate-500 mb-12"
        >
          Empresas de transporte que confían en nosotros
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10"
        >
          {TRUSTED_LOGOS.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="text-2xl font-bold text-slate-300 hover:text-blue-500 transition-all duration-300 cursor-default"
            >
              {logo.logo}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── ANIMATED STATS ────────────────────────────────────────────────────────────
function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {value === 4.9 ? count.toFixed(1) : count.toLocaleString("es-ES")}{suffix}
    </span>
  );
}

function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.3),_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.3),_transparent_50%)]" />
        </div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/20 rounded-full blur-[100px] animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-glow-pulse" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-center group"
              >
                <div className="glass rounded-3xl p-8 hover:bg-white/10 transition-all duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 mb-6 group-hover:from-blue-500/50 group-hover:to-violet-500/50 transition-all duration-500">
                    <Icon className="w-8 h-8 text-blue-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-3">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowItWorks() {
  return (
    <section id="como-funciona" className="py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-50 animate-float" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-violet-100 to-pink-100 rounded-full blur-3xl opacity-40 animate-float-reverse" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-blue-600 to-indigo-600" />
            Cómo Funciona
            <span className="w-8 h-px bg-gradient-to-r from-indigo-600 to-blue-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 text-balance">
            Empieza en 3 simples pasos
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto">
            Configurar tu cuenta es rápido y sencillo. Sin complicaciones técnicas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {HOW_IT_WORKS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                className="relative group"
              >
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px">
                    <div className="w-full h-full bg-gradient-to-r from-blue-300 via-indigo-300 to-transparent" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-300" />
                  </div>
                )}
                
                <div className="relative glass-light rounded-3xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 h-full card-hover">
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:scale-110 transition-all duration-500">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-5xl font-extrabold bg-gradient-to-br from-slate-200 to-slate-300 bg-clip-text text-transparent">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
// ─── ROI CALCULATOR ───────────────────────────────────────────────────────────
function ROICalculator() {
  const [income, setIncome] = useState(850);
  const [km, setKm] = useState(600);
  const [diesel, setDiesel] = useState(1.42);
  const [consumption, setConsumption] = useState(32);
  const [extras, setExtras] = useState(65);
  const [amort, setAmort] = useState(0.15);

  const fuelCost = (km / 100) * consumption * diesel;
  const amortCost = km * amort;
  const totalCost = fuelCost + amortCost + extras;
  const netProfit = income - totalCost;
  const margin = income > 0 ? (netProfit / income) * 100 : 0;
  const isLoss = netProfit < 0;

  const fmt = (n: number, dec = 2) =>
    n.toLocaleString("es-ES", { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const InputField = ({
    label,
    value,
    onChange,
    suffix,
    step = 1,
  }: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    suffix: string;
    step?: number;
  }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all pr-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
          {suffix}
        </span>
      </div>
    </div>
  );

  return (
    <section id="calculadora" className="py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-40 animate-float-slow" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-40 animate-float-reverse" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-emerald-600 to-teal-600" />
            Herramienta gratuita
            <span className="w-8 h-px bg-gradient-to-r from-teal-600 to-emerald-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Simulador de Rentabilidad
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Introduce los datos de tu viaje y descubre al instante si realmente
            estás ganando dinero.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="glass-light rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            {/* Inputs */}
            <div className="p-8 lg:p-10">
              <h3 className="text-base font-semibold text-slate-900 mb-6">
                Datos del Porte
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <InputField
                  label="Ingreso del Viaje"
                  value={income}
                  onChange={setIncome}
                  suffix="€"
                />
                <InputField
                  label="Kilómetros Totales"
                  value={km}
                  onChange={setKm}
                  suffix="km"
                />
                <InputField
                  label="Precio Diésel"
                  value={diesel}
                  onChange={setDiesel}
                  suffix="€/L"
                  step={0.01}
                />
                <InputField
                  label="Consumo"
                  value={consumption}
                  onChange={setConsumption}
                  suffix="L/100km"
                  step={0.1}
                />
                <InputField
                  label="Peajes / Dietas"
                  value={extras}
                  onChange={setExtras}
                  suffix="€"
                />
                <InputField
                  label="Amortización/Km"
                  value={amort}
                  onChange={setAmort}
                  suffix="€/km"
                  step={0.01}
                />
              </div>
            </div>

            {/* Results */}
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <h3 className="text-base font-semibold text-slate-900 mb-6">
                Resultado en Tiempo Real
              </h3>

              {/* Cost breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Coste combustible</span>
                  <span className="font-semibold text-slate-700">
                    {fmt(fuelCost)} €
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Coste amortización</span>
                  <span className="font-semibold text-slate-700">
                    {fmt(amortCost)} €
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Peajes / Dietas</span>
                  <span className="font-semibold text-slate-700">
                    {fmt(extras)} €
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
                  <span className="text-slate-600 font-medium">Coste Total</span>
                  <span className="font-bold text-slate-900">{fmt(totalCost)} €</span>
                </div>
              </div>

              {/* Key metrics */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  key={netProfit}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-2xl p-5 border ${
                    isLoss
                      ? "bg-red-50 border-red-100"
                      : "bg-green-50 border-green-100"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    {isLoss ? (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    ) : (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    )}
                    <span className="text-xs font-medium text-slate-500">
                      Beneficio Neto
                    </span>
                  </div>
                  <p
                    className={`text-2xl font-extrabold ${
                      isLoss ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {fmt(netProfit)} €
                  </p>
                </motion.div>

                <motion.div
                  key={margin}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-2xl p-5 border ${
                    isLoss
                      ? "bg-red-50 border-red-100"
                      : "bg-blue-50 border-blue-100"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <BarChart3
                      className={`w-4 h-4 ${
                        isLoss ? "text-red-500" : "text-blue-600"
                      }`}
                    />
                    <span className="text-xs font-medium text-slate-500">
                      Margen
                    </span>
                  </div>
                  <p
                    className={`text-2xl font-extrabold ${
                      isLoss ? "text-red-600" : "text-blue-700"
                    }`}
                  >
                    {fmt(margin, 1)}%
                  </p>
                </motion.div>
              </div>

              {/* Alert */}
              <AnimatePresence>
                {isLoss && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-red-700">
                        Viaje a pérdidas
                      </p>
                      <p className="text-xs text-red-500 mt-0.5">
                        No cubre amortización. Revisa el precio pactado o los
                        costes del viaje.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────
function Features() {
  const featureColors = [
    { gradient: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/30", glow: "bg-blue-500/20" },
    { gradient: "from-indigo-500 to-purple-500", shadow: "shadow-indigo-500/30", glow: "bg-indigo-500/20" },
    { gradient: "from-violet-500 to-pink-500", shadow: "shadow-violet-500/30", glow: "bg-violet-500/20" },
  ];

  return (
    <section id="funcionalidades" className="py-28 bg-gradient-to-b from-white via-slate-50/30 to-white relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-5 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50 animate-float" />
        <div className="absolute bottom-1/3 right-5 w-72 h-72 bg-gradient-to-br from-violet-100 to-pink-100 rounded-full blur-3xl opacity-50 animate-float-reverse" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-blue-600 to-violet-600" />
            Funcionalidades
            <span className="w-8 h-px bg-gradient-to-r from-violet-600 to-blue-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900">
            Todo lo que necesita tu flota
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto">
            Diseñado específicamente para operadores de transporte español,
            desde autónomos hasta flotas medianas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const colors = featureColors[i];
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 ${colors.glow} rounded-3xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                
                <div className="relative glass-light rounded-3xl p-8 h-full cursor-default hover:bg-white transition-all duration-500">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center mb-6 shadow-lg ${colors.shadow} group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                    {f.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function Pricing() {
  return (
    <section id="precios" className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
            Precios
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            Planes simples y transparentes
          </h2>
          <p className="mt-3 text-slate-400 max-w-xl mx-auto">
            Sin costes ocultos. Escala cuando crezcas. Cancela cuando quieras.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative rounded-3xl p-8 flex flex-col border backdrop-blur-xl transition-all duration-300 ${
                plan.popular
                  ? "bg-white/15 border-white/30 shadow-2xl shadow-blue-500/20"
                  : "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30"
              }`}
            >
              {/* Glassmorphism inner glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30">
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6 relative z-10">
                <h3 className="text-xl font-bold mb-1 text-white">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-400">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 relative z-10">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    {plan.price}€
                  </span>
                  <span className="text-sm pb-1 text-slate-400">
                    /mes
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1 relative z-10">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular ? "bg-blue-500/30" : "bg-white/10"
                    }`}>
                      <Check className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-sm text-slate-300">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.popular ? (
                <a
                  href={APP_URL}
                  className="relative overflow-hidden text-center text-sm font-semibold py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-blue-500/30 group z-10"
                >
                  {/* Shine animation */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                  <span className="relative">Crear Cuenta</span>
                </a>
              ) : (
                <a
                  href={APP_URL}
                  className="text-center text-sm font-semibold py-3.5 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 z-10"
                >
                  Crear Cuenta
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="testimonios" className="py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full blur-3xl opacity-40 animate-float" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full blur-3xl opacity-40 animate-float-reverse" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-amber-600 to-orange-600" />
            Testimonios
            <span className="w-8 h-px bg-gradient-to-r from-orange-600 to-amber-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 text-balance">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto">
            Más de 500 empresas de transporte confían en AB Logistics OS para gestionar su operativa diaria.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative"
            >
              <div className="relative glass-light rounded-3xl p-8 h-full hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                {/* Quote mark */}
                <div className="absolute top-6 right-6 text-7xl bg-gradient-to-br from-amber-200 to-orange-200 bg-clip-text text-transparent font-serif leading-none">
                  &ldquo;
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-5">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400 drop-shadow-sm" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-slate-600 leading-relaxed mb-8 relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                    <p className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-semibold">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-40 animate-float-slow" />
        <div className="absolute bottom-1/4 left-10 w-56 h-56 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-40 animate-float-reverse" />
      </div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-blue-600 to-indigo-600" />
            FAQ
            <span className="w-8 h-px bg-gradient-to-r from-indigo-600 to-blue-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 text-balance">
            Preguntas frecuentes
          </h2>
          <p className="mt-5 text-lg text-slate-500">
            Todo lo que necesitas saber sobre AB Logistics OS.
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="group"
            >
              <div className={`glass-light rounded-2xl overflow-hidden transition-all duration-500 ${openIndex === i ? 'shadow-lg shadow-blue-500/10 bg-white' : 'hover:bg-white'}`}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-semibold pr-4 transition-colors duration-300 ${openIndex === i ? 'text-blue-700' : 'text-slate-900'}`}>{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-slate-100'}`}>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                        openIndex === i ? "rotate-180 text-white" : "text-slate-500"
                      }`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-slate-500 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ────────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 animate-gradient">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.15),_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1),_transparent_50%)]" />
        </div>
      </div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-[100px] animate-float-reverse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-[120px] animate-glow-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-white/90">Activa tu prueba gratuita ahora</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6 text-balance leading-tight">
            Empieza a proteger los márgenes de tu flota hoy
          </h2>
          <p className="text-xl text-blue-100/90 mb-12 max-w-2xl mx-auto">
            Únete a más de 500 empresas de transporte que ya optimizan su rentabilidad con AB Logistics OS.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={APP_URL}
              className="group relative inline-flex items-center gap-2 bg-white text-blue-600 font-semibold text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-blue-100 to-transparent skew-x-12" />
              <span className="relative flex items-center gap-2">
                Empezar Prueba Gratuita
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-white font-semibold text-base px-8 py-4 rounded-2xl glass hover:bg-white/20 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Hablar por WhatsApp
            </a>
          </div>

          <p className="mt-10 text-sm text-blue-200/80">
            Sin tarjeta de crédito requerida. 14 días de prueba gratuita.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── WHATSAPP FLOATING BUTTON ──────────────────────────────────────────────────
function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold px-5 py-4 rounded-2xl shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300"
    >
      {/* Glow effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-lg opacity-40 animate-glow-pulse" />
      
      {/* Content */}
      <span className="relative flex items-center gap-3">
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              WhatsApp
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.a>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
      
      {/* Background with subtle gradient */}
      <div className="bg-slate-950 text-slate-400 relative">
        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-violet-500/20 rounded-full blur-[100px]" />
        </div>
        
        {/* Main footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-white text-xl">AB Logistics OS</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-slate-400/80">
                El ERP de transporte y logística más completo de España. Diseñado en A Coruña, Galicia.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-xl glass hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-xl glass hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>

          {/* Links - Producto */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">Producto</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#funcionalidades" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Funcionalidades</a></li>
              <li><a href="#precios" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Precios</a></li>
              <li><a href="#calculadora" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Calculadora ROI</a></li>
              <li><a href="#como-funciona" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Cómo Funciona</a></li>
              <li><a href="#testimonios" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Testimonios</a></li>
            </ul>
          </div>

          {/* Links - Recursos */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">Recursos</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#faq" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">FAQ</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Blog</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Guía VeriFactu</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">API Docs</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">Centro de Ayuda</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <a href="mailto:hola@ablogistics-os.com" className="hover:text-white transition-colors">
                  hola@ablogistics-os.com
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white transition-colors">
                  +34 643 747 195
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <span>A Coruña, Galicia, España</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal links */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2026 AB Logistics OS. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-white transition-colors">Privacidad (RGPD)</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ──────────────────────────────────────────────────���──────────────────
export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustedBy />
      <StatsSection />
      <HowItWorks />
      <Features />
      <ROICalculator />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
