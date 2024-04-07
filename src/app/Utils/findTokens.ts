
import { tokenAddresses } from "@/app/Utils/config"

export const findTokenAddressFromSymbol = (_symbol: string) => {
    if (tokenAddresses) {
        tokenAddresses.forEach((element) => {
                if(_symbol === element.symbol){
                    console.log(`found ${_symbol} at address: `, element.addr)
                    return element.addr;
                }
            });
    }
  
};