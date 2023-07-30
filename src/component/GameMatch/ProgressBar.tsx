export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className=" w-full h-14 bg-sky rounded-full">
      <div
        className="top-0 left-0 h-full bg-[#97D2DD] rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
