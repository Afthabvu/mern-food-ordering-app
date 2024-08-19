import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultsInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span>
        {total} {total>1?"Restaurants":"Restaurant"} found in {city}
        <Link
          to={"/"}
          className=" ml-1 text-sm  font-semibold underline cursor-pointer text-blue-500"
        >
          Change location
        </Link>
      </span>
      dropdown here
    </div>
  );
};

export default SearchResultsInfo;