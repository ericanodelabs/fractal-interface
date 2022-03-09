import { useEffect, useState } from 'react';
import { ethers, getDefaultProvider } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/ethereum-provider';

import { supportedChains } from './chains';
import { useListeners } from './listeners';

export interface Web3Custom {
  connected: boolean,
  provided: boolean,
  providerName: string,
  networkName: string | undefined,
  account: string | undefined,
  chainId: number | undefined,
  provider: ethers.providers.BaseProvider | undefined,
  signerOrProvider: ethers.providers.BaseProvider | ethers.Signer | undefined,
};

let listenerProvider: ethers.providers.BaseProvider;

interface ProviderApiKeys {
  infura?: string,
  alchemy?: string,
  etherscan?: string,
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.REACT_APP_INFURA_API_KEY,
      },
    },
  },
});

export const defaultWeb3: Web3Custom = {
  connected: false,
  provided: false,
  providerName: 'not connected',
  networkName: undefined,
  account: undefined,
  chainId: undefined,
  provider: undefined,
  signerOrProvider: undefined,
};

const makeInjectedProvider = async (web3Provider: ethers.providers.Web3Provider) => {
  const local =
    process.env.REACT_APP_LOCAL_CHAIN_ID &&
    (await web3Provider.getNetwork()).chainId === parseInt(process.env.REACT_APP_LOCAL_CHAIN_ID, 10);

  const customProvider: Web3Custom = {
    connected: true,
    provided: true,
    providerName: 'injected provider',
    networkName: local ? 'localhost' : (await web3Provider.getNetwork()).name,
    account: await web3Provider.getSigner().getAddress(),
    chainId: (await web3Provider.getNetwork()).chainId,
    provider: web3Provider,
    signerOrProvider: web3Provider.getSigner(),
  };

  listenerProvider = web3Provider.provider as ethers.providers.BaseProvider;

  return customProvider;
}

const getInjectedProvider = (web3Modal: Web3Modal) => {
  return new Promise<Web3Custom>((resolve, reject) => {
    web3Modal.connect()
      .then(userSuppliedProvider => makeInjectedProvider(new ethers.providers.Web3Provider(userSuppliedProvider)))
      .then(resolve)
      .catch(reject);
  });
}

const getLocalProvider = () => {
  const localProvider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_LOCAL_PROVIDER_URL);
  return new Promise<Web3Custom>((resolve, reject) => {
    localProvider.detectNetwork().then(network => {
      resolve({
        connected: true,
        provided: true,
        providerName: 'local provider',
        networkName: 'localhost',
        account: undefined,
        chainId: network.chainId,
        provider: localProvider,
        signerOrProvider: localProvider,
      });
    }).catch(reject);
  });
}

const getFallbackProvider = () => {
  const providerApiKeys: ProviderApiKeys = {};
  if (process.env.REACT_APP_INFURA_API_KEY) providerApiKeys.infura = process.env.REACT_APP_INFURA_API_KEY;
  if (process.env.REACT_APP_ALCHEMY_API_KEY) providerApiKeys.alchemy = process.env.REACT_APP_ALCHEMY_API_KEY;
  if (process.env.REACT_APP_ETHERSCAN_API_KEY) providerApiKeys.etherscan = process.env.REACT_APP_ETHERSCAN_API_KEY;

  const network = ethers.providers.getNetwork(parseInt(process.env.REACT_APP_FALLBACK_CHAIN_ID || "0", 10));
  const defaultProvider = getDefaultProvider(network, providerApiKeys);

  const provider: Web3Custom = {
    connected: true,
    provided: false,
    providerName: 'readonly provider',
    networkName: defaultProvider.network.name,
    account: undefined,
    chainId: defaultProvider.network.chainId,
    provider: defaultProvider,
    signerOrProvider: defaultProvider,
  };

  return provider;
}

const useProvider = () => {
  const [web3Provider, setWeb3Provider] = useState(defaultWeb3);

  const reloadedProvider = useListeners(listenerProvider, web3Modal);
  useEffect(() => {
    if (!reloadedProvider) {
      setWeb3Provider(defaultWeb3);
    } else {
      makeInjectedProvider(reloadedProvider)
        .then(setWeb3Provider)
        .catch(console.error);
    }
  }, [reloadedProvider]);

  useEffect(() => {
    if (web3Provider.connected) return;

    if (web3Modal.cachedProvider && !web3Provider.provider) {
      getInjectedProvider(web3Modal)
        .then(setWeb3Provider)
        .catch(console.error);

      return;
    }

    if (web3Provider.provider) {
      web3Provider.provider.getNetwork()
        .then(network => {
          if (supportedChains().includes(network.chainId)) {
            getInjectedProvider(web3Modal)
              .then(setWeb3Provider)
              .catch(console.error);

            return;
          }
        })
        .catch(console.error);
    }

    if (process.env.NODE_ENV === 'development') {
      getLocalProvider()
        .then(setWeb3Provider)
        .catch(() => setWeb3Provider(getFallbackProvider()));

      return;
    }

    setWeb3Provider(getFallbackProvider());
  }, [web3Provider.connected, web3Provider.provider]);

  return web3Provider;
}

const connect = () => {
  web3Modal.connect().catch(console.error);
}

const disconnect = () => {
  web3Modal.clearCachedProvider();
  window.location.reload();
}

export { useProvider, connect, disconnect };
