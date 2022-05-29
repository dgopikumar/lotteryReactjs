import React, {useState,useEffect,useRef} from 'react';
import web3 from './web3';
import lottery from './lottery';

function App() {
  console.log(web3.version);
  const[manager, setManager] = useState('');
  const[account, setAccount] = useState('');
  const[totPlayers, setTotPlayers] = useState(0);
  const[totLotteryAmt, setTotLotteryAmt] = useState(0);
  //const[amtEntered, setAmtEntered] = useState(0);
  const[message,setMessage] = useState('');
  const amtInputRef = useRef(0);

useEffect( () => {
  const GetData = async () => {
    const lcl_accounts = await web3.eth.getAccounts();
    const lcl_manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    setManager(lcl_manager);
    setAccount(lcl_accounts[0]);
    setTotPlayers(players.length);
    setTotLotteryAmt(balance);

    console.log('manager:');
    console.log(manager);
    console.log('account:');
    console.log(account);
    console.log('totPlayers:');
    console.log(totPlayers);
    console.log('totLotteryAmt:');
    console.log(totLotteryAmt);
  }
  GetData();
});

const submitHandler = (e) => {
  e.preventDefault();
  const enteredValue = amtInputRef.current.value;
  setMessage('waiting on transaction success...');
  lottery.methods.enter().send({from: account, value: web3.utils.toWei(enteredValue,'ether')}).then(() => {
    setMessage('you have been entered!');
  });
}

/*const setData = async () => {
  console.log('waiting for tx success:');
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  await lottery.methods.enter().send({from: accounts[0], value: web3.utils.toWei('.011','ether')});
  console.log('you have been entered!');
}*/
  //const GetData = async () => {
    /*const lcl_accounts = await web3.eth.getAccounts();
    const lcl_manager = await lottery.methods.manager().call();
    setManager(lcl_manager);
    setAccount(lcl_accounts[0]);*/

    //const players = await lottery.methods.getPlayers().call();
    //const balance = await web3.eth.getBalance(lottery.options.address);

    /*console.log('manager:');
    console.log(lcl_manager);
    console.log('account:');
    console.log(lcl_accounts[0]);*/

    /*console.log('players:');
    console.log(players.length);
    console.log('balance:');
    console.log(balance);*/
  //}

  //setData();
  //GetData();

  return(
    <div>
    <h2>Lottery contract</h2>
    <p>This contract is managed by : {manager} </p>
    <p> There are currently {totPlayers} people entered, competing to win {totLotteryAmt} ether!</p>

    <form onSubmit={submitHandler}>
    <h4>Want to try your luck ?</h4>
    <div>
    <label htmlFor="amt">Amount of ether to enter:</label>
    <input type="text" id="amt" ref={amtInputRef}></input>
    &nbsp;
    <button>Try it</button>
    </div>
    </form>

    <h3>{message}</h3>
    </div>
  );
}
export default App;
