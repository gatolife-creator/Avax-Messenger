import hre, { ethers } from "hardhat";
import { Overrides } from "ethers";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"

describe("Messenger", () => {
    async function deployContract() {
        const [owner, otherAccount] = await ethers.getSigners();

        const numOfPendingLimits = 10;
        const funds = 100;
        const Messenger = await hre.ethers.getContractFactory("Messenger");
        const messenger = await Messenger.deploy(numOfPendingLimits, {
            value: funds
        } as Overrides);

        return { messenger, numOfPendingLimits, funds, owner, otherAccount };
    }

    describe("Deployment", () => {
        it("Should set the right number of pending message limits", async () => {
            const { messenger, numOfPendingLimits } = await loadFixture(deployContract);

            expect(await messenger.numOfPendingLimits()).to.equal(numOfPendingLimits);
        })

        it("Should set the right owner", async () => {
            const { messenger, owner } = await loadFixture(deployContract);
            expect(await messenger.owner()).to.equal(owner.address);
        })
    })

    describe("Change limits", async () => {
        it("Should revert with the right error if called by other account", async () => {
            const { messenger, otherAccount } = await loadFixture(deployContract);
            await expect(messenger.connect(otherAccount).changeNumOfPendingLimits(5)).to.be.rejectedWith("You aren't the owner");
        })

        it("Should set the right number of pending limits after change", async () => {
            const { messenger, numOfPendingLimits } = await loadFixture(deployContract);
            const newLimits = numOfPendingLimits + 1;
            await messenger.changeNumOfPendingLimits(newLimits);
            expect(await messenger.numOfPendingLimits()).to.equal(newLimits);
        })

        it("Should emit an event on change limits", async () => {
            const { messenger } = await loadFixture(deployContract);
            await expect(messenger.changeNumOfPendingLimits(10)).to.emit(
                messenger,
                "NumOfPendingLimitsChanged"
            )
        })
    })

    describe("Post", () => {
        it("Should emit an event on post", async () => {
            const { messenger, otherAccount } = await loadFixture(deployContract);

            await expect(
                messenger.post("text", otherAccount.address, { value: 1 })
            ).to.emit(messenger, "NewMessage");
        })

        it("Should send the correct amount of tokens", async () => {
            const { messenger, owner, otherAccount } = await loadFixture(deployContract);
            const test_deposit = 10;

            await expect(messenger.post("text", otherAccount.address, {
                value: test_deposit
            })).to.changeEtherBalances(
                [owner, messenger],
                [-test_deposit, test_deposit]
            )
        })

        it("Should set the right message", async () => {
            const { messenger, owner, otherAccount } = await loadFixture(deployContract);
            const test_deposit = 1;
            const test_text = "text";

            await messenger.post(test_text, otherAccount.address, {
                value: test_deposit
            })

            const messages = await messenger.connect(otherAccount).getOwnMessages();
            const message = messages[0];
            expect(message.depositInWei).to.equal(test_deposit);
            expect(message.text).to.equal(test_text);
            expect(message.isPending).to.equal(true);
            expect(message.sender).to.equal(owner.address);
            expect(message.receiver).to.equal(otherAccount.address);
        })

        it("Should revert with the right error if exceed number of pending limits", async () => {
            const { messenger, otherAccount, numOfPendingLimits } = await loadFixture(deployContract);

            for (let cnt = 0; cnt < numOfPendingLimits; cnt++) {
                await messenger.post("dummy", otherAccount.address);
            }

            await expect(
                messenger.post("exceed", otherAccount.address)
            ).to.be.revertedWith(
                "The receiver has reached the number of pending limits"
            )
        })
    })

    describe("Accept", async () => {
        it("Should emit an event on accept", async function () {
            const { messenger, otherAccount } = await loadFixture(deployContract);
            const test_deposit = 1;

            await messenger.post("text", otherAccount.address, {
                value: test_deposit,
            });

            const first_index = 0;
            await expect(messenger.connect(otherAccount).accept(first_index)).to.emit(
                messenger,
                "MessageConfirmed"
            );
        });

        it("Pending must be changed", async () => {
            const { messenger, otherAccount } = await loadFixture(deployContract);
            const first_index = 0;

            await messenger.post("text", otherAccount.address);
            let messages = await messenger.connect(otherAccount).getOwnMessages();
            expect(messages[first_index].isPending).to.equal(true);

            await messenger.connect(otherAccount).accept(first_index);
            messages = await messenger.connect(otherAccount).getOwnMessages();
            expect(messages[first_index].isPending).to.equal(false);
        })

        it("Should send the correct amount of tokens", async () => {
            const { messenger, otherAccount } = await loadFixture(deployContract);
            const test_deposit = 10;

            await messenger.post("text", otherAccount.address, {
                value: test_deposit,
            });

            const first_index = 0;
            await expect(
                messenger.connect(otherAccount).accept(first_index)
            ).to.changeEtherBalances(
                [messenger, otherAccount],
                [-test_deposit, test_deposit]
            )
        })

        it("Should revert with the right error if called in duplicate", async () => {
            const { messenger, otherAccount } = await loadFixture(deployContract);

            await messenger.post("text", otherAccount.address, { value: 1 });
            await messenger.connect(otherAccount).accept(0);
            await expect(messenger.connect(otherAccount).accept(0)).to.be.revertedWith("This message has already been confirmed")
        })

        describe("Deny", () => {
            it("Should emit an event on deny", async function () {
                const { messenger, otherAccount } = await loadFixture(deployContract);
                const test_deposit = 1;

                await messenger.post("text", otherAccount.address, {
                    value: test_deposit,
                });

                const first_index = 0;
                await expect(messenger.connect(otherAccount).deny(first_index)).to.emit(
                    messenger,
                    "MessageConfirmed"
                );
            });

            it("isPending must be changed", async () => {
                const { messenger, otherAccount } = await loadFixture(deployContract);
                const first_index = 0;

                await messenger.post("text", otherAccount.address);
                let messages = await messenger.connect(otherAccount).getOwnMessages();
                expect(messages[0].isPending).to.equal(true);

                await messenger.connect(otherAccount).deny(first_index);
                messages = await messenger.connect(otherAccount).getOwnMessages();
                expect(messages[0].isPending).to.equal(false);
            })

            it("Should send the right amount of tokens", async () => {
                const { messenger, owner, otherAccount } = await loadFixture(deployContract);

                const test_deposit = 10;

                await messenger.post("text", otherAccount.address, { value: test_deposit });
                const first_index = 0;

                await expect(
                    messenger.connect(otherAccount).deny(first_index)
                ).to.changeEtherBalances(
                    [messenger, owner],
                    [-test_deposit, test_deposit]
                );
            })

            it("Should revert with the right error if called in duplicate", async () => {
                const { messenger, otherAccount } = await loadFixture(deployContract);

                await messenger.post("text", otherAccount.address, { value: 1 });
                await messenger.connect(otherAccount).deny(0);
                await expect(messenger.connect(otherAccount).deny(0)).to.be.revertedWith("This message has already been confirmed");
            })
        })
    })
})