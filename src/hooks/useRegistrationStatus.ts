import { useState, useEffect } from "react";
import { EVENT_CONFIG } from "../config/constants";

export interface RegistrationStatusHook {
  isClosed: boolean;
  isSpecialSlotOpen: boolean;
  remaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  totalRemainingMs: number;
}

export const useRegistrationStatus = (): RegistrationStatusHook => {
  const [status, setStatus] = useState<RegistrationStatusHook>(() => {
    return calculateStatus();
  });

  function calculateStatus(): RegistrationStatusHook {
    if (typeof window !== "undefined") {
      const search = new URLSearchParams(window.location.search);
      if (search.get("closed") === "true") {
        return {
          isClosed: true,
          isSpecialSlotOpen: false,
          remaining: { days: 0, hours: 0, minutes: 0, seconds: 0 },
          totalRemainingMs: 0
        };
      }
      if (search.get("open") === "true") {
        return {
          isClosed: false,
          isSpecialSlotOpen: true,
          remaining: { days: 0, hours: 12, minutes: 30, seconds: 0 },
          totalRemainingMs: 45000000
        };
      }
    }

    const deadline = new Date(EVENT_CONFIG.REGISTRATION_DEADLINE).getTime();
    const now = Date.now();
    const diff = deadline - now;
    const isClosed = EVENT_CONFIG.FORCE_REGISTRATION_CLOSED || diff <= 0;

    if (isClosed) {
      return {
        isClosed: true,
        isSpecialSlotOpen: EVENT_CONFIG.ALLOW_ONE_FINAL_TEAM,
        remaining: { days: 0, hours: 0, minutes: 0, seconds: 0 },
        totalRemainingMs: 0
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      isClosed: false,
      isSpecialSlotOpen: false,
      remaining: { days, hours, minutes, seconds },
      totalRemainingMs: diff
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(calculateStatus());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return status;
};
