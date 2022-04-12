// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
/*
                :%                                                                                                       
  .  . .  .  . :%8.  . .  . . .  . .  . .  . .  . .  . .  . .  . .  . .  . .  . .  . .  . .  . .  . .  . .  . .  . .  . 
   .       .   ::;%      .%S@   .         .         .         .         .         .         .         .         .       
     .  .    .;888t .  .  t8  .    . .  .    . .  .    . .  .    . .  .    . .  .    . .  .    . .  .    . .  .    . .  
 .       .    S8;tt  .    .@t8@.           .         .         .         .         .         .         .         .     .
   .  .   : .  8t@ t    ..8XS88.:.  . .  .    . .  .    . .  .    . .  .    . .  .    . .  .    . .  .    . .  .    .   
  .    . .X;   .:8.S   . %88 8.8X .     .   .     .   .     .   .     .   .     .   .     .   .     .   .     .   .   . 
    .     8;:  X;888% S8..X :..8S8; .     .    .    . X%@;@   .    .    .    .    .    .    .    .    .    .    .       
  .   . .8X8X:;8888 ; .8@ %@8; 8.@8:  .   .88.   .   :X@8X:     .    .    .    .    .    .    .    .    .    .    . .  .
    .   88%88@S8%t8t :.88%@X.@: XS8t    .@ SX:.    .  S@XX@ .     .    .    .    .    .    .    .    .    .    .     .  
  .    .S%.S 88@.%S;;. @@X%t@8  ;88S .  @ X8@S.. ..:. ;X88.   . .   .    .    .    .    .    .    .    .    .    .      
   S8S.::8;;@88;% 88% 888 X8;St88:;;  .XX:888@S8S8 :..XS:t  .     .   .    .    .    .    .    .    .    .    .    .  . 
  .%tX@t8S@8:t;X@8:8@88%  %S88@.@8: . ;@X8@8;8X8@X88X;XX@8    .         .    .    .    .    .    .    .    .    .   .   
 t:X8 88@88;;888:8@888;    ;8888XX8t   @8X8X@  ..888X.XX. .     .  . .    .    .    .    .    .    .    .    .    .    .
8S%%;88.t::;8%S@ XS8;8 ;  8@t8%X@%X::@t8X@t;:.   .8X:X.X  .8:;;   .    . .. .    .    .    . .  .    .    .    .   :8tX 
S 88t888S . .t;88 8S 8:   @8.@   8@88S8X@@ X 8% . %8 S S  .S88..  t8SS  t:.%X @;Xt:8.  8%8S%.t@;8;8X8.  . 8S8X%  .X@X@S;
888XXS8X8S.   8888S@8:.   .%8SSS 8 8  X:t  ;X@; %%;X::.S;X :8;t S8S88X%%X%XSXSS;SS88S. S@XX8S8S8X.X@X t .:S@S@8X;.%8:  @
8tX%SX8:;:  .:88888X:  .   ;X8X:8 88X88X .S: t  X@XS8tXS tS :  :88%:SS@:S8S8:t8;8 .S S S8 @X:S %t @%8:. X SX 8@;@ @8;   
@;8X 8%8;    %X:8X8; .   . . X888X8:%88S :: ;  S:;8@..8@t :@;  8S%8X%X 8X8 X%8S.S%S:.Xt :;; S8  8X8@%@ t.% t.;;X;X@;    
888X88.X:  .8 888@X ;.;     88%8 X: .%8:    . .X:@@;  8S.t8.StXX@ X:S8S8XXS: @ .8XS8 t X %%.8 % XX ;tXt:S S %@ X%;  X8. 
:X%8888 .  :@@8 8@.8@t;..  .8;88 :   @:X. .   @.X ;   %S8. %S@ % .@:  888S8 8St.:X@:8.@:8t.8. 8%8t :@XX..8:8S.@    S;;X 
 ;@.%8;8X .  tS;..t 8.X.  .. @88%.%.:888 .S%:8t8 ;   :S888.::t@;88 8%X; ;:S@;XX  t %  t:S S.  S8@8 8 88..%:X.%. S%;8S:; 
 . .:@8t@.    .   .X8:      .t8%S@88:@ 88:SSS:8t.     X888. .88 %.     ...SS .         .  .  .   .   ..     .    ..  .  
   ...S88:  .   .  t88: .   ;888888%88 8%:tSt.    . .    .   . t%:8  .         .   .    .      .          .    .  .     
     8%@8t;;.      ;88;   . ;8;8%88S8888X   .  .       .        .       . .  .   .   .     .     .      .    .      .  .
  . .@88S8X88@X%8...88. 88: :%S8X;88SSS.S         .  .    . .      .  .        .       .     .       .    .    . .      
     88888S8SS  ; :%8S @%S: t88:%8%8t8t   .  . .   .    .     .  .      .  .     . .     .    .  . .   .    .      . .  
  . .888%@;@X888.@:X8;t888t.X%8;:S8@8@;    .     .   .    .    .   . .       .       .     .             .    .  .      
    ..@X88%S8% @:8@Xtt.888St888X88%  8: .     .    .   .    .    .     . .  .  .  .   .  .   .  .  . .     .       .  . 
   .   :;:.S888;@88@;.8 88.@88 : .St:.    .  .  .    .   .   .      .           .   .      .           .     .  .       
 .   .  .  :88%SS@8;XX88X;. t;88; .   .  .        .    .   .   .  .   .  .  .     .    .      .  .  .    .        .  .  
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./meta-transactions/ContextMixin.sol";
import "./meta-transactions/NativeMetaTransaction.sol";

contract ApprovedSpenderContract {}

contract OwnableDelegateProxy {}

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

contract Okemonos is Ownable, ERC721("Okemonos", "OKE"), ContextMixin, NativeMetaTransaction {
    using SafeMath for uint256;

    // proxy address is for mainnet
    address public proxyRegistryAddress = 0xa5409ec958C83C3f309868babACA7c86DCB077c1;
    string private _baseTokenUri = "https://okemonos-api.herokuapp.com/";
    uint256 public totalSupply = 7777;
    uint256 public currentTokenId = 0;
    uint256 public mintPrice = 0.024 ether;
    uint256 public decimals = 0;
    bool public mintingEnabled = true;
    uint256 public maxMint = 20;
    bool public isSalePublic = false;

    mapping(address => bool) public whitelist;

    constructor() {
        _initializeEIP712("Okemonos");
        _initializeWhitelist();
    }

    modifier onlyIfMintingEnabled() {
        require(mintingEnabled, "Minting is currently disabled");
        _;
    }

    modifier onlyLessThanMaxAmount(uint256 _quantity) {
        require(_quantity < 21, "Maximum mint in single transaction is 20");
        _;
    }

    modifier onlyIfTokensLeft(uint256 _quantity) {
        require(currentTokenId.add(_quantity) < totalSupply, "All tokens have been minted");
        _;
    }

    modifier onlyIfWhitelistedIfSalePrivate() {
        if (isSalePublic == false) {
            require(whitelist[msg.sender] == true, "Address is not on the whitelist");
        }
        _;
    }

    modifier onlyIfSendingEnoughEth(uint256 _quantity) {
        require(msg.value >= _quantity.mul(mintPrice), "Not enough ETH sent; check price!");
        _;
    }

    /**
     * TODO: this could be implemented in the future
     * */
    function _initializeWhitelist() private {
        whitelist[owner()] = true;
        // ...
        // whitelist any other users to start with, might be less gas
        // also could think about mass whitelist method
        // TODO reentrancy?
        // could also mess with merkle roots
        // also next project could only use waffle, no hardhat whatsoever
    }

    function _getNextTokenId() private view returns (uint256) {
        return currentTokenId.add(1);
    }

    function _incrementTokenId() private {
        currentTokenId++;
    }

    function addToWhitelist(address _address) external onlyOwner {
        whitelist[_address] = true;
    }

    function setProxyRegistryAddress(address _newAddress) external onlyOwner {
        proxyRegistryAddress = _newAddress;
    }

    function setMintPrice(uint256 _newPrice) external onlyOwner {
        mintPrice = _newPrice;
    }

    function mint(address _to, uint256 _quantity)
        public
        payable
        onlyIfMintingEnabled
        onlyIfWhitelistedIfSalePrivate
        onlyLessThanMaxAmount(_quantity)
        onlyIfTokensLeft(_quantity)
        onlyIfSendingEnoughEth(_quantity)
    {
        for (uint256 i = 0; i < _quantity; i += 1) {
            uint256 newTokenId = _getNextTokenId();
            _safeMint(_to, newTokenId);
            _incrementTokenId();
        }
    }

    function toggleSalePublic() external onlyOwner {
        isSalePublic = !isSalePublic;
    }

    function toggleMinting() external onlyOwner {
        mintingEnabled = !mintingEnabled;
    }

    function baseTokenURI() public view virtual returns (string memory) {
        return _baseTokenUri;
    }

    function setBaseTokenURI(string memory _uri) external onlyOwner {
        _baseTokenUri = _uri;
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseTokenURI(), Strings.toString(_tokenId)));
    }

    function isApprovedForAll(address owner, address operator) public view override returns (bool) {
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    function _msgSender() internal view override returns (address sender) {
        return ContextMixin.msgSender();
    }

    receive() external payable {}

    function withdraw() public onlyOwner returns (bool) {
        uint256 amount = address(this).balance;
        return payable(owner()).send(amount);
    }
}
