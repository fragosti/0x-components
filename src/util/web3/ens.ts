import ENS from "ethereum-ens";

import provider from "./provider";
import log from "../log";

const ens = new ENS(provider);

export async function resolver(canonicalName: string): Promise<string> {
  let address = "";
  try {
    address = await ens.resolver(canonicalName).addr();
  } catch (err) {
    log(err);
  }
  return address;
}

export async function reverse(address: string): Promise<string> {
  let canonicalName = "";
  try {
    canonicalName = await ens.reverse(address).name();
  } catch (err) {
    log(err);
  }
  return canonicalName;
}

export default ens;
