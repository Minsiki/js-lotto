import { PurchaseException } from "../exceptions/PurchaseException.js";
import LottoMachine from "./LottoMachine.js";

export default class LottoShop {
    static LOTTO_UNIT = 1_000;
    static PURCHASE_MIN_PRICE = 1_000;
    static PURCHASE_MAX_PRICE = 50_000;

    static buy(price) {
        LottoShop.validate(price);
        return Array.from({ length: Math.floor(price / LottoShop.LOTTO_UNIT) }).map(LottoMachine.autoPick);
    }

    static validate(price) {
        if (price < LottoShop.PURCHASE_MIN_PRICE || price > LottoShop.PURCHASE_MAX_PRICE)
            throw PurchaseException.outOfRangePurchasePrice();
        if (price % LottoShop.LOTTO_UNIT !== 0) throw PurchaseException.notMatchPurchaseUnit();
    }
}
