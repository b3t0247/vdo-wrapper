// src/lib/vdoConfig.ts

export const VDO_BASE_URL =
  process.env.NEXT_PUBLIC_VDO_URL || "https://vdo.ninja";

export const getPushUrl = (id: string, options: string[] = []) =>
  `${VDO_BASE_URL}/?push=${id}${options.length ? "&" + options.join("&") : ""}`;

export const getViewUrl = (id: string, options: string[] = []) =>
  `${VDO_BASE_URL}/?view=${id}${options.length ? "&" + options.join("&") : ""}`;
