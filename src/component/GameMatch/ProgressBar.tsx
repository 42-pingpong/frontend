export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="flex w-full h-14 bg-sky rounded-full">
      <div
        className="flex h-full bg-progressBlue rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
