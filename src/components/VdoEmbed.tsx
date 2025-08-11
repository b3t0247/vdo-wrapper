// VDO.Ninja iframe wrapper
export default function VdoEmbed({ src }: { src: string }) {
  return (
    <iframe
      src={src}
      width="100%"
      height="600"
      allow="camera; microphone; display-capture"
      className="rounded shadow-lg"
    />
  );
}
