/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Timelock,
  TimelockInterface,
} from "../../../contracts/TimeLock.sol/Timelock";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "admin_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "delay_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "CancelTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "ExecuteTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "NewAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "newDelay",
        type: "uint256",
      },
    ],
    name: "NewDelay",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newPendingAdmin",
        type: "address",
      },
    ],
    name: "NewPendingAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "QueueTransaction",
    type: "event",
  },
  {
    inputs: [],
    name: "GRACE_PERIOD",
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
    name: "MAXIMUM_DELAY",
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
    name: "MINIMUM_DELAY",
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
    name: "acceptAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
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
    inputs: [],
    name: "admin_initialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "cancelTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "delay",
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
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "executeTransaction",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingAdmin",
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
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "queueTransaction",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "queuedTransactions",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "delay_",
        type: "uint256",
      },
    ],
    name: "setDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pendingAdmin_",
        type: "address",
      },
    ],
    name: "setPendingAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200224f3803806200224f8339818101604052810190620000379190620001d6565b60058110156200007e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200007590620002a4565b60405180910390fd5b62278d00811115620000c7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000be906200033c565b60405180910390fd5b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806002819055506000600360006101000a81548160ff02191690831515021790555050506200035e565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001638262000136565b9050919050565b620001758162000156565b81146200018157600080fd5b50565b60008151905062000195816200016a565b92915050565b6000819050919050565b620001b0816200019b565b8114620001bc57600080fd5b50565b600081519050620001d081620001a5565b92915050565b60008060408385031215620001f057620001ef62000131565b5b6000620002008582860162000184565b92505060206200021385828601620001bf565b9150509250929050565b600082825260208201905092915050565b7f54696d656c6f636b3a3a636f6e7374727563746f723a2044656c6179206d757360008201527f7420657863656564206d696e696d756d2064656c61792e000000000000000000602082015250565b60006200028c6037836200021d565b915062000299826200022e565b604082019050919050565b60006020820190508181036000830152620002bf816200027d565b9050919050565b7f54696d656c6f636b3a3a636f6e7374727563746f723a2044656c6179206d757360008201527f74206e6f7420657863656564206d6178696d756d2064656c61792e0000000000602082015250565b600062000324603b836200021d565b91506200033182620002c6565b604082019050919050565b60006020820190508181036000830152620003578162000315565b9050919050565b611ee1806200036e6000396000f3fe6080604052600436106100e15760003560e01c80636fc1f57e1161007f578063c1a287e211610059578063c1a287e21461029a578063e177246e146102c5578063f2b06537146102ee578063f851a4401461032b576100e8565b80636fc1f57e146102195780637d645fab14610244578063b1b43ae51461026f576100e8565b80633a66f901116100bb5780633a66f9011461015f5780634dd18bf51461019c578063591fcdfe146101c55780636a42b8f8146101ee576100e8565b80630825f38f146100ed5780630e18b6811461011d5780632678224714610134576100e8565b366100e857005b600080fd5b6101076004803603810190610102919061113f565b610356565b604051610114919061127a565b60405180910390f35b34801561012957600080fd5b5061013261069c565b005b34801561014057600080fd5b50610149610813565b60405161015691906112ab565b60405180910390f35b34801561016b57600080fd5b506101866004803603810190610181919061113f565b610839565b60405161019391906112df565b60405180910390f35b3480156101a857600080fd5b506101c360048036038101906101be91906112fa565b6109e2565b005b3480156101d157600080fd5b506101ec60048036038101906101e7919061113f565b610bbd565b005b3480156101fa57600080fd5b50610203610d07565b6040516102109190611336565b60405180910390f35b34801561022557600080fd5b5061022e610d0d565b60405161023b919061136c565b60405180910390f35b34801561025057600080fd5b50610259610d20565b6040516102669190611336565b60405180910390f35b34801561027b57600080fd5b50610284610d27565b6040516102919190611336565b60405180910390f35b3480156102a657600080fd5b506102af610d2c565b6040516102bc9190611336565b60405180910390f35b3480156102d157600080fd5b506102ec60048036038101906102e79190611387565b610d33565b005b3480156102fa57600080fd5b50610315600480360381019061031091906113e0565b610e64565b604051610322919061136c565b60405180910390f35b34801561033757600080fd5b50610340610e84565b60405161034d91906112ab565b60405180910390f35b606060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103dd90611490565b60405180910390fd5b600086868686866040516020016104019594939291906114f4565b6040516020818303038152906040528051906020012090506004600082815260200190815260200160002060009054906101000a900460ff16610479576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610470906115c7565b60405180910390fd5b82610482610ea8565b10156104c3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ba9061167f565b60405180910390fd5b62127500836104d291906116ce565b6104da610ea8565b111561051b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051290611796565b60405180910390fd5b60006004600083815260200190815260200160002060006101000a81548160ff021916908315150217905550606060008651141561055b57849050610587565b85805190602001208560405160200161057592919061183f565b60405160208183030381529060405290505b6000808973ffffffffffffffffffffffffffffffffffffffff1689846040516105b09190611867565b60006040518083038185875af1925050503d80600081146105ed576040519150601f19603f3d011682016040523d82523d6000602084013e6105f2565b606091505b509150915081610637576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161062e906118f0565b60405180910390fd5b8973ffffffffffffffffffffffffffffffffffffffff16847fa560e3198060a2f10670c1ec5b403077ea6ae93ca8de1c32b451dc1a943cd6e78b8b8b8b6040516106849493929190611910565b60405180910390a38094505050505095945050505050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461072c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610723906119d5565b60405180910390fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f71614071b88dee5e0b2ae578a9dd7b2ebbe9ae832ba419dc0242cd065a290b6c60405160405180910390a2565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c190611a67565b60405180910390fd5b6002546108d5610ea8565b6108df91906116ce565b821015610921576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161091890611b1f565b60405180910390fd5b6000868686868660405160200161093c9594939291906114f4565b60405160208183030381529060405280519060200120905060016004600083815260200190815260200160002060006101000a81548160ff0219169083151502179055508673ffffffffffffffffffffffffffffffffffffffff16817f76e2796dc3a81d57b0e8504b647febcbeeb5f4af818e164f11eef8131a6a763f888888886040516109cd9493929190611910565b60405180910390a38091505095945050505050565b600360009054906101000a900460ff1615610a6a573073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610a65576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5c90611bb1565b60405180910390fd5b610b14565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610af8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aef90611c43565b60405180910390fd5b6001600360006101000a81548160ff0219169083151502179055505b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f69d78e38a01985fbb1462961809b4b2d65531bc93b2b94037f3334b82ca4a75660405160405180910390a250565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610c4b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4290611cd5565b60405180910390fd5b60008585858585604051602001610c669594939291906114f4565b60405160208183030381529060405280519060200120905060006004600083815260200190815260200160002060006101000a81548160ff0219169083151502179055508573ffffffffffffffffffffffffffffffffffffffff16817f2fffc091a501fd91bfbff27141450d3acb40fb8e6d8382b243ec7a812a3aaf8787878787604051610cf79493929190611910565b60405180910390a3505050505050565b60025481565b600360009054906101000a900460ff1681565b62278d0081565b600581565b6212750081565b3073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610da1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9890611d67565b60405180910390fd5b6005811015610de5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddc90611df9565b60405180910390fd5b62278d00811115610e2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e2290611e8b565b60405180910390fd5b806002819055506002547f948b1f6a42ee138b7e34058ba85a37f716d55ff25ff05a763f15bed6a04c8d2c60405160405180910390a250565b60046020528060005260406000206000915054906101000a900460ff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600042905090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610eef82610ec4565b9050919050565b610eff81610ee4565b8114610f0a57600080fd5b50565b600081359050610f1c81610ef6565b92915050565b6000819050919050565b610f3581610f22565b8114610f4057600080fd5b50565b600081359050610f5281610f2c565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610fab82610f62565b810181811067ffffffffffffffff82111715610fca57610fc9610f73565b5b80604052505050565b6000610fdd610eb0565b9050610fe98282610fa2565b919050565b600067ffffffffffffffff82111561100957611008610f73565b5b61101282610f62565b9050602081019050919050565b82818337600083830152505050565b600061104161103c84610fee565b610fd3565b90508281526020810184848401111561105d5761105c610f5d565b5b61106884828561101f565b509392505050565b600082601f83011261108557611084610f58565b5b813561109584826020860161102e565b91505092915050565b600067ffffffffffffffff8211156110b9576110b8610f73565b5b6110c282610f62565b9050602081019050919050565b60006110e26110dd8461109e565b610fd3565b9050828152602081018484840111156110fe576110fd610f5d565b5b61110984828561101f565b509392505050565b600082601f83011261112657611125610f58565b5b81356111368482602086016110cf565b91505092915050565b600080600080600060a0868803121561115b5761115a610eba565b5b600061116988828901610f0d565b955050602061117a88828901610f43565b945050604086013567ffffffffffffffff81111561119b5761119a610ebf565b5b6111a788828901611070565b935050606086013567ffffffffffffffff8111156111c8576111c7610ebf565b5b6111d488828901611111565b92505060806111e588828901610f43565b9150509295509295909350565b600081519050919050565b600082825260208201905092915050565b60005b8381101561122c578082015181840152602081019050611211565b8381111561123b576000848401525b50505050565b600061124c826111f2565b61125681856111fd565b935061126681856020860161120e565b61126f81610f62565b840191505092915050565b600060208201905081810360008301526112948184611241565b905092915050565b6112a581610ee4565b82525050565b60006020820190506112c0600083018461129c565b92915050565b6000819050919050565b6112d9816112c6565b82525050565b60006020820190506112f460008301846112d0565b92915050565b6000602082840312156113105761130f610eba565b5b600061131e84828501610f0d565b91505092915050565b61133081610f22565b82525050565b600060208201905061134b6000830184611327565b92915050565b60008115159050919050565b61136681611351565b82525050565b6000602082019050611381600083018461135d565b92915050565b60006020828403121561139d5761139c610eba565b5b60006113ab84828501610f43565b91505092915050565b6113bd816112c6565b81146113c857600080fd5b50565b6000813590506113da816113b4565b92915050565b6000602082840312156113f6576113f5610eba565b5b6000611404848285016113cb565b91505092915050565b600082825260208201905092915050565b7f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20436160008201527f6c6c206d75737420636f6d652066726f6d2061646d696e2e0000000000000000602082015250565b600061147a60388361140d565b91506114858261141e565b604082019050919050565b600060208201905081810360008301526114a98161146d565b9050919050565b600081519050919050565b60006114c6826114b0565b6114d0818561140d565b93506114e081856020860161120e565b6114e981610f62565b840191505092915050565b600060a082019050611509600083018861129c565b6115166020830187611327565b818103604083015261152881866114bb565b9050818103606083015261153c8185611241565b905061154b6080830184611327565b9695505050505050565b7f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20547260008201527f616e73616374696f6e206861736e2774206265656e207175657565642e000000602082015250565b60006115b1603d8361140d565b91506115bc82611555565b604082019050919050565b600060208201905081810360008301526115e0816115a4565b9050919050565b7f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20547260008201527f616e73616374696f6e206861736e2774207375727061737365642074696d652060208201527f6c6f636b2e000000000000000000000000000000000000000000000000000000604082015250565b600061166960458361140d565b9150611674826115e7565b606082019050919050565b600060208201905081810360008301526116988161165c565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006116d982610f22565b91506116e483610f22565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156117195761171861169f565b5b828201905092915050565b7f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20547260008201527f616e73616374696f6e206973207374616c652e00000000000000000000000000602082015250565b600061178060338361140d565b915061178b82611724565b604082019050919050565b600060208201905081810360008301526117af81611773565b9050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6000819050919050565b6117fd6117f8826117b6565b6117e2565b82525050565b600081905092915050565b6000611819826111f2565b6118238185611803565b935061183381856020860161120e565b80840191505092915050565b600061184b82856117ec565b60048201915061185b828461180e565b91508190509392505050565b6000611873828461180e565b915081905092915050565b7f54696d656c6f636b3a3a657865637574655472616e73616374696f6e3a20547260008201527f616e73616374696f6e20657865637574696f6e2072657665727465642e000000602082015250565b60006118da603d8361140d565b91506118e58261187e565b604082019050919050565b60006020820190508181036000830152611909816118cd565b9050919050565b60006080820190506119256000830187611327565b818103602083015261193781866114bb565b9050818103604083015261194b8185611241565b905061195a6060830184611327565b95945050505050565b7f54696d656c6f636b3a3a61636365707441646d696e3a2043616c6c206d75737460008201527f20636f6d652066726f6d2070656e64696e6741646d696e2e0000000000000000602082015250565b60006119bf60388361140d565b91506119ca82611963565b604082019050919050565b600060208201905081810360008301526119ee816119b2565b9050919050565b7f54696d656c6f636b3a3a71756575655472616e73616374696f6e3a2043616c6c60008201527f206d75737420636f6d652066726f6d2061646d696e2e00000000000000000000602082015250565b6000611a5160368361140d565b9150611a5c826119f5565b604082019050919050565b60006020820190508181036000830152611a8081611a44565b9050919050565b7f54696d656c6f636b3a3a71756575655472616e73616374696f6e3a204573746960008201527f6d6174656420657865637574696f6e20626c6f636b206d75737420736174697360208201527f66792064656c61792e0000000000000000000000000000000000000000000000604082015250565b6000611b0960498361140d565b9150611b1482611a87565b606082019050919050565b60006020820190508181036000830152611b3881611afc565b9050919050565b7f54696d656c6f636b3a3a73657450656e64696e6741646d696e3a2043616c6c2060008201527f6d75737420636f6d652066726f6d2054696d656c6f636b2e0000000000000000602082015250565b6000611b9b60388361140d565b9150611ba682611b3f565b604082019050919050565b60006020820190508181036000830152611bca81611b8e565b9050919050565b7f54696d656c6f636b3a3a73657450656e64696e6741646d696e3a20466972737460008201527f2063616c6c206d75737420636f6d652066726f6d2061646d696e2e0000000000602082015250565b6000611c2d603b8361140d565b9150611c3882611bd1565b604082019050919050565b60006020820190508181036000830152611c5c81611c20565b9050919050565b7f54696d656c6f636b3a3a63616e63656c5472616e73616374696f6e3a2043616c60008201527f6c206d75737420636f6d652066726f6d2061646d696e2e000000000000000000602082015250565b6000611cbf60378361140d565b9150611cca82611c63565b604082019050919050565b60006020820190508181036000830152611cee81611cb2565b9050919050565b7f54696d656c6f636b3a3a73657444656c61793a2043616c6c206d75737420636f60008201527f6d652066726f6d2054696d656c6f636b2e000000000000000000000000000000602082015250565b6000611d5160318361140d565b9150611d5c82611cf5565b604082019050919050565b60006020820190508181036000830152611d8081611d44565b9050919050565b7f54696d656c6f636b3a3a73657444656c61793a2044656c6179206d757374206560008201527f7863656564206d696e696d756d2064656c61792e000000000000000000000000602082015250565b6000611de360348361140d565b9150611dee82611d87565b604082019050919050565b60006020820190508181036000830152611e1281611dd6565b9050919050565b7f54696d656c6f636b3a3a73657444656c61793a2044656c6179206d757374206e60008201527f6f7420657863656564206d6178696d756d2064656c61792e0000000000000000602082015250565b6000611e7560388361140d565b9150611e8082611e19565b604082019050919050565b60006020820190508181036000830152611ea481611e68565b905091905056fea26469706673582212208d6f73972f168d1283e1772b5e4f185de95b2654dbabbc226ac4c43be179782c64736f6c63430008090033";

type TimelockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TimelockConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Timelock__factory extends ContractFactory {
  constructor(...args: TimelockConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    admin_: PromiseOrValue<string>,
    delay_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Timelock> {
    return super.deploy(admin_, delay_, overrides || {}) as Promise<Timelock>;
  }
  override getDeployTransaction(
    admin_: PromiseOrValue<string>,
    delay_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(admin_, delay_, overrides || {});
  }
  override attach(address: string): Timelock {
    return super.attach(address) as Timelock;
  }
  override connect(signer: Signer): Timelock__factory {
    return super.connect(signer) as Timelock__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TimelockInterface {
    return new utils.Interface(_abi) as TimelockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Timelock {
    return new Contract(address, _abi, signerOrProvider) as Timelock;
  }
}
