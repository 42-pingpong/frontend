interface Props {
  title: string;
}

export const ProfileInfoTitle = (props: Props) => {
  const { title } = props;
  return (
    <span className="text-[1.2rem] font-bold text-center mb-3 text-borderBlue">
      {title}
    </span>
  );
};
