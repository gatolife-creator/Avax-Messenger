/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
  BigNumberish,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Messenger, MessengerInterface } from "../Messenger";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_numOfPendingLimits",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "MessageConfirmed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositInWei",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "text",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPending",
        type: "bool",
      },
    ],
    name: "NewMessage",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "limits",
        type: "uint256",
      },
    ],
    name: "NumOfPendingLimitsChanged",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "accept",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_limits",
        type: "uint256",
      },
    ],
    name: "changeNumOfPendingLimits",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "deny",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwnMessages",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "depositInWei",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "text",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isPending",
            type: "bool",
          },
        ],
        internalType: "struct Messenger.Message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numOfPendingLimits",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_text",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "post",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260405162001fb738038062001fb78339818101604052810190620000299190620001e0565b620000746040518060400160405280602081526020017f48657265206973206d7920666972737420736d61727420636f6e7472616374218152506200009260201b62000bfe1760201c565b620000846200013560201b60201c565b8060018190555050620002d0565b6200013281604051602401620000a99190620002ac565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506200017760201b60201c565b50565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b600080fd5b6000819050919050565b620001ba81620001a5565b8114620001c657600080fd5b50565b600081519050620001da81620001af565b92915050565b600060208284031215620001f957620001f8620001a0565b5b60006200020984828501620001c9565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156200024e57808201518184015260208101905062000231565b60008484015250505050565b6000601f19601f8301169050919050565b6000620002788262000212565b6200028481856200021d565b9350620002968185602086016200022e565b620002a1816200025a565b840191505092915050565b60006020820190508181036000830152620002c881846200026b565b905092915050565b611cd780620002e06000396000f3fe6080604052600436106100705760003560e01c806356f662821161004e57806356f66282146100e5578063837106bb1461010e5780638da5cb5b14610137578063acdb8efd1461016257610070565b806313e262711461007557806319b05f491461009157806339869bc3146100ba575b600080fd5b61008f600480360381019061008a9190611139565b61018d565b005b34801561009d57600080fd5b506100b860048036038101906100b391906111cb565b61048c565b005b3480156100c657600080fd5b506100cf6106c3565b6040516100dc9190611207565b60405180910390f35b3480156100f157600080fd5b5061010c600480360381019061010791906111cb565b6106c9565b005b34801561011a57600080fd5b50610135600480360381019061013091906111cb565b610900565b005b34801561014357600080fd5b5061014c6109d1565b6040516101599190611243565b60405180910390f35b34801561016e57600080fd5b506101776109f5565b6040516101849190611461565b60405180910390f35b600154600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410610210576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161020790611506565b60405180910390fd5b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546102609190611555565b925050819055506102a86040518060400160405280601d81526020017f257320706f73747320746578743a5b25735d20746f6b656e3a5b25645d000000815250338434610c97565b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff16815260200134815260200142815260200184815260200160011515815250908060018154018082558091505060019003906000526020600020906006020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604082015181600201556060820151816003015560808201518160040190816104239190611795565b5060a08201518160050160006101000a81548160ff02191690831515021790555050507f6b8f49facd5e00a27899ac1ac6cd3edeb40299f83f03eac03a0c04e7a90590963382344286600160405161048096959493929190611904565b60405180910390a15050565b61049581610d39565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082815481106104e8576104e761196c565b5b90600052602060002090600602016040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160028201548152602001600382015481526020016004820180546105d1906115b8565b80601f01602080910402602001604051908101604052809291908181526020018280546105fd906115b8565b801561064a5780601f1061061f5761010080835404028352916020019161064a565b820191906000526020600020905b81548152906001019060200180831161062d57829003601f168201915b505050505081526020016005820160009054906101000a900460ff161515151581525050905061068281602001518260400151610ea7565b7f2657c0f1a183b8a175f4cf6c3f6d7764c7265155fc9635682baad3cedd67d2878160200151836040516106b792919061199b565b60405180910390a15050565b60015481565b6106d281610d39565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002082815481106107255761072461196c565b5b90600052602060002090600602016040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201805461080e906115b8565b80601f016020809104026020016040519081016040528092919081815260200182805461083a906115b8565b80156108875780601f1061085c57610100808354040283529160200191610887565b820191906000526020600020905b81548152906001019060200180831161086a57829003601f168201915b505050505081526020016005820160009054906101000a900460ff16151515158152505090506108bf81600001518260400151610ea7565b7f2657c0f1a183b8a175f4cf6c3f6d7764c7265155fc9635682baad3cedd67d2878160200151836040516108f492919061199b565b60405180910390a15050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461098e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161098590611a10565b60405180910390fd5b806001819055507ff4add848113971c4866581c1df1951b8665a05140021ce0d344d1e823b8133c86001546040516109c69190611207565b60405180910390a150565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6060600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b82821015610bf557838290600052602060002090600602016040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815260200160038201548152602001600482018054610b49906115b8565b80601f0160208091040260200160405190810160405280929190818152602001828054610b75906115b8565b8015610bc25780601f10610b9757610100808354040283529160200191610bc2565b820191906000526020600020905b815481529060010190602001808311610ba557829003601f168201915b505050505081526020016005820160009054906101000a900460ff16151515158152505081526020019060010190610a56565b50505050905090565b610c9481604051602401610c129190611a30565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610f58565b50565b610d3384848484604051602401610cb19493929190611a52565b6040516020818303038152906040527f91d1112e000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610f58565b50505050565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110610d8c57610d8b61196c565b5b906000526020600020906006020190508060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610e2e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e2590611b17565b60405180910390fd5b600115158160050160009054906101000a900460ff16151514610e86576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e7d90611ba9565b60405180910390fd5b60008160050160006101000a81548160ff0219169083151502179055505050565b60008273ffffffffffffffffffffffffffffffffffffffff1682604051610ecd90611bfa565b60006040518083038185875af1925050503d8060008114610f0a576040519150601f19603f3d011682016040523d82523d6000602084013e610f0f565b606091505b5050905080610f53576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f4a90611c81565b60405180910390fd5b505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610fe882610f9f565b810181811067ffffffffffffffff8211171561100757611006610fb0565b5b80604052505050565b600061101a610f81565b90506110268282610fdf565b919050565b600067ffffffffffffffff82111561104657611045610fb0565b5b61104f82610f9f565b9050602081019050919050565b82818337600083830152505050565b600061107e6110798461102b565b611010565b90508281526020810184848401111561109a57611099610f9a565b5b6110a584828561105c565b509392505050565b600082601f8301126110c2576110c1610f95565b5b81356110d284826020860161106b565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611106826110db565b9050919050565b611116816110fb565b811461112157600080fd5b50565b6000813590506111338161110d565b92915050565b600080604083850312156111505761114f610f8b565b5b600083013567ffffffffffffffff81111561116e5761116d610f90565b5b61117a858286016110ad565b925050602061118b85828601611124565b9150509250929050565b6000819050919050565b6111a881611195565b81146111b357600080fd5b50565b6000813590506111c58161119f565b92915050565b6000602082840312156111e1576111e0610f8b565b5b60006111ef848285016111b6565b91505092915050565b61120181611195565b82525050565b600060208201905061121c60008301846111f8565b92915050565b600061122d826110db565b9050919050565b61123d81611222565b82525050565b60006020820190506112586000830184611234565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b611293816110fb565b82525050565b6112a281611195565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b838110156112e25780820151818401526020810190506112c7565b60008484015250505050565b60006112f9826112a8565b61130381856112b3565b93506113138185602086016112c4565b61131c81610f9f565b840191505092915050565b60008115159050919050565b61133c81611327565b82525050565b600060c08301600083015161135a600086018261128a565b50602083015161136d602086018261128a565b5060408301516113806040860182611299565b5060608301516113936060860182611299565b50608083015184820360808601526113ab82826112ee565b91505060a08301516113c060a0860182611333565b508091505092915050565b60006113d78383611342565b905092915050565b6000602082019050919050565b60006113f78261125e565b6114018185611269565b9350836020820285016114138561127a565b8060005b8581101561144f578484038952815161143085826113cb565b945061143b836113df565b925060208a01995050600181019050611417565b50829750879550505050505092915050565b6000602082019050818103600083015261147b81846113ec565b905092915050565b600082825260208201905092915050565b7f54686520726563656976657220686173207265616368656420746865206e756d60008201527f626572206f662070656e64696e67206c696d6974730000000000000000000000602082015250565b60006114f0603583611483565b91506114fb82611494565b604082019050919050565b6000602082019050818103600083015261151f816114e3565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061156082611195565b915061156b83611195565b925082820190508082111561158357611582611526565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806115d057607f821691505b6020821081036115e3576115e2611589565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261164b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261160e565b611655868361160e565b95508019841693508086168417925050509392505050565b6000819050919050565b600061169261168d61168884611195565b61166d565b611195565b9050919050565b6000819050919050565b6116ac83611677565b6116c06116b882611699565b84845461161b565b825550505050565b600090565b6116d56116c8565b6116e08184846116a3565b505050565b5b81811015611704576116f96000826116cd565b6001810190506116e6565b5050565b601f8211156117495761171a816115e9565b611723846115fe565b81016020851015611732578190505b61174661173e856115fe565b8301826116e5565b50505b505050565b600082821c905092915050565b600061176c6000198460080261174e565b1980831691505092915050565b6000611785838361175b565b9150826002028217905092915050565b61179e826112a8565b67ffffffffffffffff8111156117b7576117b6610fb0565b5b6117c182546115b8565b6117cc828285611708565b600060209050601f8311600181146117ff57600084156117ed578287015190505b6117f78582611779565b86555061185f565b601f19841661180d866115e9565b60005b8281101561183557848901518255600182019150602085019450602081019050611810565b86831015611852578489015161184e601f89168261175b565b8355505b6001600288020188555050505b505050505050565b600061188261187d611878846110db565b61166d565b6110db565b9050919050565b600061189482611867565b9050919050565b60006118a682611889565b9050919050565b6118b68161189b565b82525050565b60006118c7826112a8565b6118d18185611483565b93506118e18185602086016112c4565b6118ea81610f9f565b840191505092915050565b6118fe81611327565b82525050565b600060c0820190506119196000830189611234565b61192660208301886118ad565b61193360408301876111f8565b61194060608301866111f8565b818103608083015261195281856118bc565b905061196160a08301846118f5565b979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006040820190506119b060008301856118ad565b6119bd60208301846111f8565b9392505050565b7f596f75206172656e277420746865206f776e6572000000000000000000000000600082015250565b60006119fa601483611483565b9150611a05826119c4565b602082019050919050565b60006020820190508181036000830152611a29816119ed565b9050919050565b60006020820190508181036000830152611a4a81846118bc565b905092915050565b60006080820190508181036000830152611a6c81876118bc565b9050611a7b6020830186611234565b8181036040830152611a8d81856118bc565b9050611a9c60608301846111f8565b95945050505050565b7f4f6e6c79207468652072656365697665722063616e20636f6e6669726d4d657360008201527f7361676520746865206d65737361676500000000000000000000000000000000602082015250565b6000611b01603083611483565b9150611b0c82611aa5565b604082019050919050565b60006020820190508181036000830152611b3081611af4565b9050919050565b7f54686973206d6573736167652068617320616c7265616479206265656e20636f60008201527f6e6669726d656400000000000000000000000000000000000000000000000000602082015250565b6000611b93602783611483565b9150611b9e82611b37565b604082019050919050565b60006020820190508181036000830152611bc281611b86565b9050919050565b600081905092915050565b50565b6000611be4600083611bc9565b9150611bef82611bd4565b600082019050919050565b6000611c0582611bd7565b9150819050919050565b7f4661696c656420746f20776974686472617720415641582066726f6d20636f6e60008201527f7472616374000000000000000000000000000000000000000000000000000000602082015250565b6000611c6b602583611483565b9150611c7682611c0f565b604082019050919050565b60006020820190508181036000830152611c9a81611c5e565b905091905056fea264697066735822122017257b9ae3987c24e73c59e9ed5dc2b7028ef60465948a429eb832879c2dc5a364736f6c63430008120033";

type MessengerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MessengerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Messenger__factory extends ContractFactory {
  constructor(...args: MessengerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _numOfPendingLimits: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<Messenger> {
    return super.deploy(
      _numOfPendingLimits,
      overrides || {}
    ) as Promise<Messenger>;
  }
  override getDeployTransaction(
    _numOfPendingLimits: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_numOfPendingLimits, overrides || {});
  }
  override attach(address: string): Messenger {
    return super.attach(address) as Messenger;
  }
  override connect(signer: Signer): Messenger__factory {
    return super.connect(signer) as Messenger__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MessengerInterface {
    return new utils.Interface(_abi) as MessengerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Messenger {
    return new Contract(address, _abi, signerOrProvider) as Messenger;
  }
}
