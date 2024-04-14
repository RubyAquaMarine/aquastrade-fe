import { tokenAddresses } from "@/app/Utils/config";

export const findTokenAddressFromSymbol = (_symbol: string) => {
  let save;
  if (tokenAddresses) {
    tokenAddresses.forEach((element) => {
      if (_symbol === element?.symbol) {
        save = element?.addr;
      }
    });
  }

  if (save) {
    return save;
  }
};
