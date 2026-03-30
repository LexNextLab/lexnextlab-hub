"use client";

import { useEffect } from "react";

/**
 * Registra o service worker em produção para o Chrome considerar o app instalável
 * (botão “Instalar” na barra de endereço). Em dev o Next costuma conflitar com SW.
 */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {
          /* silencioso — HTTPS obrigatório em produção real */
        });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
  }, []);

  return null;
}
