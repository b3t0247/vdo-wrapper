export const VDO_BASE_URL =
  process.env.NEXT_PUBLIC_VDO_URL || "https://vdo.ninja";

/**
 * Generates a VDO.Ninja push link.
 * - Includes `&darkmode=0` to force light mode.
 * - Omits `darkmode` entirely to allow dark mode (default behavior).
 */
export const getPushUrl = (
  id: string,
  options: string[] = [],
  locale?: string,
  forceLightMode?: boolean, // renamed for clarity
) =>
  `${VDO_BASE_URL}/?push=${id}${options.length ? "&" + options.join("&") : ""}${
    locale ? `&language=${locale}` : ""
  }${forceLightMode ? "&darkmode=0" : ""}`;

/**
 * Generates a VDO.Ninja view link.
 * Same dark mode logic as above.
 */
export const getViewUrl = (
  id: string,
  options: string[] = [],
  locale?: string,
  forceLightMode?: boolean,
) =>
  `${VDO_BASE_URL}/?view=${id}${options.length ? "&" + options.join("&") : ""}${
    locale ? `&language=${locale}` : ""
  }${forceLightMode ? "&darkmode=0" : ""}`;
