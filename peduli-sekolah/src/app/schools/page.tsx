import SchoolPageAll from "@/components/SchoolPage";
import { SchoolProfile } from "@/utils/types";
import { ObjectId } from "mongodb";

const SchoolPage = () => {
  const schoolData: SchoolProfile[] = [
    {
      name: "SMAN 90 PARUNG",
      email: "mamang@gmail.com",
      phoneNumber: "08124124",
      location: "Jl. Aja dulu",
      status: "Layak",
    },
    {
      name: "SMAN 100 JAKARTA",
      email: "ffznrr20@gmailc.om",
      phoneNumber: "08123456",
      location: "Jl. Jalan Terus",
      status: "Tidak Layak",
    },
  ];
  return (
    <>
      <div className="w-full bg-white p-5">
        <SchoolPageAll schoolData={schoolData} />
      </div>
    </>
  );
};

export default SchoolPage;
