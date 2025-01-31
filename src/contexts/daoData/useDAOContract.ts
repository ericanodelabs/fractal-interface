import { useState, useEffect } from 'react';

import { DAO, DAO__factory } from '@fractal-framework/core-contracts';
import { useWeb3 } from '../web3Data';

const useDAOContract = (address: string | undefined) => {
  const [dao, setDAO] = useState<DAO>();
  const [{ signerOrProvider }] = useWeb3();

  useEffect(() => {
    if (!address || !signerOrProvider) {
      setDAO(undefined);
      return;
    }

    setDAO(DAO__factory.connect(address, signerOrProvider));
  }, [address, signerOrProvider]);

  return dao;
}

export default useDAOContract;
