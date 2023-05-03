import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  bg?: string;

  bgImage?: string;
  link: string;
};

const MenuCard = (props: Props) => {
  return (
    <Link href={props.link}>
      <div className="h-32 w-32 ">
        <div
          style={{
            background: props.bgImage ? "none" : props.bg,
          }}
          className={`relative flex h-full w-full flex-col items-start justify-between overflow-hidden rounded-lg p-3 shadow-md `}
        >
          <h3 className="z-10 text-lg font-semibold ">{props.title}</h3>

          {props.bgImage && (
            <Image
              className="absolute top-0 left-0 h-full   w-full object-cover  "
              width={200}
              height={200}
              alt="card image"
              src={props.bgImage}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;
