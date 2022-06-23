import React, { useSyncExternalStore } from 'react'
import '../App.css';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import 'sf-font';
import axios from 'axios';
import VAULTABI from '../VAULTABI.json';
import { NFTCONTRACT, STAKINGCONTRACT, moralisapi, nftpng } from '../config';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";
import Web3 from 'web3';

const moralisapikey = "1ByvMyujsaXkDVTlnUjQIje5e09J2zLHGaS2P6JytHVA1LxfAPPYE8UdOpEjc6ca";
const providerOptions = {
    binancechainwallet: {
        package: true
    },
    Walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: '50f6635fbcc742f18ce7a2a5cbe73ffa'
        }
    },
    Walletlink: {
        package: WalletLink,
        options: {
            appName: 'f-nft Polygon',
            infuraId: '50f6635fbcc742f18ce7a2a5cbe73ffa',
            rpc: "",
            chainId: 137,
            appLogoUrl: null,
            darkMode: true
        }
    },
};

function callApi() {
    vaultcontract = new web3.eth.Contract(VAULTABI);
    let config = { 'X-API-Key': moralisapikey, 'accept': 'application/json' };
    const nfts = useSyncExternalStore.axios.get((moralisapi + `/nft/${NFTCONTRACT}/owners?chain=polygon&format=decimal`), { headers: config })
        .then(output => {
            const { result } = output.data
            return result;
        })
    const apicall = useSyncExternalStore.Promise.all(nfts.map(async i => {
        let item = {
            tokenId: i.token_id,
            holder: i.owner_of,
        }
        return item
    }))
    const stakednfts = useSyncExternalStore.vaultcontract.methods.tokensOfOwner(account).call()
        .then(id => {
            return id;
        })
    const nftstk = useSyncExternalStore.Promise.all(stakednfts.map(async i => {
        let stkid = {
            tokenId: i,
        }
        return stkid
    }))
    getNfts(apicall)
    getStk(nftstk)
    console.log(apicall);
    setLoadingState('loaded')
}

function ListNfts() {

    return (
        <div>ListNfts</div>
    )
}

export default ListNfts;