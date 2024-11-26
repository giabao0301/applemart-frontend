import { Spinner } from "@nextui-org/react";

type LoadingProps = {
  className?: string;
};

const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={`${className} flex items-center justify-center h-screen -mt-20`}
    >
      <Spinner size="lg" />
    </div>
  );
};

export default Loading;
