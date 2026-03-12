"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Shield,
  Smartphone,
  BarChart3,
  Calculator,
  Clock,
  FileText,
  Check,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ChevronRight,
  Zap,
} from "lucide-react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const APP_URL = "https://app.ablogistics-os.com";

const NAV_LINKS = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Precios", href: "#precios" },
  { label: "Calculadora ROI", href: "#calculadora" },
];

const FEATURES = [
  {
    icon: Shield,
    title: "Certificación VeriFactu",
    description: "Facturación blindada y conectada con la AEAT. Evita sanciones cumpliendo la Ley Antifraude 2026 de forma automática.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: BarChart3,
    title: "EBITDA en Tiempo Real",
    description: "Cruza ingresos con gastos de combustible, peajes y amortización para saber exactamente qué rutas son rentables.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Smartphone,
    title: "Portal del Chófer",
    description: "Tus conductores suben tickets y CMRs con una foto desde el móvil. Cero papeleo perdido en la cabina del camión.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Calculator,
    title: "Cotizador Inteligente",
    description: "Calcula el precio mínimo al que debes aceptar un viaje para no perder dinero, considerando los costes variables actuales.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Clock,
    title: "Control de Vencimientos",
    description: "Alertas automáticas para renovaciones de ITV, seguros, tarjetas de transporte y mantenimientos preventivos.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: FileText,
    title: "Liquidaciones Automáticas",
    description: "Genera el pago de dietas y nóminas variables de tus conductores en un clic en base a los viajes registrados.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "19",
    description: "Cumplimiento legal y control básico para autónomos.",
    popular: false,
    features: [
      "Hasta 2 vehículos",
      "Facturación VeriFactu obligatoria",
      "Portal móvil para 2 chóferes",
      "Gestión de gastos básicos",
      "Soporte por email (48h)",
    ],
  },
  {
    name: "Pro",
    price: "49",
    description: "Control de rentabilidad para flotas en crecimiento.",
    popular: true,
    features: [
      "Hasta 15 vehículos",
      "Dashboard de EBITDA en tiempo real",
      "Simulador de rentabilidad por porte",
      "Control de vencimientos (ITV, Seguros)",
      "Soporte prioritario (24h)",
    ],
  },
  {
    name: "Enterprise",
    price: "89",
    description: "Analítica avanzada y automatización total.",
    popular: false,
    features: [
      "Vehículos ilimitados",
      "Liquidación automática de chóferes",
      "Integración API con bancos",
      "Gestión multi-empresa",
      "Gestor de cuenta personal",
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8FAFC]/95 backdrop-blur-sm shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="AB Logo" className="w-9 h-9 object-contain" />
            <span className="font-bold text-slate-900 text-[15px] tracking-tight">
              AB Logistics OS
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-slate-600 hover:text-blue-700 font-medium transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:hola@ablogistics-os.com"
              className="text-sm font-medium text-slate-700 border border-slate-200 rounded-xl px-4 py-2 hover:border-blue-300 hover:text-blue-700 transition-all"
            >
              Contactar
            </a>
            <a
              href={APP_URL}
              className="text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 text-white rounded-xl px-5 py-2.5"
            >
              Acceso Clientes
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-700"
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
            className="md:hidden bg-[#F8FAFC] border-b border-slate-100 px-4 pb-4 overflow-hidden"
          >
            <div className="flex flex-col gap-3 pt-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-slate-700 py-2 border-b border-slate-50"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={APP_URL}
                className="mt-2 text-center text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/20 text-[#F8FAFC] rounded-xl px-4 py-2.5"
              >
                Acceso Clientes
              </a>
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
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-slate-50 via-[#F8FAFC] to-blue-50 overflow-hidden pt-16">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1E3A8A 1px, transparent 1px), linear-gradient(90deg, #1E3A8A 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Blue glow top right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full opacity-30 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-8"
        >
          <Shield className="w-3.5 h-3.5" />
          Adaptado a la normativa española VeriFactu 2026
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900"
        >
          Inteligencia Logística y{" "}
          <span className="text-blue-700">Control de Márgenes.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
        >
          El ERP diseñado para proteger la rentabilidad de tu flota, automatizar
          la facturación y cumplir con la nueva Ley Antifraude (VeriFactu).
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
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 text-white font-semibold text-sm px-7 py-3.5 rounded-2xl"
          >
            Empezar Prueba Gratuita
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="mailto:hola@ablogistics-os.com"
            className="inline-flex items-center gap-2 text-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/20 font-semibold text-sm px-7 py-3.5 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
          >
            Solicitar Demo
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
        >
          {["Soporte técnico en España", "Configuración en 24h", "Cumplimiento normativo"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* MOCKUP IMAGE (AÑADIDO CORRECTAMENTE AQUÍ) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
          className="mt-16 max-w-5xl mx-auto relative rounded-xl overflow-hidden shadow-2xl border border-slate-200/50"
        >
          <div className="absolute -inset-10 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
          <img 
             src="/dashboard.png" 
             alt="Dashboard de Gestión AB Logistics OS" 
             className="w-full h-auto object-cover rounded-xl border border-slate-200 shadow-2xl"
           />
        </motion.div>

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
          className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all pr-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">
          {suffix}
        </span>
      </div>
    </div>
  );

  return (
    <section id="calculadora" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-widest">
            Herramienta gratuita
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Simulador de Rentabilidad por Porte
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
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
          className="bg-[#F8FAFC] rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
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
                  className={`rounded-3xl p-6 border-2 transition-colors ${
                    isLoss
                      ? "bg-red-50 border-red-200"
                      : "bg-emerald-50 border-emerald-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {isLoss ? (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Beneficio Neto
                    </span>
                  </div>
                  <p
                    className={`text-3xl sm:text-4xl font-black ${
                      isLoss ? "text-red-600" : "text-emerald-600"
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
                  className={`rounded-3xl p-6 border-2 transition-colors ${
                    isLoss
                      ? "bg-red-50 border-red-200"
                      : "bg-indigo-50 border-indigo-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3
                      className={`w-5 h-5 ${
                        isLoss ? "text-red-500" : "text-indigo-600"
                      }`}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Margen
                    </span>
                  </div>
                  <p
                    className={`text-3xl sm:text-4xl font-black ${
                      isLoss ? "text-red-600" : "text-indigo-700"
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
  return (
    <section id="funcionalidades" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-widest">
            Funcionalidades
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Todo lo que necesita tu flota
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Diseñado específicamente para operadores de transporte español,
            desde autónomos hasta flotas medianas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(30,58,138,0.10)" }}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-100 p-8 cursor-default transition-shadow duration-200 shadow-sm"
              >
                <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {f.description}
                </p>
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
    <section id="precios" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-widest">
            Precios
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Planes simples y transparentes
          </h2>
          <p className="mt-3 text-slate-500 max-w-xl mx-auto">
            Sin costes ocultos. Escala cuando crezcas. Cancela cuando quieras.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className={`relative rounded-3xl p-8 flex flex-col border transition-all duration-300 ${
                plan.popular
                  ? "bg-slate-900 border-indigo-500 shadow-2xl shadow-indigo-900/20 md:-translate-y-4 z-10"
                  : "bg-white border-slate-200 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-5 py-2 rounded-full shadow-md uppercase tracking-wider">
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.popular ? "text-[#F8FAFC]" : "text-slate-900"
                  }`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${
                    plan.popular ? "text-blue-200" : "text-slate-500"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                {plan.price === "Custom" ? (
                  <span
                    className={`text-3xl font-extrabold ${
                      plan.popular ? "text-[#F8FAFC]" : "text-slate-900"
                    }`}
                  >
                    A medida
                  </span>
                ) : (
                  <div className="flex items-end gap-1">
                    <span
                      className={`text-4xl font-extrabold ${
                        plan.popular ? "text-[#F8FAFC]" : "text-slate-900"
                      }`}
                    >
                      {plan.price}€
                    </span>
                    <span
                      className={`text-sm pb-1 ${
                        plan.popular ? "text-blue-200" : "text-slate-500"
                      }`}
                    >
                      /mes
                    </span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.popular ? "bg-blue-600" : "bg-blue-50"
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${
                          plan.popular ? "text-[#F8FAFC]" : "text-blue-700"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-blue-100" : "text-slate-600"
                      }`}
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={APP_URL}
                className={`text-center text-sm font-semibold py-3 rounded-xl transition-all duration-200 ${
                  plan.popular
                    ? "bg-[#F8FAFC] text-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:bg-blue-50"
                    : "bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/20 text-[#F8FAFC] hover:bg-blue-700"
                }`}
              >
                Crear Cuenta
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="AB Logo" className="w-8 h-8 object-contain" />
              <span className="font-bold text-[#F8FAFC] text-sm">AB Logistics OS</span>
            </div>
            <p className="text-sm leading-relaxed">
              Software de gestión de transporte y logística en Galicia.
              Desarrollado en A Coruña.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#F8FAFC] mb-4">Producto</h4>
            <ul className="space-y-2 text-sm">
              {["Funcionalidades", "Precios", "Calculadora ROI", "VeriFactu"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-[#F8FAFC] transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[#F8FAFC] mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#F8FAFC] transition-colors">
                  Aviso Legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F8FAFC] transition-colors">
                  Política de Privacidad (RGPD)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F8FAFC] transition-colors">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="mailto:hola@ablogistics-os.com" className="hover:text-[#F8FAFC] transition-colors">
                  hola@ablogistics-os.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 AB Logistics OS. Todos los derechos reservados.</p>
          <p className="text-slate-500 text-center">
            Software de gestión de transporte y logística en Galicia · Desarrollado en A Coruña
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ROICalculator />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
