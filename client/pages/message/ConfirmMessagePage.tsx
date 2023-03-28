import { BigNumber } from "ethers";
import MessageCard from "../../components/card/MessageCard";
import Layout from "../../components/layout/Layout";
import { useMessengerContract } from "../../hooks/useMessengerContract";
import { useWallet } from "../../hooks/useWallet";
import RequireWallet from "../../components/layout/RequireWallet";

export default function ConfirmMessagePage() {
  const { currentAccount, connectWallet } = useWallet();
  const { ownMessages, processing, acceptMessage, denyMessage } =
    useMessengerContract({
      currentAccount: currentAccount,
    });

  return (
    <Layout>
      <RequireWallet
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      >
        {processing && <div>processing...</div>}
        {ownMessages.map((message, index) => {
          return (
            <div key={index}>
              <MessageCard
                message={message}
                onClickAccept={() => {
                  acceptMessage(BigNumber.from(index));
                }}
                onClickDeny={() => {
                  denyMessage(BigNumber.from(index));
                }}
              />
            </div>
          );
        })}
      </RequireWallet>
    </Layout>
  );
}
