"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    price: "49",
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
    price: "129",
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
    price: "Custom",
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
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
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
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
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
              className="text-sm font-semibold bg-blue-800 text-white rounded-xl px-4 py-2 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
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
            className="md:hidden bg-white border-b border-slate-100 px-4 pb-4 overflow-hidden"
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
                className="mt-2 text-center text-sm font-semibold bg-blue-800 text-white rounded-xl px-4 py-2.5"
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
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-16">
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
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-4xl mx-auto"
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
            className="inline-flex items-center gap-2 bg-blue-800 hover:bg-blue-700 text-white font-semibold text-sm px-7 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            Empezar Prueba Gratuita
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="mailto:hola@ablogistics-os.com"
            className="inline-flex items-center gap-2 text-blue-800 font-semibold text-sm px-7 py-3.5 rounded-2xl border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
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
          {["Sin tarjeta de crédito", "14 días gratis", "Cancela cuando quieras"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-green-500" />
              {t}
            </span>
          ))}
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
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all pr-10"
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
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
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
  return (
    <section id="funcionalidades" className="py-24 bg-white">
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
                className="bg-white rounded-2xl border border-slate-100 p-8 cursor-default transition-shadow duration-200 shadow-sm"
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

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className={`relative rounded-2xl p-8 flex flex-col border transition-shadow duration-200 ${
                plan.popular
                  ? "bg-blue-800 border-blue-700 shadow-lg shadow-blue-900/20"
                  : "bg-white border-slate-100 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.popular ? "text-white" : "text-slate-900"
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
                      plan.popular ? "text-white" : "text-slate-900"
                    }`}
                  >
                    A medida
                  </span>
                ) : (
                  <div className="flex items-end gap-1">
                    <span
                      className={`text-4xl font-extrabold ${
                        plan.popular ? "text-white" : "text-slate-900"
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
                          plan.popular ? "text-white" : "text-blue-700"
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
                    ? "bg-white text-blue-800 hover:bg-blue-50"
                    : "bg-blue-800 text-white hover:bg-blue-700"
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
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white text-sm">AB Logistics OS</span>
            </div>
            <p className="text-sm leading-relaxed">
              Software de gestión de transporte y logística en Galicia.
              Desarrollado en A Coruña.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Producto</h4>
            <ul className="space-y-2 text-sm">
              {["Funcionalidades", "Precios", "Calculadora ROI", "VeriFactu"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Aviso Legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Política de Privacidad (RGPD)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="mailto:hola@ablogistics-os.com" className="hover:text-white transition-colors">
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
