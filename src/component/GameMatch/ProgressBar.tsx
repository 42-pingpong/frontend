export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className='relative w-full h-20 mb-2 bg-sky rounded-full'>
      <div
        className='absolute top-0 left-0 h-full bg-[#97D2DD] rounded-full'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};