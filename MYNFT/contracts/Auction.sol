pragma solidity ^0.8.0;

contract Auction{

    uint public createNFTFee = 0.1 ether;
    uint public NFTCount = 0;
    
    address payable public manager;
    uint public balance;
    
    struct NFT{
        uint token_id;      //代币ID
        address maker;      //铸造者
        uint createTime;    //创建时间
        string URL;
    }
    
    NFT[] public nft;
    
    mapping(uint => address) public NFTOwner;       //第i个NFT的所有者 （uint不是代币的token_id，而是nft的下标）
    mapping(address => uint) public ownNFTCount;    //用户有多少个NFT
    mapping(uint => uint) token2num;                //根据代币token_id获取nft下标
    mapping(address => uint) madeByMe;              //我铸造的NFT
    
    
    uint auctionFee = 0.1 ether;
    
    struct AUC{
        uint Auc_id;                //拍卖ID
        uint NFT_token_id;          //所拍卖NFT的ID
        uint startTime;             //拍卖开始时间
        uint endTime;               //拍卖结束时间
        uint bid;                   //当前最高出价
        address payable receiver;   //最高出价者
        address payable sender;     //拍卖发起者
        bool isclaim;               //是否被认领
    }
    
    AUC[] public Auc;   //保存拍卖
    
    mapping(uint => uint) public getAucNum;     //拍卖ID->拍卖在Auc中的下标
    mapping(uint => uint) public transferTime;  //某个NFT转手的次数
    mapping(address => uint) bought;            //某人购买的NFT数
    mapping(address => uint) unclaim;           //某人未认领的NFT数
    mapping(address => uint) myAuc;             //我发起的拍卖数
    mapping(uint => bool) inAuc;                //某个物品是否正在被拍卖


    event newNFT(uint token_id);

    function getContractBalance() public returns(uint) {
        manager=payable(address(this));
        balance=address(this).balance;
        return address(this).balance;
    }
    
    function transderToContract() payable public {
        payable(address(this)).transfer(msg.value);
    }
    
    fallback() external payable {}
    
    receive() external payable {}
    
    //铸造NFT  前端接收图片并进行md5计算，然后将md5值传过来进行哈希，生成唯一token_id
    function createNFT(string memory content) public payable returns(bool){
        require(msg.value==0.1 ether);  //手续费0.1 ether
        uint token_id=uint(keccak256(abi.encode(content)));
        require(isExist(token_id)==false);

        bool rst=false;
        if(isExist(token_id)){
            return rst;
        }
        
        nft.push(NFT(token_id,msg.sender,block.timestamp,"0")); //存入nft数组

        //相关变量的更新
        uint id=nft.length-1;
        NFTOwner[id]=msg.sender;
        ownNFTCount[msg.sender]++;
        token2num[token_id]=id;
        madeByMe[msg.sender]++;
        NFTCount++;
        rst=true;
        emit newNFT(token_id);

        return rst;
    }
    
    //获取某用户的所有NFT
    function getNFTByOwner(address _owner) external view returns(NFT[] memory){
        NFT[] memory rst=new NFT[](ownNFTCount[_owner]);
        uint counter=0;
        
        for(uint i=0;i<nft.length;i++){
            if(NFTOwner[i]==_owner){
                rst[counter]=nft[i];
                counter++;
            }
        }
        return rst;
    }

    //根据token_id获取它的持有者
    function getNFTOwnerByID(uint token_id) public view returns(address){
        address rst;
        rst=NFTOwner[token2num[token_id]];
        return rst;
    }
    
    //判断msg.sender是不是编号为token_id的NFT的所有者
    function isOwnerof(uint token_id) internal view returns(bool){
        if(getNFTOwnerByID(token_id)==msg.sender){
            if(token2num[token_id]==0&&nft[0].token_id!=token_id){
                return false;
            }
            return true;
        }
        return false;
    }

    //获取msg.sender购买的NFT（只获取他购买的，不获取自己铸造的）
    function getNFTBought(address _owner) external view returns(NFT[] memory){
        NFT[] memory rst=new NFT[](bought[_owner]);
        uint counter=0;
        
        for(uint i=0;i<nft.length;i++){
            if(NFTOwner[i]==_owner&&nft[i].maker!=msg.sender){
                rst[counter]=nft[i];
                counter++;
            }
        }
        return rst;
    }
    
    //获取msg.sender铸造的NFT
    function getNFTMadeByMe() public view returns(NFT[] memory){
        NFT[] memory rst=new NFT[](madeByMe[msg.sender]);
        uint counter=0;
        
        for(uint i=0;i<nft.length;i++){
            if(nft[i].maker==msg.sender){
                rst[counter]=nft[i];
                counter++;
            }
        }
        return rst;
    }
    
    //判断NFT是否已经存在
    function isExist(uint _token_id) public view returns(bool){
        for(uint i=0;i<nft.length;i++){
            if(_token_id==nft[i].token_id){
                return true;
            }
        }
        
        return false;
    }
    
    //检查该NFT是否已经在拍卖并退还超时无人竞拍的拍卖
    function examineInAuc(uint token_id) internal returns(bool){
        uint i;
        
        if(inAuc[token_id]==false){
            return true;
        }
        else{
            for(i=Auc.length-1;i>=0;i--){
                //如果NFT的拍卖截止了还没人竞拍，则将其退还。
                if(Auc[i].NFT_token_id==token_id&&Auc[i].receiver==payable(0)&&Auc[i].endTime<block.timestamp){
                    Auc[i].isclaim=true;
                    inAuc[token_id]=false;
                    return true;
                }
            }
            return false;
        }
        
    }

    //msg.sender发起的拍卖
    function myAuction() public view returns(AUC[] memory){
        AUC[] memory rst= new AUC[](myAuc[msg.sender]);
        uint counter=0;
        
        for(uint i=0;i<Auc.length;i++){
            if(Auc[i].sender==msg.sender){
                rst[counter]=Auc[i];
                counter++;
            }
        }
        
        return rst;
    }
    
    //发起拍卖
    function setupAuction(uint _NFT_token_id,uint _endTime,uint _startPrice) public payable{
        require(examineInAuc(_NFT_token_id)==true);     //判断NFT是否已经在拍卖
        require(isOwnerof(_NFT_token_id)==true);        //判断拍卖发起者是否是该NFT的持有者
        require(ownNFTCount[msg.sender]>0);             //判断拍卖发起者是否拥有NFT
        require(_endTime>block.timestamp);              //交易截止时间必须大于当前时间
        
        uint startTime=block.timestamp;

        //生成唯一拍卖ID
        uint Auc_id=uint(keccak256(abi.encode(block.timestamp,startTime,_endTime,_NFT_token_id)));
        Auc.push(AUC(Auc_id,_NFT_token_id,startTime,_endTime,_startPrice,payable(0),payable(msg.sender),false));
        uint i=Auc.length-1;
        getAucNum[Auc_id]=i;
        inAuc[_NFT_token_id]=true;
        myAuc[msg.sender]++;
        
        if(bought[msg.sender]>0&&nft[token2num[_NFT_token_id]].maker!=msg.sender){
            bought[msg.sender]--;
        }
        
    }
    
    //查询某个NFT过去的所属权流转信息
    function Belong(uint _NFT_id) public view returns(address[] memory){
        address[] memory rst=new address[](transferTime[_NFT_id]+1);
        uint counter=0;
        
        for(uint i=0;i<Auc.length;i++){
            if(Auc[i].NFT_token_id==_NFT_id){
                rst[counter]=Auc[i].sender;
                counter++;
            }
        }
        rst[counter]=NFTOwner[token2num[_NFT_id]];
        
        return rst;
    }
    
    //查询msg.sender竞拍成功但未认领的NFT
    function getUnclaim() public view returns(AUC[] memory){
        AUC[] memory rst= new AUC[](unclaim[msg.sender]);
        uint counter=0;
        
        for(uint i=0;i<Auc.length;i++){
            if(Auc[i].receiver==msg.sender&&Auc[i].isclaim==false&&block.timestamp>=Auc[i].endTime){
                rst[counter]=Auc[i];
                counter++;
            }
        }
        
        return rst;
    }
    //获取所有拍卖数据
    function getAuction() public view returns(AUC[] memory){
        AUC[] memory rst= new AUC[](Auc.length);
        uint counter=0;
        
        for(uint i=0;i<Auc.length;i++){
            if(block.timestamp<Auc[i].endTime){
                rst[counter]=Auc[i];
                counter++;
            }
        }
        
        return rst;
    }
    
    //获取msg.sender发起的拍卖
    function myNFTInAuction() public view returns(AUC[] memory){
        AUC[] memory rst= new AUC[](Auc.length);
        uint counter=0;
        
        for(uint i=0;i<Auc.length;i++){
            if(block.timestamp<Auc[i].endTime&&Auc[i].sender==msg.sender){
                rst[counter]=Auc[i];
                counter++;
            }
        }
        
        return rst;
    }
    
    //认领NFT
    function claim(uint _Auc_id) public payable{
        uint Anum=getAucNum[_Auc_id];
        require(msg.value==Auc[Anum].bid);              //有足够的钱支付
        require(msg.sender==Auc[Anum].receiver);        //认领者身份验证
        require(block.timestamp>=Auc[Anum].endTime);    //当前交易必须截止
        require(Auc[Anum].isclaim==false);              //当前交易必须处于未认领状态
        
        uint NFTnum=token2num[Auc[Anum].NFT_token_id];
        ownNFTCount[NFTOwner[NFTnum]]--;
        NFTOwner[NFTnum]=msg.sender;
        bought[msg.sender]++;
        ownNFTCount[NFTOwner[NFTnum]]++;
        Auc[Anum].isclaim=true;
        unclaim[msg.sender]--;
        transferTime[Auc[Anum].NFT_token_id]++;
        
        inAuc[Auc[Anum].NFT_token_id]=false;
        
        address payable sender=Auc[Anum].sender;
        
        transferEther(sender,Auc[Anum].bid);
    }
    
    //转账
    function transferEther(address payable to,uint value) public payable{
        to.transfer(value);
    }
    
    //竞拍
    function bid(uint _Auc_id,uint price) public payable {
        uint Anum=getAucNum[_Auc_id];
        require(price>Auc[Anum].bid);                   //新竞价必须高于之前竞价
        require(msg.sender!=Auc[Anum].sender);          //拍卖发起者不能竞拍自己的拍卖
        require(Auc[Anum].isclaim==false);              //拍卖NFT必须处于无人认领的状态
        require(Auc[Anum].endTime>block.timestamp);     //只有在截止时间之前才能竞拍
        
        if(Auc[Anum].receiver!=address(0)){
            unclaim[Auc[Anum].receiver]--;
        }
        
        unclaim[msg.sender]++;
        
        Auc[Anum].bid=price;
        Auc[Anum].receiver=payable(msg.sender);
    }
}