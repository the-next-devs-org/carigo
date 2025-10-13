import { useState } from "react";
import SearchNewVehicle from "../../components/models/SearchVehicleModal";
import VehiclesTable from "../../components/vehiclesTable/VehiclesTable";

const VehicleSearch = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSuccess = () => {
    setShowAddModal(false);
  };

  return (
    <div className="lg:p-6 p-4 max-w-full mx-auto font-plus-jakarta">
      <VehiclesTable showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
      <SearchNewVehicle
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default VehicleSearch;
