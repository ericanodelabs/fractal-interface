import { useState, useEffect } from 'react';
import { utils } from 'ethers';

import { ERC165 } from '../typechain';
import useInterfaceSelectors from './useInterfaceSelectors';

const useSupportsInterfaces = (contract: ERC165 | undefined, interfaces: utils.Interface[]) => {
  const [supportsInterfaces, setSupportsInterfaces] = useState(false);
  const interfaceSelectors = useInterfaceSelectors(interfaces);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (!contract || !interfaceSelectors) {
      setSupportsInterfaces(false);
      setLoading(false);
      return;
    }

    Promise.all(interfaceSelectors.map(selector => contract.supportsInterface(selector)))
      .then(supports => setSupportsInterfaces(supports.reduce((p, c) => p && c)))
      .catch(() => setSupportsInterfaces(false))
      .finally(() => setLoading(false));
  }, [contract, interfaceSelectors]);

  return [supportsInterfaces, loading] as const;
}

export default useSupportsInterfaces;