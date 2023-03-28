import { useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import abi from "../utils/Messenger.json";
import { getEthereum } from "../utils/ethereum";
import { Messenger as MessengerType } from "../typechain-types";

const contractAddress = "0x6336Ee3E015C7F88f8D6cB541598F9559303a9f4";
const contractABI = abi.abi;

export type Message = {
    sender: string;
    receiver: string;
    depositInWei: BigNumber;
    timestamp: Date;
    text: string;
    isPending: boolean;
};

type PropsSendMessage = {
    text: string;
    receiver: string;
    tokenInEther: string;
};

type ReturnUseMessengerContract = {
    processing: boolean;
    ownMessages: Message[];
    owner: string | undefined;
    numOfPendingLimits: BigNumber | undefined;
    sendMessage: (props: PropsSendMessage) => void;
    acceptMessage: (index: BigNumber) => void;
    denyMessage: (index: BigNumber) => void;
    changeNumOfPendingLimits: (limits: BigNumber) => void;
};

type PropsUseMessengerContract = {
    currentAccount: string | undefined;
}

export const useMessengerContract = ({
    currentAccount,
}: PropsUseMessengerContract): ReturnUseMessengerContract => {
    const [processing, setProcessing] = useState<boolean>(false);
    const [messengerContract, setMessengerContract] = useState<MessengerType>();
    const [ownMessages, setOwnMessages] = useState<Message[]>([]);

    const [owner, setOwner] = useState<string>();
    const [numOfPendingLimits, setNumOfPendingLimits] = useState<BigNumber>();

    const ethereum = getEthereum();

    async function getMessengerContract() {
        try {
            if (ethereum) {
                // @ts-ignore: ethereum as ethers.providers.ExternalProvider
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = await provider.getSigner();
                const MessengerContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                ) as unknown;
                setMessengerContract(MessengerContract as MessengerType);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function getOwnMessages() {
        if (!messengerContract) return;
        try {
            const OwnMessages = await messengerContract.getOwnMessages();
            const messagesCleaned: Message[] = OwnMessages.map((message) => {
                return {
                    sender: message.sender,
                    receiver: message.receiver,
                    depositInWei: message.depositInWei,
                    timestamp: new Date(message.timestamp.toNumber() * 1000),
                    text: message.text,
                    isPending: message.isPending
                }
            });
            setOwnMessages(messagesCleaned);
        } catch (err) {
            console.log(err);
        }
    }

    async function sendMessage({
        text,
        receiver,
        tokenInEther
    }: PropsSendMessage) {
        if (!messengerContract) return;
        try {
            const tokenInWei = ethers.utils.parseEther(tokenInEther);
            console.log(
                "call post with receiver:[%s], token:[%s]",
                receiver,
                tokenInWei.toString()
            );
            const txn = await messengerContract.post(text, receiver, {
                gasLimit: 300000,
                value: tokenInWei
            });
            console.log("Processing...", txn.hash);
            setProcessing(true);
            await txn.wait();
            console.log("Done -- ", txn.hash);
            setProcessing(false);
        } catch (err) {
            console.log(err);
            alert("Failed to send message. Oh nyo~!")
        }
    }

    async function acceptMessage(index: BigNumber) {
        if (!messengerContract) return;
        try {
            console.log("call accept with index [%d]", index);
            const txn = await messengerContract.accept(index, {
                gasLimit: 300000
            });
            console.log("Processing...", txn.hash);
            setProcessing(true);
            await txn.wait();
            console.log("Done -- ", txn.hash);
            setProcessing(false);
        } catch (err) {
            console.log(err);
        }
    }

    async function denyMessage(index: BigNumber) {
        if (!messengerContract) return;
        try {
            console.log("call deny with index [%d]", index);
            const txn = await messengerContract.deny(index, {
                gasLimit: 300000
            });
            console.log("Processing...", txn.hash);
            setProcessing(true);
            await txn.wait();
            console.log("Done -- ", txn.hash);
            setProcessing(false);
        } catch (err) {
            console.log(err);
        }
    }

    async function getOwner() {
        if (!messengerContract) return;
        try {
            console.log("call getter of owner");
            const owner = await messengerContract.owner();
            setOwner(owner.toLowerCase());
        } catch (err) {
            console.log(err);
        }
    }

    async function getNumOfPendingLimits() {
        if (!messengerContract) return;
        try {
            console.log("call getter of numOfPendingLimits");
            const limits = await messengerContract.numOfPendingLimits();
            setNumOfPendingLimits(limits);
        } catch (error) {
            console.log(error);
        }
    }

    async function changeNumOfPendingLimits(limits: BigNumber) {
        if (!messengerContract) return;
        try {
            console.log("call changeNumOfPendingLimits with [%d]", limits.toNumber());
            const txn = await messengerContract.changeNumOfPendingLimits(limits, {
                gasLimit: 300000,
            });
            console.log("Processing...", txn.hash);
            setProcessing(true);
            await txn.wait();
            console.log("Done -- ", txn.hash);
            setProcessing(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMessengerContract();
        getOwnMessages();
        getOwner();
        getNumOfPendingLimits();
    }, [currentAccount, ethereum]);

    useEffect(() => {
        const onNewMessage = (
            sender: string,
            receiver: string,
            depositInWei: BigNumber,
            timestamp: Date,
            text: string,
            isPending: boolean
        ) => {
            console.log("NewMessage from %s to %s", sender, receiver);
            if (receiver.toLocaleLowerCase() === currentAccount) {
                setOwnMessages((prevState) => [
                    ...prevState,
                    {
                        sender: sender,
                        receiver: receiver,
                        depositInWei: depositInWei,
                        timestamp: new Date(timestamp.toString()),
                        text: text,
                        isPending: isPending,
                    },
                ]);
            }
        }

        const onMessageConfirmed = (receiver: string, index: BigNumber) => {
            console.log(
                "MessageConfirmed index:[%d] receiver: [%s]",
                index.toNumber(),
                receiver
            );
            if (receiver.toLocaleLowerCase() === currentAccount) {
                setOwnMessages((prevState) => {
                    prevState[index.toNumber()].isPending = false;
                    return [...prevState];
                });
            }
        }

        const onNumOfPendingLimitsChanged = (limitsChanged: BigNumber) => {
            console.log(
                "NumOfPendingLimitsChanged limits:[%d]",
                limitsChanged.toNumber()
            );
            setNumOfPendingLimits(limitsChanged);
        }

        if (messengerContract) {
            messengerContract.on("NewMessage", onNewMessage);
            messengerContract.on("MessageConfirmed", onMessageConfirmed);

            messengerContract.on(
                "NumOfPendingLimitsChanged",
                onNumOfPendingLimitsChanged
            )
        }

        return () => {
            if (messengerContract) {
                messengerContract.off("NewMessage", onNewMessage);
                messengerContract.off("MessageConfirmed", onMessageConfirmed);

                messengerContract.off("NumOfPendingLimitsChanged", onNumOfPendingLimitsChanged);
            }
        }
    }, [messengerContract]);

    return {
        processing,
        ownMessages,
        owner,
        numOfPendingLimits,
        sendMessage,
        acceptMessage,
        denyMessage,
        changeNumOfPendingLimits,
    }
}