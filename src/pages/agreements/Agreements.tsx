import AgreementStats from "../../components/Agreements/agreementStats/AgreementStats";
import AllAgreements from "../../components/Agreements/allAgreements/AllAgreements";

const Agreements = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <AgreementStats />
      <AllAgreements />
    </div>
  );
};

export default Agreements;
