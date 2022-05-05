import { ProposalData } from "../../../../contexts/daoData/useProposals";
import useQueueTransaction from "../../../../contexts/daoData/useQueueTransaction";
import { PrimaryButton } from "../../../ui/forms/Button";

function ProposalQueue({ proposal }: { proposal: ProposalData }) {
  const queueTransaction = useQueueTransaction({
    proposalData: proposal,
  });

  if (proposal.stateString !== "Succeeded") {
    return null;
  }

  return (
    <div className="flex border-1 items-center m-2 bg-gray-600 py-2 rounded-md">
      <div className="align-middle text-gray-25 mx-4">Proposal has succeeded and ready to queue</div>
      <div className="flex flex-grow justify-end mx-4">
        <PrimaryButton label="Queue Proposal" onClick={queueTransaction} />
      </div>
    </div>
  );
}

export default ProposalQueue;
