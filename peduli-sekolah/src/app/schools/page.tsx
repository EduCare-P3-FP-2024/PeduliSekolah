import SchoolPageAll from "@/components/SchoolPage";
import { SchoolProfile } from "@/utils/types";
import { getSchools } from "./action";

const SchoolPage = async () => {
  const schoolData = await getSchools();

  return (
    <>
      <div className="w-full bg-white p-5">
        <SchoolPageAll schoolData={schoolData} />
      </div>
    </>
  );
};

export default SchoolPage;
