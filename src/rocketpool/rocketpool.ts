// Imports
import Web3 from 'web3';
import { ContractArtifact } from '../utils/contract';
import Contracts from './contracts/contracts';
import Auction from './auction/auction';
import Deposit from './deposit/deposit';
import Minipool from './minipool/minipool';
import Network from './network/network';
import Node from './node/node';
import AuctionSettings from './settings/auction';
import DepositSettings from './settings/deposit';
import MinipoolSettings from './settings/minipool';
import NetworkSettings from './settings/network';
import NodeSettings from './settings/node';
import RETH from './tokens/reth';
import RPL from './tokens/rpl';
import Rewards from './rewards/rewards';


/**
 * Main Rocket Pool library class
 */
class RocketPool {


    // Services
    public readonly contracts: Contracts;
    public readonly auction: Auction;
    public readonly deposit: Deposit;
    public readonly minipool: Minipool;
    public readonly network: Network;
    public readonly node: Node;
    public readonly settings: {auction: AuctionSettings, deposit: DepositSettings, minipool: MinipoolSettings, network: NetworkSettings, node: NodeSettings};
    public readonly tokens: {reth: RETH, rpl: RPL};
    public readonly rewards: Rewards;


    // Constructor
    public constructor(public readonly web3: Web3, public readonly RocketStorage: ContractArtifact) {

        // Initialise services
        this.contracts = new Contracts(web3, RocketStorage);
        this.auction = new Auction(web3, this.contracts);
        this.deposit = new Deposit(web3, this.contracts);
        this.minipool = new Minipool(web3, this.contracts);
        this.network = new Network(web3, this.contracts);
        this.node = new Node(web3, this.contracts);
        this.settings = {
            auction: new AuctionSettings(web3, this.contracts),
            deposit: new DepositSettings(web3, this.contracts),
            minipool: new MinipoolSettings(web3, this.contracts),
            network: new NetworkSettings(web3, this.contracts),
            node: new NodeSettings(web3, this.contracts),
        };
        this.tokens = {
            reth: new RETH(web3, this.contracts),
            rpl: new RPL(web3, this.contracts),
        };
        this.rewards = new Rewards(web3, this.contracts);

    }


}


// Exports
export default RocketPool;
