import { tokenAddresses, contractAddresses } from "@/app/Utils/config";

export const findTokenAddressFromSymbol = (_symbol: string) => {
  let save;
  if (tokenAddresses) {
    tokenAddresses.forEach((element) => {
      if (_symbol === element?.symbol) {
        save = element?.address;
      }
    });
  }

  if (save) {
    return save;
  }
};

export const findTokenFromAddress = (_address: string) => {
  let save;
  if (tokenAddresses) {
    tokenAddresses.forEach((element) => {
      if (_address === element?.address) {
        save = element;
      }
    });
  }
  if (save) {
    return save;
  } else {
    console.log(
      "Token Not Found within Aquas.Trade Ecosystem as of yet",
      _address,
    );
    const failed: any = "false";
    return failed;
  }
};

export const findTokenFromSymbol = (_symbol: string) => {
  let save;
  if (tokenAddresses) {
    tokenAddresses.forEach((element) => {
      if (_symbol === element?.symbol) {
        save = element;
      }
    });
  }
  if (save) {
    return save;
  }
};

export const findTokenLogoFromAddress = (_address: string) => {
  let save;
  if (tokenAddresses) {
    tokenAddresses.forEach((element) => {
      if (_address === element?.address) {
        save = element?.logo;
      }
    });
  }
  if (save) {
    return save;
  }
};

export const findContractInfo = (_name: string) => {
  let save;
  if (contractAddresses) {
    contractAddresses.forEach((element) => {
      if (_name === element.name) {
        save = element;
      }
    });
  }

  if (save) {
    return save as any;
  }
};

export const findTokenDecimalsFromSymbol = (_symbol: string) => {
  let save;
  if (tokenAddresses) {
    tokenAddresses.forEach((element) => {
      if (_symbol === element.symbol) {
        save = element?.decimals;
      }
    });
  }
  if (save) {
    return save as any;
  }
};
