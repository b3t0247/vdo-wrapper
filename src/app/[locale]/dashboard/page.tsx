// src/app/[locale]/dashboard/page.tsx
"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { getPushUrl, getViewUrl } from "@/lib/vdoConfig";
import { useClipboard } from "@/lib/useClipboard";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";

const screenshareOptions = [
  "screenshare",
  "cleanoutput",
  "screensharequality=0",
];
const webcamOptions = ["webcam", "cleanoutput"];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const t = useTranslations("dashboard.dashboard");
  const locale = useLocale();

  // Access current theme from wrapper
  const { theme } = useTheme();
  // Convert theme to VDO-compatible darkMode flag
  const forceLightMode = theme === "light"; // true = disable dark mode

  const [screenId, setScreenId] = useState("projector");
  const [camera1Id, setcamera1Id] = useState("camera1");

  const [showQRCode, setShowQRCode] = useState(false);
  const [showWebcamQRCode, setShowWebcamQRCode] = useState(true);

  const { copiedKey, copy } = useClipboard();

  useEffect(() => {
    const saved = localStorage.getItem("screenId");
    if (saved) setScreenId(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("screenId", screenId);
  }, [screenId]);

  // Session guard
  if (status === "loading") {
    return <main className="p-6">Loading session...</main>;
  }

  if (!session) {
    return (
      <main className="p-6 text-red-600">
        Access denied. You are not logged in.
      </main>
    );
  }

  const guestScreenshareLink = getPushUrl(
    screenId,
    screenshareOptions,
    locale,
    forceLightMode,
  );
  const guestWebcamLink = getPushUrl(
    `${screenId}Cam`,
    webcamOptions,
    locale,
    forceLightMode,
  );
  const obsScreenshareLink = getViewUrl(
    screenId,
    screenshareOptions,
    locale,
    forceLightMode,
  );
  const obsWebcamLink = getViewUrl(
    `${screenId}Cam`,
    webcamOptions,
    locale,
    forceLightMode,
  );

  return (
    <main className="p-6">
      {/* <div>Dashboard loaded</div> */}
      <div>
        <h1 className="pb-4 font-medium text-green-600">
          {t("greeting")}, {session?.user?.name}!
        </h1>
      </div>
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4">
        <h1 className="text-foreground text-center text-2xl font-bold">
          {t("welcome")}
        </h1>

        {/* Screenshare Section */}
        <section className="border-border bg-card text-card-foreground rounded border p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            {t("guestScreenshare.title")}
          </h2>

          <div className="space-y-2">
            <label className="block font-medium">
              {t("guestScreenshare.streamId")}
            </label>
            <input
              type="text"
              value={screenId}
              onChange={(e) => setScreenId(e.target.value)}
              className="border-border bg-input text-foreground w-full rounded border px-4 py-2"
            />
          </div>

          <label className="mt-4 block font-medium">
            {t("guestScreenshare.link")}
          </label>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <input
                type="text"
                value={guestScreenshareLink}
                readOnly
                className="border-border bg-input text-foreground w-full rounded border px-4 py-2"
              />
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    window.open(
                      guestScreenshareLink,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className="transiton rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  {t("guestScreenshare.share")}
                </Button>
                <Button
                  onClick={() => copy("guestScreenshare", guestScreenshareLink)}
                  className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                  {copiedKey === "guestScreenshare"
                    ? t("guestScreenshare.copied")
                    : t("guestScreenshare.copy")}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showQRCode}
                  onChange={() => setShowQRCode((prev) => !prev)}
                />
                <label>{t("guestScreenshare.showQr")}</label>
              </div>

              {showQRCode && (
                <div className="animate-fade-in">
                  <QRCodeCanvas value={guestScreenshareLink} size={128} />
                </div>
              )}

              <label className="mt-4 block font-medium">
                {t("guestScreenshare.obsLink")}
              </label>
              <input
                type="text"
                value={obsScreenshareLink}
                readOnly
                className="border-border bg-input text-foreground w-full rounded border px-4 py-2"
              />
              <Button
                onClick={() => copy("obsScreenshare", obsScreenshareLink)}
                className="mt-1 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                {copiedKey === "obsScreenshare"
                  ? t("guestScreenshare.copied")
                  : t("guestScreenshare.copyObs")}
              </Button>
            </div>

            <div className="flex-1">
              <label className="mb-2 block font-medium">
                {t("guestScreenshare.preview")}
              </label>
              <iframe
                src={obsScreenshareLink}
                allow="camera; microphone; display-capture"
                className="border-border h-64 w-full rounded border md:h-80 lg:h-96"
                title="Screenshare Preview"
              />
            </div>
          </div>
        </section>

        {/* Webcam Section */}
        <section className="border-border bg-card text-card-foreground rounded border p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            {t("guestWebcam.title")}
          </h2>

          <div className="space-y-2">
            <label className="block font-medium">
              {t("guestWebcam.streamId")}
            </label>
            <input
              type="text"
              value={camera1Id}
              onChange={(e) => setcamera1Id(e.target.value)}
              className="border-border bg-input text-foreground w-full rounded border px-4 py-2"
            />
          </div>

          <label className="mt-4 block font-medium">
            {t("guestWebcam.link")}
          </label>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <input
                type="text"
                value={guestWebcamLink}
                readOnly
                className="border-border bg-input text-foreground w-full rounded border px-4 py-2"
              />
              <Button
                onClick={() => copy("obsWebcam", guestWebcamLink)}
                className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                {copiedKey === "obsWebcam"
                  ? t("guestWebcam.copied")
                  : t("guestWebcam.copy")}
              </Button>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showWebcamQRCode}
                  onChange={() => setShowWebcamQRCode((prev) => !prev)}
                />
                <label>{t("guestWebcam.showQr")}</label>
              </div>

              {showWebcamQRCode && (
                <div className="animate-fade-in">
                  <QRCodeCanvas value={guestWebcamLink} size={128} />
                </div>
              )}

              <label className="mt-4 block font-medium">
                {t("guestWebcam.obsLink")}
              </label>
              <input
                type="text"
                value={obsWebcamLink}
                readOnly
                className="border-border bg-input text-foreground w-full rounded border px-4 py-2"
              />
              <Button
                onClick={() => copy("obsScreenshare", obsWebcamLink)}
                className="mt-1 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                {copiedKey === "obsScreenshare"
                  ? t("guestWebcam.copied")
                  : t("guestWebcam.copyObs")}
              </Button>
            </div>

            <div className="flex-1">
              <label className="mb-2 block font-medium">
                {t("guestWebcam.preview")}
              </label>
              <iframe
                src={obsWebcamLink}
                allow="camera; microphone; display-capture"
                className="border-border h-64 w-full rounded border md:h-80 lg:h-96"
                title="Webcam Preview"
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
