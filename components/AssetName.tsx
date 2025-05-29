import Image from "next/image";

const AssetName = ({
  name,
  symbol,
  image,
}: {
  name: string;
  symbol: string;
  image: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-8 w-8 overflow-hidden rounded-full">
        {image && (
          <Image
            src={image}
            alt={name || ""}
            fill
            sizes="32px"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-base font-normal text-secondary-foreground">
          {name}
        </span>
        <span className="text-xs text-muted-foreground">{symbol}</span>
      </div>
    </div>
  );
};

export default AssetName;
