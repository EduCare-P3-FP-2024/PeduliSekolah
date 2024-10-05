import SchoolPageAll from "@/components/SchoolPage";
import { UserSchools } from "@/utils/types";
import { ObjectId } from "mongodb";

const SchoolPage = () => {
  const schoolData: UserSchools[] = [
    {
      _id: new ObjectId("66ff8d2540b967ae37803f23"),
      username: "SMAN 90 PARUNG",
      email: "mamang@gmail.com",
      phone_number: "08124124",
      status: "Jl. Aja dulu",
    },
    {
      _id: new ObjectId("66ff8d2540b967ae37803f95"),
      username: "SMAN 100 JAKARTA",
      email: "ffznrr20@gmailc.om",
      phone_number: "08123456",
      status: "Jl. Jalan Terus",
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
