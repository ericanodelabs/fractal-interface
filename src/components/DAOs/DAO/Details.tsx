import { useDAOData } from "../../../daoData";
import H1 from "../../ui/H1";

function Details() {
  const [{ name, accessControlAddress, moduleAddresses }] = useDAOData();

  return (
    <div>
      <H1>Details</H1>
      <div>
        <div>name: {name}</div>
        <div>access control address: {accessControlAddress}</div>
        {moduleAddresses?.map((address, index) => (
          <div key={address}>
            Module {index}: {address}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
